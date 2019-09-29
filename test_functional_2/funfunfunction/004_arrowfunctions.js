console.log("Video 2: https://youtu.be/bCqtb-Z5YGQ?t=379")
console.log("004_arrowfunctions.js 1.0.0")


var arAnimals = [
    {name:"fluffykins", species: "rabbit"},
    {name:"caro", species: "dog"},
    {name:"Hamilton", species: "dog"},
    {name:"Harold", species: "fish"},
    {name:"Ursula", species: "cat"},
    {name:"Jimmy", species: "fish"},
]

var arNames = arAnimals.map(function(oAnimal){return oAnimal.name})
var arNames = arAnimals.map(oAnimal=>oAnimal.name)

console.log(arNames)