# TaskApp - Full-Stack Task Management Application

A modern, full-stack task management application built with **Next.js 14** (frontend) and **Node.js + Express** (backend), featuring JWT authentication, real-time task management, and responsive design.

## 📋 Features

✅ **User Authentication**
- Sign up & login with JWT tokens
- Refresh token mechanism for enhanced security
- Password hashing with bcryptjs
- Protected routes and API endpoints

✅ **Task Management**
- Create, read, update, and delete tasks
- Real-time search by title
- Filter tasks by status (pending, in-progress, completed)
- Task descriptions and timestamps

✅ **Frontend**
- Responsive design for mobile & desktop
- React Query for efficient data fetching
- Shadcn/UI for beautiful components
- Sonner toast notifications
- Next.js 14 App Router

✅ **Backend**
- Express.js REST API
- Prisma ORM with PostgreSQL
- Zod validation for request schemas
- Controller-Service pattern architecture

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
cp .env.example .env

# Configure your database
# DATABASE_URL="postgresql://user:password@localhost:5432/fullstack_db"
# JWT_SECRET="your_secret_key"

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Server runs on `http://localhost:3001`

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3001

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
dev-intern-assignment/
├── server/                          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── index.ts                 # Express app entry point
│   │   ├── lib/db.ts                # Prisma client
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts    # JWT verification
│   │   ├── routes/
│   │   │   ├── auth.ts              # Authentication endpoints
│   │   │   └── tasks.ts             # Task CRUD endpoints
│   │   ├── controllers/
│   │   │   └── taskController.ts    # Task business logic
│   │   ├── services/
│   │   │   └── taskService.ts       # Database operations
│   │   └── validators/
│   │       ├── authValidators.ts    # Auth schemas
│   │       └── taskValidators.ts    # Task schemas
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── client/                          # Frontend (Next.js)
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── login/page.tsx           # Login page
│   │   ├── signup/page.tsx          # Sign up page
│   │   ├── dashboard/page.tsx       # Dashboard
│   │   └── tasks/page.tsx           # Task management
│   ├── components/
│   │   ├── Navbar.tsx               # Navigation
│   │   ├── ProtectedRoute.tsx       # Route protection
│   │   ├── TaskCard.tsx             # Task display
│   │   ├── CreateTaskDialog.tsx     # Create modal
│   │   ├── EditTaskDialog.tsx       # Edit modal
│   │   ├── SonnerToaster.tsx        # Notifications
│   │   └── ui/                      # Shadcn/UI components
│   ├── hooks/
│   │   ├── useUser.ts               # User data hook
│   │   └── useTasks.ts              # Task CRUD hooks
│   ├── lib/
│   │   ├── api.ts                   # Axios instance with JWT
│   │   └── validators.ts            # Zod schemas
│   ├── providers/
│   │   └── QueryProvider.tsx        # React Query setup
│   ├── middleware.ts                # Next.js auth middleware
│   ├── package.json
│   └── tsconfig.json
│
└── SCALABILITY.md                   # Scaling guide
```

## 🔐 API Endpoints

### Authentication
```
POST   /auth/signup              - Register new user
POST   /auth/login               - Login user
GET    /auth/me                  - Get current user (protected)
```

### Tasks (All require JWT token)
```
POST   /tasks                    - Create task
GET    /tasks                    - Get all tasks (with search & filter)
GET    /tasks?search=title       - Search tasks by title
GET    /tasks?status=pending     - Filter by status
PUT    /tasks/:id                - Update task
DELETE /tasks/:id                - Delete task
```

## 📖 API Examples

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

**Get Current User**
```bash
curl -X GET http://localhost:3001/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create Task**
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "in-progress"
  }'
```

**Get All Tasks with Search**
```bash
curl -X GET "http://localhost:3001/tasks?search=project&status=in-progress" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Update Task**
```bash
curl -X PUT http://localhost:3001/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "status": "completed"
  }'
```

**Delete Task**
```bash
curl -X DELETE http://localhost:3001/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

Import the provided Postman collection: [Task-Management-API.postman_collection.json](./Task-Management-API.postman_collection.json)

1. Open Postman
2. Click "Import" → Select the JSON file
3. Collection loads with all endpoints
4. Set `{{token}}` and `{{taskId}}` variables in collection settings
5. Run requests with pre-configured examples
GET    /tasks                    - Get all tasks (supports ?search= and ?status=)
PUT    /tasks/:id                - Update task
DELETE /tasks/:id                - Delete task
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Data validation

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **React Hook Form** - Form management
- **TanStack Query** - Data fetching
- **Tailwind CSS** - Styling
- **Shadcn/UI** - UI components
- **Sonner** - Toast notifications
- **Axios** - HTTP client

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔔 Notifications

Toast notifications provide real-time feedback for:
- ✅ Successful operations (create, update, delete)
- ❌ Error handling
- ℹ️ Information messages

## 🔄 State Management

- **React Query (TanStack Query)**: Server state management
  - Automatic caching and invalidation
  - Optimistic updates
  - Background refetching
  
- **React Hook Form**: Client-side form state
- **localStorage**: Persistent auth tokens

## 📖 Authentication Flow

1. **Sign Up**: User creates account → Password hashed → JWT generated
2. **Login**: User logs in → JWT stored in localStorage & cookies
3. **Protected Routes**: Middleware checks for valid JWT
4. **API Requests**: Axios interceptor automatically adds JWT header
5. **Token Expiration**: Handles 401 responses by clearing auth

## 🌐 Production Deployment

The application is deployed and ready to use:

- **Frontend**: https://taskapp-gamma.vercel.app
- **Backend API**: https://task-management-api-production.railway.app
- **API Documentation**: See [Task-Management-API.postman_collection.json](./Task-Management-API.postman_collection.json)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick deployment steps:
1. Frontend: Push to GitHub → Vercel auto-deploys
2. Backend: Deploy to Railway with PostgreSQL
3. Update environment variables on production platforms
4. Run database migrations: `npx prisma migrate deploy`

## 🚀 Scalability

For production deployment and scaling strategies, see [SCALABILITY.md](./SCALABILITY.md)

Key features for scaling:
- Redis caching layer
- Refresh token implementation
- Docker containerization
- Load balancing with Nginx
- Database optimization with indexes
- Comprehensive monitoring setup

## 📚 Environment Variables

### Server (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fullstack_db
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3001
```

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing

To test the application:

1. Create a user account
2. Login with credentials
3. Create tasks
4. Test search and filter functionality
5. Edit and delete tasks
6. Verify notifications appear correctly
7. Test logout and re-login

## 🐛 Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Run `npm run prisma:migrate`

### Frontend won't connect to backend
- Verify NEXT_PUBLIC_API_URL is correct
- Ensure backend is running on port 3001
- Check for CORS issues in browser console

### Tasks not loading
- Check authentication token is valid
- Verify user is logged in
- Check browser localStorage for `authToken`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ as a full-stack learning project**
