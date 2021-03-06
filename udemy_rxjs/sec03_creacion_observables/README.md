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
## [29. Funciones zip y merge de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13732960#questions)
- git stash; git checkout dev/20-zip-merge;
- **zip**
  - combina varios flujos de datos en un único observable
  - entre el mouse-start y mouse-end
  - se combinaran estos dos eventos en uno para obtener coord orig y coord fin
  - es como un **AND** de eventos
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1126x327/8e554963e5612aac3f674862f195e048/image.png)
  ```js
  //sandbox.js
  import { updateDisplay, displayLog } from './utils';
  import { fromEvent,zip} from 'rxjs';
  import { map,tap } from 'rxjs/operators';

  export default () => {

    const canvas = document.getElementById('drawboard');
    const ctx = canvas.getContext('2d');

    const drawLine = (initCoords, endCoords) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(initCoords.x, initCoords.y);
      ctx.lineTo(endCoords.x, endCoords.y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }

    const getLocalClickCoords = (event, parent) =>{
      return {
        x: event.clientX - parent.offsetLeft,
        y: event.clientY - parent.offsetTop,
      }
    }

    //emite coords (ini) on mousedown
    const mouseStart$ = fromEvent(canvas, 'mousedown').pipe(
      map(event => {
        return {
            label: 'start',
            coords: getLocalClickCoords(event, canvas)
        }
      })
    );

    //emite coords (end) on mouseup
    const mouseEnd$ = fromEvent(canvas, 'mouseup').pipe(
    map(event => {
      return {
        label: 'end',
        coords: getLocalClickCoords(event, canvas)
      }
    }));

    /** observable from canvas mouse move events */
    const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
    map(event => {
      return {
        label: 'drawing',
        coords: getLocalClickCoords(event, canvas)
      }
    }));        

    //crea un evento unificado que emite inicio y fin, es decir se tienen que dar
    //los dos eventos para que emita el evt comprimido
    const drawLine$ = zip(mouseStart$,mouseEnd$)
                        .pipe(
                          //esto ^^ tap le inyecta el parámetro a console.log(evt)
                          tap(console.log),
                          map(([start,end]) => {
                            return {
                              origin: start.coords,
                              end: end.coords,
                            }
                          })
                        )

    //drawLine usa el contexto2d para realizar el trazo con orig y destino
    drawLine$.subscribe(data => drawLine(data.origin, data.end))
  }  
  ```
- **merge**
  - No espera tener datos de todos los flujos de entrada
  - Tampoco devuelve un array
  - Actua como un hub, si alguno de sus flujos de entrada emite un evento entonces lo retransmite
  - Es como un **OR** de eventos
  - Para pintar una linea mientras se estan ejecutando los eventos necesito una variable donde vaya guardando las coord por donde esta pasando el puntero (con scan por ejemplo)
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1120x426/1931f994110d873364ded993a3f1a75f/image.png)
  ```js
  //sandbox.js
  import { updateDisplay, displayLog } from './utils';
  import { fromEvent,zip,merge} from 'rxjs';
  import { map,tap, scan,filter,distinctUntilChanged } from 'rxjs/operators';

  export default () => {

    const canvas = document.getElementById('drawboard');
    const ctx = canvas.getContext('2d');

    const drawLine = (initCoords, endCoords) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(initCoords.x, initCoords.y);
      ctx.lineTo(endCoords.x, endCoords.y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }

    const getLocalClickCoords = (event, parent) =>{
      return {
        x: event.clientX - parent.offsetLeft,
        y: event.clientY - parent.offsetTop,
      }
    }

    //emite coords (ini) on mousedown
    const mouseStart$ = fromEvent(canvas, 'mousedown').pipe(
      map(event => {
        return {
            label: 'start',
            coords: getLocalClickCoords(event, canvas)
        }
      })
    );

    //emite coords (end) on mouseup
    const mouseEnd$ = fromEvent(canvas, 'mouseup').pipe(
    map(event => {
      return {
        label: 'end',
        coords: getLocalClickCoords(event, canvas)
      }
    }));

    /** observable from canvas mouse move events */
    const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
    map(event => {
      return {
        label: 'drawing',
        coords: getLocalClickCoords(event, canvas)
      }
    }));        

    const computeDrawState = (prev,evt)=>{
      switch(prev.label){
        case "init":
        case "end": //mouseup
          //si es mouseclick "cambio" origin y "mantengo" label y coords
          if(evt.label == "start"){
            return {origin:evt.coords, ...evt}
          }
          break
        case "start": //mouseclick
        case "drawing"://mousemove
          return {origin:prev.origin,...evt}
      }
      return prev;
    }

    //si cualquier moseEvent emite, se ejecuta pipe
    const drawLine$ = merge(mouseStart$,mouseMove$,mouseEnd$)
                        .pipe(
                          //reduce
                          scan(computeDrawState,{label:"init"}),
                          //solo se emiten los que tienen data.origin y coords
                          filter(data => data.origin && data.coords),
                          //excluye los repetidos
                          distinctUntilChanged(),
                          //esto ^^ tap le inyecta el parámetro a console.log(evt)
                          tap(console.log),
                        )

    //drawLine usa el contexto2d para realizar el trazo con orig y destino
    drawLine$.subscribe(data => drawLine(data.origin, data.coords))
    //drawLine$.subscribe()
  }  
  ```
