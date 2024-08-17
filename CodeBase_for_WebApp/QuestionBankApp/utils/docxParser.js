// server/utils/docxParser.js
const fs = require('fs');

module.exports = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};