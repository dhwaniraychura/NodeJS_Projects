const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const imagePath = '/assets/images/avatars';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String
  },

  dob: {
    type: String
  },

  role: {
    type: String
  },

  city: {
    type: String
  },

  avtar: {
    type: String
  },

  otp: {
    type: Number
  },

  otpExpire: {
    type: Date
  }

}, {
  timestamps: true
});

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(
      null,
      path.join(__dirname, '..', 'public', imagePath)
    );

  },

  filename: function (req, file, cb) {

    cb(
      null,
      file.fieldname +
      '-' +
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

userSchema.statics.uploadImage =
  multer({ storage }).single('avtar');

userSchema.statics.imagePath = imagePath;

module.exports = mongoose.model(
  'User',
  userSchema
);
