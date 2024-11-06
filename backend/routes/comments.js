// routes/comments.js
const express = require('express');
const router = express.Router();
const { Comment, User, Guide } = require('../models');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: [User, Guide] });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching comments.' });
  }
});

// Get a comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, { include: [User, Guide] });
    if (comment) res.json(comment);
    else res.status(404).json({ error: 'Comment not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the comment.' });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the comment.' });
  }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.destroy();
      res.json({ message: 'Comment deleted successfully.' });
    } else res.status(404).json({ error: 'Comment not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the comment.' });
  }
});

module.exports = router;