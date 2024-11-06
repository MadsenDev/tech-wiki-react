// utils/passwordUtils.js
const bcrypt = require('bcrypt');

// Salt rounds for hashing (increase for more security, but it will slow down hashing)
const SALT_ROUNDS = 10;

/**
 * Hash a password before saving it to the database
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password to compare
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - Whether the password matches the hash
 */
async function comparePassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing password');
  }
}

module.exports = { hashPassword, comparePassword };