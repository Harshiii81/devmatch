// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');
const {
  showCreateForm, createNewProject, viewProject, browseProjects,
  showEditProjectForm, updateExistingProject, deleteExistingProject
} = require('../controllers/projectController');

router.get('/projects', browseProjects);
router.get('/projects/live-search', (req, res) => res.render('projects/live-search'));
router.get('/projects/create', requireLogin, showCreateForm);
router.post('/projects/create', requireLogin, createNewProject);
router.get('/projects/:id/edit', requireLogin, showEditProjectForm);
router.post('/projects/:id/edit', requireLogin, updateExistingProject);
router.post('/projects/:id/delete', requireLogin, deleteExistingProject);
router.get('/projects/:id', viewProject);

module.exports = router;