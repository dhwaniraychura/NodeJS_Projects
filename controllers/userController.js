const bcrypt = require('bcrypt');
const User = require('../models/adminModels');

// ── Auth Pages ────────────────────────────────────────────────────────────────

exports.loginPage = (req, res) => {

  res.render('pages/samples/login', {
    title: 'Login',
    error: null
  });

};

exports.registerPage = (req, res) => {

  res.render('pages/samples/register', {
    title: 'Register',
    error: null
  });

};

// ── Auth Actions ──────────────────────────────────────────────────────────────

exports.loginUser = async (req, res) => {

  try {

    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {

      return res.render('pages/samples/login', {
        title: 'Login',
        error: 'User not found.'
      });

    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {

      return res.render('pages/samples/login', {
        title: 'Login',
        error: 'Invalid password.'
      });

    }

    res.cookie('admin', user._id.toString());

    return res.redirect('/');

  } catch (err) {

    console.log(err);

    return res.redirect('/login');

  }

};

exports.registerUser = async (req, res) => {

  try {

    const existingUser = await User.findOne({
      email: req.body.email
    });

    if (existingUser) {

      return res.render('pages/samples/register', {
        title: 'Register',
        error: 'Email already exists'
      });

    }

    const hashPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    const newUser = {

      username: req.body.username,
      email: req.body.email,
      password: hashPassword,

      gender: req.body.gender,
      dob: req.body.dob,
      role: req.body.role,
      city: req.body.city

    };

    await User.create(newUser);

    return res.redirect('/login');

  } catch (err) {

    console.log(err);

    return res.render('pages/samples/register', {
      title: 'Register',
      error: 'Registration failed'
    });

  }

};

exports.logoutUser = (req, res) => {

  res.clearCookie('admin');

  return res.redirect('/login');

};

// ── CRUD Pages ────────────────────────────────────────────────────────────────

exports.addPage = (req, res) => {

  res.render('pages/admin/addAdmin', {
    title: 'Add Admin'
  });

};

exports.viewUsers = async (req, res) => {

  try {

    const users = await User.find().sort({
      createdAt: -1
    });

    res.render('pages/admin/viewAdmin', {
      title: 'View Users',
      users
    });

  } catch (err) {

    console.log(err);

    res.redirect('/');

  }

};

exports.editPage = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.redirect('/users/view');
    }

    res.render('pages/admin/editAdmin', {
      title: 'Edit User',
      user
    });

  } catch (err) {

    console.log(err);

    res.redirect('/users/view');

  }

};

// ── CRUD Actions ──────────────────────────────────────────────────────────────

exports.addUser = async (req, res) => {

  try {

    const existingUser = await User.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.redirect('/users/add');
    }

    const hashPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    const newUser = {

      username: req.body.username,
      email: req.body.email,
      password: hashPassword,

      gender: req.body.gender,
      dob: req.body.dob,
      role: req.body.role,
      city: req.body.city

    };

    if (req.file) {

      newUser.avtar =
        User.imagePath + '/' + req.file.filename;

    }

    await User.create(newUser);

    return res.redirect('/users/view');

  } catch (err) {

    console.log(err);

    return res.redirect('/users/add');

  }

};

exports.updateUser = async (req, res) => {

  try {

    const existing = await User.findById(req.params.id);

    if (!existing) {
      return res.redirect('/users/view');
    }

    const updatedUser = {

      username: req.body.username,
      email: req.body.email,

      gender: req.body.gender,
      dob: req.body.dob,
      role: req.body.role,
      city: req.body.city

    };

    if (
      req.body.password &&
      req.body.password.trim() !== ''
    ) {

      const hashPassword = await bcrypt.hash(
        req.body.password,
        10
      );

      updatedUser.password = hashPassword;

    } else {

      updatedUser.password = existing.password;

    }

    if (req.file) {

      updatedUser.avtar =
        User.imagePath + '/' + req.file.filename;

    } else {

      updatedUser.avtar = existing.avtar;

    }

    await User.findByIdAndUpdate(
      req.params.id,
      updatedUser
    );

    return res.redirect('/users/view');

  } catch (err) {

    console.log(err);

    return res.redirect('/users/view');

  }

};

exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    return res.redirect('/users/view');

  } catch (err) {

    console.log(err);

    return res.redirect('/users/view');

  }

};