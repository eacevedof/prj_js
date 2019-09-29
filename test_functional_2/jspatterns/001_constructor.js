console.log("001_constructor.js 1.0.0")
//https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript

const oObjectLiteral = {}
console.log("oObjectLiteral",oObjectLiteral)

/*
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/create
Object.create(proto [, propertiesObject ])
o = Object.create(Shape.prototype)
o = Object.create({}, { p: { value: 42 } })
*/
const oObjectCreate = Object.create(Object.prototype)
console.log("oObjectCreate",oObjectCreate)

/*
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object
new Object( [ valor ] )
// equivale a o = new Boolean(true);
var o = new Object(true)
var o = new Object(Boolean())
*/
const oObjectNew = new Object()
console.log("oObjectNew",oObjectNew)

/*
001_constructor.js 1.0.0
oObjectLiteral {}
oObjectCreate {}
oObjectNew {}
*/