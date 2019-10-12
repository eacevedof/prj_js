//008.js
//B. Definición por Recursión 
//https://youtu.be/f4qQN6Mli-M?t=1025

//recursion directa
const factorial = n => n === 0 ? 1 : n * factorial(n-1) 

const r = factorial(4)
console.log("factorial 4",r)
  

//Recursion Indirecta
function even(n){
  console.log("even.n",n)
  return n === 0 ? true :
            !odd(n-1)
}

function odd(n){
  console.log("odd.n",n)
  return n === 0 ? false :
            !even(n-1)
}

even(8)

