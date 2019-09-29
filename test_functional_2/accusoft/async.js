//https://youtu.be/ntlTxreBnqQ?t=179

/*
Se hacen retrollamadas a increment(10) comprobando el estado de 1 en cada llamada
Que es lo que pasa cuando se tiene un estado compartido y mutable "let i"
*/

const fnEmAsync = (fn_callback) => setTimeout(fn_callback,100)

const doSomething = () => {
    let i = 0

    const increment = (n) => {
        if(i < n){
            console.log(i)
            ++i
            fnEmAsync(() => increment(n))
        }
    }//increment

    //la primera vez se fuerza la llamada con fmEmAsync. 
    //Las sucesivas se realizan dentro de increment, increment se llama asi misma con fmAsync, se detiene la 
    //lamada recursiva cuando i es 10
    fnEmAsync(() => increment(10))

    //Al aplicar dos llamadas más y al comparitr el i el resultado es el mismo.
    fnEmAsync(() => increment(10))
    fnEmAsync(() => increment(10))

}//doSomething

//version sin estado compartido
//https://youtu.be/ntlTxreBnqQ?t=277
const doSomething1 = () => {
    const increment = (n, i=0) => {
        if(i < n){
            console.log(i)
            fnEmAsync(() => increment(n,i+1))
        }
    }//increment

    fnEmAsync(() => increment(10))
    fnEmAsync(() => increment(10))
    fnEmAsync(() => increment(10))

}//doSomething1

//doSomething()
doSomething1()