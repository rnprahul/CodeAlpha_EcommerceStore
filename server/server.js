const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const notFound = require('./middleware/notFoundMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express App
const app = express();

// Connect to MongoDB Atlas
connectDB();

// Security & Parsing Middleware
app.use(helmet());

// Dynamic CORS Configuration
// CORS Configuration
const allowedOrigins = [
  'https://quickkart-six.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow production site
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow QuickKart Vercel preview/deployment URLs
      if (
        origin.startsWith('https://quickkart-') &&
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS policy'));
    },
    credentials: true
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Endpoints
const healthHandler = (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    success: true,
    message: 'QuickKart API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: isDbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
};

app.get('/api/health', healthHandler);
app.get('/api/v1/health', healthHandler);

// API Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', userRoutes);

// 404 & Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 QuickKart Express Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔗 Health Check: /api/v1/health`);
});

module.exports = app;
