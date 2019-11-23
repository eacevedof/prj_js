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
## [22. Operadores "distinct" y "distinctUntilChanged" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732736#questions)
- git stash; git checkout dev/13-distinct-distinctuntilchanged;
- distinct 
  - comprueba el valor a emitir, si ya se ha emitido lo bloquea para que no se emita
  - el valor que comprueba debe ser string o int o float (tipos simples)
  - si es un objeto y/o array lo dejaria pasar
- distintUntilChanged
  - comprueba un valor previo y uno actual para ver si son distintos
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/688x318/94573dbe384b19632432f151995cad77/image.png)
```js
//sandbox.js
import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, distinct,distinctUntilChanged } from 'rxjs/operators';

export default () => {
  const grid = document.getElementById('grid');
  const click$ = fromEvent(grid, 'click').pipe(
    map(val => [ 
      Math.floor(val.offsetX/50), 
      Math.floor(val.offsetY/50)
    ]),
    takeWhile( ([col, row]) => col != 0 ),
    tap(arxy => console.log(`cell: [${arxy}]`)),
    //map(([col, row]) => col+row),
    //tap(val => console.log('sum of col + row is:', val)),

    //distinct()  //solo tipos simples
    //distinct(([col, row]) => `${col} - ${row}`),  //tipos copuestos

    //bloquear clicks consecutivos sobre la misma casilla
    //cell1 y cell2 son arxy formado por map
    distinctUntilChanged((cell1, cell2)=>
                  (cell1[0] == cell2[0]) &&
                  (cell1[1] == cell2[1]))

  );

  const subscription = click$.subscribe(data => displayLog(data));

}
```
## [23. Operador "pairwise" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732738#questions)
- git stash; git checkout dev/14-pairwise
- Entendiendo el scroll
  - es el punto superior de la parte visible en la ventana del navegador
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1145x609/f1656d2e3db06311f5cbbbc9e532e5ee/image.png)
- No se porque separa en dos streams la lógica
- el return de un observable es otro observable? es como una concatenación de observables?
```js
//sandbox.js
import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, pairwise } from 'rxjs/operators';

export default () => {
  const edivprogress = document.getElementById('progress-bar');
  const objdom = document.documentElement;
  //console.log("objdom: ",objdom)

  //observer
  const set_divwidth = percentage => edivprogress.style.width = `${percentage}%`;
  
  //const click$ = fromEvent(document,"click")
  //click$.subscribe(ev => console.log("evt",ev))

  //observable that returns scroll (from top) on scroll events
  const scrollEv$ = fromEvent(document, 'scroll').pipe(
    //scrollTop es la parte superior oculta por bajar el scroll
    map(() => objdom.scrollTop),
    tap(iscrollpos => console.log("[scroll]: ", iscrollpos)),
    
    //para determinar la dirección del scroll (arriba o abajo) se necesita saber 
    //el valor actual y el anterior, esta tupla la provee el operador pairwaise
    pairwise(),     //devuelve un array con dos valores, en este caso enteros
    
    tap(([iprev, icurr])=>{ //se explota ese par en prev y curr
      updateDisplay(icurr > iprev ? "DESC": "ASC")
    }),

    map( ([iprev,icurr]) => icurr),

    //tiene el mismo efecto inclyuendo esta logica aqui como en otro observable
    // map(iscrolltop => {
    //   //scrollheight: 4138, clientheight:577 => docheight:3561
    //   const docHeight = objdom.scrollHeight - objdom.clientHeight;
    //   return (iscrolltop / docHeight) * 100;
    // })
  );

  //scrollEv$ devuelve la posicion del scroll
  //esto es como una concatenacion de observables. 
  //El observer solo se suscribe al scrollProgress
  const scrollProgress$ = scrollEv$.pipe(
    map(iscrolltop => {
        //scrollheight: 4138, clientheight:577 => docheight:3561 (docheight es la zona desplazable)
        const docHeight = objdom.scrollHeight - objdom.clientHeight;
        return (iscrolltop / docHeight) * 100;
    })
  )

  //subscribe to scroll progress to paint a progress bar
  const subscription = scrollProgress$.subscribe(set_divwidth);
  //const subscribe2 = scrollEv$.subscribe(set_divwidth);
}
```
## [24. Hot & Cold Observables: Operador "share" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732742#questions/8651832)
- git stash; git checkout dev/15-share
- Permite suscripciones paralelas
- Si deseo mostrar el valor del porcentaje en la esquina sup derecha
- Si de primeras creamos una segunda suscripcion se repetirian los tap [scroll]
- Esto es porque se crean dos instancias del flujo de datos 
- Cada vez que se realiza una suscripción se crea una nueva instancia del flujo de datos **cold observables**
- Esto penaliza el rendimiento de la app
- Para evitar esto (es decir solo usar una instancia) tenemos el operador **share**
- >Share es como el singleton de los observables
- **Sin share**
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/703x306/5c316da624a0aba5712d9872b77b4ae8/image.png)
- **con share**
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/520x291/acb07dfd662898e5707467242ed3cc07/image.png)
```js
//sandbox.js
import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';

export default () => {
const progressBar = document.getElementById('progress-bar');
const docElement = document.documentElement;

  //function to update progress bar width on view
  const updateProgressBar = (percentage) => {
    progressBar.style.width = `${percentage}%`;
  }

  //observable that returns scroll (from top) on scroll events
  const scroll$ = fromEvent(document, 'scroll').pipe(
    map(() => docElement.scrollTop),
    tap(evt => console.log("[scroll]: ", evt))
  );

  //observable that returns the amount of page scroll progress
  const scrollProgress$ = scroll$.pipe(
    map(evt => {
        const docHeight = docElement.scrollHeight - docElement.clientHeight;
        return (evt / docHeight) * 100;
    }),
    //share es como un singleton del observable
    share(), //convierte un cold observable en un hot observable
  )

  //subscribe to scroll progress to paint a progress bar
  const subscription = scrollProgress$.subscribe(updateProgressBar);
  const subs2  = scrollProgress$.subscribe( val => updateDisplay(`${Math.floor(val)} %`))
}
```
## [25. Subject, BehaviorSubject y los Hot Observables](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732744#questions/8651832)
- git stash; git checkout dev/16-subject;
- Subject
  - Permite hacer multicast
  - Es un hot observable
  - Es un obsrvador
  - Actua como un distribuidor
  - Emite a todos sus observadores cualquier evento que recibe como observer
