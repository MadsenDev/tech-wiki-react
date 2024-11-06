// routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route modules
const userRoutes = require('./users');
const authRoutes = require('./auth');
const categoryRoutes = require('./categories');
const commentRoutes = require('./comments');
const guideRoutes = require('./guides');
const ratingRoutes = require('./ratings');

// Mount routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/guides', guideRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;