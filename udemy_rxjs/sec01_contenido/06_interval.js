//node 06_interval.js
const { Observable, interval } = require("rxjs")

const observable = my5Interval(5000)
observable.subscribe(x => console.log(x))

function my5Interval(ms){
  return Observable.create(observer => {
    let count = 0
    const id = setInterval(()=>{
      //aqui el observable está haciendo push de un dato al observer
      observer.next(count)
      count++
      if(count>4){
        clearInterval(id)
        observer.complete()
      }
    },ms)
  })
}