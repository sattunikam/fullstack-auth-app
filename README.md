# 🔐 Full-Stack Authentication App

A full-stack authentication system built with React, Node.js, Express.js and MongoDB. Users can sign up, log in, and access a protected dashboard. Authentication uses JWT stored in httpOnly cookies.

## ✨ Features

- Signup with bcrypt password hashing
- Login with JWT stored in an httpOnly cookie
- `protect` middleware to guard private APIs
- `verify` API to check login status on page refresh
- Logout that clears the cookie
- Protected routes in React that redirect unauthenticated users to login
- Responsive dark UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React (Vite), React Router, Axios, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Auth:** bcrypt, jsonwebtoken, cookie-parser

## 📡 API Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/signup` | Create a new user | No |
| POST | `/api/auth/login` | Login and set cookie | No |
| GET | `/api/auth/verify` | Get logged-in user | Yes |
| POST | `/api/auth/logout` | Clear cookie | No |

## 📁 Folder Structure

```
auth-app/
├── backend/
│   ├── config/        # database connection
│   ├── controllers/   # signup, login, verify, logout logic
│   ├── middleware/    # protect middleware
│   ├── models/        # User schema
│   ├── routes/        # API routes
│   └── index.js
└── frontend/
    └── src/
        ├── api/          # axios instance
        ├── components/   # Navbar, ProtectedRoute
        ├── context/      # AuthContext
        └── pages/        # Login, Signup, Dashboard
```

## 🚀 Run Locally

**1. Clone the repo**
git clone https://github.com/sattunikam/fullstack-auth-app.git
cd fullstack-auth-app
```

**2. Backend**
cd backend
npm install
```
Create a `.env` file (see `.env.example`):
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```
npm run dev
```

**3. Frontend**
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`

## 🔒 How Authentication Works

1. User logs in, server verifies the password with bcrypt.
2. Server creates a JWT and sends it in an httpOnly cookie, so JavaScript cannot read it.
3. Browser sends the cookie automatically with every request.
4. The `protect` middleware verifies the token before private routes run.
5. On page load, React calls `/verify` to restore the logged-in user.