//node 06_observable_mine2.js

const arStream = ["v1","v2","v3","v4","v5"]
arStream.__proto__.subscribe = function(observer){
  console.log("obsparam",observer,"typeof:",typeof observer) 
  //que transformación hace aqui subscribe para cambiar la funcion
  //en un observer object de modo que pueda pasar el valor con next?
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
//arStream.subscribe(obsver) //ok
arStream.subscribe(x => console.log(x)) //ok



