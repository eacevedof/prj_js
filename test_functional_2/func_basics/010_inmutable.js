//010_inmutable.js https://youtu.be/HvMemAgOw6I?t=1193
//estado inmutable.
//No se modifica las propiedades de un objeto
//no se cambian valores en variables
//no se cambian los arrays
//en lugar se crea un nuevo estado

//EJEMPLO:

const arHobbies = [
    "programming","reading","music"
]

//splice no es slice, splice muta arHobbies
const arFristTwo = arHobbies.splice(0,2)

console.log(arFristTwo)
console.log(arHobbies)

//Object.freeze https://youtu.be/HvMemAgOw6I?t=1271
//inmutable.js (libreria de facebook)

//fija un objeto o un array evita su mutación
const arHobbies = Object.freeze(["programming","reading","music"])

const arFristTwo = arHobbies.splice(0,2)

console.log("arFristTwo:",arFristTwo)
console.log("arHobbies:",arHobbies)

//ERROR:
/*
010_inmutable.js:26
const arFristTwo = arHobbies.splice(0,2)
                             ^

TypeError: Cannot add/remove sealed array elements
    at Object.<anonymous> (\func_basics\010_inmutable.js:18:30)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:389:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:504:3
*/