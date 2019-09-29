//013_pipeoperator.js 2.1.2
//https://youtu.be/dYQIkV2L-eg?t=728
const R = require("ramda")
const _ = require("lodash")

const fn_doublesay = sString => sString.concat(",").concat(sString)
const fn_appendchar = (c,str) => (str != undefined)?str.concat(c):""
//const fn_exclaim = sString => fn_appendchar("!",sString)

const sGreet = R.pipe(
    fn_doublesay,
    _.capitalize,
    str => fn_appendchar("!",str)
)("Hi 5")

console.log("013_pipeoperator.js QUOKKA.JS 1.0.84")
console.log(sGreet)