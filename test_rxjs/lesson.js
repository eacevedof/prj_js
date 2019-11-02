console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 25 - .multicast()](https://youtu.be/2LCo926NFLI?t=843)

//observable de document.click
const event$ = Rx.Observable.fromEvent(document, "click")

const clicks$ = event$ //on document click
                  .do(objevent => print("do One Time!. Event: "+objevent.toString()))

//el click se publique como multicast (se necesita un topic)
//multicast: multicast: Share source utilizing the provided Subject.
const subject$ = clicks$.multicast(()=> new Rx.Subject())

const obsA = subject$.subscribe(objevent => print(`Sub A: ${objevent.timeStamp}`))
const obsB = subject$.subscribe(objevent => print(`Sub B: ${objevent.timeStamp}`))

subject$.connect()
              