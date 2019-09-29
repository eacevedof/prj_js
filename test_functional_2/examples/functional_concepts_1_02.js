//https://youtu.be/yXJtrxVZmT4?t=264

function mysteryOperation(arNums){
    var i, fSum = 0.0, iTally = 0;
    for(i=0; i<arNums.length; i++)
        if(arNums[i]%2===0)
        {
            fSum += arNums[i]/2
            iTally++
        }
   return fSum/iTally
}//mysteryOperation