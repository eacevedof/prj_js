console.log("lesson.js")

//[Example 5 Rx.Observable.interval()](https://youtu.be/2LCo926NFLI?t=163)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//obsrver tipo interval
const obsbleinterval = Rx.Observable.interval(1000)

obsbleinterval.subscribe(iprocessId => print("iprocessId: "+iprocessId+" - seconds:"+ new Date().getSeconds()))