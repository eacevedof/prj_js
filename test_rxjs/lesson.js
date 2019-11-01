console.log("lesson.js")

//[Example 5 Rx.Observable.interval()](https://youtu.be/2LCo926NFLI?t=163)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//observable tipo interval
//mashup = triturar
const mashup = Rx.Observable.of("anything",["you","want"],23,true,{cool:"stuff"})
//observer
mashup.subscribe(strval => print(strval))
