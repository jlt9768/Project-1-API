const fs = require('fs');
const http = require('http');
const url = require('url');
const query = require('querystring');
const pdfHandler = require('./pdfResponse.js');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/Logo.png': htmlHandler.getLogo,
  '/favicon.png': htmlHandler.getIcon,
  '/getUsers': jsonHandler.getUsers,
  '/notReal': jsonHandler.getNotReal,
  '/addUser': jsonHandler.addUser,
  notFound: jsonHandler.notFound,
};
const urlMetaStruct = {
  '/getUsers': jsonHandler.getUsersMeta,
  '/notReal': jsonHandler.getNotRealMeta,
  notFound: jsonHandler.notFound,
};


const handlePost = (request, response, parsedUrl) => {
  const res = response;

  const body = [];
  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // on end of upload stream.
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();

    const bodyParams = query.parse(bodyString);

    // pass to our addUser function
    if (parsedUrl.pathname === '/addUser') {
      jsonHandler.addUser(request, res, bodyParams);
    } else if (parsedUrl.pathname === '/postAll') {
      jsonHandler.updateAll(request, res, bodyParams);
    } else if (parsedUrl.pathname === '/createPDF') {
      //Create the PDF if a post request comes in for creating the PDF
      pdfHandler.getPDF(request, response, bodyParams);
    }
  });
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  switch (request.method) {
    case 'GET':
      if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response);
      } else if (parsedUrl.pathname === '/loadPDF') {
          
        ////  Return the PDF with the given name param if it exists otherwise notFound
        fs.access(`${__dirname}/../src/docs/${params.name}.pdf`, fs.F_OK, (err) => {
           if(err){
                jsonHandler.notFound(request,response);
           };
            
            if(fs.existsSync(`${__dirname}/../src/docs/${params.name}.pdf`)){
                htmlHandler.getPDF(request, response, params);
            }
            
        });
            
      } else {
        urlStruct.notFound(request, response);
      }
      break;
    case 'HEAD':
      if (urlMetaStruct[parsedUrl.pathname]) {
        urlMetaStruct[parsedUrl.pathname](request, response);
      } else {
        urlMetaStruct.notFound(request, response);
      }
      break;
    case 'POST':
      handlePost(request, response, parsedUrl);
      break;
    default:
      urlStruct.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
