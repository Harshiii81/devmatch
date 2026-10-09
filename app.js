// app.js — configures the Express application

const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { countUnread } = require('./models/notificationModel');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

// Makes login info and the unread notification count available in every EJS view
app.use(async (req, res, next) => {
  res.locals.userLoggedIn = !!req.session.userId;
  res.locals.userId = req.session.userId || null;
  res.locals.unreadCount = 0;

  if (req.session.userId) {
    try {
      res.locals.unreadCount = await countUnread(req.session.userId);
    } catch (err) {
      console.error('Could not load notification count:', err.message);
    }
  }
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', profileRoutes);
app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', applicationRoutes);
app.use('/', notificationRoutes);
app.use('/api', apiRoutes);

// These two must be LAST
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;