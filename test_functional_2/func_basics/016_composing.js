//016_composing.js https://youtu.be/HvMemAgOw6I?t=2511
//_.compose 
const processWord = compose(hyphenate,reverse,toUpperCase)

const words = [
    "hello", "functional", "programming"
]

const newWords = words.map(processWord)
console.log(newWords) //['OL-LEH','LANOI-TCNUF','GNIMM-ARGORP']

const processWordExplicit = (word)=>{
    return hyphenate(reverse(toUpperCase(word)))
}

//Aplicando la composicion al ejemplo de la shopping
//si nos fijamos hemos aplicado fn_map 3 veces, es decir se ha iterado 3 veces con
//fn_map. 
customRequest({url:"/cart/items"})
    .then(fn_map(fn_pluck("price")))
    .then(fn_map(fn_discount))
    .then(fn_map(fn_tax))

customRequest({url:"/cart/items"})
    .then(fn_map(
        _.compose(fn_tax,fn_discount,pluck("price"))
    ))

