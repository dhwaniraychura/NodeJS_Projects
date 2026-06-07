const express  = require('express');
const router   = express.Router();
const auth     = require('../middleware/authMiddleware');
const userCtl  = require('../controllers/userController');

// ── Auth routes (public) ──────────────────────────────────────────────────────
router.get('/login',           userCtl.loginPage);
router.get('/register',        userCtl.registerPage);
router.post('/login-user',     userCtl.loginUser);
router.post('/register-user',  userCtl.registerUser);
router.get('/logout',          userCtl.logoutUser);

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

router.get('/change-password', auth.checkAuth, userCtl.changePasswordPage);
router.post('/change-password', auth.checkAuth, userCtl.changePassword);

// ── Forgot Password (public) ──────────────────────────────────────────────────
router.get('/forgot-password',  userCtl.forgotPasswordPage);
router.post('/send-otp',        userCtl.sendOTP);
router.get('/verify-otp',       userCtl.verifyOtpPage);
router.post('/verify-otp',      userCtl.verifyOTP);
router.get('/reset-password',   userCtl.resetPasswordPage);
router.post('/reset-password',  userCtl.resetPassword);

module.exports = router;
