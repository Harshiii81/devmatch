// controllers/userController.js

const { findPublicProfileById } = require('../models/userModel');
const { findProjectsByOwner } = require('../models/projectModel');
const { findProjectsJoinedByUser } = require('../models/projectMemberModel');

// Only allow http(s) links, so nobody can store a "javascript:" link in their profile
function safeUrl(url) {
  return /^https?:\/\//i.test(url || '') ? url : null;
}

async function viewPublicProfile(req, res) {
  const profileId = parseInt(req.params.id, 10);

  if (isNaN(profileId)) {
    return res.status(404).render('errors/404');
  }

  const profileUser = await findPublicProfileById(profileId);
  if (!profileUser) {
    return res.status(404).render('errors/404');
  }

  const createdProjects = await findProjectsByOwner(profileId);
  const joinedProjects = await findProjectsJoinedByUser(profileId);

  res.render('users/profile', {
    profileUser,
    githubUrl: safeUrl(profileUser.github_url),
    portfolioUrl: safeUrl(profileUser.portfolio_url),
    createdProjects,
    joinedProjects,
    isOwnProfile: profileId === req.session.userId
  });
}

module.exports = { viewPublicProfile };