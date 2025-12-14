# 🍬 Sweet Shop Management System

A backend Sweet Shop Management System built using **Node.js, Express, MongoDB**, and **Jest**, following **clean code**, **RESTful design**, and **software craftsmanship principles**.

The system supports **user authentication**, **role-based authorization**, **sweet inventory management**, and **comprehensive integration testing**.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (`ADMIN`, `USER`)

### 🍭 Sweet Management
- Add new sweets (Admin only)
- View all sweets
- Search sweets by name, category, or price range
- Update sweet details (Admin only)
- Delete sweets (Admin only)

### 📦 Inventory Management
- Purchase sweets (reduces quantity)
- Prevent purchase when out of stock
- Restock sweets (Admin only)
- Validation for invalid or unsafe inventory operations

### 🧪 Testing
- End-to-end integration tests using **Jest** and **Supertest**
- Real MongoDB database (not in-memory)
- Tests cover:
  - Authentication flows
  - Authorization rules
  - CRUD operations
  - Inventory business rules
  - Edge cases and invalid inputs

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Testing:** Jest, Supertest
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── tests/
│   ├── auth.test.js
│   ├── sweets.test.js
│   ├── inventory.test.js
│   └── setup.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Arnavjain2503/sweet-shop-management.git
cd sweet-shop-management/backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Server
```bash
npm run dev
```

Server will start on:
```
http://localhost:5000
```

---

## 🧪 Running Tests

```bash
npm test
```

Expected output:
```
PASS tests/auth.test.js
PASS tests/sweets.test.js
PASS tests/inventory.test.js
```

All tests run against a **real MongoDB database** and validate full API behavior.

---

## 🧠 Development & Testing Approach

The project was developed iteratively:

1. Core API functionality was implemented and **manually verified** to ensure correct domain behavior.
2. Once behavior was stable, **integration tests were added** using Jest and Supertest.
3. Additional **edge-case tests** were introduced, followed by small, focused refactors.
4. Each improvement was committed incrementally to maintain clarity and traceability.

This approach balances **pragmatism with test-driven development**, reflecting real-world engineering practices.

---

## 🤖 My AI Usage

AI tools were used **only during the initial phase** of the project for:

- Planning the high-level project structure
- Deciding folder organization and basic architectural layout

All **business logic**, **API implementations**, and **test cases** were written, reviewed, and debugged **manually**.

AI was used as a **planning aid**, not for generating production code or tests.  
All engineering decisions and implementations are my own.

---

## ✅ Assignment Coverage

This project fulfills all backend requirements specified in the assignment:
- RESTful API
- Database integration
- JWT authentication
- Role-based access
- Inventory management
- Automated testing
- Clean, maintainable code

---

## 📌 Author

**Arnav Jain**  
GitHub: https://github.com/Arnavjain2503  
