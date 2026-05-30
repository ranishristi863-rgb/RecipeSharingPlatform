const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tokenBlacklist = new Set();

function blacklistToken(token) {
  if (token) tokenBlacklist.add(token);
}

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Missing authentication token' });
  if (tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token has been invalidated' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { authenticate, blacklistToken };
