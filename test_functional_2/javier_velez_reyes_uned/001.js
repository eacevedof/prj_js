/*
001.js
//https://youtu.be/f4qQN6Mli-M?t=175
Especificación declarativa
*/

const basket = [
  {product:"oranges", type:"food",amount:2,price:15},
  {product:"bleach",  type:"home",amount:2,price:15},
  {product:"pears",   type:"food",amount:3,price:45},
  {product:"apples",  type:"food",amount:3,price:25},
  {product:"gloves",  type:"home",amount:1,price:10}
]

get_total =  strtype  =>
    basket
        .filter(objprod => objprod.type === strtype)
        .reduce(
          (ac,objprod) => ac + objprod.amount + objprod.price
          ,0)

const food = "food"
const home = "home"

const totfood = get_total(food)
console.log("totfood",totfood)

const tothome = get_total(home)
console.log("tothome",tothome)

/*
$ node 001.js
totfood 93
tothome 28
*/