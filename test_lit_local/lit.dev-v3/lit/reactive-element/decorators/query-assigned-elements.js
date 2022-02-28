import {decorateProperty as o} from "./base.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
const e = ((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
function l(n2) {
  const {slot: l2, selector: t} = n2 != null ? n2 : {};
  return o({descriptor: (o2) => ({get() {
    var o3;
    const r = "slot" + (l2 ? `[name=${l2}]` : ":not([name])"), i = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(r), s = i != null ? e(i, n2) : [];
    return t ? s.filter((o4) => o4.matches(t)) : s;
  }, enumerable: true, configurable: true})});
}
export {l as queryAssignedElements};
export default null;
