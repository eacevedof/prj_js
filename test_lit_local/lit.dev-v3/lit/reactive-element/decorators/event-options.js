import {decorateProperty as o} from "./base.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e2) {
  return o({finisher: (r, t) => {
    Object.assign(r.prototype[t], e2);
  }});
}
export {e as eventOptions};
export default null;
