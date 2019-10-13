//012.js
//[B. Técnicas de encapsulación - Video](https://youtu.be/f4qQN6Mli-M?t=1484) 
// Encapsulación de estado:

//Patrón module ^^
function fn_stack() {
  //variablaes retenidas
  const aritems = []
  const arhistory = []

  return {
    //guarda en el historial los items actuales ya agrega e a items
    fn_push: function(e){
      //arr1.concat(arr2) == array_merge($ar1,$ar2)
      arhistory.push([].concat(aritems))
      aritems.push(e)
      console.log("fn_push.aritems:",aritems)
    },
    //guarda en hist, extrae y elimina el último elemento de items
    fn_pop: function(){
      arhistory.push([].concat(aritems))
      console.log("fn_pop.arhistory:",arhistory)
      return aritems.pop()
    },

    //restaura items a partir del historial
    fn_undo: function(){
      if(arhistory.length>0)
        aritems = arhistory.pop()
      console.log("fn_undo.aritems:",aritems)
    }
  }

}//fn_stack

const objfuncs = fn_stack()
console.log("objfuncs:",objfuncs)
/*
$ node 012.js
objfuncs: { fn_push: [Function: fn_push],
  fn_pop: [Function: fn_pop],
  fn_undo: [Function: fn_undo] }
*/
objfuncs.fn_push("comida")
objfuncs.fn_push("refresco")
objfuncs.fn_push("agua")

//no tiene alcance público => undefined
console.debug("objfuncs after push: ",objfuncs.aritems)

/*
  - Encapsulación de Comportamiento. Pila Undo
  - Retención de Comportamiento
*/
function fn_stackcomp(){
  const aritems = []
  //se va a guardar la fnc inversa a cada operación
  //si he añadido e a items el historico es pop(e)
  //si he quitado e, el historico es push(e)
  const arhistfuncs = []

  return {
    fn_push: function fn_push(e){
      arhistfuncs.push(function(){
        aritems.pop()
      })
      aritems.push(e)
    },

    fn_pop: function fn_pop(){
      const e = aritems.pop()
      arhistfuncs.push(function(){
        aritems.push(e)
      })
      return e
    },

    fn_undo: function fn_undo(){
      if(arhistfuncs.length>0)
        //esto ejecuta la penultima función, que es la penultima inversa 
        //si la última es un push => la penultima es un pop
        //si la última es un pop => la penultima es un push
        arhistfuncs.pop()()
    }
  }
}//fn_stackcomp

const objstackcomp = fn_stackcomp()
console.log("objstackcomp funcs",objstackcomp)
/*
objstackcomp funcs { fn_push: [Function: fn_push],
  fn_pop: [Function: fn_pop],
  fn_undo: [Function: undo] }
*/
