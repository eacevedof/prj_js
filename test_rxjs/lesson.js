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
console.log("yin$ : ",yin$ ," typeof yin$: ",typeof yin$ )

const yang$ = Rx.Observable.of("jelly","cheese","unicorns")
console.log("yang$ : ",yang$ ," typeof yang$: ",typeof yang$ )

const zipped$ = Rx.Observable.zip(yin$, yang$)
console.log("zipped$ : ",zipped$ ," typeof zipped$: ",typeof zipped$ )

//despues de que todos los observables anteriores emitan un valor este emite un array
const observer = zipped$.subscribe( arr => print(arr))                
console.log("observer: ",observer," typeof observer: ",typeof observer)
