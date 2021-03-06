## [Por que RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648722#overview)
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/362x224/8b5a3e54580830312f7883b308be3cfa/image.png)
## [2 - Patrón observador](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648754#overview)
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/444x266/3a0d2a0b384ec906cfb40e323bc559be/image.png)
## [3 - Patrón Iterador](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648756#overview)
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/528x256/5384fcaff782e8067ca589eea4b1ee90/image.png)
- [03_patron_iterador.js](https://github.com/eacevedof/prj_js/blob/master/udemy_rxjs/sec01_contenido/03_patron_iterador.js) 
- [03_patron_iterador_b.js](https://github.com/eacevedof/prj_js/blob/master/udemy_rxjs/sec01_contenido/03_patron_iterador_b.js) 
## [4 - Programación funcional](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648760#overview)
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/544x325/914cd494627c4390e6a24145393c484d/image.png) 
- declarativo porque señalas paso a paso que es lo que tiene que hacerse para llegar al resultado
- [04_programacion_funcional.js](https://github.com/eacevedof/prj_js/blob/master/udemy_rxjs/sec01_contenido/04_programacion_funcional.js)
## [5 - La libreria RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648764#questions)
- observable: coleccion de datos que se pueden **emitir** en algun lugar en el futuro
- observer: funcion que esta a ala escucha de lo que emite el observable
- subscription: la ejecución de un observable y tambien sirve para cancelar la ejecución en un momento dado
- operators: funciones que trabajan sobre el flujo de datos
- subject: distribuir un observable a varios observers a la vez
- schedulers: organiza el orden de las suscripciones y el orden y la emisión de eventos
- para aplicar operadores hay que hacerlo dentro de **.pipe()**
- para que se ejecute el observable debe haber una subscripción
```js
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
$ node 05_multiple_subscriptions.js
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

//node 05_subject.js
const { interval,Subject } = require("rxjs");
const { map } = require("rxjs/operators")

const observrnd = interval(1000).pipe(map(n => {console.log("n:",n);return Math.random()}))

//subject hereda de observer, por eso permite la subscripcion
const objsubject = new Subject()
observrnd.subscribe(objsubject)

const fn_observer1 = n => console.log("obs1: ",n)
const fn_observer2 = n => console.log("obs2: ",n) 

//en lugar de subscribirme a observer me suscribo a subject (el hub)
//subject hace multicast del observable al que está subscrito
const subs1 = objsubject.subscribe(fn_observer1)
const subs2 = objsubject.subscribe(fn_observer2)

//esto no detiene el interval
setTimeout(() => {
    subs1.unsubscribe()
    subs2.unsubscribe() 
    //objsubject.unsubscribe() //da error
  },4000)

/*
$ node 05_subject.js
n: 0
obs1:  0.3216322350659291
obs2:  0.3216322350659291
n: 1
obs1:  0.12399099073131925
obs2:  0.12399099073131925
n: 2
obs1:  0.5425679400359618
obs2:  0.5425679400359618
*/

```
## [6. Principios Push de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648774#questions)
- Versión completa del observer:
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1190x823/160faf44f4b9cddbaa49ed4538a52d55/image.png)
```js
//node 06_observables_iter.js
//Observables work like iterators

const { interval } = require("rxjs")
const {take} = require("rxjs/operators")

//al cabo de 4 eventos el stream se acaba
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
```
- Protocolos **pull** vs **push**
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1022x728/3f4f9591beb45dd5eee56ebd036aa880/image.png)
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1009x757/0cd2389e172b80cf7ebd21d66ba38788/image.png)
  - Estrategia de RxJS
  - El observable es un productor que va empujando sus datos al observador
```js
//node 06_interval.js
const { Observable, interval } = require("rxjs")

const observable = my5Interval(5000)
observable.subscribe(x => console.log(x))

function my5Interval(ms){
  return Observable.create(observer => {
    let count = 0
    const id = setInterval(()=>{
      //aqui el observable está haciendo push de un dato al observer
      observer.next(count)
      count++
      if(count>4){
        clearInterval(id)
        observer.complete()
      }
    },ms)
  })
}
```
- **Mi replica del patron Observable**
```js
//node 06_observable_mine2.js

const arStream = ["v1","v2","v3","v4","v5"]
arStream.__proto__.subscribe = function(observer){
  console.log("obsparam",observer,"typeof:",typeof observer) 
  //que transformación hace aqui subscribe para cambiar la funcion
  //en un observer object de modo que pueda pasar el valor con next?
  arStream.forEach((i)=>{
    //arStream.subscribe(objObserver)
    observer.next(i)
  })  
}

const objObserver = {
  next: val => console.log("objObserver.next.val",val),
  error: err => console.log("objObserver.next.err",err),
  complete: () => console.log("...done!")
}

//arStream.subscribe(objObserver) //ok
arStream.subscribe(x => console.log(x)) //Aqui da error! 
//ya que espera un objObserver con su método next() y recibe una función
```
- Preguntas Udemy:
  - [param:objObserver y fnObserver](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648774#questions/8603478)
  - [observable es iterable sin next?](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648774#questions/8591230)
  