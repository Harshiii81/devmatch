// routes/apiRoutes.js — JSON REST API endpoints

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');
const { findAllProjects, searchProjects, findProjectById, createProject } = require('../models/projectModel');

// GET /api/projects — list or search projects, returns JSON
router.get('/projects', async (req, res) => {
  try {
    const { skill, projectType } = req.query;
    let projects;

    if (skill || projectType) {
      projects = await searchProjects({ skill, projectType });
    } else {
      projects = await findAllProjects();
    }

    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error fetching projects.' });
  }
});

// GET /api/projects/:id — single project, returns JSON
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await findProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error fetching project.' });
  }
});

// POST /api/projects — create a project via API (requires login), returns JSON
router.post('/projects', requireLogin, async (req, res) => {
  try {
    const { title, description, requiredSkills, teamSize, duration, projectType, commitment } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Title and description are required.' });
    }

    const teamSizeNum = parseInt(teamSize, 10);
    if (isNaN(teamSizeNum) || teamSizeNum < 1) {
      return res.status(400).json({ success: false, error: 'Team size must be a positive number.' });
    }

    const newProjectId = await createProject({
      ownerId: req.session.userId,
      title, description, requiredSkills,
      teamSize: teamSizeNum, duration, projectType, commitment
    });

    res.status(201).json({ success: true, projectId: newProjectId });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error creating project.' });
  }
});

module.exports = router;