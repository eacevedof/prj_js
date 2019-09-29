//014_currying.js https://youtu.be/HvMemAgOw6I?t=2162
//currying devolucion de funciones con 1 parámetro
const add = x => y => x + y;

function add(x){
    return function(y){
        return x+y
    }
}//add

const request = defaults => options => {
    options = Object.assign({},defaults,options)
    return fetch(options.url, options).then(resp=>resp.json())
}//request


