// controllers/authController.js

const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');

// ---------- REGISTER ----------

function showRegisterForm(req, res) {
  res.render('auth/register', { error: null });
}

async function registerUser(req, res) {
  const {
    name, email, password, experienceLevel,
    bio, skills, interests, availability, githubUrl, portfolioUrl
  } = req.body;

  if (!name || !email || !password) {
    return res.render('auth/register', { error: 'Name, email, and password are required.' });
  }
  if (password.length < 6) {
    return res.render('auth/register', { error: 'Password must be at least 6 characters.' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.render('auth/register', { error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser({
    name, email, passwordHash, experienceLevel,
    bio, skills, interests, availability, githubUrl, portfolioUrl
  });

  res.redirect('/login');
}

// ---------- LOGIN ----------

function showLoginForm(req, res) {
  res.render('auth/login', { error: null });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('auth/login', { error: 'Email and password are required.' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.render('auth/login', { error: 'Invalid email or password.' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    return res.render('auth/login', { error: 'Invalid email or password.' });
  }

  // Success — create the session
  req.session.userId = user.id;
  req.session.userName = user.name;

  res.redirect('/dashboard');
}

// ---------- LOGOUT ----------

function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
}

module.exports = {
  showRegisterForm, registerUser,
  showLoginForm, loginUser,
  logoutUser
};