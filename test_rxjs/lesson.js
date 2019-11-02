console.log("lesson.js")

//[Example 15 .first() .last()](https://youtu.be/2LCo926NFLI?t=434)
function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}

// numbers: ArrayObservable
const numbers = Rx.Observable.of(-3, 5, 7, 2, -7, 9, -2)
console.log("numbers: ",numbers," typeof numbers: ",typeof numbers)

// observer: Subscriber
const observer = numbers
                      .do(n => print(`number: ${n}`))
                      //todas las acciones despues de first solo se ejecutarán si se cumple esto
                      .first()
                      //.last() //quedaría invalidado por first
                      //solo se imprimirá first si se cumple la condición previa "is_first"
                      .subscribe( n => print(`first: ${n}`))
                      //esto no se ejecutaria ya que despues del subscribe no se puede agregar nada 
                      //... eso creo :) ^^
                      //.last()
                      //.subscribe( n => print(`last: ${n}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
