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
const projectRoutes = require('./routes/projectRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const apiRoutes = require('./routes/apiRoutes');
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

app.use((req, res, next) => {
  res.locals.userLoggedIn = !!req.session.userId;
  res.locals.userId = req.session.userId || null;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', profileRoutes);
app.use('/', projectRoutes);
app.use('/', applicationRoutes);
app.use('/api', apiRoutes);

// These two must be LAST — Express checks middleware/routes top-to-bottom,
// so anything unmatched above falls through to the 404 handler here.
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;