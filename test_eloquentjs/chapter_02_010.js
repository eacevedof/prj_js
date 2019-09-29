/**
 * http://eloquentjavascript.net/02_program_structure.html
 * chapter_02_010.js
 * Chapter 02 excercise 1
 * Loop triangle 2.1
 */

/*
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/

console.log("Mine:");
for(var s="#"; s.length<8; s=s.concat("#"))
    console.log(s);

console.log("Author:");
for (var line = "#"; line.length < 8; line += "#")
  console.log(line);
