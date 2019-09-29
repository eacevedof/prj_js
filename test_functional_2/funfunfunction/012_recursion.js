//babel 012_recursion.js --out-file compiled.js; node compiled.js;
console.log("Video 8: https://youtu.be/k7-N8R0-KY4")
console.log("012_recursion.js 1.0.0")

let arCategories = [
    { id:"animals", "parent":null },
    { id:"mamals", "parent":"animals" },
    { id:"cats", "parent":"mamals" },
    { id:"dogs", "parent":"mamals" },
    { id:"chihuahua", "parent":"dogs" },
    { id:"labrador", "parent":"dogs" },
    { id:"persian", "parent":"cats" },
    { id:"siamese", "parent":"cats" },
]

let get_tree = (arCategories,sParent) => {
    let oNode = {}//objeto acumulador
    arCategories
        .filter(oItem=>oItem.parent===sParent)//devuelve array con los items con "parent" "sParent"
        //para cada item
        .forEach(
            oItem=>
                oNode[oItem.id] = get_tree(arCategories,oItem.id)
        )
    return oNode
}

console.log(JSON.stringify(get_tree(arCategories,null),null,2))


/*
{
    animals:{
        dogs: {
            chihuahua:null
            labrador:null
        }
    }
}
*/

//console.log(arCategories)