var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

   var filePath = '..' + request.url;
   if (filePath == '../')
        filePath = '../html/index.html'

   console.log(filePath);
   
   var extname = path.extname(filePath);
   var contentType = 'text/html';
   switch (extname) {
       case '.js':
           contentType = 'text/javascript';
           break;
       case '.css':
           contentType = 'text/css';
           break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break; 
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
   }

           fs.readFile(filePath, function(error, content) {
               if (error) {
                   response.writeHead(500);
                   response.end();
               }
               else {
                   response.writeHead(200, { 'Content-Type': contentType });
                   response.end(content, 'utf-8');
               }
           });
}).listen(3000);