## [30. Operadores concat y forkJoin de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13760204#questions)
- git stash; git checkout dev/21-concat-forkjoin
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/782x509/2fd6d52d64d20e490001eaaf15ff9f16/image.png)
```js
//api.js
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export class api{
  static getComment(id){
    return timer(Math.random()*1000).pipe(
      mapTo({id:id, comment:`comment number ${id}`})
    );
  }
}

//sandbox.js (merge)
import { updateDisplay, displayLog } from "./utils";
import { api } from "./api";
import { merge, fromEvent } from "rxjs";
import { tap,map, endWith } from "rxjs/operators";

export default () => {
  const button = document.getElementById("btn");
  
  const getComments = () =>{
    //getComment(id) 
    //es un builder de observables
    //devuelve: timer(Math.random()*1000).pipe(..), que es un emisor random
    const comment1$ = api.getComment(1);
    const comment2$ = api.getComment(2);
    const comment3$ = api.getComment(3);
    const comment4$ = api.getComment(4);
    //observables
    console.log("getComents:","comment1$:",comment1$,"comment4$:",comment4$)

    //como las peticiones tienen un orden aleatorio y merge emitiria un evento
    //en ese orden, pueden llegar desordenadas
    //para forzar siempre un orden en lugar de merge se usa concat
    merge(comment1$, comment2$, comment3$, comment4$).pipe(
      tap(evt => console.log("evt ini",evt)),//evt es el obj comment
      map(({id, comment}) => `#${id} - ${comment}`),
      endWith("--------//--------"),//finaliza la emisión de eventos
      tap(evt => console.log("evt end",evt)) //evt es el str comment o ---//---
    ).subscribe(data =>{
      displayLog(data);
    })
  }//getComments()

  fromEvent(button, "click").subscribe(getComments);
}//export default
```
- **concat**
  - Ejecuta la suscripción en un orden preconfigurado, el orden de sus parámetros
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/694x399/113ae005bcb84f53309a451d70d78bde/image.png)  
  ```js
  //sandbox.js (concat)
  import { updateDisplay, displayLog } from "./utils";
  import { api } from "./api";
  import { fromEvent,concat } from "rxjs";
  import { tap, map, endWith } from "rxjs/operators";

  export default () => {
    const button = document.getElementById("btn");
    
    const getComments = () =>{
      //obtengo los observables
      const comment1$ = api.getComment(1);
      const comment2$ = api.getComment(2);
      const comment3$ = api.getComment(3);
      const comment4$ = api.getComment(4);

      //se usa igual que merge pero ahora aplicará un orden, 
      //va ejecutando suscripciones en el orden configurado (emisor1$,emisor2$,...,emisorN$)
      concat(comment1$, comment2$, comment3$, comment4$).pipe(
        tap(evt => console.log("evt ini",evt)),//evt es el obj comment
        map(({id, comment}) => `#${id} - ${comment}`),
        endWith("--------//--------")//finaliza la emisión de eventos
        tap(evt => console.log("evt end",evt)) //evt es el str comment o ---//---
      ).subscribe(data =>{
        displayLog(data);
      })
    }//getComments()

    fromEvent(button,"click").subscribe(getComments);
  }//export default  
  ```
- **forkJoin**
  - Recibe varios observables de entrada, espera que se completen todos y entonces los emite un array ordenado con el último valor de cada flujo de entrada
  - Tarda un poco más en la emsión porque tiene que agrupar los eventos para formar el array
  - ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/968x240/04f516a18c276fbf7c64a79665eaff5f/image.png)
  ```js
  //sandbox.js (forkJoin)
  import { updateDisplay, displayLog } from "./utils";
  import { api } from "./api";
  import { fromEvent,forkJoin } from "rxjs";
  import { tap,map, endWith } from "rxjs/operators";

  export default () => {
    const button = document.getElementById("btn");
    
    const getComments = () =>{
      //obtengo los observables
      const comment1$ = api.getComment(1);
      const comment2$ = api.getComment(2);
      const comment3$ = api.getComment(3);
      const comment4$ = api.getComment(4);

      //forkjoin devuelve un array con el último valor de cada evento emitido por 
      //cada observable
      forkJoin(comment1$, comment2$, comment3$, comment4$).pipe(
        tap(evt => console.log("evt ini",evt)),//evt es el array de objetos comment
        map(JSON.stringify),//aplicará la función stringify a cada uno de los eventos
        endWith("--------//--------"), //emite un string y finaliza la emision
        tap(evt => console.log("evt end",evt)) //es el json en string y el endwith
      ).subscribe(data =>{
        displayLog(data);
      })
    }//getComments()

    fromEvent(button,"click").subscribe(getComments);
    console.log("forkJoin")
  }//export default   
  ```
## [31. Operadores combineLatest y withLatestFrom de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13760212#questions)
- git stash; git checkout dev/22-combinelatest-withlatestfrom
  - **combineLatest**
  - Devuelve un array con el último valor de cada evento
  - En la carga del formulario combineLatest empieza a emitir cuando todos los observables han emitido algo
  - En este caso, van emitiendo el contenido de la caja esperando 400 ms despues de pulsar la última tecla
  - Este operador puede usarse para validación
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/3460c652dc265536d3136db96d65aa20/image.png)
  ```js
  //sandbox.js (combineLatest)
  import { updateDisplay, displayLog } from './utils';
  import { fromEvent,combineLatest } from 'rxjs';
  import { tap, map, debounceTime } from 'rxjs/operators';

  export default () => {
    console.log("31. Operadores combineLatest y withLatestFrom de RxJS")

    const form = document.getElementById('form');

    const formName$ = fromEvent(form.name,'input').pipe(
      tap(evt => console.log("formName ini",evt)),
      debounceTime(400),//tiempo de salvaguarda 400 ms
      map(evt => evt.target.value)
    );

    const formEmail$ = fromEvent(form.email,'input').pipe(
      tap(evt => console.log("formEmail ini",evt)),
      debounceTime(400),//tiempo de salvaguarda 400 ms
      map(evt => evt.target.value)
    );

    const formNumber$ = fromEvent(form.phone,'input').pipe(
      tap(evt => console.log("formNumber ini",evt)),
      debounceTime(400),//tiempo de salvaguarda 400 ms
      map(evt => evt.target.value) //devuelve el string
    );

    const submitButton$ = fromEvent(form.btn,'click');
    const formData$ = combineLatest(formName$, formEmail$, formNumber$);
    formData$.subscribe(displayLog)

  }//export default   
  ```
  - **withLatestFrom**
  - Más alla de validación puede que interese recibir un evento con estos datos (los inputs) solo cuando se pulse en un botón
  - Solo emite datos cuando su stream de origen lo emite
  - Este operador acumula el resultado de varios eventos 
  - **Interesante ejemplo del spread operator**
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/92024e4dd07c2665189f13b9a4f7b08e/image.png)
  ```js  
  //sandbox.js (withLatestFrom)
  import { updateDisplay, displayLog } from './utils';
  import { fromEvent } from 'rxjs';
  import { tap, map, debounceTime, withLatestFrom } from 'rxjs/operators';

  export default () => {
    console.log("31. Operadores combineLatest y withLatestFrom de RxJS")

    const form = document.getElementById('form');

    const formName$ = fromEvent(form.name,'input').pipe(
      tap(evt => console.log("formName ini",evt)),
      debounceTime(400),//tiempo de salvaguarda 400 ms
      map(evt => evt.target.value)
    );

    const formEmail$ = fromEvent(form.email,'input').pipe(
      tap(evt => console.log("formEmail ini",evt)),
      debounceTime(400),//tiempo de salvaguarda 400 ms
      map(evt => evt.target.value)
    );

    const formNumber$ = fromEvent(form.phone,'input').pipe(
      tap(evt => console.log("formNumber ini",evt)),
      debounceTime(400),//tiempo de salvaguarda 400 ms
      map(evt => evt.target.value) //devuelve el string
    );

    const submitButton$ = fromEvent(form.btn,'click');
    const formData$ = submitButton$.pipe(
      tap(evt => console.log("ini evt",evt)),//evt es MouseEvent 
      withLatestFrom(formName$, formEmail$, formNumber$),
      tap(evt => console.log("after with evt",evt)),//evt es: [MouseEvent, "a", "b", "c"]
      map(data => {
        //se explota data: [MouseEvent, "a", "b", "c"]
        //evclick = MouseEvent, el resto se guarda en inputvals, es decir "a","b","c"
        //ocurre esto: evclick = data[0], inputvals.push(data[1]),..,inputvals.push(data[n])
        const [evclick, ...inputvals] = data
        console.log("inputvals",inputvals)
        return inputvals
      }),
      tap(evt => console.log("end evt",evt))
    )
    formData$.subscribe(displayLog)

  }//export default (withLatestFrom)  
  ```
## Sección 8: High Order Observables (HOO)
## [32. Introducción a los HOO, mergeAll y mergeMap](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13760216#questions)
- git stash; git checkout dev/23-hoo-mergeall-mergemap;
- Se puede dar el caso que los eventos que emite un observable puedan ser observables a los que me interese suscribirme
- Esto se conoce como **High Order Observables** un evento observable :), observables que emiten observables
- Por ejemplo **concat y forkJoin** (manera sin HOO), nos suscribiamos al botón y dentro de getComments nos suscribiamos a los observables generados por la apirest
- Simplificaremos el ejemplo 
- Tenemos un observable "button.click" que emite un observable api1$ un HOO
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/21485aa51870cd4548e7eafbd4ec6a07/image.png)
```js
//sandbox.js 
import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { concat, fromEvent, observable } from 'rxjs';
import { tap,map, endWith } from 'rxjs/operators';

