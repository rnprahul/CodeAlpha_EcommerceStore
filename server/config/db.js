const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.warn('--------------------------------------------------');
    console.warn('⚠️ MONGODB_URI is not configured in server/.env');
    console.warn('👉 Database features will remain idle until MongoDB Atlas connection string is provided.');
    console.warn('--------------------------------------------------');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log('--------------------------------------------------');
    console.log(`✅ MongoDB Atlas Connected Successfully!`);
    console.log(`📡 Cluster Host: ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name}`);
    console.log('--------------------------------------------------');
    return true;
  } catch (error) {
    console.error('--------------------------------------------------');
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Server will continue running, but MongoDB API routes require a valid connection.');
    console.error('--------------------------------------------------');
    return false;
  }
};

module.exports = connectDB;
