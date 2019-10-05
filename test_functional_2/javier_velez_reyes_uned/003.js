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
                //.map(user => user.name)
                .reduce((arac,user) => [...arac,user.name],[])

console.log("names:",names) //names: [ 'jvelez', 'jlopez' ]

const total = basket
                .filter(prod => prod.type=="F")
                .reduce((iac,prod) => iac + prod.price,0)
console.log("total:",total) //total: 60 


//===========================
//SOLUCIÓN PRESENTACIÓN
//===========================

//recibe cualquier array
const get = arany => (fnfilter, fnreduce, mxbase) => arany
                                                    .filter(fnfilter)
                                                    .reduce(fnreduce, mxbase)
//fn_filter
const get_adults = u => u.age>18
//fn_reducer
const get_names = (arac, u) => {
  arac.push(u.name)
  return arac
}

const names2 = get(users)(get_adults,get_names,[])
console.log("names 2:",names2) //names 2: [ 'jvelez', 'jlopez' ]

//fn_filter
const get_food = prod => prod.type == "F"
//fn_reducer
const get_total = (iac, prod) => iac + prod.price

const total2 = get(basket)(get_food,get_total,0)
console.log("total2:",total2) //total2: 60

})()