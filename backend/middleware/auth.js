const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded;
    next();
  });
}

// Middleware to verify HR role
function requireHR(req, res, next) {
  if (req.user.designation !== 'HR') {
    return res.status(403).json({ message: 'Access denied. HR role required.' });
  }
  next();
}

module.exports = { authenticateToken, requireHR };
