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
