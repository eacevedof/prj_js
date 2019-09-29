//011_freestate.js https://youtu.be/HvMemAgOw6I?t=1330

//Ejemplo incorrecto:
class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }//constructor

    moveBy(dx,dy){
        this.x += dx
        this.y += dy
    }//moveBy

}//Point

const oPoint = new Point(0,0)

//aqui se está mutando el objeto inicial, se estan cambiando sus propiedades
oPoint.moveBy(5,5)
oPoint.moveBy(-2,2)

//console.log(oPoint.x,oPoint.y) // 3 7

//El ejemplo en programación funcional
//https://youtu.be/HvMemAgOw6I?t=1383

const fnCreatePoint = (x,y)=>Object.freeze([x,y])//devuelve un array inmutable

//lee un array de dos elementos y dos puntos nuevos
const fnMovePoint = ([x,y],dx,dy) => {
    return Object.freeze([x+dx,y+dy])
}

//arPoint es un array inmutable
let arPoint = fnCreatePoint(0,0)
console.log("arPoint 1:",arPoint);// [0,0]
//lee arPoint y devuelve un nuevo array a partir de estos datos
arPoint = fnMovePoint(arPoint,5,5)
console.log("arPoint 2:",arPoint);//[ 5, 5 ]
arPoint = fnMovePoint(arPoint,-2,2)
console.log("arPoint 3:",arPoint) //[ 3, 7 ]