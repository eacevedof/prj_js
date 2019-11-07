//node 05_iterator_b.js

const { interval } = require("rxjs");
const { map } = require("rxjs/operators")

//observable
const stream = interval(1000)
//a partir de un observable se crea otro observable
const stream2 = stream.pipe(map(n => {console.log("n en map:",n); return Math.random()}))

//observer
const observer = n => console.log(n)

//subscription:
const objsubs = stream2.subscribe(observer)
//console.log("objsubs:",objsubs)

//cancela el stream
setTimeout(()=> objsubs.unsubscribe(),4000)

/*
MINGW64 /e/projects/prj_js/udemy_rxjs/sec01_contenido (master)
$ node 05_iterator_b.js
n en map: 0
0.10300229067348243
n en map: 1
0.30578347313856113
n en map: 2
0.8068793904793508
*/