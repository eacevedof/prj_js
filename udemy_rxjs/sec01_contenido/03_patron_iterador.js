//03_patron_iterador.js

//código que no funciona
let itArray = new IterableList(1,2,3,4,5)
let objiterator = itArray.iterator()

while(objiterator.hasNext()){
    console.log("objiterator.next()",objiterator.next())
}