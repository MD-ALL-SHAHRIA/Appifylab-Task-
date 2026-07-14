# 🚀 Appifylab Fullstack Assignment: Next-Gen Social Feed

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

An enterprise-grade, highly scalable social feed application. This project converts a static HTML/CSS design into a dynamic, full-stack ecosystem, prioritizing **Security**, **Extreme Performance**, and **Exceptional UX**.

---

## 🌟 Executive Summary

This application isn't just a basic implementation of requirements—it is engineered to handle scale. By decoupling the frontend and backend, adopting stateless JWT authentication, integrating an in-memory datastore (Redis), a dedicated media CDN (Cloudinary), and utilizing a highly normalized relational database (PostgreSQL), the architecture is explicitly designed to handle **millions of concurrent posts, reads, and interactions** without degrading performance.

---

## 🛠️ Technology Stack & Tooling

### Frontend Architecture
| Technology | Purpose |
| :--- | :--- |
| **Next.js & React 19** | Delivers SEO-friendly, lighting-fast UI with a modern component system. |
| **Redux Toolkit** | Provides aggressive client-side caching and optimistic UI updates for instantaneous UX. |
| **NextAuth.js** | Bulletproof, industry-standard session and token handling. |
| **React Hook Form & Zod** | Strict schema-based form validation to prevent malformed data from ever hitting the API. |
| **Tailwind CSS & Shadcn UI**| Pixel-perfect styling with fully accessible, headless UI components. |
| **React Hot Toast** | Beautiful, lightweight toast notifications for user actions. |

### Backend Architecture
| Technology | Purpose |
| :--- | :--- |
| **NestJS & TypeScript** | Enterprise-ready Node.js framework ensuring highly structured, modular, and maintainable code. |
| **PostgreSQL & TypeORM** | Enforces strict data integrity, foreign key constraints, and fast relational mapping. |
| **Redis & BullMQ** | Ultra-fast in-memory datastore and queue system for caching feed payloads and processing heavy background jobs. |
| **Helmet & Throttler** | `helmet` secures HTTP headers, while `@nestjs/throttler` protects the API against brute-force and DDoS attacks via Rate Limiting. |
| **Pino Logger** | High-performance, non-blocking JSON logging (`nestjs-pino`) to track production analytics flawlessly without slowing down the thread. |
| **Bcrypt & Passport JWT** | Cryptographically secure password hashing and stateless token issuance. |

### DevOps & Infrastructure
| Technology | Purpose |
| :--- | :--- |
| **Cloudinary CDN** | Offloads heavy image streaming from the API servers, ensuring infinite horizontal scaling. |
| **Docker & Docker Compose** | Fully containerized databases (Postgres & Redis) to ensure perfect parity between development, staging, and production. |

---

## ✨ Core Features (Requirements Met)

### 🔐 1. Authentication & Security
* **Stateless JWT Flow:** Implemented robust JSON Web Tokens to eliminate server-side session overhead.
* **Strict Route Guards:** Feed access is entirely locked behind `@UseGuards(JwtAuthGuard)` on the API and NextAuth middleware on the client.
* **Complete Registration:** Users onboard securely with First Name, Last Name, Email, and heavily hashed Passwords via `bcrypt`.
* **API Protection:** Endpoints are protected by `helmet` and Rate Limiting (`throttler`) to prevent abuse.

### 📰 2. The Global Feed
* **Chronological Engine:** Database inherently sorts and delivers the feed with newest posts first (`ORDER BY createdAt DESC`).
* **Rich Media Posts:** Users can publish text updates alongside rich images seamlessly uploaded to Cloudinary.
* **Granular Privacy Controls:** Authors can instantly toggle posts between `PUBLIC` (visible to the world) and `PRIVATE` (visible only to themselves).

### 💬 3. Deep Interaction System
* **Multi-Tiered Comments:** Fully threaded comment and reply system engineered directly into the data model.
* **Comprehensive Like System:** Users can like/unlike posts, comments, and replies in real-time.
* **Reaction Transparency:** The UI dynamically displays the exact users who have recently liked any specific post or comment via optimized SQL Joins.

---

## 🔥 Beyond the Requirements (The "Wow" Factor)

To ensure this application meets absolute modern production standards, several major systems were developed beyond the initial brief:

1. **🚀 Redis Caching & BullMQ Processors**
   * *Why?* Reading the feed from a SQL database for millions of users causes bottlenecking. Redis caches feed queries, and `BullMQ` offloads heavy operations (like massive like-counts) from the main Postgres instance.
2. **🐳 Complete Dockerization**
   * *Why?* "It works on my machine" is an unacceptable excuse in production. The entire backend dependency layer (Postgres + Redis) is completely containerized via `docker-compose`.
3. **☁️ Cloudinary CDN Integration**
   * *Why?* Local image uploads crash horizontally scaled servers. Direct integration with Cloudinary ensures images are delivered via global edge networks instantly.
4. **📊 Enterprise-Grade Logging (Pino)**
   * *Why?* Standard `console.log` blocks the Node thread. Using `pino` ensures lightning-fast, structured logging that is essential for tracing production errors.
5. **🛡️ Advanced Form Validation (Zod + React Hook Form)**
   * *Why?* Prevents invalid data submissions instantly on the client side, drastically reducing unnecessary API calls and server load.
6. **⚡ Optimistic UI via Redux**
   * *Why?* Users expect instantaneous interactions. Redux manages state so likes and comments appear immediately on screen while syncing with the server asynchronously in the background.

---

## 🏗️ Architecture & Scalability Considerations

If this system suddenly received **1 million users**, the architecture is ready:
* **The Redis Buffer:** High-traffic endpoints can read from Redis memory (microseconds) instead of forcing PostgreSQL to compute complex `SELECT` aggregations every time a user refreshes the feed.
* **Stateless API Scalability:** Because the NestJS backend relies on JWTs, you can spin up 100 instance replicas behind a load balancer instantly—no sticky sessions required.
* **Preventing Race Conditions:** Like and Comment tables enforce strict `UNIQUE(userId, postId)` database constraints, making it physically impossible for a user to duplicate-like a post, even with rapid API spamming or botnets.

---

## 📦 Deliverables & Links

* 🎥 **Video Walkthrough:** `[INSERT YOUTUBE LINK HERE]`
* 🌍 **Live Deployment:** `[INSERT LIVE URL HERE]`
* 💻 **GitHub Repository:** Provided via assignment submission.

---

### 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd appifylab-fullstack-assignment

# 2. Start the Dockerized Infrastructure (Postgres & Redis)
cd backend
docker-compose up -d

# 3. Setup environment variables
# (Ensure your Postgres DB, Redis port, and Cloudinary keys are in backend/.env)

# 4. Start the Backend API
npm install
npm run start:dev

# 5. Start the Frontend Client
cd ../frontend
npm install
npm run dev
```

> **Thank you Appifylab for this Amazing Task i think next we will see in the office Desk and have a take coffee or tea with your team member .** 🚀
