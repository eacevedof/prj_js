//009.js
//arAux. Definición por Recursión 
//Torres de Hanoi
//https://youtu.be/f4qQN6Mli-M?t=1116

function hanoi(iItems,arOrigin,arAux,arDest){
  if (iItems===1)
    mover(arOrigin,arDest)
  else{
    hanoi(iItems-1, arOrigin, arDest, arAux)
    mover(arOrigin, arDest)
    hanoi(iItems-1, arAux, arOrigin, arDest)
  }
}

function mover(arOrigin,arDest){
  arDest.push(arOrigin.pop())
}

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