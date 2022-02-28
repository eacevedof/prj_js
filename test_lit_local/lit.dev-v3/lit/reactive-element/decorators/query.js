import {decorateProperty as o} from "./base.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i2, n) {
  return o({descriptor: (o2) => {
    const t = {get() {
      var o3, n2;
      return (n2 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && n2 !== void 0 ? n2 : null;
    }, enumerable: true, configurable: true};
    if (n) {
      const n2 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t.get = function() {
        var o3, t2;
        return this[n2] === void 0 && (this[n2] = (t2 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && t2 !== void 0 ? t2 : null), this[n2];
      };
    }
    return t;
  }});
}
export {i as query};
export default null;
