# 🚀 Ritesh Kumar Panda — Portfolio

A modern, high-performance, full-stack developer portfolio and engineering showcase designed to present software engineering capabilities, AI/ML initiatives, data analytics projects, academic milestones, and verified certifications. The platform features an immersive public interactive experience and a secured administrative dashboard for dynamic content management.

---

## 📌 About the Project

### What It Is
This repository contains the complete full-stack codebase for the personal portfolio of **Ritesh Kumar Panda** — an AI/ML Engineer & Full-Stack Developer. It integrates a reactive client interface with a secure, production-ready Spring Boot backend.

### Purpose & Main Goals
- **Professional Showcase**: Present real-world projects in Machine Learning, Generative AI, Data Science, and Full-Stack Engineering with live links, source code, and comprehensive case studies.
- **Credential Verification**: Provide direct, verifiable access to educational milestones (B.Tech CSE @ NIST University) and industry certifications (Oracle Agentic AI Foundations Associate, NIST Python Data Science).
- **Recruiter Engagement**: Enable hiring managers and technical leads to review technical skill proficiencies, examine architectural decisions, download formatted resumes, and send instant inquiries.
- **Dynamic Content Administration**: Offer an authenticated admin portal to manage portfolio entries, track analytics, and review visitor messages in real time.

### Target Users
- **Technical Recruiters & Hiring Managers**: Evaluating candidate credentials, skill matrices, and downloadable resumes.
- **Engineering Leads & Collaborators**: Inspecting architecture patterns, code quality, and project repositories.
- **Site Administrator**: Managing platform entities, incoming messages, and live profile details.

---

## ✨ Features

### Public Experience
- **Hero Section**: High-contrast Midnight Aurora aesthetic with dynamic title banners, introduction badges, and one-click access to projects, resume, and contact links.
- **About Section**: Comprehensive background summary covering academic journey at NIST University, core interests in AI/ML and software engineering, and key highlight badges.
- **Skills & Technologies**: Interactive, categorized skill matrix (Machine Learning, Data Analytics, Java & Backend, Frontend, DevOps & Tools) with visual proficiency levels and technology badges.
- **Featured Projects**: Curated project gallery with category filtering (AI/ML, Full-Stack, Data Science, Business Intelligence) and direct GitHub repositories.
- **Project Details**: Dedicated dynamic project case study pages (`/projects/:id`) displaying extended descriptions, architecture notes, and technology tags.
- **Professional Journey**: Chronological experience timeline detailing industry internships (Generative AI Intern at Asirudh Software) and hands-on technical roles.
- **Education**: Detailed academic history outlining B.Tech in Computer Science and Engineering at NIST University and Higher Secondary coursework.
- **Training & Learning / Certifications**: Dedicated certifications showcase with credential verification links (Oracle Cloud Infrastructure Agentic AI Foundations Associate, NIST Data Science & Data Analysis).
- **Interactive Resume**: Clean web resume view with options to review experience, education, skills, and download the official PDF.
- **Contact**: Interactive contact form with real-time field validation, error feedback, and direct backend API integration.

### Admin Suite & Management
- **Admin Dashboard**: Centralized management hub summarizing system status, project counts, and recent activity.
- **Authentication**: Stateless JWT authentication with bcrypt-encrypted credentials and route protection.
- **Profile Management**: Live editing for bio, contact details, social URLs, and headline highlights.
- **Project Management**: Full CRUD interface for creating, editing, reordering, and deleting project listings.
- **Contact Message Management**: Dedicated inbox to review, organize, and delete incoming recruiter messages.
- **Analytics**: Real-time overview of portfolio engagement and interaction statistics.

---

## 🛠️ Tech Stack

### Frontend
- **React** (v19) — Component-driven declarative user interface
- **Vite** — High-speed build tool and development server
- **React Router** (v7) — Client-side declarative routing and protected route guards
- **Axios** — HTTP client with interceptors for JWT injection and centralized error handling
- **Framer Motion** — Smooth fluid animations, micro-interactions, and scroll reveals
- **Vanilla CSS** — Custom design system built with CSS custom properties and zero unvetted CSS bloat

