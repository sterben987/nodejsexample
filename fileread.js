var fs = require('fs')
fs.readFile('fileex/sample.txt', 'utf8',function(err, data){
    console.log(data);
});