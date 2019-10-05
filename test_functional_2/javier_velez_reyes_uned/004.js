//004.js
//D. Adaptación funcional
//https://youtu.be/f4qQN6Mli-M?t=668

const fn_greater = (x, y)=> x > y
const fn_flip = (y,x) => fn_greater(y,x)

const cur_greater = x => y => y>x

const is_adult = (function greater(x){
  return function(y){
    return y > x;
  }
})(18)

console.log("isadult 22",is_adult(22))  // true
console.log("isadult 10",is_adult(18))  // false