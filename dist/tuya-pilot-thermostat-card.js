function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:f},_="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;m[_]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const g=window,$=g.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,E="?"+w,S=`<${E}>`,x=document,C=()=>x.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,H="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,U=/>/g,z=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,M=/"/g,R=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),B=new WeakMap,I=x.createTreeWalker(x,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===O?"!--"===l[1]?r=T:void 0!==l[1]?r=U:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=o?o:O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?M:N):r===M||r===N?r=z:r===T||r===U?r=O:(r=z,o=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";n+=r===O?i+S:c>=0?(s.push(a),i.slice(0,c)+A+i.slice(c)+w+d):i+w+(-2===c?(s.push(void 0),e):d)}return[V(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=q.createElement(l,i),I.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=I.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(w)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Y:Z})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(R.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),I.nextNode(),a.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var o,n,r,a;if(e===L)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);I.currentNode=o;let n=I.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new tt(n,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=I.nextNode(),r++)}return I.currentNode=x,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var o;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),k(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(V(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new K(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new q(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,i,s,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=F(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=F(this,s[i+r],e,r),a===L&&(a=this._$AH[r]),n||(n=!k(a)||a!==this._$AH[r]),a===D?t=D:t!==D&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const Q=$?$.emptyScript:"";class X extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends Z{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:D)===L)return;const s=this._$AH,o=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==D&&(s===D||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=g.litHtmlPolyfillSupport;null==et||et(q,J),(null!==(y=g.litHtmlVersions)&&void 0!==y?y:g.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class ot extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return L}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:ot}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
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
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");const ht={Standby:"Éteint",Comfort:"Confort",ECO:"Éco",Anti_forst:"Hors-gel",Thermostat:"Températures",Programming:"Programmation"},dt={_mode:"mode_entity",_heating:"heating_entity",_window:"window_entity",_fault:"fault_entity",_power:"power_entity",_child_lock:"child_lock_entity"};let ut=class extends ot{constructor(){super(...arguments),this._config={},this._autoStatus=""}setConfig(t){this._config={...t}}_changed(t,e){const i=e.target.value;this._config={...this._config,[t]:i||void 0},this._fire()}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_autoDetect(){const t=this._config.entity;if(!t||!this.hass?.entities)return void(this._autoStatus="Entité climate non définie ou hass.entities indisponible.");const e=this.hass.entities[t];if(!e?.device_id)return void(this._autoStatus="Aucun appareil lié à cette entité.");const i=e.device_id,s=Object.values(this.hass.entities).filter(e=>e.device_id===i&&e.entity_id!==t),o={};for(const t of s){const e=t.unique_id??"",i=t.entity_id,s=i.split(".")[0];for(const[t,s]of Object.entries(dt))if(e.endsWith(t)){o[s]=i;break}"sensor"!==s||o.elec_entity||!e.includes("elec")&&!e.includes("electricity")||(o.elec_entity=i)}const n=Object.keys(o).length;0!==n?(this._config={...this._config,...o},this._autoStatus=`${n} entité(s) détectée(s) automatiquement.`,this._fire()):this._autoStatus="Aucune entité associée détectée."}_field(t,e,i=""){return j`
      <div>
        <label>${e}</label>
        <input
          type="text"
          .value=${this._config[t]||""}
          placeholder=${i}
          @change=${e=>this._changed(t,e)}
        />
      </div>
    `}render(){return j`
      <div class="grid">
        <div class="full">${this._field("entity","Entité climate *","climate.mon_thermostat")}</div>
        <div class="full">${this._field("name","Nom (optionnel)","Thermostat salon")}</div>

        <div class="auto-row">
          <button class="auto-btn" @click=${()=>this._autoDetect()}>
            Autodétection
          </button>
          ${this._autoStatus?j`<span class="auto-status">${this._autoStatus}</span>`:""}
        </div>

        <h4>Entités optionnelles</h4>
        ${this._field("mode_entity","Select — Mode","select.thermostat_mode")}
        ${this._field("heating_entity","Binary sensor — Chauffe","binary_sensor.thermostat_chauffe")}
        ${this._field("window_entity","Binary sensor — Fenêtre","binary_sensor.thermostat_fenetre")}
        ${this._field("fault_entity","Binary sensor — Défaut","binary_sensor.thermostat_alarme")}
        ${this._field("power_entity","Sensor — Puissance","sensor.thermostat_puissance")}
        ${this._field("elec_entity","Sensor — Conso élec.","sensor.thermostat_electricite")}
        ${this._field("child_lock_entity","Switch — Verrou enfant","switch.thermostat_verrou")}
      </div>
    `}};ut.styles=r`
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .full { grid-column: 1 / -1; }
    label {
      display: block;
      font-size: 0.8em;
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      font-size: 0.95em;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    input:focus { outline: 2px solid var(--primary-color); }
    h4 {
      grid-column: 1 / -1;
      margin: 8px 0 2px;
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .auto-row {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
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
  `,t([lt({type:Object})],ut.prototype,"hass",void 0),t([lt({type:Object})],ut.prototype,"_config",void 0),t([lt({type:String})],ut.prototype,"_autoStatus",void 0),ut=t([rt("tuya-thermostat-card-editor")],ut);let pt=class extends ot{setConfig(t){if(!t.entity)throw new Error("entity (climate) est requis");this.config=t}static getConfigElement(){return document.createElement("tuya-thermostat-card-editor")}static getStubConfig(){return{entity:"climate.thermostat",mode_entity:"select.thermostat_mode"}}get _climate(){return this.hass?.states[this.config.entity]}get _modeEntity(){return this.config.mode_entity?this.hass?.states[this.config.mode_entity]:null}get _windowEntity(){return this.config.window_entity?this.hass?.states[this.config.window_entity]:null}get _faultEntity(){return this.config.fault_entity?this.hass?.states[this.config.fault_entity]:null}get _heatingEntity(){return this.config.heating_entity?this.hass?.states[this.config.heating_entity]:null}get _powerEntity(){return this.config.power_entity?this.hass?.states[this.config.power_entity]:null}get _childLockEntity(){return this.config.child_lock_entity?this.hass?.states[this.config.child_lock_entity]:null}get _elecEntity(){return this.config.elec_entity?this.hass?.states[this.config.elec_entity]:null}render(){if(!this.hass||!this.config||!this._climate)return j`<ha-card><div style="padding:1em;color:var(--error-color)">Configuration manquante — vérifiez l'entity.</div></ha-card>`;const t=this.hass.language||"en",e=(e,i)=>t.startsWith("fr")?i:e,i=this._climate,s=i.attributes.current_temperature,o=i.attributes.temperature,n="off"!==i.state,r=this._modeEntity,a=r?r.state:null,l=r?r.attributes.options??[]:[],c="on"===this._windowEntity?.state,h="on"===this._faultEntity?.state,d="on"===this._heatingEntity?.state,u=this._powerEntity,p=u?parseFloat(u.state):null,f=u?.attributes.unit_of_measurement??"W",v=this._elecEntity,_=v?v.state:null,m=v?.attributes.unit_of_measurement??"",y=this._childLockEntity,g=y?"on"===y.state:null,$=this.config.name||i.attributes.friendly_name||"Thermostat",b=a?ht[a]??a:null;return j`
      <ha-card>
        ${h?j`
          <div class="alert">⚠ ${e("Fault detected — check your device.","Défaut détecté — vérifiez l'appareil.")}</div>
        `:""}

        <div class="header">
          <div>
            <div class="title">
              ${$}
              ${c?j`<span class="badge" title="${e("Window open","Fenêtre ouverte")}">🪟</span>`:""}
              ${g?j`<span class="badge" title="${e("Child lock","Verrou enfant")}">🔒</span>`:""}
            </div>
            <div class="status-row">
              ${n?j`<span class="status-chip${d?" heating":""}">
                ${d?e("Heating","En chauffe"):e("Idle","En attente")}
              </span>`:j`<span class="status-chip">${e("Off","Éteint")}</span>`}
              ${b?j`<span class="status-chip">${b}</span>`:""}
            </div>
          </div>
          <div class="temp-current">
            ${void 0!==s?`${s}°`:"--"}
          </div>
        </div>

        <div class="controls">
          <button class="temp-btn" @click=${()=>this._adjustTemp(-.5)}>−</button>
          <span class="temp-target">${void 0!==o?`${o}°C`:"--"}</span>
          <button class="temp-btn" @click=${()=>this._adjustTemp(.5)}>+</button>
        </div>

        <hr class="divider">

        <div class="btn-row">
          <button class="chip-btn${n?"":" selected"}" @click=${()=>this._setHvac("off")}>
            ${e("Off","Éteint")}
          </button>
          <button class="chip-btn${n?" selected":""}" @click=${()=>this._setHvac("heat")}>
            ${e("Heat","Chauffer")}
          </button>
        </div>

        ${l.length?j`
          <hr class="divider">
          <div class="section-label">${e("Mode","Mode")}</div>
          <div class="btn-row">
            ${l.map(t=>j`
              <button
                class="chip-btn${a===t?" selected":""}"
                @click=${()=>this._setMode(t)}
              >${ht[t]??t}</button>
            `)}
          </div>
        `:""}

        ${null!==p||null!==_?j`
          <hr class="divider">
          <div class="footer">
            ${null!==p?j`<span class="stat">${e("Power","Puissance")}: <b>${p} ${f}</b></span>`:""}
            ${null!==_?j`<span class="stat">${e("Consumption","Conso")}: <b>${_} ${m}</b></span>`:""}
          </div>
        `:""}
      </ha-card>
    `}_adjustTemp(t){const e=this._climate?.attributes.temperature??20,i=Math.round(2*(e+t))/2;this.hass.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:i})}_setHvac(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}_setMode(t){this.hass.callService("select","select_option",{entity_id:this.config.mode_entity,option:t})}};pt.styles=r`
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
  `,t([lt({type:Object})],pt.prototype,"hass",void 0),t([lt({type:Object})],pt.prototype,"config",void 0),pt=t([rt("tuya-thermostat-card")],pt),window.customCards=window.customCards||[],window.customCards.push({type:"tuya-thermostat-card",name:"Tuya Thermostat Card",preview:!0,description:"Carte Lovelace pour le thermostat Tuya (tuya_thermostat)"});export{pt as TuyaThermostatCard,ut as TuyaThermostatCardEditor};
//# sourceMappingURL=tuya-pilot-thermostat-card.js.map
