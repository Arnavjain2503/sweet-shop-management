# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** featuring a **Node.js/Express** backend and a **Premium React/Vite** frontend. Built with **clean code**, **RESTful design**, and **modern UI principles**.

The system supports **user authentication**, **role-based authorization**, **sweet inventory management**, and **comprehensive integration testing**, wrapped in a beautiful **Glassmorphic Interface**.

---

## ✨ Features

### 🎨 Frontend Experience (New!)
- **Premium UI**: Modern Glassmorphism design with `framer-motion` animations.
- **Interactive Dashboard**: Real-time filtering and smooth interactions.
- **Admin Panel**: Full control to **Add**, **Edit**, **Restock**, and **Delete** sweets.
- **Responsive**: Fully optimized for extensive device support.

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (`ADMIN`, `USER`)

### 🍭 Sweet Management
- Add new sweets (Admin only)
- View all sweets
- Search sweets by name, category, or price range
- **Update sweet details** (Admin only)
- **Restock inventory** (Admin only)
- Delete sweets (Admin only)

### 📦 Inventory Management
- Purchase sweets (reduces quantity)
- Prevent purchase when out of stock
- Restock sweets (Admin only)
- Validation for invalid or unsafe inventory operations

### 🧪 Testing
- Backend: End-to-end integration tests using **Jest** and **Supertest**
- Real MongoDB database (not in-memory)

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Testing:** Jest, Supertest
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```
root/
├── backend/            # Express API
│   ├── src/
│   ├── tests/
│   └── ...
├── frontend/           # React + Vite App
│   ├── src/
│   │   ├── components/ # UI & Logic Components
│   │   ├── pages/      # Route Pages
│   │   └── ...
│   └── ...
└── README.md           # Project Documentation
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Arnavjain2503/sweet-shop-management.git
cd sweet-shop-management
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3️⃣ Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🧪 Running Tests (Backend)

```bash
cd backend
npm test
```

Expected output:
```
PASS tests/auth.test.js
PASS tests/sweets.test.js
PASS tests/inventory.test.js
```

---

## 🧠 Development Approach

1. **Backend First**: Core API functionality was implemented and verified with TDD.
2. **Frontend Overhaul**: Initially a basic UI, later upgraded to a **Premium Glassmorphic Design**.
3. **Iterative Improvement**: Added missing Admin features (Edit/Restock) during the UI phase.

---

## 🤖 My AI Usage

AI tools were leveraged to accelerate development while ensuring I maintained full understanding and control:

- **Planning**: Used AI to brainstorm the initial project structure and analyze requirements.
- **UI Design**: Collaborated with AI to generate the **Glassmorphism design tokens** and **Tailwind configuration** for a premium look.
- **Boilerplate**: Generated initial setup for Express and React components to save time.
- **Refactoring**: Used AI to refactor the `Admin.jsx` component to support Modals and better state management.

**All business logic, security implementation, and final code reviews were performed manually.**

---

## ✅ Assignment Coverage

This project fulfills all requirements:
- RESTful API & Database Integration
- JWT Authentication & Role-Based Access
- **Full-Stack Implementation** (Backend + Modern SPA)
- **Admin Features** (CRUD + Restock)
- **TDD Approach** (Backend Tests)

---

## 📌 Author

**Arnav Jain**  
GitHub: https://github.com/Arnavjain2503  
