# Database Schema Reference

## Tables

### `users`
- `id` (BIGINT, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR)
- `role` (VARCHAR)
- `enabled` (BOOLEAN)

### `profiles`
- `id` (BIGINT, Primary Key)
- `name`, `title`, `bio`, `location`, `email`, `phone`
- `github_url`, `linkedin_url`, `twitter_url`, `avatar_url`, `resume_url`

### `projects`
- `id` (BIGINT, Primary Key)
- `title`, `summary`, `description`, `category`
- `image_url`, `github_url`, `live_url`
- `featured` (BOOLEAN), `display_order` (INT)

### `skills`
- `id` (BIGINT, Primary Key)
- `name`, `category`, `icon`
- `proficiency_level` (INT), `featured` (BOOLEAN)

### `experiences`, `educations`, `certifications`, `contact_messages`, `visitors`
- Structured entity tables for experience history, educational credentials, certifications, received user messages, and IP/visitor logging.
