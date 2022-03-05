import {ReactiveElement} from "../../lit/reactive-element.js";
export * from "../../lit/reactive-element.js";
import {render, noChange} from "../../lit-html/lit-html.js";
export * from "../../lit-html/lit-html.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
const r = ReactiveElement;
class s extends ReactiveElement {
  constructor() {
    super(...arguments), this.renderOptions = {host: this}, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = render(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Dt) === null || t === void 0 || t.setConnected(true);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Dt) === null || t === void 0 || t.setConnected(false);
  }
  render() {
    return noChange;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, {LitElement: s});
const n = globalThis.litElementPolyfillSupport;
n == null || n({LitElement: s});
const h = {_$AK: (t, e, i) => {
  t._$AK(e, i);
}, _$AL: (t) => t._$AL};
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.2.0");
export {s as LitElement, r as UpdatingElement, h as _$LE};
export default null;
