/**
 * http://eloquentjavascript.net/02_program_structure.html
 * chapter_02_030.js
 * Chapter 02 excercise 3
 * Chess board 2.3
 */

/*
Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. 
At each position of the grid there is either a space or a “#” character. The characters should form a chess board.

Passing this string to console.log should show something like this:

 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
*/
console.log("==========")
console.log("Mine:")
console.log("==========")
for(var i=0; i<8; i++){
  var row = "#"
  if(i%2===0) row = " "

  for(var j=0; j<7; j++)
    row = row.concat((row.slice(-1)==="#"?" ":"#"))
  
  console.log(row)
}

console.log("==========")
console.log("Author")
console.log("==========")
var size = 8;

var board = "";

for (var y = 0; y < size; y++) {
  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      board += " ";
    else
      board += "#";
  }
  board += "\n";
}

console.log(board);