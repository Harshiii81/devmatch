// controllers/applicationController.js

const { findProjectById } = require('../models/projectModel');
const {
  createApplication, findExistingApplication, findApplicationsByProject,
  findApplicationById, updateApplicationStatus
} = require('../models/applicationModel');
const { addProjectMember } = require('../models/projectMemberModel');

// Apply to a project
async function applyToProject(req, res) {
  const projectId = req.params.id;
  const applicantId = req.session.userId;
  const { message } = req.body;

  const project = await findProjectById(projectId);
  if (!project) {
    return res.status(404).send('Project not found.');
  }

  if (project.owner_id === applicantId) {
    return res.status(400).send('You cannot apply to your own project.');
  }

  if (Number(project.current_team_size) >= project.team_size) {
    return res.status(400).send('This project team is already full.');
  }

  const existing = await findExistingApplication(projectId, applicantId);
  if (existing) {
    return res.status(409).send('You have already applied to this project.');
  }

  await createApplication(projectId, applicantId, message);
  res.redirect(`/projects/${projectId}`);
}

// View applications for a project (owner only)
async function viewApplications(req, res) {
  const projectId = req.params.id;
  const project = await findProjectById(projectId);

  if (!project) {
    return res.status(404).send('Project not found.');
  }

  if (project.owner_id !== req.session.userId) {
    return res.status(403).send('You are not authorized to view this page.');
  }

  const applications = await findApplicationsByProject(projectId);
  res.render('projects/applications', { project, applications });
}

// Accept or reject an application (owner only)
async function respondToApplication(req, res) {
  const applicationId = req.params.id;
  const { status } = req.body;

  if (status !== 'accepted' && status !== 'rejected') {
    return res.status(400).send('Invalid status.');
  }

  const application = await findApplicationById(applicationId);
  if (!application) {
    return res.status(404).send('Application not found.');
  }

  const project = await findProjectById(application.project_id);

  if (project.owner_id !== req.session.userId) {
    return res.status(403).send('You are not authorized to do this.');
  }

  // Only pending applications can be changed (prevents accepting twice)
  if (application.status !== 'pending') {
    return res.status(400).send('This application has already been answered.');
  }

  if (status === 'accepted') {
    if (Number(project.current_team_size) >= project.team_size) {
      return res.status(400).send('Team is full. You cannot accept more members.');
    }
    await addProjectMember(application.project_id, application.applicant_id, 'Member');
  }

  await updateApplicationStatus(applicationId, status);

  res.redirect(`/projects/${application.project_id}/applications`);
}

module.exports = { applyToProject, viewApplications, respondToApplication };