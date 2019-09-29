/**
 * https://youtu.be/ZfQKYlGzH2g?t=607
 * 
 * Principio de Igualdad
 */
 
 function adder(fSum){
     return function(iQ){
         return fSum+iQ;
     }
 }
 
var fn1 = adder(1)
console.log(fn1)
console.log(fn1(8))
 
var fn1 = adder(1)(8);
console.log("fn1()()",fn1)
 
var fn2 = adder(2)
console.log(fn2)
console.log(fn2(88))
 
var fn2 = adder(2)(88)
console.log("fn2()()",fn2)
 
 
var farrow = (param1, param2, paramN) => { return param1+param2+paramN }
console.log(farrow(1,2,3))
 
var farrow = (fsum) => {
  return (iQ)=>{return fsum+iQ}
}

console.log("closure arrow",farrow(4)(10))

/**
 * https://youtu.be/ZfQKYlGzH2g?t=615
 * 
 * Principio de transparencia referencial
 * Todas las sentencias que se puedan cambiar por su valor y no modifiquen el resultado final del programa, es decir
 * que devuelvan siempre lo mismo.
 * 
 * Esto nos lleva a aprovechar la memoizacion.  Esto es un mapeo de clave=>valor
 * 
 * Calculo una vez un valor, lo guardo en una "cache" en forma de tabla hash, de modo que las siguientes veces como el resultado no cambia, 
 * busco en cache.
 * 
 * Subexpresion elimination:
 * Toda las expresiones que sean iguales voy a calcular una guardandola en cache. 
*/
 
 