//03_patron_iterador_b.js

let itArray = [1,2,3,4,5]
itArray[Symbol.iterator] = function*(){
    let i = 0
    for(i=0; i<itArray.length; i++)
        yield itArray[i]
}


let objiter = itArray[Symbol.iterator]()
console.log("objiter:",objiter)
for (i of objiter)
    console.log("i in obj",i)


const arArray = [1,2,3,4,5]
for(j of arArray)
    console.log("j in obj",j)

/*
//son lo mismo:

$ node 03_patron_iterador_b.js
objiter: Object [Generator] {}
i in obj 1
i in obj 2
i in obj 3
i in obj 4
i in obj 5
j in obj 1
j in obj 2
j in obj 3
j in obj 4
j in obj 5
*/