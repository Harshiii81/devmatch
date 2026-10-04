# DevMatch

**A platform to help developers and students find teammates for projects, hackathons, and technical collaborations.**

Built as part of the **Cognifyz Technologies Full Stack Development Internship**.

🔗 **Live App:** https://proud-spirit-production-6770.up.railway.app
🔗 **GitHub:** https://github.com/Harshiii81/devmatch

---

## Problem Statement

Many students and developers have project ideas but struggle to find people with the right technical skills, interests, and availability to build them. DevMatch provides a structured platform where users can create developer profiles, post project ideas, discover projects that match their skills, and apply to join teams.

## Features

- **User Authentication** — Registration, login, logout, session-based auth, bcrypt password hashing
- **Developer Profiles** — Skills, experience level, bio, interests, availability, GitHub/portfolio links
- **Project Creation & Management** — Create, edit, and delete project postings (owner-only)
- **Browse & Search** — Filter projects by skill and project type
- **Applications** — Apply to projects, view applicants, accept/reject
- **Team Formation** — Automatic team membership on acceptance, team capacity limits
- **REST API** — JSON endpoints for projects, consumed by a live-search frontend page using `fetch()`

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Bootstrap 5, JavaScript, EJS (server-side rendering) |
| Backend | Node.js, Express.js |
| Database | MySQL (hosted on Railway) |
| Authentication | express-session + bcrypt |
| Deployment | Railway (app + database) |
| Version Control | Git + GitHub |

## Architecture

Session-based authentication was chosen over JWT because DevMatch is a traditional server-rendered EJS application, not a decoupled frontend/backend — sessions are the simpler, more natural fit for this architecture.

## Database Schema

Four tables: `users`, `projects`, `applications`, `project_members`, with foreign keys and `ON DELETE CASCADE` to maintain referential integrity. Full schema in `/schema.sql`.

## API Endpoints

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/api/projects` | List/search projects | No |
| GET | `/api/projects/:id` | Single project details | No |
| POST | `/api/projects` | Create project via API | Yes |

Plus full server-rendered routes for auth, profiles, projects, and applications — see `/routes`.

## Installation & Local Setup