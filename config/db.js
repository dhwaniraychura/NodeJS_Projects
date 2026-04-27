const mongoose = require('mongoose');

// Use MONGO_URI env variable, fallback to localhost for development
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movieApp';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.log("❌ MongoDB connection error:", err.message);
});

module.exports = mongoose;
