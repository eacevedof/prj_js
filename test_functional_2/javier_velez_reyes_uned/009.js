//009.js
//B. Definición por Recursión 
//Torres de Hanoi
//https://youtu.be/f4qQN6Mli-M?t=1116

function hanoi(n,origen,aux,destino){
  if (n===1)
    mover(origen,destino)
  else{
    hanoi(n-1, origen, destino, aux)
    mover(origen, destino)
    hanoi(n-1, aux, origen, destino)
  }
}

function mover(origen,destino){
  destino.push(origen.pop())
}

//const A = [4,3,2,1]
const A = ["m","a","x","b"]
const B = []
const C = []

console.log("before:  A:",A,"B:",B,"C:",C)
hanoi(4,A,B,C)
console.log("after:  A:",A,"B:",B,"C:",C)

/*
$ node 009.js
before:  A: [ 'm', 'a', 'x', 'b' ] B: [] C: []
after:  A: [] B: [] C: [ 'm', 'a', 'x', 'b' ]
*/