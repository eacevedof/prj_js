/*
FUENTE:
Tu código puede ser mejor y puedo demostrarlo matemáticamente
https://youtu.be/WLPVrzrzyLY?t=168

Ejemplo 2 ordenación (sort)
*/

//var arFiltered = []

/*
for(let iItem=0; iItem<arList.length; iItem++)
    if(arList[iItem].age >= 18)
        arFiltered.push(arList[iItem])
*/

//10 valores
var arFiltered = [88,19,34,90,18,41,18,20,22,21]

//supongamos: arFiltered = [88,19,34,90,18,41,18,20,22,21]
/*
https://ozh.github.io/ascii-tables/
+----+----+----+----+----+----+----+----+----+----+
| 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  |
+----+----+----+----+----+----+----+----+----+----+
| 88 | 19 | 34 | 90 | 18 | 41 | 18 | 20 | 22 | 21 |
+----+----+----+----+----+----+----+----+----+----+
*/
var arSorted = []
console.log("arFiltered",arFiltered);
//arFiltered se va recolocando en cada vuelta
for(let i=0; i<arFiltered.length; i++){
    let iLastMax = i
    //este bucle compara 
    for(let j=i; j<arFiltered.length; j++){
        console.log("i:",i,"iLastMax:",iLastMax)
        if(arFiltered[j] > arFiltered[iLastMax])
            iLastMax = j
    }//for(arFiltered)
    //se guarda en la posición i el último mayor encontrado
    arSorted[i] = arFiltered[iLastMax] 
    //el valor del item_i se guarda en la posicion del último mayor encontrado
    //se duplica el valor actual y se pierde el mayor??
    arFiltered[iLastMax] = arFiltered[i]
}//for(arFiltered)

console.log("end arFiltered",arFiltered)
//[88, 19, 34, 19, 18, 19, 18, 18, 18, 18]

console.log("arSorted",arSorted)
//[90, 88, 41, 34, 22, 21, 20, 19, 18, 18]

var arUpper = []
for(let i=0; i<arSorted.length; i++)
    arUpper[i] = arSorted[i]

console.log("arUpper",arUpper)

/**
 * Ahora en funcional:
 * https://youtu.be/WLPVrzrzyLY?t=202
 * min: 3:22
 */

var arFiltered = []
//asumimos que hemos llenado arFiltered con arList[i]>18 así arList.filter(iItem=>iItem>=18)
arFiltered = [88,19,34,90,18,41,18,20,22,21]

var arResult = arFiltered
                //.sort() por defecto hace una ordenación unicode
                //pe: [1, 10, 2, 21] -> [1, 10, 2, 21]
                //sort(f(a,b)): 
                /*
                si f(a,b) < 0 : a se coloca en un indice anterior a b
                si f(a,b) = 0 : no hay cambios
                si f(a,b) > 0 : b se situa en indice anterior a a

                en resumen f(a,b) responde a: A quien coloco antes entre a y b en 
                mi array interno de ordenación.
                */
                .sort((iA,iB)=>{
                    /*
                    +----+----+-----+-----------------------------+
                    | iB | iA |  R  |           Accion            |
                    +----+----+-----+-----------------------------+
                    | 19 | 88 | -69 | iA se coloca antes -> 88,19 |
                    | 34 | 19 |  15 | iB se coloca antes -> 34,19 |
                    | 90 | 34 |  56 | iB -> 90,34                 |
                    | 18 | 90 | -72 | iA -> 90,18                 |
                    | 41 | 18 |  23 | iB -> 41,18                 |
                    | 18 | 41 | -23 | iA -> 41,18                 |
                    | 20 | 18 |   2 | iB -> 20,18                 |
                    | 22 | 20 |   2 | iB -> 22,20                 |
                    | 21 | 22 |  -1 | iA -> 22,21                 |
                    +----+----+-----+-----------------------------+
                    */ 
                    console.log("iB:",iB,"iA:",iA,iB-iA)
                    iB-iA;                    
                })
                .map(iN=>"name_".concat(iN.toString().toUpperCase()))

console.log("arResult",arResult)        
//["name_90", "name_88", "name_41", "name_34", "name_22", … , "name_18"]