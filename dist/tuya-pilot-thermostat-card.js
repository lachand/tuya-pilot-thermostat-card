function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:_},v="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;m[v]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const g=window,$=g.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,E="?"+w,S=`<${E}>`,x=document,C=()=>x.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,O="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,U=/>/g,z=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,M=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),I=new WeakMap,V=x.createTreeWalker(x,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===T?"!--"===l[1]?r=H:void 0!==l[1]?r=U:void 0!==l[2]?(M.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=n?n:T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?N:j):r===N||r===j?r=z:r===H||r===U?r=T:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+S:c>=0?(s.push(a),i.slice(0,c)+A+i.slice(c)+w+d):i+w+(-2===c?(s.push(void 0),e):d)}return[B(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=q.createElement(l,i),V.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=V.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(w)){const i=c[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Y:Z})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var n,o,r,a;if(e===L)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);V.currentNode=n;let o=V.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new tt(o,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=V.nextNode(),r++)}return V.currentNode=x,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var n;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),k(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new K(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new q(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new J(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,i,s,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=F(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=F(this,s[i+r],e,r),a===L&&(a=this._$AH[r]),o||(o=!k(a)||a!==this._$AH[r]),a===D?t=D:t!==D&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const Q=$?$.emptyScript:"";class X extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends Z{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:D)===L)return;const s=this._$AH,n=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==D&&(s===D||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=g.litHtmlPolyfillSupport;null==et||et(q,J),(null!==(y=g.litHtmlVersions)&&void 0!==y?y:g.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class nt extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new J(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return L}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:nt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct;null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements,
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");const ht={Standby:"Éteint",Comfort:"Confort",ECO:"Éco",Anti_forst:"Hors-gel",Thermostat:"Températures",Programming:"Programmation"};Object.fromEntries(Object.entries(ht).map(([t,e])=>[e,t]));const dt=["Confort","Éco","Hors-gel","Températures","Programmation"],ut={_mode:"mode_entity",_heating:"heating_entity",_window:"window_entity",_fault:"fault_entity",_power:"power_entity",_child_lock:"child_lock_entity"};let pt=class extends nt{constructor(){super(...arguments),this._config={},this._autoStatus="",this._modeFilter=t=>(t.attributes.options?.length??0)>2}setConfig(t){this._config={...t}}_changed(t,e){this._config={...this._config,[t]:e||void 0},this._fire()}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_autoDetect(){const t=this._config.entity;if(!t)return void(this._autoStatus="Sélectionnez d'abord l'entité climate.");let e=[];if(this.hass?.entities){const i=this.hass.entities[t];i&&(i.config_entry_id&&(e=Object.values(this.hass.entities).filter(e=>e.config_entry_id===i.config_entry_id&&e.entity_id!==t)),0===e.length&&i.device_id&&(e=Object.values(this.hass.entities).filter(e=>e.device_id===i.device_id&&e.entity_id!==t)))}if(0===e.length&&this.hass?.states){const i=t.split(".")[1].replace(/_thermostat$|_climate$/,"");e=Object.keys(this.hass.states).filter(e=>e!==t&&e.split(".")[1].startsWith(i)).map(t=>({entity_id:t,unique_id:""}))}if(0===e.length)return void(this._autoStatus="Aucune entité associée trouvée pour ce thermostat.");const i={};for(const t of e){const e=(t.unique_id??"").toLowerCase(),s=t.entity_id,n=s.split(".")[0],o=s.split(".")[1].toLowerCase();for(const[t,n]of Object.entries(ut))!e.endsWith(t)||i[n]||(i[n]=s);"select"!==n||i.mode_entity?"binary_sensor"===n?!i.heating_entity&&/heat|chauffe|running/.test(o)?i.heating_entity=s:!i.window_entity&&/window|fen.tre|vitre/.test(o)?i.window_entity=s:!i.fault_entity&&/fault|alarm|d.faut/.test(o)&&(i.fault_entity=s):"sensor"===n?!i.power_entity&&/power|puissance/.test(o)?i.power_entity=s:!i.elec_entity&&/elec|conso|statistic/.test(o)&&(i.elec_entity=s):"switch"===n&&!i.child_lock_entity&&/child|lock|verrou/.test(o)&&(i.child_lock_entity=s):i.mode_entity=s}const s=Object.keys(i).length;0!==s?(this._config={...this._config,...i},this._autoStatus=`${s} entité(s) détectée(s).`,this._fire()):this._autoStatus="Aucune entité associée détectée."}_picker(t,e,i,s){const n=Array.isArray(i)?i:[i];return R`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[t]||""}
        .includeDomains=${n}
        .entityFilter=${s}
        .label=${e}
        allow-custom-entity
        @value-changed=${e=>this._changed(t,e.detail.value)}
      ></ha-entity-picker>
    `}render(){return R`
      <div class="grid">
        ${this._picker("entity","Entité climate *","climate")}

        <paper-input
          .label=${"Nom (optionnel)"}
          .value=${this._config.name||""}
          placeholder="Thermostat salon"
          @value-changed=${t=>this._changed("name",t.detail.value)}
        ></paper-input>

        <div class="auto-row">
          <button class="auto-btn" @click=${()=>this._autoDetect()}>
            Autodétection
          </button>
          ${this._autoStatus?R`<span class="auto-status">${this._autoStatus}</span>`:""}
        </div>

        <h4>Entités optionnelles</h4>
        ${this._picker("mode_entity","Select — Mode","select",this._modeFilter)}
        ${this._picker("heating_entity","Binary sensor — Chauffe","binary_sensor")}
        ${this._picker("window_entity","Binary sensor — Fenêtre","binary_sensor")}
        ${this._picker("fault_entity","Binary sensor — Défaut","binary_sensor")}
        ${this._picker("power_entity","Sensor — Puissance","sensor")}
        ${this._picker("elec_entity","Sensor — Conso élec.","sensor")}
        ${this._picker("child_lock_entity","Switch — Verrou enfant","switch")}
      </div>
    `}};pt.styles=r`
    .grid { display: grid; gap: 8px; }
    h4 {
      margin: 8px 0 2px;
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .auto-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }
    .auto-btn {
      padding: 5px 14px;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      font-size: 0.85em;
      cursor: pointer;
      white-space: nowrap;
    }
    .auto-btn:hover { background: var(--primary-color); color: #fff; }
    .auto-status { font-size: 0.8em; color: var(--secondary-text-color); }
  `,t([lt({type:Object})],pt.prototype,"hass",void 0),t([lt({type:Object})],pt.prototype,"_config",void 0),t([lt({type:String})],pt.prototype,"_autoStatus",void 0),pt=t([rt("tuya-thermostat-card-editor")],pt);let _t=class extends nt{setConfig(t){if(!t.entity)throw new Error("entity (climate) est requis");this.config=t}static getConfigElement(){return document.createElement("tuya-thermostat-card-editor")}static getStubConfig(){return{entity:"climate.thermostat",mode_entity:"select.thermostat_mode"}}get _climate(){return this.hass?.states[this.config.entity]}get _modeEntity(){return this.config.mode_entity?this.hass?.states[this.config.mode_entity]:null}get _windowEntity(){return this.config.window_entity?this.hass?.states[this.config.window_entity]:null}get _faultEntity(){return this.config.fault_entity?this.hass?.states[this.config.fault_entity]:null}get _heatingEntity(){return this.config.heating_entity?this.hass?.states[this.config.heating_entity]:null}get _powerEntity(){return this.config.power_entity?this.hass?.states[this.config.power_entity]:null}get _childLockEntity(){return this.config.child_lock_entity?this.hass?.states[this.config.child_lock_entity]:null}get _elecEntity(){return this.config.elec_entity?this.hass?.states[this.config.elec_entity]:null}render(){if(!this.hass||!this.config||!this._climate)return R`<ha-card><div style="padding:1em;color:var(--error-color)">Configuration manquante — vérifiez l'entity.</div></ha-card>`;const t=this.hass.language||"en",e=(e,i)=>t.startsWith("fr")?i:e,i=this._climate,s=i.attributes.current_temperature,n=i.attributes.temperature,o="off"!==i.state,r=this._modeEntity,a=r?r.state:null,l=r?.attributes.options?.length?r.attributes.options:dt,c="on"===this._windowEntity?.state,h="on"===this._faultEntity?.state,d="on"===this._heatingEntity?.state,u=this._powerEntity,p=u?parseFloat(u.state):null,_=u?.attributes.unit_of_measurement??"W",f=this._elecEntity,v=f?f.state:null,m=f?.attributes.unit_of_measurement??"",y=this._childLockEntity,g=y?"on"===y.state:null,$=this.config.name||i.attributes.friendly_name||"Thermostat",b=a?ht[a]??a:null;return R`
      <ha-card>
        ${h?R`
          <div class="alert">⚠ ${e("Fault detected — check your device.","Défaut détecté — vérifiez l'appareil.")}</div>
        `:""}

        <div class="header">
          <div>
            <div class="title">
              ${$}
              ${c?R`<span class="badge" title="${e("Window open","Fenêtre ouverte")}">🪟</span>`:""}
              ${g?R`<span class="badge" title="${e("Child lock","Verrou enfant")}">🔒</span>`:""}
            </div>
            <div class="status-row">
              ${o?R`<span class="status-chip${d?" heating":""}">
                ${d?e("Heating","En chauffe"):e("Idle","En attente")}
              </span>`:R`<span class="status-chip">${e("Off","Éteint")}</span>`}
              ${b?R`<span class="status-chip">${b}</span>`:""}
            </div>
          </div>
          <div class="temp-current">
            ${void 0!==s?`${s}°`:"--"}
          </div>
        </div>

        <div class="controls">
          <button class="temp-btn" @click=${()=>this._adjustTemp(-.5)}>−</button>
          <span class="temp-target">${void 0!==n?`${n}°C`:"--"}</span>
          <button class="temp-btn" @click=${()=>this._adjustTemp(.5)}>+</button>
        </div>

        <hr class="divider">

        <div class="section-label">${e("Mode","Mode")}</div>
        ${this._isValidEntityId(this.config.mode_entity)?"":R`
          <div style="font-size:0.8em;color:var(--warning-color,#f4b400);margin-bottom:0.4em">
            ⚠ ${e("Configure mode_entity to change mode.","Configurez mode_entity pour changer de mode.")}
          </div>
        `}
        <div class="btn-row">
          <button class="chip-btn${o?"":" selected"}" @click=${()=>this._setHvac("off")}>
            ${e("Off","Éteint")}
          </button>
          ${l.map(t=>R`
            <button
              class="chip-btn${o&&a===t?" selected":""}${this._isValidEntityId(this.config.mode_entity)?"":" disabled"}"
              @click=${()=>this._activateMode(t)}
              ?disabled=${!this._isValidEntityId(this.config.mode_entity)}
            >${ht[t]??t}</button>
          `)}
        </div>

        ${null!==p||null!==v?R`
          <hr class="divider">
          <div class="footer">
            ${null!==p?R`<span class="stat">${e("Power","Puissance")}: <b>${p} ${_}</b></span>`:""}
            ${null!==v?R`<span class="stat">${e("Consumption","Conso")}: <b>${v} ${m}</b></span>`:""}
          </div>
        `:""}
      </ha-card>
    `}_call(t,e,i,s){this.hass.callService(t,e,i,{entity_id:s})}_adjustTemp(t){const e=this._climate?.attributes.temperature??20,i=Math.round(2*(e+t))/2;this._call("climate","set_temperature",{temperature:i},this.config.entity)}_setHvac(t){this._call("climate","set_hvac_mode",{hvac_mode:t},this.config.entity)}_isValidEntityId(t){return"string"==typeof t&&/^[a-z_]+\.[a-z0-9_]+$/.test(t)}_activateMode(t){"off"===this._climate?.state&&this._call("climate","set_hvac_mode",{hvac_mode:"heat"},this.config.entity),this._isValidEntityId(this.config.mode_entity)&&this._call("select","select_option",{option:t},this.config.mode_entity)}};_t.styles=r`
    :host { display: block; }

    ha-card {
      font-family: var(--primary-font-family, 'Roboto', Arial, sans-serif);
      padding: 1.2em 1.4em 1em;
      box-sizing: border-box;
    }

    .alert {
      background: var(--error-color, #e53935);
      color: #fff;
      border-radius: 6px;
      padding: 0.4em 0.8em;
      margin-bottom: 0.8em;
      font-size: 0.9em;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1em;
    }

    .title {
      font-size: 1.1em;
      font-weight: 500;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      gap: 0.4em;
    }

    .badge {
      font-size: 1em;
      cursor: default;
    }

    .status-row {
      display: flex;
      gap: 0.5em;
      margin-top: 0.3em;
      flex-wrap: wrap;
    }

    .status-chip {
      font-size: 0.75em;
      border-radius: 10px;
      padding: 0.1em 0.6em;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--secondary-text-color);
    }

    .status-chip.heating {
      background: var(--state-icon-active-color, #ff6f00);
      color: #fff;
    }

    .temp-current {
      font-size: 2.2em;
      font-weight: 300;
      color: var(--primary-text-color);
      line-height: 1;
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.2em;
      margin: 0.6em 0;
    }

    .temp-target {
      font-size: 1.6em;
      font-weight: 400;
      color: var(--primary-text-color);
      min-width: 4em;
      text-align: center;
    }

    .temp-btn {
      width: 2.4em;
      height: 2.4em;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #f5f5f5);
      font-size: 1.4em;
      cursor: pointer;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }

    .temp-btn:hover {
      background: var(--state-icon-active-color, var(--accent-color));
      color: #fff;
      border-color: transparent;
    }

    .divider {
      border: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: 0.8em 0;
    }

    .section-label {
      font-size: 0.75em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin-bottom: 0.4em;
    }

    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4em;
    }

    .chip-btn {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      padding: 0.25em 0.9em;
      font-size: 0.85em;
      cursor: pointer;
      background: transparent;
      color: var(--primary-text-color);
      transition: all 0.15s;
    }

    .chip-btn:hover {
      border-color: var(--state-icon-active-color, var(--accent-color));
      color: var(--state-icon-active-color, var(--accent-color));
    }

    .chip-btn.selected {
      background: var(--state-icon-active-color, var(--accent-color));
      border-color: transparent;
      color: #fff;
      font-weight: 500;
    }

    .chip-btn:disabled, .chip-btn.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      margin-top: 0.6em;
    }

    .stat {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }

    .stat b {
      color: var(--primary-text-color);
    }
  `,t([lt({type:Object})],_t.prototype,"hass",void 0),t([lt({type:Object})],_t.prototype,"config",void 0),_t=t([rt("tuya-thermostat-card")],_t),window.customCards=window.customCards||[],window.customCards.push({type:"tuya-thermostat-card",name:"Tuya Thermostat Card",preview:!0,description:"Carte Lovelace pour le thermostat Tuya (tuya_thermostat)"});export{_t as TuyaThermostatCard,pt as TuyaThermostatCardEditor};
//# sourceMappingURL=tuya-pilot-thermostat-card.js.map
