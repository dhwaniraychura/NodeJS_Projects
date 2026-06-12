const jwt = require('jsonwebtoken');

// Verify token and attach user info to req.user
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
  } catch (err) {
    req.user = null;
    res.clearCookie('token');
  }
  next();
};

// Protect routes - must be logged in
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};

// Restrict routes to specific roles
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login');
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).render('error', {
        message: 'Access Denied: You do not have permission to view this page.',
        user: req.user
      });
    }
    next();
  };
};

module.exports = { verifyToken, requireAuth, requireRole };
