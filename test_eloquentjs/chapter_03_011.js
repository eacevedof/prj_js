/**
 * http://eloquentjavascript.net/03_functions.html
 * chapter_03_011.js
 * Chapter 03
 * CLOSURE
 * function retunrs a function
 */

function wrapvalue(iN){
    let iLocal = iN
    return function(){
        return iLocal
    }
}

let wrap1 = wrapvalue(1)
let wrap2 = wrapvalue(2)

console.log("wrap1",wrap1,"wrap2",wrap2)
//esto devuelve:
/*
wrap1 function (){
        return iLocal
    } 
wrap2 function (){
        return iLocal
    }
*/
console.log("wrap1()",wrap1(),"wrap2()",wrap2())
/*
wrap1() 1 wrap2() 2
*/