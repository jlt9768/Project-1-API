const fs = require('fs');

const PDFDocument = require('../pre-built/pdfkit.js');
// const pdf = fs.readFileSync(`${__dirname}/../src/docs/file.pdf`);
const respondPDF = (request, response, name) => {
  // console.log(`${__dirname}/docs/${name}.pdf`);
  response.writeHead(200, { 'Content-Type': 'application/pdf' });
  response.write(fs.readFileSync(`${__dirname}/docs/${name}.pdf`));
  response.end();
};

const createPDF = (user) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`${__dirname}/docs/${user.name}.pdf`));
  // const stream = doc.pipe(blobStream());
  // doc.font('fonts/PalatinoBold.ttf')
  // .fontSize(25)
  // .text(`${user.name}`, 100, 100);
  doc.fontSize(24);
  doc.text(`${user.name}`);
  doc.end();

  // stream.on('finish', () => {
  //  // const blob = stream.toBlob('application/pdf');
  //  const url2 = stream.toBlobURL('application/pdf');
  //    console.log(url2);
  //  return url2;
  // });
  return user.name;
};

const getPDF = (request, response, user) => respondPDF(request, response, createPDF(user));


module.exports = {
  getPDF,
};
