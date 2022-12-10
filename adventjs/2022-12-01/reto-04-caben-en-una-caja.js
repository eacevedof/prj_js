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
    //console.log(boxes)
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
    boxes.forEach(function (box, i) {
        if (i === 0)
            return;
        var smallerByPosition = boxes.slice(i);
        if (!isBiggerThanRest(box, smallerByPosition))
            unfit.push(box);
    });
    console.log({ boxes: boxes, unfit: unfit });
    return (unfit.length === 0);
}
var BOXES = [
    { l: 1, w: 1, h: 1 },
    { l: 3, w: 3, h: 3 },
    { l: 2, w: 2, h: 2 },
    { l: 8, w: 2, h: 1 },
    { l: 1, w: 2, h: 8 },
    { l: 10, w: 4, h: 9 },
];
var fitall = fitsInOneBox(BOXES);
console.log("fit all?: ", fitall);
