const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://dhwani:Dhwani0187@cluster0.n2mxzib.mongodb.net/adminPanel?retryWrites=true&w=majority&appName=Cluster0');

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection FAILED:', err.message);
  }
};

module.exports = connectDB;