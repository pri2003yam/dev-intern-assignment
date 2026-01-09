# Task Management Application - Full Stack Assignment

A production-ready full-stack task management system demonstrating modern web development practices with JWT authentication, PostgreSQL database, and responsive design.

## 📋 Project Overview

This is a complete implementation of a task management application built as a full-stack assessment project. The application showcases best practices in architecture, code quality, security, and user experience.

**Live Demo:**
- **Frontend**: https://dev-intern-assignment-k8dy.vercel.app/
- **Backend API**: https://dev-intern-assignment-api.onrender.com
- **GitHub Repository**: https://github.com/pri2003yam/dev-intern-assignment

## ✨ Core Features

### Authentication & Security
- **User Signup/Login**: JWT-based authentication with secure token management
- **Password Security**: bcryptjs hashing (10 rounds) for secure password storage
- **Protected Routes**: Middleware-based route protection on both frontend and backend
- **Token Management**: 7-day JWT expiration with localStorage persistence
- **CORS Support**: Properly configured CORS for cross-origin requests

### Task Management
- **CRUD Operations**: Create, read, update, and delete tasks with real-time feedback
- **Task Status**: Track tasks as "pending", "in-progress", or "completed"
- **Task Descriptions**: Rich task information with timestamps
- **User-Specific Tasks**: Each user can only see and manage their own tasks

### Search & Filtering
- **Debounced Search**: Real-time search by task title with 300ms debounce
- **Status Filter**: Filter tasks by completion status
- **Optimized Queries**: Efficient backend queries with proper indexing

### User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Toast Notifications**: Real-time feedback for all user actions
- **Form Validation**: Client-side validation with Zod schemas
- **Error Handling**: Graceful error handling with user-friendly messages
- **Hydration-Safe**: Proper hydration handling in Next.js for SSR consistency

## 🏗️ Architecture

### Frontend Architecture (`client/`)
```
client/
├── app/                    # Next.js 14 App Router
│   ├── login/             # Login page with form validation
│   ├── signup/            # Registration with password confirmation
│   ├── dashboard/         # Protected dashboard with user stats
│   └── tasks/             # Task management interface
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation with authentication state
│   ├── TaskCard.tsx       # Individual task display
│   ├── TaskForm.tsx       # Task creation/editing
│   └── ProtectedRoute.tsx # Route protection wrapper
├── hooks/                 # Custom React hooks
│   ├── useUser.ts         # User authentication state
│   └── useTasks.ts        # Task management with React Query
├── lib/                   # Utility functions
│   └── api.ts            # Axios instance with interceptors
└── middleware.ts          # Request interceptors and auth checks
```

### Backend Architecture (`server/`)
```
server/
├── src/
│   ├── index.ts          # Express app setup and middleware
│   ├── routes/           # API endpoint definitions
│   │   ├── auth.ts       # Authentication endpoints
│   │   └── tasks.ts      # Task CRUD endpoints
│   ├── controllers/       # Business logic
│   │   └── taskController.ts
│   ├── services/         # Database operations
│   │   └── taskService.ts
│   ├── middleware/       # Express middleware
│   │   └── authMiddleware.ts
│   ├── validators/       # Zod validation schemas
│   │   ├── authValidator.ts
│   │   └── taskValidator.ts
│   └── types/            # TypeScript type definitions
├── prisma/
│   └── schema.prisma     # Database schema with relationships
└── package.json          # Dependencies and scripts
```

### Database Schema
```
User
├── id (UUID)
├── email (unique)
├── password (hashed)
├── name
├── createdAt
└── updatedAt
    └─ Tasks (1-to-many relationship with cascade delete)

Task
├── id (UUID)
├── title
├── description
├── status (enum: pending, in-progress, completed)
├── userId (foreign key)
├── createdAt
└── updatedAt
```

## 🛠️ Tech Stack

### Frontend Technologies
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: Shadcn/UI (built on Radix UI)
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: TanStack Query (React Query) for server state
- **HTTP Client**: Axios with request/response interceptors
- **Notifications**: Sonner toast library
- **Routing**: Next.js App Router with middleware

### Backend Technologies
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (jsonwebtoken) with 7-day expiration
- **Password Security**: bcryptjs (10 salt rounds)
- **Validation**: Zod schemas for type-safe validation
- **CORS**: Express CORS middleware
- **Environment**: dotenv for configuration management

### Infrastructure
- **Database Hosting**: Supabase PostgreSQL
- **Frontend Deployment**: Vercel (serverless)
- **Backend Deployment**: Render (Node.js runtime)
- **Version Control**: Git with GitHub

