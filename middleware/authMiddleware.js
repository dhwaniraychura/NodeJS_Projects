// ── Passport-based auth middleware ────────────────────────────────────────────

// Protect routes: user must be logged in via Passport session
exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in to access this page.');
  return res.redirect('/login');
};

// Redirect already-logged-in users away from login/register pages
exports.forwardAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};
