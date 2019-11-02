console.log("lesson.js")

//[Example 16 - .debounce() .throttle()](https://youtu.be/2LCo926NFLI?t=457)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//mouseEvents: FromEventObservable 
let mouseEvents = Rx.Observable.fromEvent(document, "mousemove")
console.log("mouseEvents: ",mouseEvents," typeof mouseEvents: ",typeof mouseEvents)

const observer = mouseEvents
  .debounceTime(1000) //tiempo de suspension. Se suele usar para detectar la inactividad del usuario
  //.throttleTime(1000) //escucha cada segundo, throttleTime "tiempo de regulación ^^"
  .subscribe(objevent => print(`${objevent.type} x:${objevent.clientX} y:${objevent.clientY}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
