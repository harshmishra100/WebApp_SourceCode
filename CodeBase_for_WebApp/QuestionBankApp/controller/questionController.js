const { Question } = require('../db/models');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const config = require('../config/config');

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { question,  answer, difficulty,  subject, grade, bloom_taxonomy, type, topic,id } = req.body;

    const newQuestion = await Question.create({
      question,
      answer,
      difficulty,
      subject,
      grade,
      bloom_taxonomy,
      type,
      topic,id
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'An error occurred while creating the question.' });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json({
      status: 'success',
      data: questions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch questions'
    });
  }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, answer, explanation, subject, grade, bloom_taxonomy, type, topic, difficulty } = req.body;
    const updatedQuestion = await Question.update({
      question,
      answer,
      subject,
      grade,
      bloom_taxonomy,
      type,
      topic,
      difficulty
    }, {
      where: { id },
      returning: true // Return the updated question
    });
    res.status(200).json({
      status: 'success',
      message: 'Question updated successfully',
      data: updatedQuestion[1][0] // Return the updated question object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update question'
    });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.destroy({
      where: { id }
    });
    res.status(200).json({
      status: 'success',
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete question'
    });
  }
};

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const bulkUploadQuestions = async (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  const questions = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      questions.push({
        question: row.question,
        answer: row.answer,
        difficulty: row.difficulty,
        bloom_taxonomy: row.bloom_taxonomy,
        grade: row.grade,
        subject: row.subject,
        type: row.type,
        topic: row.topic,
        id: row.id // Assuming the CSV file has a column 'id'
      });
    })
    .on('end', async () => {
      try {
        await Question.bulkCreate(questions);
        res.status(201).json({ message: 'Bulk upload successful' });
      } catch (error) {
        console.error('Error during bulk upload:', error);
        res.status(500).json({ error: 'An error occurred during the bulk upload process.' });
      } finally {
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting the temporary file:', err);
        });
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ error: 'An error occurred while reading the CSV file.' });
    });
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  bulkUploadQuestions,
  upload
};
