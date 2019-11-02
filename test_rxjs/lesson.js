console.log("lesson.js")

//[Example 12 map and json](https://youtu.be/2LCo926NFLI?t=359)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//names: ArrayObservable 
const names = Rx.Observable.of("Simon","Garfunle")

console.log("names: ",names)

//cada item "name" pasa por toda la pila primero y despues continua el siguiente
//observer: Subscriber 
const observer = names
  .do(name => print(name))          //simon
  .map(name => name.toUpperCase())  
  .do(name => print(name))          //SIMON
  .subscribe()

console.log("observer: ",observer,"typeof observer: ",typeof observer)