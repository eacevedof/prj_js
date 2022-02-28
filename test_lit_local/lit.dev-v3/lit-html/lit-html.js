/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 var t;
 const i = globalThis.trustedTypes, s = i ? i.createPolicy("lit-html", {createHTML: (t2) => t2}) : void 0, e = `lit$${(Math.random() + "").slice(9)}$`, o = "?" + e, n = `<${o}>`, l = document, h = (t2 = "") => l.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
   var i2;
   return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
 }, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({_$litType$: t2, strings: i2, values: s2}), $ = p(1), y = p(2), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = new WeakMap(), x = (t2, i2, s2) => {
   var e2, o2;
   const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
   let l2 = n2._$litPart$;
   if (l2 === void 0) {
     const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
     n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
   }
   return l2._$AI(t2), l2;
 }, A = l.createTreeWalker(l, 129, null, false), C = (t2, i2) => {
   const o2 = t2.length - 1, l2 = [];
   let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
   for (let i3 = 0; i3 < o2; i3++) {
     const s2 = t2[i3];
     let o3, u3, p2 = -1, $2 = 0;
     for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
       $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
     const y2 = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
     r2 += d2 === c ? s2 + n : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e + y2) : s2 + e + (p2 === -2 ? (l2.push(void 0), i3) : y2);
   }
   const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
   if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
     throw Error("invalid template strings array");
   return [s !== void 0 ? s.createHTML(u2) : u2, l2];
 };
 class E {
   constructor({strings: t2, _$litType$: s2}, n2) {
     let l2;
     this.parts = [];
     let r2 = 0, d2 = 0;
     const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
     if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
       const t3 = this.el.content, i2 = t3.firstChild;
       i2.remove(), t3.append(...i2.childNodes);
     }
     for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
       if (l2.nodeType === 1) {
         if (l2.hasAttributes()) {
           const t3 = [];
           for (const i2 of l2.getAttributeNames())
             if (i2.endsWith("$lit$") || i2.startsWith(e)) {
               const s3 = a2[d2++];
               if (t3.push(i2), s3 !== void 0) {
                 const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e), i3 = /([.?@])?(.*)/.exec(s3);
                 c2.push({type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S});
               } else
                 c2.push({type: 6, index: r2});
             }
           for (const i2 of t3)
             l2.removeAttribute(i2);
         }
         if (g.test(l2.tagName)) {
           const t3 = l2.textContent.split(e), s3 = t3.length - 1;
           if (s3 > 0) {
             l2.textContent = i ? i.emptyScript : "";
             for (let i2 = 0; i2 < s3; i2++)
               l2.append(t3[i2], h()), A.nextNode(), c2.push({type: 2, index: ++r2});
             l2.append(t3[s3], h());
           }
         }
       } else if (l2.nodeType === 8)
         if (l2.data === o)
           c2.push({type: 2, index: r2});
         else {
           let t3 = -1;
           for (; (t3 = l2.data.indexOf(e, t3 + 1)) !== -1; )
             c2.push({type: 7, index: r2}), t3 += e.length - 1;
         }
       r2++;
     }
   }
   static createElement(t2, i2) {
     const s2 = l.createElement("template");
     return s2.innerHTML = t2, s2;
   }
 }
 function P(t2, i2, s2 = t2, e2) {
   var o2, n2, l2, h2;
   if (i2 === b)
     return i2;
   let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
   const u2 = r(i2) ? void 0 : i2._$litDirective$;
   return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
 }
 class V {
   constructor(t2, i2) {
     this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
   }
   get parentNode() {
     return this._$AM.parentNode;
   }
   get _$AU() {
     return this._$AM._$AU;
   }
   p(t2) {
     var i2;
     const {el: {content: s2}, parts: e2} = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l).importNode(s2, true);
     A.currentNode = o2;
     let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
     for (; d2 !== void 0; ) {
       if (h2 === d2.index) {
         let i3;
         d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
       }
       h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
     }
     return o2;
   }
   m(t2) {
     let i2 = 0;
     for (const s2 of this.v)
       s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
   }
 }
 class N {
   constructor(t2, i2, s2, e2) {
     var o2;
     this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
   }
   get _$AU() {
     var t2, i2;
     return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
   }
   get parentNode() {
     let t2 = this._$AA.parentNode;
     const i2 = this._$AM;
     return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
   }
   get startNode() {
     return this._$AA;
   }
   get endNode() {
     return this._$AB;
   }
   _$AI(t2, i2 = this) {
     t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
   }
   A(t2, i2 = this._$AB) {
     return this._$AA.parentNode.insertBefore(t2, i2);
   }
   k(t2) {
     this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
   }
   $(t2) {
     this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l.createTextNode(t2)), this._$AH = t2;
   }
   T(t2) {
     var i2;
     const {values: s2, _$litType$: e2} = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
     if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
       this._$AH.m(s2);
     else {
       const t3 = new V(o2, this), i3 = t3.p(this.options);
       t3.m(s2), this.k(i3), this._$AH = t3;
     }
   }
   _$AC(t2) {
     let i2 = T.get(t2.strings);
     return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
   }
   S(t2) {
     d(this._$AH) || (this._$AH = [], this._$AR());
     const i2 = this._$AH;
     let s2, e2 = 0;
     for (const o2 of t2)
       e2 === i2.length ? i2.push(s2 = new N(this.A(h()), this.A(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
     e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
   }
   _$AR(t2 = this._$AA.nextSibling, i2) {
     var s2;
     for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
       const i3 = t2.nextSibling;
       t2.remove(), t2 = i3;
     }
   }
   setConnected(t2) {
     var i2;
     this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
   }
 }
 class S {
   constructor(t2, i2, s2, e2, o2) {
     this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
   }
   get tagName() {
     return this.element.tagName;
   }
   get _$AU() {
     return this._$AM._$AU;
   }
   _$AI(t2, i2 = this, s2, e2) {
     const o2 = this.strings;
     let n2 = false;
     if (o2 === void 0)
       t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
     else {
       const e3 = t2;
       let l2, h2;
       for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
         h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
     }
     n2 && !e2 && this.C(t2);
   }
   C(t2) {
     t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
   }
 }
 class M extends S {
   constructor() {
     super(...arguments), this.type = 3;
   }
   C(t2) {
     this.element[this.name] = t2 === w ? void 0 : t2;
   }
 }
 const k = i ? i.emptyScript : "";
 class H extends S {
   constructor() {
     super(...arguments), this.type = 4;
   }
   C(t2) {
     t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
   }
 }
 class I extends S {
   constructor(t2, i2, s2, e2, o2) {
     super(t2, i2, s2, e2, o2), this.type = 5;
   }
   _$AI(t2, i2 = this) {
     var s2;
     if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
       return;
     const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
     o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
   }
   handleEvent(t2) {
     var i2, s2;
     typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
   }
 }
 class L {
   constructor(t2, i2, s2) {
     this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
   }
   get _$AU() {
     return this._$AM._$AU;
   }
   _$AI(t2) {
     P(this, t2);
   }
 }
 const R = {P: "$lit$", L: e, V: o, I: 1, N: C, R: V, D: u, j: P, H: N, O: S, F: H, B: I, W: M, Z: L}, z = window.litHtmlPolyfillSupport;
 z == null || z(E, N), ((t = globalThis.litHtmlVersions) !== null && t !== void 0 ? t : globalThis.litHtmlVersions = []).push("2.2.0");
 export {R as _$LH, $ as html, b as noChange, w as nothing, x as render, y as svg};
 export default null;
 