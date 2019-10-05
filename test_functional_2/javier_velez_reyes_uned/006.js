//006.js
//A. Principio de transparencia referencial
//https://youtu.be/f4qQN6Mli-M?t=831

//array.concat == $array[] = x o array_merge($array1, $array2)
const get_stack = () => {return { stack: [] } }

const get_pushed = (s, e) => {return { stack: s.stack.concat(e), top:e}}

const get_poped = s => {
  //concatena los dos arrays
  const stack = [].concat(s.stack)
  //quita el último elemento
  const e = stack.pop()
  return {
    stack,
    top: e
  }
}

const ostack    = get_stack()
console.log("ostack",ostack)

const ostackp   = get_pushed(ostack,"a")
console.log("ostack push 1",ostackp)

const ostackp2  = get_pushed(ostackp,"b")
console.log("ostack push 2",ostackp2)

const ostackpop = get_poped(ostackp2)
console.log("ostack poped",ostackpop)

const ostackpop2 = get_poped(ostackpop)
console.log("ostack poped 2",ostackpop2)



