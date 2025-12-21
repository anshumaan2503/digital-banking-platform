# Digital Banking Platform – Full Stack

A secure, production-style **Digital Banking Platform** built using **Spring Boot, JWT, PostgreSQL, Flyway, Docker**, and a modern frontend.
The project focuses on **backend correctness, stateless security, and real-world API design**.

---

## 🚀 Tech Stack

### Backend
- Java 17+
- Spring Boot 3.2
- Spring Security (JWT, Stateless Authentication)
- PostgreSQL
- Flyway (Database migrations)
- Hibernate / JPA
- Docker

### Frontend
- React / Next.js
- REST API integration with JWT authentication

---

## 🔐 Core Features

### Authentication & Security
- JWT-based login (`/api/auth/login`)
- BCrypt password hashing
- Stateless session management
- Custom JWT authentication filter
- Correct HTTP behavior:
  - 401 Unauthorized → unauthenticated
  - 403 Forbidden → unauthorized

### Banking Features
- Account management APIs
- Transaction management APIs
- Secure access to user data
- Pagination-ready endpoints

### Database & Persistence
- PostgreSQL with Flyway-managed schema
- Versioned database migrations
- Safe demo user initialization

### DevOps
- Dockerized backend
- Environment-based configuration
- Clean project structure

---

## 📁 Project Structure

digital-banking-platform/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md

---

## ▶️ Running the Backend

### Prerequisites
- Java 17+
- PostgreSQL
- Maven
- Docker (optional)

### Steps
git clone https://github.com/your-username/digital-banking-platform.git
cd backend
./mvnw spring-boot:run

Backend runs at:
http://localhost:8080

---

## 🔑 Authentication Flow

1. POST /api/auth/login
2. Receive JWT token
3. Call protected APIs with:
   Authorization: Bearer <JWT_TOKEN>

---

## 🧪 API Testing
- Tested using Postman
- Verified:
  - No token → 401
  - Invalid token → 401
  - Valid token → 200

---

## 📌 Resume Summary

Built a full-stack Digital Banking Platform using Spring Boot and JWT authentication. Implemented stateless security, Flyway migrations, Dockerized backend services, and secure REST APIs consumed by a modern frontend.

---

## 👨‍💻 Author
Anshuman Tiwari
Full Stack Developer (Backend-focused)
