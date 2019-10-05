/*
002.js
//Abstracción Funcional
//https://youtu.be/f4qQN6Mli-M?t=324
*/

//Imperativa:
function i(){

  let Car = function(){}
  Car.prototype.test = ()=>console.log("Car.test")
  let Truck = function(){}
  Truck.prototype.test = ()=>console.log("Truck.test")
  let vehicles = [new Car(), new Truck()]

  
  let garage = function(vehicles){
    for (v in vehicles)
      vehicles[v].test()
  }

  //pasa el test al listado de vehiculos
  garage(vehicles)
}

//Funcional:
(function(){
  console.log("Testing car:")
  let phases = [
    function body(v){
      //console.log("v",v,v.name+" body")
      //return v.name+" body"
      return {name:v.name + ": body checked,"}
    },
    
    function paint(v){
      //console.log("v",v,v.name+" paint"); 
      //return v.name+" paint"
      return {name:v.name + " painted."}
    }
  ]

  let test = function (phases){
    return function(vehicle){
      //console.log("vehicle",vehicle)
      return phases.reduce(function(ac,fn){
        //console.log("ac vehicle",ac)
        //console.log("ac:",ac,"item:",fn)
        return fn(ac)
      },vehicle)
    }
  }//test

  const cartested = test(phases)({name:"Eaf Car"})
  console.log("cartested:",cartested)
})()

