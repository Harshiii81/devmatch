// routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');
const {
  applyToProject, viewApplications, respondToApplication
} = require('../controllers/applicationController');

router.post('/projects/:id/apply', requireLogin, applyToProject);
router.get('/projects/:id/applications', requireLogin, viewApplications);
router.post('/applications/:id/respond', requireLogin, respondToApplication);

module.exports = router;