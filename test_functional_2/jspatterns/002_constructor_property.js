console.log("002_constructor_property.js 1.0.0","\n");

const oObjectNew = {}
/*
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/defineProperty
Object.defineProperty(obj,prop,descriptor)
*/
const oReturn = Object.defineProperty(oObjectNew,"someKey",{
    value: "some name ", /*cualquier tipo js */
    writable: true,/*true Indica si el valor de la propiedad puede modificarse con el  operador de asignación.
    Defaults to false */
    enumerable: true,/*true: si y solo si dicha propiedad se muestra durante la enumeración de las propiedades del objeto correspondiente.
    Por defecto es false. */
    configurable: true /*true si y solo si el tipo de descriptor de propiedad puede modificarse y si la propiedad puede ser eliminada del correspondiente objeto.
    Por defecto es false. */
})


console.log("oObjectNew:",oObjectNew,"oReturn:",oReturn,"\n")
/*
002_constructor_property.js 1.0.0
oObjectNew: { someKey: 'some name ' } o: { someKey: 'some name ' }
!!!: Es un poco raro, es una constante pero la puede modificar ^^
*/

const _t = {}
/*
!!!Error: _t.prototype.add_prop = ()=>{}

https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript

_t.prototype.add_prop = (oO,sK,mxVal)=>{
__proto__ is the actual object that is used in the lookup chain to resolve methods, etc. 
prototype is the object that is used to build __proto__ when you create an object 
with new:

( new Foo ).__proto__ === Foo.prototype
( new Foo ).prototype === undefined

prototype is a property of a Function object. It is the prototype of objects constructed by that function.
__proto__ is internal property of an object, pointing to its prototype. 
Current standards provide an equivalent Object.getPrototypeOf(O) method, 
though de facto standard __proto__ is quicker.

You can find instanceof relationships by comparing a function's prototype to an object's __proto__ chain, 
and you can break these relationships by changing prototype.

*/
console.log("_t:",_t)
_t.prop_x = (x)=>{console.log(x)}
console.log("_t 2:",_t,"\n")

console.log("_t.__proto__:",_t.__proto__)
_t.__proto__.add_prop = (oO,sK,mxVal)=>{
    let oConfig = {
        value: mxVal,
        writable: true,
        enumerable:true,
        configurable:true
    }
    Object.defineProperty(oO,sK,oConfig)
    console.log("prop added:".concat(sK).concat(":"),oConfig.value)
    return true
}
console.log("_t.__proto__ 2:",_t.__proto__,"\n")

const oHero = {}
console.log("oHero:",oHero)
_t.add_prop(oHero,"power_1","x ray")
console.log("oHero:",oHero)
_t.add_prop(oHero,"power_2","force")
console.log("oHero:",oHero)

/**
 oObjectNew: { someKey: 'some name ' } oReturn: { someKey: 'some name ' }

_t: {}
_t 2: { prop_x: [Function] }

_t.__proto__: {}
_t.__proto__ 2: { add_prop: [Function] }

oHero: {}
prop added:power_1: x ray
oHero: { power_1: 'x ray' }
prop added:power_2: force
oHero: { power_1: 'x ray', power_2: 'force' }
 */