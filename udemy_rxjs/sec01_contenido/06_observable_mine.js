//node 06_fnObservable_mine.js

//fnObservable.subscribe(fn_observer)

//const fnObservable = ()=>{..}: con arrow function no va!
const fnObservable = function(){
  const obsver = {
    next: val => console.log("obsver.next.val",val),
    error: err => console.log("obsver.next.err",err),
    complete: () => console.log("...done!")
  }

}//fnObservable

//console.log(typeof fnObservable)

//con fnObservable.prototype.subscribe no va!!, lo configurado en prototype estaria disponibles
//en las instancias de new <myfunciton>()
//__proto__ funciona. Es equivalente a Object.setPrototypeOf(obj, prototype) y hay que evitar su uso
fnObservable.__proto__.subscribe = function(fn_observer){
  console.log("fn_observer",fn_observer)
  console.log()
}

//no va!
// Object.setPrototypeOf(fnObservable,function subscribe(fn_observer){
//   console.log("fn_observer",fn_observer)
// })

//console.log("fnObservable:",fnObservable)
//const stream = fnObservable._subscribe(x => console.log(x))
const stream = fnObservable.subscribe(x => console.log(x))



// const fnObservable2 = {
//   subscribe: fnobserver => {
//     console.log(fn_observer)
//   }
// }

//console.log("Obs2",fnObservable2)

