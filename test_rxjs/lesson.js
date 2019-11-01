console.log("lesson.js")

//[Example 3 - Trabajando con js asincrono y promises](https://youtu.be/
function print(strvalue){
  let el = document.createElement("p")
  el.innerText = strvalue
  document.body.appendChild(el)
}

const objpromise = new Promise((fnresolve, fnreject)=>{
  setTimeout(()=>{
    fnresolve("resolved!") //print("resolved!")
  },3000)
})

const obsPromise = Rx.Observable.fromPromise(objpromise)

// strresult => print(strresult) => fnresolve
obsPromise.subscribe(stresult => print(stresult))
