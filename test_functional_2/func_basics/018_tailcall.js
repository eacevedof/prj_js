//018_tailcall  https://youtu.be/HvMemAgOw6I?t=3059

// const fn_factorial = (n)=>{
//     //caso base
//     if(n<2) return 1
//     return n * fn_factorial(n-1)
// }

const fn_factorial = (n,accum=1)=>{
    if(n<2) return accum
    return fn_factorial(n-1,n*accum)
}

console.log(fn_factorial(10000))

console.log(fn_factorial(4))