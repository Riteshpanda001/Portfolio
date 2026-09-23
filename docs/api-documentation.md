# API Documentation

## Auth Endpoints
- `POST /api/auth/login`: Authenticate admin user, returns JWT access and refresh tokens.
- `POST /api/auth/refresh`: Refresh JWT access token.

## Public & Protected Resource Endpoints
- `GET /api/profile`: Fetch owner profile info.
- `PUT /api/profile`: (Admin) Update owner profile.
- `GET /api/projects`: List projects.
- `GET /api/projects/featured`: List featured projects.
- `POST /api/projects`: (Admin) Create project.
- `PUT /api/projects/{id}`: (Admin) Update project.
- `DELETE /api/projects/{id}`: (Admin) Delete project.
- `GET /api/skills`: List skills.
- `GET /api/skills/grouped`: Get skills grouped by category.
- `POST /api/contact`: Public user contact message submission.
- `GET /api/admin/dashboard`: (Admin) View total visits, message metrics, and system stats.