export default () => {
  console.log("32. Introducción a los HOO")
  const button = document.getElementById('btn');

  const api1$ = api.getComment(1).pipe(
    tap(evt => console.log("api1$ evt",evt)),
    map(JSON.stringify)
  )

  fromEvent(button, 'click')
    .pipe(
      tap(evt => console.log("but.click evt ini",evt)), //evt es MouseEvent
      map(evt => api1$), //no esta recibiendo ninguna suscripcion
      tap(evt => console.log("but.click evt end",evt)), //evt es observable
    )
    .subscribe(displayLog)
    //.subscribe(()=>{
      //tengo un observable que devuelve un evento y me he suscrito a el
      //cada vez que hago click creo una nueva suscripción
      //esta arquitectura me obliga a anidar suscripciones lo que acopla el código
      //lo ideal sería que el primer observable transformará su evento en el segundo teniendo así
      //una única suscripcion
      //const subscription2 = api1$.subscribe(displayLog)
    //});
}//export default
```
- **mergeAll**
  - Emite un evento de los observables en su interior como si fuera de este
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/8d64214893357b05cbf0c3ad3cbda289/image.png)
  ```js
  //sandbox.js (mergeAll)
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { concat, fromEvent } from 'rxjs';
  import { tap,map, endWith,mergeAll } from 'rxjs/operators';

  export default () => {
    console.log("32. Introducción a los HOO, mergeAll")
    const button = document.getElementById('btn');

    const api1$ = api.getComment(1).pipe(
      tap(evt => console.log("api1$ evt",evt)),
      map(JSON.stringify)
    )

    fromEvent(button, 'click')
      .pipe(
        tap(evt => console.log("but.click evt ini",evt)), //evt es MouseEvent
        map(evt => api1$), //se emite el observable interno
        mergeAll(), //nos suscribimos al observable anterior y lo pasamos al observable superior
        tap(evt => console.log("but.click evt end",evt)), //evt es observable
      )
      .subscribe(displayLog)

  }//export default (mergeAll)  
  ```
- **mergeMap**
  - Ayuda a suscribirse al observable interno y pasar los eventos internos al observable externo
  - Es tan común emitir un observable con map y seguidamente suscribirse a el con mergeAll que se ha creado este operador que une esas dos instrucciones
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/a53063254d140dfda01cd490b72581e5/image.png)
  ```js
  //sandbox.js (mergeMap)
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { concat, fromEvent } from 'rxjs';
  import { tap,map, endWith,mergeMap } from 'rxjs/operators';

  export default () => {
    console.log("32. Introducción a los HOO, mergeMap")
    const button = document.getElementById('btn');

    const getCommentsObl = () =>{

      const comment1$ = api.getComment(1);
      const comment2$ = api.getComment(2);
      const comment3$ = api.getComment(3);
      const comment4$ = api.getComment(4);

      //devuelve un observable concatenado
      return concat(comment1$, comment2$, comment3$, comment4$).pipe(
        tap(evt => console.log("concat evt ini",evt)),
        map(JSON.stringify),
        endWith('--------//--------'),
        tap(evt => console.log("concat evt end",evt)),
      )
    }//getCommentsObl


    fromEvent(button, 'click')
      .pipe(
        tap(evt => console.log("but.click evt ini",evt)), //evt es MouseEvent
        //mergeMap(evt => api1$), //se suscribe al obs$ interno y emite al externo
        //getCommentsObl devuelve un observable producto de la concatenación
        mergeMap(evt => getCommentsObl()), 
        tap(evt => console.log("but.click evt end",evt)), //evt es observable
      )
      .subscribe(displayLog)

  }//export default (mergeMap)  
  ```
## [33. Operadores switchMap y concatMap de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13760224#questions)
- git stash; git checkout dev/24-hoo-switchmap-concatmap
- En el ejemplo tenemos un contador de clicks que al mismo tiempo son los ids de los comentarios
- Si bien las llamadas son ordenadas el resultado puede ser desordenado por la asincronicidad de la api
- Pensemos en searchbox, si el usuario ha escrito en una caja de busqueda no espera que se acumulen las peticiones y las devuelva todas sino que se deberia descartar las primeras y quedarse con la última
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/38c19500ec6bce9ed671610610bcb463/image.png)
```js
//sandbox.js 
import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, mergeMap } from 'rxjs/operators';

