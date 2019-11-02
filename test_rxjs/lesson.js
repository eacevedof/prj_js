console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 21 - .zip](https://youtu.be/2LCo926NFLI?t=668)

//yin$: ArrayObservable
const yin$ = Rx.Observable.of("peanut butter","wine","rainbows")

const yang$ = Rx.Observable.of("jelly","cheese","unicorns").delay(2000)
console.log("yang$: ",yang$," typeof yang$: ",typeof yang$)

const forked$ = Rx.Observable.forkJoin(yin$, yang$)

//despues de que todos los observables anteriores emitan un valor este emite un array
const observer = forked$.subscribe( arr => print(arr))                
