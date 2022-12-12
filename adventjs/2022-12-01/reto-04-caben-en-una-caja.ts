//https://adventjs.dev/es/challenges/2022/4
//reto-04-caben-en-una-caja.ts

interface IBox {
  l: number,
  w: number,
  h: number,
}

function fitsInOneBox(boxes: Array<IBox>): boolean {
  if (!boxes || boxes.length === 0) return false;

  const sortDescBySize = (box1: IBox, box2: IBox): number => {
    return (box2.l + box2.h + box2.w) - (box1.l + box1.h + box1.w);
  }

  boxes.sort(sortDescBySize);

  const smallDoesNotFit = (boxBig: IBox, boxSmall: IBox): boolean => {
    return (
      boxBig.h <= boxSmall.h ||
      boxBig.w <= boxSmall.w ||
      boxBig.l <= boxSmall.l
    );
  }

  const isBiggerThanRest = (boxCheck: IBox, restOfBoxes: Array<IBox>): boolean => {
    return !restOfBoxes.some(boxI => smallDoesNotFit(boxCheck, boxI));
  }

  const unfit: Array<IBox> = [];
  boxes.forEach((boxI: IBox, i: number): void => {
    const restOfBoxes: Array<IBox> = boxes.slice(i + 1);
    if (!restOfBoxes) return;
    if (!isBiggerThanRest(boxI, restOfBoxes)) {
      unfit.push(boxI);
    }
  });

  return unfit.length === 0;
}

const BOXES:Array<IBox> = [
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 }
]

const fitall:boolean = fitsInOneBox(BOXES)
console.log("fit all?: ",fitall)