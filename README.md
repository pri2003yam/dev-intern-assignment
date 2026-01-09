# Task Management Application

A complete full-stack task management system with JWT authentication, PostgreSQL database, and responsive design.

**Live Demo:**
- Frontend: https://taskapp-gamma.vercel.app
- Backend API: https://task-management-api-production.railway.app

## ✨ Features

- **User Authentication**: Signup, login with JWT tokens and bcryptjs password hashing
- **Task CRUD**: Create, read, update, delete tasks with full validation
- **Search & Filter**: Search tasks by title (debounced), filter by status
- **Protected Routes**: Middleware-based route protection on both frontend and backend
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Real-time Feedback**: Toast notifications for all actions
- **Type-Safe**: 100% TypeScript for full type safety
- **Professional UI**: Shadcn/UI components with clean design

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 with React 18
- TypeScript
- Tailwind CSS + Shadcn/UI
- React Hook Form + Zod validation
- TanStack Query (React Query)
- Sonner notifications

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcryptjs for password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
JWT_SECRET=your-secret-key-min-32-chars
NODE_ENV=development
PORT=3001
EOF

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Server runs on http://localhost:3001

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

# Start development server
npm run dev
```

Frontend runs on http://localhost:3002

## 📡 API Endpoints

### Authentication
```
POST   /auth/signup              - Register new user
POST   /auth/login               - Login user
GET    /auth/me                  - Get current user (protected)
```

### Tasks (All require JWT token)
```
POST   /tasks                    - Create task
GET    /tasks                    - Get all tasks
GET    /tasks?search=title       - Search by title
GET    /tasks?status=pending     - Filter by status
PUT    /tasks/:id                - Update task
DELETE /tasks/:id                - Delete task
```

## 🔐 API Examples

### Using cURL

**Sign Up**
```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Task**
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the app",
    "status": "in-progress"
  }'
```

**Get Tasks with Search**
```bash
curl -X GET "http://localhost:3001/tasks?search=project&status=in-progress" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

Import [Task-Management-API.postman_collection.json](./Task-Management-API.postman_collection.json):
1. Open Postman → Click Import
2. Select the JSON file
3. Set `{{token}}` variable after login
4. Run requests

## 📁 Project Structure

```
dev-intern-assignment/
├── server/                          # Backend (Express)
│   ├── src/
│   │   ├── index.ts                 # Express app
│   │   ├── middleware/              # JWT middleware
│   │   ├── routes/                  # API routes
│   │   ├── controllers/             # Route handlers
│   │   ├── services/                # Database logic
│   │   └── validators/              # Zod schemas
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   ├── .env.example                 # Environment template
│   └── package.json
│
├── client/                          # Frontend (Next.js)
│   ├── app/
│   │   ├── login/                   # Login page
│   │   ├── signup/                  # Signup page
│   │   ├── dashboard/               # Dashboard
│   │   └── tasks/                   # Task management
│   ├── components/                  # React components
│   ├── hooks/                       # Custom hooks
│   ├── lib/                         # Utilities
│   ├── providers/                   # Context providers
│   ├── middleware.ts                # Route protection
│   ├── .env.example                 # Environment template
│   └── package.json
│
├── DEPLOYMENT.md                    # Deployment guide
├── GETTING_STARTED.md               # Setup guide
├── test-api.ps1                     # API testing script
└── Task-Management-API.postman_collection.json
```

## 🔧 Environment Variables

### Backend (server/.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
JWT_SECRET=your-super-secret-key-min-32-chars
NODE_ENV=development
PORT=3001
```

### Frontend (client/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🏗️ Architecture

**Frontend:**
- Next.js 14 App Router for routing
- Middleware for JWT token validation
- Protected routes with component wrappers
- React Query for server state management
- React Hook Form for form state
- Axios with JWT interceptor for API calls

**Backend:**
- Express.js with TypeScript
- Controller-Service pattern for separation of concerns
- Prisma ORM for database operations
- JWT middleware for protected routes
- Zod validation for request/response schemas
- CORS enabled for frontend requests

**Database:**
- PostgreSQL with Prisma ORM
- User model with unique email constraint
- Task model with status enum
- 1-to-Many relationship with cascade delete

## 🧪 Testing

```bash
# Run API test script (from root directory)
.\test-api.ps1

# Manual test flow:
# 1. Signup with new email
# 2. Login with credentials
# 3. Create, update, delete tasks
# 4. Test search and filter
# 5. Verify notifications appear
```

## 🌐 Production Deployment

### Frontend (Vercel)
```bash
# Push code to GitHub
git push origin main

# Go to https://vercel.com/dashboard
# 1. Import your repository
# 2. Set NEXT_PUBLIC_API_URL=https://your-backend-url
# 3. Deploy
```

### Backend (Railway)
```bash
# Go to https://railway.app/dashboard
# 1. Create new project
# 2. Deploy from GitHub (select server directory)
# 3. Add PostgreSQL database
# 4. Set DATABASE_URL, JWT_SECRET, PORT
# 5. Deploy
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔐 Security Features

- **Password Hashing**: bcryptjs with 10-round salt
- **JWT Tokens**: 7-day expiration
- **Protected Routes**: Middleware-based verification
- **Input Validation**: Zod schemas on frontend and backend
- **CORS**: Configured for frontend domain
- **No Secrets**: All secrets in environment variables
- **Error Messages**: Safe, no sensitive data leakage

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Quick start and troubleshooting
- [Task-Management-API.postman_collection.json](./Task-Management-API.postman_collection.json) - API documentation

## 🐛 Troubleshooting

**Backend won't start**
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Run: `npm run prisma:migrate`

**Frontend won't connect to backend**
- Verify NEXT_PUBLIC_API_URL is correct
- Ensure backend is running on port 3001
- Check browser console for CORS errors

**Tasks not loading**
- Check authentication token in localStorage
- Verify user is logged in
- Check browser console for errors

**Port already in use**
- Backend: Change PORT in .env
- Frontend: Use next available port automatically

## 📝 Available Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:migrate  # Run database migrations
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```
