console.log("Video 3: https://youtu.be/Wl98eZpkp-c")
console.log("003_hiorderfunctions_reduce.js 1.0.0")
console.log("Array.prototype.reduce()")
console.log("var resultado = arr.reduce(funcion[, valorInicial]);")

var arOrders = [
    {amount:250},
    {amount:400},
    {amount:100},
    {amount:325}
]

var iTotal = arOrders.reduce(function(iTot,oOrder){return iTot+oOrder.amount},0)


// for(var i=0; i<arOrders.length; i++){
//     iTotal += arOrders[i].amount
// }

console.log("iTotal1",iTotal)

iTotal = arOrders.reduce((iTot,oOrder)=>{return iTot+oOrder.amount},0)

console.log("iTotal2",iTotal)
