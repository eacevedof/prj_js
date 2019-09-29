//003_arrays.js https://youtu.be/HvMemAgOw6I?t=424

//pasa a array un numero n de elementos separados por ,
const array = (...arElements)=>{
    return arElements
}

console.log("a","b","c") //imprime: a b c
console.log("array(1,2,3):",array(1,2,3))  //array(1,2,3): [ 1, 2, 3 ]
console.log("array(...):",array("a",2,1.3,{},[],"1.33",null,undefined)) //array(...): [ 'a', 2, 1.3, {}, [], '1.33', null, undefined ]

//=========================================================================
//https://youtu.be/HvMemAgOw6I?t=517
//spread operator
const log = (...args)=>{
    console.log(args) //array de argumentos
    console.log(...args) //array de argumentos repartidos por orden
}

log("hello","scenic city summit","1",3,1.0006,null,{},[])
/*
[ 'hello', 'scenic city summit', '1', 3, 1.0006, null, {}, [] ]
hello scenic city summit 1 3 1.0006 null {} []
*/

const log2 = (...arArgs)=>{
    console.log(arArgs)
    console.log(...arArgs)
}

log2("hola","cumbre en pintoresca ciudad")
/*
[ 'hola', 'cumbre en pintoresca ciudad' ]
hola cumbre en pintoresca ciudad 
*/
