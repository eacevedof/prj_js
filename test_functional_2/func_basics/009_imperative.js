//009_imperative.js https://youtu.be/HvMemAgOw6I?t=1036

//En programación imperativa
function doubleNumbers(numbers){
    const doubled = []
    const l = numbers.length

    for(let i=0; i<l; i++){
        doubled.push(numbers[i]*2)
    }

    return doubled
}

console.log(doubleNumbers([1,2,3,4])) //[ 2, 4, 6, 8 ]

//https://youtu.be/HvMemAgOw6I?t=1121
//En funcion declarativa
//Ejemplo declatativo: SQL no se le dice a la bd como hacerlo sino que hacer
//html, no se le indica al navegador como interpretar el xml sino que se desea obtener como resultado

function doubleNumbers(numbers){
    let doubled = numbers.map(n=>n*2)
    return doubled
}

console.log(doubleNumbers([1,2,3,4])) //[ 2, 4, 6, 8 ]