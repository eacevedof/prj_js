//013_recall.js https://youtu.be/HvMemAgOw6I?t=1873

const createAdder = (x)=>{
    return (y)=>x+y
}

const createRequester = (options)=>{
    return (otherOptions)=>{
        return request(Object.assign(
            {},options,otherOptions
        ))
    }
}

const add = (x,y)=>x+y
const add3 = partial(add,3)
console.log(add3(2) === 5)

const request = (options)=>{
    //llamada ajax, como segundo parámetro de fetch esta el tipo de llamada get, post etc
    return fetch(options.url, options).then(resp=>resp.json())
}//request

const customRequest = partial(request, {headers:{"X-Custom":"mkey"}})

const usersPromise = customRequest({url:"/users"})
const tasksPromise = customRequest({url:"/tasks"})
