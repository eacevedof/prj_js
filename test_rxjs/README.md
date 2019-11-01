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
  observer.next("hello")
  observer.next("world")  
})

//despues de configurar el boservador se le suscribe la función
//que llamará el observador
observable.subscribe(val => print(val))
```
### [Example 2](https://youtu.be/2LCo926NFLI?t=91)
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
### [Example xxx]()
-
```js
```