### Backend
- **Java 17 LTS** — Robust, type-safe programming language
- **Spring Boot 3.2.4** — Enterprise-grade backend framework
- **Spring Security 6** — Role-based access control and security filter chain
- **JWT (jjwt 0.12.5)** — Stateless authentication with secure access tokens
- **Spring Data JPA / Hibernate** — Object-Relational Mapping (ORM) and data abstraction
- **Maven** — Dependency management and build lifecycle automation

### Database
- **PostgreSQL** — Production-grade relational database
- **H2 Database** — In-memory database with automatic schema generation and seeders for development

---

## 🏗️ Project Architecture

The application adopts a decoupled client-server architecture ensuring high scalability, maintainability, and clean separation of concerns.

```text
                         ┌──────────────────────────┐
                         │        USER / VISITOR    │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │      React Frontend       │
                         │       React + Vite        │
                         └────────────┬─────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
          ┌───────────────────┐               ┌───────────────────┐
          │ Public Pages      │               │ Admin Dashboard   │
          │                   │               │                   │
          │ Home              │               │ Login             │
          │ About             │               │ Projects          │
          │ Skills            │               │ Messages          │
          │ Projects          │               │ Profile           │
          │ Experience        │               │ Dashboard         │
          │ Education         │               └─────────┬─────────┘
          │ Training          │                         │
          │ Contact           │                         │ JWT
          │ Resume            │                         │
          └─────────┬─────────┘                         │
                    │                                   │
                    └─────────────────┬─────────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │      Axios API Layer     │
                         │   /api/... REST calls    │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────────┐
                    │         Spring Boot Backend         │
                    │                                     │
                    │  Controllers                         │
                    │       ↓                             │
                    │  Services                            │
                    │       ↓                             │
                    │  Repositories                        │
                    │       ↓                             │
                    │  JPA / Hibernate                      │
                    └────────────────┬────────────────────┘
                                     │
                                     ▼
                         ┌──────────────────────────┐
                         │        Database          │
                         │       PostgreSQL         │
                         └──────────────────────────┘
```

### Architectural Layers
1. **Frontend Presentation**: React components organized into modular sections and lazy-loaded route views.
2. **Frontend Service Layer**: Encapsulated API client modules (`authService`, `projectService`, `contactService`, etc.) utilizing Axios.
3. **REST API Controllers**: Expose versioned endpoints, handle HTTP parameters, and delegate requests to service layers.
4. **Service Layer**: Implements business logic, validation rules, and DTO-to-entity mapping.
5. **Repository Layer**: Extends `JpaRepository` for data access and custom queries.
6. **Data Storage**: PostgreSQL in production and H2 in local development.

### Routes Configuration
- **Public Routes**: `/`, `/about`, `/skills`, `/projects`, `/projects/:id`, `/experience`, `/education`, `/certifications`, `/contact`, `/resume`
- **Admin Routes (Protected)**: `/admin/login`, `/admin`, `/admin/projects`, `/admin/messages`, `/admin/profile`

---

## 📁 Project Structure

