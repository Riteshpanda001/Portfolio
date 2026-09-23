# Portfolio System Architecture

## Overview
The Portfolio system is a decoupled full-stack application built with:
- **Backend**: Spring Boot 3, Java 17, Spring Security (Stateless JWT), Spring Data JPA, H2/PostgreSQL.
- **Frontend**: React 18, Vite, React Router v6, Axios, Vanilla CSS with custom glassmorphic tokens.

## System Topology
```
[ User Browser / Client ]
         │
         ▼
[ React Single-Page App (Port 5173) ]
         │ (REST APIs over HTTPS / JSON)
         ▼
[ Spring Boot REST Controllers (Port 8080) ]
         │
 ┌───────┴───────┐
 ▼               ▼
[ Spring Security JWT ] ──► [ H2 / PostgreSQL DB ]
```
