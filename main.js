var http = require('http');
var fs = require('fs');
var url = require('url');
var listfolder = './data';

function mainbody(title, description, menulist){
  return(`
  ${menulist}
  <h2>${title}</h2>
  <p>
  ${description}
  </p>
  `)
}

function mainmenu(list){
  var rlist = `<ol>\n`;
  for(let i = 0;i<list.length;i++){
    if(list[i]!='Welcome')rlist+=`  <li><a href="/?id=${list[i]}">${list[i]}</a></li>\n`;
  }
  rlist+=`  </ol>`;
  return(rlist);
}

function maintem(title, body){
  return(`
  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${body}
  </body>
  </html>
  `)
}

var app = http.createServer(function(request,response){
var _url = request.url;
var queryData = url.parse(_url, true).query;
var title = queryData.id;
if(queryData.id === undefined)title = 'Welcome';
var pathname = url.parse(_url,true).pathname;
if(pathname==='/'){
  fs.readFile(`${listfolder}/${title}`,'utf8', function(err,description){
    fs.readdir(listfolder, function(err, filelist){
      var menulist = mainmenu(filelist);
      var body = mainbody(title, description, menulist);
      var template = maintem(title, body);
      response.writeHead(200);
      response.end(template);
      })})} else{
      response.writeHead(404);
      response.end('Not found');
  }
});
app.listen(3000); 