// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');
const { viewNotifications } = require('../controllers/notificationController');

router.get('/notifications', requireLogin, viewNotifications);

module.exports = router;