export default () => {
  console.log("24 switchMap")
  const button = document.getElementById('btn');

  fromEvent(button, 'click').pipe(
    tap(evt => console.log("ini evt",evt)),
    //scan emite un contador
    scan((acc, evt) => acc + 1, 0),
    mergeMap(id => api.getComment(id)),
    map(JSON.stringify),
    tap(console.log),
    tap(evt => console.log("end evt",evt)),
  ).subscribe(displayLog);

}//export default () 
```
- **switchMap**
  - Se suscriben a los observables internos que se le pasa y emite los valores recibidos a traves del observable externo 
  - Lo único que mueve de dentro hacia afuera son los valores emitidos
  - Si el observable interno completa la suscripción el observable externo no se entera
  - Me permite remplazar el observable bajo una condición
  - La diferencia con mergeMap es que si recibe un evento externo cancela la suscripción del evento interno anterior antes de suscribirse a un nuevo evento interno
  - Con cada nuevo evento externo se resetea la suscripcion interna
  - Si se han hecho varias peticiones todas las que no hayan sido resueltas se cancelan y solo se espera la última
  - Se suele usar para cancelar peticiones innecesarias al servidor
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/77eff2fc8d65fa812b7a79317ae41df8/image.png)
  ```js
  //sandbox.js (switchMap)
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { fromEvent } from 'rxjs';
  import { map, scan, tap, switchMap } from 'rxjs/operators';

  export default () => {
    console.log("24 switchMap")
    const button = document.getElementById('btn');

    fromEvent(button, 'click').pipe(
      tap(evt => console.log("ini evt",evt)),
      //scan emite un contador
      scan((acc, evt) => acc + 1, 0),        
      //en cada evento nuevo que llega se cancela el anterior con el fin de quedarse con el último    
      switchMap(id => api.getComment(id)),
      map(JSON.stringify),
      tap(console.log),
      tap(evt => console.log("end evt",evt)),
    ).subscribe(displayLog);

  }//export default ()   
  ```
- **concatMap**  
  - Supongamos que si deseamos recibir todas las peticiones pero en orden
  - Se suscribe a los observables internos de forma ordenada
  - Eso quiere decir que hasta que no se complete los eventos del observable interno no se suscribe
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/0aac2cf36e359d0690df78a92b22a232/image.png)
  ```js
  //sandbox.js (concatMap)
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { fromEvent } from 'rxjs';
  import { map, scan, tap, concatMap } from 'rxjs/operators';

  export default () => {
    console.log("24 concatMap")
    const button = document.getElementById('btn');

    fromEvent(button, 'click').pipe(
      tap(evt => console.log("ini evt",evt)),
      //scan emite un contador que es el id
      scan((acc, evt) => acc + 1, 0),        
      //se suscribe a todas las peticiones pero de forma ordenada
      concatMap(id => api.getComment(id)),
      map(JSON.stringify),
      tap(console.log),
      tap(evt => console.log("end evt",evt)),
    ).subscribe(displayLog);

  }//export default ()   
  ```
## [34. High Order Observables: de Arrays a Eventos](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13794448#questions)
- git stash; git checkout dev/25-hoo-arrays
- Todos los operadores de RxJS no que se relacionan con arrays lo hacen en el mismo sentido juntar un conjunto de eventos en un array para trabajar con este como un único evento
- Si se desea el proceso inverso, se cuenta con un evento con un array de datos y se desea que cada uno de sus valores se traten como un evento separado
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/0b18e69ea7f452198209602bdf5eca96/image.png)
```js
//api.js
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export class api{

  static getComment(id){
    return timer(Math.random()*1000).pipe(
      mapTo({id:id, comment:`comment number ${id}`})
    );
  }//getComment

  static getCommentsList(page){

    const buildCommentsList = (page) =>{
      let comments = [];
      const offset = (page-1)*10;
      for(let i=offset; i < offset+10; i++){
        comments.push({id:i, comment:`comment number ${i}`})
      }
      return comments;
    }

    return timer(Math.random()*1000).pipe(
      //buildCommentsList devuelve un array de comentarios según el tamaño de page
      mapTo(buildCommentsList(page))
    );
  }//getCommentsList

}//export class api