- Vamos a emular el **share** con **subject**, ya que share internamente usa **subject**
- BehaviorSubject
  - Es un subject con estado
  - Tiene un estado inicial
  - En cada evento guarda el ultimo estado
  - Este estado (valor inicial) se puede consultar en cualquier momento
```js
//sandbox.js
import { updateDisplay } from './utils';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';

export default () => {
  const progressBar = document.getElementById('progress-bar');
  const docElement = document.documentElement;

  //function to update progress bar width on view
  const updateProgressBar = (percentage) => {
    progressBar.style.width = `${percentage}%`;
  }

  //observable that returns scroll (from top) on scroll events
  const scroll$ = fromEvent(document, 'scroll').pipe(
    map(() => docElement.scrollTop),
    tap(evt => console.log("[scroll]: ", evt))
  );

  //observable that returns the amount of page scroll progress
  const scrollProgress$ = scroll$.pipe(
    map(evt => {
        const docHeight = docElement.scrollHeight - docElement.clientHeight;
        return (evt / docHeight) * 100;
    }),
    //share() // usa internamente la clase subject
  )

  //observer y observable
  //const scrollSubject$ = new Subject()
  const scrollSubject$ = new BehaviorSubject(0)
  scrollProgress$.subscribe(scrollSubject$)

  //scrollSubject ahora gestiona las dos sucripciones
  //aqui hace una funcion de observable singleton
  const subscription = scrollSubject$.subscribe(updateProgressBar);
  const subscription2 = scrollSubject$.subscribe(
    val => updateDisplay(`${ Math.floor(val) } %`)
  );

  //no sabia que la pagina guarda en memoria el scroll
  //console.log("se ejecuta subject.next se ejeucta en la carga de la pagina")
  //un subject puede emitir sus propios eventos
  //scrollSubject$.next(0)

  console.log("scroll initial state: ", scrollSubject$.value)
}
```
## Sección 6: Operadores temporales
## [26. Operadores "sampleTime", "throttleTime" y "auditTime" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732748#questions)
- Ejemplo sin ningún filtro:
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/797x515/d402d1cbe55f09188c26591235fc416d/image.png)
- En el ejemplo de la barra de scroll probablemente sean excesivas las veces que se llama al evento scroll de modo que perjudica el rendimiento de la app.
- En este caso quiza interese solo escuchar el evento cada x segundoss
- **sampleTime**
  - emite el valor más reciente de un flujo de datos cada cierto tiempo siempre y cuando el flujo de datos haya emitido algún valor en el intervalo
