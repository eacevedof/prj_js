console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 24 - Subject](https://youtu.be/2LCo926NFLI?t=789)

const array$ = Rx.Observable.of("Hello")
console.log("array$: ",array$)

const obsA = array$.subscribe(val => print(`Sub A: ${val}`))
const obsB = array$.subscribe(val => print(`Sub B: ${val}`))

console.log("obsA: ",obsA,"obsB: ",obsB)

