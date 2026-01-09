# Quick Reference Guide

## 🚀 Start Development (5 minutes)

```bash
# Terminal 1: Backend
cd server
npm install
npm run dev
# → Running on http://localhost:3001

# Terminal 2: Frontend  
cd client
npm install
npm run dev
# → Running on http://localhost:3002
```

Then open: http://localhost:3002

---

## 🧪 Test API (Using PowerShell Script)

```powershell
# From root directory
.\test-api.ps1
```

This tests all endpoints: signup, login, create task, update task, delete task, search, filter.

---

## 📝 API Endpoints Quick Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | ❌ | Create account |
| POST | `/auth/login` | ❌ | Login user |
| GET | `/auth/me` | ✅ | Get current user |
| POST | `/tasks` | ✅ | Create task |
| GET | `/tasks` | ✅ | Get all tasks |
| GET | `/tasks?search=title` | ✅ | Search tasks |
| GET | `/tasks?status=pending` | ✅ | Filter by status |
| PUT | `/tasks/:id` | ✅ | Update task |
| DELETE | `/tasks/:id` | ✅ | Delete task |

✅ = Requires JWT token in Authorization header

---

## 📋 Test Checklist (Local)

- [ ] Backend starts successfully
- [ ] Frontend builds successfully
- [ ] Can signup with new account
- [ ] Can login with credentials
- [ ] Can create task
- [ ] Can edit task
- [ ] Can delete task
- [ ] Search works
- [ ] Filter by status works
- [ ] Mobile design works
- [ ] No console errors

---

## 🌐 Production URLs

After deployment, update these:

- **Frontend**: https://taskapp-gamma.vercel.app
- **Backend**: https://task-management-api-production.railway.app

Update in `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://task-management-api-production.railway.app
```

---

## 📊 Project Structure

```
dev-intern-assignment/
├── client/               # Next.js frontend
│   ├── app/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   └── tasks/
│   ├── components/
│   ├── hooks/
│   └── lib/
├── server/               # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── middleware/
│   └── prisma/
└── docs/
    ├── README.md
    ├── DEPLOYMENT.md
    ├── SCALABILITY.md
    └── Postman collection
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your-secret-key-min-32-chars
NODE_ENV=development
PORT=3001
```

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🛠️ Common Commands

```bash
# Backend
cd server
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:migrate   # Run migrations

# Frontend
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview & features |
| DEPLOYMENT.md | How to deploy to production |
| SCALABILITY.md | Scaling strategies |
| GETTING_STARTED.md | Quick start guide |
| SUBMISSION_GUIDE.md | Pre-submission checklist |
| Task-Management-API.postman_collection.json | API documentation |
| test-api.ps1 | Automated API testing |

---

## 🐛 Troubleshooting

**Backend won't start**
- Check DATABASE_URL
- Ensure PostgreSQL is running
- Run: `npm run prisma:migrate`

**Frontend won't connect**
- Check NEXT_PUBLIC_API_URL
- Verify backend is running on port 3001
- Check for CORS errors

**Tasks not loading**
- Check authentication token in localStorage
- Verify user is logged in
- Check browser console for errors

**Port already in use**
- Backend: Change PORT in .env
- Frontend: npm run dev uses next available port

---

## 📝 Postman Usage

1. Open Postman
2. Click Import
3. Select `Task-Management-API.postman_collection.json`
4. Set `{{token}}` variable after login
5. Test endpoints with pre-configured examples

---

## 🚀 Submission Checklist

- [ ] All tests pass locally
- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Environment variables configured
- [ ] Production URLs updated in README
- [ ] Email sent to shivam@judix.in with repo link

---

## 💬 Email Template

```
To: shivam@judix.in
Subject: Task Management Application - Developer Intern Assignment

Repository: https://github.com/YOUR_USERNAME/dev-intern-assignment
Frontend: https://your-app.vercel.app
Backend: https://your-app.railway.app

All requirements met and deployed to production. Ready for testing.
```

---

## 📞 Quick Links

- GitHub: Your repository URL
- Vercel: https://vercel.com/dashboard
- Railway: https://railway.app/dashboard
- Postman: https://www.postman.com/downloads/
- Prisma: https://www.prisma.io/docs/

---

**Last Updated**: January 9, 2026
**Status**: ✅ Complete & Ready for Submission
