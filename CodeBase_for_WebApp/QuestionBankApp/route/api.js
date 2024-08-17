const express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const pdfParser = require('../utils/pdfParser');
const docxParser = require('../utils/docxParser');
const pdfGenerator = require('../utils/pdfGenerator');
const docxGenerator = require('../utils/docxGenerator');

const upload = multer({ dest: 'uploads/' });

router.post('/generate-question-paper', upload.single('schoolLogo'), async (req, res) => {
  const { standard, topic, bloomLevel, difficulty, schoolName } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const prompt = `Generate a question paper for class ${standard} on the topic "${topic}" 
                  with Bloom's Taxonomy level "${bloomLevel}" and difficulty level "${difficulty}".
                  Format the question paper with proper sections, numbering, and instructions.`;

  try {
    const response = await axios.post(`${apiUrl}?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    if (response.data.candidates && response.data.candidates.length > 0) {
      let questionPaper = response.data.candidates[0].content.parts[0].text;

      // Add school name and standard to the question paper
      questionPaper = `${schoolName}\nClass ${standard}\n\n${questionPaper}`;

      let logoUrl = null;
      if (req.file) {
        logoUrl = `/uploads/${req.file.filename}`;
      }

      res.json({ questionPaper, logoUrl });
    } else {
      res.status(400).json({ error: 'No response generated. Please try again.' });
    }
  } catch (error) {
    console.error('Error generating question paper:', error);
    res.status(500).json({ error: 'An error occurred while generating the question paper.' });
  }
});

router.post('/upload-blueprint', upload.single('blueprint'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExt = path.extname(req.file.originalname).toLowerCase();

  try {
    let blueprintContent;
    if (fileExt === '.pdf') {
      blueprintContent = await pdfParser(filePath);
    } else if (fileExt === '.docx') {
      blueprintContent = await docxParser(filePath);
    } else {
      throw new Error('Unsupported file format');
    }

    // Generate question paper based on blueprint content
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const prompt = `Generate a question paper based on the following blueprint: ${blueprintContent}`;

    const response = await axios.post(`${apiUrl}?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    if (response.data.candidates && response.data.candidates.length > 0) {
      res.json({ questionPaper: response.data.candidates[0].content.parts[0].text });
    } else {
      res.status(400).json({ error: 'No response generated. Please try again.' });
    }
  } catch (error) {
    console.error('Error processing blueprint:', error);
    res.status(500).json({ error: 'An error occurred while processing the blueprint.' });
  } finally {
    // Clean up the uploaded file
    fs.unlinkSync(filePath);
  }
});

router.post('/export-question-paper', upload.single('schoolLogo'), async (req, res) => {
  const { questionPaper, format, schoolName, className, classDuration, maxMarks } = req.body;
  const logo = req.file ? fs.readFileSync(req.file.path) : null;

  try {
    let result;
    if (format === 'pdf') {
      result = await pdfGenerator(questionPaper, schoolName, className, classDuration, maxMarks, logo);
      res.contentType('application/pdf');
      res.send(result);
    } else if (format === 'docx') {
      result = await docxGenerator(questionPaper, schoolName, className, classDuration, maxMarks, logo);
      res.contentType('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.send(result);
    } else {
      res.status(400).json({ error: 'Unsupported export format' });
    }
  } catch (error) {
    console.error('Error exporting question paper:', error);
    res.status(500).json({ error: 'An error occurred while exporting the question paper.' });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
});

module.exports = router;
