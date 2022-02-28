import {getCompatibleStyle as S, adoptStyles as i} from "./reactive-element/css-tag.js";
export {CSSResult, adoptStyles, css, getCompatibleStyle, supportsAdoptingStyleSheets, unsafeCSS} from "./reactive-element/css-tag.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s;
const e = window.trustedTypes, r = e ? e.emptyScript : "", h = window.reactiveElementPolyfillSupport, o = {toAttribute(t, i2) {
  switch (i2) {
    case Boolean:
      t = t ? r : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, i2) {
  let s2 = t;
  switch (i2) {
    case Boolean:
      s2 = t !== null;
      break;
    case Number:
      s2 = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t);
      } catch (t2) {
        s2 = null;
      }
  }
  return s2;
}}, n = (t, i2) => i2 !== t && (i2 == i2 || t == t), l = {attribute: true, type: String, converter: o, reflect: false, hasChanged: n};
class a extends HTMLElement {
  constructor() {
    super(), this._$Et = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t.push(e2));
    }), t;
  }
  static createProperty(t, i2 = l) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s2 = typeof t == "symbol" ? Symbol() : "__" + t, e2 = this.getPropertyDescriptor(t, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t, e2);
    }
  }
  static getPropertyDescriptor(t, i2, s2) {
    return {get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t];
      this[i2] = e2, this.requestUpdate(t, r2, s2);
    }, configurable: true, enumerable: true};
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
      const t2 = this.properties, i2 = [...Object.getOwnPropertyNames(t2), ...Object.getOwnPropertySymbols(t2)];
      for (const s2 of i2)
        this.createProperty(s2, t2[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S(i3));
    } else
      i2 !== void 0 && s2.push(S(i2));
    return s2;
  }
  static _$Eh(t, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  o() {
    var t;
    this._$Ep = new Promise((t2) => this.enableUpdating = t2), this._$AL = new Map(), this._$Em(), this.requestUpdate(), (t = this.constructor.l) === null || t === void 0 || t.forEach((t2) => t2(this));
  }
  addController(t) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s2 = t.hostConnected) === null || s2 === void 0 || s2.call(t));
  }
  removeController(t) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t;
    const s2 = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t = this._$Eg) === null || t === void 0 || t.forEach((t2) => {
      var i2;
      return (i2 = t2.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t2);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$Eg) === null || t === void 0 || t.forEach((t2) => {
      var i2;
      return (i2 = t2.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t2);
    });
  }
  attributeChangedCallback(t, i2, s2) {
    this._$AK(t, s2);
  }
  _$ES(t, i2, s2 = l) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o.toAttribute)(i2, s2.type);
      this._$Ei = t, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t2 = h2.getPropertyOptions(n2), l2 = t2.converter, a3 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o.fromAttribute;
      this._$Ei = n2, this[n2] = a3(i2, t2.type), this._$Ei = null;
    }
  }
  requestUpdate(t, i2, s2) {
    let e2 = true;
    t !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t)).hasChanged || n)(this[t], i2) ? (this._$AL.has(t) || this._$AL.set(t, i2), s2.reflect === true && this._$Ei !== t && (this._$EC === void 0 && (this._$EC = new Map()), this._$EC.set(t, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t2) {
      Promise.reject(t2);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t2, i3) => this[i3] = t2), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t = this._$Eg) === null || t === void 0 || t.forEach((t2) => {
        var i3;
        return (i3 = t2.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t2);
      }), this.update(s2)) : this._$EU();
    } catch (t2) {
      throw i2 = false, this._$EU(), t2;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t2) => {
      var i3;
      return (i3 = t2.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t2);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((t2, i2) => this._$ES(i2, this[i2], t2)), this._$EC = void 0), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {mode: "open"}, h == null || h({ReactiveElement: a}), ((s = globalThis.reactiveElementVersions) !== null && s !== void 0 ? s : globalThis.reactiveElementVersions = []).push("1.3.0");
export {a as ReactiveElement, o as defaultConverter, n as notEqual};
export default null;