//sandbox.js
import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap } from 'rxjs/operators';

export default () => {
  const button = document.getElementById('btn');

  fromEvent(button, 'click').pipe(
    tap(evt => console.log("ini evt",evt)),
    scan((acc, evt) => acc + 1, 0),     
    //getCommentsList devuelve un observable que emite un array de comentarios
    //gracias a concatMap se aplana ese observable para que los eventos emitidos por el observable 
    //externo.
    concatMap(page => api.getCommentsList(page)),
    map(JSON.stringify),
    tap(console.log),
    tap(evt => console.log("end evt",evt)),
  ).subscribe(displayLog);

}//export default ()
```
- Si quisiera usar getCommentsList pero no quiero un array de comentarios sino eventos individuales 
- Se podria pensar de primeras en el método **from**.
- **from** no es un operador es una función que crea observables
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/046768e062d999e1755e515e8845d61d/image.png)
```js
//hacer un explode de un evento en varios eventos
//sandbox.js (mergeMap y from)
import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent, from } from 'rxjs';
import { map, scan, tap, concatMap, mergeMap } from 'rxjs/operators';

export default () => {
  const button = document.getElementById('btn')

  fromEvent(button, 'click').pipe(
    tap(evt => console.log("ini evt",evt)),
    scan((acc, evt) => acc + 1, 0),     
    //getCommentsList devuelve un observable que emite un array de comentarios
    //gracias a concatMap se aplana ese observable para que los eventos emitidos por el observable 
    //externo.
    concatMap(page => api.getCommentsList(page)),//hasta aqui hay un array de datos
    mergeMap(comments=>from(comments)), //from crea observables con cada valor de comments
    //con mergeMap nos suscribimos al observable interno y emitimos los eventos internos al observable externo
    map(JSON.stringify),
    tap(console.log),
    tap(evt => console.log("end evt",evt))
  ).subscribe(displayLog)

}//export default ()
```
## Sección 9: Utilidades avanzadas
## [35. Operadores throwError, catchError y retry de RxJS](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13794456#questions)
- git stash; git checkout dev/26-throwerror-catcherror-retry
- Una vez que se emite el error el botón deja de funcionar
- Eso sucede pq cuando ocurre un error se cierra la suscripción al botón
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/9fbfc5f64e17aabd908c603dc7c5bebc/image.png)
```js
//api.js
import { timer, throwError, of } from 'rxjs';
import { tap, mapTo, mergeMap } from 'rxjs/operators';

