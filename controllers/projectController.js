// controllers/projectController.js

const {
  createProject, findProjectById, findAllProjects, searchProjects,
  updateProject, deleteProject
} = require('../models/projectModel');
const { findMembersByProject } = require('../models/projectMemberModel');
const { findExistingApplication } = require('../models/applicationModel');

function showCreateForm(req, res) {
  res.render('projects/create', { error: null });
}

async function createNewProject(req, res) {
  const { title, description, requiredSkills, teamSize, duration, projectType, commitment } = req.body;

  if (!title || !description) {
    return res.render('projects/create', { error: 'Title and description are required.' });
  }

  const teamSizeNum = parseInt(teamSize, 10);
  if (isNaN(teamSizeNum) || teamSizeNum < 1) {
    return res.render('projects/create', { error: 'Team size must be a positive number.' });
  }

  const newProjectId = await createProject({
    ownerId: req.session.userId,
    title, description, requiredSkills,
    teamSize: teamSizeNum, duration, projectType, commitment
  });

  res.redirect(`/projects/${newProjectId}`);
}

async function viewProject(req, res) {
  const project = await findProjectById(req.params.id);
  if (!project) {
    return res.status(404).send('Project not found.');
  }

  const members = await findMembersByProject(project.id);

  let userApplication = null;
  if (req.session.userId) {
    userApplication = await findExistingApplication(project.id, req.session.userId);
  }

  const isTeamFull = Number(project.current_team_size) >= project.team_size;

  res.render('projects/details', { project, members, userApplication, isTeamFull });
}

async function browseProjects(req, res) {
  const { skill, projectType } = req.query;

  let projects;
  if (skill || projectType) {
    projects = await searchProjects({ skill, projectType });
  } else {
    projects = await findAllProjects();
  }

  res.render('projects/browse', {
    projects,
    filters: { skill: skill || '', projectType: projectType || '' }
  });
}

// Show edit form (owner only)
async function showEditProjectForm(req, res) {
  const project = await findProjectById(req.params.id);
  if (!project) {
    return res.status(404).send('Project not found.');
  }
  if (project.owner_id !== req.session.userId) {
    return res.status(403).send('You are not authorized to edit this project.');
  }
  res.render('projects/edit', { project, error: null });
}

// Handle edit submission (owner only)
async function updateExistingProject(req, res) {
  const project = await findProjectById(req.params.id);
  if (!project) {
    return res.status(404).send('Project not found.');
  }
  if (project.owner_id !== req.session.userId) {
    return res.status(403).send('You are not authorized to edit this project.');
  }

  const { title, description, requiredSkills, teamSize, duration, projectType, commitment } = req.body;

  if (!title || !description) {
    return res.render('projects/edit', { project, error: 'Title and description are required.' });
  }

  const teamSizeNum = parseInt(teamSize, 10);
  if (isNaN(teamSizeNum) || teamSizeNum < 1) {
    return res.render('projects/edit', { project, error: 'Team size must be a positive number.' });
  }

  // Don't allow shrinking team size below the number of members already accepted
  if (teamSizeNum < project.current_team_size) {
    return res.render('projects/edit', {
      project,
      error: `Team size can't be smaller than the current team (${project.current_team_size} members already in).`
    });
  }

  await updateProject(req.params.id, {
    title, description, requiredSkills, teamSize: teamSizeNum, duration, projectType, commitment
  });

  res.redirect(`/projects/${req.params.id}`);
}

// Handle delete (owner only)
async function deleteExistingProject(req, res) {
  const project = await findProjectById(req.params.id);
  if (!project) {
    return res.status(404).send('Project not found.');
  }
  if (project.owner_id !== req.session.userId) {
    return res.status(403).send('You are not authorized to delete this project.');
  }

  await deleteProject(req.params.id);
  res.redirect('/profile');
}

module.exports = {
  showCreateForm, createNewProject, viewProject, browseProjects,
  showEditProjectForm, updateExistingProject, deleteExistingProject
};