//04_programacion_funcional.js

//imperative
const arNumbers = [1,2,3,4,5,6,7,8,9,10]
let arNumbersEven = []

//get_even_numbers es una funcion muy especifica que no podría utilizar 
const get_even_numbers = ()=>{
  let arEven = []
  for(let i=0; i<arNumbers.length; i++){
    if(arNumbers[i] % 2 == 0){
      arEven.push(arNumbers[i])
    }
  } 
  //efecto colateral
  arNumbersEven = arEven
  console.log("arNumbersEven",arNumbersEven)
}

get_even_numbers()

//functional

const arEven = arNumbers
                .filter(i => i%2===0)
console.log("const arEven ",arEven)