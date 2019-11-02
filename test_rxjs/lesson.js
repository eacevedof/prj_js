console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 23 - .catch()](https://youtu.be/2LCo926NFLI?t=726)

const create$ = Rx.Observable.create( observer => {
  observer.next("good")
  observer.next("great")
  observer.next("grand")

  throw "catch me!"

  observer.next("wonderful")
})
console.log("create$: ",create$," typeof create$: ",typeof create$)

create$
  .catch( err => print(`Error caught: ${err}`))
  .subscribe( val => print(val))