const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/teacher');

// Protected route for teachers
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted: Welcome, teacher!' });
});

module.exports = router;
