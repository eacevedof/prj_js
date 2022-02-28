import {decorateProperty as o$1} from "./base.js";
import {queryAssignedElements as l} from "./query-assigned-elements.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function o(o2, n, r) {
  let l$1, s = o2;
  return typeof o2 == "object" ? (s = o2.slot, l$1 = o2) : l$1 = {flatten: n}, r ? l({slot: s, flatten: n, selector: r}) : o$1({descriptor: (e) => ({get() {
    var e2, t;
    const o3 = "slot" + (s ? `[name=${s}]` : ":not([name])"), n2 = (e2 = this.renderRoot) === null || e2 === void 0 ? void 0 : e2.querySelector(o3);
    return (t = n2 == null ? void 0 : n2.assignedNodes(l$1)) !== null && t !== void 0 ? t : [];
  }, enumerable: true, configurable: true})});
}
export {o as queryAssignedNodes};
export default null;
