//https://adventjs.dev/es/challenges/2022/4
//reto-03-cuantas-cajas-de-regalos-puede-llevar-papa-noel.ts

interface IBox {
  l: number,
  w: number,
  h: number,
}

const BOXES:Array<IBox> = [
  { l: 1, w: 1, h: 1 },
  { l: 3, w: 3, h: 3 },
  { l: 2, w: 2, h: 2 },
  { l: 8, w: 2, h: 1 },
  { l: 1, w: 2, h: 8 },
  { l: 10, w: 4, h: 9 },
  { l: 4, w: 10, h: 9 },

]

function fitsInOneBox(boxes: Array<IBox>):boolean {
  if (!boxes) return false
  if (boxes.length === 1) return true
  
  const sort_desc = (box1:IBox,box2:IBox):number => {
    /**  if (a is less than b by some ordering criterion) {
      return -1;
    }
    if (a is greater than b by the ordering criterion) {
      return 1;
    } */
    return (box2.l + box2.h + box2.w) - (box1.l + box1.h + box1.w)
  }

  boxes.sort(sort_desc)
  const bigone = boxes[0]
  console.log("bigone", bigone)
  boxes.shift()
  
  const some = boxes.some( (box:IBox) => {
    if (bigone.h <= box.h || bigone.w <= box.w || bigone.l <= box.l)
      console.log("wrong-box", box)
    return (bigone.h <= box.h || bigone.w <= box.w || bigone.l <= box.l)
  })  
  return !some
}

const fits:boolean = fitsInOneBox(BOXES)
console.log("fits:",fits)