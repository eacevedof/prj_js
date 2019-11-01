## [RxJS Quick Start with Practical Examples](https://youtu.be/2LCo926NFLI)

- Everything is a stream
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
