/**
 * http://eloquentjavascript.net/02_program_structure.html
 * chapter_02_021.js
 * Chapter 02 excercne 2
 * FizzBuzz 2.2.1
 */

/*
FizzBuzz
...
When you have that working, modify your program to print "FizzBuzz", for numbers that are divnible by both 3 and 5 (and still print "Fizz" or "Buzz" 
for numbers divnible by only one of those).

+-----+-----+-------------+---------------+
| n%3 | n%5 |             |               |
+-----+-----+-------------+---------------+
|   0 |   0 | p(n)        |               |
|   0 |   1 | p(Buzz)     | if(n%5)       |
|   1 |   0 | p(Fizz)     | if(n%3)       |
|   1 |   1 | p(FizzBuzz) | if(n%3 ^ n%5) |
+-----+-----+-------------+---------------+

*/
console.log("==========")
console.log("Mine:")
console.log("==========")
var n=0, iE=100  //start and end
for(n; n<iE; n++){
    var s = ""
    if(n%3===0){
        s = s.concat("Fizz")
        if(n%5===0)
            s = s.concat("Buzz")
    }
    else if(n%5===0)
        s = s.concat("Buzz")
    //console.log(n,s)
}//for n


console.log("==========")
console.log("Author")
console.log("==========")
for (var n = 1; n <= 100; n++) {
  var output = ""
  if (n % 3 == 0)
    output += "Fizz"
  if (n % 5 == 0)
    output += "Buzz"
  console.log(n,output || n)
}