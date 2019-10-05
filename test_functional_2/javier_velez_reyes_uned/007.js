//007.js
//A. Definicion funcional por casos
//https://youtu.be/f4qQN6Mli-M?t=993

function f(params){
  return caso_1 ? resultado_1:
         caso_2 ? resultado_2:
         resultado-defecto;
}

function comparator(x){
  return x > 0    ? 1:
         x === 0  ? 0:
                    -1
}

is_even = n => n % 2 === 0

console.log("comparador 10:",comparator(10))
console.log("comparador 0 :",comparator(0))
console.log("comparador -5:",comparator(-5))
