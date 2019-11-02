console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 19 - .takeUntil()](https://youtu.be/2LCo926NFLI?t=610)
//interval: IntervalObservable 
const interval = Rx.Observable.interval(1000)
console.log("interval: ",interval," typeof interval: ",typeof interval)

//notifier: TimerObservable 
const notifier = Rx.Observable.timer(5000)
console.log("notifier: ",notifier," typeof notifier: ",typeof notifier)


const observer = interval               //intervalo de 1 seg
                  .takeUntil(notifier)  //intervalo cada 5 segundos
                  .finally(() => print("complete")) //cuando llegue a 5 segundos se acaba
                  .subscribe(i => print(i))

  console.log("observer: ",observer," typeof observer: ",typeof observer)
