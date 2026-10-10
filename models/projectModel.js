// models/projectModel.js

const db = require('../config/db');

const TEAM_COUNT_SQL = `
  1 + (SELECT COUNT(*) FROM project_members
       WHERE project_members.project_id = projects.id) AS current_team_size
`;

async function createProject(projectData) {
  const { ownerId, title, description, requiredSkills, teamSize, duration, projectType, commitment } = projectData;

  const [result] = await db.query(
    `INSERT INTO projects
     (owner_id, title, description, required_skills, team_size, duration, project_type, commitment)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [ownerId, title, description, requiredSkills, teamSize, duration, projectType, commitment]
  );

  return result.insertId;
}

async function findProjectById(id) {
  const [rows] = await db.query(
    `SELECT projects.*, users.name AS owner_name, users.github_url AS owner_github_url, ${TEAM_COUNT_SQL}
     FROM projects
     JOIN users ON projects.owner_id = users.id
     WHERE projects.id = ?`,
    [id]
  );
  return rows[0];
}

async function findAllProjects() {
  const [rows] = await db.query(
    `SELECT projects.*, users.name AS owner_name, ${TEAM_COUNT_SQL}
     FROM projects
     JOIN users ON projects.owner_id = users.id
     ORDER BY projects.created_at DESC`
  );
  return rows;
}

async function findProjectsByOwner(ownerId) {
  const [rows] = await db.query(
    'SELECT id, title, project_type FROM projects WHERE owner_id = ? ORDER BY created_at DESC',
    [ownerId]
  );
  return rows;
}

async function searchProjects(filters) {
  const { skill, projectType } = filters;

  let query = `
    SELECT projects.*, users.name AS owner_name, ${TEAM_COUNT_SQL}
    FROM projects
    JOIN users ON projects.owner_id = users.id
    WHERE 1 = 1
  `;
  const params = [];

  if (skill) {
    query += ' AND projects.required_skills LIKE ?';
    params.push(`%${skill}%`);
  }

  if (projectType) {
    query += ' AND projects.project_type = ?';
    params.push(projectType);
  }

  query += ' ORDER BY projects.created_at DESC';

  const [rows] = await db.query(query, params);
  return rows;
}

async function updateProject(id, projectData) {
  const { title, description, requiredSkills, teamSize, duration, projectType, commitment } = projectData;

  await db.query(
    `UPDATE projects
     SET title = ?, description = ?, required_skills = ?, team_size = ?, duration = ?, project_type = ?, commitment = ?
     WHERE id = ?`,
    [title, description, requiredSkills, teamSize, duration, projectType, commitment, id]
  );
}

async function deleteProject(id) {
  await db.query('DELETE FROM projects WHERE id = ?', [id]);
}

module.exports = {
  createProject, findProjectById, findAllProjects, findProjectsByOwner,
  searchProjects, updateProject, deleteProject
};