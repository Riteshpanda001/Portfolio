# 🚀 Ritesh Kumar Panda — Portfolio

A full-stack developer portfolio showcasing AI/ML, data analytics, and software engineering work. It combines a responsive **React 19** single-page app with a secure **Spring Boot 3** REST API and a JWT-protected **admin dashboard** for managing content without touching code.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-6DB33F?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-supported-4169E1?logo=postgresql&logoColor=white)

---

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Deployment](#-deployment)
- [Design System](#-design-system)
- [Roadmap](#-roadmap)
- [Contact](#-contact)

---

## 📌 About

This repository holds the complete source for the personal portfolio of **Ritesh Kumar Panda**, an AI/ML Engineer & Full-Stack Developer and B.Tech CSE student at NIST University.

It is built to:

- **Showcase projects** in machine learning, generative AI, data analytics, and full-stack development, with case-study pages for each.
- **Present credentials**: education, internship experience, and certifications.
- **Help recruiters** browse skills, download the resume, and send a message directly.
- **Keep content editable** through an authenticated admin dashboard backed by a REST API.

---

## ✨ Features

### Public site

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, about preview, skills preview, featured projects, experience preview, GitHub stats, testimonials, newsletter, contact CTA |
| About | `/about` | Background, interests, and highlights |
| Skills | `/skills` | Categorised skills with proficiency levels |
| Projects | `/projects` | Project gallery with status badges |
| Project Details | `/projects/:id` | Case study: problem, solution, key learnings, tech stack, workflow |
| Experience | `/experience` | Professional timeline |
| Education | `/education` | Academic history |
| Certifications | `/certifications` | Certificates with credential details |
| Resume | `/resume` | Resume page with full-page view and PDF download |
| Contact | `/contact` | Validated contact form sent to the backend (with email notification) |

### Admin dashboard (`/admin`)

A single protected page with in-page section switching:

- **Dashboard** overview and analytics
- **About Me / Profile** management
- **Skills & Technologies** CRUD
- **Projects** CRUD
- **Experience** and **Training / Certifications** management
- **Messages** inbox (mark as read, delete)
- **Settings**
- File uploads (images and PDFs) served from `/media/**`

### Other

- Visitor analytics tracking (`/api/analytics/visit`)
- Newsletter subscription endpoint
- Gmail SMTP email notifications for contact messages
- Lazy-loaded routes with `Suspense`, an error boundary, and a 404 page
- SPA rewrite rules for Netlify and Vercel

---

## 🛠️ Tech Stack

**Frontend**
- React 19, React Router 7 (`react-router-dom`), Vite 8
- Axios (JWT request interceptor, global 401 handling)
- Framer Motion, Lucide React
- Plain CSS with custom properties
- oxlint for linting

**Backend**
- Java 17, Spring Boot 3.2.4
- Spring Web, Spring Security 6, Spring Data JPA / Hibernate
- JWT via jjwt, Bean Validation, Spring Mail
- Lombok, Maven (with bundled Maven for Windows via `mvnw.cmd`)
- Spring Boot Actuator (`health`, `info`)

**Database**
- H2 file database by default (zero setup, stored in `Backend/data/`)
- PostgreSQL supported via environment variables

---

## 🏗️ Architecture

```text
┌──────────────────────────────────────────────┐
│          React + Vite SPA (port 5173)         │
│  Public pages  •  Protected admin dashboard   │
└───────────────┬──────────────────────────────┘
                │ HTTPS / JSON  (Bearer JWT)
                ▼
┌──────────────────────────────────────────────┐
│        Spring Boot REST API (port 5000)       │
│  JwtAuthenticationFilter → Controllers        │
│  → Services (DTO mapping) → JPA Repositories  │
└───────────────┬──────────────────────────────┘
                │ JPA / Hibernate
                ▼
┌──────────────────────────────────────────────┐
│          H2 (file)  /  PostgreSQL             │
│ users, profiles, projects, skills, experience,│
│ education, certifications, contact messages,  │
│ visitors                                      │
└──────────────────────────────────────────────┘
```

On first startup, `DataInitializer` seeds the admin account, profile, skills, experience, education, certifications, and sample projects.

---

## 📁 Project Structure

```text
Portfolio/
├── Backend/
│   ├── src/main/java/com/ritesh/portfolio/
│   │   ├── config/        # Security, CORS, Web MVC
│   │   ├── controller/    # REST controllers
│   │   ├── dto/           # Request/response objects
│   │   ├── entity/        # JPA entities
│   │   ├── exception/     # Custom exceptions + global handler
│   │   ├── repository/    # Spring Data repositories
│   │   ├── security/      # JWT service, filter, user details
│   │   ├── seed/          # DataInitializer
│   │   ├── service/       # Business logic, email, analytics
│   │   └── util/          # Validation helpers
│   ├── src/main/resources/application.yml
│   ├── Dockerfile         # Multi-stage build (Maven → JRE 17 Alpine)
│   └── pom.xml
│
├── Frontend/
│   ├── public/            # Resume PDF, icons, SPA redirects
│   ├── src/
│   │   ├── assets/        # Profile photo, project & certificate images
│   │   ├── components/    # Navbar, Footer, Button, Modal, Toast, ...
│   │   ├── context/       # AuthContext, PortfolioContext
│   │   ├── data/          # Static project data
│   │   ├── hooks/         # useAuth, useProjects, useSkills, ...
│   │   ├── layouts/       # Admin layout, sidebar, header
│   │   ├── pages/         # Public pages + Admin dashboard sections
│   │   ├── routes/        # AppRoutes, ProtectedRoute
│   │   ├── sections/      # Homepage sections
│   │   ├── services/      # Axios API modules
│   │   └── utils/         # Constants, validators, formatters
│   ├── netlify.toml       # Netlify build + SPA redirect
│   ├── vercel.json        # Vercel SPA rewrite
│   └── vite.config.js
│
├── run_project.ps1        # Windows helper: starts backend + frontend
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **JDK 17+**
- **Maven 3.8+** (or use `mvnw.cmd` on Windows)
- PostgreSQL *(optional — H2 works out of the box)*

### 1. Clone

```bash
git clone https://github.com/Riteshpanda001/Portfolio.git
cd Portfolio
```

### 2. Run the backend

```bash
cd Backend
mvn spring-boot:run          # Windows alternative: .\mvnw.cmd spring-boot:run
```

The API starts at **http://localhost:5000**.

### 3. Run the frontend

```bash
cd Frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**.

### One-command start (Windows)

```powershell
.\run_project.ps1
```

This opens two PowerShell windows, one for the backend and one for the frontend.

### Useful commands

| Where | Command | Purpose |
|---|---|---|
| Frontend | `npm run dev` | Start dev server |
| Frontend | `npm run build` | Production build to `dist/` |
| Frontend | `npm run preview` | Preview the production build |
| Frontend | `npm run lint` | Lint with oxlint |
| Backend | `mvn clean package` | Build the executable JAR |

---

## ⚙️ Configuration

### Backend environment variables

All settings live in `Backend/src/main/resources/application.yml` and can be overridden with environment variables.

| Variable | Purpose | Default |
|---|---|---|
| `DB_URL` | JDBC URL | H2 file DB at `./data/portfoliodb` |
| `DB_USERNAME` / `DB_PASSWORD` | Database credentials | `sa` / *(empty)* |
| `DB_DRIVER` | JDBC driver class | `org.h2.Driver` |
| `JWT_SECRET` | JWT signing key (64+ bytes) | development key |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins | `localhost:5173`, `5174`, `3000` |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | Gmail SMTP login (use an **App Password**) | – |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Seeded admin account | development defaults |

Other defaults: server port `5000`, JWT lifetime 24 h, refresh token 7 days, max upload size 10 MB.

### Frontend environment variables

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Before deploying:** set `JWT_SECRET` and `ADMIN_PASSWORD` to strong, private values. The built-in defaults are for local development only.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Public

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Admin login, returns JWT |
| `POST` | `/auth/refresh` | Refresh access token |
| `GET` | `/projects`, `/projects/featured`, `/projects/{id}` | Projects |
| `GET` | `/skills`, `/skills/grouped`, `/skills/{id}` | Skills |
| `GET` | `/experience`, `/education`, `/certifications` | Timeline and credentials (also `/{id}`) |
| `GET` | `/profile` | Public profile |
| `POST` | `/contact` | Submit a contact message |
| `POST` | `/newsletter/subscribe` | Newsletter signup |
| `POST` | `/analytics/visit` | Record a visit |
| `GET` | `/actuator/health` | Health check (served at the server root, not under `/api`) |

### Admin (requires `ROLE_ADMIN`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/dashboard` | Dashboard summary |
| `POST` `PUT` `DELETE` | `/projects`, `/skills`, `/experience`, `/education`, `/certifications` | Create / update / delete entries |
| `PUT` | `/profile` | Update profile |
| `GET` | `/contact` or `/contact/messages` | List messages |
| `PATCH` | `/contact/{id}/read` | Mark message as read |
| `DELETE` | `/contact/{id}` | Delete message |
| `GET` | `/analytics/stats` | Visitor statistics |
| `POST` | `/upload` | Upload a file (served from `/media/**`) |
| `PUT` | `/auth/profile`, `/auth/password` | Update admin account / password |

---

## 🔐 Security

- Stateless **JWT** authentication with BCrypt-hashed passwords
- `JwtAuthenticationFilter` validates tokens on every request
- Role-based access with `@PreAuthorize("hasRole('ADMIN')")` on all write endpoints
- Frontend `ProtectedRoute` guards `/admin`; the Axios interceptor clears the session and redirects to login on `401`
- Configurable **CORS** allow-list
- Bean Validation on request payloads; uploads are renamed with a random prefix and sanitised filenames
- H2 web console is **disabled** in configuration
- Secrets and database files are excluded from Git via `.gitignore`

---

## ☁️ Deployment

**Frontend** (Netlify or Vercel)
- Build command: `npm run build`, publish directory: `dist`
- Set `VITE_API_URL` to your deployed API URL
- SPA fallback routing is already configured in `netlify.toml`, `vercel.json`, and `public/_redirects`

**Backend** (Docker)

```bash
cd Backend
docker build -t portfolio-backend .
docker run -p 5000:5000 \
  -e JWT_SECRET=<your-secret> \
  -e ADMIN_PASSWORD=<your-password> \
  -e CORS_ALLOWED_ORIGINS=https://your-frontend-domain \
  portfolio-backend
```

For production, point `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DRIVER=org.postgresql.Driver` at a PostgreSQL instance, and mount a volume for `uploads/`.

---

## 🎨 Design System

The **Midnight Aurora** theme uses a dark obsidian base with indigo, mint, and pink accents, glass-style cards, and Framer Motion transitions. Tokens are defined as CSS custom properties in `Frontend/src/index.css`.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0B0F1A` | Page background |
| `--color-card` | `#141B2D` | Card surface |
| `--color-text` | `#E6EAF2` | Primary text |
| `--color-muted` | `#8A94A6` | Secondary text |
| `--color-accent` | `#6C63FF` | Primary accent (indigo) |
| `--color-accent-mint` | `#00E5C3` | Secondary accent |
| `--color-accent-pink` | `#EC4899` | Tertiary accent |

Typography: **Outfit** for headings, **Inter** for body text.

---

## 🗺️ Roadmap

- [x] Spring Boot REST API with JWT security and data seeding
- [x] React SPA with all public pages and responsive design
- [x] Admin dashboard (profile, skills, projects, experience, messages)
- [x] Dockerfile for the backend
- [ ] `docker-compose.yml` for frontend, backend, and PostgreSQL
- [ ] Automated unit and integration tests (backend)
- [ ] CI/CD with GitHub Actions (build and lint)
- [ ] Move the remaining static project data to the API

---

## 📬 Contact

**Ritesh Kumar Panda**
- 📧 riteshkumarpanda001@gmail.com
- 💻 [GitHub](https://github.com/Riteshpanda001)
- 🔗 [LinkedIn](https://www.linkedin.com/in/ritesh-kumar-panda-9b55b135a)

---

<p align="center">Built with ☕, React, and Spring Boot.</p>
