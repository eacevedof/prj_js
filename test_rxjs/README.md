## [RxJS Quick Start with Practical Examples](https://youtu.be/2LCo926NFLI)
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
### [Example 9 - ]()
-
```js
```
### [Example 10 - ]()
-
```js
```
### [Example 11 - ]()
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
### [Example xxx]()
-
```js
```
### [Example xxx]()
-
```js
```
