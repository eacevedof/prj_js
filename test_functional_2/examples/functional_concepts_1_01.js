//https://www.youtube.com/watch?v=yXJtrxVZmT4

function sq(arNums){
    var i, sum=0, arSqr = []
    
    for(i=0; i<arNums.length; i++)
        arSqr.push(arNums[i]*arNums[i])

    for(i=0; i<arSqr.length; i++)
        sum += arSqr[i]
    return sum
}

var arNumbers = [1,2,3,4,5]
//console.log(sq(arNumbers)) //55

//Ejemplo con map y reduce

var iResult = arNumbers
                .map(function(iItem){
                    return (iItem*iItem)
                })
                .reduce(function(iAcumulator,iItem){
                    console.log("iAcu:",iAcumulator,"iItem:",iItem)
                    return iAcumulator+iItem
                },0)

    
console.log("iResult:",iResult);

iResult = arNumbers
            .map(iItem=>iItem*iItem)
            .reduce((iAcumulator,iItem)=>iAcumulator+iItem)

console.log("iResult arrow:",iResult)

//solución https://youtu.be/yXJtrxVZmT4?t=212
const fnSumsqr = (arNumbers)=>arNumbers
            .map(iN=>iN*iN)
            .reduce((iAcc,iN)=>iAcc+iN,0)

console.log("fnSumsqr:",fnSumsqr)
console.log("Result fnSumsqr:",fnSumsqr(arNumbers))