- **auditTime**
  - Detecta un evento y desde entonces crea una ventana temporal del tamaño indicado y cuando finaliza es cuando emite la muestra más reciente y se queda a la espera.
  - Es similar pero no es lo mismo, audiTime agrega un retraso
- **throttleTime**
  - Cuando este operador detecta un evento, lo emite y acto seguido deja de escuchar durante la ventana indicada.
  - Cuando acaba la ventana, se vuelve a quedar a la espera para el siguiente evento

- **sampleTime**
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/808x286/f9b0888ddd45591d1616545fd3b516a7/image.png)
  ```js
  //sandbox.js
  import { updateDisplay } from './utils';
  import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
  import { map, tap,sampleTime, share } from 'rxjs/operators';

  export default () => {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    let iEmitted = 0
    let iHandled = 0

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
      progressBar.style.width = `${percentage}% `;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
      tap(evt => iEmitted++),
      //tap(evt => console.log("[scroll event]")),
      sampleTime(50), //deja pasar los eventos, "como mínimo", cada 50 milisegundos
      map(() => docElement.scrollTop),
      tap(evt => console.log("[scroll CON sampleTime(50)]: ", evt)),
      tap(evt => iHandled++),
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
      map(evt => {
        const docHeight = docElement.scrollHeight - docElement.clientHeight;
        return (evt / docHeight) * 100;
      }),
      //share() // usa internamente la clase subject
    )

    //observer y observable
    //const scrollSubject$ = new Subject()
    const scrollSubject$ = new BehaviorSubject(0)
    scrollProgress$.subscribe(scrollSubject$)

    //scrollSubject ahora gestiona las dos sucripciones
    //aqui hace una funcion de observable singleton 
    //(no abre otro hilo con el segundo subscribe)
    const subscription = scrollSubject$.subscribe(updateProgressBar);
    const subscription2 = scrollSubject$.subscribe(
      val => updateDisplay(`
        ${ Math.floor(val) } % 
        ev emitted: ${iEmitted}
        ev notfiltered: ${iHandled}
      `)
    );

    //no sabia que la pagina guarda en memoria el scroll
    //console.log("se ejecuta subject.next se ejeucta en la carga de la pagina")
    //un subject puede emitir sus propios eventos
    //scrollSubject$.next(0)
    console.log("scroll initial state: ", scrollSubject$.value)
  }
  ```
