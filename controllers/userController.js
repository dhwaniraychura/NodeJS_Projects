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

exports.changePasswordPage = (req, res) => {

  res.render('pages/samples/changePassword', {
    title: 'Change Password',
    error: null,
    success: null
  });

};

exports.changePassword = async (req, res) => {

  try {

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.cookies.admin);

    if (!user) {
      return res.render('pages/samples/changePassword', { title:'Change Password', error:'User not found', success:null });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.render('pages/samples/changePassword', { title:'Change Password', error:'Old password is incorrect', success:null });
    }

    if (newPassword !== confirmPassword) {
      return res.render('pages/samples/changePassword', { title:'Change Password', error:'Passwords do not match', success:null });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashPassword });

    req.flash('success', 'Password changed successfully');
      return res.redirect('/');

  } catch(err) {
    console.log(err);
    return res.redirect('/');
  }

};

// ── Forgot Password ───────────────────────────────────────────────────────────

const transporter = require('../config/mailer');

exports.forgotPasswordPage = (req, res) => {
  return res.render('pages/samples/forgotPassword', {
    title: 'Forgot Password',
    error: null,
    success: null
  });
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.render('pages/samples/forgotPassword', {
        title: 'Forgot Password',
        error: 'No account found with this email.',
        success: null
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await User.findByIdAndUpdate(user._id, { otp, otpExpire });

    req.session.resetEmail = email;

    await transporter.sendMail({
      from: process.env.MAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'OTP Verification — Admin Panel',
      text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes.`
    });

    req.flash('success', 'OTP sent successfully to your email.');
    return res.redirect('/verify-otp');

  } catch (err) {
    console.error(err);
    return res.render('pages/samples/forgotPassword', {
      title: 'Forgot Password',
      error: 'Failed to send OTP. Please try again.',
      success: null
    });
  }
};

exports.verifyOtpPage = (req, res) => {
  return res.render('pages/samples/verifyOtp', {
    title: 'Verify OTP',
    error: null
  });
};

exports.verifyOTP = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.resetEmail });

    if (
      user &&
      user.otp == req.body.otp &&
      user.otpExpire > Date.now()
    ) {
      req.session.otpVerified = true;
      req.flash('success', 'OTP verified. Please set a new password.');
      return res.redirect('/reset-password');
    }

    return res.render('pages/samples/verifyOtp', {
      title: 'Verify OTP',
      error: 'Invalid or expired OTP. Please try again.'
    });

  } catch (err) {
    console.error(err);
    return res.render('pages/samples/verifyOtp', {
      title: 'Verify OTP',
      error: 'Something went wrong. Please try again.'
    });
  }
};

exports.resetPasswordPage = (req, res) => {
  if (!req.session.otpVerified) {
    return res.redirect('/forgot-password');
  }
  return res.render('pages/samples/resetPassword', {
    title: 'Reset Password',
    error: null
  });
};

exports.resetPassword = async (req, res) => {
  try {
    if (!req.session.otpVerified) {
      return res.redirect('/forgot-password');
    }

    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.render('pages/samples/resetPassword', {
        title: 'Reset Password',
        error: 'Passwords do not match.'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email: req.session.resetEmail },
      { password: hashedPassword, otp: null, otpExpire: null }
    );

    delete req.session.resetEmail;
    delete req.session.otpVerified;

    req.flash('success', 'Password reset successfully. Please login.');
    return res.redirect('/login');

  } catch (err) {
    console.error(err);
    return res.render('pages/samples/resetPassword', {
      title: 'Reset Password',
      error: 'Something went wrong. Please try again.'
    });
  }
};
