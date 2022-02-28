/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const e = (e2, t2, o2) => {
    Object.defineProperty(t2, o2, e2);
  }, t = (e2, t2) => ({kind: "method", placement: "prototype", key: t2.key, descriptor: e2}), o = ({finisher: e2, descriptor: t2}) => (o2, n) => {
    var r;
    if (n === void 0) {
      const n2 = (r = o2.originalKey) !== null && r !== void 0 ? r : o2.key, i = t2 != null ? {kind: "method", placement: "prototype", key: n2, descriptor: t2(o2.key)} : {...o2, key: n2};
      return e2 != null && (i.finisher = function(t3) {
        e2(t3, n2);
      }), i;
    }
    {
      const r2 = o2.constructor;
      t2 !== void 0 && Object.defineProperty(o2, n, t2(n)), e2 == null || e2(r2, n);
    }
  };
  export {o as decorateProperty, e as legacyPrototypeMethod, t as standardPrototypeMethod};
  export default null;
  