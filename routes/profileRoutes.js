// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');
const { viewProfile, showEditForm, updateProfile } = require('../controllers/profileController');

router.get('/profile', requireLogin, viewProfile);
router.get('/profile/edit', requireLogin, showEditForm);
router.post('/profile/edit', requireLogin, updateProfile);

module.exports = router;