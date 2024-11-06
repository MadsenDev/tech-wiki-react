// routes/users.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { User } = require('../models'); // Import User model
const { Op } = require('sequelize');

// Get all users with search, filter, and sort options
router.get('/', async (req, res) => {
  const { search, role, sortField = 'id', sortOrder = 'ASC' } = req.query;

  // Create a base query with optional search and filter conditions
  const whereConditions = {};

  // Search by username or email if 'search' query parameter is provided
  if (search) {
    whereConditions[Op.or] = [
      { username: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }

  // Filter by role if 'role' query parameter is provided
  if (role) {
    whereConditions.role = role;
  }

  try {
    const users = await User.findAll({
      where: whereConditions,
      order: [[sortField, sortOrder.toUpperCase()]], // Sorting by specified field and order
    });

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the user.' });
  }
});

// Get a user by username
router.get('/username/:username', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the user.' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role, profilePicture } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role,
      profilePicture,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the user.' });
  }
});

// Protected route: Get logged-in user's data
router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// Update an existing user
router.put('/:id', async (req, res) => {
  try {
    const { username, email, firstName, lastName, role, profilePicture } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.update({ username, email, firstName, lastName, role, profilePicture });
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the user.' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

module.exports = router;