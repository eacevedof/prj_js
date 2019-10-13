# [Youtube - Programación Funcional Node.js - Javier Vélez Reyes @javiervelezreye](https://youtu.be/f4qQN6Mli-M)

## Introducción
- [II. Objetivos de la programación funcional](https://youtu.be/f4qQN6Mli-M?t=215)
  - [A. Especificación declarativa - 001.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/001.js)
    - Legilibilidad del código
  - [B. Abstracción funcional - 002.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/002.js)
    - POO: El algoritmo está distribuido entre los objetos
    - Funcional: Inyección de funciones en un algoritmo para modificar su comportamiento
    - ![abstracción funcional](https://trello-attachments.s3.amazonaws.com/5d987bf27d9f907f9d5403b5/776x559/49d30b7a63e35eafe54724b9588774cc/image.png)
    ```js
    //si nos fijamos en el gráfico, sucede esto:
    //una función body(v) recibe un vehiculo y retorna el mismo vehiculo transformado
    //que a su vez lo recibe paint(v) y devuelve un nuevo v pintado

    //Funcional:
    (function(){
      console.log("Testing car:")
      let phases = [
        function body(v){
          return {name:v.name + ": body checked,"}
        },
        
        function paint(v){
          return {name:v.name + " painted."}
        }
      ]

      let test = function (phases){
        return function(vehicle){
          return phases.reduce(function(ac,fn){
            return fn(ac)//devuelve un v transformado
          },vehicle)
        }
      }//test

      const cartested = test(phases)({name:"Eaf Car"})
      console.log("cartested:",cartested)
    })()

    $ node 002.js
    Testing car:
    cartested: { name: 'Eaf Car: body checked, painted.' }
    ```
  - [C. Reutilización funcional - 003.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/003.js)
    - La reutilización de un algoritmo funcional alcanza cotas elevadas.
    - en POO no es posible este alcance
    ```js
    const users = [
      {name: "jvelez", sex: "M", age:35},
      {name: "eperez", sex: "F", age:15},
      {name: "jlopez", sex: "M", age:26},
    ]

    const basket = [
      {product: "oranges",  type: "F", price:15},
      {product: "bleach",   type: "H", price:15},
      {product: "pears",    type: "F", price:45},
    ]

    /**
    * Problema users:
    * Todos los nombres de los usuarios que son mayor de edad
    *    SELECT name FROM users WHERE age>18
    * 
    * Problema basket:
    * Contar el precio total de todos los productos de tipo alimento
    *    SELECT SUM(price) FROM basket WHERE type="F"
    */
    const names = users
                    .filter(user => user.age>18)
                    //.map(user => user.name)
                    .reduce((arac,user) => [...arac,user.name],[])

    console.log("names:",names) //names: [ 'jvelez', 'jlopez' ]

    const total = basket
                    .filter(prod => prod.type=="F")
                    .reduce((iac,prod) => iac + prod.price,0)
    console.log("total:",total) //total: 60 

    //===========================
    //SOLUCIÓN PRESENTACIÓN
    //===========================

    //recibe cualquier array
    const get = arany => (fnfilter, fnreduce, mxbase) => arany
                                                        .filter(fnfilter)
                                                        .reduce(fnreduce, mxbase)
    //fn_filter
    const get_adults = u => u.age>18
    //fn_reducer
    const get_names = (arac, u) => [...arac,u.name]

    const names2 = get(users)(get_adults,get_names,[])
    console.log("names 2:",names2) //names 2: [ 'jvelez', 'jlopez' ]

    //fn_filter
    const get_food = prod => prod.type == "F"
    //fn_reducer
    const get_total = (iac, prod) => iac + prod.price

    const total2 = get(basket)(get_food,get_total,0)
    console.log("total2:",total2) //total2: 60    
    ```    
  - [D. Adaptación Funcional - 004.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/004.js)
    - [Video - AF](https://youtu.be/f4qQN6Mli-M?t=668)
    - Las funciones son plásticas en su morfología
    ```js
    const fn_greater = (x, y)=> x > y
    const fn_flip = (y,x) => fn_greater(y,x)

    const cur_greater = x => y => y>x

    const is_adult = (function greater(x){
      return function(y){
        return y > x;
      }
    })(18)

    console.log("isadult 22",is_adult(22))  // true
    console.log("isadult 10",is_adult(18))  // false
    ```
  - [E. Dinamicidad Funcional - 005.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/005.js)    
    - [Video - DF](https://youtu.be/f4qQN6Mli-M?t=769)
    - Funciones que devuelven funciones
    - Funciones generadoras de comportamiento
    ```js
    const fn_greater = x => y => y > x;

    const fn_isold = fn_greater(65)
    fn_isold("jlopez")

    const fn_isadult = fn_greater(18)
    fn_isadult("jlopez")

    const fn_isyoung = fn_greater(25)
    fn_isyoung("jlopez")
    ```
- [III. Principios de Diseño Funcional](https://youtu.be/f4qQN6Mli-M?t=827)
  - [A. Transparencia Referencial - 006.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/006.js)
    - Cualquier función debe poder substituirse en cualquier ámbito de la app por su expresión funcional sin que ello afecte al resultado obtenido.
    - La interpretación de este principio de diseño tiene tres lecturas complementarias.
    - Se dice que la función es idempotente si siempre devuelve el mismo resultado para los mismos parámetros de entrada. En nuestro ejemplo debería verificarse esta igualdad.
    - debería dar lo mismo usar el código de la func que esta misma, parece obvio pero casi nunca se cumple
    - **`pop + pop === 2 * pop`**
    ```js
    const get_stack = () => {return { stack: [] } }

    const get_pushed = (s, e) => {return { stack: s.stack.concat(e), top:e}}

    const get_poped = s => {
      //concatena los dos arrays
      const stack = [].concat(s.stack)
      //quita el último elemento
      const e = stack.pop()
      return {
        stack,
        top: e
      }
    }

    const ostack    = get_stack()
    console.log("ostack",ostack)

    const ostackp   = get_pushed(ostack,"a")
    console.log("ostack push 1",ostackp)

    const ostackp2  = get_pushed(ostackp,"b")
    console.log("ostack push 2",ostackp2)

    const ostackpop = get_poped(ostackp2)
    console.log("ostack poped",ostackpop)

    const ostackpop2 = get_poped(ostackpop)
    console.log("ostack poped 2",ostackpop2)

    ostack { stack: [] }
    ostack push 1 { stack: [ 'a' ], top: 'a' }
    ostack push 2 { stack: [ 'a', 'b' ], top: 'b' }
    ostack poped { stack: [ 'a' ], top: 'b' }
    ostack poped 2 { stack: [], top: 'a' }
    ```
  - B. Principio de Diseño Dirigido por Capas
    - [Video - PDDC](https://youtu.be/f4qQN6Mli-M?t=895)
    - Librerias: underscore.js, fn.js, ramda, lodash, etc
    - Estas aportan grandes esquemas funcionales para programar en js
    - Al programar en fn, no debemos de pensar en el problema sino en la familia de problemas similares, así se conseguirá una **reutilización transversal al dominio**
      - Libreria: funciones genrales, Idiomatico: familia de problemas y Dominio:el esquema se contextualiza dentro del dominio (3 capas)
    - Ejemplo: **users y basket**
## [Programación Funcional en Javascript](https://youtu.be/f4qQN6Mli-M?t=965)
- I. Introducción
- [II. Mecanismos de Programación Funcional](https://youtu.be/f4qQN6Mli-M?t=972)
  - [A. Definición Funcional por Casos - 007.js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/007.js)
  - En funcional no existe: if, while, for
  ```js
  function f(params){
    return caso_1 ? resultado_1:
          caso_2 ? resultado_2:
          resultado-defecto;
  }

  function comparator(x){
    return x > 0   ? 1:
          x === 0  ? 0:
                    -1
  }

  is_even = n => n % 2 === 0

  console.log("comparador 10:",comparator(10))
  console.log("comparador 0 :",comparator(0))
  console.log("comparador -5:",comparator(-5))

  $ node 007.js
  comparador 10: 1
  comparador 0 : 0
  comparador -5: -1  
  ```
  - [B. Definición por Recursión - video](https://youtu.be/f4qQN6Mli-M?t=1025)
  - [B. Definición por Recursión - js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/008.js)
    - Recursión Directa
      - Va **reduciendo el problema**
    - Recursión Indirecta
      - Convergencia hacia los casos base, van incluyendo un operador de negación que se resuelven al llegar al caso base
      - `even(4) => !!!!true` => `true`
  ```js
  //008.js
  //B. Definición por Recursión 
  //https://youtu.be/f4qQN6Mli-M?t=1025

  //recursion directa
  const factorial = n => n === 0 ? 1 : n * factorial(n-1) 

  //recursion indirecta
  const is_even = n => n === 0 ? true  : !is_even(n-1)
  const is_odd  = n => n === 0 ? false : !is_odd(n-1)

  //directa
  let r = factorial(4)
  console.log("factorial 4:",r)

  //Indirecta
  r = is_even(18)
  console.log("is_even 18:",r)

  r = is_odd(18)
  console.log("is_odd 18:",r)

  /*
  $ node 008.js
  factorial 4: 24
  is_even 18: true
  is_odd 18: false
  */
  ```
  - [Problema de las Torres de Hanoi](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/009.js)
  - ![](https://trello-attachments.s3.amazonaws.com/5d987bf27d9f907f9d5403b5/328x304/02eebec73584b2554c1179f90dac820d/image.png)
  ```js
  //009.js
  const hanoi = (iItems, arA, arAux, arC) =>{
                  if(iItems===1)
                    //quita el elemento de arA y lo pone en arC
                    mover(arA, arC)
                  else{
                    hanoi(iItems-1, arA, arC, arAux)
                    //quita el elemento de origin y lo pone en dest
                    mover(arA, arC)
                    hanoi(iItems-1, arAux, arA, arC)                  
                  }
                }

  //array.pop extrae el último elemento y lo quita del array
  const mover = (arA, arC) => arC.push(arA.pop()) 
  ```
  - [C. Definición de Orden Superior - video](https://youtu.be/f4qQN6Mli-M?t=1152)
  - [C. Definición de Orden Superior - js](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/010.js)
  - En js las **funciones** son ciudadanos de primer orden. Permite a una función recibir otras funciones como parámetros o devolver funciones. Esto es **orden superior**.
  - Las funciones pueden ser factorias de funciones
  - **fn.apply()**

## Notas
- No se puede incluir dos **IIFE** en un mismo archivo

    