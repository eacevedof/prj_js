//https://adventjs.dev/es/challenges/2022/4
//reto-04-caben-en-una-caja.ts

interface IBox {
  l: number,
  w: number,
  h: number,
}

function fitsInOneBox(boxes: Array<IBox>):boolean {
  if (!boxes) return false
  if (boxes.length === 1) return true
  
  const sortDescBySize = (box1:IBox,box2:IBox):number => {
    /**  if (a is less than b by some ordering criterion) {
      return -1;
    }
    if (a is greater than b by the ordering criterion) {
      return 1;
    } */
    const totalBox2 = (box2.l + box2.h + box2.w)
    const totalBox1 = (box1.l + box1.h + box1.w)
    return totalBox2 - totalBox1
  }

  boxes.sort(sortDescBySize)
  //console.log("sorted",boxes)
  
  const smallDoesNotFit = (boxBig:IBox, boxSmall:IBox):boolean =>  {
    return (
      boxBig.h <= boxSmall.h || 
      boxBig.w <= boxSmall.w || 
      boxBig.l <= boxSmall.l
    )
  }

  const isBiggerThanRest = (boxCheck:IBox, restOfBoxes:Array<IBox>):boolean => {
    const someDoesNotFit:boolean = restOfBoxes.some(
      (boxI:IBox) => smallDoesNotFit(boxCheck, boxI)
    )
    return !someDoesNotFit
  }

  const unfit: Array<IBox> = []
  boxes.forEach((boxI:IBox, i:number):void => {
    const restOfBoxes: Array<IBox> = boxes.slice(i+1)
    if (!restOfBoxes) return
    if (!isBiggerThanRest(boxI, restOfBoxes)) {
      //console.log("restOfBoxes",restOfBoxes,"boxi",boxI)
      unfit.push(boxI)
    }
  })

  //console.log({boxes, unfit})
  return (unfit.length===0)
}

const BOXES:Array<IBox> = [
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 }
]

const fitall:boolean = fitsInOneBox(BOXES)
console.log("fit all?: ",fitall)