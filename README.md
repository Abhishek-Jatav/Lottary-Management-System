
---

# 🎯 Lottery Management System (Full-Stack)

A full-stack Lottery Management System built using **Next.js**, **NestJS**, and **PostgreSQL (Prisma)**.

This system allows users to register, submit lottery scores, participate in draws, and claim winnings, while admins manage payments, winners, and draw execution.

---

# 🚀 Features

## 👤 User Features

- User Registration & Login (JWT Authentication)
- Submit Lottery Scores
- View Latest Draw Results
- Payment Submission
- Winner Claim Submission
- Dashboard Access

---

## 🛠 Admin Features

- Run Lottery Draw
- Verify Payments
- Approve Winners
- Manage System Workflow

---

# 🏗 System Architecture

```

Frontend (Next.js)
↓
Backend API (NestJS)
↓
Database (PostgreSQL)
↓
ORM (Prisma)

```

---

# 🧰 Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Multer (File Uploads)

## Database

- PostgreSQL
- Prisma ORM

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Supabase

---

# 📂 Project Structure

```

lottery-system/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── draw/
│   │   ├── payment/
│   │   ├── winner/
│   │   └── prisma/
│
├── README.md
└── .gitignore

```

---

# 🔐 Authentication Flow

1. User registers
2. User logs in
3. JWT token generated
4. Token stored in localStorage
5. Protected routes accessible

---

# 🎲 Lottery Workflow

1. User submits numbers
2. Admin runs draw
3. Winners identified
4. Payment verified
5. Winner approved

---

# ⚙️ Environment Variables

## Backend `.env`

```

DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=3001

```

## Frontend `.env.local`

```

NEXT_PUBLIC_API_URL=[http://localhost:3001](http://localhost:3001)

```

---

# 🧪 Running Locally

## Clone Repository

```

git clone [https://github.com/yourusername/lottery-system.git](https://github.com/yourusername/lottery-system.git)

cd lottery-system

```

---

## Backend Setup

```

cd backend

npm install

npx prisma migrate dev

npm run start:dev

```

Backend runs at:

```

[http://localhost:3001](http://localhost:3001)

```

---

## Frontend Setup

```

cd frontend

npm install

npm run dev

```

Frontend runs at:

```

[http://localhost:3000](http://localhost:3000)

```

---

# 🌐 Deployment Guide

## Backend → Render

Build Command:

```

npm install && npm run build

```

Start Command:

```

npm run start:prod

```

---

## Frontend → Vercel

Import repository  
Deploy automatically  

---

## Database → Supabase

Create PostgreSQL instance  
Add connection URL to `.env`

---

# 📸 Screenshots (Optional)

You can add:

- Login Page
- Dashboard
- Admin Panel
- Draw Results

Example:

```

![Dashboard Screenshot](./screenshots/dashboard.png)

```

---

# 🎯 Learning Outcomes

This project demonstrates:

- Full-Stack Development
- REST API Design
- Authentication with JWT
- Role-Based Authorization
- Database Modeling
- Deployment Workflow
- Production-Level Architecture

---

# 🧠 Future Improvements

- Real Payment Gateway Integration (Stripe/Razorpay)
- Email Notifications
- SMS Alerts
- Scheduled Draw Automation
- Analytics Dashboard

---

# 👨‍💻 Author

**Abhishek**

Full-Stack Developer  
Next.js • NestJS • PostgreSQL

---

# ⭐ If You Like This Project

Give it a ⭐ on GitHub!
```

---
