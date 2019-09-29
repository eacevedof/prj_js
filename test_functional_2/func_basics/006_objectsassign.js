//006_objectsassign.js https://youtu.be/HvMemAgOw6I?t=688
//Object.assign hace un merge de objetos clave,vlaor
const oMergedKeyVal = Object.assign(
    {a:"b"},
    {hello:"Chattanooga"},
    {hi:"Scenic City Summit"},
    {hi:"Scenic City 2",bye:"puppy",o:{}}
)

console.log(oMergedKeyVal)
/*
{ a: 'b',
  hello: 'Chattanooga',
  hi: 'Scenic City 2',
  bye: 'puppy',
  o: {} }
*/