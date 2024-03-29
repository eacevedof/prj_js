/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const i = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? {...e2, finisher(n) {
    n.createProperty(e2.key, i2);
  }} : {kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
    typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
  }, finisher(n) {
    n.createProperty(e2.key, i2);
  }};
  function e(e2) {
    return (n, t) => t !== void 0 ? ((i2, e3, n2) => {
      e3.constructor.createProperty(n2, i2);
    })(e2, n, t) : i(e2, n);
  }
  export {e as property};
  export default null;
  