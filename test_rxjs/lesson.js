console.log("lesson.js")

//[Example 2 - Observable de evento click](https://youtu.be/2LCo926NFLI?t=80)
function print(val){
  let el = document.createElement("p")
  el.innerText = val
  document.body.appendChild(el)
}

//forma tradicional:
document.addEventListener("click",(click)=>{
  console.log("document.addEventListener.click",click)
})

//con observable
const obsble_documentclick = Rx.Observable.fromEvent(document,"click")
obsble_documentclick.subscribe(obsverclick => console.log("doc_click_subscribe.click:",obsverclick))
