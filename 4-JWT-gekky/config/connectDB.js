const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    console.log('Connected to the database...');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

module.exports = connectDB;
