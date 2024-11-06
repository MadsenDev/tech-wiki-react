// middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwtUtils');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];  // Expects "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;  // Attach user data to request
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;