//012_firstclassfunc.js  https://youtu.be/HvMemAgOw6I?t=1599

const multiply = (x,y)=>x*y
function add(x,y){return x+y}

const addAlias = add

const evens = [1,2,3].map(n=>n*2)

//CLOSURES - Encapsulacion

const createAdder = (x)=>{
    return (y)=> x+y
}

const add3 = createAdder(3)

console.log(add3(2)===5) //true
console.log(add3(3)===6) //true


//EJEMPLO PRÁCTICO
const request = (options)=>{
    //llamada ajax, como segundo parámetro de fetch esta el tipo de llamada get, post etc
    return fetch(options.url, options).then(resp=>resp.json())
}//request

const usersPromise = request({
    url: "/users",
    headers: {"X-Custom":"mykey"}
})//usersPromise

const tasksPromise = request({
    url: "/tasks",
    headers: {"X-Custom":"mykey"}
})//tasksPromise

//EJEMPLO EN CLOSURE
const createRequester = (options)=>{
    return (otherOptions)=>{
        return request(Object.assign(
            {},options,otherOptions
        ))
    }
}//createRequester

const customRequest = createRequester({headers:{"X-custom":"mkey"}})
const usersPromise = customRequest({url:"/users"})
const tasksPromise = customRequest({url:"/tasks"})
