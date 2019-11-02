console.log("lesson.js")

function print(strvalue){
  console.log("print.strvalue",strvalue)
  let el = document.createElement("p")
  el.innerText = strvalue
  //document.body.appendChild(el)
  document.getElementById("blog-post").appendChild(el)
}


// [Example 20 - takeWhile()](https://youtu.be/2LCo926NFLI?t=639)

//names$: ArrayObservable
const names$ = Rx.Observable.of("Bob","Jeff","Doug","Steve")
console.log("names$ : ",names$ ," typeof obsenames$: ",typeof names$ )

const observer = names$
                  .takeWhile(name => name!="Doug")
                  .finally(() => print("Complete! I found Doug"))
                  .subscribe( name => print(name)) //los nombres que no son Doug

console.log("observer: ",observer," typeof observer: ",typeof observer)
