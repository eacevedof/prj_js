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

  - **nota:** No se puede incluir dos **IIFE** en un mismo archivo
  - 
    