# Sensei Academy Management System

React + Vite frontend connected to an Express + MongoDB backend. Single administrator account.

## Requirements
- Node.js 20+ recommended
- MongoDB Atlas account and a database user
- MongoDB Atlas network access configured for the machine running the API

## 1. Configure MongoDB and the backend
1. In MongoDB Atlas, create a database user and allow the backend machine's IP in Network Access.
2. Copy the Atlas connection string.
3. Open `backend/` and copy `.env.example` to `.env`.
4. Set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `backend/.env`. Replace all example values. URL-encode special characters in the MongoDB password.
5. In a terminal:

```bash
cd backend
npm install
npm run dev
```

The first server start creates the single admin account from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Changing those environment values later does not automatically change an existing account password.

## 2. Configure and run the React frontend
1. In the project root, copy `.env.example` to `.env` (or create `.env`).
2. Set `VITE_API_URL=http://localhost:5000/api` if using the default backend port.
3. In a second terminal, from the project root:

```bash
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## 3. Sign in
Use the email and password you set as `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`. There is no hard-coded demo login in this connected version.

## Data and security notes
- Student, attendance, payment, exam, expense and inventory records are stored in MongoDB, not browser local storage.
- The backend uses a JWT for the single admin session. Tokens expire after 12 hours.
- Keep `backend/.env` private and never commit it to GitHub. `.gitignore` excludes it.
- Use HTTPS and restrict CORS/network access when deploying. Change the initial admin password policy and consider adding password reset/backup procedures before production use.
- This starter stores each module as arrays in one academy document. For a large academy, migrate to separate MongoDB collections with pagination and audit logs.
"# SENSEI_Academy" 
