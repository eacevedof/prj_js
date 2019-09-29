import _ from "lodash"

//babel 008_currying.js --out-file compiled.js; node compiled.js;
console.log("Video 6: https://youtu.be/iZLP4qOwY8I")
console.log("008_currying.js 1.0.0")

let fn_dragon = (name,size,element)  => 
    name + " is a" +
    size + " dragon that breathes " +
    element + "!"

console.log(fn_dragon("fluffykins","tiny","lighting"))


fn_dragon = 
    name => 
        size => 
            element => 
                name + " is a" +
                size + " dragon that breathes " +
                element + "!"
                
console.log(fn_dragon("fluffykins")("big")("fire"))

let fn_fluffykin = fn_dragon("fluffykins")
let fn_element = fn_fluffykin("tiny")


console.log(fn_element("WatEr :)"))