// controllers/profileController.js

const { findUserById, updateUser } = require('../models/userModel');
const { findProjectsByOwner } = require('../models/projectModel');
const { findProjectsJoinedByUser } = require('../models/projectMemberModel');

async function viewProfile(req, res) {
  const user = await findUserById(req.session.userId);
  const createdProjects = await findProjectsByOwner(req.session.userId);
  const joinedProjects = await findProjectsJoinedByUser(req.session.userId);
  res.render('profile/view', { user, createdProjects, joinedProjects });
}

async function showEditForm(req, res) {
  const user = await findUserById(req.session.userId);
  res.render('profile/edit', { user, error: null });
}

async function updateProfile(req, res) {
  const { name, experienceLevel, bio, skills, interests, availability, githubUrl, portfolioUrl } = req.body;

  if (!name) {
    const user = await findUserById(req.session.userId);
    return res.render('profile/edit', { user, error: 'Name is required.' });
  }

  await updateUser(req.session.userId, {
    name, experienceLevel, bio, skills, interests, availability, githubUrl, portfolioUrl
  });

  res.redirect('/profile');
}

module.exports = { viewProfile, showEditForm, updateProfile };