- **auditTime**
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/689x292/f4577186fbea07036509de4e0ce47fae/image.png)
  ```js
  //sandbox.js
  import { updateDisplay } from './utils';
  import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
  import { map, tap, auditTime } from 'rxjs/operators';

  export default () => {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    let iEmitted = 0
    let iHandled = 0

    const updateProgressBar = (percentage) => {
      progressBar.style.width = `${percentage}% `;
    }

    const scroll$ = fromEvent(document, 'scroll').pipe(
      tap(evt => iEmitted++),
      auditTime(50), //ventana de 50 milisegundos despues de cada evento
      map(() => docElement.scrollTop),
      tap(evt => console.log("[scroll CON auditTime(50)]: ", evt)),
      tap(evt => iHandled++),
    );

    const scrollProgress$ = scroll$.pipe(
      map(evt => {
          const docHeight = docElement.scrollHeight - docElement.clientHeight;
          return (evt / docHeight) * 100;
      }),
    )

    //subj as observer
    const scrollSubject$ = new BehaviorSubject(0)
    scrollProgress$.subscribe(scrollSubject$)

    //subj as observable
    const subscription = scrollSubject$.subscribe(updateProgressBar);
    const subscription2 = scrollSubject$.subscribe(
      val => updateDisplay(`
        ${ Math.floor(val) } % 
        ev emitted: ${iEmitted}
        ev handled: ${iHandled}
      `)
    );

    //subj as observable
    //scrollSubject$.next(0) //es como el trigger
    console.log("scroll initial state: ", scrollSubject$.value)
  }
  ```
- **throttleTime**
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/810x559/07cd9936fcf5643417bdd916049827d7/image.png)
  - Se llega al final de la pag pero no se completa la barra
  - Si ejecuto el scroll muy rápido (con el ratón) no le doy tiempo a que vuelva a escuchar con lo cual puede acabar (llegar al fin de pag) emitiendo eventos sin ser escuchado
  - Este operador se usa cuando se desea hacer una salvaguarda. 
  - Por ejemplo cuando no se quiere tomar en cuenta el dobleclick mientras se escucha eventos en un botón
  - No es una buena idea usar este operador si deseas quedarte con el último valor emitido
  ```js
   //sandbox.js
  import { updateDisplay } from './utils';
  import { fromEvent, BehaviorSubject } from 'rxjs';
  import { map, tap, throttleTime } from 'rxjs/operators';

  export default () => {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    let iEmitted = 0
    let iHandled = 0

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
      progressBar.style.width = `${percentage}% `;
    }

    //emite scrolltop
    const scroll$ = fromEvent(document, 'scroll').pipe(
      tap(evt => {iEmitted++; console.log("ev emitted")}),
      throttleTime(50),//deja de escuchar eventos
      map(() => docElement.scrollTop),
      tap(evt => console.log("[scroll CON throttleTime(50)]: ", evt)),
      tap(evt => iHandled++,console.log("ev handled")),
    );

    //emite el progreso
    const scrollProgress$ = scroll$.pipe(
      map(evt => {
          const docHeight = docElement.scrollHeight - docElement.clientHeight;
          return (evt / docHeight) * 100;
      }),
      //share() // usa internamente la clase subject
    )

    //subj as observer. Escucha el progreso
    const scrollSubject$ = new BehaviorSubject(0)
    scrollProgress$.subscribe(scrollSubject$)

    //subj as observable. broadcast del progreso
    const subscription = scrollSubject$.subscribe(updateProgressBar);
    const subscription2 = scrollSubject$.subscribe(
      val => updateDisplay(`
        ${ Math.floor(val) } % 
        ev emitted: ${iEmitted}
        ev handled: ${iHandled}
      `)
    );

    console.log("scrollSubject$.value ", scrollSubject$.value)
  }
  ```

