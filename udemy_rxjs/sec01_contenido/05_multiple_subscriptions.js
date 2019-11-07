//node 05_multiple_subscriptions.js

//Multiple subscriptions:
const { interval } = require("rxjs");
const { map } = require("rxjs/operators")


const observrnd = interval(1000).pipe(map(n => {console.log("n:",n);return Math.random()}))

const fn_observer1 = n => console.log("obs1: ",n)
const fn_observer2 = n => console.log("obs2: ",n) 

//aunque parezca que dos observers están escuchando al mismo flujo no es así, el flujo 
//esta duplicado. Esto se da pq hay una subscripcion por cada observer, es decir una ejecución 
//por cada observable.
const subs1 = observrnd.subscribe(fn_observer1)
const subs2 = observrnd.subscribe(fn_observer2)

setTimeout(() => {subs1.unsubscribe();subs2.unsubscribe()},4000)

/*
MINGW64 /e/projects/prj_js/udemy_rxjs/sec01_contenido (master)
$ node 05_iterator_c.js
n: 0
obs1:  0.9002402719047111
n: 0
obs2:  0.12215605677229258
n: 1
obs1:  0.6289247678345251
n: 1
obs2:  0.7044494248227096
n: 2
obs1:  0.6457607264453746
n: 2
obs2:  0.6556825122189047
*/