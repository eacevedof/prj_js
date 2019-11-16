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
## Sección 4: Operadores básicos
## [16. Operadores "mapTo", "map" y "filter" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13719034#questions)
- No se van a ver todos los que existen
- **mapTo**
  - emitir acciones en un form por ejemplo
  - Transforma la salida devolviendo siempre el mismo valor
  - Se podría usar para detectar los eventos en un menu. Cada vez que se hace click en una opción
- **map**
  - transforma el evento en otro objeto
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/d705649c553487128ad445b47fb808e8/image.png)
```js
//sandbox.js
import { displayLog } from './utils';
import {fromEvent} from "rxjs"
import {mapTo, map, filter} from "rxjs/operators"

export default () => {
  //div con esta img de fondo: 
  //url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wECDC4GIBN3ygAAALRJREFUeNrt3EERACAIRUF0LED/kETACp5xXwNm519Z3d0xoKqacEbsEBABASIgQAQEiIAAERABASIgQAQEiIAAERABASIgQAQEiIAAERABASIgQAQEiIAAERABASIgQAQEiIAAERABAaLHzpRPbJlpIQICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRED+6gIWHgqTCjDh1wAAAABJRU5ErkJggg==')
  const divgrid = document.getElementById('grid');

  //los observadores se aplican usando el metodo pipe
  //const clicks$ = fromEvent(divgrid,"click").pipe(mapTo("CLICK"))
  const clicks$ = fromEvent(divgrid,"click")
                    .pipe(
                      map(objevt => [objevt.offsetX, objevt.offsetY]),

                      map(aritem => [
                        //cada casilla tiene un ancho y alto de 50px
                        Math.floor(aritem[0]/50), 
                        Math.floor(aritem[1]/50)
                      ]),

                      //solo avisara al observer si cumple esta condicion
                      filter(aritem => (aritem[0] + aritem[1])%2!=0 )

                    )// pipe
  
  //offsetX y Y devuelve la posicion relativa dentro del grid
  //const subsclick = clicks$.subscribe(evt => console.log("X:",evt.offsetX,"Y:",evt.offsetY))
  
  const subsclick = clicks$.subscribe(arxy => {
    console.log("observer: arxy",arxy,"typeof:",typeof arxy)
    displayLog(arxy)
  })

}//export default
```

## [17. Operador "tap" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13719034#questions)
- RxJs te dice que hay que trabajar con funciones puras 
- pero que pasa si tienes que introducir efectos colaterales?
- que pasa cuando en base a un flujo de datos tienes que modificar algo que no tiene que ver con este
- Ejemplos
  - Quieres enviar datos a google analytics
  - cambiar el estado de la interfaz
  - enviar algo por consola
- Tap lo que recibe lo emite, pero puede ejecutar acciones ajenas al stream de datos
- creo que se puede usar para debuguear
```js
//sandbox.js
import { displayLog } from './utils';
import {fromEvent} from "rxjs"
import {map, tap} from "rxjs/operators"

export default () => {

  const divgrid = document.getElementById('grid');

  const clicks$ = fromEvent(divgrid,"click")
                    //pipe, espera recibir funciones seperadas por ,
                    .pipe(
                      //print
                      tap(objevt => console.log("fist tap:",objevt)),

                      map(objevt => [objevt.offsetX, objevt.offsetY]),
                      map(aritem => [
                        //cada casilla tiene un ancho y alto de 50px
                        Math.floor(aritem[0]/50), 
                        Math.floor(aritem[1]/50)
                      ]),

                      //print
                      tap(objevt => console.log("end tap:",objevt)),

                    )// pipe

  const subsclick = clicks$.subscribe(arxy => displayLog(arxy))

}//export default
```

