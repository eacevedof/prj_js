console.log("lesson.js")

//[Example 3 - Trabajando con js asincrono y promises](https://youtu.be/
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

//=====================================================================
//Ejemplo1: 
const objpromise = new Promise((fnresolve, fnreject)=>{
  setTimeout(()=>{
    fnresolve("resolved!") //print("resolved!")
  },3000)
})

//se hace promise observable
const obsPromise = Rx.Observable.fromPromise(objpromise)
//se le configura un observer
obsPromise.subscribe(stresult => print(stresult))

//=====================================================================
//Ejemplo 2: Fetch json
const objpromise2 = new Promise((fnresolve, fnreject) => fetch("http://json.theframework.es/index.php?getfile=app_product.json")
                                  .then(fnresolve)
                                  .catch(fnreject))
                                  
const obsPromise2 = Rx.Observable.fromPromise(objpromise2)
obsPromise2.subscribe(objpromise => objpromise.json().then(strjon => print(JSON.stringify(strjon))))
