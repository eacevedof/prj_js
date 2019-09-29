console.log("Video 2: https://youtu.be/bCqtb-Z5YGQ")
console.log("003_hiorderfunctions_map.js 1.0.0")

var arAnimals = [
    {name:"fluffykins", species: "rabbit"},
    {name:"caro", species: "dog"},
    {name:"Hamilton", species: "dog"},
    {name:"Harold", species: "fish"},
    {name:"Ursula", species: "cat"},
    {name:"Jimmy", species: "fish"},
]

var arNames = []


arNames = arAnimals.map(function(oAnimal){
    return oAnimal.name
})

// for (var i = 0; i<arAnimals.length; i++){
//     arNames.push(arAnimals[i].name)
// }

console.log("arNames1",arNames)

arNames = arAnimals.map(function(oAnimal){
    //return "${oAnimal.name} is a ${animal.species}" no va!!
    return oAnimal.name +"is a "+oAnimal.species
})

console.log("arNames2",arNames)