## [18. Operadores "first", "take" y "takeWhile" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732716#questions)
- git stash
- git checkout dev/09-first-take-takewhile
- first es como un filter del primer elemento
- take indica cuantos eventos debe emitir el observable antes de cerrar el stream, en este caso 4 clicks
- takewhile en el momento que deja de cumplirse se detiene la emisión 
- destructuring del array
```js
//sandbox.js
import { displayLog } from './utils';
import {fromEvent} from "rxjs"
import {map,tap, first,take, takeWhile} from "rxjs/operators"

export default () => {

  const divgrid = document.getElementById('grid');

  const clicks$ = fromEvent(divgrid,"click")
                    .pipe(
                      map(objevt => [
                        Math.floor(objevt.offsetX/50), 
                        Math.floor(objevt.offsetY/50)
                      ]),
                      //tap(obj => console.log("pre obj",obj)),
                      //se le indica cuando se debe detectar que es first
                      //first(aritem => aritem[0] > 3)

                      //take(4),      //a los 4 clicks finaliza la emision
                      
                      //takeWhile(aritem => aritem[0]>3),
                      takeWhile( ([col,row]) => col > 3 ), //destructuring del array

                      //tap(obj => console.log("end obj",obj)),
                    )// pipe

  const subsclick = clicks$.subscribe(arxy => displayLog(arxy))

}//export default
```
## [19. Operadores "last", "takeLast" y "skip" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732722#questions)
- git stash; git checkout dev/10-last-takelast-skip
- last
```js
//sandbox.js
import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, last,tap } from 'rxjs/operators';

export default () => {
  const grid = document.getElementById('grid');
  const click$ = fromEvent(grid, 'click').pipe(
      map(val => [ 
          Math.floor(val.offsetX/50), 
          Math.floor(val.offsetY/50)
      ]),
      takeWhile( ([col, row]) => col > 3 ),
      tap(val => console.log("tap valid takewhile",val)),
      //emite el último valor que ha dejado pasar takewhile y no el que finaliza la emisión
      //es decir si hago click en una casilla fuera de rango takewhile cierra la emisión y
      //last recupera la ultima coord válida para pasarlo al observer
      last() 
  );
  const subscription = click$.subscribe(data => displayLog(data));
}
```
- takelast
- Va almacenando los eventos, se queda con los ultimos 3 y cuando se deja de emitir los pasa al observer
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/737x217/d3f65fef028238e1375cf513a29d0f16/image.png)
```js
  const click$ = fromEvent(grid, 'click').pipe(
      map(val => [ 
          Math.floor(val.offsetX/50), 
          Math.floor(val.offsetY/50)
      ]),
      takeWhile( ([col, row]) => col > 3 ),
      tap(val => console.log("tap valid takewhile",val)),
      //Va almacenando los eventos, se queda con los ultimos 3 y cuando se 
      //deja de emitir los pasa al observer
      takeLast(3) 
  );
```
- skip
```js
const click$ = fromEvent(grid, 'click').pipe(
  map(val => [ 
    Math.floor(val.offsetX/50), 
    Math.floor(val.offsetY/50)
  ]),
  tap(val => console.log("cell:",val)),
  //se salta los 5 primeros clicks y empieza a llamar al observer
  skip(5)
);
```
## [20. Operadores "reduce" y "scan" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732726#questions)
- git stash; git checkout dev/11-reduce-scan
- Aplicar una funcion a unos datos teniendo en cuenta el historico de esos datos
- Un stream que emite los productos que se añaden a un carrito de la compra
- Reduce: 
  - Emite un evento solo al finalizar el stream
  - Se de dedica a aplicar una función a cada evento que llega del stream de forma secuencial y solo devuelve el resultado cuando se cierra el stream.

```js
import { map, takeWhile, tap, reduce } from 'rxjs/operators';

export default () => {
  const grid = document.getElementById('grid');
  const click$ = fromEvent(grid, 'click').pipe(
    map(val => [ 
      Math.floor(val.offsetX/50), 
      Math.floor(val.offsetY/50)
    ]),
    //al hacer click en la col = 0 se detiene la emisión
    //y todo lo que ha ido almacenando reduce lo envia al observer
    takeWhile( ([col, row]) => col != 0 ),
    tap(val => console.log(`cell: [${val}]`)),
    reduce((ac,arxy)=>{
      return {
        clicks: ac.clicks + 1,
        cells: [...ac.cells, arxy] //uno dos arrays
      }
    },{clicks:0, cells:[]})
  );

  const subscription = click$
                        .subscribe(reduobj => displayLog(`${reduobj.clicks} clicks: ${JSON.stringify(reduobj.cells)}`));
}
```
- scan
  - Emite un evento en cada evento del stream
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/611x502/656669b13b8635d1f52bd5e383099c49/image.png)
```js
 const click$ = fromEvent(grid, 'click').pipe(
    map(val => [ 
      Math.floor(val.offsetX/50), 
      Math.floor(val.offsetY/50)
    ]),
    //al hacer click en la col = 0 se detiene la emisión
    //y todo lo que ha ido almacenando reduce lo envia al observer
    takeWhile( ([col, row]) => col != 0 ),
    tap(val => console.log(`cell: [${val}]`)),
    //una llamada al observer por cada evento del stream
    scan((ac,arxy)=>{
      return {
        clicks: ac.clicks + 1,
        cells: [...ac.cells, arxy] //uno dos arrays
      }
    },{clicks:0, cells:[]})
  );
```
## Sección 5: Utilidades
## [21. Operadores "startWith" y "endWith" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732732#questions)
- git stash; git checkout dev/12-startwith-endwidth;
```js
//sandbox.js
import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap,startWith,endWith } from 'rxjs/operators';

export default () => {
  const grid = document.getElementById('grid');
  const click$ = fromEvent(grid, 'click').pipe(
    //si esto se pone aqui el resto de operaciones matematicas daria undefined
    //startWith("grid dimensions: ","10x10"),
    map(val => [ 
        Math.floor(val.offsetX/50), 
        Math.floor(val.offsetY/50)
    ]),
    //al hacer click en col=0 finaliza el stream y emite endWith()
    takeWhile( ([col, row]) => col != 0 ),
    tap(val => console.log(`cell: [${val}]`)),
    //startwith fuerza la emision de estos eventos
    startWith("grid dimensions: ","10x10"),
    endWith("game finished","bye!")
  );

  const subscription = click$.subscribe(data => displayLog(data));
}
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