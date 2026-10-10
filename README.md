# DevMatch

A full-stack web platform that helps developers and students find teammates for projects, hackathons, and technical collaborations.

**Developed as part of the Cognifyz Technologies Full Stack Development Internship.**

- **Live Application:** https://proud-spirit-production-6770.up.railway.app
- **GitHub Repository:** https://github.com/Harshiii81/devmatch

## 1. Project Overview

DevMatch is a developer collaboration platform designed to help students and developers connect with people who share similar technical interests. Users can create profiles, publish project ideas, discover available projects, apply to join teams, and manage project applications.

The platform aims to simplify team formation for academic projects, hackathons, and personal development projects.

## 2. Problem Statement

Many students and developers have innovative project ideas but struggle to find collaborators with the right technical skills, interests, and availability. Finding suitable teammates can be difficult when opportunities are scattered across different platforms.

DevMatch addresses this problem by providing a centralized platform where users can showcase their skills, discover projects, connect with potential teammates, and manage collaboration opportunities.

## 3. Key Features

- **User Authentication:** Registration, login, logout, session-based authentication, and bcrypt password hashing.
- **Developer Profiles:** Profiles containing skills, experience level, biography, interests, availability, and GitHub or portfolio links.
- **Project Management:** Create, edit, and delete project postings, with ownership checks for project management.
- **Project Discovery:** Browse and filter projects by skills and project type.
- **Application Management:** Apply to projects, review applicants, and accept or reject applications.
- **Team Formation:** Add accepted applicants to project teams while enforcing team capacity limits.
- **Notifications:** Access notification-related features available in the application.
- **REST API:** JSON endpoints for retrieving and creating project data.
- **Live Search:** Fetch project data from the API and dynamically update search results without a full page reload.
- **Responsive Interface:** A web interface built using HTML, CSS, Bootstrap 5, JavaScript, and EJS templates.

## 4. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Bootstrap 5, JavaScript |
| Templating | EJS |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Authentication | express-session, bcrypt |
| Database Hosting | Railway |
| Application Deployment | Railway |
| Version Control | Git, GitHub |

## 5. Application Architecture

DevMatch follows a server-rendered full-stack web architecture.

- **Frontend:** EJS templates generate HTML pages, while CSS, Bootstrap, and JavaScript provide styling and interactivity.
- **Backend:** Express.js handles HTTP requests, routing, application logic, and authentication.
- **Database:** MySQL stores user profiles, project information, applications, and project membership records.
- **Authentication:** Express sessions maintain logged-in user state, while bcrypt hashes passwords.
- **API Communication:** JavaScript's Fetch API communicates with project endpoints and updates search results dynamically.
- **Deployment:** Railway hosts the deployed application and database configuration.

Session-based authentication was selected because it fits the server-rendered EJS architecture and allows the application to maintain user login state across requests.

## 6. Database Schema

The application uses four primary database tables:

1. **users** — stores user account and developer profile information.
2. **projects** — stores project details and ownership information.
3. **applications** — stores applications submitted by developers to join projects.
4. **project_members** — stores project team membership information.

Foreign-key relationships and `ON DELETE CASCADE` constraints are used where defined in the database schema to maintain referential integrity.

The complete database schema is available in `schema.sql`.

## 7. REST API Endpoints

The project exposes the following documented API endpoints:

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| GET | `/api/projects` | Retrieve and search projects | Not required |
| GET | `/api/projects/:id` | Retrieve details for a specific project | Not required |
| POST | `/api/projects` | Create a project through the API | Required |

The application also provides server-rendered routes for authentication, developer profiles, project management, and project applications.

The API route definitions are available in `routes/`.

## 8. Installation and Local Setup

### Prerequisites

Install the following software before running the project locally:

- Node.js and npm
- MySQL Server
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/Harshiii81/devmatch.git
cd devmatch
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the project root directory. Use `.env.example` as a reference if it is included in the repository.

Example configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=devmatch
SESSION_SECRET=your_random_secret_string
```

Replace the example values with your local MySQL credentials and a secure, randomly generated session secret.

**Security note:** Never commit your actual `.env` file, database password, or session secret to GitHub.

### Step 4: Create the database

Create the `devmatch` database in MySQL and execute the SQL statements in `schema.sql` to create the required tables and relationships.

Ensure that the database credentials in `.env` match your local MySQL configuration.

### Step 5: Start the application

```bash
npm run dev
```

This command assumes the project defines a `dev` script in `package.json`.

### Step 6: Open the application

Visit:

http://localhost:3000

The application should be available locally once the server starts successfully and the database connection is established.

## 9. Testing

The project was manually tested across authentication, developer profiles, project management, applications, API functionality, and error handling.

The development testing checklist covered 34 test cases, with all tests reported as passing.

Testing areas included:

- User registration and login.
- Session handling and logout.
- Developer profile management.
- Project creation, editing, and deletion.
- Project discovery and search.
- Application submission and review.
- Team membership and capacity restrictions.
- API responses and error handling.
- Authentication and authorization checks.

## 10. Cognifyz Internship Task Mapping

The following table maps the implemented functionality to the corresponding Cognifyz Full Stack Development internship tasks.

| Task | Internship Requirement | DevMatch Implementation | Relevant Files |
|---|---|---|---|
| Task 1 — Beginner | HTML forms, Express server, server-side endpoints, EJS rendering | Registration, login, and project forms; Express routing; server-rendered EJS pages | `app.js`, `routes/`, `views/` |
| Task 2 — Beginner | Form interaction, client-side and server-side validation, temporary server-side state | Browser-side form validation, server-side authentication validation, session-based login state | `public/js/validation.js`, `controllers/authController.js` |
| Task 3 — Intermediate | Responsive layouts, CSS styling, transitions, Bootstrap | Responsive layouts, Bootstrap components, styled cards and form inputs, mobile navigation | `views/partials/header.ejs`, `public/css/style.css` |
| Task 5 — Advanced | REST API endpoints, frontend API communication, fetching and displaying data | Project API endpoints and a live-search page using Fetch API | `routes/apiRoutes.js`, `public/js/liveSearch.js` |
| Task 6 — Advanced | Database integration, authentication, and authorization | MySQL integration, bcrypt password hashing, session authentication, and ownership checks | `config/db.js`, `models/`, `middleware/authMiddleware.js` |

**Tasks completed:** 1, 2, 3, 5, and 6.

**Tasks not implemented:** 4, 7, and 8.

These five tasks represent the minimum number specified in the internship instructions, provided the implemented features satisfy the corresponding requirements.

## 11. Future Improvements

Potential enhancements for future versions include:

- Email verification during registration.
- Real-time notifications for application status changes.
- Pagination for larger project listings.
- OAuth authentication through Google or GitHub.
- Additional API endpoints and automated integration testing.

## 12. Learning Outcomes

Developing DevMatch provided practical experience with:

- Building a full-stack web application using Node.js and Express.js.
- Rendering dynamic pages using EJS.
- Integrating a MySQL database with a backend application.
- Implementing authentication, session management, and password hashing.
- Developing and consuming REST API endpoints.
- Implementing validation and access-control checks.
- Deploying a web application using Railway.
- Managing source code with Git and GitHub.

## 13. Conclusion

DevMatch demonstrates the development of a full-stack collaboration platform that enables developers and students to discover projects, showcase their skills, and find potential teammates.

The project combines server-side development, database integration, authentication, API communication, and responsive web design into a single application.

Developing this project was a valuable learning experience and an opportunity to apply full-stack development concepts in a practical internship project.