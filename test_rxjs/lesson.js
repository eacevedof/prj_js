console.log("lesson.js")

//[Example 4 - Rx.Observable.timer()](https://youtu.be/2LCo926NFLI?t=147)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//observer timer
const timer = Rx.Observable.timer(1000)

//observer
timer.subscribe(idone => print("after 1 second. done:"+idone))