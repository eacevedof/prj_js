console.log("lesson.js")

//[Example 17 - .scan()](https://youtu.be/2LCo926NFLI?t=518)
//https://www.learnrxjs.io/operators/transformation/scan.html
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


//clicks: FromEventObservable
const clicks = Rx.Observable.fromEvent(document, "click")
console.log("clicks: ",clicks," typeof clicks: ",typeof clicks)

const observer = clicks
                    //interval: emit value in sequence every 1 second
                    .switchMap(click => Rx.Observable.interval(1000))
                    .subscribe(iIterval => print(`interval value: ${iIterval}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
