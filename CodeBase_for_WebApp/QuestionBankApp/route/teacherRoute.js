const express = require('express');
const router = express.Router();
const {
  getFilteredQuestions
} = require('../controller/questionpaper');

// Route for teachers to get filtered questions
router.get('/questions', getFilteredQuestions);

module.exports = router;
