const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/corona_admin');
    await mongoose.connect('mongodb://127.0.0.1:27017/adminPanel');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection FAILED:', err.message);
  }
};

module.exports = connectDB;
