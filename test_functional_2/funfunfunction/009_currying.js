import _ from "lodash"

//babel 009_currying.js --out-file compiled.js; node compiled.js;
console.log("Video 7: https://youtu.be/iZLP4qOwY8I?t=251")
console.log("009_currying.js 1.0.0")


let fn_dragon = (name,size,element)  => 
    name + " is a" +
    size + " dragon that breathes " +
    element + "!"

fn_dragon = _.curry(fn_dragon)

let fn_fluffykin = fn_dragon("fluffykins")
let fn_element = fn_fluffykin("tiny")


console.log(fn_element("WatEr :)"))