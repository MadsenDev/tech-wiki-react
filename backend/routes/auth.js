const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { comparePassword } = require('../utils/passwordUtils');
const { generateToken, verifyToken } = require('../utils/jwtUtils');  // Import JWT utility

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send the token and expanded user info
    res.json({
      message: 'Login successful',
      token,  // Send the token to the client
      user: { 
        id: user.id, 
        email: user.email, 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Endpoint to get current user
router.get('/me', async (req, res) => {
  try {
    // Ensure authorization header exists and follows the "Bearer token" format
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer token"
    const decoded = verifyToken(token); // Decode token to get user id
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return expanded user details
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;