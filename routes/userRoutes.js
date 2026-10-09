// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');
const { viewPublicProfile } = require('../controllers/userController');

router.get('/users/:id', requireLogin, viewPublicProfile);

module.exports = router;