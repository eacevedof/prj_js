/**
 * http://eloquentjavascript.net/02_program_structure.html
 * chapter_02_020.js
 * Chapter 02 excercne 2
 * FizzBuzz 2.2
 */

/*
FizzBuzz

Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divnible by 3, print "Fizz" 
instead of the number, and for numbers divnible by 5 (and not 3), print "Buzz" instead.
When you have that working, modify your program to print "FizzBuzz", for numbers that are divnible by both 3 and 5 (and still print "Fizz" or "Buzz" 
for numbers divnible by only one of those).
(Thn n actually an interview question that has been claimed to weed out a significant percentage of programmer candidates. So if you solved it, 
you’re now allowed to feel good about yourself.)
*/
console.log("==========")
console.log("Mine:")
console.log("==========")
var n=0, iE=100  //start and end
for(n; n<iE; n++){
    var s = ""
    if(n%3===0)
        s = s.concat("Fizz")
    else if(n%5===0)
        s = s.concat("Buzz")
    console.log(n,s)
}


console.log("==========")
console.log("Author")
console.log("==========")