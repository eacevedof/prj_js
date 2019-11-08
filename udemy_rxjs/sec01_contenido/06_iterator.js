import { Observable } from "rxjs"

//node 06_iterator.js
//Observables work like iterators

//iterator
while(iterator.hasNext()){
  let value = iterator.next()
  console.log(value)
}

//un observer no es un iterador pero se comporta como tal
Observable.create((observer)=>{
  observer.next("value1")
  observer.next("value2")
  observer.complete()
})