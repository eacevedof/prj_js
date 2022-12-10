//https://adventjs.dev/es/challenges/2022/4
//reto-04-caben-en-una-caja.ts
var BOXES = [
    { l: 1, w: 1, h: 1 },
    { l: 3, w: 3, h: 3 },
    { l: 2, w: 2, h: 2 },
    { l: 8, w: 2, h: 1 },
    { l: 1, w: 2, h: 8 },
    { l: 10, w: 4, h: 9 },
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
    console.log(boxes);
    var some = boxes.some(function (boxBig, i) {
        return boxes.some(function (boxSmall, j) {
            if (i >= j)
                return false;
            var nofit = (boxBig.h <= boxSmall.h || boxBig.w <= boxSmall.w || boxBig.l <= boxSmall.l);
            if (nofit) {
                console.log("no-fit big i:", boxBig, "small j:", boxSmall, i, j);
            }
            return nofit;
        });
    });
    return !some;
}
var fitall = fitsInOneBox(BOXES);
console.log("fit all?: ", fitall);
