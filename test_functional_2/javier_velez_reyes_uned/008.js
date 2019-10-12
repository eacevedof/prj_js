//008.js
//B. Definición por Recursión 
//https://youtu.be/f4qQN6Mli-M?t=1025

//recursion directa
const factorial = n => n === 0 ? 1 : n * factorial(n-1) 

//recursion indirecta
const is_even = n => n === 0 ? true  : !is_even(n-1)
const is_odd  = n => n === 0 ? false : !is_odd(n-1)

//directa
let r = factorial(4)
console.log("factorial 4:",r)

//Indirecta
r = is_even(18)
console.log("is_even 18:",r)

r = is_odd(18)
console.log("is_odd 18:",r)

/*
$ node 008.js
factorial 4: 24
is_even 18: true
is_odd 18: false
*/