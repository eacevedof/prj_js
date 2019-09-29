//004_arrays_destructuracion.js https://youtu.be/HvMemAgOw6I?t=553
//Spread Operator (…): expande un array en parámetros
//Rest Parameters ...opciones :  recupera todos los parámetros y los devuelve en un array
//equivalente a [].slice()
const arLangs = ["javascript","ruby","haskell"]
const [js,...arRest] = arLangs

console.log(js === "javascript") //true
console.log(arRest[0] === "ruby") //true
console.log(arRest[1] === "haskell")  //true

//===============================================================
//extrae el primer elemento de un array
const head = ([x]) => x // no entiendo que significa [x] como argumento
console.log(head([1,2,3]) === 1) //true

const head2 = ([x,y]) =>{ console.log("x:",x,"y:",y); y};
console.log(head2([11,12]) === 12) //false!!! Por qué??
