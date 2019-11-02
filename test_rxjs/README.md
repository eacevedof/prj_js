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
### [Example 15 ]()
-
- ![]()
```js
```
### [Example 16]()
-
```js
```
### [Example 17]()
-
```js
```
### [Example 18]()
-
```js
```
### [Example 19]()
-
```js
```
### [Example xxx]()
-
```js
```
### [Example xxx]()
-
```js
```
### [Example xxx]()
-
```js
```
### [Example xxx]()
-
```js
```
### [Example xxx]()
-
```js
```
### [Example xxx]()
-
```js
```
