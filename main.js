var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var mainmenu = function(title, filelist,pathname){
  var menulist = `<ol>\n`;
  var nomenu = ['Welcome', 'Create','Update'];
  var nopath = ['/update/', '/delete/'];
  var ctext = '<a href = "/create" style = "text-decoration:none">create   </a>';
  var utext = `<a href = '/update/?id=${title}' style = "text-decoration:none">update    </a>`;
  var dtext = `<a href = '/delete/?id=${title}' style = "text-decoration:none">delete</a>`;
  for(let i = 0;i<filelist.length;i++){
    if(!nomenu.includes(filelist[i])){
    menulist+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>\n`;
    }
  }
  menulist+= `</ol>`;
  if(nomenu.includes(title) || nopath.includes(pathname)){
    if(title === 'Welcome')menulist+=ctext;
  } else{
    menulist+=ctext+utext+dtext;
  }
  return(menulist);
}

var mainbody = function(title, description){
  var body = `
  <h2>${title}</h2>
  <p>
  ${description}
  </p>
  `;
  return(body);
}
var udbody = function(title, description){
  var body = `
  <form action = "http://localhost:3000/process" method = "POST">

    <p name = "title">${title}</p>
    <p> <textarea style = "width:400px;height:300px" name = "description" placeholder ='change description' >${description}</textarea></p>
    <p> <input type = "submit" value = "submit"></p>
  </form>
  `;
  return(body);
}
var dbody = function(title){
  var body = `
  <form action = "http://localhost:3000/dprocess/?id=${title}" method = "POST">
    <p> Are you sure to delete <div name = "title">${title}?</div></p>
    <p> <input type = "submit" value = "YES">   <a href = '/?id=${title}'><button type = "button">NO</button></a></p>
  </form>
    `;
    return(body);
}

var maintemplate = function(title, body, menulist){
  
  var template = `

  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${menulist}
  ${body}
  </body>
  </html>
  `
  return(template);
}

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathlist = ['/', '/create', '/update/','/delete/'];
  var pathname = url.parse(_url,true).pathname;
  var title = queryData.id;
  if(pathlist.includes(pathname)){
    if(pathname === '/create')title = 'Create';
    else if(title === undefined)title = 'Welcome';
  fs.readFile(`data/${title}`,'utf8', function(err,description){
    fs.readdir('./data',function(err,filelist){
      var menulist = mainmenu(title, filelist, pathname);
      var body = mainbody(title, description);
      if(pathname === '/update/')body = udbody(title, description);
      else if(pathname === '/delete/')body = dbody(title);
      var template = maintemplate(title,body,menulist);
  response.writeHead(200);
  response.end(template);
  })})}
  else if(pathname === '/process'){
    var body = '';
    request.on('data', function(data){
      body+=data;
    })
    request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, `${description}`, 'utf8',function(err){
        response.writeHead(302,{Location:`/?id=${title}`}
        );
        response.end();
      });
    })
  } else if(pathname === '/dprocess/'){
    request.on('data', function(data){
      
    })
    request.on('end', function(){
      fs.unlink(`data/${title}`, function(err){
        response.writeHead(302, {Location: '/'});
        response.end();
      } )
    })
  }else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000); 