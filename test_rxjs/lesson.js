console.log("lesson.js")

//[Example 11 - .map()](https://youtu.be/2LCo926NFLI?t=339)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

const numbers = Rx.Observable.of(10,100,1000)

numbers
  .map(num => Math.log(num))
  //el observer (la func print) se ejecutará en cada iteración
  .subscribe(i => print(`this is i: ${i}`))