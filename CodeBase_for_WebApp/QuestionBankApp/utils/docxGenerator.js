// server/utils/docxGenerator.js
const { Packer,Document, Paragraph, TextRun, AlignmentType, HeadingLevel, TableCell, TableRow, Table, WidthType, BorderStyle } = require('docx');
const fs = require('fs');

const generateDOCX = (questionPaper, schoolName, className, classDuration, maxMarks, logo) => {
  return new Promise((resolve, reject) => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: schoolName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Class: ${className}`, bold: true }),
              new TextRun({ text: `    Duration: ${classDuration}`, bold: true }),
              new TextRun({ text: `    Maximum Marks: ${maxMarks}`, bold: true }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }), // Empty paragraph for spacing
          ...parseQuestionPaper(questionPaper),
        ],
      }],
    });

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("output.docx", buffer);
      resolve(buffer);
    }).catch(reject);
  });
};

const parseQuestionPaper = (questionPaper) => {
  const lines = questionPaper.split('\n');
  const elements = [];

  lines.forEach((line) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      // Section headings
      elements.push(new Paragraph({
        text: line.replace(/\*\*/g, ''),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
      }));
    } else if (line.match(/^\d+\./)) {
      // Questions
      elements.push(new Paragraph({
        text: line,
        spacing: { before: 120, after: 120 },
      }));
    } else if (line.match(/^\([a-d]\)/)) {
      // Multiple choice options
      elements.push(new Paragraph({
        text: line,
        indent: { left: 720 }, // 0.5 inch indent
      }));
    } else if (line.trim() !== '') {
      // Other text
      elements.push(new Paragraph({ text: line }));
    }
  });

  return elements;
};

module.exports = generateDOCX;