export class api{

  static getComment(id){
    //timer, despues de un cierto tiempo emite un evento con un tiempo aleatorio
    //para simular la latencia de la red
    return timer(Math.random()*1000).pipe(
      tap(evt => console.log("timer evt",evt)),
      mergeMap(evt => {
        console.log("mergemap evt",evt)
        const frnd = Math.random()
        console.log("mergemap frnd",frnd)
        
        const isError = frnd>0.6 ? true: false
        console.log("mergemap isError",isError)
        if(isError) return throwError(new Error("Request Timeout"))
        
        return of({id:id, comment:`comment number ${id}`})
      })
    );
  }//getComment(id)

  static getCommentsList(page){
    const buildCommentsList = (page) =>{
      let comments = [];
      const offset = (page-1)*10;
      for(let i=offset; i < offset+10; i++){
        comments.push({id:i, comment:`comment number ${i}`})
      }
      return comments;
    }//buildCommentsList

    return timer(Math.random()*1000).pipe(
      mapTo(buildCommentsList(page))
    );
  }//getCommentsList

}//export class api

//sandbox.js throwError
import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap } from 'rxjs/operators';

export default () => {
  const button = document.getElementById('btn');
  fromEvent(button, 'click').pipe(
    tap(evt => console.log("ini evt",evt)),
    scan((acc, evt) => acc + 1, 0),            
    concatMap(id => api.getComment(id)),
    map(JSON.stringify),
    tap(evt => console.log("end evt",evt)),
  ).subscribe(displayLog);
}
```
- Pasando el handler en subscribe
- Esto no evita que el botón deje de funcionar
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/8ca3eba55354bd7589eb6db9e515dc90/image.png)
```js
//sandbox.js throwError
import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap } from 'rxjs/operators';

