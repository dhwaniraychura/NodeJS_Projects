const bcrypt   = require('bcrypt');
const passport = require('../config/passport');
const User     = require('../models/adminModels');

// ── Auth Pages ────────────────────────────────────────────────────────────────

exports.loginPage = (req, res) => {
  res.render('pages/samples/login', {
    title : 'Login',
    error : req.flash('error')
  });
};

exports.registerPage = (req, res) => {
  res.render('pages/samples/register', {
    title : 'Register',
    error : req.flash('error')
  });
};

// ── Auth Actions ──────────────────────────────────────────────────────────────

// Passport local login — called after passport.authenticate() succeeds in route
exports.loginUser = (req, res) => {
  req.flash('success', 'Welcome back!');
  res.redirect('/');
};

exports.registerUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      req.flash('error', 'An account with that email already exists.');
      return res.redirect('/register');
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      username : req.body.username,
      email    : req.body.email,
      password : hashPassword,
      gender   : req.body.gender,
      dob      : req.body.dob,
      role     : req.body.role,
      city     : req.body.city
    };

    await User.create(newUser);

    req.flash('success', 'Account created! Please log in.');
    return res.redirect('/login');

  } catch (err) {
    console.log(err);
    req.flash('error', 'Registration failed. Please try again.');
    return res.redirect('/register');
  }
};

exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('success', 'You have been logged out.');
    return res.redirect('/login');
  });
};

// ── CRUD Pages ────────────────────────────────────────────────────────────────

exports.addPage = (req, res) => {
  res.render('pages/admin/addAdmin', {
    title : 'Add Admin',
    error : req.flash('error')
  });
};

exports.viewUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render('pages/admin/viewAdmin', {
      title   : 'View Users',
      users,
      success : req.flash('success')
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

exports.editPage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) { return res.redirect('/users/view'); }
    res.render('pages/admin/editAdmin', {
      title : 'Edit User',
      user,
      error : req.flash('error')
    });
  } catch (err) {
    console.log(err);
    res.redirect('/users/view');
  }
};

// ── CRUD Actions ──────────────────────────────────────────────────────────────

exports.addUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash('error', 'Email already exists.');
      return res.redirect('/users/add');
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      username : req.body.username,
      email    : req.body.email,
      password : hashPassword,
      gender   : req.body.gender,
      dob      : req.body.dob,
      role     : req.body.role,
      city     : req.body.city
    };

    if (req.file) {
      newUser.avtar = User.imagePath + '/' + req.file.filename;
    }

    await User.create(newUser);
    req.flash('success', 'User added successfully.');
    return res.redirect('/users/view');

  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to add user.');
    return res.redirect('/users/add');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const existing = await User.findById(req.params.id);
    if (!existing) { return res.redirect('/users/view'); }

    const updatedUser = {
      username : req.body.username,
      email    : req.body.email,
      gender   : req.body.gender,
      dob      : req.body.dob,
      role     : req.body.role,
      city     : req.body.city
    };

    if (req.body.password && req.body.password.trim() !== '') {
      updatedUser.password = await bcrypt.hash(req.body.password, 10);
    } else {
      updatedUser.password = existing.password;
    }

    updatedUser.avtar = req.file
      ? User.imagePath + '/' + req.file.filename
      : existing.avtar;

    await User.findByIdAndUpdate(req.params.id, updatedUser);
    req.flash('success', 'User updated successfully.');
    return res.redirect('/users/view');

  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to update user.');
    return res.redirect('/users/view');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success', 'User deleted successfully.');
    return res.redirect('/users/view');
  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to delete user.');
    return res.redirect('/users/view');
  }
};


// ── Profile (logged-in user's own settings) ───────────────────────────────────

exports.profilePage = (req, res) => {
  res.render('pages/profile', {
    title   : 'My Profile',
    success : req.flash('success'),
    error   : req.flash('error')
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const existing = await User.findById(req.user._id);
    if (!existing) {
      req.flash('error', 'User not found.');
      return res.redirect('/profile');
    }

    const updatedData = {
      username : req.body.username,
      email    : req.body.email,
      gender   : req.body.gender,
      dob      : req.body.dob,
      role     : req.body.role,
      city     : req.body.city
    };

    // Only hash & update password if a new one was provided
    if (req.body.password && req.body.password.trim() !== '') {
      updatedData.password = await bcrypt.hash(req.body.password, 10);
    } else {
      updatedData.password = existing.password;
    }

    // Keep old avatar unless a new file was uploaded
    updatedData.avtar = req.file
      ? User.imagePath + '/' + req.file.filename
      : existing.avtar;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );

    // Re-login so req.user (and currentUser in navbar) reflects the new data
    req.login(updated, (err) => {
      if (err) {
        req.flash('error', 'Profile updated but session refresh failed.');
        return res.redirect('/profile');
      }
      req.flash('success', 'Profile updated successfully!');
      return res.redirect('/profile');
    });

  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to update profile.');
    return res.redirect('/profile');
  }
};
