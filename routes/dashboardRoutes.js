// routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware');

router.get('/dashboard', requireLogin, (req, res) => {
  res.render('dashboard/index', { userName: req.session.userName });
});

module.exports = router;