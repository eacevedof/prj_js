# [Youtube - Programación Funcional Node.js - Javier Vélez Reyes @javiervelezreye](https://youtu.be/f4qQN6Mli-M)

## Introducción
- [II. Objetivos de la programación funcional](https://youtu.be/f4qQN6Mli-M?t=215)
  - [A. 001.js - Especificación declarativa](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/001.js)
    - Legilibilidad del código
  - [B. 002.js - Abstracción funcional](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/002.js)
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
  - [C. 003.js - Reutilización funcional](https://github.com/eacevedof/prj_js/blob/master/test_functional_2/javier_velez_reyes_uned/003.js)
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



## Notas
- No se puede incluir dos **IIFE** en un mismo archivo

    