function t(t,e,s,i){var n,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,s,o):n(e,s))||o);return a>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new a(s,t,i)},r=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,d=c.trustedTypes,p=d?d.emptyScript:"",h=c.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},f=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f},g="finalized";let _=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(s=>{const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const a=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=i.getPropertyOptions(n),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=n,this[n]=a.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v;_[g]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:_}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,b=y.trustedTypes,k=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,$="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,w="?"+x,A=`<${w}>`,S=document,E=()=>S.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,M=/>/g,O=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),R=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),I=new WeakMap,F=S.createTreeWalker(S,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const V=(t,e)=>{const s=t.length-1,i=[];let n,a=2===e?"<svg>":"",o=N;for(let e=0;e<s;e++){const s=t[e];let r,l,c=-1,d=0;for(;d<s.length&&(o.lastIndex=d,l=o.exec(s),null!==l);)d=o.lastIndex,o===N?"!--"===l[1]?o=j:void 0!==l[1]?o=M:void 0!==l[2]?(H.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=O):void 0!==l[3]&&(o=O):o===O?">"===l[0]?(o=null!=n?n:N,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?O:'"'===l[3]?U:T):o===U||o===T?o=O:o===j||o===M?o=N:(o=O,n=void 0);const p=o===O&&t[e+1].startsWith("/>")?" ":"";a+=o===N?s+A:c>=0?(i.push(r),s.slice(0,c)+$+s.slice(c)+x+p):s+x+(-2===c?(i.push(void 0),e):p)}return[B(t,a+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,c]=V(t,e);if(this.el=G.createElement(l,s),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=F.nextNode())&&r.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith($)||e.startsWith(x)){const s=c[a++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+$).split(x),e=/([.?@])?(.*)/.exec(s);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Q:"@"===e[1]?Y:J})}else r.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(H.test(i.tagName)){const t=i.textContent.split(x),e=t.length-1;if(e>0){i.textContent=b?b.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],E()),F.nextNode(),r.push({type:2,index:++n});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===w)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(x,t+1));)r.push({type:7,index:n}),t+=x.length-1}n++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function q(t,e,s=t,i){var n,a,o,r;if(e===R)return e;let l=void 0!==i?null===(n=s._$Co)||void 0===n?void 0:n[i]:s._$Cl;const c=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,s,i)),void 0!==i?(null!==(o=(r=s)._$Co)&&void 0!==o?o:r._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,i)),e}class W{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);F.currentNode=n;let a=F.nextNode(),o=0,r=0,l=i[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new K(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new tt(a,this,t)),this._$AV.push(e),l=i[++r]}o!==(null==l?void 0:l.index)&&(a=F.nextNode(),o++)}return F.currentNode=S,n}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class K{constructor(t,e,s,i){var n;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),C(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==R&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>z(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(B(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(s);else{const t=new W(n,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new G(t)),e}T(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new K(this.k(E()),this.k(E()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let a=!1;if(void 0===n)t=q(this,t,e,0),a=!C(t)||t!==this._$AH&&t!==R,a&&(this._$AH=t);else{const i=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=q(this,i[s+o],e,o),r===R&&(r=this._$AH[o]),a||(a=!C(r)||r!==this._$AH[o]),r===D?t=D:t!==D&&(t+=(null!=r?r:"")+n[o+1]),this._$AH[o]=r}a&&!i&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const X=b?b.emptyScript:"";class Q extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class Y extends J{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=q(this,t,e,0))&&void 0!==s?s:D)===R)return;const i=this._$AH,n=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==D&&(i===D||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(G,K),(null!==(v=y.litHtmlVersions)&&void 0!==v?v:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var st,it;class nt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,n;const a=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=a._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;a._$litPart$=o=new K(e.insertBefore(E(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return R}}nt.finalized=!0,nt._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:nt});const at=globalThis.litElementPolyfillSupport;null==at||at({LitElement:nt}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){customElements.define(t,e)}}})(t,e),rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):rt(t,e)}
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
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information."),(()=>{if(document.querySelector("#kinetic-fonts"))return;const t=Object.assign(document.createElement("link"),{id:"kinetic-fonts",rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"});document.head.appendChild(t)})();const dt={Standby:{fr:"Éteint",label:"Éteint",icon:"power_settings_new",color:"#adaaaa"},Comfort:{fr:"Confort",label:"Confort",icon:"local_fire_department",color:"#8eff71"},ECO:{fr:"Éco",label:"Éco",icon:"eco",color:"#6bfe9c"},Anti_forst:{fr:"Hors-gel",label:"Hors-gel",icon:"ac_unit",color:"#69daff"},Thermostat:{fr:"Températures",label:"Temp.",icon:"device_thermostat",color:"#8eff71"},Programming:{fr:"Programmation",label:"Prog.",icon:"schedule",color:"#69daff"}},pt=Object.fromEntries(Object.entries(dt).map(([t,e])=>[e.fr,t])),ht={_mode:"mode_entity",_heating:"heating_entity",_window:"window_entity",_fault:"fault_entity",_power:"power_entity",_child_lock:"child_lock_entity",_upper_temp:"upper_temp_entity",_lower_temp:"lower_temp_entity",_boost:"boost_entity",_holiday:"holiday_entity"};let ut=class extends nt{constructor(){super(...arguments),this._config={},this._autoStatus="",this._modeFilter=t=>(t.attributes.options?.length??0)>2}setConfig(t){this._config={...t}}_changed(t,e){this._config={...this._config,[t]:e||void 0},this._fire()}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_autoDetect(){const t=this._config.entity;if(!t)return void(this._autoStatus="Sélectionnez d'abord l'entité climate.");let e=[];if(this.hass?.entities){const s=this.hass.entities[t];s?.config_entry_id?e=Object.values(this.hass.entities).filter(e=>e.config_entry_id===s.config_entry_id&&e.entity_id!==t):s?.device_id&&(e=Object.values(this.hass.entities).filter(e=>e.device_id===s.device_id&&e.entity_id!==t))}if(!e.length&&this.hass?.states){const s=t.split(".")[1].replace(/_thermostat$|_climate$/,"");e=Object.keys(this.hass.states).filter(e=>e!==t&&e.split(".")[1].startsWith(s)).map(t=>({entity_id:t,unique_id:""}))}if(!e.length)return void(this._autoStatus="Aucune entité associée trouvée.");const s={};for(const t of e){const e=(t.unique_id??"").toLowerCase(),i=t.entity_id,n=i.split(".")[0],a=i.split(".")[1].toLowerCase();for(const[t,n]of Object.entries(ht))if(e.endsWith(t)&&!s[n]){s[n]=i;break}if("select"!==n||s.mode_entity)"binary_sensor"===n?!s.heating_entity&&/heat|chauffe|running/.test(a)?s.heating_entity=i:!s.window_entity&&/window|fen|vitre/.test(a)?s.window_entity=i:!s.fault_entity&&/fault|alarm|d.faut/.test(a)&&(s.fault_entity=i):"sensor"===n?!s.power_entity&&/power|puissance/.test(a)?s.power_entity=i:!s.elec_entity&&/elec|conso|statistic/.test(a)&&(s.elec_entity=i):"switch"===n&&!s.child_lock_entity&&/child|lock|verrou/.test(a)?s.child_lock_entity=i:"number"===n&&(!s.upper_temp_entity&&/upper|haute|max/.test(a)?s.upper_temp_entity=i:!s.lower_temp_entity&&/lower|basse|min/.test(a)?s.lower_temp_entity=i:!s.boost_entity&&/boost/.test(a)?s.boost_entity=i:!s.holiday_entity&&/holiday|vacanc/.test(a)&&(s.holiday_entity=i));else{const t=this.hass?.states[i]?.attributes?.options;(!t||t.length>2)&&(s.mode_entity=i)}}const i=Object.keys(s).length;i?(this._config={...this._config,...s},this._autoStatus=`${i} entité(s) détectée(s).`,this._fire()):this._autoStatus="Aucune entité détectée."}_picker(t,e,s,i){return L`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[t]||""}
        .includeDomains=${Array.isArray(s)?s:[s]}
        .entityFilter=${i}
        .label=${e}
        allow-custom-entity
        @value-changed=${e=>this._changed(t,e.detail.value)}
      ></ha-entity-picker>
    `}render(){return L`
      <div class="grid">
        ${this._picker("entity","Entité climate *","climate")}
        <paper-input
          .label=${"Nom (optionnel)"}
          .value=${this._config.name||""}
          placeholder="Thermostat salon"
          @value-changed=${t=>this._changed("name",t.detail.value)}
        ></paper-input>

        <div class="auto-row">
          <button class="auto-btn" @click=${()=>this._autoDetect()}>Autodétection</button>
          ${this._autoStatus?L`<span class="auto-status">${this._autoStatus}</span>`:""}
        </div>

        <h4>Contrôle</h4>
        ${this._picker("mode_entity","Select — Mode","select",this._modeFilter)}

        <h4>Surveillance</h4>
        ${this._picker("heating_entity","Binary sensor — Chauffe","binary_sensor")}
        ${this._picker("window_entity","Binary sensor — Fenêtre","binary_sensor")}
        ${this._picker("fault_entity","Binary sensor — Défaut","binary_sensor")}

        <h4>Énergie</h4>
        ${this._picker("power_entity","Sensor — Puissance","sensor")}
        ${this._picker("elec_entity","Sensor — Conso élec.","sensor")}

        <h4>Paramètres avancés</h4>
        ${this._picker("child_lock_entity","Switch — Verrou enfant","switch")}
        ${this._picker("upper_temp_entity","Number — Limite haute (°C)","number")}
        ${this._picker("lower_temp_entity","Number — Limite basse (°C)","number")}
        ${this._picker("boost_entity","Number — Durée boost (min)","number")}
        ${this._picker("holiday_entity","Number — Mode vacances (j)","number")}
      </div>
    `}};ut.styles=o`
    .grid { display: grid; gap: 8px; }
    h4 {
      margin: 10px 0 2px;
      font-size: 0.75em;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--secondary-text-color);
    }
    .auto-row { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
    .auto-btn {
      padding: 5px 14px;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      font-size: 0.85em;
      cursor: pointer;
    }
    .auto-btn:hover { background: var(--primary-color); color: #fff; }
    .auto-status { font-size: 0.78em; color: var(--secondary-text-color); }
  `,t([lt({type:Object})],ut.prototype,"hass",void 0),t([lt({type:Object})],ut.prototype,"_config",void 0),t([lt({type:String})],ut.prototype,"_autoStatus",void 0),ut=t([ot("tuya-thermostat-card-editor")],ut);let ft=class extends nt{constructor(){super(...arguments),this._tab="climate"}setConfig(t){if(!t.entity)throw new Error("entity (climate) est requis");this.config=t}static getConfigElement(){return document.createElement("tuya-thermostat-card-editor")}static getStubConfig(){return{entity:"climate.thermostat",mode_entity:"select.thermostat_mode"}}get _cl(){return this.hass?.states[this.config.entity]}_ent(t){return this.config[t]?this.hass?.states[this.config[t]]:null}_isValid(t){return"string"==typeof t&&/^[a-z_]+\.[a-z0-9_]+$/.test(t)}_call(t,e,s,i){this.hass.callService(t,e,s,{entity_id:i})}_gaugeArc(t,e,s){const i=2*Math.PI*44,n=Math.max(0,Math.min(1,(t-e)/(s-e)))*i;return`${n.toFixed(1)} ${(i-n+.01).toFixed(1)}`}_currentModeKey(){const t=this._ent("mode_entity");if(!t)return null;const e=t.state;return dt[e]?e:pt[e]??null}_adjustTemp(t){const e=this._cl?.attributes.temperature??20;this._call("climate","set_temperature",{temperature:Math.round(2*(e+t))/2},this.config.entity)}_activateMode(t){if("Standby"===t)return void this._call("climate","set_hvac_mode",{hvac_mode:"off"},this.config.entity);if("off"===this._cl?.state&&this._call("climate","set_hvac_mode",{hvac_mode:"heat"},this.config.entity),!this._isValid(this.config.mode_entity))return;const e=this._ent("mode_entity"),s=(e?.attributes.options??[]).includes(t)?t:dt[t]?.fr??t;this._call("select","select_option",{option:s},this.config.mode_entity)}_toggleChildLock(){const t=this.config.child_lock_entity;if(!this._isValid(t))return;const e="on"===this._ent("child_lock_entity")?.state;this._call("switch",e?"turn_off":"turn_on",{},t)}_adjustNumber(t,e){const s=this.config[t];if(!this._isValid(s))return;const i=this._ent(t),n=parseFloat(i?.state??"0"),a=parseFloat(i?.attributes.step??"1"),o=parseFloat(i?.attributes.min??"0"),r=parseFloat(i?.attributes.max??"999"),l=Math.max(o,Math.min(r,Math.round((n+e)/a)*a));this._call("number","set_value",{value:l},s)}_renderClimate(){const t=this._cl,e="off"!==t?.state,s=t?.attributes.current_temperature??0,i=t?.attributes.temperature??20,n=t?.attributes.min_temp??5,a=t?.attributes.max_temp??35,o="on"===this._ent("heating_entity")?.state,r="on"===this._ent("window_entity")?.state,l="on"===this._ent("fault_entity")?.state,c=this._currentModeKey(),d=this._isValid(this.config.mode_entity),p=this._gaugeArc(s,n,a);return L`
      ${r||l?L`
        <div class="k-alert">
          <span class="ms fill">${r?"window":"warning"}</span>
          ${r?"Fenêtre ouverte détectée":"Défaut détecté — vérifiez l'appareil"}
        </div>
      `:""}

      <div class="k-gauge-wrap">
        <div class="k-glow"></div>
        <svg class="k-gauge-svg" viewBox="0 0 100 100"
          style="transform:rotate(-90deg);overflow:visible;">
          <defs>
            <filter id="kglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#1a1a1a" stroke-width="7"/>
          <circle cx="50" cy="50" r="44" fill="none"
            stroke="${e&&o?"#8eff71":"#484847"}"
            stroke-width="7"
            stroke-linecap="round"
            stroke-dasharray="${p}"
            filter="${e&&o?"url(#kglow)":""}"
            style="transition:stroke-dasharray .5s ease,stroke .3s ease;"
          />
        </svg>
        <div class="k-gauge-inner">
          <div class="k-temp-label">${this.config.name||t?.attributes.friendly_name||"Thermostat"}</div>
          <div class="k-temp-current">${void 0!==s?s:"--"}<sup>°C</sup></div>
          <div style="margin-top:6px;">
            ${e?L`<span class="k-chip on" style="font-size:.65em;">
                  ${o?"⚡ En chauffe":"⏸ En attente"}
                </span>`:L`<span class="k-chip" style="font-size:.65em;">Éteint</span>`}
          </div>
        </div>
      </div>

      <div class="k-target">
        <button class="k-btn-round" @click=${()=>this._adjustTemp(-.5)}>−</button>
        <span class="k-target-val">${i}°C</span>
        <button class="k-btn-round" @click=${()=>this._adjustTemp(.5)}>+</button>
      </div>

      <hr class="k-hr">

      <div class="k-modes-wrap" style="padding-top:12px;">
        <div class="k-section-label">Mode</div>
        ${d?"":L`
          <div class="k-warn">⚠ Configurez mode_entity pour changer de mode.</div>
        `}
        <div class="k-modes">
          ${Object.entries(dt).map(([t,s])=>{const i="Standby"===t?!e:e&&c===t,n=i?s.color:"";return L`
              <button
                class="k-mode-btn ${i?"active":""}"
                ?disabled=${!d&&"Standby"!==t}
                @click=${()=>this._activateMode(t)}
                style="${i?`color:${n};border-color:${n}40;background:${n}14;`:""}"
              >
                <span class="ms" style="${i?`color:${n};font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;`:""}">${s.icon}</span>
                <span class="k-mode-label">${s.label}</span>
              </button>
            `})}
        </div>
      </div>
    `}_renderEnergy(){const t=this._ent("power_entity"),e=this._ent("elec_entity"),s="on"===this._ent("heating_entity")?.state,i=t?parseFloat(t.state):null,n=t?.attributes.unit_of_measurement??"W",a=e?.state??null,o=e?.attributes.unit_of_measurement??"";return L`
      <div class="k-section">
        <div class="k-section-label" style="margin-bottom:12px;">Énergie</div>

        ${null!==i?L`
          <div class="k-power-hero">
            <div class="k-power-bg">electric_bolt</div>
            <div class="k-power-lbl">Puissance moyenne</div>
            <div class="k-power-val">${isNaN(i)?"--":i}<span class="k-power-unit">${n}</span></div>
          </div>
        `:""}

        <div class="k-stat-row">
          <span class="k-stat-lbl">
            <span class="ms k-stat-icon">mode_fan</span>
            État chauffe
          </span>
          <span class="k-stat-val" style="color:${s?"#8eff71":"#adaaaa"}">
            ${s?"Active":"Veille"}
          </span>
        </div>

        ${null!==a?L`
          <div class="k-stat-row">
            <span class="k-stat-lbl">
              <span class="ms k-stat-icon">bolt</span>
              Consommation
            </span>
            <span class="k-stat-val">${a}<span class="k-stat-unit">${o}</span></span>
          </div>
        `:""}

        ${t||e?"":L`
          <div class="k-placeholder" style="padding:30px 0;">
            <span class="ms" style="font-size:2.5em;color:#484847;">insights</span>
            <span class="k-placeholder-title">Données énergie</span>
            <span class="k-placeholder-sub">
              Configurez <strong>power_entity</strong> et/ou <strong>elec_entity</strong>
              dans les options de la carte pour afficher les statistiques.
            </span>
          </div>
        `}
      </div>
    `}_renderSettings(){const t=this._cl,e=this._ent("child_lock_entity"),s="on"===e?.state,i=this._ent("upper_temp_entity"),n=this._ent("lower_temp_entity"),a=this._ent("boost_entity"),o=this._ent("holiday_entity"),r="on"===this._ent("fault_entity")?.state,l=i?`${parseFloat(i.state)}°C`:null!=t?.attributes.upper_temp?`${t.attributes.upper_temp}°C`:"—",c=n?`${parseFloat(n.state)}°C`:null!=t?.attributes.lower_temp?`${t.attributes.lower_temp}°C`:"—",d=a?`${parseInt(a.state,10)} min`:null,p=o?`${parseInt(o.state,10)} j`:null;return L`
      <div class="k-section">
        <div class="k-section-label" style="margin-bottom:12px;">Paramètres avancés</div>

        ${e?L`
          <div class="k-setting">
            <div class="k-setting-info">
              <span class="k-setting-title">Verrou enfant</span>
              <span class="k-setting-sub">switch.verrou_enfant</span>
            </div>
            <label class="k-toggle">
              <input type="checkbox" ?checked=${s}
                @change=${()=>this._toggleChildLock()}>
              <div class="k-track"></div>
              <div class="k-thumb"></div>
            </label>
          </div>
        `:""}

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Limite haute</span>
            <span class="k-setting-sub">number.limite_haute_temperature</span>
          </div>
          ${i?L`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${()=>this._adjustNumber("upper_temp_entity",-.5)}>−</button>
              <span class="k-num-val">${l}</span>
              <button class="k-num-btn" @click=${()=>this._adjustNumber("upper_temp_entity",.5)}>+</button>
            </div>
          `:L`<span class="k-stat-val" style="color:#adaaaa">${l}</span>`}
        </div>

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Limite basse</span>
            <span class="k-setting-sub">number.limite_basse_temperature</span>
          </div>
          ${n?L`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${()=>this._adjustNumber("lower_temp_entity",-.5)}>−</button>
              <span class="k-num-val">${c}</span>
              <button class="k-num-btn" @click=${()=>this._adjustNumber("lower_temp_entity",.5)}>+</button>
            </div>
          `:L`<span class="k-stat-val" style="color:#adaaaa">${c}</span>`}
        </div>

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Durée boost</span>
            <span class="k-setting-sub">number.duree_boost</span>
          </div>
          ${a?L`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${()=>this._adjustNumber("boost_entity",-5)}>−</button>
              <span class="k-num-val">${d}</span>
              <button class="k-num-btn" @click=${()=>this._adjustNumber("boost_entity",5)}>+</button>
            </div>
          `:L`<span style="color:#484847;font-size:0.78em;">Non configuré</span>`}
        </div>

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Mode vacances</span>
            <span class="k-setting-sub">number.duree_vacances</span>
          </div>
          ${o?L`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${()=>this._adjustNumber("holiday_entity",-1)}>−</button>
              <span class="k-num-val">${p}</span>
              <button class="k-num-btn" @click=${()=>this._adjustNumber("holiday_entity",1)}>+</button>
            </div>
          `:L`<span style="color:#484847;font-size:0.78em;">Non configuré</span>`}
        </div>

        <hr class="k-hr" style="margin:12px 0;">
        <div class="k-section-label" style="margin-bottom:8px;">Alarmes techniques</div>

        <div class="k-alarm ${r?"active":"ok"}">
          <span class="ms k-alarm-icon fill">${r?"warning":"check_circle"}</span>
          <div>
            <div class="k-alarm-title">${r?"Défaut détecté":"Système nominal"}</div>
            <div class="k-alarm-sub">binary_sensor.alarme_defaut</div>
          </div>
        </div>
      </div>
    `}_renderSchedule(){return L`
      <div class="k-placeholder">
        <span class="ms" style="font-size:3em;color:#484847;">calendar_today</span>
        <span class="k-placeholder-title">Programmation</span>
        <span class="k-placeholder-sub">
          Les créneaux horaires (Matin / Jour / Soir / Nuit) nécessitent
          des entités dédiées dans l'intégration, actuellement en développement.<br><br>
          En attendant, activez le mode <strong>Prog.</strong> depuis l'onglet Climat.
        </span>
      </div>
    `}_renderNav(){return L`
      <nav class="k-nav">
        ${[{key:"climate",icon:"thermostat",label:"Climat"},{key:"schedule",icon:"calendar_today",label:"Prog."},{key:"energy",icon:"insights",label:"Énergie"},{key:"settings",icon:"settings",label:"Réglages"}].map(t=>L`
          <button class="k-nav-btn ${this._tab===t.key?"active":""}"
            @click=${()=>{this._tab=t.key}}>
            <span class="k-nav-icon">${t.icon}</span>
            <span class="k-nav-label">${t.label}</span>
          </button>
        `)}
      </nav>
    `}render(){if(!this.hass||!this.config||!this._cl)return L`<ha-card>
        <div style="padding:1.2em;color:var(--error-color,#e53935);">
          ⚠ Configuration manquante — vérifiez l'entity.
        </div>
      </ha-card>`;const t=this._cl,e="off"!==t.state,s="on"===this._ent("heating_entity")?.state,i="on"===this._ent("window_entity")?.state,n="on"===this._ent("fault_entity")?.state,a=this.config.name||t.attributes.friendly_name||"Thermostat";let o;switch(this._tab){case"climate":o=this._renderClimate();break;case"energy":o=this._renderEnergy();break;case"settings":o=this._renderSettings();break;case"schedule":o=this._renderSchedule()}return L`
      <ha-card>
        <div class="k">
          <header class="k-header">
            <span class="k-logo">⚡ ${a}</span>
            <div class="k-chips">
              ${e?L`<span class="k-chip on">${s?"Chauffe":"Actif"}</span>`:L`<span class="k-chip">Éteint</span>`}
              ${i?L`<span class="k-chip err">🪟</span>`:""}
              ${n?L`<span class="k-chip err">⚠</span>`:""}
            </div>
          </header>

          <div class="k-content">${o}</div>

          ${this._renderNav()}
        </div>
      </ha-card>
    `}};ft.styles=o`
    :host { display: block; }

    ha-card {
      background: #0e0e0e;
      border-radius: 16px;
      overflow: hidden;
      padding: 0;
    }

    /* ── Root layout ── */
    .k {
      display: flex;
      flex-direction: column;
      min-height: 520px;
      font-family: 'Inter', var(--primary-font-family, sans-serif);
      color: #ffffff;
    }

    /* ── Material Symbols ── */
    .ms {
      font-family: 'Material Symbols Outlined';
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      font-size: 1.3em;
      line-height: 1;
    }
    .ms.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

    /* ── Header ── */
    .k-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px 12px;
      background: #131313;
    }
    .k-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1em;
      letter-spacing: 0.15em;
      color: #8eff71;
      text-transform: uppercase;
    }
    .k-chips { display: flex; gap: 6px; align-items: center; }
    .k-chip {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 100px;
      background: #262626;
      color: #adaaaa;
    }
    .k-chip.on  { background: rgba(142,255,113,.15); color: #8eff71; }
    .k-chip.err { background: rgba(255,115,81,.15);  color: #ff7351; }

    /* ── Scrollable content ── */
    .k-content { flex: 1; overflow-y: auto; }

    /* ── Alert ── */
    .k-alert {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 12px 16px 0;
      padding: 10px 14px;
      border-radius: 10px;
      background: rgba(185,41,2,.15);
      border: 1px solid rgba(255,115,81,.25);
      font-size: 0.82em;
      font-weight: 600;
      color: #ff7351;
    }

    /* ── Gauge ── */
    .k-gauge-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 20px 4px;
    }
    .k-gauge-svg { width: 200px; height: 200px; }
    .k-gauge-inner {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -44%);
      text-align: center;
      pointer-events: none;
    }
    .k-temp-label {
      font-size: 0.58em;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #adaaaa;
    }
    .k-temp-current {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 3.6em;
      font-weight: 700;
      line-height: 1;
    }
    .k-temp-current sup { font-size: 0.3em; color: #8eff71; vertical-align: super; }
    .k-glow {
      position: absolute;
      width: 110px; height: 110px;
      background: radial-gradient(circle, rgba(142,255,113,.07), transparent 70%);
      border-radius: 50%;
      top: 50%; left: 50%;
      transform: translate(-50%, -44%);
      pointer-events: none;
    }

    /* ── Target temp controls ── */
    .k-target {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 2px 20px 14px;
    }
    .k-target-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.7em;
      font-weight: 400;
      min-width: 4.5em;
      text-align: center;
    }
    .k-btn-round {
      width: 42px; height: 42px;
      border-radius: 50%;
      border: 1px solid #484847;
      background: #1a1a1a;
      color: #8eff71;
      font-size: 1.3em;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .15s;
    }
    .k-btn-round:hover { background: #8eff71; color: #0d6100; border-color: transparent; }

    /* ── Mode grid ── */
    .k-modes-wrap { padding: 0 14px 14px; }
    .k-section-label {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #adaaaa;
      margin-bottom: 10px;
    }
    .k-modes {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
    }
    .k-mode-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 12px 4px;
      border-radius: 12px;
      border: 1px solid transparent;
      background: #1a1a1a;
      color: #adaaaa;
      cursor: pointer;
      transition: all .2s;
      font-family: 'Inter', sans-serif;
    }
    .k-mode-btn:hover:not(.active):not(:disabled) { background: #262626; }
    .k-mode-btn.active {
      background: rgba(142,255,113,.1);
      border-color: rgba(142,255,113,.3);
      box-shadow: 0 0 14px rgba(142,255,113,.08);
    }
    .k-mode-btn:disabled { opacity: .35; cursor: not-allowed; }
    .k-mode-label { font-size: 0.62em; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }

    .k-warn {
      font-size: 0.73em;
      color: #f4b400;
      margin-bottom: 8px;
    }

    /* ── Divider ── */
    .k-hr { border: none; border-top: 1px solid rgba(72,72,71,.4); margin: 0 14px; }

    /* ── Shared section ── */
    .k-section { padding: 14px 14px; }

    /* ── Stats rows ── */
    .k-stat-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 14px;
      background: #131313;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .k-stat-lbl {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.8em;
      color: #adaaaa;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .k-stat-icon { color: rgba(142,255,113,.6); }
    .k-stat-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.05em;
      font-weight: 700;
    }
    .k-stat-unit { font-size: 0.68em; font-weight: 400; color: #adaaaa; margin-left: 2px; }

    /* Power hero */
    .k-power-hero {
      position: relative;
      overflow: hidden;
      padding: 18px 18px 16px;
      background: #131313;
      border-radius: 12px;
      margin-bottom: 10px;
    }
    .k-power-lbl {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #adaaaa;
      margin-bottom: 6px;
    }
    .k-power-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.8em;
      font-weight: 700;
      line-height: 1;
    }
    .k-power-unit { font-size: 0.38em; color: #8eff71; margin-left: 4px; }
    .k-power-bg {
      position: absolute;
      top: 0; right: 0;
      font-family: 'Material Symbols Outlined';
      font-size: 5.5em;
      opacity: 0.05;
      padding: 8px;
      color: #8eff71;
      line-height: 1;
    }

    /* ── Settings ── */
    .k-setting {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 14px;
      background: #131313;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .k-setting-info { display: flex; flex-direction: column; gap: 2px; }
    .k-setting-title { font-size: 0.88em; font-weight: 600; }
    .k-setting-sub { font-size: 0.68em; color: #adaaaa; letter-spacing: 0.04em; text-transform: uppercase; }

    /* Toggle */
    .k-toggle { position: relative; display: inline-block; width: 46px; height: 25px; cursor: pointer; }
    .k-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
    .k-track {
      position: absolute; inset: 0;
      background: #262626;
      border-radius: 100px;
      transition: background .2s;
    }
    .k-toggle input:checked + .k-track { background: rgba(142,255,113,.3); }
    .k-thumb {
      position: absolute;
      width: 19px; height: 19px;
      border-radius: 50%;
      background: #adaaaa;
      top: 3px; left: 3px;
      transition: all .2s;
      pointer-events: none;
    }
    .k-toggle input:checked ~ .k-thumb { background: #8eff71; transform: translateX(21px); }

    /* Number control */
    .k-num-ctrl { display: flex; align-items: center; gap: 6px; }
    .k-num-btn {
      width: 30px; height: 30px;
      border-radius: 50%;
      border: 1px solid #484847;
      background: #1a1a1a;
      color: #8eff71;
      font-size: 1.05em;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .15s;
    }
    .k-num-btn:hover { background: #8eff71; color: #0d6100; border-color: transparent; }
    .k-num-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1em;
      font-weight: 600;
      min-width: 52px;
      text-align: center;
    }

    /* Alarm */
    .k-alarm {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 13px 14px;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .k-alarm.active { background: rgba(185,41,2,.15); border: 1px solid rgba(255,115,81,.25); }
    .k-alarm.ok     { background: #131313; }
    .k-alarm-icon   { font-size: 1.3em; }
    .k-alarm.active .k-alarm-icon { color: #ff7351; }
    .k-alarm.ok     .k-alarm-icon { color: #adaaaa; }
    .k-alarm-title { font-weight: 600; font-size: 0.88em; }
    .k-alarm-sub   { font-size: 0.68em; color: #adaaaa; text-transform: uppercase; letter-spacing: 0.04em; }

    /* ── Schedule placeholder ── */
    .k-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 48px 24px;
      text-align: center;
      color: #adaaaa;
    }
    .k-placeholder .ms { font-size: 3em; color: #484847; }
    .k-placeholder-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1em;
      font-weight: 600;
      color: #ffffff;
    }
    .k-placeholder-sub { font-size: 0.8em; line-height: 1.55; max-width: 280px; }

    /* ── Bottom nav ── */
    .k-nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 6px 14px;
      background: rgba(19,19,19,.95);
      backdrop-filter: blur(12px);
    }
    .k-nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 6px 14px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 12px;
      transition: all .15s;
      color: #adaaaa;
      font-family: 'Inter', sans-serif;
    }
    .k-nav-btn.active { background: #1a1a1a; color: #8eff71; }
    .k-nav-icon {
      font-family: 'Material Symbols Outlined';
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      font-size: 1.4em;
      line-height: 1;
    }
    .k-nav-btn.active .k-nav-icon {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .k-nav-label { font-size: 0.58em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  `,t([lt({type:Object})],ft.prototype,"hass",void 0),t([lt({type:Object})],ft.prototype,"config",void 0),t([lt({type:String,attribute:!1})],ft.prototype,"_tab",void 0),ft=t([ot("tuya-thermostat-card")],ft),window.customCards=window.customCards||[],window.customCards.push({type:"tuya-thermostat-card",name:"Tuya Thermostat Card (Kinetic)",preview:!0,description:"Carte Lovelace style Kinetic pour le thermostat Tuya"});export{ft as TuyaThermostatCard,ut as TuyaThermostatCardEditor};
//# sourceMappingURL=tuya-pilot-thermostat-card.js.map
