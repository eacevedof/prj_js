import {decorateProperty as o} from "./base.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e2) {
  return o({descriptor: (r) => ({async get() {
    var r2;
    return await this.updateComplete, (r2 = this.renderRoot) === null || r2 === void 0 ? void 0 : r2.querySelector(e2);
  }, enumerable: true, configurable: true})});
}
export {e as queryAsync};
export default null;
