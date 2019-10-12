//009.js
//B. Definición por Recursión 
//Torres de Hanoi
//mover discos de uno en uno para dejarlos en la misma posición de A en C usando B como auxiliar
//https://youtu.be/f4qQN6Mli-M?t=1116


const hanoi = (iItems, arA, arAux, arC) =>{
                if(iItems===1)
                  //quita el elemento de arA y lo pone en arC
                  mover(arA, arC)
                else{
                  hanoi(iItems-1, arA, arC, arAux)
                  //quita el elemento de origin y lo pone en dest
                  mover(arA, arC)
                  hanoi(iItems-1, arAux, arA, arC)                  
                }
              }

//array.pop extrae el último elemento y lo quita del array
const mover = (arA, arC) => arC.push(arA.pop()) 

//const arFrom = [4,3,2,1]
const arFrom = ["m","a","x","b"]
const arAux = []
const arFinal = []

console.log("before:  arFrom:",arFrom,"arAux:",arAux,"arFinal:",arFinal)
hanoi(4,arFrom,arAux,arFinal)
console.log("after:  arFrom:",arFrom,"arAux:",arAux,"arFinal:",arFinal)

/*
$ node 009.js
before:  arFrom: [ 'm', 'a', 'x', 'b' ] arAux: [] arFinal: []
after:  arFrom: [] arAux: [] arFinal: [ 'm', 'a', 'x', 'b' ]
*/