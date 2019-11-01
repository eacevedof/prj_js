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
