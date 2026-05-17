const express  = require('express');
const router   = express.Router();
const passport = require('../config/passport');
const auth     = require('../middleware/authMiddleware');
const userCtl  = require('../controllers/userController');

// ── Auth routes (public — redirect if already logged in) ──────────────────────
router.get('/login',    auth.forwardAuth, userCtl.loginPage);
router.get('/register', auth.forwardAuth, userCtl.registerPage);

// Passport handles authentication; on failure flash error and redirect to login
router.post('/login-user',
  auth.forwardAuth,
  passport.authenticate('local', {
    failureRedirect : '/login',
    failureFlash    : true
  }),
  userCtl.loginUser
);

router.post('/register-user', userCtl.registerUser);
router.get('/logout',         userCtl.logoutUser);

// ── Dashboard (protected) ─────────────────────────────────────────────────────
router.get('/', auth.checkAuth, (req, res) => {
  res.render('pages/dashboard', { title: 'Dashboard' });
});

// ── Other pages (protected) ───────────────────────────────────────────────────
router.get('/forms/basic-elements', auth.checkAuth, (req, res) => {
  res.render('pages/forms/basic_elements', { title: 'Basic Form Elements' });
});

router.get('/tables/basic-table', auth.checkAuth, (req, res) => {
  res.render('pages/tables/basic_table', { title: 'Basic Table' });
});

// ── Profile (logged-in user's own settings) ───────────────────────────────────
const User = require('../models/adminModels');

router.get('/profile',         auth.checkAuth,                   userCtl.profilePage);
router.post('/profile/update', auth.checkAuth, User.uploadImage, userCtl.updateProfile);

module.exports = router;
