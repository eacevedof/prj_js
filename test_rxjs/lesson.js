console.log("lesson.js")

//[Example 14 .filter()](https://youtu.be/2LCo926NFLI?t=406)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

// numbers: ArrayObservable
const numbers = Rx.Observable.of(-3, 5, 7, 2, -7, 9, -2)
console.log("numbers: ",numbers," typeof numbers: ",typeof numbers)

// observer: Subscriber
const observer = numbers
                      .do(n => print(`handling number: ${n}`))
                      .filter( n => n>=0 )
                      .do(n => print(`filter passed: ${n}`))
                      .subscribe( n => print(n))

console.log("observer: ",observer," typeof observer: ",typeof observer)
