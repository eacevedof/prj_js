console.log("lesson.js")

//[Example 8 - Otra forma de hacer un hot observable](https://youtu.be/2LCo926NFLI?t=260)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//hay otra forma de hacer un hot observable sin desacoplar los datos del mismo observer
const cold = Rx.Observable.create( observer => {
  //observer: Subscriber.  Es una función genradora por eso acepta .next(value)
  console.log("observer: ",observer,", typeof:",typeof observer)
  console.log("math.random:",Math.random(),"typeof:",typeof Math.random())
  observer.next(Math.random())
})
//cold: Observable 
console.log("cold:",cold," typeof:",typeof cold)

//hot: ConnectableObservable 
const hot = cold.publish()
console.log("hot:",hot," typeof:",typeof hot)

hot.subscribe(a => print(`Subscriber hot A: ${a}`))
hot.subscribe(b => print(`Subscriber hot B: ${b}`))
hot.connect()
