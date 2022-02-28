/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const n = (n2) => (e) => typeof e == "function" ? ((n3, e2) => (window.customElements.define(n3, e2), e2))(n2, e) : ((n3, e2) => {
    const {kind: t, elements: i} = e2;
    return {kind: t, elements: i, finisher(e3) {
      window.customElements.define(n3, e3);
    }};
  })(n2, e);
  export {n as customElement};
  export default null;
  