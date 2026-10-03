// models/projectMemberModel.js

const db = require('../config/db');

async function addProjectMember(projectId, userId, role = 'Member') {
  const [result] = await db.query(
    `INSERT INTO project_members (project_id, user_id, role)
     VALUES (?, ?, ?)`,
    [projectId, userId, role]
  );
  return result.insertId;
}

async function findMembersByProject(projectId) {
  const [rows] = await db.query(
    `SELECT project_members.*, users.name, users.skills, users.experience_level
     FROM project_members
     JOIN users ON project_members.user_id = users.id
     WHERE project_members.project_id = ?
     ORDER BY project_members.joined_at ASC`,
    [projectId]
  );
  return rows;
}

async function findProjectsJoinedByUser(userId) {
  const [rows] = await db.query(
    `SELECT projects.id, projects.title, project_members.role
     FROM project_members
     JOIN projects ON project_members.project_id = projects.id
     WHERE project_members.user_id = ?
     ORDER BY project_members.joined_at DESC`,
    [userId]
  );
  return rows;
}

module.exports = { addProjectMember, findMembersByProject, findProjectsJoinedByUser };