//008_functions_pure https://youtu.be/HvMemAgOw6I?t=794
//una entrada genera la misma salida
//no tiene efectos colaterales

const add = (x,y) => x + y

console.log(add(2,3)===5)
console.log(add(2,3)===5)
console.log(add(2,3)===5)


//impuro
let name = "Eduardo"

//getName es impura pq depende de una variable global, si esta cambia no devuelve lo mismo
const getName = () => name
//setName es impura pq cambia el valor de la variable "name"
const setName = (newName) => name = newName
//tecnicamente es impura pq con console.log() estamos cambiando un valor global
const printUpperName = () => console.log(name.toUpperCase())

printUpperName();

//https://youtu.be/HvMemAgOw6I?t=929
//un estado oculto es un estado impredecible
//cual es la gravedad de trabajar con funciones impuras:
describe("api",()=>{

    beforeEach(()=>mockConsoleLog())
    
    afterEach(()=>restoreConsoleLog())

    //se va cambiando el parametro pasado a console.log y finalmente no se sabe que es
    //lo que va a imprimir ya que esto se hace de modo asincrono
    it("sets and prints the name",()=>{
        printUpperName(),
        expect(console.log).calledWith("EDUARDO")
        setName("Alex")
        printUpperName();
        expect(console.log).calledWith("ALEX")
    })//it
})//describe

//ejemplo correcto
const upperName = (name)=name.toUpperCase()

describe("api",()=>{
    it("returns an upper case name",()=>{
        expect(upperName("Eduardo")).to.equal("EDUARDO")
        expect(upperName("Alex")).to.equal("ALEX")
    })
})//describe