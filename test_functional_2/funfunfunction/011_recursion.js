//babel 011_recursion.js --out-file compiled.js; node compiled.js;
console.log("Video 8: https://youtu.be/k7-N8R0-KY4")
console.log("011_recursion.js 1.0.0")

let fn_decrease = (iNum) => {
    if(iNum===0) return;
    console.log(iNum)
    fn_decrease(iNum-1)
}

fn_decrease(10)