console.log("lesson.js")

//[Example 7 - Hot vs Cold](https://youtu.be/2LCo926NFLI?t=213)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//cold observable 
const cold = Rx.Observable.create( observer => {
  observer.next(Math.random()) //  math.random => print("subscriber x: ${math.random()}")
})

cold.subscribe(a => print(`Subscriber cold A: ${a}`))
cold.subscribe(b => print(`Subscriber cold B: ${b}`))

//hot observable. Hace que todos los observers obtenga el mismo valor
const fnrandom = Math.random()

const hot = Rx.Observable.create( observer => {
  observer.next(fnrandom)
})

//No se pq la función externa hace que obtengan el mismo valor ^^
hot.subscribe(a => print(`Subscriber hot A: ${a}`))
hot.subscribe(b => print(`Subscriber hot B: ${b}`))

