console.log("lesson.js")

//[Example 10 - Interval unsubscribe](https://youtu.be/2LCo926NFLI?t=315)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//interval: IntervalObservable
const interval = Rx.Observable.interval(500)
console.log("interval: ",interval," typeof: ",typeof interval)

interval
    .finally(() => print("All done!"))

//subscriber: Subscriber
const subscriber = interval.subscribe(x => print(x))
console.log("subscriber: ",subscriber," typeof: ",typeof subscriber)

setTimeout(()=>{
  //se finaliza la observación
  subscriber.unsubscribe()
}, 3000)