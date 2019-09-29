//017_recursion.js https://youtu.be/HvMemAgOw6I?t=2724

//FACTORIAL
//4! = 4 x 3 x 2 x 1 = 24

const factorial = (n)=>{
    let r=1

    while(n>1){
        r *= n
        n--
    }

    return r
}//factorial

const fn_factorial = (n)=>{
    //caso base
    if(n<2) return 1
    return n * fn_factorial(n-1)
}

const value = fn_factorial(100000)//RangeError: Maximum call stack size exceeded
console.log(value)

//Explicacion del espacio en el stack (pila de memoria) https://youtu.be/HvMemAgOw6I?t=3020
//1 bloque = 48B
//El tamaño maximo para la pila es de 1MB
//100.000 llamadas = 100000 bloques -> (100000 x 48)/1024/1024 = 4.58MB > 1MB => ERROR!!!