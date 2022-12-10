//https://adventjs.dev/es/challenges/2022/4
//reto-04-caben-en-una-caja.ts
function fitsInOneBox(boxes) {
    if (!boxes) return false;
    if (boxes.length === 1) return true;

    const sort_desc = function (box1, box2) {
        return (box2.l + box2.h + box2.w) - (box1.l + box1.h + box1.w);
    };

    boxes.sort(sort_desc);
    const some = boxes.some(function (boxBig, i) {
        return boxes.some(function (boxSmall, j) {
            if (i >= j) return false;
            const nofit = (
                boxBig.h <= boxSmall.h || 
                boxBig.w <= boxSmall.w || 
                boxBig.l <= boxSmall.l
            );
            return nofit;
        });
    });
    return !some;
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
