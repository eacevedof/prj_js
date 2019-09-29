console.log("Video 4: https://www.youtube.com/watch?v=1DMolJ2FrNY")
console.log("006_hiorderfunctions_reduce_adv.js 1.0.1")
console.log("Array.prototype.reduce()")
console.log("var resultado = arr.reduce(funcion[, valorInicial]);")

import fs from "fs"

var oCustomersJson = fs.readFileSync("db_customers.txt","utf8")
    .trim()                             //devuelve el texto sin espacios a los lados
    .split("\n")                        //hace un "explode()" del texto, devuelve un array con las lineas. Devuelve un array de strings
    .map(sLine=>sLine.split("\t"))      //recorre el array de lineas y cada linea la transforma en un array de subcadenas haciendo un "explode" por tabulación. Devuelve un array de arrays
    .reduce((oResult,arLine)=>{         //con "reduce" se devolverá el array acumulador oResult con items de objetos customer
        console.log("oResult",oResult)
        console.log("arLine",arLine)    //mi duda tiene que ver con los parametros del lambda, reduce siempre pasara como ultimo argumento el item sobre el que nos encontramos, me refiero a arLine?
        oResult[arLine[0]] = oResult[arLine[0]] || [] //en esta linea se comprueba, si ya existe el objeto result["mark"] se recupera sino se crea como array vacio
        oResult[arLine[0]].push({       //añadimos el objeto, "datos del cliente" y lo añadimos al array
            name: arLine[1],
            price: arLine[2],
            quantity: arLine[3]
        })
        return oResult
    },{})                               //se pasa en modo inicial un objeto acumulador vacio. El equivalente a oResult 
console.log("oCustomersJson",oCustomersJson)
console.log("oCustomersJson",JSON.stringify(oCustomersJson,null,2))

//babel 006_hiorderfunctions_reduce_adv.js --out-file compiled.js; node compiled.js;