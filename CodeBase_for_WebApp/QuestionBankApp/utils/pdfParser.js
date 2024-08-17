// server/utils/pdfParser.js
const pdf = require('pdf-parse');
const fs = require('fs');

module.exports = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};

