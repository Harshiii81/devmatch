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
- **REST API** — JSON endpoints for projects, consumed by a live-search frontend page using fetch()

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

Four tables: users, projects, applications, project_members, with foreign keys and ON DELETE CASCADE to maintain referential integrity. Full schema in /schema.sql.

## API Endpoints

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | /api/projects | List/search projects | No |
| GET | /api/projects/:id | Single project details | No |
| POST | /api/projects | Create project via API | Yes |

Plus full server-rendered routes for auth, profiles, projects, and applications — see /routes.

## Installation & Local Setup

Clone the repository, then install dependencies:

    git clone https://github.com/Harshiii81/devmatch.git
    cd devmatch
    npm install

Create a .env file (see .env.example for the required keys):

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=devmatch
    SESSION_SECRET=your_random_secret_string

Create the database and tables using the SQL in /schema.sql, then run:

    npm run dev

Visit http://localhost:3000.

## Testing

A full manual testing pass (34 test cases across authentication, profiles, projects, applications, the API, and error handling) was completed with all tests passing.

## Future Improvements

- Email verification on registration
- Real-time notifications for application status changes
- Pagination for large project lists
- OAuth login (Google/GitHub)

## Cognifyz Task Mapping

| Task | Requirement | DevMatch Implementation | Evidence |
|---|---|---|---|
| Task 1 (Beginner) | HTML forms, Node/Express server, server-side endpoints, EJS rendering | Registration, login, and project-creation forms; Express server with dedicated route files; every page rendered server-side via EJS with shared header/footer partials | routes/, views/, app.js |
| Task 2 (Beginner) | Complex forms/interactions, client-side JS validation, server-side validation, temporary data handling | Registration form validated both in-browser (public/js/validation.js) and on the server (controllers/authController.js); session (express-session) used for temporary logged-in state | public/js/validation.js, controllers/authController.js |
| Task 3 (Intermediate) | Advanced CSS, responsive design, multi-section layouts, transitions/animations, Bootstrap | Bootstrap 5 navbar/grid, responsive 3-column landing page, hover/focus transitions on cards and form inputs, mobile hamburger menu | views/partials/header.ejs, public/css/style.css |
| Task 5 (Advanced) | RESTful API endpoints, CRUD, frontend interacting with own API, fetching/displaying API data | /api/projects (GET, POST) built with Express; /projects/live-search page uses fetch() to call this API and dynamically renders results with no page reload | routes/apiRoutes.js, public/js/liveSearch.js |
| Task 6 (Advanced) | MySQL integration, user authentication, secure/authorized API endpoints | MySQL schema with foreign keys (hosted on Railway in production); bcrypt password hashing; session-based auth; ownership checks on project edit/delete and application accept/reject | config/db.js, models/, middleware/authMiddleware.js, controllers/applicationController.js |

Tasks 4, 7, and 8 were not implemented — 5 of 8 tasks were completed, meeting the internship's minimum requirement, with a deliberate choice to keep the project focused and fully polished rather than partially covering additional tasks.