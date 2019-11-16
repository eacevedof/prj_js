## Sección 3: Creación de Observables

## [10. Función Create](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648834#questions)
```js
//se importa el objeto que se exporta con el nombre concreto
import { displayLog } from './utils';
//la variable con export default de utils se almacena en "mivariable"
import mivariable  from './utils';
```
- Ejemplo sincrono
```js
//create.js
  //El observable hello$ se crea por defecto con una emisión "sincrona" a cualquier observable
  //que se suscriba
  const hello$ = Observable.create(observer => {
    observer.next("hello")
    observer.next("world")
  })

  //el observer que se suscribe es una arrow function.
  //observer.next = evt => displayLog(evt)

  //para cada emisión: obs.next se ejecutará el arrow function
  const subscribe = hello$.subscribe(evt => displayLog(evt))

  //El ejemplo se basa en una secuencia sincrona y la gracia de rxjs es la manipulación
  //de eventos asincronos
```
- Ejemplo asincrono
```js
export default () => {

  //El observable hello$ se crea por defecto con una emisión "sincrona" para "hello" 
  //y asincrona para "world" a cualquier observable
  const hello$ = Observable.create(observer => {
    observer.next("hello")
    //crea asincronicidad, imaginemos que esto es una llamada a una API
    setTimeout(()=>{
      observer.next("world")
    },2000)
  })

  //el arrow func es una version reducida de un observer
  const subscribe = hello$.subscribe(evt => displayLog(evt))

}//export default 
```
## [11. Suscripciones y Observadores](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648844#questions)
- Un arrow func es una versión reducida de un observer
- **cold observables**
  - cada suscripción al observable implica una nueva ejecución del flujo de datos
```js
//create.js
import { displayLog } from './utils';
import {Observable} from "rxjs"

export default () => {

  //El observable hello$ se crea por defecto con una emisión "sincrona" para "hello" 
  //y asincrona para "world" a cualquier observable
  const hello$ = Observable.create(observer => {
    observer.next("hello")
    //crea asincronicidad, imaginemos que esto es una llamada a una API
    setTimeout(()=>{
      observer.next("world")
      //se indica cuando debe acabar la emisión
      observer.complete()
    },2000)
  })

  //version extendida de un observer
  const fullobserver = {
    next:         evt => displayLog(evt),
    error:        err => console.log("[ERR] - ",err),
    complete:     ()  => displayLog("[DONE]")
  }

  console.log("fullobserver",fullobserver)
  //subscribe es la referencia a la suscripción
  const subscribe = hello$.subscribe(fullobserver)
  //cada nueva suscripción implica una nueva ejecución del flujo de datos
  //esto es lo que se llama cold observable
  const subscribe2 = hello$.subscribe(fullobserver)

  //con unsubscribe solo se visualizaría hello, si bien se ha abierto otro hilo
  //con setTimeout no se espera a que este terimine
  subscribe.unsubscribe()

}//export default 
```
## [12. Función "from" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648846#questions)
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```
## []()
- 
```js
```