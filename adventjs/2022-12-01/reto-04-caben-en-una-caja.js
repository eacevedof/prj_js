//https://adventjs.dev/es/challenges/2022/4
//reto-04-caben-en-una-caja.ts
function fitsInOneBox(boxes) {
    if (!boxes)
        return false;
    if (boxes.length === 1)
        return true;
    var sortDescBySize = function (box1, box2) {
        /**  if (a is less than b by some ordering criterion) {
          return -1;
        }
        if (a is greater than b by the ordering criterion) {
          return 1;
        } */
        return (box2.l + box2.h + box2.w) - (box1.l + box1.h + box1.w);
    };
    boxes.sort(sortDescBySize);
    console.log("sorted", boxes);
    var fitBoxInOther = function (boxBig, boxSmall) {
        return (boxBig.h <= boxSmall.h ||
            boxBig.w <= boxSmall.w ||
            boxBig.l <= boxSmall.l);
    };
    var isBiggerThanRest = function (boxCheck, boxes) {
        var someDoesNotFit = boxes.some(function (boxI) { return !fitBoxInOther(boxCheck, boxI); });
        return !someDoesNotFit;
    };
    var unfit = [];
    boxes.forEach(function (boxI, i) {
        var restOfBoxes = boxes.slice(i + 1);
        if (!restOfBoxes)
            return;
        if (!isBiggerThanRest(boxI, restOfBoxes)) {
            console.log("restOfBoxes", restOfBoxes);
            unfit.push(boxI);
        }
    });
    console.log({ boxes: boxes, unfit: unfit });
    return (unfit.length === 0);
}
var BOXES = [
    { l: 1, w: 1, h: 1 },
    { l: 2, w: 2, h: 2 }
];
var fitall = fitsInOneBox(BOXES);
console.log("fit all?: ", fitall);
