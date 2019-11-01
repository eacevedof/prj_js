console.log("lesson.js")

//[Example 8 - Otra forma de hacer un hot observable](https://youtu.be/2LCo926NFLI?t=260)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//timer: TimerObservable
const timer = Rx.Observable.timer(1000)
console.log("timer:",timer," typeof:",typeof timer)

timer
  .finally(() => print("All done!"))
  .subscribe() //aqui normalmente se incluye un observador ^^^
  //.subscribe(() => print("All done!"))  //esto hace lo mismo. Pq?? ^^