## [27. Operadores "delay" y "buffertime" de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732752#questions)
- git stash; git checkout dev/18-delay-buffer-time
- **delay**
  - introduce un retraso entre el origen de los eventos y el flujo de salida observable
  - Da un efecto de animación. Es como si almacenara en ese tiempo todos los eventos para que despues los procese todos jungos
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/619x530/befaba15d6f7bbd66fdb581cb176ecbf/image.png)
  ```js
  //sandbox.js
  import { fromEvent } from 'rxjs';
  import { map, tap, delay } from 'rxjs/operators';

  export default () => {
    let iEmitted = 0
    let iHandled = 0

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    const updateProgressBar = (percentage) => {
      progressBar.style.width = `${percentage}%`;
    }

    const scroll$ = fromEvent(document, 'scroll').pipe(
      tap(evt => {iEmitted++; console.log("ev emitted:",iEmitted)}),
      map(() => docElement.scrollTop),
      //tap(evt => console.log("[scrollTop]: ", evt)),
    );

    const scrollProgress$ = scroll$.pipe(
      map(evt => {
          const docHeight = docElement.scrollHeight - docElement.clientHeight;
          return (evt / docHeight) * 100;
      }),
      delay(500), //500 ms  
      tap(evt => {iHandled++; console.log("after delay ev handled:",iHandled)}),
    )

    const subscription = scrollProgress$.subscribe(updateProgressBar);
  }
  ```
- **bufferTime**
  - Acumula muestras durante un tiempo y luego las emite juntas, en un array como si fuera un único evento
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/544x236/526f7cb79da097e79d2e620a6fa401cb/image.png)
  ```js
  import { fromEvent } from 'rxjs';
  import { map, tap, delay, bufferTime } from 'rxjs/operators';

  export default () => {
    let iEmitted = 0
    let iHandled = 0

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    const updateProgressBar = (percentage) => {
      console.log("iHandled",iHandled)
      //trata el agumento que envia bufferTime
      if(Array.isArray(percentage))
        percentage = percentage.pop()
      progressBar.style.width = `${percentage}%`;
    }

    const scroll$ = fromEvent(document, 'scroll').pipe(
        tap(evt => {iEmitted++; console.log("ev emitted:",iEmitted)}),
        map(() => docElement.scrollTop),
    );

    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }),
        //aqui buffer haria un efecto map devolviendo un array de valores algo que
        //updateProgressBar no entiede ya que espera un entero (he refactorizado para que acete array)
        //cada (1000 ms) segundo empieza a agrupar durante 500 ms 
        //con buffertime se lanza una escucha constante no solo con cada scroll. Si se hace un scroll
        //lo almacena en el array
        //es como si fuera un sniffer
        bufferTime(500,1000), 
        
        tap(evt => {iHandled++; console.log("evt",evt)}),
    )

    const subscription = scrollProgress$.subscribe(updateProgressBar);
  }  
  ```
## [28. Operador debounceTime de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732754#questions)
- git stash; git checkout dev/19-debouncetime;
- **debounceTime**
  - Si tenemos un searchbox. Tiene sentido hacer una petición con cada press de una tecla?
  - No, seria mejor esperar un determinado tiempo. Este delay es debounceTime
  - debounceTime se diferencia de auditTime en que el primero reinicia la espera con cada nuevo valor recibido
  - Para que debounceTime emita un evento es imprescindible que el flujo de eventos deje de emitir datos durante el tiempo prefijado
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/453b4845248be41eccac335739b52c50/image.png)
```js
//sandbox.js
import { updateDisplay, displayLog } from './utils';
import {fromEvent} from "rxjs"
import {tap,map, debounceTime} from "rxjs/operators"

export default () => {
  const inputBox = document.getElementById('input-box');
  const inputBox$ = fromEvent(inputBox,"input")
                  //no es lo mismo ejecutar el pipe aqui que despues de definir la variable inputBox$
                  //asi: inputBox$.pipe(...)
                      .pipe(
                        //cada objeto evento es una representación de una letra
                        tap(evt => console.log("inievt - evt",evt)),
                        //en el momento que se deja de escribir espera 300 ms si no hay ningún
                        //otro evento entonces envia todo el stream
                        //para un searchbox esto tiene sentido, tener un periodo de guarda
                        debounceTime(300),
                        map(event => event.target.value),
                        tap(str => console.log("endevt - str",str)),
                      )
  inputBox$.subscribe(displayLog)
}
```
## Sección 7: Combinación de Observables
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