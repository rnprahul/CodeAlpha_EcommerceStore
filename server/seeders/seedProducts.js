const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../../server/.env') });
}

const Product = require('../models/Product');
const { products } = require('../../src/data/products');

const seedData = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.error('❌ MONGODB_URI connection string is not set in server/.env');
    console.error('Please configure your MongoDB Atlas connection string before running seed script.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB Atlas cluster (${conn.connection.host}) for seeding...`);

    if (process.argv.includes('--destroy')) {
      await Product.deleteMany({});
      console.log('🗑️ Existing products destroyed from MongoDB collection.');
      if (process.argv.includes('--destroy-only')) {
        process.exit(0);
      }
    }

    // Transform products array for Mongoose
    const formattedProducts = products.map((p) => {
      const { id, ...rest } = p;
      return {
        ...rest,
        specifications: p.specifications ? new Map(Object.entries(p.specifications)) : new Map()
      };
    });

    // Clear and re-insert catalog cleanly
    await Product.deleteMany({});
    const inserted = await Product.insertMany(formattedProducts);

    console.log('--------------------------------------------------');
    console.log(`🎉 Success! Seeded ${inserted.length} QuickKart products into MongoDB Atlas!`);
    console.log('--------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
