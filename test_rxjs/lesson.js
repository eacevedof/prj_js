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
                    .map(objevent => parseInt(Math.random() * 10))
                    .do(score => print(`Click scored +${score}`))
                    .scan((acscore, score)=> acscore + score,0) //trabaja como reduce
                    .subscribe(acscore =>  print(`High score ${acscore}`))

console.log("observer: ",observer," typeof observer: ",typeof observer)