```text
Portfolio/
│
├── README.md
├── .gitignore
│
├── .github/
│   └── workflows/
│       └── ...
│
├── Frontend/
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── profile/
│   │   │   │   └── profile.jpg
│   │   │   │
│   │   │   ├── projects/
│   │   │   │   ├── ai-recruitment.png
│   │   │   │   ├── ai-risk-manager.png
│   │   │   │   ├── college-ai-assistant.png
│   │   │   │   ├── ecommerce-bi.png
│   │   │   │   ├── customer-churn.png
│   │   │   │   ├── job-market.png
│   │   │   │   └── myshope.png
│   │   │   │
│   │   │   ├── certificates/
│   │   │   │   └── nist-certificate.png
│   │   │   │
│   │   │   ├── logos/
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── icons/
│   │   │       └── ...
│   │   │
│   │   ├── resume/
│   │   │   └── RiteshPanda.pdf
│   │   │
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logos/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── SectionTitle.jsx
│   │   │   │   └── ScrollToTop.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── BackToTop.jsx
│   │   │   │
│   │   │   ├── hero/
│   │   │   │   ├── Hero.jsx
│   │   │   │   └── Hero.css
│   │   │   │
│   │   │   ├── about/
│   │   │   │   ├── About.jsx
│   │   │   │   ├── EducationCard.jsx
│   │   │   │   └── About.css
│   │   │   │
│   │   │   ├── skills/
│   │   │   │   ├── Skills.jsx
│   │   │   │   ├── SkillCard.jsx
│   │   │   │   └── Skills.css
│   │   │   │
│   │   │   ├── projects/
│   │   │   │   ├── FeaturedProjects.jsx
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   ├── ProjectGrid.jsx
│   │   │   │   ├── ProjectFilter.jsx
│   │   │   │   └── ProjectModal.jsx
│   │   │   │
│   │   │   ├── experience/
│   │   │   │   ├── ProfessionalJourney.jsx
│   │   │   │   ├── ExperienceCard.jsx
│   │   │   │   └── Timeline.jsx
│   │   │   │
│   │   │   ├── training/
│   │   │   │   ├── TrainingSection.jsx
│   │   │   │   ├── TrainingCard.jsx
│   │   │   │   └── CertificateModal.jsx
│   │   │   │
│   │   │   └── contact/
│   │   │       ├── Contact.jsx
│   │   │       ├── ContactForm.jsx
│   │   │       └── SocialLinks.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── Home.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── SkillsPage.jsx
│   │   │   ├── ProjectsPage.jsx
│   │   │   ├── ProjectDetailsPage.jsx
│   │   │   ├── ExperiencePage.jsx
│   │   │   ├── TrainingPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── ResumePage.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── AdminLogin.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageProjects.jsx
│   │   │       ├── ManageSkills.jsx
│   │   │       ├── ManageExperience.jsx
│   │   │       ├── ManageTraining.jsx
│   │   │       ├── ManageProfile.jsx
│   │   │       └── Messages.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   ├── skillService.js
│   │   │   ├── experienceService.js
│   │   │   ├── educationService.js
│   │   │   ├── trainingService.js
│   │   │   ├── profileService.js
│   │   │   └── contactService.js
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── PortfolioContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useProjects.js
│   │   │   └── useScroll.js
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── data/
│   │   │   ├── projects.js
│   │   │   ├── skills.js
│   │   │   ├── experience.js
│   │   │   └── training.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
│
└── Backend/
    │
    ├── src/
    │   │
    │   ├── main/
    │   │   │
    │   │   ├── java/
    │   │   │   └── com/
    │   │   │       └── ritesh/
    │   │   │           └── portfolio/
    │   │   │               │
    │   │   │               ├── PortfolioApplication.java
    │   │   │               │
    │   │   │               ├── config/
    │   │   │               │   ├── CorsConfig.java
    │   │   │               │   ├── SecurityConfig.java
    │   │   │               │   └── AppConfig.java
    │   │   │               │
    │   │   │               ├── controller/
    │   │   │               │   ├── AuthController.java
    │   │   │               │   ├── ProfileController.java
    │   │   │               │   ├── ProjectController.java
    │   │   │               │   ├── SkillController.java
    │   │   │               │   ├── ExperienceController.java
    │   │   │               │   ├── EducationController.java
    │   │   │               │   ├── TrainingController.java
    │   │   │               │   ├── ContactController.java
    │   │   │               │   └── AdminController.java
    │   │   │               │
    │   │   │               ├── service/
    │   │   │               │   ├── AuthService.java
    │   │   │               │   ├── ProfileService.java
    │   │   │               │   ├── ProjectService.java
    │   │   │               │   ├── SkillService.java
    │   │   │               │   ├── ExperienceService.java
    │   │   │               │   ├── EducationService.java
    │   │   │               │   ├── TrainingService.java
    │   │   │               │   └── ContactService.java
    │   │   │               │
    │   │   │               ├── repository/
    │   │   │               │   ├── UserRepository.java
    │   │   │               │   ├── ProfileRepository.java
    │   │   │               │   ├── ProjectRepository.java
    │   │   │               │   ├── SkillRepository.java
    │   │   │               │   ├── ExperienceRepository.java
    │   │   │               │   ├── EducationRepository.java
    │   │   │               │   ├── TrainingRepository.java
    │   │   │               │   └── ContactRepository.java
    │   │   │               │
    │   │   │               ├── entity/
    │   │   │               │   ├── User.java
    │   │   │               │   ├── Profile.java
    │   │   │               │   ├── Project.java
    │   │   │               │   ├── Skill.java
    │   │   │               │   ├── Experience.java
    │   │   │               │   ├── Education.java
    │   │   │               │   ├── Training.java
    │   │   │               │   └── ContactMessage.java
    │   │   │               │
    │   │   │               ├── dto/
    │   │   │               │   ├── LoginRequest.java
    │   │   │               │   ├── LoginResponse.java
    │   │   │               │   ├── ProjectRequest.java
    │   │   │               │   ├── ProjectResponse.java
    │   │   │               │   ├── SkillRequest.java
    │   │   │               │   ├── ExperienceRequest.java
    │   │   │               │   ├── TrainingRequest.java
    │   │   │               │   └── ContactRequest.java
    │   │   │               │
    │   │   │               ├── security/
    │   │   │               │   ├── JwtService.java
    │   │   │               │   ├── JwtAuthenticationFilter.java
    │   │   │               │   └── CustomUserDetailsService.java
    │   │   │               │
    │   │   │               ├── exception/
    │   │   │               │   ├── GlobalExceptionHandler.java
    │   │   │               │   ├── ResourceNotFoundException.java
    │   │   │               │   └── UnauthorizedException.java
    │   │   │               │
    │   │   │               ├── mapper/
    │   │   │               │   ├── ProjectMapper.java
    │   │   │               │   ├── SkillMapper.java
    │   │   │               │   └── ExperienceMapper.java
    │   │   │               │
    │   │   │               └── util/
    │   │   │                   ├── Constants.java
    │   │   │                   └── ValidationUtil.java
    │   │   │
    │   │   └── resources/
    │   │       ├── application.properties
    │   │       ├── application-dev.properties
    │   │       └── application-prod.properties
    │   │
    │   └── test/
    │       └── java/
    │           └── com/
    │               └── ritesh/
    │                   └── portfolio/
    │                       ├── controller/
    │                       ├── service/
    │                       └── repository/
    │
    ├── pom.xml
    ├── .env
    ├── .env.example
    └── README.md

---

## 🔐 Authentication & Security

### Security Architecture
- **Stateless JWT Flow**: When an administrator logs in at `/api/auth/login`, the backend verifies credentials using `BCryptPasswordEncoder` and returns a signed JSON Web Token (JWT).
- **Authorization Filter**: `JwtAuthenticationFilter` intercepts incoming requests, validates token integrity and expiry, and populates the Spring Security `SecurityContext`.
- **Protected Admin Endpoints**: All write and delete endpoints (`/api/admin/**`, `POST /api/projects`, `PUT /api/profile`, etc.) require `ROLE_ADMIN` authority.
- **Public Endpoints**: Read operations (`GET /api/projects`, `GET /api/skills`, `GET /api/profile`) and inquiry submission (`POST /api/contact`) are publicly accessible without authentication.
- **CORS Configuration**: Restricts API calls to approved origins (`http://localhost:5173`, `http://localhost:3000`, and production domain).
- **Environment & Secret Management**: Sensitive credentials, JWT signing secrets, and database credentials are kept out of source code and injected via environment variables.
- **Input Validation**: All incoming payloads are validated using Jakarta Bean Validation (`@NotBlank`, `@Email`, `@Size`) and sanitized to prevent injection attacks.

---

## 🎨 Design System

### Midnight Aurora Theme
The **Midnight Aurora** design system pairs deep obsidian canvases with luminous electric accents to deliver a sleek, modern developer aesthetic.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0B0F1A` | Main page background (Cosmic Obsidian) |
| `--color-card` | `#141B2D` | Elevated container and card surface |
| `--color-text` | `#E6EAF2` | Primary high-contrast typography |
| `--color-muted` | `#8A94A6` | Secondary body text and subtitles |
| `--color-accent` | `#6C63FF` | Primary electric indigo accent |
| `--color-accent-mint` | `#00E5C3` | Secondary luminescent mint highlight |
| `--color-accent-pink` | `#EC4899` | Radiant aurora pink accent |

### Design Tokens & Guidelines
- **Typography**: Headings styled with `'Outfit', 'Inter', sans-serif`; body text set in `'Inter', sans-serif` for optimal legibility.
- **Gradients**:
  - Primary: `linear-gradient(135deg, #6C63FF, #EC4899)`
  - Mint: `linear-gradient(135deg, #6C63FF, #00E5C3)`
  - Card: `linear-gradient(145deg, #141B2D, #0d1424)`
- **Cards & Surfaces**: Semi-transparent border glassmorphism (`1px solid rgba(255,255,255,0.08)`), glowing radial backdrop, and smooth `translateY(-6px)` hover elevations.
- **Buttons & Badges**: Gradient-filled call-to-actions, subtle outline variants, and glowing drop shadows on focus/hover.
- **Navigation**: Sticky frosted-glass navbar (`70px` height) with responsive mobile drawer menu.
- **Animations & Micro-Interactions**: Powered by Framer Motion and cubic-bezier transitions (`0.3s cubic-bezier(0.4, 0, 0.2, 1)`).
- **Accessibility**: High color contrast ratios, semantic HTML5 elements, and descriptive image alt attributes.

---

## 🧠 Development Rules

### Code Quality
- **Component Reuse**: Reuse existing components in `Frontend/src/components/` rather than recreating ad-hoc elements.
- **Layer Separation**: Maintain strict `Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` hierarchy on the backend.
- **DTO Mapping**: Keep internal JPA entities private; always return structured DTOs from API controllers.
- **Service Encapsulation**: Keep frontend HTTP requests centralized inside `Frontend/src/services/`.

### Security
- **Secret Isolation**: Never commit hardcoded secrets, JWT keys, or database credentials.
- **Endpoint Guarding**: Ensure all data mutation endpoints are guarded with role-based Spring Security rules.
- **Input Validation**: Validate and sanitize all user-submitted form data.

### Content Accuracy
- **Fact-Based Profile**: Keep all profile bio information, technical proficiencies, education history, and certifications factually accurate for Ritesh Kumar Panda.
- **No Fabricated Projects**: Do not invent fake projects or claim unused technologies.

### Development
- **Responsive Guarantee**: Always verify responsive behavior across mobile (320px+), tablet, and desktop viewports.
- **Design System Fidelity**: Use predefined CSS custom properties from `index.css`; do not introduce uncoordinated colors.
- **Route Integrity**: Ensure lazy-loaded route imports are wrapped in Suspense fallbacks.

---

## 📋 Current Development Status

### ✅ Completed
- Initialized Spring Boot 3 REST API with PostgreSQL/H2, JWT security filter chain, and automated data seeding.
- Built React 19 Single Page Application with Vite, Framer Motion, and React Router DOM v7.
- Implemented Midnight Aurora design system tokens and responsive layouts.
- Built complete public pages: Home, About, Skills, Projects, Project Details, Experience, Education, Certifications, Contact, Resume.
- Developed authenticated Admin Suite: Login, Dashboard, Project CRUD, Message Inbox, Profile Manager.

### 🔄 In Progress
- Finalizing full repository documentation consolidation and README synchronization.

### 📋 Future Improvements
- Multi-container Docker deployment configuration (`docker-compose.yml` for Frontend, Backend, and PostgreSQL).
- End-to-end integration tests for Contact form dispatch and token refresh lifecycles.
- CI/CD automated build validation and linting with GitHub Actions.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher) & **npm**
- **Java Development Kit (JDK)** (version 17 or higher)
- **Maven** (v3.8+) or included Maven wrapper
- **PostgreSQL** (optional for production; H2 is pre-configured for instant local development)

### 1. Clone Repository
```bash
git clone https://github.com/Riteshpanda001/Portfolio.git
cd Portfolio
```

### 2. Backend Setup
```bash
cd Backend

# Build and run the Spring Boot application (default port: 5000)
mvn clean spring-boot:run
```
The backend API will start at `http://localhost:5000`. The H2 database console is accessible at `http://localhost:5000/h2-console`.

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to Frontend
cd Frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
The frontend application will be live at `http://localhost:5173`.
