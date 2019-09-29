"use strict";

//babel 012_recursion.js --out-file compiled.js; node compiled.js;
console.log("Video 8: https://youtu.be/k7-N8R0-KY4");
console.log("012_recursion.js 1.0.0");

var arCategories = [{ id: "animals", "parent": null }, { id: "mamals", "parent": "animals" }, { id: "cats", "parent": "mamals" }, { id: "dogs", "parent": "mamals" }, { id: "chihuahua", "parent": "dogs" }, { id: "labrador", "parent": "dogs" }, { id: "persian", "parent": "cats" }, { id: "siamese", "parent": "cats" }];

var get_tree = function get_tree(arCategories, sParent) {
    var oNode = {}; //objeto acumulador
    arCategories.filter(function (oItem) {
        return oItem.parent === sParent;
    }).forEach(function (oItem) {
        return oNode[oItem.id] = get_tree(arCategories, oItem.id);
    });
    return oNode;
};

console.log(JSON.stringify(get_tree(arCategories, null), null, 2));

/*
{
    animals:{
        dogs: {
            chihuahua:null
            labrador:null
        }
    }
}
*/

//console.log(arCategories)