export default () => {
  const button = document.getElementById('btn');
  fromEvent(button, 'click').pipe(
    tap(evt => console.log("ini evt",evt)),
    scan((acc, evt) => acc + 1, 0),            
    concatMap(id => api.getComment(id)),
    map(JSON.stringify),
    tap(evt => console.log("end evt",evt)),
  )
  //en subscribe se le puede pasar el handler de erores, el botón de
  .subscribe(displayLog,err => console.log("Error:",err.message));
}
```
- **catchError**
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/ccbdacec02cf5e607d9dfc81a839f6ce/image.png)
  ```js
  //sandbox.js throwError
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { fromEvent } from 'rxjs';
  import { map, scan, tap, concatMap, catchError } from 'rxjs/operators';

  export default () => {
    const button = document.getElementById('btn');
    fromEvent(button, 'click').pipe(
      tap(evt => console.log("ini evt",evt)),
      scan((acc, evt) => acc + 1, 0),

      //esto puede emitir un error
      concatMap(id => api.getComment(id)),

      //TypeError: You provided 'undefined' where a stream was expected. 
      //You can provide an Observable, Promise, Array, or Iterable
      //se puede pasar como segundo parametro el observable para que continue la ejecución 
      //y el botón siga funcionando
      catchError((err,src$) => { console.log("catched!!",err); return src$}),

      map(JSON.stringify),
      tap(evt => console.log("end evt",evt)),
    )
    //en subscribe se le puede pasar el handler de erores, el botón de
    .subscribe(displayLog,err => console.log("Error:",err.message));
  }  
  ```
  - Ahora evitamos que deje de funcionar el botón
  - El problema es que cada vez que ocurre un error vuelve a intentar desde el primer evento del observable interno. Esto es asi pq se esta capturando el error del observable de orden superior
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/6eaad7f966ef9afed27a2422fbed828b/image.png)
  ```js
  //sandbox.js throwError
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { fromEvent } from 'rxjs';
  import { map, scan, tap, concatMap, catchError } from 'rxjs/operators';

  export default () => {
    const button = document.getElementById('btn');
    fromEvent(button, 'click').pipe(
      tap(evt => console.log("ini evt",evt)),
      scan((acc, evt) => acc + 1, 0),

      //esto puede emitir un error
      concatMap(id => api.getComment(id)),

      //ypeError: You provided 'undefined' where a stream was expected. 
      //You can provide an Observable, Promise, Array, or Iterable
      //se puede pasar como segundo parametro el observable para que continue la ejecución 
      //y el botón siga funcionando
      catchError((err,src$) => { console.log("catched!!",err); return src$}),

      map(JSON.stringify),
      tap(evt => console.log("end evt",evt)),
    )
    //en subscribe se le puede pasar el handler de erores, el botón de
    .subscribe(displayLog,err => console.log("Error:",err.message));
  }  
  ```
  - Para evitar que se resetee el observable de orden superior movemos catchError dentro del pipe de la api
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/12b049877b7e295519bf8068c792a97e/image.png)
  ```js
  //sandbox.js throwError
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { fromEvent } from 'rxjs';
  import { map, scan, tap, concatMap, catchError } from 'rxjs/operators';

  export default () => {
    const button = document.getElementById('btn');
    fromEvent(button, 'click').pipe(
      tap(evt => console.log("ini evt",evt)),
      scan((acc, evt) => acc + 1, 0),

      //esto puede emitir un error
      concatMap(id => api.getComment(id).pipe(
        catchError((err,src$) => { console.log("catched!!",err); return src$})
      )),

      map(JSON.stringify),
      tap(evt => console.log("end evt",evt)),
    )
    //en subscribe se le puede pasar el handler de erores, el botón de
    .subscribe(displayLog,err => console.log("Error:",err.message));
  }  
  ```
  - El ejemplo anterior puede dar lugar a que se quede en un bucle infinito el catch ya que petición se repite hasta que se complete correctamente
  - Imagina que hemos hecho 3 peticiones y la cuarta da error siempre se intentaria resolver (la cuarta), en bucle infinito, para continuar con la quinta
  - Para evitar este tipo de situaciones contamos con **retry** permite capturar el error y reintentar su ejecución un número limitado de veces.
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/b87beca5964e551b1616fb80365e2d07/image.png)
  ```js
  //sandbox.js throwError
  import { updateDisplay, displayLog } from './utils';
  import { api } from './api';
  import { fromEvent } from 'rxjs';
  import { map, scan, tap, concatMap, catchError,retry } from 'rxjs/operators';

  export default () => {
    const button = document.getElementById('btn');
    fromEvent(button, 'click').pipe(
      tap(evt => console.log("ini evt",evt)),
      scan((acc, evt) => acc + 1, 0),

      //esto puede emitir un error
      concatMap(id => api.getComment(id).pipe(
        //catchError((err,src$) => { console.log("catched!!",err); return src$})
        tap(evt => console.log("before retry evt",evt)),
        retry(3) //lo intentará en 3 ocasiones si continua el error lo capturará el handler
        //en el subscribe y el botón dejara de funcionar
      )),

      map(JSON.stringify),
      tap(evt => console.log("end evt",evt)),
    )
    //en subscribe se le puede pasar el handler de erores, el botón de
    .subscribe(displayLog,err => console.log("Error:",err.message));
  }  
  ```
## [36. Constantes NEVER y EMPTY de RxJS 8 min](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13794460#questions)
- git stash; git checkout dev/27-never-empty 
- **NEVER**
  - Nunca ejecuta complete()
  - Devuelve un observable vacio, no emite un error ni se completa, no hace nada.
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/2882e59c31c485a4d4144e80379f3f88/image.png)
  ```js
  //sandbox.js NEVER
  import { updateDisplay } from './utils';
  import { fromEvent, interval, merge, NEVER } from 'rxjs';
  import {tap, mapTo, scan, takeWhile,switchMap,startWith  } from 'rxjs/operators';

  export default () => {
    const countdownSeconds = 10;

    const pauseButton = document.getElementById('pause-btn');
    const resumeButton = document.getElementById('resume-btn');

    const pause$ = fromEvent(pauseButton, 'click');
    const resume$ = fromEvent(resumeButton, 'click');

    //mapTo transforma la salida emitiendo el mismo valor
    const isPaused$ = merge(pause$.pipe(mapTo(true)),resume$.pipe(mapTo(false)))
    const interval$ = interval(1000).pipe(mapTo(-1));

    const countdown$ = isPaused$.pipe(
      tap(evt => console.log("ini evt",evt)), //esto no se imprime
      //startWith fuerza la emisión de un evento, parece como un BEGIN
      startWith(false),//en cuanto carga el contandor sabrá que no está parado
      tap(evt => console.log("after startwith evt",evt)), //solo se imprime una vez
      //switchmap me permite remplazar un observable bajo una condicion
      //si no está pausado devuelvo un observable que devuelve -1 si esta pausado, con NEVER un observable vacio 
      switchMap(paused => !paused ? interval$: NEVER), 
      //si no está pausado aqui se recibe -1 cada seg entonces se resta a countDownSeconds
      scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
      //si el valor recibido es < 0 se de emitir
      takeWhile(v => v >= 0),
      tap(evt => console.log("end evt",evt)),
    );

    countdown$.subscribe(updateDisplay);
  }  
  ```
- **EMPTY**
  - Ejecuta complete en el momento que se instancia
  - Es una función que devuelve un observable vacio que tal como recibe una suscripción se completa
  ```js
  //sandbox.js EMPTY
  import { updateDisplay } from './utils';
  import { fromEvent, interval, merge, NEVER, EMPTY } from 'rxjs';
  import {tap, mapTo, scan, takeWhile,switchMap,startWith  } from 'rxjs/operators';

  export default () => {
    const countdownSeconds = 10;

    const pauseButton = document.getElementById('pause-btn');
    const resumeButton = document.getElementById('resume-btn');

    const pause$ = fromEvent(pauseButton, 'click');
    const resume$ = fromEvent(resumeButton, 'click');

    //mapTo transforma la salida emitiendo el mismo valor
    const isPaused$ = merge(pause$.pipe(mapTo(true)),resume$.pipe(mapTo(false)))
    const interval$ = interval(1000).pipe(mapTo(-1));

    const countdown$ = isPaused$.pipe(
      tap(evt => console.log("ini evt",evt)), //esto no se imprime
      //startWith fuerza la emisión de un evento, parece como un BEGIN
      startWith(false),//en cuanto carga el contandor sabrá que no está parado
      tap(evt => console.log("after startwith evt",evt)), //solo se imprime una vez
      //switchmap me permite remplazar un observable bajo una condicion
      //si no está pausado devuelvo un observable que devuelve -1 si esta pausado
      //con EMPTY "deberia" detener la ejecución, pero no es así pq:
      //switchmap lo único que mueve de dentro hacia afuera son los valores emitidos
      //- Si el observable interno completa la suscripción el observable externo no se entera
      switchMap(paused => !paused ? interval$: EMPTY), 
      //si no está pausado aqui se recibe -1 cada seg entonces se resta a countDownSeconds
      scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
      //si el valor recibido es < 0 se de emitir
      takeWhile(v => v >= 0),
      tap(evt => console.log("end evt",evt)),
    );

    countdown$.subscribe(updateDisplay);
  }  
  ```
## [37. Eventos y Notificaciones: materialize y dematerialize](https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13794462#questions)
- git stash; git checkout dev/28-materialize-dematerialize 
- En el ejemplo anterior EMPTY no comunica al HOO que se ha completado
- Como podríamos hacer que EMPTY comunicará este este estado?
- Para eso están las notificaciones
  - kind: N: next, C: complete, E: error
- ![](https://trello-attachments.s3.amazonaws.com/5dc316fd2234d1332d1f66ac/1146x290/30eebb82d7d6326cd08aebf1aa11f609/image.png)
```js
//sandbox.js
import { updateDisplay } from './utils';
import { fromEvent, interval, merge, EMPTY } from 'rxjs';
import {tap, mapTo, scan, takeWhile, switchMap, startWith, materialize } from 'rxjs/operators';

