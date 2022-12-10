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
    return (box2.l + box2.h + box2.w) - (box1.l + box1.h + box1.w)
  }

  boxes.sort(sortDescBySize)
  //console.log(boxes)
  
  const fitBoxInOther = (boxBig:IBox, boxSmall:IBox):boolean =>  {
    return (
      boxBig.h <= boxSmall.h || 
      boxBig.w <= boxSmall.w || 
      boxBig.l <= boxSmall.l
    )
  }

  const isBiggerThanRest = (boxCheck:IBox, boxes:Array<IBox>):boolean => {
    const someDoesNotFit:boolean = boxes.some((boxI:IBox) => !fitBoxInOther(boxCheck, boxI))
    return !someDoesNotFit
  }

  const unfit: Array<IBox> = []
  boxes.forEach((box:IBox, i:number):void => {
    if (i===0) return
    const smallerByPosition: Array<IBox> = boxes.slice(i)
    if (!isBiggerThanRest(box, smallerByPosition)) {
      unfit.push(box)
    }
  })

  console.log({boxes, unfit})
  return (unfit.length===0)
}

const BOXES:Array<IBox> = [
  { l: 1, w: 1, h: 1 },
  { l: 3, w: 3, h: 3 },
  { l: 2, w: 2, h: 2 },
  { l: 8, w: 2, h: 1 },
  { l: 1, w: 2, h: 8 },
  { l: 10, w: 4, h: 9 },
  //{ l: 4, w: 10, h: 9 },
]

const fitall:boolean = fitsInOneBox(BOXES)
console.log("fit all?: ",fitall)