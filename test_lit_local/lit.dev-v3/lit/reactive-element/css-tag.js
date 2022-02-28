/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e = Symbol(), n = new Map();
 class s {
   constructor(t2, n2) {
     if (this._$cssResult$ = true, n2 !== e)
       throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
     this.cssText = t2;
   }
   get styleSheet() {
     let e2 = n.get(this.cssText);
     return t && e2 === void 0 && (n.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
   }
   toString() {
     return this.cssText;
   }
 }
 const o = (t2) => new s(typeof t2 == "string" ? t2 : t2 + "", e), r = (t2, ...n2) => {
   const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
     if (t3._$cssResult$ === true)
       return t3.cssText;
     if (typeof t3 == "number")
       return t3;
     throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
   })(n3) + t2[s2 + 1], t2[0]);
   return new s(o2, e);
 }, i = (e2, n2) => {
   t ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
     const n3 = document.createElement("style"), s2 = window.litNonce;
     s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
   });
 }, S = t ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
   let e2 = "";
   for (const n2 of t3.cssRules)
     e2 += n2.cssText;
   return o(e2);
 })(t2) : t2;
 export {s as CSSResult, i as adoptStyles, r as css, S as getCompatibleStyle, t as supportsAdoptingStyleSheets, o as unsafeCSS};
 export default null;
 