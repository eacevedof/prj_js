//node 05_iterator.js

/*
CommonJS es una extensión del lenguaje de secuencias de comandos JavaScript que permite utilizar 
JavaScript en entornos distintos de un navegador, como en el escritorio (o desktop). 
El propósito de CommonJS es extender JavaScript para que existan módulos estándar, bibliotecas e 
interfaces de programación que sean adecuados para su implementación en aplicaciones como servicios 
web, bases de datos y aplicaciones de desktop.
*/

//import { range } from 'rxjs';             error pq es es6 y si no se usa babel solo entiende CommonJS 
//import { interval } from 'rxjs';          error
//import { from, fromEvent } from 'rxjs'    error
//const Rx = require('rxjs/Rx');            error
const { interval } = require("rxjs");

//observable
const stream = interval(1000)

//observer
const observer = n => console.log(n)

//subscription:
const objsubs = stream.subscribe(observer)
console.log("objsubs:",objsubs)

//cancela el stream
setTimeout(()=> objsubs.unsubscribe(),4000)
