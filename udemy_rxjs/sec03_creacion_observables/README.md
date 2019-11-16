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
- git stash
  - archiva cualqueir cambio que tengas en el código, así evitas que pueda aparecer algún conflicto
- git checkout dev/03-from
- Promesas
- Ejemplo Enrique
```js
//create.js
import { displayLog } from './utils';
import {from } from "rxjs"

export default () => {
  const myArray = [1,2,3,4,5]
  const myString = "Hello World" 
  const oPromise = new Promise(fnresolve => setTimeout(()=>{
    console.info("fnresolve",fnresolve)
    fnresolve("Hello World")
  },2000))

  //const from$ = from(myArray)   //cada n es un evento
  //const from$ = from(myString)  //cada char es un evento

  //se crea un observable a partir de la estructura de una promesa
  //esta espera un callback fnresolve que es el observer [val => displayLog(val)]
  const from$ = from(oPromise)
  const subscription = from$.subscribe(val => displayLog(val))

}//export default
```
- Mi ejemplo
```js
//create.js
import { displayLog } from './utils';
import {from } from "rxjs"

export default () => {

  //en el resolve el observable inyectará observer.next
  const oPromise = new Promise(fnNext => setTimeout(()=>{
    console.info("fnNext",fnNext)
    fnNext("Hello World")
  },2000))

  const from$ = from(oPromise)

  const fullobs = {
    next: val => {
            console.log("val in next",val)
            displayLog(val)
          },
    error: err => console.log("err:",err),
    complete: () => console.log("completed")
  }
 
  const subscription = from$.subscribe(fullobs)

}//export default
```
## [13. Funciones "range" y "of" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648852#questions)
- git stash
- git checkout dev/04-of-and-range
- Funciones:
  - **of** te permite emitir una secuencia variable de objetos incluso de distinta tipologia
  - **range** para emitir una secuencia ordenada de valores
- **of**
```js
//create.js
import { displayLog } from './utils';
import {of, range} from "rxjs"

  //observables:
  const of2$ = of([1,2,3],
    "Hello World",
    {foo:"bar"},
    function sayHello(){
      return "Hello!!"
    }
  )
  
  //subscriptions:

  //se han emitido los valores de forma secuencial
  //const subs1 = of$.subscribe( data => displayLog(data))
  const subs2 = of2$.subscribe(data => displayLog(data)) 
```
- **range**
```js
const range$ = range(3,10) //crea valores de 3...12
const subs3 = range$.subscribe( data => displayLog(data))
```
## [14. Funciones "interval" y "time" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13718904#questions)
- git stash
- git checkout dev/05-interval-and-timer
```js
//create.js
import { displayLog } from './utils';
import {interval,timer} from "rxjs"

export default () => {
  //si uso interval para lanzar un evento infinto
  //lo detengo con timer() que es otro observable

  const interval$ = interval(500)
  const subsinterval = interval$.subscribe(data => displayLog(data))

  //timer devuelve otro observable
  //este emitirá un next cada 3 segundos, en este caso el observer es una SUSCRIPCIÓN ^^
  timer(3000).subscribe(()=>{subsinterval.unsubscribe()})
  
  //timer es más poderosa que el setTimeout tradicional
  //puedes crear intervalos a partir del primer evento, creas un primer evento concierto retraso
  //y apartir de entonces un intervalo
  const timer$ = timer(4000,100)
  const substimer = timer$.subscribe(data=>displayLog(`2 - ${data}`))
  timer(6000).subscribe(()=>substimer.unsubscribe())

}//export default
```
## [15. Función "fromEvent" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13719024#questions)
- Asocia un observable a un eventtarget concreto para emitir los eventos generados por este
- puedes canalizar determinados eventos del dom o el eventemitter de node
- Te permite reaccionar a eventos de la interfaz
- Te permite crear un observable a partir de una tipología de eventos concreta de cualquier **eventtarget**
```js
//create.js
import { displayLog } from './utils';
import {fromEvent} from "rxjs"

export default () => {
  //me voy a suscribir a los eventos del boton
  const idboton = "action-btn"
  const eboton = document.getElementById(idboton)
  const fromevent$ = fromEvent(eboton,"click")

  const subsbot = fromevent$.subscribe(evt => {
    displayLog(`click event at pos (${evt.x}, ${evt.y})`)
  })

  fromEvent(document,"mousemove").subscribe(evt => {
    console.log(evt)
  })

}//export default
```
## [17. Operador "tap" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13719034#questions)
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