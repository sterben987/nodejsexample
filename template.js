const { utimes } = require("fs");

var name = 'Woojae';
var letter = 'Dear'+name+'Lorem ipsum dolor sit amet, \n\
\ consectetur adipisicing elit, sed do eiusmod temporincididunt \n\
\ ut labore et dolore magna aliqua.'+ name+'Ut enim ad minim veniam,\n\
\ quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \n\
\ commodo consequat. Duis aute irure dolor in reprehenderit in \n\
\ voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n\
\ Excepteur sint occaecat cupidatat non proident, sunt in culpa \n\
\ egoingg qui officia deserunt mollit anim id est laborum.' +name;

var letter = `Dear ${name} 

Lorem ipsum dolor sit amet, 
consectetur adipisicing elit, sed do eiusmod temporincididunt 
ut labore et dolore magna aliqua. ${name} Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
commodo consequat. Duis aute irure dolor in reprehenderit in 
voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa 
egoingg qui officia deserunt mollit anim id est laborum. ${name}`;
console.log(letter);

/*template literal: 자료형/데이터? */

var a = '1';