---

# ⚙️ Task Manager Backend

A scalable and production-ready backend built with **NestJS**, designed using **modular architecture**, secure authentication, and efficient database handling.

This backend powers the Task Manager application with **robust APIs, clean structure, and real-world best practices**.

---

## 👨‍💻 Developer

**Abhishek Jatav**
🔗 Portfolio: [https://nexabuild-abhishek-jatav.netlify.app/](https://nexabuild-abhishek-jatav.netlify.app/)
🔗 LinkedIn: [https://www.linkedin.com/in/abhishek-jatav-067946261](https://www.linkedin.com/in/abhishek-jatav-067946261)

> Focused on building secure, scalable, and maintainable backend systems.

---

## 🚀 Core Features

* 🔐 JWT Authentication (Access + Refresh Tokens)
* 👤 User Registration & Login
* 🧾 Protected Routes with Guards
* 📝 Full Task CRUD Operations
* 🔄 Task Status Toggle
* 🔍 Search Functionality
* 🎯 Filtering (Completed / Pending)
* 📄 Pagination for performance
* 🛡 Secure Password Hashing (Bcrypt)

---

## 🧠 Backend Architecture

```id="arch2"
Controller Layer   → Handles HTTP Requests
        ↓
Service Layer      → Business Logic
        ↓
Prisma ORM         → Database Queries
        ↓
PostgreSQL (Neon)
```

---

## 🏗 Architecture Highlights

* 🧩 Modular Structure (Auth Module, Task Module)
* 🔒 Guard-based Route Protection
* 📦 DTO Validation for clean data flow
* 🔁 Refresh Token Strategy
* 🧼 Separation of Concerns
* ⚡ Optimized Queries with Prisma

---

## 🛠 Tech Stack

* 🚀 NestJS
* 🟦 TypeScript
* 🗄 PostgreSQL (Neon)
* 🔗 Prisma ORM
* 🔐 JWT (Authentication)
* 🔑 Bcrypt (Password Hashing)

---

## 📂 Project Structure

```id="struct2"
backend
│
├── src
│   ├── auth        # Authentication module
│   ├── tasks       # Task management module
│   ├── prisma      # Prisma service
│   └── main.ts     # Entry point
│
├── prisma
│   └── schema.prisma
│
└── .env
```

---

## ⚙️ Setup Guide

### 1️⃣ Install Dependencies

```bash id="cmd4"
npm install
```

---

### 2️⃣ Configure Environment

Create `.env` file:

```env id="env2"
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret
```

---

### 3️⃣ Run Database Migrations

```bash id="cmd5"
npx prisma migrate dev
```

---

### 4️⃣ Start Server

```bash id="cmd6"
npm run start:dev
```

---

### 🌐 Server Runs On

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔐 Authentication

```id="api3"
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/profile
```

---

### 📝 Task Management

```id="api4"
GET    /tasks
POST   /tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
PATCH  /tasks/:id/toggle
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT
2. Token sent in headers:

```id="auth1"
Authorization: Bearer <token>
```

3. Protected routes validated via **Auth Guard**
4. Refresh token used for session continuity

---

## 🗄 Database Schema

### 👤 User

```
id
email
password
createdAt
```

---

### 📝 Task

```
id
title
status
userId
createdAt
```

---

## 🧪 API Testing

You can test endpoints using:

* 🧪 Thunder Client
* 📮 Postman
* 💻 cURL

---

## ⚡ Performance & Security

* 🔒 Password hashing using Bcrypt
* 🛡 JWT-based authentication
* ⚡ Efficient queries via Prisma ORM
* 📉 Pagination reduces load on DB
* 🔄 Optimized API response handling

---

## 🎯 What This Backend Demonstrates

* Strong understanding of **Backend Architecture**
* Real-world implementation of **Authentication Systems**
* Clean **modular NestJS structure**
* Practical use of **ORM & database design**
* Ability to build **scalable APIs**

---

## 📜 License

This project is built for a **Full-Stack Development Assignment** and portfolio demonstration.

---

## ⭐ Support

If you found this useful:

* ⭐ Star the repository
* 💼 Connect with me on LinkedIn
* 🚀 Explore more projects on my portfolio

---
