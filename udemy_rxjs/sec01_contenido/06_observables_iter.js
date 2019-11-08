//node 06_observables_iter.js
//Observables work like iterators

const { interval } = require("rxjs")
const {take} = require("rxjs/operators")

//al cabo de 4 eventos el stream se acaba
//Es el observable que llama al observer con cada nuevo valor
const observable = interval(1000).pipe(take(4))

const observer = {
  //next: "hola", //provoca error
  next: val => console.log("next:",val),
  error: err => console.log(err),
  complete: () => console.log("done"),
}

observable.subscribe(observer)

/*
MINGW64 /e/projects/prj_js/udemy_rxjs/sec01_contenido (master)
$ node 06_observables_iter.js
next: 0
next: 1
next: 2
next: 3
done
*/