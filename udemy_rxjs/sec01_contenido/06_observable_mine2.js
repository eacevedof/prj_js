//node 06_observable_mine2.js

const arStream = ["v1","v2","v3","v4","v5"]
arStream.__proto__.subscribe = function(observer){
  console.log("obsparam",observer,"typeof:",typeof observer) 
  //que transformación hace aqui subscribe para cambiar la funcion
  //en un observer object de modo que pueda pasar el valor con next?
  arStream.forEach((i)=>{
    //arStream.subscribe(objObserver)
    observer.next(i)
  })  
}

const objObserver = {
  next: val => console.log("objObserver.next.val",val),
  error: err => console.log("objObserver.next.err",err),
  complete: () => console.log("...done!")
}

//for(i of arStream) console.log(i)
//arStream.subscribe(objObserver) //ok

arStream.subscribe(x => console.log(x)) //Aqui da error! 
//ya que espera un objObserver con su método next() y recibe una función

//Consulta a Enrique en:
//param:objObserver y fnObserver
//https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648774#questions/8603478
//observable es iterable sin next?
//https://www.udemy.com/course/rxjs-nivel-pro/learn/lecture/13648774#questions/8591230



