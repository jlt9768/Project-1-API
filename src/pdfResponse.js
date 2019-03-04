const fs = require('fs');

const PDFDocument = require('../pre-built/pdfkit.js');
// const pdf = fs.readFileSync(`${__dirname}/../src/docs/file.pdf`);
const respondPDF = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/pdf' });
  response.end();
};

//  Create a pdf using pdfkit pre-built
const createPDF = (user) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`${__dirname}/docs/${user.name}.pdf`));
  
  //    Creation date of the document
  const date = new Date();
  doc.fontSize(30);
  doc.text("Fitness Tracker");
  doc.fontSize(18);
  doc.text(' ');
  doc.text(`${date.toUTCString()}`);
  doc.text(' ');
  doc.fontSize(24);
  doc.text(`${user.name}`);
  doc.text(' ');
   
    
  //    Paste the Weight lifting data to the pdf as a bulleted list
  doc.fontSize(18);  
  doc.text(`Weight Lifting Max:`);
  doc.fontSize(14); 
  let arrayData= [`Chest Press: ${user.chestPress}`,`Bicep Curl: ${user.bicepCurl}`,`Tricep Curl: ${user.tricepCurl}`,`Shoulder Press: ${user.shoulderPress}`, `Leg Press: ${user.legPress}`];
  doc.list(arrayData);
  doc.text(` `);
  
  //    Paste the body weight data to the pdf as a bulleted list
  doc.fontSize(18);
  doc.text(`Body Weight Reps:`);
  doc.fontSize(14);    
  arrayData = [`Push Ups: ${user.pushUps}`,`Sit Ups: ${user.sitUps}`,`Pull Ups: ${user.pullUps}`,`Burpees: ${user.burpees}`];
  doc.list(arrayData);
  doc.text(` `);
  
  //    Paste the cardio data to the pdf as a bulleted list
  doc.fontSize(18);
  doc.text(`Cardio Best Time:`);
  doc.fontSize(14); 
  arrayData = [`Mile: ${user.mile}`];
  doc.list(arrayData);
  doc.text(` `);


  doc.end();

  return user.name;
};

const getPDF = (request, response, user) => respondPDF(request, response, createPDF(user));


module.exports = {
  getPDF,
};