## 🚀 Deployment & Setup

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database (Supabase or local)
- npm or yarn package manager
- Git for version control

### Environment Setup

**Backend Environment Variables (.env)**
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=3001
```

**Frontend Environment Variables (.env.local)**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Local Development

**Backend Setup:**
```bash
cd server
npm install
npx prisma generate
npx prisma db push  # Sync database schema
npm run dev         # Start development server on port 3001
```

**Frontend Setup:**
```bash
cd client
npm install
npm run dev         # Start development server on port 3000
```

### Production Deployment

**Frontend (Vercel):**
1. Connect GitHub repository to Vercel
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy automatically on push to main branch

**Backend (Render):**
1. Create new Web Service on Render
2. Configure root directory as `server`
3. Set environment variables (DATABASE_URL, JWT_SECRET)
4. Deploy from GitHub repository

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login with email/password
- `GET /auth/me` - Get current user profile (requires JWT)

### Tasks
- `POST /tasks` - Create new task (requires JWT)
- `GET /tasks` - List all user tasks with search/filter (requires JWT)
- `GET /tasks/:id` - Get specific task (requires JWT)
- `PUT /tasks/:id` - Update task (requires JWT)
- `DELETE /tasks/:id` - Delete task (requires JWT)

## 🔐 Security Measures

1. **Password Security**: bcryptjs with 10 salt rounds
2. **JWT Authentication**: Secure token-based authentication
3. **Protected Routes**: Both frontend and backend route protection
4. **Input Validation**: Zod schemas on frontend and backend
5. **CORS Configuration**: Proper CORS headers setup
6. **SQL Injection Prevention**: Prisma ORM prevents SQL injection
7. **XSS Protection**: React's built-in XSS protection
8. **Environment Variables**: Sensitive data not in version control

## 🧪 Code Quality

- **Type Safety**: 100% TypeScript with strict mode enabled
- **Code Organization**: Modular, component-based architecture
- **Error Handling**: Comprehensive error handling on both layers
- **Validation**: Zod for runtime type validation
- **Comments**: Clear, meaningful comments where needed
- **Naming Conventions**: Consistent, descriptive naming

## 📈 Performance Optimizations

1. **Debounced Search**: 300ms debounce on search queries
2. **React Query Caching**: Efficient server state management
3. **Lazy Loading**: Code splitting with Next.js
4. **Responsive Images**: Optimized for different screen sizes
5. **API Interceptors**: Request/response optimization with Axios

## 🎯 Key Implementation Highlights

### Frontend Highlights
- **Next.js App Router**: Modern routing with layouts and middleware
- **Custom Hooks**: `useUser` for authentication, `useTasks` for task management
- **Protected Routes**: Wrapper component for route protection
- **Hydration-Safe Components**: Proper state management to avoid hydration mismatches
- **Form Validation**: Zod + React Hook Form integration
- **Real-time Feedback**: Toast notifications for all actions

### Backend Highlights
- **Modular Routes**: Separate route files for auth and tasks
- **Service Layer**: Business logic separated from routes
- **Middleware Pattern**: Authentication middleware for protected routes
- **Database Relations**: Proper Prisma relations with cascade delete
- **Error Handling**: Centralized error handling with appropriate status codes
- **Validation Layer**: Zod validators for all input data

## 📝 Documentation

- **README.md**: Project overview and setup instructions (this file)
- **Code Comments**: Clear inline documentation
- **Type Definitions**: TypeScript types for all data structures
- **API Schema**: Prisma schema for database design

## 🤝 Development Workflow

1. **Feature Branch**: Create feature branches for new work
2. **Commit History**: Clean, descriptive commit messages
3. **Code Review**: Self-reviewed code before push
4. **Testing**: Manual testing of all features
5. **Deployment**: Automated deployment on main branch

## 📊 Project Statistics

- **Frontend Files**: 50+ source files
- **Backend Files**: 30+ source files
- **Total Lines of Code**: 2000+
- **Test Coverage**: Manual testing of all features
- **Type Coverage**: 100% TypeScript

## 🔍 Submission Contents

This submission includes:
1. ✅ Clean GitHub repository with meaningful commit history
2. ✅ Deployed frontend application (Vercel)
3. ✅ Deployed backend API (Render)
4. ✅ Comprehensive README documentation
5. ✅ Type-safe codebase with TypeScript
6. ✅ Proper error handling and validation
7. ✅ Responsive, accessible UI with Shadcn/UI
8. ✅ Production-ready application architecture

## 📞 Support

For any questions about this implementation, refer to the inline code comments and API documentation in the repository.

---

**Built with care for the Judix Full Stack Developer Assessment** ✨
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
