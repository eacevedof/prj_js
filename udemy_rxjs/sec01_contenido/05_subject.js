//node 05_subject.js
const { interval,Subject } = require("rxjs");
const { map } = require("rxjs/operators")


const observrnd = interval(1000).pipe(map(n => {console.log("n:",n);return Math.random()}))

//subject hereda de observer, por eso permite la subscripcion
const objsubject = new Subject()
observrnd.subscribe(objsubject)

const fn_observer1 = n => console.log("obs1: ",n)
const fn_observer2 = n => console.log("obs2: ",n) 

//en lugar de subscribirme a observer me suscribo a subject (el hub)
//subject hace multicast del observable al que está subscrito
const subs1 = objsubject.subscribe(fn_observer1)
const subs2 = objsubject.subscribe(fn_observer2)

//esto no detiene el interval
setTimeout(() => {
    subs1.unsubscribe()
    subs2.unsubscribe() 
    //objsubject.unsubscribe() //da error
  },4000)

/*
$ node 05_subject.js
n: 0
obs1:  0.3216322350659291
obs2:  0.3216322350659291
n: 1
obs1:  0.12399099073131925
obs2:  0.12399099073131925
n: 2
obs1:  0.5425679400359618
obs2:  0.5425679400359618
*/