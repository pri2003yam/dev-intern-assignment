# Deployment Guide

This guide covers deploying the Task Management Application to production.

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub repository with code pushed

### Steps

1. **Connect GitHub Repository**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

3. **Deploy**
   - Click "Deploy"
   - Vercel automatically detects Next.js and builds
   - Get your live frontend URL (e.g., `https://task-app.vercel.app`)

### Auto-Deploy
Every push to main branch automatically redeploys on Vercel.

---

## Backend Deployment (Railway)

### Prerequisites
- Railway account (free at https://railway.app)
- GitHub repository
- PostgreSQL database (Railway provides this)

### Steps

1. **Create New Project**
   - Visit [Railway Dashboard](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Connect Repository**
   - Authorize GitHub access
   - Select your repository
   - Select the `server` directory as root

3. **Add PostgreSQL Database**
   - Click "Add Service" → "PostgreSQL"
   - Railway automatically creates database
   - Get connection string from database service

4. **Configure Environment Variables**
   - In Railway project, go to "Variables"
   - Add:
     ```
     DATABASE_URL=postgresql://user:password@host:5432/dbname
     JWT_SECRET=your-super-secret-key-min-32-chars
     NODE_ENV=production
     PORT=3001
     ```

5. **Deploy**
   - Railway watches GitHub and auto-deploys
   - Get your backend URL (e.g., `https://your-backend.railway.app`)
   - Update frontend `NEXT_PUBLIC_API_URL` to this URL

### CORS Configuration
Backend already has CORS enabled for any origin in production.

---

## Alternative Backend Deployment (Render)

### Prerequisites
- Render account (free tier available at https://render.com)
- PostgreSQL database (Render provides this)

### Steps

1. **Create PostgreSQL Database**
   - Dashboard → "New" → "PostgreSQL"
   - Use free tier
   - Copy connection string

2. **Create Web Service**
   - Dashboard → "New" → "Web Service"
   - Connect your GitHub repository
   - Select `server` directory
   - Runtime: Node

3. **Configure**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Environment Variables:
     ```
     DATABASE_URL=your-connection-string
     JWT_SECRET=your-super-secret-key
     NODE_ENV=production
     PORT=3000
     ```

4. **Deploy**
   - Render watches GitHub and auto-deploys
   - Get your URL (e.g., `https://your-app.onrender.com`)

---

## Database Migrations in Production

After deploying backend:

```bash
# SSH into production or use Railway CLI
railway run npx prisma migrate deploy

# Or if using Render:
# SSH into Render and run the same command
```

---

## Testing Production Deployment

1. **Test Signup**
   ```bash
   curl -X POST https://your-backend.railway.app/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"password123"}'
   ```

2. **Test Login**
   ```bash
   curl -X POST https://your-backend.railway.app/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Visit Frontend**
   - Open `https://your-frontend.vercel.app`
   - Test signup, login, task CRUD

---

## Monitoring

### Vercel
- Dashboard shows deployment status
- Analytics tab shows performance metrics
- Logs available in "Function Logs"

### Railway
- Logs tab shows real-time backend logs
- Metrics tab shows CPU, memory, network usage
- Deployments tab shows deployment history

---

## Troubleshooting

### Frontend not connecting to backend
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running and accessible
- Check CORS configuration in backend

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check database is accessible from production environment
- Run migrations with `npx prisma migrate deploy`

### 500 errors on backend
- Check logs in deployment platform
- Verify all environment variables are set
- Ensure database migrations are run

### JWT authentication failing
- Verify `JWT_SECRET` is set on both local and production
- Check token expiration time
- Clear browser cookies and try again