export default () => {

  const countdownSeconds = 10;
  const pauseButton = document.getElementById('pause-btn');
  const resumeButton = document.getElementById('resume-btn');

  const pause$ = fromEvent(pauseButton, 'click');
  const resume$ = fromEvent(resumeButton, 'click');
  const isPaused$ = merge(pause$.pipe(mapTo(true)), resume$.pipe(mapTo(false)));

  const interval$ = interval(1000).pipe(mapTo(-1));

  const countdown$ = isPaused$.pipe(
    startWith(false),
    tap(evt => console.log("ini evt",evt)),
    switchMap(paused => !paused ? interval$ : EMPTY),
    scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
    takeWhile(v => v >= 0),
    materialize(), //emite esto: Notification {kind: "N", value: 2, error: undefined, hasValue: true}
    tap(evt => console.log("end evt",evt)),
  );

  countdown$.subscribe(updateDisplay);
}
```
- Con `EMPTY.pipe(materialize())` forzamos la notificacion complete al exterior
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5dc316fd2234d1332d1f66ac/79631bcd165a24872c9c5bc030b899f0/image.png)
- Todo lo que está materializado en una notificacion hay que traducirlo con dematerialize en el HOO
```js
//sandbox.js (materialize y dematerialize)
import { updateDisplay } from './utils';
import { fromEvent, interval, merge, EMPTY } from 'rxjs';
import {tap, mapTo, scan, takeWhile, switchMap, startWith, materialize,dematerialize } from 'rxjs/operators';

export default () => {

  const countdownSeconds = 10;
  const pauseButton = document.getElementById('pause-btn');
  const resumeButton = document.getElementById('resume-btn');

  const pause$ = fromEvent(pauseButton, 'click');
  const resume$ = fromEvent(resumeButton, 'click');
  const isPaused$ = merge(pause$.pipe(mapTo(true)), resume$.pipe(mapTo(false)));

  const interval$ = interval(1000).pipe(mapTo(-1));

  const countdown$ = isPaused$.pipe(
    startWith(false),
    tap(evt => console.log("ini evt",evt)),
    //con el pipe en empty ya hemos forzado su notificación al exterior
    switchMap(paused => !paused ? interval$.pipe(materialize()) : EMPTY.pipe(materialize())),
    //como ahora switchmap devolverá un contenido materializado hay que saber interpretarlo con 
    //dematerialize 
    dematerialize(),
    scan((acc, curr) => ( curr ? curr + acc : curr ), countdownSeconds),
    takeWhile(v => v >= 0),
    tap(evt => console.log("end evt",evt)),
  );

  countdown$.subscribe(updateDisplay,null /*handler error*/,(evt)=>console.log("completed!",evt));
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