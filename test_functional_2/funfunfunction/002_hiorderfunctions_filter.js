console.log("Video 1: https://youtu.be/BMUiFMZr7vk")
console.log("002_hiorderfunctions_filter.js 1.0.0")

require(["/funfunfunction/004_arrowfunctions.js"])

var dogs = arAnimals.filter(function(oAnimal){
    return oAnimal.species === "dog"
})

console.log(dogs)

var is_dog = function(oAnimal){return (oAnimal.species ==="dog")}

dogs = arAnimals.filter(is_dog)