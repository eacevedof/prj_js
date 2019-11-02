console.log("lesson.js")

//[Example 12 map and json](https://youtu.be/2LCo926NFLI?t=359)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

const strjson = '{"type": "Dog", "breed": "Pug"}'

//crea un iterable: ScalarObservable 
const obsble_apicall = Rx.Observable.of(strjson)
console.log("obsble_apicall: ",obsble_apicall,"typeof obsble_apicall: ",typeof obsble_apicall)

obsble_apicall
  //map en cada vuelta comunicará al observer para que se ejecute
  .map(strjson => JSON.parse(strjson))
  //el observer (la func print) se ejecutará en cada iteración de map
  .subscribe(objson => {
    console.log("objson:",objson)
    console.log("objson typeof:",typeof objson)
    print(objson.type)
    print(objson.breed)
  })