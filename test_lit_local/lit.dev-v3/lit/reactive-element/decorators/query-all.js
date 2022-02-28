import {decorateProperty as o} from "./base.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e2) {
  return o({descriptor: (r) => ({get() {
    var r2, o2;
    return (o2 = (r2 = this.renderRoot) === null || r2 === void 0 ? void 0 : r2.querySelectorAll(e2)) !== null && o2 !== void 0 ? o2 : [];
  }, enumerable: true, configurable: true})});
}
export {e as queryAll};
export default null;
