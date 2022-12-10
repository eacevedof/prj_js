//https://adventjs.dev/es/challenges/2022/4
//reto-03-cuantas-cajas-de-regalos-puede-llevar-papa-noel.ts
var BOXES = [
    { l: 1, w: 1, h: 1 },
    { l: 3, w: 3, h: 3 },
    { l: 2, w: 2, h: 2 },
    { l: 8, w: 2, h: 1 },
    { l: 1, w: 2, h: 8 },
    { l: 10, w: 4, h: 9 },
    { l: 4, w: 10, h: 9 },
];
function fitsInOneBox(boxes) {
    if (!boxes)
        return false;
    if (boxes.length === 1)
        return true;
    var sort_desc = function (box1, box2) {
        /**  if (a is less than b by some ordering criterion) {
          return -1;
        }
        if (a is greater than b by the ordering criterion) {
          return 1;
        } */
        return (box2.l + box2.h + box2.w) - (box1.l + box1.h + box1.w);
    };
    boxes.sort(sort_desc);
    var bigone = boxes[0];
    console.log("bigone", bigone);
    boxes.shift();
    var some = boxes.some(function (box) {
        if (bigone.h <= box.h || bigone.w <= box.w || bigone.l <= box.l)
            console.log("wrong-box", box);
        return (bigone.h <= box.h || bigone.w <= box.w || bigone.l <= box.l);
    });
    return !some;
}
var fitall = fitsInOneBox(BOXES);
console.log("fit all?: ", fitall);
