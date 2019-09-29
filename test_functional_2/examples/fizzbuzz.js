//fizzbuzz.js
//https://gist.github.com/jaysonrowe/1592432
//https://youtu.be/YU2i3L-euB0?t=2594
// for (var i=1; i <= 20; i++)
// {
//     if (i % 15 == 0)
//         console.log("FizzBuzz");
//     else if (i % 3 == 0)
//         console.log("Fizz");
//     else if (i % 5 == 0)
//         console.log("Buzz");
//     else
//         console.log(i);
// }

function pr(str){console.log(str)}

function is_15(i){
    return (i%15==0)
}

function is_3(i){
    return (i%3==0)
}

function is_5(i){
    return (i%5==0)
}


function fizzbuzz(i){
    return (is_15(i)?pr(i+": FizzBuzz"):(
        is_3(i)?pr(i+": Fizz"):(is_5(i)?pr(i+": Buzz"):pr(i))
        ))
}


for (var i=1; i <= 20; i++)
    fizzbuzz(i)


