# QuickHire — Backend API

RESTful API for the QuickHire job board application built with **Node.js**, **Express**, **Sequelize ORM**, and **MySQL**.

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js                 |
| Framework  | Express.js              |
| ORM        | Sequelize v6            |
| Database   | MySQL 8+                |
| Validation | express-validator       |
| Logging    | morgan                  |

---

## Project Structure

```
quickhire-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Sequelize connection config
│   ├── models/
│   │   ├── index.js             # Associations & exports
│   │   ├── Job.js               # Job model
│   │   └── Application.js       # Application model
│   ├── controllers/
│   │   ├── job.controller.js
│   │   └── application.controller.js
│   ├── routes/
│   │   ├── index.js             # Aggregated routes
│   │   ├── job.routes.js
│   │   └── application.routes.js
│   ├── middlewares/
│   │   ├── validate.js          # Validation result handler
│   │   └── errorHandler.js      # Global error handler
│   ├── validators/
│   │   ├── job.validator.js
│   │   └── application.validator.js
│   └── app.js                   # Express app configuration
├── server.js                    # Entry point
├── .env.example
└── package.json
```

---

## Getting Started

### 1. Prerequisites
- Node.js >= 18
- MySQL 8+ running locally or remotely

### 2. Clone & Install

```bash
git clone <your-repo-url>
cd quickhire-backend
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your MySQL credentials:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=quickhire_db
DB_USER=root
DB_PASSWORD=your_password
FRONTEND_URL=http://localhost:3000
```

### 4. Create Database

```sql
CREATE DATABASE quickhire_db;
```

### 5. Start the Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Sequelize will automatically create and sync tables on startup.

---

## API Endpoints

### Jobs

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/jobs`           | List all jobs (with filters) |
| GET    | `/api/jobs/:id`       | Get single job details       |
| POST   | `/api/jobs`           | Create job (Admin)           |
| PUT    | `/api/jobs/:id`       | Update job (Admin)           |
| DELETE | `/api/jobs/:id`       | Delete job (Admin)           |
| GET    | `/api/jobs/meta/filters` | Get filter dropdown values |

**Query Parameters for GET /api/jobs:**
- `search` — full-text search across title, company, description
- `category` — filter by category
- `location` — filter by location
- `type` — filter by job type (Full-time, Part-time, Remote, Contract, Internship)

### Applications

| Method | Endpoint                         | Description              |
|--------|----------------------------------|--------------------------|
| POST   | `/api/applications`              | Submit application       |
| GET    | `/api/applications`              | List all (Admin)         |
| GET    | `/api/applications/:id`          | Get single (Admin)       |
| PATCH  | `/api/applications/:id/status`   | Update status (Admin)    |

---

## Example Request — Create Job

```json
POST /api/jobs
{
  "title": "Senior Frontend Developer",
  "company": "TechCorp Ltd",
  "location": "Dhaka, Bangladesh",
  "category": "Engineering",
  "type": "Full-time",
  "salary": "$60k–$80k",
  "description": "We are looking for an experienced frontend developer...",
  "requirements": ["React", "TypeScript", "3+ years experience"],
  "logo_url": "https://example.com/logo.png"
}
```

## Example Request — Submit Application

```json
POST /api/applications
{
  "job_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://drive.google.com/my-resume",
  "cover_note": "I am excited to apply for this role..."
}
```

---

## Response Format

All responses follow a consistent structure:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

Validation errors return HTTP 422:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```