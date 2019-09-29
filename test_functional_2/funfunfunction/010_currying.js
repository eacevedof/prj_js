import _ from "lodash"

//babel 010_currying.js --out-file compiled.js; node compiled.js;
console.log("Video 7: https://youtu.be/iZLP4qOwY8I?t=300")
console.log("010_currying.js 1.0.0")

let arDragons = [
    { name: "fluffykins", element: "lightning"},
    { name: "noomi", element: "lightning"},
    { name: "karo", element: "fire"},
    { name: "doomer", element: "timewarp"}
]

let hasElement = _.curry((element, obj) => obj.element === element)

let arDragonsLight = arDragons.filter(x=>hasElement("lightning",x))

console.log(arDragonsLight)