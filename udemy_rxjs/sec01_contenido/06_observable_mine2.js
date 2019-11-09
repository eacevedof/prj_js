//node 06_observable_mine2.js

const arStream = ["v1","v2","v3","v4","v5"]
arStream.__proto__.subscribe = function(observer){
  console.log("obsparam",observer)
  arStream.forEach((i)=>{
    //arStream.subscribe(obsver)
    observer.next(i)
  })  
}

const obsver = {
  next: val => console.log("obsver.next.val",val),
  error: err => console.log("obsver.next.err",err),
  complete: () => console.log("...done!")
}

//for(i of arStream) console.log(i)
arStream.subscribe(obsver)


