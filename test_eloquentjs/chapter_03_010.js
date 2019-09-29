/**
 * http://eloquentjavascript.net/03_functions.html
 * chapter_03_.js
 * Chapter 03
 */

let x = 1;
console.log(x);

function power(iB,iE){
    if(iE==undefined) iE=2
    let iR = 1
    for(let iC=0; iC<iE; iC++)
        iR *= iB
    return iR
}

console.log("3^2",power(3))
console.log("3^5",power(3,5))