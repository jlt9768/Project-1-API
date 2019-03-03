const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const logo = fs.readFileSync(`${__dirname}/../client/Logo.png`);
const icon = fs.readFileSync(`${__dirname}/../client/favicon.png`);
//  Return the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

//  Return the css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

//  Return the logo
const getLogo = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(logo);
  response.end();
};

//  Return the favicon
const getIcon = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.write(icon);
  response.end();
};

const getPDF = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/pdf' });
  response.write(fs.readFileSync(`${__dirname}/../src/docs/${params.name}.pdf`));
  response.end();
};
module.exports = {
  getIndex,
  getCSS,
  getLogo,
  getIcon,
  getPDF,
};
