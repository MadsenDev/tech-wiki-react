// routes/ratings.js
const express = require('express');
const router = express.Router();
const { Rating, User, Guide } = require('../models');

// Get all ratings
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.findAll({ include: [User, Guide] });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching ratings.' });
  }
});

// Get a rating by ID
router.get('/:id', async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id, { include: [User, Guide] });
    if (rating) res.json(rating);
    else res.status(404).json({ error: 'Rating not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the rating.' });
  }
});

// Create a new rating
router.post('/', async (req, res) => {
  try {
    const rating = await Rating.create(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the rating.' });
  }
});

// Delete a rating by ID
router.delete('/:id', async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (rating) {
      await rating.destroy();
      res.json({ message: 'Rating deleted successfully.' });
    } else res.status(404).json({ error: 'Rating not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the rating.' });
  }
});

module.exports = router;