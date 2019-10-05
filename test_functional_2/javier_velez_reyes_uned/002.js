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
  console.log("functional")
  let phases = [
    function body(v){console.log("body")},
    function paint(v){console.log("paint")}
  ]

  let test = function (phases){
    return function(vehicle){
      return phases.reduce(function(ac,fn){
        console.log("vehicle",vehicle,"ac",ac)
        return fn(ac)
      },vehicle)
    }
  }


})()

