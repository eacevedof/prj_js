//003.js
//https://youtu.be/f4qQN6Mli-M?t=453
//C - Reutilización funcional

(()=>{
//console.log("003.js")
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
                .map(user => user.name)

console.log("names:",names) //names: [ 'jvelez', 'jlopez' ]

const total = basket
                .filter(prod => prod.type=="F")
                .reduce((iac,prod) => iac + prod.price,0)
console.log("total:",total) //total: 60 

})()