//010.js
//C. Definición en Orden Superior
//https://youtu.be/f4qQN6Mli-M?t=1152

//obj.some_method.apply permite ejecutar una función foranea como si fuera local
//similar_object tiene los mismos atributos que obj
//obj.some_method.apply(similar_object,params) => similar_object.some_method(params)

function once (fn){
  let called = false
  console.log("called?:", called)
  return function(){
    called = true
    console.log("return function this: ",this," arguments:",arguments,"inner func called?:", called)
    return fn.apply(this, arguments)
  }
  
}

const innerfunc = once(function(){
  console.log("anonim args",arguments)
})

innerfunc()

/*
$ node 010.js
return function this:  Object [global] {   
  DTRACE_NET_SERVER_CONNECTION: [Function],
  DTRACE_NET_STREAM_END: [Function],       
  DTRACE_HTTP_SERVER_REQUEST: [Function],  
  DTRACE_HTTP_SERVER_RESPONSE: [Function], 
  ...
 clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setImmediate:
   { [Function: setImmediate] [Symbol(util.promisify.custom)]: [Function] },
  setInterval: [Function: setInterval],
  setTimeout:
   { [Function: setTimeout] [Symbol(util.promisify.custom)]: [Function] } }  arguments: [Arguments] {}  
*/
