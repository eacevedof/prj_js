console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 24 - Subject](https://youtu.be/2LCo926NFLI?t=789)

const subject$ = new Rx.Subject()
console.log("subject$: ",subject$)

const obsA = subject$.subscribe(val => print(`Sub A: ${val}`))
const obsB = subject$.subscribe(val => print(`Sub B: ${val}`))


subject$.next("Hello")

setTimeout(() => {
  subject$.next("world")
},1000)

