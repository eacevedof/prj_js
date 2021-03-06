## [RxJS Quick Start with Practical Examples](https://youtu.be/2LCo926NFLI)
- [Patrón observador](https://github.com/eacevedof/prj_phptests/tree/master/vendor/DesignPatterns/Observer#mi-conclusi%C3%B3n)
- Everything is a stream
- Ejecutar: `file:///E:/projects/prj_js/test_rxjs/index.html`

### [Example 1](https://youtu.be/2LCo926NFLI?t=59)
```js
function print(val){
  let el = document.createElement("p")
  el.innerText = val
  document.body.appendChild(el)
}

//se crea un observable cualquiera al que se le configura
//una función observer desconocida a la que se le pasarán unos argumentos fijos
const observable = Rx.Observable.create(observer => {
  observer.next("hello") // print("hello") => <p>world</p>
  observer.next("world") // print("world") => <p>world</p>
})

//despues de configurar el boservador se le suscribe la función
//que llamará el observador
observable.subscribe(val => print(val))
```
### [Example 2 - Observable de evento click](https://youtu.be/2LCo926NFLI?t=80)
- Por lo general no creamos observables de forma manual como el anterior
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/356x175/1c682072ba1d48e7b12ce95e220f9a56/image.png)
```js
//forma tradicional:
document.addEventListener("click",(click)=>{
  console.log("document.addEventListener.click",click)
})

//con observable
const obsble_documentclick = Rx.Observable.fromEvent(document,"click")
obsble_documentclick.subscribe(obsverclick => console.log("doc_click_subscribe.click:",obsverclick))
```
### [Example 3 - Trabajando con js asincrono y promises](https://youtu.be/2LCo926NFLI?t=111)
- **Rx.Observable.fromPromise**
```js
//=====================================================================
//Ejemplo1: 
const objpromise = new Promise((fnresolve, fnreject)=>{
  setTimeout(()=>{
    fnresolve("resolved!") //print("resolved!")
  },3000)
})

//se hace promise observable
const obsPromise = Rx.Observable.fromPromise(objpromise)
//se le configura un observer
obsPromise.subscribe(stresult => print(stresult))

//=====================================================================
//Ejemplo 2: Fetch json
const objpromise2 = new Promise((fnresolve, fnreject) => fetch("http://json.theframework.es/index.php?getfile=app_product.json")
                                  .then(fnresolve)
                                  .catch(fnreject))
                                  
const obsPromise2 = Rx.Observable.fromPromise(objpromise2)
obsPromise2.subscribe(objpromise => objpromise.json().then(strjon => print(JSON.stringify(strjon))))
```
### [Example 4 - Rx.Observable.timer()](https://youtu.be/2LCo926NFLI?t=147)
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/286x85/14ad2e7d16b2e3154a13d860a6387fe1/image.png)
```js
//observer timer
const timer = Rx.Observable.timer(1000)

//observer
timer.subscribe(idone => print("after 1 second. done:"+idone))
```
### [Example 5 Rx.Observable.interval()](https://youtu.be/2LCo926NFLI?t=163)
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/280x174/6043a45be18f5f7da01b316b02d4ce01/image.png)
```js
//obsrver tipo interval
const obsbleinterval = Rx.Observable.interval(1000)

obsbleinterval.subscribe(iprocessId => print("iprocessId: "+iprocessId+" - seconds:"+ new Date().getSeconds()))
```
### [Example 6 - Rx.Observable.of(...)](https://youtu.be/2LCo926NFLI?t=192)
- Permite pasar cualquier valor estático
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/392x258/bd6dabea692f3fc35da9fe23c459c135/image.png)
```js
//observable tipo interval
//mashup = triturar
const mashup = Rx.Observable.of("anything",["you","want"],23,true,{cool:"stuff"})
//observer
mashup.subscribe(strval => print(strval))
```
### [Example 7 - Hot vs Cold](https://youtu.be/2LCo926NFLI?t=213)
- **Rx.Observable.create(..fn..)**
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/367x209/c4e0b7dd4c55abdf38334ab66d61662f/image.png)
```js
//cold observable 
const cold = Rx.Observable.create( observer => {
  observer.next(Math.random()) //  math.random => print("subscriber x: ${math.random()}")
})

cold.subscribe(a => print(`Subscriber cold A: ${a}`))
cold.subscribe(b => print(`Subscriber cold B: ${b}`))

//hot observable. Hace que todos los observers obtenga el mismo valor
const fnrandom = Math.random()

const hot = Rx.Observable.create( observer => {
  observer.next(fnrandom)
})

//No se pq la función externa hace que obtengan el mismo valor ^^
hot.subscribe(a => print(`Subscriber hot A: ${a}`))
hot.subscribe(b => print(`Subscriber hot B: ${b}`))
```
### [Example 8 - Otra forma de hacer un hot observable](https://youtu.be/2LCo926NFLI?t=260)
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/355x120/df7b30242f05391432bed0f29d5b82fa/image.png)
```js
//hay otra forma de hacer un hot observable sin desacoplar los datos del mismo observer
const cold = Rx.Observable.create( observer => {
  //observer: Subscriber.  Es una función genradora por eso acepta .next(value)
  console.log("observer: ",observer,", typeof:",typeof observer)
  console.log("math.random:",Math.random(),"typeof:",typeof Math.random())
  observer.next(Math.random())
})
//cold: Observable 
console.log("cold:",cold," typeof:",typeof cold)

//hot: ConnectableObservable 
const hot = cold.publish()
console.log("hot:",hot," typeof:",typeof hot)

hot.subscribe(a => print(`Subscriber hot A: ${a}`))
hot.subscribe(b => print(`Subscriber hot B: ${b}`))
hot.connect()
```
### [Example 9 - Completion timer (again)](https://youtu.be/2LCo926NFLI?t=293)
- Este es un obsrvable que acaba automáticamente. No todos tienen esta propiedad
```js
//timer: TimerObservable
const timer = Rx.Observable.timer(1000)
console.log("timer:",timer," typeof:",typeof timer)

timer
  .finally(() => print("All done!"))
  .subscribe() //aqui normalmente se incluye un observador ^^^
  //.subscribe(() => print("All done!"))  //esto hace lo mismo. Pq?? ^^
```
### [Example 10 - Interval unsubscribe](https://youtu.be/2LCo926NFLI?t=315)
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/1122x362/6eb6825cece7567f54551a0a64ac679b/image.png)
```js
//interval: IntervalObservable
const interval = Rx.Observable.interval(500)
console.log("interval: ",interval," typeof: ",typeof interval)

interval
    .finally(() => print("All done!"))

//subscriber: Subscriber
const subscriber = interval.subscribe(x => print(x))
console.log("subscriber: ",subscriber," typeof: ",typeof subscriber)

setTimeout(()=>{
  //se finaliza la observación
  subscriber.unsubscribe()
}, 3000)
```
### [Example 11 - .map()](https://youtu.be/2LCo926NFLI?t=339)
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/1045x230/0034a83a57b92fd1f9f577226269773b/image.png)
```js
const numbers = Rx.Observable.of(10,100,1000)

numbers
  .map(num => Math.log(num))
  //el observer (la func print) se ejecutará en cada iteración
  .subscribe(i => print(`this is i: ${i}`))
```
### [Example 12 map and json](https://youtu.be/2LCo926NFLI?t=359)
- Convertir una respuesta json
- ![](https://trello-attachments.s3.amazonaws.com/5dbc52c6f0c94a02ee6e23dd/1119x482/75741e1a1f0377a1fa2fb8b057ac6523/image.png)
```js
const strjson = '{"type": "Dog", "breed": "Pug"}'

//crea un iterable: ScalarObservable 
const obsble_apicall = Rx.Observable.of(strjson)
console.log("obsble_apicall: ",obsble_apicall,"typeof obsble_apicall: ",typeof obsble_apicall)

obsble_apicall
  //map en cada vuelta comunicará al observer para que se ejecute
  .map(strjson => JSON.parse(strjson))
  //el observer (la func print) se ejecutará en cada iteración de map
  .subscribe(objson => {
    console.log("objson:",objson)
    console.log("objson typeof:",typeof objson)
    print(objson.type)
    print(objson.breed)
  })
```
### [Example 13 - do](https://youtu.be/2LCo926NFLI?t=379)
- Permite ejecutar codigo sin alterar el estado del observable
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/2725ea99f1204f698924796de86036f5/image.png)
```js
//names: ArrayObservable 
const names = Rx.Observable.of("Simon","Garfunle")

console.log("names: ",names)

//cada item "name" pasa por toda la pila primero y despues continua el siguiente
//observer: Subscriber 
const observer = names
  .do(name => print(name))          //simon
  .map(name => name.toUpperCase())  
  .do(name => print(name))          //SIMON
  .subscribe()

console.log("observer: ",observer,"typeof observer: ",typeof observer)
```
### [Example 14 .filter()](https://youtu.be/2LCo926NFLI?t=406)
- Por lo que he podido comprobar siempre se trata un array en uno a uno por el pipeline
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/3dc7551694e10604ecd012770b4c1a14/image.png)
```js
// numbers: ArrayObservable
const numbers = Rx.Observable.of(-3, 5, 7, 2, -7, 9, -2)
console.log("numbers: ",numbers," typeof numbers: ",typeof numbers)

// observer: Subscriber
const observer = numbers
                      .do(n => print(`handling number: ${n}`))
                      .filter( n => n>=0 )
                      .do(n => print(`filter passed: ${n}`))
                      .subscribe( n => print(n))

console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 15 .first() .last()](https://youtu.be/2LCo926NFLI?t=434)
- Otra vez hace el pipeline 1 a 1 y solo se ejecuta la accion de subscribe si se detecta que es primero o último
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/67ac77cc3effe2471b910e7322e8f10c/image.png)
```js
// numbers: ArrayObservable
const numbers = Rx.Observable.of(-3, 5, 7, 2, -7, 9, -2)
console.log("numbers: ",numbers," typeof numbers: ",typeof numbers)

