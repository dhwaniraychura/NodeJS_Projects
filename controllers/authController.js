const jwt = require('jsonwebtoken');
const User = require('../models/User');

// GET /register
exports.getRegister = (req, res) => {
  res.render('register', { error: null, user: req.user });
};

// POST /register
exports.postRegister = async (req, res) => {
  try {
    const { username, password, confirmPassword, role } = req.body;

    if (!username || !password) {
      return res.render('register', { error: 'All fields are required.', user: req.user });
    }

    if (password !== confirmPassword) {
      return res.render('register', { error: 'Passwords do not match.', user: req.user });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already taken.', user: req.user });
    }

    // Only allow 'admin' role if explicitly chosen (in real apps, restrict this further)
    const newUser = new User({
      username,
      password,
      role: role === 'admin' ? 'admin' : 'user'
    });

    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Something went wrong. Please try again.', user: req.user });
  }
};

// GET /login
exports.getLogin = (req, res) => {
  res.render('login', { error: null, user: req.user });
};

// POST /login
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', { error: 'Invalid username or password.', user: req.user });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password.', user: req.user });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.redirect('/recipes');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong. Please try again.', user: req.user });
  }
};

// GET /logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
