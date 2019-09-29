//007_classes.js https://youtu.be/HvMemAgOw6I?t=734
//Es azucar sintactico
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

// function Point(x,y){
//     this.x = x
//     this.y = y
// }//Point

// Point.prototype.moveBy = function(dx,dy){
//     this.x += dx
//     this.y += dy
// }//moveBy

const oPoint = new Point(3,4)
oPoint.moveBy(5,7)
console.log(oPoint) //Point { x: 8, y: 11 }
