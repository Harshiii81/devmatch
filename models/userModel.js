// models/userModel.js

const db = require('../config/db');

async function createUser(userData) {
  const {
    name, email, passwordHash, experienceLevel,
    bio, skills, interests, availability, githubUrl, portfolioUrl
  } = userData;

  const [result] = await db.query(
    `INSERT INTO users
     (name, email, password_hash, experience_level, bio, skills, interests, availability, github_url, portfolio_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, passwordHash, experienceLevel, bio, skills, interests, availability, githubUrl, portfolioUrl]
  );

  return result.insertId;
}

async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await db.query(
    'SELECT id, name, email, experience_level, bio, skills, interests, availability, github_url, portfolio_url FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function updateUser(id, userData) {
  const {
    name, experienceLevel, bio, skills, interests, availability, githubUrl, portfolioUrl
  } = userData;

  await db.query(
    `UPDATE users
     SET name = ?, experience_level = ?, bio = ?, skills = ?, interests = ?, availability = ?, github_url = ?, portfolio_url = ?
     WHERE id = ?`,
    [name, experienceLevel, bio, skills, interests, availability, githubUrl, portfolioUrl, id]
  );
}

module.exports = { createUser, findUserByEmail, findUserById, updateUser };