// observer: Subscriber
const observer = numbers
                      .do(n => print(`number: ${n}`))
                      //todas las acciones despues de first solo se ejecutarán si se cumple esto
                      .first()
                      //.last() //quedaría invalidado por first
                      //solo se imprimirá first si se cumple la condición previa "is_first"
                      .subscribe( n => print(`first: ${n}`))
                      //esto no se ejecutaria ya que despues del subscribe no se puede agregar nada 
                      //... eso creo :) ^^
                      //.last()
                      //.subscribe( n => print(`last: ${n}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 16 - .debounceTime() .throttleTime()](https://youtu.be/2LCo926NFLI?t=457)
- debounce: rebotar. debounce time: tiempo de suspensión
  - se usa para detectar la inactividad del usuario
- throttle: regular, acelerar
- Sirven para tratar con eventos
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/af3b344b0524aaf6f4710479eb4828e3/image.png)
```js
//mouseEvents: FromEventObservable 
let mouseEvents = Rx.Observable.fromEvent(document, "mousemove")
console.log("mouseEvents: ",mouseEvents," typeof mouseEvents: ",typeof mouseEvents)

const observer = mouseEvents
  .debounceTime(1000) //tiempo de suspension. Se suele usar para detectar la inactividad del usuario
  //.throttleTime(1000) //escucha cada segundo, throttleTime "tiempo de regulación ^^"
  .subscribe(objevent => print(`${objevent.type} x:${objevent.clientX} y:${objevent.clientY}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 17 - .scan()](https://youtu.be/2LCo926NFLI?t=518)
- Scan trabaja como un reducer pero con estado mientras haya un observador suscrito
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/38c86d2b18f2bb7a32b901cdfcf9d779/image.png)
```js
//clicks: FromEventObservable
const clicks = Rx.Observable.fromEvent(document, "click")
console.log("clicks: ",clicks," typeof clicks: ",typeof clicks)

const observer = clicks
                    .map(objevent => parseInt(Math.random() * 10))
                    .do(score => print(`Click scored +${score}`))
                    .scan((acscore, score)=> acscore + score,0) //trabaja como reduce
                    .subscribe(acscore =>  print(`High score ${acscore}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 18 - switchMap()](https://youtu.be/2LCo926NFLI?t=569)
- [switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html)
- Cuando tienes dependencias de observables. Un observable depende del valor previo que tenga otro observable.
- Lo que hace: Con cada click se crea un nuevo observable interval
- No entiendo muy bien la lógica. Según el autor es util cuando se necesita un "userid" antes de enviarlo a la bd
- Por cada nuevo ciclo de clicks (es decir un click) **Rx.Observable.interval(1000)** se detiene
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/267dd37cbbed856e354f3b78b36c5635/image.png)
```js
//clicks: FromEventObservable
const clicks = Rx.Observable.fromEvent(document, "click")
console.log("clicks: ",clicks," typeof clicks: ",typeof clicks)

const observer = clicks
                    //interval: emit value in sequence every 1 second
                    //con cada click se reseta interval
                    .switchMap(click => Rx.Observable.interval(1000))
                    .subscribe(iIterval => print(`interval value: ${iIterval}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 19 - .takeUntil()](https://youtu.be/2LCo926NFLI?t=610)
- [.takeUntil(observable)](https://www.learnrxjs.io/operators/filtering/takeuntil.html)
- Ejecuta una subtarea durante x tiempo (segundo observable)
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/4a2cd589b7e0900c1c516e40195e5cf9/image.png)
```js
//interval: IntervalObservable 
const interval = Rx.Observable.interval(1000)
console.log("interval: ",interval," typeof interval: ",typeof interval)

//notifier: TimerObservable 
const notifier = Rx.Observable.timer(5000)
console.log("notifier: ",notifier," typeof notifier: ",typeof notifier)


const observer = interval               //intervalo de 1 seg
                  .takeUntil(notifier)  //intervalo cada 5 segundos
                  .finally(() => print("complete")) //cuando llegue a 5 segundos se acaba
                  .subscribe(i => print(i))

  console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 20 - takeWhile()](https://youtu.be/2LCo926NFLI?t=639)
- [takewhile](https://www.learnrxjs.io/operators/filtering/takewhile.html)
  - Emit values until provided expression is false
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/1058fcc65e98c33c6d0c95364b7eaee5/image.png)
- emite un valor (un nombre) al siguiente paso mientras no se cumpla una condicion
- Notar que con finally se cancela la suscripcion
```js
//names$: ArrayObservable
const names$ = Rx.Observable.of("Bob","Jeff","Doug","Steve")
console.log("names$ : ",names$ ," typeof obsenames$: ",typeof names$ )

const observer = names$
                  .takeWhile(name => name!="Doug")
                  .finally(() => print("Complete! I found Doug"))
                  .subscribe( name => print(name)) //los nombres que no son Doug

console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 21 - .zip](https://youtu.be/2LCo926NFLI?t=668)
- [zip](https://www.learnrxjs.io/operators/combination/zip.html)
  - After all observables emit, emit values as an array
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/fac5e9745e5b33beeabd04acb85f4b26/image.png)
```js
//yin$: ArrayObservable
const yin$ = Rx.Observable.of("peanut butter","wine","rainbows")
console.log("yin$ : ",yin$ ," typeof yin$: ",typeof yin$ )

const yang$ = Rx.Observable.of("jelly","cheese","unicorns")
console.log("yang$ : ",yang$ ," typeof yang$: ",typeof yang$ )

const zipped$ = Rx.Observable.zip(yin$, yang$)
console.log("zipped$ : ",zipped$ ," typeof zipped$: ",typeof zipped$ )

//despues de que todos los observables anteriores emitan un valor este emite un array
const observer = zipped$.subscribe( arr => print(arr))                
console.log("observer: ",observer," typeof observer: ",typeof observer)
```
### [Example 22 - .forkJoin()](https://youtu.be/2LCo926NFLI?t=695)
- [frokJoin](https://www.learnrxjs.io/operators/combination/forkjoin.html)
  - When all observables complete, emit the last emitted value from each.
- Se usa cuando se tiene que hacer varias llamadas ajax y hasta que no esten todas realizadas no se envia informacion al formulario
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/c57180e0f873fda2ceb4cf2db7cc03a7/image.png)
```js
//yin$: ArrayObservable
const yin$ = Rx.Observable.of("peanut butter","wine","rainbows")

const yang$ = Rx.Observable.of("jelly","cheese","unicorns").delay(2000)
console.log("yang$: ",yang$," typeof yang$: ",typeof yang$)

const forked$ = Rx.Observable.forkJoin(yin$, yang$)

//despues de que todos los observables anteriores emitan un valor este emite un array
const observer = forked$.subscribe( arr => print(arr))    
```
### [Example 23 - .catch()](https://youtu.be/2LCo926NFLI?t=726)
- [catch](https://www.learnrxjs.io/operators/error_handling/catch.html)
  - Gracefully handle errors in an observable sequence.
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/927b96e631fdbbc4dfdb7d61c5f5e134/image.png)
- No va fino, no me captura el error. Me da un error de js
```js
const create$ = Rx.Observable.create( observer => {
  observer.next("good")
  observer.next("great")
  observer.next("grand")

  throw "catch me!"

  observer.next("wonderful")
})
console.log("create$: ",create$," typeof create$: ",typeof create$)

create$
  .catch( err => print(`Error caught: ${err}`))
  .subscribe( val => print(val))
```
### [Example 24 - Subject](https://youtu.be/2LCo926NFLI?t=789)
- [Subject](https://rxjs-dev.firebaseapp.com/guide/subject)
> A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/4f733b81d4ed0d772463b6fa1a101e8b/image.png)
```js
const array$ = Rx.Observable.of("Hello")
console.log("array$: ",array$)

const obsA = array$.subscribe(val => print(`Sub A: ${val}`))
const obsB = array$.subscribe(val => print(`Sub B: ${val}`))

console.log("obsA: ",obsA,"obsB: ",obsB)
```
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/ef0a32adbdd4e02715beaefed5574fc6/image.png)
```js
const subject$ = new Rx.Subject()
console.log("subject$: ",subject$)

const obsA = subject$.subscribe(val => print(`Sub A: ${val}`))
const obsB = subject$.subscribe(val => print(`Sub B: ${val}`))

subject$.next("Hello") //los dos obs imprimen hello

setTimeout(() => {
  subject$.next("world") //los dos obs imprimen world 1 seg mas tarde
},1000)

```
### [Example 25 - .multicast()](https://youtu.be/2LCo926NFLI?t=843)
- [multicast](https://www.learnrxjs.io/operators/multicasting/multicast.html)
  - Share source utilizing the provided Subject.
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dbc52c6f0c94a02ee6e23dd/0272c7749be9dd40caa81a97663e37ed/image.png)
```js
//observable de document.click
const event$ = Rx.Observable.fromEvent(document, "click")

const clicks$ = event$ //on document click
                  .do(objevent => print("do One Time!. Event: "+objevent.toString()))

//el click se publique como multicast (se necesita un topic)
//multicast: Share source utilizing the provided Subject.
const subject$ = clicks$.multicast(()=> new Rx.Subject())

const obsA = subject$.subscribe(objevent => print(`Sub A: ${objevent.timeStamp}`))
const obsB = subject$.subscribe(objevent => print(`Sub B: ${objevent.timeStamp}`))

subject$.connect()
              
```