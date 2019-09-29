//https://youtu.be/ntlTxreBnqQ?t=445
/*en programación funcional

Math.round(Math.random()) devuelve 1 o 0 de forma aleatoria
math.random() devuelve un numero tipo 0.012345678 entre 0 y 1

https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise

let miPrimeraPromise = new Promise((resolve, reject) => {
  // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
  // En este ejemplo, usamos setTimeout(...) para simular código asíncrono. 
  // En la vida real, probablemente uses algo como XHR o una API HTML5.
  setTimeout(function(){
    resolve("¡Éxito!"); // ¡Todo salió bien!
  }, 250);
});

miPrimeraPromise.then((successMessage) => {
  // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
  // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
  console.log("¡Sí! " + successMessage);
});
*/


let     fnRequest = () => new Promise( resolve => setTimeout(() => {
                            resolve(null,{statusCode:Math.round(Math.random()) ? 200:500})
                        }, 250)),
        fnAmIAwesome = fnRequest,
        fnAreYouAwesome = fnRequest,
        fnAreWeAwesome = fnRequest

const   I_AM_AWESOME = 1, 
        YOU_ARE_AWESOME_TOO = 2, 
        WE_ARE_AWESOME = 3,
        NO_ONE_IS_AWESOME = 0

let fnCheckIsAwesome = res => res.statusCode === 200

let fnCheckIfAmAwesome = (state,res) => 
    fnCheckIsAwesome(res) 
        ? Promise.resolve(I_AM_AWESOME)
        : Promise.reject()

let fnCheckIfYouAreAwesome = (state,res) => 
    fnCheckIsAwesome(res) && (state === I_AM_AWESOME)
        ? Promise.resolve(YOU_ARE_AWESOME_TOO)
        : Promise.reject()

let fnCheckIfWeAreAwesome = (state,res) => 
    fnCheckIsAwesome(res) && (state === YOU_ARE_AWESOME_TOO)
    ? Promise.resolve(WE_ARE_AWESOME)
    : Promise.reject()

const doSomething = () => {
    fnAmIAwesome()
        .then((res)=> fnCheckIfAmAwesome(0,res))
        .then(state => {
            return fnAreYouAwesome().then((res)=>fnCheckIfYouAreAwesome(state,res))
        })
        .then(state => {
            return fnAreWeAwesome().then(res => fnCheckIfWeAreAwesome(state,res))
        })
        .then(() => console.log("We are awesome!!"))
        .catch((e)=> console.log("Awwww"))
}//doSomething

for(let i=1; i<50; ++i) doSomething()