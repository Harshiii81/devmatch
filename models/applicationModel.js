// models/applicationModel.js

const db = require('../config/db');

async function createApplication(projectId, applicantId, message) {
  const [result] = await db.query(
    `INSERT INTO applications (project_id, applicant_id, message)
     VALUES (?, ?, ?)`,
    [projectId, applicantId, message]
  );
  return result.insertId;
}

async function findExistingApplication(projectId, applicantId) {
  const [rows] = await db.query(
    'SELECT * FROM applications WHERE project_id = ? AND applicant_id = ?',
    [projectId, applicantId]
  );
  return rows[0]; // undefined if no existing application
}

async function findApplicationsByProject(projectId) {
  const [rows] = await db.query(
    `SELECT applications.*, users.name AS applicant_name, users.email AS applicant_email,
            users.skills AS applicant_skills, users.experience_level AS applicant_experience,
            users.github_url AS applicant_github_url
     FROM applications
     JOIN users ON applications.applicant_id = users.id
     WHERE applications.project_id = ?
     ORDER BY applications.created_at DESC`,
    [projectId]
  );
  return rows;
}

async function findApplicationById(id) {
  const [rows] = await db.query('SELECT * FROM applications WHERE id = ?', [id]);
  return rows[0];
}

async function updateApplicationStatus(id, status) {
  await db.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
}

module.exports = {
  createApplication, findExistingApplication, findApplicationsByProject,
  findApplicationById, updateApplicationStatus
};