var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  /*console.log(_url, queryData);*/
  /*switch(queryData.id){
    case '':
      _url = '/index.html';
      break;
    case 'HTML':
      _url = '/1.html';
      break;
    case 'CSS':
      _url = '/2.html';
      break;
    case 'Javascript':
      _url = '/3.html';
      break;
  }*/
  if(_url == '/'){
    title = 'Welcome';
  }  
  var template = `

  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="index.html">WEB</a></h1>
  <ol>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
  <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), 
  interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web 
  browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions 
  starting in January 1991 and to the general public on the Internet in August 1991.
  </p>
  </body>
  </html>
  `
  if(_url == '/favicon.ico'){
    return response.writeHead(404);
  }
  response.writeHead(200);
  /*console.log(__dirname+ _url);*/
  /*console.log(_url, queryData.id);*/
  response.end(template);
  /*response.end('my url is: '+_url);*/
});
app.listen(3000); 