const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (questionPaper, schoolName, className, classDuration, maxMarks, logo) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream('output.pdf');
    doc.pipe(stream);

    if (logo) {
      doc.image(logo, {
        fit: [100, 100],
        align: 'center',
        valign: 'center'
      });
    }

    doc.fontSize(18).text(schoolName, { align: 'center' });
    doc.fontSize(14).text(`Class: ${className}`, { align: 'center' });
    doc.fontSize(14).text(`Duration: ${classDuration}`, { align: 'right' });
    doc.fontSize(14).text(`Maximum Marks: ${maxMarks}`, { align: 'right' });
    doc.moveDown();
    doc.fontSize(12).text(questionPaper);

    doc.end();
    stream.on('finish', () => {
      resolve(fs.readFileSync('output.pdf'));
    });
    stream.on('error', reject);
  });
};

module.exports = generatePDF;
