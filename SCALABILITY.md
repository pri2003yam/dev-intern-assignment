# Scalability Documentation

## Overview
This document outlines strategies and best practices for scaling the TaskApp application to handle increased traffic, users, and data while maintaining performance and reliability.

---

## 1. **Caching Strategy with Redis**

### Why Redis?
- In-memory data store for ultra-fast access
- Perfect for session management, task caching, and reducing database load
- Supports pub/sub for real-time features

### Implementation Plan

#### 1.1 Session Caching
```typescript
// Store JWT refresh tokens and session data in Redis
// TTL: 7 days (matches JWT expiration)
redis.setex(`session:${userId}`, 604800, JSON.stringify(sessionData));
```

#### 1.2 Task Caching
```typescript
// Cache user's tasks for 5 minutes to reduce database hits
// Invalidate on create/update/delete
const cacheKey = `tasks:${userId}:${status || 'all'}`;
const cachedTasks = await redis.get(cacheKey);

if (cachedTasks) return JSON.parse(cachedTasks);

// If not cached, fetch from DB and cache
const tasks = await prisma.task.findMany({ where: { userId } });
await redis.setex(cacheKey, 300, JSON.stringify(tasks));
```

#### 1.3 Rate Limiting
```typescript
// Prevent abuse with Redis-based rate limiting
const rateLimit = `ratelimit:${userId}:${endpoint}`;
const requests = await redis.incr(rateLimit);

if (requests === 1) {
  await redis.expire(rateLimit, 60); // 60 requests per minute
}

if (requests > 60) {
  return res.status(429).json({ error: "Too many requests" });
}
```

### Setup Instructions
```bash
# Install Redis client
npm install redis

# Docker setup
docker run -d -p 6379:6379 redis:latest

# Connect in Node.js
import { createClient } from 'redis';
const redis = createClient();
await redis.connect();
```

---

## 2. **Refresh Tokens for Enhanced Security**

### Why Implement Refresh Tokens?
- **Short-lived Access Tokens**: Expire in 15 minutes
- **Long-lived Refresh Tokens**: Expire in 7 days
- **Mitigation**: If access token is compromised, exposure is limited
- **Token Rotation**: Invalidate old refresh tokens after use

### Implementation

#### 2.1 Backend Auth Changes
```typescript
// In auth.ts routes

// Login endpoint - return both tokens
router.post("/auth/login", async (req, res) => {
  // ... authentication logic ...
  
  const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
  
  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  
  // Store refresh token in Redis
  await redis.setex(
    `refresh_token:${user.id}`,
    604800,
    refreshToken
  );
  
  res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// New endpoint to refresh access token
router.post("/auth/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    
    if (storedToken !== refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: "Refresh token expired" });
  }
});
```

#### 2.2 Frontend Changes
```typescript
// lib/api.ts - Auto-refresh logic

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/auth/refresh", { refreshToken });
        
        localStorage.setItem("accessToken", response.data.accessToken);
        api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## 3. **Dockerization**

### Why Docker?
- Consistent environment across development and production
- Easy deployment and scaling
- Microservices-ready architecture

### Dockerfile for Backend
```dockerfile
# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Start server
CMD ["npm", "start"]
```

### Dockerfile for Frontend
```dockerfile
# client/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: fullstack_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:latest
    ports:
      - "6379:6379"

  backend:
    build: ./server
    environment:
      DATABASE_URL: postgresql://postgres:your_password@postgres:5432/fullstack_db
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your_secret
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./client
    environment:
      NEXT_PUBLIC_API_URL: http://backend:3001
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Build and Run
```bash
# Build images
docker-compose build

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f
```

---

## 4. **Load Balancing**

### Why Load Balancing?
- Distribute incoming traffic across multiple backend instances
- Increase availability and fault tolerance
- Enable horizontal scaling

### Nginx Load Balancer Setup
```nginx
# nginx.conf
upstream backend {
    server backend1:3001;
    server backend2:3001;
    server backend3:3001;
    
    # Health check
    check interval=3000 rise=2 fall=5 timeout=1000 type=http;
}

server {
    listen 80;
    server_name api.taskapp.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Sticky sessions for WebSocket/real-time
        proxy_cookie_path / "/";
        proxy_cookie_flags ~ secure httponly samesite=lax;
    }
}
```

### Kubernetes Deployment (Advanced)
```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: taskapp-backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3001
  type: LoadBalancer
```

---

## 5. **Database Optimization**

### Indexing Strategy
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_task_userId ON tasks(userId);
CREATE INDEX idx_task_status ON tasks(status);
CREATE INDEX idx_task_createdAt ON tasks(createdAt DESC);

-- Composite index for common queries
CREATE INDEX idx_task_user_status ON tasks(userId, status);
```

### Connection Pooling
```typescript
// Prisma automatically handles connection pooling
// Configure in .env
DATABASE_URL="postgresql://...?schema=public&pgbouncer=true"

// Max connections: 10 per server
```

---

## 6. **Performance Monitoring**

### Backend Monitoring
```typescript
// Use Prometheus for metrics
import prometheus from 'prom-client';

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});
```

### Frontend Monitoring
```typescript
// Use Sentry for error tracking
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  tracesSampleRate: 0.1,
});
```

---

## 7. **Scaling Checklist**

- [ ] Implement Redis caching layer
- [ ] Add refresh token authentication
- [ ] Dockerize backend and frontend
- [ ] Set up nginx load balancer
- [ ] Configure database connection pooling
- [ ] Add database indexes
- [ ] Set up monitoring (Prometheus, Grafana)
- [ ] Implement error tracking (Sentry)
- [ ] Add rate limiting
- [ ] Configure CI/CD pipeline (GitHub Actions)
- [ ] Deploy to Kubernetes or managed services (Railway, Render, Vercel)
- [ ] Set up CDN for frontend assets (Cloudflare, AWS CloudFront)

---

## 8. **Deployment Platforms**

### Recommended Options
- **Backend**: Railway, Render, AWS EC2, DigitalOcean
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Database**: AWS RDS, Supabase, Railway
- **Redis**: AWS ElastiCache, Upstash

---

## Conclusion

By implementing these scalability strategies, TaskApp can grow from handling 100 concurrent users to 100,000+ users while maintaining performance and reliability.

**Priority Implementation Order:**
1. Redis caching + refresh tokens (Week 1)
2. Docker + docker-compose (Week 2)
3. Load balancing with Nginx (Week 3)
4. Database optimization (Week 4)
5. Monitoring and observability (Ongoing)
