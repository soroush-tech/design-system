const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/chunk-JTTtZPr_2.js","assets/chunks/chunk-aKtaBQYM.js","assets/chunks/chunk-m-9K0bxn.js","assets/chunks/chunk-zJ_50EbN.js","assets/chunks/chunk-BkML6sXq.js","assets/chunks/chunk--uy_ci8l.js","assets/chunks/chunk-B92s48ZP.js","assets/static/style-250bdd4d.BuwUwpVc.css","assets/static/style-5f9f6d50.Cp2DSHCZ.css","assets/chunks/chunk-CIiz954-.js","assets/chunks/chunk-DFt3txFn.js","assets/chunks/chunk-DrZSmk0t.js","assets/chunks/chunk-CI6yrsLE.js","assets/chunks/chunk-qdTJd0j4.js"])))=>i.map(i=>d[i]);
import{i as e,n as t,r as n,t as r}from"../chunks/chunk-aKtaBQYM.js";import{$ as i,C as a,Ct as o,D as s,G as c,H as l,I as u,J as d,K as f,M as p,P as m,Q as h,T as g,U as _,V as v,X as y,Z as b,_ as x,_t as S,a as C,ct as w,dt as ee,et as T,h as te,ht as E,it as D,l as O,lt as ne,n as re,nt as k,ot as A,p as ie,pt as ae,r as oe,rt as j,s as se,st as ce,t as le,tt as M,u as ue,wt as N,x as de,xt as fe,y as pe,z as me}from"../chunks/chunk-m-9K0bxn.js";import{t as he}from"../chunks/chunk--uy_ci8l.js";import{O as P,W as ge,d as F,i as I,l as _e,n as L,z as ve}from"../chunks/chunk-BkML6sXq.js";import{t as ye}from"../chunks/chunk-zJ_50EbN.js";import{n as be,t as R}from"../chunks/chunk-WqZbfXZo.js";import{a as xe,i as z,n as Se,r as B,t as Ce}from"../chunks/chunk-DFt3txFn.js";import{$ as we,A as Te,At as V,B as Ee,Bt as De,C as Oe,Ct as ke,D as Ae,Dt as je,E as Me,Et as H,F as U,Ft as Ne,G as Pe,H as Fe,I as Ie,It as Le,J as Re,Jt as W,K as ze,Kt as Be,L as Ve,Lt as G,M as He,Mt as Ue,N as We,Nt as Ge,O as Ke,P as qe,Pt as Je,Q as Ye,R as Xe,Rt as Ze,S as Qe,St as $e,T as et,Tt as tt,U as nt,Ut as K,V as rt,Vt as it,W as at,Wt as ot,X as st,Xt as ct,Y as lt,Z as ut,_t as dt,at as ft,b as pt,bt as mt,ct as ht,d as gt,dt as _t,et as vt,f as yt,ft as bt,g as xt,gt as St,ht as Ct,i as wt,it as Tt,j as Et,jt as Dt,k as Ot,kt,l as At,lt as jt,m as Mt,mt as Nt,n as Pt,nt as Ft,o as It,ot as Lt,p as Rt,pt as zt,q as Bt,rt as Vt,st as Ht,t as Ut,tt as Wt,u as Gt,ut as Kt,v as qt,vt as Jt,w as Yt,wt as Xt,xt as Zt,y as Qt,yt as $t,z as en,zt as tn}from"../chunks/chunk-CI6yrsLE.js";import{n as nn}from"../chunks/chunk-qdTJd0j4.js";var q=e(he(),1);function rn(){try{return!!globalThis.__vitest_browser__||!!globalThis.window?.navigator?.userAgent?.match(/StorybookTestRunner/)}catch{return!1}}function an(e=!0){if(!(`document`in globalThis&&`createElement`in globalThis.document))return()=>{};let t=document.createElement(`style`);t.textContent=`*, *:before, *:after {
    animation: none !important;
  }`,document.head.appendChild(t);let n=document.createElement(`style`);return n.textContent=`*, *:before, *:after {
    animation-delay: 0s !important;
    animation-direction: ${e?`reverse`:`normal`} !important;
    animation-play-state: paused !important;
    transition: none !important;
  }`,document.head.appendChild(n),document.body.clientHeight,document.head.removeChild(t),()=>{n.parentNode?.removeChild(n)}}async function on(e){if(!(`document`in globalThis&&`getAnimations`in globalThis.document&&`querySelectorAll`in globalThis.document))return;let t=!1;await Promise.race([new Promise(n=>{setTimeout(()=>{let r=[globalThis.document,...sn(globalThis.document)],i=async()=>{if(t||e?.aborted)return;let n=r.flatMap(e=>e?.getAnimations?.()||[]).filter(e=>e.playState===`running`&&!cn(e));n.length>0&&(await Promise.allSettled(n.map(async e=>e.finished)),await i())};i().then(n)},100)}),new Promise(e=>setTimeout(()=>{t=!0,e(void 0)},5e3))])}function sn(e){return[e,...e.querySelectorAll(`*`)].reduce((e,t)=>(`shadowRoot`in t&&t.shadowRoot&&e.push(t.shadowRoot,...sn(t.shadowRoot)),e),[])}function cn(e){if(e instanceof CSSAnimation&&e.effect instanceof KeyframeEffect&&e.effect.target){let t=getComputedStyle(e.effect.target,e.effect.pseudoElement),n=t.animationName?.split(`, `).indexOf(e.animationName);return t.animationIterationCount.split(`, `)[n]===`infinite`}return!1}var ln=e=>e.transports!==void 0,un=()=>Math.random().toString(16).slice(2),dn=class{constructor(e={}){this.sender=un(),this.events={},this.data={},this.transports=[],this.isAsync=e.async||!1,ln(e)?(this.transports=e.transports||[],this.transports.forEach(e=>{e.setHandler(e=>this.handleEvent(e))})):this.transports=e.transport?[e.transport]:[],this.transports.forEach(e=>{e.setHandler(e=>this.handleEvent(e))})}get hasTransport(){return this.transports.length>0}addListener(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)}emit(e,...t){let n={type:e,args:t,from:this.sender},r={};t.length>=1&&t[0]&&t[0].options&&(r=t[0].options);let i=()=>{this.transports.forEach(e=>{e.send(n,r)}),this.handleEvent(n)};this.isAsync?setImmediate(i):i()}last(e){return this.data[e]}eventNames(){return Object.keys(this.events)}listenerCount(e){let t=this.listeners(e);return t?t.length:0}listeners(e){return this.events[e]||void 0}once(e,t){let n=this.onceListener(e,t);this.addListener(e,n)}removeAllListeners(e){e?this.events[e]&&delete this.events[e]:this.events={}}removeListener(e,t){let n=this.listeners(e);n&&(this.events[e]=n.filter(e=>e!==t))}on(e,t){this.addListener(e,t)}off(e,t){this.removeListener(e,t)}handleEvent(e){let t=this.listeners(e.type);t&&t.length&&t.forEach(t=>{t.apply(e,e.args)}),this.data[e.type]=e.args}onceListener(e,t){let n=(...r)=>(this.removeListener(e,n),t(...r));return n}},fn;function pn(e){globalThis.__STORYBOOK_ADDONS_CHANNEL__=e}function mn(){let e=globalThis.__STORYBOOK_ADDONS_CHANNEL__;return e&&(fn=e),fn??null}function hn(e){fn=e??void 0,pn(fn)}function gn(){hn(new dn({}))}function _n(){mn()||gn()}typeof window>`u`&&_n();function vn(){return new dn({transport:{setHandler:()=>{},send:()=>{}}})}var yn={AUTODOCS:`autodocs`,ATTACHED_MDX:`attached-mdx`,UNATTACHED_MDX:`unattached-mdx`,PLAY_FN:`play-fn`,TEST_FN:`test-fn`,DEV:`dev`,TEST:`test`,MANIFEST:`manifest`};Array.from({length:256},(e,t)=>`%`+((t<16?`0`:``)+t.toString(16)).toUpperCase()),new Int8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0]);var bn=function(){};bn.prototype=Object.create(null);var xn=Object.create,Sn=Object.defineProperty,Cn=Object.getOwnPropertyDescriptor,wn=Object.getOwnPropertyNames,Tn=Object.getPrototypeOf,En=Object.prototype.hasOwnProperty,Dn=(e=>typeof n<`u`?n:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof n<`u`?n:e)[t]}):e)(function(e){if(typeof n<`u`)return n.apply(this,arguments);throw Error(`Dynamic require of "`+e+`" is not supported`)}),On=(e,t)=>function(){try{return t||(0,e[wn(e)[0]])((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},kn=(e,t)=>{for(var n in t)Sn(e,n,{get:t[n],enumerable:!0})},An=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(let i of wn(t))!En.call(e,i)&&i!==n&&Sn(e,i,{get:()=>t[i],enumerable:!(r=Cn(t,i))||r.enumerable});return e},jn=(e,t,n)=>(n=e==null?{}:xn(Tn(e)),An(t||!e||!e.__esModule?Sn(n,`default`,{value:e,enumerable:!0}):n,e)),Mn=On({"../../node_modules/memoizerific/memoizerific.js"(e,t){(function(n){if(typeof e==`object`&&typeof t<`u`)t.exports=n();else if(typeof define==`function`&&define.amd)define([],n);else{var r=typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:this;r.memoizerific=n()}})(function(){return(function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var c=typeof Dn==`function`&&Dn;if(!s&&c)return c(o,!0);if(a)return a(o,!0);var l=Error(`Cannot find module '`+o+`'`);throw l.code=`MODULE_NOT_FOUND`,l}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){var n=t[o][1][e];return i(n||e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var a=typeof Dn==`function`&&Dn,o=0;o<r.length;o++)i(r[o]);return i})({1:[function(e,t,n){t.exports=function(t){return typeof Map!=`function`||t?new(e(`./similar`)):new Map}},{"./similar":2}],2:[function(e,t,n){function r(){return this.list=[],this.lastItem=void 0,this.size=0,this}r.prototype.get=function(e){var t;if(this.lastItem&&this.isEqual(this.lastItem.key,e))return this.lastItem.val;if(t=this.indexOf(e),t>=0)return this.lastItem=this.list[t],this.list[t].val},r.prototype.set=function(e,t){var n;return this.lastItem&&this.isEqual(this.lastItem.key,e)?(this.lastItem.val=t,this):(n=this.indexOf(e),n>=0?(this.lastItem=this.list[n],this.list[n].val=t,this):(this.lastItem={key:e,val:t},this.list.push(this.lastItem),this.size++,this))},r.prototype.delete=function(e){var t;if(this.lastItem&&this.isEqual(this.lastItem.key,e)&&(this.lastItem=void 0),t=this.indexOf(e),t>=0)return this.size--,this.list.splice(t,1)[0]},r.prototype.has=function(e){var t;return this.lastItem&&this.isEqual(this.lastItem.key,e)?!0:(t=this.indexOf(e),t>=0?(this.lastItem=this.list[t],!0):!1)},r.prototype.forEach=function(e,t){var n;for(n=0;n<this.size;n++)e.call(t||this,this.list[n].val,this.list[n].key,this)},r.prototype.indexOf=function(e){var t;for(t=0;t<this.size;t++)if(this.isEqual(this.list[t].key,e))return t;return-1},r.prototype.isEqual=function(e,t){return e===t||e!==e&&t!==t},t.exports=r},{}],3:[function(e,t,n){var r=e(`map-or-similar`);t.exports=function(e){var t=new r(!1),n=[];return function(o){var s=function(){var c=t,l,u,d=arguments.length-1,f=Array(d+1),p=!0,m;if((s.numArgs||s.numArgs===0)&&s.numArgs!==d+1)throw Error(`Memoizerific functions should always be called with the same number of arguments`);for(m=0;m<d;m++){if(f[m]={cacheItem:c,arg:arguments[m]},c.has(arguments[m])){c=c.get(arguments[m]);continue}p=!1,l=new r(!1),c.set(arguments[m],l),c=l}return p&&(c.has(arguments[d])?u=c.get(arguments[d]):p=!1),p||(u=o.apply(null,arguments),c.set(arguments[d],u)),e>0&&(f[d]={cacheItem:c,arg:arguments[d]},p?i(n,f):n.push(f),n.length>e&&a(n.shift())),s.wasMemoized=p,s.numArgs=d+1,u};return s.limit=e,s.wasMemoized=!1,s.cache=t,s.lru=n,s}};function i(e,t){var n=e.length,r=t.length,i,a,s;for(a=0;a<n;a++){for(i=!0,s=0;s<r;s++)if(!o(e[a][s].arg,t[s].arg)){i=!1;break}if(i)break}e.push(e.splice(a,1)[0])}function a(e){var t=e.length,n=e[t-1],r,i;for(n.cacheItem.delete(n.arg),i=t-2;i>=0&&(n=e[i],r=n.cacheItem.get(n.arg),!r||!r.size);i--)n.cacheItem.delete(n.arg)}function o(e,t){return e===t||e!==e&&t!==t}},{"map-or-similar":1}]},{},[3])(3)})}});function Nn(){}function Pn(e){if(!e||typeof e!=`object`)return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)===`[object Object]`:!1}function Fn(e){return Object.getOwnPropertySymbols(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}function In(e){return e==null?e===void 0?`[object Undefined]`:`[object Null]`:Object.prototype.toString.call(e)}var Ln=`[object RegExp]`,Rn=`[object String]`,zn=`[object Number]`,Bn=`[object Boolean]`,Vn=`[object Symbol]`,Hn=`[object Date]`,Un=`[object Map]`,Wn=`[object Set]`,Gn=`[object Array]`,Kn=`[object Function]`,qn=`[object ArrayBuffer]`,Jn=`[object Object]`,Yn=`[object Error]`,Xn=`[object DataView]`,Zn=`[object Uint8Array]`,Qn=`[object Uint8ClampedArray]`,$n=`[object Uint16Array]`,er=`[object Uint32Array]`,tr=`[object BigUint64Array]`,nr=`[object Int8Array]`,rr=`[object Int16Array]`,ir=`[object Int32Array]`,ar=`[object BigInt64Array]`,or=`[object Float32Array]`,sr=`[object Float64Array]`;function cr(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function lr(e,t,n){return ur(e,t,void 0,void 0,void 0,void 0,n)}function ur(e,t,n,r,i,a,o){let s=o(e,t,n,r,i,a);if(s!==void 0)return s;if(typeof e==typeof t)switch(typeof e){case`bigint`:case`string`:case`boolean`:case`symbol`:case`undefined`:return e===t;case`number`:return e===t||Object.is(e,t);case`function`:return e===t;case`object`:return dr(e,t,a,o)}return dr(e,t,a,o)}function dr(e,t,n,r){if(Object.is(e,t))return!0;let i=In(e),a=In(t);if(i===`[object Arguments]`&&(i=`[object Object]`),a===`[object Arguments]`&&(a=`[object Object]`),i!==a)return!1;switch(i){case Rn:return e.toString()===t.toString();case zn:return cr(e.valueOf(),t.valueOf());case Bn:case Hn:case Vn:return Object.is(e.valueOf(),t.valueOf());case Ln:return e.source===t.source&&e.flags===t.flags;case Kn:return e===t}n??=new Map;let o=n.get(e),s=n.get(t);if(o!=null&&s!=null)return o===t;n.set(e,t),n.set(t,e);try{switch(i){case Un:if(e.size!==t.size)return!1;for(let[i,a]of e.entries())if(!t.has(i)||!ur(a,t.get(i),i,e,t,n,r))return!1;return!0;case Wn:{if(e.size!==t.size)return!1;let i=Array.from(e.values()),a=Array.from(t.values());for(let o=0;o<i.length;o++){let s=i[o],c=a.findIndex(i=>ur(s,i,void 0,e,t,n,r));if(c===-1)return!1;a.splice(c,1)}return!0}case Gn:case Zn:case Qn:case $n:case er:case tr:case nr:case rr:case ir:case ar:case or:case sr:if(typeof Buffer<`u`&&Buffer.isBuffer(e)!==Buffer.isBuffer(t)||e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!ur(e[i],t[i],i,e,t,n,r))return!1;return!0;case qn:return e.byteLength===t.byteLength?dr(new Uint8Array(e),new Uint8Array(t),n,r):!1;case Xn:return e.byteLength!==t.byteLength||e.byteOffset!==t.byteOffset?!1:dr(new Uint8Array(e),new Uint8Array(t),n,r);case Yn:return e.name===t.name&&e.message===t.message;case Jn:{if(!(dr(e.constructor,t.constructor,n,r)||Pn(e)&&Pn(t)))return!1;let i=[...Object.keys(e),...Fn(e)],a=[...Object.keys(t),...Fn(t)];if(i.length!==a.length)return!1;for(let a=0;a<i.length;a++){let o=i[a],s=e[o];if(!Object.hasOwn(t,o))return!1;let c=t[o];if(!ur(s,c,o,e,t,n,r))return!1}return!0}default:return!1}}finally{n.delete(e),n.delete(t)}}function fr(e,t){return lr(e,t,Nn)}function pr(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let a=r[i],o=e[a];n[a]=t(o,a,e)}return n}function mr(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let a=r[i],o=e[a];t(o,a)&&(n[a]=o)}return n}function hr(e){var t=[...arguments].slice(1),n=Array.from(typeof e==`string`?[e]:e);n[n.length-1]=n[n.length-1].replace(/\r?\n([\t ]*)$/,``);var r=n.reduce(function(e,t){var n=t.match(/\n([\t ]+|(?!\s).)/g);return n?e.concat(n.map(function(e){return e.match(/[\t ]/g)?.length??0})):e},[]);if(r.length){var i=RegExp(`
[	 ]{`+Math.min.apply(Math,r)+`}`,`g`);n=n.map(function(e){return e.replace(i,`
`)})}n[0]=n[0].replace(/^\r?\n/,``);var a=n[0];return t.forEach(function(e,t){var r=a.match(/(?:^|\n)( *)$/),i=r?r[1]:``,o=e;typeof e==`string`&&e.includes(`
`)&&(o=String(e).split(`
`).map(function(e,t){return t===0?e:``+i+e}).join(`
`)),a+=o+n[t+1]}),a}var J=(()=>{let e;return e=typeof window<`u`?window:typeof globalThis<`u`?globalThis:typeof global<`u`?global:typeof self<`u`?self:{},e})(),{LOGLEVEL:gr}=J,_r={trace:1,debug:2,info:3,warn:4,error:5,silent:10},vr=_r[gr]||_r.info,yr={trace:(e,...t)=>{vr<=_r.trace&&console.trace(e,...t)},debug:(e,...t)=>{vr<=_r.debug&&console.debug(e,...t)},info:(e,...t)=>{vr<=_r.info&&console.info(e,...t)},warn:(e,...t)=>{vr<=_r.warn&&console.warn(e,...t)},error:(e,...t)=>{vr<=_r.error&&console.error(e,...t)},log:(e,...t)=>{vr<_r.silent&&console.log(e,...t)}},br=new Set,xr=e=>(t,...n)=>{if(!br.has(t))return br.add(t),yr[e](t,...n)};xr.clear=()=>br.clear(),xr.trace=xr(`trace`),xr.debug=xr(`debug`),xr.info=xr(`info`),xr.warn=xr(`warn`),xr.error=xr(`error`),xr.log=xr(`log`);var Sr=xr(`warn`),Cr=e=>(...t)=>{let n=[];if(t.length){let e=/<span\s+style=(['"])([^'"]*)\1\s*>/gi,r=/<\/span>/gi,i;for(n.push(t[0].replace(e,`%c`).replace(r,`%c`));i=e.exec(t[0]);)n.push(i[2]),n.push(``);for(let e=1;e<t.length;e++)n.push(t[e])}yr[e].apply(yr,n)};Cr.trace=Cr(`trace`),Cr.debug=Cr(`debug`),Cr.info=Cr(`info`),Cr.warn=Cr(`warn`),Cr.error=Cr(`error`);var wr=(...e)=>{let t={},n=e.filter(Boolean),r=n.reduce((e,n)=>(Object.entries(n).forEach(([n,r])=>{let i=e[n];Array.isArray(r)||typeof i>`u`?e[n]=r:Pn(r)&&Pn(i)?t[n]=!0:typeof r<`u`&&(e[n]=r)}),e),{});return Object.keys(t).forEach(e=>{let t=n.filter(Boolean).map(t=>t[e]).filter(e=>typeof e<`u`);t.every(e=>Pn(e))?r[e]=wr(...t):r[e]=t[t.length-1]}),r},Tr=(e,t)=>Array.isArray(t)?t.includes(e):e.match(t),Er=(e,t,n)=>!t&&!n?e:e&&mr(e,(e,r)=>{let i=e.name||r.toString();return!!(!t||Tr(i,t))&&(!n||!Tr(i,n))}),Dr=(e,t,n)=>{let{type:r,options:i}=e;if(r){if(n.color&&n.color.test(t)){let e=r.name;if(e===`string`)return{control:{type:`color`}};e!==`enum`&&yr.warn(`Addon controls: Control of type color only supports string, received "${e}" instead`)}if(n.date&&n.date.test(t))return{control:{type:`date`}};switch(r.name){case`array`:return{control:{type:`object`}};case`boolean`:return{control:{type:`boolean`}};case`string`:return{control:{type:`text`}};case`number`:return{control:{type:`number`}};case`enum`:{let{value:e}=r;return{control:{type:e?.length<=5?`radio`:`select`},options:e}}case`function`:case`symbol`:return null;default:return{control:{type:i?`select`:`object`}}}}},Or=e=>{let{argTypes:t,parameters:{__isArgsStory:n,controls:{include:r=null,exclude:i=null,matchers:a={}}={}}}=e;if(!n)return t;let o=Er(t,r,i);return wr(pr(o,(e,t)=>e?.type&&Dr(e,t.toString(),a)),o)};Or.secondPass=!0;var kr=(e,t,n,r)=>{let i=typeof e;switch(i){case`boolean`:case`string`:case`number`:case`function`:case`symbol`:return{name:i};default:break}if(e){if(r.has(e))return r.get(e);if(n.has(e))return yr.warn(hr`
        We've detected a cycle in arg '${t}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `),{name:`other`,value:`cyclic object`};n.add(e);let i;return i=Array.isArray(e)?{name:`array`,value:e.length>0?kr(e[0],t,n,r):{name:`other`,value:`unknown`}}:{name:`object`,value:pr(e,e=>kr(e,t,n,r))},n.delete(e),r.set(e,i),i}return{name:`object`,value:{}}},Ar=e=>{let{id:t,argTypes:n={},initialArgs:r={}}=e,i=new Map;return wr(Object.fromEntries(Object.entries(r).filter(([e])=>!n[e]?.type).map(([e,n])=>[e,{name:e,type:kr(n,`${t}.${e}`,new Set,i)}])),pr(n,(e,t)=>({name:t})),n)};Ar.secondPass=!0;function jr({code:e,category:t}){return`SB_${t}_${String(e).padStart(4,`0`)}`}function Mr(e){if(/^(?!.*storybook\.js\.org)|[?&]ref=error\b/.test(e))return e;try{let t=new URL(e);return t.searchParams.set(`ref`,`error`),t.toString()}catch{return e}}var Nr=class e extends Error{constructor(t){super(e.getFullMessage(t),t.cause===void 0?void 0:{cause:t.cause}),this.data={},this.fromStorybook=!0,this.isHandledError=!1,this.subErrors=[],this.category=t.category,this.documentation=t.documentation??!1,this.code=t.code,this.isHandledError=t.isHandledError??!1,this.name=t.name,this.subErrors=t.subErrors??[]}get fullErrorCode(){return jr({code:this.code,category:this.category})}get name(){let e=this._name||this.constructor.name;return`${this.fullErrorCode} (${e})`}set name(e){this._name=e}static getFullMessage({documentation:e,code:t,category:n,message:r}){let i;return e===!0?i=`https://storybook.js.org/error/${jr({code:t,category:n})}?ref=error`:typeof e==`string`?i=Mr(e):Array.isArray(e)&&(i=`
${e.map(e=>`	- ${Mr(e)}`).join(`
`)}`),`${r}${i==null?``:`

More info: ${i}
`}`}},Pr=(e=>(e.BLOCKS=`BLOCKS`,e.DOCS_TOOLS=`DOCS-TOOLS`,e.PREVIEW_CLIENT_LOGGER=`PREVIEW_CLIENT-LOGGER`,e.PREVIEW_CHANNELS=`PREVIEW_CHANNELS`,e.PREVIEW_CORE_EVENTS=`PREVIEW_CORE-EVENTS`,e.PREVIEW_INSTRUMENTER=`PREVIEW_INSTRUMENTER`,e.PREVIEW_API=`PREVIEW_API`,e.PREVIEW_REACT_DOM_SHIM=`PREVIEW_REACT-DOM-SHIM`,e.PREVIEW_ROUTER=`PREVIEW_ROUTER`,e.PREVIEW_THEMING=`PREVIEW_THEMING`,e.RENDERER_HTML=`RENDERER_HTML`,e.RENDERER_PREACT=`RENDERER_PREACT`,e.RENDERER_REACT=`RENDERER_REACT`,e.RENDERER_SERVER=`RENDERER_SERVER`,e.RENDERER_SVELTE=`RENDERER_SVELTE`,e.RENDERER_VUE=`RENDERER_VUE`,e.RENDERER_VUE3=`RENDERER_VUE3`,e.RENDERER_WEB_COMPONENTS=`RENDERER_WEB-COMPONENTS`,e.FRAMEWORK_NEXTJS=`FRAMEWORK_NEXTJS`,e.ADDON_VITEST=`ADDON_VITEST`,e.ADDON_A11Y=`ADDON_A11Y`,e))(Pr||{}),Fr=class extends Nr{constructor(e){super({name:`ImplicitActionsDuringRendering`,category:`PREVIEW_API`,code:2,documentation:`https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function`,message:hr`
        We detected that you use an implicit action arg while ${e.phase} of your story.  
        ${e.deprecated?`
This is deprecated and won't work in Storybook 8 anymore.
`:``}
        Please provide an explicit spy to your args like this:
          import { fn } from 'storybook/test';
          ... 
          args: {
           ${e.name}: fn()
          }`}),this.data=e}},Ir=class extends Nr{constructor(e){super({name:`MountMustBeDestructuredError`,category:`PREVIEW_API`,code:12,message:hr`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing?ref=error#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${e.playFunction}`}),this.data=e}},Lr=class extends Nr{constructor(e){super({name:`NoRenderFunctionError`,category:`PREVIEW_API`,code:14,message:hr`
        No render function available for storyId '${e.id}'
      `}),this.data=e}},Rr=class extends Nr{constructor(e){super({name:`UnknownArgTypesError`,category:`DOCS-TOOLS`,code:1,documentation:`https://github.com/storybookjs/storybook/issues/26606`,message:hr`
        There was a failure when generating detailed ArgTypes in ${e.language} for:
        ${JSON.stringify(e.type,null,2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `}),this.data=e}},zr=On({"../../node_modules/jsdoc-type-pratt-parser/dist/index.js"(e,t){(function(n,r){typeof e==`object`&&typeof t<`u`?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n=typeof globalThis<`u`?globalThis:n||self,r(n.jtpp={}))})(e,(function(e){function t(e){return e.text!==void 0&&e.text!==``?`'${e.type}' with value '${e.text}'`:`'${e.type}'`}class n extends Error{constructor(e){super(`No parslet found for token: ${t(e)}`),this.token=e,Object.setPrototypeOf(this,n.prototype)}getToken(){return this.token}}class r extends Error{constructor(e){super(`The parsing ended early. The next token was: ${t(e)}`),this.token=e,Object.setPrototypeOf(this,r.prototype)}getToken(){return this.token}}class i extends Error{constructor(e,t){let n=`Unexpected type: '${e.type}'.`;t!==void 0&&(n+=` Message: ${t}`),super(n),Object.setPrototypeOf(this,i.prototype)}}function a(e){return t=>t.startsWith(e)?{type:e,text:e}:null}function o(e){let t=0,n,r=e[0],i=!1;if(r!==`'`&&r!==`"`)return null;for(;t<e.length;){if(t++,n=e[t],!i&&n===r){t++;break}i=!i&&n===`\\`}if(n!==r)throw Error(`Unterminated String`);return e.slice(0,t)}let s=RegExp(`[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}`,`u`),c=RegExp(`[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}`,`u`);function l(e){let t=e[0];if(!s.test(t))return null;let n=1;do{if(t=e[n],!c.test(t))break;n++}while(n<e.length);return e.slice(0,n)}let u=/^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;function d(e){return u.exec(e)?.[0]??null}let f=e=>{let t=l(e);return t==null?null:{type:`Identifier`,text:t}};function p(e){return t=>{if(!t.startsWith(e))return null;let n=t[e.length];return n!==void 0&&c.test(n)?null:{type:e,text:e}}}let m=[e=>e.length>0?null:{type:`EOF`,text:``},a(`=>`),a(`(`),a(`)`),a(`{`),a(`}`),a(`[`),a(`]`),a(`|`),a(`&`),a(`<`),a(`>`),a(`,`),a(`;`),a(`*`),a(`?`),a(`!`),a(`=`),a(`:`),a(`...`),a(`.`),a(`#`),a(`~`),a(`/`),a(`@`),p(`undefined`),p(`null`),p(`function`),p(`this`),p(`new`),p(`module`),p(`event`),p(`extends`),p(`external`),p(`infer`),p(`typeof`),p(`keyof`),p(`readonly`),p(`import`),p(`is`),p(`in`),p(`asserts`),e=>{let t=d(e);return t===null?null:{type:`Number`,text:t}},f,e=>{let t=o(e);return t==null?null:{type:`StringValue`,text:t}}],h=/^\s*\n\s*/;class g{static create(e){let t=this.read(e);e=t.text;let n=this.read(e);return e=n.text,new g(e,void 0,t.token,n.token)}constructor(e,t,n,r){this.text=``,this.text=e,this.previous=t,this.current=n,this.next=r}static read(e,t=!1){t||=h.test(e),e=e.trim();for(let n of m){let r=n(e);if(r!==null){let n=Object.assign(Object.assign({},r),{startOfLine:t});return e=e.slice(n.text.length),{text:e,token:n}}}throw Error(`Unexpected Token `+e)}advance(){let e=g.read(this.text);return new g(e.text,this.current,this.next,e.token)}}function _(e){if(e===void 0)throw Error(`Unexpected undefined`);if(e.type===`JsdocTypeKeyValue`||e.type===`JsdocTypeParameterList`||e.type===`JsdocTypeProperty`||e.type===`JsdocTypeReadonlyProperty`||e.type===`JsdocTypeObjectField`||e.type===`JsdocTypeJsdocObjectField`||e.type===`JsdocTypeIndexSignature`||e.type===`JsdocTypeMappedType`||e.type===`JsdocTypeTypeParameter`)throw new i(e);return e}function v(e){return e.type===`JsdocTypeKeyValue`?b(e):_(e)}function y(e){return e.type===`JsdocTypeName`?e:b(e)}function b(e){if(e.type!==`JsdocTypeKeyValue`)throw new i(e);return e}function x(e){if(e.type===`JsdocTypeVariadic`){if(e.element?.type===`JsdocTypeName`)return e;throw new i(e)}if(e.type!==`JsdocTypeNumber`&&e.type!==`JsdocTypeName`)throw new i(e);return e}function S(e){if(e.type===`JsdocTypeTuple`||e.type===`JsdocTypeGeneric`&&e.meta.brackets===`square`)return e;throw new i(e)}function C(e){return e.type===`JsdocTypeIndexSignature`||e.type===`JsdocTypeMappedType`}var w;(function(e){e[e.ALL=0]=`ALL`,e[e.PARAMETER_LIST=1]=`PARAMETER_LIST`,e[e.OBJECT=2]=`OBJECT`,e[e.KEY_VALUE=3]=`KEY_VALUE`,e[e.INDEX_BRACKETS=4]=`INDEX_BRACKETS`,e[e.UNION=5]=`UNION`,e[e.INTERSECTION=6]=`INTERSECTION`,e[e.PREFIX=7]=`PREFIX`,e[e.INFIX=8]=`INFIX`,e[e.TUPLE=9]=`TUPLE`,e[e.SYMBOL=10]=`SYMBOL`,e[e.OPTIONAL=11]=`OPTIONAL`,e[e.NULLABLE=12]=`NULLABLE`,e[e.KEY_OF_TYPE_OF=13]=`KEY_OF_TYPE_OF`,e[e.FUNCTION=14]=`FUNCTION`,e[e.ARROW=15]=`ARROW`,e[e.ARRAY_BRACKETS=16]=`ARRAY_BRACKETS`,e[e.GENERIC=17]=`GENERIC`,e[e.NAME_PATH=18]=`NAME_PATH`,e[e.PARENTHESIS=19]=`PARENTHESIS`,e[e.SPECIAL_TYPES=20]=`SPECIAL_TYPES`})(w||={});class ee{constructor(e,t,n){this.grammar=e,typeof t==`string`?this._lexer=g.create(t):this._lexer=t,this.baseParser=n}get lexer(){return this._lexer}parse(){let e=this.parseType(w.ALL);if(this.lexer.current.type!==`EOF`)throw new r(this.lexer.current);return e}parseType(e){return _(this.parseIntermediateType(e))}parseIntermediateType(e){let t=this.tryParslets(null,e);if(t===null)throw new n(this.lexer.current);return this.parseInfixIntermediateType(t,e)}parseInfixIntermediateType(e,t){let n=this.tryParslets(e,t);for(;n!==null;)e=n,n=this.tryParslets(e,t);return e}tryParslets(e,t){for(let n of this.grammar){let r=n(this,t,e);if(r!==null)return r}return null}consume(e){return Array.isArray(e)||(e=[e]),e.includes(this.lexer.current.type)?(this._lexer=this.lexer.advance(),!0):!1}acceptLexerState(e){this._lexer=e.lexer}}function T(e){return e===`}`||e===`EOF`||e===`|`||e===`,`||e===`)`||e===`>`}let te=(e,t,n)=>{let r=e.lexer.current.type,i=e.lexer.next.type;return n==null&&r===`?`&&!T(i)||n!=null&&r===`?`?(e.consume(`?`),n==null?{type:`JsdocTypeNullable`,element:e.parseType(w.NULLABLE),meta:{position:`prefix`}}:{type:`JsdocTypeNullable`,element:_(n),meta:{position:`suffix`}}):null};function E(e){let t=(t,n,r)=>{let i=t.lexer.current.type,a=t.lexer.next.type;if(r===null){if(`parsePrefix`in e&&e.accept(i,a))return e.parsePrefix(t)}else if(`parseInfix`in e&&e.precedence>n&&e.accept(i,a))return e.parseInfix(t,r);return null};return Object.defineProperty(t,"name",{value:e.name}),t}let D=E({name:`optionalParslet`,accept:e=>e===`=`,precedence:w.OPTIONAL,parsePrefix:e=>(e.consume(`=`),{type:`JsdocTypeOptional`,element:e.parseType(w.OPTIONAL),meta:{position:`prefix`}}),parseInfix:(e,t)=>(e.consume(`=`),{type:`JsdocTypeOptional`,element:_(t),meta:{position:`suffix`}})}),O=E({name:`numberParslet`,accept:e=>e===`Number`,parsePrefix:e=>{let t=parseFloat(e.lexer.current.text);return e.consume(`Number`),{type:`JsdocTypeNumber`,value:t}}}),ne=E({name:`parenthesisParslet`,accept:e=>e===`(`,parsePrefix:e=>{if(e.consume(`(`),e.consume(`)`))return{type:`JsdocTypeParameterList`,elements:[]};let t=e.parseIntermediateType(w.ALL);if(!e.consume(`)`))throw Error(`Unterminated parenthesis`);return t.type===`JsdocTypeParameterList`?t:t.type===`JsdocTypeKeyValue`?{type:`JsdocTypeParameterList`,elements:[t]}:{type:`JsdocTypeParenthesis`,element:_(t)}}}),re=E({name:`specialTypesParslet`,accept:(e,t)=>e===`?`&&T(t)||e===`null`||e===`undefined`||e===`*`,parsePrefix:e=>{if(e.consume(`null`))return{type:`JsdocTypeNull`};if(e.consume(`undefined`))return{type:`JsdocTypeUndefined`};if(e.consume(`*`))return{type:`JsdocTypeAny`};if(e.consume(`?`))return{type:`JsdocTypeUnknown`};throw Error(`Unacceptable token: `+e.lexer.current.text)}}),k=E({name:`notNullableParslet`,accept:e=>e===`!`,precedence:w.NULLABLE,parsePrefix:e=>(e.consume(`!`),{type:`JsdocTypeNotNullable`,element:e.parseType(w.NULLABLE),meta:{position:`prefix`}}),parseInfix:(e,t)=>(e.consume(`!`),{type:`JsdocTypeNotNullable`,element:_(t),meta:{position:`suffix`}})});function A({allowTrailingComma:e}){return E({name:`parameterListParslet`,accept:e=>e===`,`,precedence:w.PARAMETER_LIST,parseInfix:(e,t)=>{let r=[v(t)];e.consume(`,`);do try{let t=e.parseIntermediateType(w.PARAMETER_LIST);r.push(v(t))}catch(e){if(e instanceof n)break;throw e}while(e.consume(`,`));if(r.length>0&&r.slice(0,-1).some(e=>e.type===`JsdocTypeVariadic`))throw Error(`Only the last parameter may be a rest parameter`);return{type:`JsdocTypeParameterList`,elements:r}}})}let ie=E({name:`genericParslet`,accept:(e,t)=>e===`<`||e===`.`&&t===`<`,precedence:w.GENERIC,parseInfix:(e,t)=>{let n=e.consume(`.`);e.consume(`<`);let r=[],a=!1;if(e.consume(`infer`)){a=!0;let t=e.parseIntermediateType(w.SYMBOL);if(t.type!==`JsdocTypeName`)throw new i(t,`A typescript asserts always has to have a name on the left side.`);r.push(t)}else do r.push(e.parseType(w.PARAMETER_LIST));while(e.consume(`,`));if(!e.consume(`>`))throw Error(`Unterminated generic parameter list`);return Object.assign(Object.assign({type:`JsdocTypeGeneric`,left:_(t),elements:r},a?{infer:!0}:{}),{meta:{brackets:`angle`,dot:n}})}}),ae=E({name:`unionParslet`,accept:e=>e===`|`,precedence:w.UNION,parseInfix:(e,t)=>{e.consume(`|`);let n=[];do n.push(e.parseType(w.UNION));while(e.consume(`|`));return{type:`JsdocTypeUnion`,elements:[_(t),...n]}}}),oe=[te,D,O,ne,re,k,A({allowTrailingComma:!0}),ie,ae,D];function j({allowSquareBracketsOnAnyType:e,allowJsdocNamePaths:t,pathGrammar:n}){return function(r,a,o){if(o==null||a>=w.NAME_PATH)return null;let s=r.lexer.current.type,c=r.lexer.next.type;if(!(s===`.`&&c!==`<`||s===`[`&&(e||o.type===`JsdocTypeName`)||t&&(s===`~`||s===`#`)))return null;let l,u=!1;r.consume(`.`)?l=`property`:r.consume(`[`)?(l=`property-brackets`,u=!0):r.consume(`~`)?l=`inner`:(r.consume(`#`),l=`instance`);let d=n===null?r:new ee(n,r.lexer,r),f=d.parseIntermediateType(w.NAME_PATH);r.acceptLexerState(d);let p;switch(f.type){case`JsdocTypeName`:p={type:`JsdocTypeProperty`,value:f.value,meta:{quote:void 0}};break;case`JsdocTypeNumber`:p={type:`JsdocTypeProperty`,value:f.value.toString(10),meta:{quote:void 0}};break;case`JsdocTypeStringValue`:p={type:`JsdocTypeProperty`,value:f.value,meta:{quote:f.meta.quote}};break;case`JsdocTypeSpecialNamePath`:if(f.specialType===`event`)p=f;else throw new i(f,`Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'`);break;default:throw new i(f,`Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'`)}if(u&&!r.consume(`]`)){let e=r.lexer.current;throw Error(`Unterminated square brackets. Next token is '${e.type}' with text '${e.text}'`)}return{type:`JsdocTypeNamePath`,left:_(o),right:p,pathType:l}}}function se({allowedAdditionalTokens:e}){return E({name:`nameParslet`,accept:t=>t===`Identifier`||t===`this`||t===`new`||e.includes(t),parsePrefix:e=>{let{type:t,text:n}=e.lexer.current;return e.consume(t),{type:`JsdocTypeName`,value:n}}})}let ce=E({name:`stringValueParslet`,accept:e=>e===`StringValue`,parsePrefix:e=>{let t=e.lexer.current.text;return e.consume(`StringValue`),{type:`JsdocTypeStringValue`,value:t.slice(1,-1),meta:{quote:t[0]===`'`?`single`:`double`}}}});function le({pathGrammar:e,allowedTypes:t}){return E({name:`specialNamePathParslet`,accept:e=>t.includes(e),parsePrefix:t=>{let n=t.lexer.current.type;if(t.consume(n),!t.consume(`:`))return{type:`JsdocTypeName`,value:n};let r,i=t.lexer.current;if(t.consume(`StringValue`))r={type:`JsdocTypeSpecialNamePath`,value:i.text.slice(1,-1),specialType:n,meta:{quote:i.text[0]===`'`?`single`:`double`}};else{let e=``,a=[`Identifier`,`@`,`/`];for(;a.some(e=>t.consume(e));)e+=i.text,i=t.lexer.current;r={type:`JsdocTypeSpecialNamePath`,value:e,specialType:n,meta:{quote:void 0}}}let a=new ee(e,t.lexer,t),o=a.parseInfixIntermediateType(r,w.ALL);return t.acceptLexerState(a),_(o)}})}let M=[se({allowedAdditionalTokens:[`external`,`module`]}),ce,O,j({allowSquareBracketsOnAnyType:!1,allowJsdocNamePaths:!0,pathGrammar:null})],ue=[...M,le({allowedTypes:[`event`],pathGrammar:M})];function N(e){let t;if(e.type===`JsdocTypeParameterList`)t=e.elements;else if(e.type===`JsdocTypeParenthesis`)t=[e.element];else throw new i(e);return t.map(e=>v(e))}function de(e){let t=N(e);if(t.some(e=>e.type===`JsdocTypeKeyValue`))throw Error(`No parameter should be named`);return t}function fe({allowNamedParameters:e,allowNoReturnType:t,allowWithoutParenthesis:n,allowNewAsFunctionKeyword:r}){return E({name:`functionParslet`,accept:(e,t)=>e===`function`||r&&e===`new`&&t===`(`,parsePrefix:r=>{let i=r.consume(`new`);r.consume(`function`);let a=r.lexer.current.type===`(`;if(!a){if(!n)throw Error(`function is missing parameter list`);return{type:`JsdocTypeName`,value:`function`}}let o={type:`JsdocTypeFunction`,parameters:[],arrow:!1,constructor:i,parenthesis:a},s=r.parseIntermediateType(w.FUNCTION);if(e===void 0)o.parameters=de(s);else{if(i&&s.type===`JsdocTypeFunction`&&s.arrow)return o=s,o.constructor=!0,o;o.parameters=N(s);for(let t of o.parameters)if(t.type===`JsdocTypeKeyValue`&&!e.includes(t.key))throw Error(`only allowed named parameters are ${e.join(`, `)} but got ${t.type}`)}if(r.consume(`:`))o.returnType=r.parseType(w.PREFIX);else if(!t)throw Error(`function is missing return type`);return o}})}function pe({allowPostfix:e,allowEnclosingBrackets:t}){return E({name:`variadicParslet`,accept:e=>e===`...`,precedence:w.PREFIX,parsePrefix:e=>{e.consume(`...`);let r=t&&e.consume(`[`);try{let t=e.parseType(w.PREFIX);if(r&&!e.consume(`]`))throw Error(`Unterminated variadic type. Missing ']'`);return{type:`JsdocTypeVariadic`,element:_(t),meta:{position:`prefix`,squareBrackets:r}}}catch(e){if(e instanceof n){if(r)throw Error(`Empty square brackets for variadic are not allowed.`);return{type:`JsdocTypeVariadic`,meta:{position:void 0,squareBrackets:!1}}}else throw e}},parseInfix:e?(e,t)=>(e.consume(`...`),{type:`JsdocTypeVariadic`,element:_(t),meta:{position:`suffix`,squareBrackets:!1}}):void 0})}let me=E({name:`symbolParslet`,accept:e=>e===`(`,precedence:w.SYMBOL,parseInfix:(e,t)=>{if(t.type!==`JsdocTypeName`)throw Error(`Symbol expects a name on the left side. (Reacting on '(')`);e.consume(`(`);let n={type:`JsdocTypeSymbol`,value:t.value};if(!e.consume(`)`)&&(n.element=x(e.parseIntermediateType(w.SYMBOL)),!e.consume(`)`)))throw Error(`Symbol does not end after value`);return n}}),he=E({name:`arrayBracketsParslet`,precedence:w.ARRAY_BRACKETS,accept:(e,t)=>e===`[`&&t===`]`,parseInfix:(e,t)=>(e.consume(`[`),e.consume(`]`),{type:`JsdocTypeGeneric`,left:{type:`JsdocTypeName`,value:`Array`},elements:[_(t)],meta:{brackets:`square`,dot:!1}})});function P({objectFieldGrammar:e,allowKeyTypes:t}){return E({name:`objectParslet`,accept:e=>e===`{`,parsePrefix:n=>{n.consume(`{`);let r={type:`JsdocTypeObject`,meta:{separator:`comma`},elements:[]};if(!n.consume(`}`)){let a,o=new ee(e,n.lexer,n);for(;;){o.acceptLexerState(n);let e=o.parseIntermediateType(w.OBJECT);n.acceptLexerState(o),e===void 0&&t&&(e=n.parseIntermediateType(w.OBJECT));let s=!1;if(e.type===`JsdocTypeNullable`&&(s=!0,e=e.element),e.type===`JsdocTypeNumber`||e.type===`JsdocTypeName`||e.type===`JsdocTypeStringValue`){let t;e.type===`JsdocTypeStringValue`&&(t=e.meta.quote),r.elements.push({type:`JsdocTypeObjectField`,key:e.value.toString(),right:void 0,optional:s,readonly:!1,meta:{quote:t}})}else if(e.type===`JsdocTypeObjectField`||e.type===`JsdocTypeJsdocObjectField`)r.elements.push(e);else throw new i(e);if(n.lexer.current.startOfLine)a=`linebreak`,n.consume(`,`)||n.consume(`;`);else if(n.consume(`,`))a=`comma`;else if(n.consume(`;`))a=`semicolon`;else break;if(n.lexer.current.type===`}`)break}if(r.meta.separator=a??`comma`,a===`linebreak`&&(r.meta.propertyIndent=`  `),!n.consume(`}`))throw Error(`Unterminated record type. Missing '}'`)}return r}})}function ge({allowSquaredProperties:e,allowKeyTypes:t,allowReadonly:n,allowOptional:r}){return E({name:`objectFieldParslet`,precedence:w.KEY_VALUE,accept:e=>e===`:`,parseInfix:(a,o)=>{let s=!1,c=!1;r&&o.type===`JsdocTypeNullable`&&(s=!0,o=o.element),n&&o.type===`JsdocTypeReadonlyProperty`&&(c=!0,o=o.element);let l=a.baseParser??a;if(l.acceptLexerState(a),o.type===`JsdocTypeNumber`||o.type===`JsdocTypeName`||o.type===`JsdocTypeStringValue`||C(o)){if(C(o)&&!e)throw new i(o);l.consume(`:`);let t;o.type===`JsdocTypeStringValue`&&(t=o.meta.quote);let n=l.parseType(w.KEY_VALUE);return a.acceptLexerState(l),{type:`JsdocTypeObjectField`,key:C(o)?o:o.value.toString(),right:n,optional:s,readonly:c,meta:{quote:t}}}else{if(!t)throw new i(o);l.consume(`:`);let e=l.parseType(w.KEY_VALUE);return a.acceptLexerState(l),{type:`JsdocTypeJsdocObjectField`,left:_(o),right:e}}}})}function F({allowOptional:e,allowVariadic:t}){return E({name:`keyValueParslet`,precedence:w.KEY_VALUE,accept:e=>e===`:`,parseInfix:(n,r)=>{let a=!1,o=!1;if(e&&r.type===`JsdocTypeNullable`&&(a=!0,r=r.element),t&&r.type===`JsdocTypeVariadic`&&r.element!==void 0&&(o=!0,r=r.element),r.type!==`JsdocTypeName`)throw new i(r);n.consume(`:`);let s=n.parseType(w.KEY_VALUE);return{type:`JsdocTypeKeyValue`,key:r.value,right:s,optional:a,variadic:o}}})}let I=[...oe,fe({allowWithoutParenthesis:!0,allowNamedParameters:[`this`,`new`],allowNoReturnType:!0,allowNewAsFunctionKeyword:!1}),ce,le({allowedTypes:[`module`,`external`,`event`],pathGrammar:ue}),pe({allowEnclosingBrackets:!0,allowPostfix:!0}),se({allowedAdditionalTokens:[`keyof`]}),me,he,j({allowSquareBracketsOnAnyType:!1,allowJsdocNamePaths:!0,pathGrammar:ue})],_e=[...I,P({objectFieldGrammar:[se({allowedAdditionalTokens:[`typeof`,`module`,`in`]}),ge({allowSquaredProperties:!1,allowKeyTypes:!0,allowOptional:!1,allowReadonly:!1}),...I],allowKeyTypes:!0}),F({allowOptional:!0,allowVariadic:!0})],L=E({name:`typeOfParslet`,accept:e=>e===`typeof`,parsePrefix:e=>(e.consume(`typeof`),{type:`JsdocTypeTypeof`,element:e.parseType(w.KEY_OF_TYPE_OF)})}),ve=[se({allowedAdditionalTokens:[`typeof`,`module`,`keyof`,`event`,`external`,`in`]}),te,D,ce,O,ge({allowSquaredProperties:!1,allowKeyTypes:!1,allowOptional:!1,allowReadonly:!1})],ye=[...oe,P({allowKeyTypes:!1,objectFieldGrammar:ve}),se({allowedAdditionalTokens:[`event`,`external`,`in`]}),L,fe({allowWithoutParenthesis:!1,allowNamedParameters:[`this`,`new`],allowNoReturnType:!0,allowNewAsFunctionKeyword:!1}),pe({allowEnclosingBrackets:!1,allowPostfix:!1}),se({allowedAdditionalTokens:[`keyof`]}),le({allowedTypes:[`module`],pathGrammar:ue}),j({allowSquareBracketsOnAnyType:!1,allowJsdocNamePaths:!0,pathGrammar:ue}),F({allowOptional:!1,allowVariadic:!1}),me],be=E({name:`assertsParslet`,accept:e=>e===`asserts`,parsePrefix:e=>{e.consume(`asserts`);let t=e.parseIntermediateType(w.SYMBOL);if(t.type!==`JsdocTypeName`)throw new i(t,`A typescript asserts always has to have a name on the left side.`);return e.consume(`is`)?{type:`JsdocTypeAsserts`,left:t,right:_(e.parseIntermediateType(w.INFIX))}:{type:`JsdocTypeAssertsPlain`,element:t}}});function R({allowQuestionMark:e}){return E({name:`tupleParslet`,accept:e=>e===`[`,parsePrefix:e=>{e.consume(`[`);let t={type:`JsdocTypeTuple`,elements:[]};if(e.consume(`]`))return t;let n=e.parseIntermediateType(w.ALL);if(n.type===`JsdocTypeParameterList`?n.elements[0].type===`JsdocTypeKeyValue`?t.elements=n.elements.map(b):t.elements=n.elements.map(_):n.type===`JsdocTypeKeyValue`?t.elements=[b(n)]:t.elements=[_(n)],!e.consume(`]`))throw Error(`Unterminated '['`);if(t.elements.some(e=>e.type===`JsdocTypeUnknown`))throw Error(`Question mark in tuple not allowed`);return t}})}let xe=E({name:`keyOfParslet`,accept:e=>e===`keyof`,parsePrefix:e=>(e.consume(`keyof`),{type:`JsdocTypeKeyof`,element:_(e.parseType(w.KEY_OF_TYPE_OF))})}),z=E({name:`importParslet`,accept:e=>e===`import`,parsePrefix:e=>{if(e.consume(`import`),!e.consume(`(`))throw Error(`Missing parenthesis after import keyword`);let t=e.parseType(w.PREFIX);if(t.type!==`JsdocTypeStringValue`)throw Error(`Only string values are allowed as paths for imports`);if(!e.consume(`)`))throw Error(`Missing closing parenthesis after import keyword`);return{type:`JsdocTypeImport`,element:t}}}),Se=E({name:`readonlyPropertyParslet`,accept:e=>e===`readonly`,parsePrefix:e=>(e.consume(`readonly`),{type:`JsdocTypeReadonlyProperty`,element:e.parseIntermediateType(w.KEY_VALUE)})}),B=E({name:`arrowFunctionParslet`,precedence:w.ARROW,accept:e=>e===`=>`,parseInfix:(e,t)=>(e.consume(`=>`),{type:`JsdocTypeFunction`,parameters:N(t).map(y),arrow:!0,constructor:!1,parenthesis:!0,returnType:e.parseType(w.OBJECT)})}),Ce=E({name:`genericArrowFunctionParslet`,accept:e=>e===`<`,parsePrefix:e=>{let t=[];e.consume(`<`);do{let n,r=e.parseIntermediateType(w.SYMBOL);if(r.type===`JsdocTypeOptional`&&(r=r.element,n=e.parseType(w.SYMBOL)),r.type!==`JsdocTypeName`)throw new i(r);let a;e.consume(`extends`)&&(a=e.parseType(w.SYMBOL),a.type===`JsdocTypeOptional`&&(a=a.element,n=e.parseType(w.SYMBOL)));let o={type:`JsdocTypeTypeParameter`,name:r};if(a!==void 0&&(o.constraint=a),n!==void 0&&(o.defaultValue=n),t.push(o),e.consume(`>`))break}while(e.consume(`,`));let n=e.parseIntermediateType(w.SYMBOL);return n.typeParameters=t,n}}),we=E({name:`intersectionParslet`,accept:e=>e===`&`,precedence:w.INTERSECTION,parseInfix:(e,t)=>{e.consume(`&`);let n=[];do n.push(e.parseType(w.INTERSECTION));while(e.consume(`&`));return{type:`JsdocTypeIntersection`,elements:[_(t),...n]}}}),Te=E({name:`predicateParslet`,precedence:w.INFIX,accept:e=>e===`is`,parseInfix:(e,t)=>{if(t.type!==`JsdocTypeName`)throw new i(t,`A typescript predicate always has to have a name on the left side.`);return e.consume(`is`),{type:`JsdocTypePredicate`,left:t,right:_(e.parseIntermediateType(w.INFIX))}}}),V=E({name:`objectSquareBracketPropertyParslet`,accept:e=>e===`[`,parsePrefix:e=>{if(e.baseParser===void 0)throw Error(`Only allowed inside object grammar`);e.consume(`[`);let t=e.lexer.current.text;e.consume(`Identifier`);let n;if(e.consume(`:`)){let r=e.baseParser;r.acceptLexerState(e),n={type:`JsdocTypeIndexSignature`,key:t,right:r.parseType(w.INDEX_BRACKETS)},e.acceptLexerState(r)}else if(e.consume(`in`)){let r=e.baseParser;r.acceptLexerState(e),n={type:`JsdocTypeMappedType`,key:t,right:r.parseType(w.ARRAY_BRACKETS)},e.acceptLexerState(r)}else throw Error(`Missing ':' or 'in' inside square bracketed property.`);if(!e.consume(`]`))throw Error(`Unterminated square brackets`);return n}}),Ee=E({name:`readonlyArrayParslet`,accept:e=>e===`readonly`,parsePrefix:e=>(e.consume(`readonly`),{type:`JsdocTypeReadonlyArray`,element:S(e.parseIntermediateType(w.ALL))})}),De=E({name:`conditionalParslet`,precedence:w.INFIX,accept:e=>e===`extends`,parseInfix:(e,t)=>{e.consume(`extends`);let n=e.parseType(w.KEY_OF_TYPE_OF).element,r=e.parseType(w.INFIX);return e.consume(`:`),{type:`JsdocTypeConditional`,checksType:_(t),extendsType:n,trueType:r,falseType:e.parseType(w.INFIX)}}}),Oe=[Se,se({allowedAdditionalTokens:[`typeof`,`module`,`keyof`,`event`,`external`,`in`]}),te,D,ce,O,ge({allowSquaredProperties:!0,allowKeyTypes:!1,allowOptional:!0,allowReadonly:!0}),V],ke=[...oe,P({allowKeyTypes:!1,objectFieldGrammar:Oe}),Ee,L,xe,z,ce,fe({allowWithoutParenthesis:!0,allowNoReturnType:!1,allowNamedParameters:[`this`,`new`,`args`],allowNewAsFunctionKeyword:!0}),R({allowQuestionMark:!1}),pe({allowEnclosingBrackets:!1,allowPostfix:!1}),be,De,se({allowedAdditionalTokens:[`event`,`external`,`in`]}),le({allowedTypes:[`module`],pathGrammar:ue}),he,B,Ce,j({allowSquareBracketsOnAnyType:!0,allowJsdocNamePaths:!1,pathGrammar:ue}),we,Te,F({allowVariadic:!0,allowOptional:!0})];function Ae(e,t){switch(t){case`closure`:return new ee(ye,e).parse();case`jsdoc`:return new ee(_e,e).parse();case`typescript`:return new ee(ke,e).parse()}}function je(e,t=[`typescript`,`closure`,`jsdoc`]){let n;for(let r of t)try{return Ae(e,r)}catch(e){n=e}throw n}function Me(e,t){let n=e[t.type];if(n===void 0)throw Error(`In this set of transform rules exists no rule for type ${t.type}.`);return n(t,t=>Me(e,t))}function H(e){throw Error(`This transform is not available. Are you trying the correct parsing mode?`)}function U(e){let t={params:[]};for(let n of e.parameters)n.type===`JsdocTypeKeyValue`?n.key===`this`?t.this=n.right:n.key===`new`?t.new=n.right:t.params.push(n):t.params.push(n);return t}function Ne(e,t,n){return e===`prefix`?n+t:t+n}function Pe(e,t){switch(t){case`double`:return`"${e}"`;case`single`:return`'${e}'`;case void 0:return e}}function Fe(){return{JsdocTypeParenthesis:(e,t)=>`(${e.element===void 0?``:t(e.element)})`,JsdocTypeKeyof:(e,t)=>`keyof ${t(e.element)}`,JsdocTypeFunction:(e,t)=>{if(e.arrow){if(e.returnType===void 0)throw Error(`Arrow function needs a return type.`);let n=`${e.typeParameters===void 0?``:`<${e.typeParameters.map(t).join(`, `)??``}>`}(${e.parameters.map(t).join(`, `)}) => ${t(e.returnType)}`;return e.constructor&&(n=`new `+n),n}else{let n=e.constructor?`new`:`function`;return e.parenthesis&&(n+=`(${e.parameters.map(t).join(`, `)})`,e.returnType!==void 0&&(n+=`: ${t(e.returnType)}`)),n}},JsdocTypeName:e=>e.value,JsdocTypeTuple:(e,t)=>`[${e.elements.map(t).join(`, `)}]`,JsdocTypeVariadic:(e,t)=>e.meta.position===void 0?`...`:Ne(e.meta.position,t(e.element),`...`),JsdocTypeNamePath:(e,t)=>{let n=t(e.left),r=t(e.right);switch(e.pathType){case`inner`:return`${n}~${r}`;case`instance`:return`${n}#${r}`;case`property`:return`${n}.${r}`;case`property-brackets`:return`${n}[${r}]`}},JsdocTypeStringValue:e=>Pe(e.value,e.meta.quote),JsdocTypeAny:()=>`*`,JsdocTypeGeneric:(e,t)=>{if(e.meta.brackets===`square`){let n=e.elements[0],r=t(n);return n.type===`JsdocTypeUnion`||n.type===`JsdocTypeIntersection`?`(${r})[]`:`${r}[]`}else return`${t(e.left)}${e.meta.dot?`.`:``}<${e.infer===!0?`infer `:``}${e.elements.map(t).join(`, `)}>`},JsdocTypeImport:(e,t)=>`import(${t(e.element)})`,JsdocTypeObjectField:(e,t)=>{let n=``;return e.readonly&&(n+=`readonly `),typeof e.key==`string`?n+=Pe(e.key,e.meta.quote):n+=t(e.key),e.optional&&(n+=`?`),e.right===void 0?n:n+`: ${t(e.right)}`},JsdocTypeJsdocObjectField:(e,t)=>`${t(e.left)}: ${t(e.right)}`,JsdocTypeKeyValue:(e,t)=>{let n=e.key;return e.optional&&(n+=`?`),e.variadic&&(n=`...`+n),e.right===void 0?n:n+`: ${t(e.right)}`},JsdocTypeSpecialNamePath:e=>`${e.specialType}:${Pe(e.value,e.meta.quote)}`,JsdocTypeNotNullable:(e,t)=>Ne(e.meta.position,t(e.element),`!`),JsdocTypeNull:()=>`null`,JsdocTypeNullable:(e,t)=>Ne(e.meta.position,t(e.element),`?`),JsdocTypeNumber:e=>e.value.toString(),JsdocTypeObject:(e,t)=>`{${(e.meta.separator===`linebreak`&&e.elements.length>1?`
`+(e.meta.propertyIndent??``):``)+e.elements.map(t).join(e.meta.separator===`comma`?`, `:e.meta.separator===`linebreak`?`
`+(e.meta.propertyIndent??``):`; `)+(e.meta.separator===`linebreak`&&e.elements.length>1?`
`:``)}}`,JsdocTypeOptional:(e,t)=>Ne(e.meta.position,t(e.element),`=`),JsdocTypeSymbol:(e,t)=>`${e.value}(${e.element===void 0?``:t(e.element)})`,JsdocTypeTypeof:(e,t)=>`typeof ${t(e.element)}`,JsdocTypeUndefined:()=>`undefined`,JsdocTypeUnion:(e,t)=>e.elements.map(t).join(` | `),JsdocTypeUnknown:()=>`?`,JsdocTypeIntersection:(e,t)=>e.elements.map(t).join(` & `),JsdocTypeProperty:e=>Pe(e.value,e.meta.quote),JsdocTypePredicate:(e,t)=>`${t(e.left)} is ${t(e.right)}`,JsdocTypeIndexSignature:(e,t)=>`[${e.key}: ${t(e.right)}]`,JsdocTypeMappedType:(e,t)=>`[${e.key} in ${t(e.right)}]`,JsdocTypeAsserts:(e,t)=>`asserts ${t(e.left)} is ${t(e.right)}`,JsdocTypeReadonlyArray:(e,t)=>`readonly ${t(e.element)}`,JsdocTypeAssertsPlain:(e,t)=>`asserts ${t(e.element)}`,JsdocTypeConditional:(e,t)=>`${t(e.checksType)} extends ${t(e.extendsType)} ? ${t(e.trueType)} : ${t(e.falseType)}`,JsdocTypeTypeParameter:(e,t)=>`${t(e.name)}${e.constraint===void 0?``:` extends ${t(e.constraint)}`}${e.defaultValue===void 0?``:` = ${t(e.defaultValue)}`}`}}let Ie=Fe();function Le(e){return Me(Ie,e)}let Re=`null.true.false.break.case.catch.class.const.continue.debugger.default.delete.do.else.export.extends.finally.for.function.if.import.in.instanceof.new.return.super.switch.this.throw.try.typeof.var.void.while.with.yield`.split(`.`);function W(e){let t={type:`NameExpression`,name:e};return Re.includes(e)&&(t.reservedWord=!0),t}let ze={JsdocTypeOptional:(e,t)=>{let n=t(e.element);return n.optional=!0,n},JsdocTypeNullable:(e,t)=>{let n=t(e.element);return n.nullable=!0,n},JsdocTypeNotNullable:(e,t)=>{let n=t(e.element);return n.nullable=!1,n},JsdocTypeVariadic:(e,t)=>{if(e.element===void 0)throw Error(`dots without value are not allowed in catharsis mode`);let n=t(e.element);return n.repeatable=!0,n},JsdocTypeAny:()=>({type:`AllLiteral`}),JsdocTypeNull:()=>({type:`NullLiteral`}),JsdocTypeStringValue:e=>W(Pe(e.value,e.meta.quote)),JsdocTypeUndefined:()=>({type:`UndefinedLiteral`}),JsdocTypeUnknown:()=>({type:`UnknownLiteral`}),JsdocTypeFunction:(e,t)=>{let n=U(e),r={type:`FunctionType`,params:n.params.map(t)};return n.this!==void 0&&(r.this=t(n.this)),n.new!==void 0&&(r.new=t(n.new)),e.returnType!==void 0&&(r.result=t(e.returnType)),r},JsdocTypeGeneric:(e,t)=>({type:`TypeApplication`,applications:e.elements.map(e=>t(e)),expression:t(e.left)}),JsdocTypeSpecialNamePath:e=>W(e.specialType+`:`+Pe(e.value,e.meta.quote)),JsdocTypeName:e=>e.value===`function`?{type:`FunctionType`,params:[]}:W(e.value),JsdocTypeNumber:e=>W(e.value.toString()),JsdocTypeObject:(e,t)=>{let n={type:`RecordType`,fields:[]};for(let r of e.elements)r.type!==`JsdocTypeObjectField`&&r.type!==`JsdocTypeJsdocObjectField`?n.fields.push({type:`FieldType`,key:t(r),value:void 0}):n.fields.push(t(r));return n},JsdocTypeObjectField:(e,t)=>{if(typeof e.key!=`string`)throw Error(`Index signatures and mapped types are not supported`);return{type:`FieldType`,key:W(Pe(e.key,e.meta.quote)),value:e.right===void 0?void 0:t(e.right)}},JsdocTypeJsdocObjectField:(e,t)=>({type:`FieldType`,key:t(e.left),value:t(e.right)}),JsdocTypeUnion:(e,t)=>({type:`TypeUnion`,elements:e.elements.map(e=>t(e))}),JsdocTypeKeyValue:(e,t)=>({type:`FieldType`,key:W(e.key),value:e.right===void 0?void 0:t(e.right)}),JsdocTypeNamePath:(e,t)=>{let n=t(e.left),r;r=e.right.type===`JsdocTypeSpecialNamePath`?t(e.right).name:Pe(e.right.value,e.right.meta.quote);let i=e.pathType===`inner`?`~`:e.pathType===`instance`?`#`:`.`;return W(`${n.name}${i}${r}`)},JsdocTypeSymbol:e=>{let t=``,n=e.element,r=!1;return n?.type===`JsdocTypeVariadic`&&(n.meta.position===`prefix`?t=`...`:r=!0,n=n.element),n?.type===`JsdocTypeName`?t+=n.value:n?.type===`JsdocTypeNumber`&&(t+=n.value.toString()),r&&(t+=`...`),W(`${e.value}(${t})`)},JsdocTypeParenthesis:(e,t)=>t(_(e.element)),JsdocTypeMappedType:H,JsdocTypeIndexSignature:H,JsdocTypeImport:H,JsdocTypeKeyof:H,JsdocTypeTuple:H,JsdocTypeTypeof:H,JsdocTypeIntersection:H,JsdocTypeProperty:H,JsdocTypePredicate:H,JsdocTypeAsserts:H,JsdocTypeReadonlyArray:H,JsdocTypeAssertsPlain:H,JsdocTypeConditional:H,JsdocTypeTypeParameter:H};function Be(e){return Me(ze,e)}function Ve(e){switch(e){case void 0:return`none`;case`single`:return`single`;case`double`:return`double`}}function G(e){switch(e){case`inner`:return`INNER_MEMBER`;case`instance`:return`INSTANCE_MEMBER`;case`property`:return`MEMBER`;case`property-brackets`:return`MEMBER`}}function He(e,t){return t.length===2?{type:e,left:t[0],right:t[1]}:{type:e,left:t[0],right:He(e,t.slice(1))}}let Ue={JsdocTypeOptional:(e,t)=>({type:`OPTIONAL`,value:t(e.element),meta:{syntax:e.meta.position===`prefix`?`PREFIX_EQUAL_SIGN`:`SUFFIX_EQUALS_SIGN`}}),JsdocTypeNullable:(e,t)=>({type:`NULLABLE`,value:t(e.element),meta:{syntax:e.meta.position===`prefix`?`PREFIX_QUESTION_MARK`:`SUFFIX_QUESTION_MARK`}}),JsdocTypeNotNullable:(e,t)=>({type:`NOT_NULLABLE`,value:t(e.element),meta:{syntax:e.meta.position===`prefix`?`PREFIX_BANG`:`SUFFIX_BANG`}}),JsdocTypeVariadic:(e,t)=>{let n={type:`VARIADIC`,meta:{syntax:e.meta.position===`prefix`?`PREFIX_DOTS`:e.meta.position===`suffix`?`SUFFIX_DOTS`:`ONLY_DOTS`}};return e.element!==void 0&&(n.value=t(e.element)),n},JsdocTypeName:e=>({type:`NAME`,name:e.value}),JsdocTypeTypeof:(e,t)=>({type:`TYPE_QUERY`,name:t(e.element)}),JsdocTypeTuple:(e,t)=>({type:`TUPLE`,entries:e.elements.map(t)}),JsdocTypeKeyof:(e,t)=>({type:`KEY_QUERY`,value:t(e.element)}),JsdocTypeImport:e=>({type:`IMPORT`,path:{type:`STRING_VALUE`,quoteStyle:Ve(e.element.meta.quote),string:e.element.value}}),JsdocTypeUndefined:()=>({type:`NAME`,name:`undefined`}),JsdocTypeAny:()=>({type:`ANY`}),JsdocTypeFunction:(e,t)=>{let n=U(e),r={type:e.arrow?`ARROW`:`FUNCTION`,params:n.params.map(e=>{if(e.type===`JsdocTypeKeyValue`){if(e.right===void 0)throw Error(`Function parameter without ':' is not expected to be 'KEY_VALUE'`);return{type:`NAMED_PARAMETER`,name:e.key,typeName:t(e.right)}}else return t(e)}),new:null,returns:null};return n.this===void 0?e.arrow||(r.this=null):r.this=t(n.this),n.new!==void 0&&(r.new=t(n.new)),e.returnType!==void 0&&(r.returns=t(e.returnType)),r},JsdocTypeGeneric:(e,t)=>{let n={type:`GENERIC`,subject:t(e.left),objects:e.elements.map(t),meta:{syntax:e.meta.brackets===`square`?`SQUARE_BRACKET`:e.meta.dot?`ANGLE_BRACKET_WITH_DOT`:`ANGLE_BRACKET`}};return e.meta.brackets===`square`&&e.elements[0].type===`JsdocTypeFunction`&&!e.elements[0].parenthesis&&(n.objects[0]={type:`NAME`,name:`function`}),n},JsdocTypeObjectField:(e,t)=>{if(typeof e.key!=`string`)throw Error(`Index signatures and mapped types are not supported`);if(e.right===void 0)return{type:`RECORD_ENTRY`,key:e.key,quoteStyle:Ve(e.meta.quote),value:null,readonly:!1};let n=t(e.right);return e.optional&&(n={type:`OPTIONAL`,value:n,meta:{syntax:`SUFFIX_KEY_QUESTION_MARK`}}),{type:`RECORD_ENTRY`,key:e.key.toString(),quoteStyle:Ve(e.meta.quote),value:n,readonly:!1}},JsdocTypeJsdocObjectField:()=>{throw Error(`Keys may not be typed in jsdoctypeparser.`)},JsdocTypeKeyValue:(e,t)=>{if(e.right===void 0)return{type:`RECORD_ENTRY`,key:e.key,quoteStyle:`none`,value:null,readonly:!1};let n=t(e.right);return e.optional&&(n={type:`OPTIONAL`,value:n,meta:{syntax:`SUFFIX_KEY_QUESTION_MARK`}}),{type:`RECORD_ENTRY`,key:e.key,quoteStyle:`none`,value:n,readonly:!1}},JsdocTypeObject:(e,t)=>{let n=[];for(let r of e.elements)(r.type===`JsdocTypeObjectField`||r.type===`JsdocTypeJsdocObjectField`)&&n.push(t(r));return{type:`RECORD`,entries:n}},JsdocTypeSpecialNamePath:e=>{if(e.specialType!==`module`)throw Error(`jsdoctypeparser does not support type ${e.specialType} at this point.`);return{type:`MODULE`,value:{type:`FILE_PATH`,quoteStyle:Ve(e.meta.quote),path:e.value}}},JsdocTypeNamePath:(e,t)=>{let n=!1,r,i;e.right.type===`JsdocTypeSpecialNamePath`&&e.right.specialType===`event`?(n=!0,r=e.right.value,i=Ve(e.right.meta.quote)):(r=e.right.value,i=Ve(e.right.meta.quote));let a={type:G(e.pathType),owner:t(e.left),name:r,quoteStyle:i,hasEventPrefix:n};if(a.owner.type===`MODULE`){let e=a.owner;return a.owner=a.owner.value,e.value=a,e}else return a},JsdocTypeUnion:(e,t)=>He(`UNION`,e.elements.map(t)),JsdocTypeParenthesis:(e,t)=>({type:`PARENTHESIS`,value:t(_(e.element))}),JsdocTypeNull:()=>({type:`NAME`,name:`null`}),JsdocTypeUnknown:()=>({type:`UNKNOWN`}),JsdocTypeStringValue:e=>({type:`STRING_VALUE`,quoteStyle:Ve(e.meta.quote),string:e.value}),JsdocTypeIntersection:(e,t)=>He(`INTERSECTION`,e.elements.map(t)),JsdocTypeNumber:e=>({type:`NUMBER_VALUE`,number:e.value.toString()}),JsdocTypeSymbol:H,JsdocTypeProperty:H,JsdocTypePredicate:H,JsdocTypeMappedType:H,JsdocTypeIndexSignature:H,JsdocTypeAsserts:H,JsdocTypeReadonlyArray:H,JsdocTypeAssertsPlain:H,JsdocTypeConditional:H,JsdocTypeTypeParameter:H};function We(e){return Me(Ue,e)}function Ge(){return{JsdocTypeIntersection:(e,t)=>({type:`JsdocTypeIntersection`,elements:e.elements.map(t)}),JsdocTypeGeneric:(e,t)=>({type:`JsdocTypeGeneric`,left:t(e.left),elements:e.elements.map(t),meta:{dot:e.meta.dot,brackets:e.meta.brackets}}),JsdocTypeNullable:e=>e,JsdocTypeUnion:(e,t)=>({type:`JsdocTypeUnion`,elements:e.elements.map(t)}),JsdocTypeUnknown:e=>e,JsdocTypeUndefined:e=>e,JsdocTypeTypeof:(e,t)=>({type:`JsdocTypeTypeof`,element:t(e.element)}),JsdocTypeSymbol:(e,t)=>{let n={type:`JsdocTypeSymbol`,value:e.value};return e.element!==void 0&&(n.element=t(e.element)),n},JsdocTypeOptional:(e,t)=>({type:`JsdocTypeOptional`,element:t(e.element),meta:{position:e.meta.position}}),JsdocTypeObject:(e,t)=>({type:`JsdocTypeObject`,meta:{separator:`comma`},elements:e.elements.map(t)}),JsdocTypeNumber:e=>e,JsdocTypeNull:e=>e,JsdocTypeNotNullable:(e,t)=>({type:`JsdocTypeNotNullable`,element:t(e.element),meta:{position:e.meta.position}}),JsdocTypeSpecialNamePath:e=>e,JsdocTypeObjectField:(e,t)=>({type:`JsdocTypeObjectField`,key:e.key,right:e.right===void 0?void 0:t(e.right),optional:e.optional,readonly:e.readonly,meta:e.meta}),JsdocTypeJsdocObjectField:(e,t)=>({type:`JsdocTypeJsdocObjectField`,left:t(e.left),right:t(e.right)}),JsdocTypeKeyValue:(e,t)=>({type:`JsdocTypeKeyValue`,key:e.key,right:e.right===void 0?void 0:t(e.right),optional:e.optional,variadic:e.variadic}),JsdocTypeImport:(e,t)=>({type:`JsdocTypeImport`,element:t(e.element)}),JsdocTypeAny:e=>e,JsdocTypeStringValue:e=>e,JsdocTypeNamePath:e=>e,JsdocTypeVariadic:(e,t)=>{let n={type:`JsdocTypeVariadic`,meta:{position:e.meta.position,squareBrackets:e.meta.squareBrackets}};return e.element!==void 0&&(n.element=t(e.element)),n},JsdocTypeTuple:(e,t)=>({type:`JsdocTypeTuple`,elements:e.elements.map(t)}),JsdocTypeName:e=>e,JsdocTypeFunction:(e,t)=>{let n={type:`JsdocTypeFunction`,arrow:e.arrow,parameters:e.parameters.map(t),constructor:e.constructor,parenthesis:e.parenthesis};return e.returnType!==void 0&&(n.returnType=t(e.returnType)),n},JsdocTypeKeyof:(e,t)=>({type:`JsdocTypeKeyof`,element:t(e.element)}),JsdocTypeParenthesis:(e,t)=>({type:`JsdocTypeParenthesis`,element:t(e.element)}),JsdocTypeProperty:e=>e,JsdocTypePredicate:(e,t)=>({type:`JsdocTypePredicate`,left:t(e.left),right:t(e.right)}),JsdocTypeIndexSignature:(e,t)=>({type:`JsdocTypeIndexSignature`,key:e.key,right:t(e.right)}),JsdocTypeMappedType:(e,t)=>({type:`JsdocTypeMappedType`,key:e.key,right:t(e.right)}),JsdocTypeAsserts:(e,t)=>({type:`JsdocTypeAsserts`,left:t(e.left),right:t(e.right)}),JsdocTypeReadonlyArray:(e,t)=>({type:`JsdocTypeReadonlyArray`,element:t(e.element)}),JsdocTypeAssertsPlain:(e,t)=>({type:`JsdocTypeAssertsPlain`,element:t(e.element)}),JsdocTypeConditional:(e,t)=>({type:`JsdocTypeConditional`,checksType:t(e.checksType),extendsType:t(e.extendsType),trueType:t(e.trueType),falseType:t(e.falseType)}),JsdocTypeTypeParameter:(e,t)=>({type:`JsdocTypeTypeParameter`,name:t(e.name),constraint:e.constraint===void 0?void 0:t(e.constraint),defaultValue:e.defaultValue===void 0?void 0:t(e.defaultValue)})}}let Ke={JsdocTypeAny:[],JsdocTypeFunction:[`parameters`,`returnType`],JsdocTypeGeneric:[`left`,`elements`],JsdocTypeImport:[],JsdocTypeIndexSignature:[`right`],JsdocTypeIntersection:[`elements`],JsdocTypeKeyof:[`element`],JsdocTypeKeyValue:[`right`],JsdocTypeMappedType:[`right`],JsdocTypeName:[],JsdocTypeNamePath:[`left`,`right`],JsdocTypeNotNullable:[`element`],JsdocTypeNull:[],JsdocTypeNullable:[`element`],JsdocTypeNumber:[],JsdocTypeObject:[`elements`],JsdocTypeObjectField:[`right`],JsdocTypeJsdocObjectField:[`left`,`right`],JsdocTypeOptional:[`element`],JsdocTypeParenthesis:[`element`],JsdocTypeSpecialNamePath:[],JsdocTypeStringValue:[],JsdocTypeSymbol:[`element`],JsdocTypeTuple:[`elements`],JsdocTypeTypeof:[`element`],JsdocTypeUndefined:[],JsdocTypeUnion:[`elements`],JsdocTypeUnknown:[],JsdocTypeVariadic:[`element`],JsdocTypeProperty:[],JsdocTypePredicate:[`left`,`right`],JsdocTypeAsserts:[`left`,`right`],JsdocTypeReadonlyArray:[`element`],JsdocTypeAssertsPlain:[`element`],JsdocTypeConditional:[`checksType`,`extendsType`,`trueType`,`falseType`],JsdocTypeTypeParameter:[`name`,`constraint`,`defaultValue`]};function qe(e,t,n,r,i){r?.(e,t,n);let a=Ke[e.type];for(let t of a){let n=e[t];if(n!==void 0)if(Array.isArray(n))for(let a of n)qe(a,e,t,r,i);else qe(n,e,t,r,i)}i?.(e,t,n)}function Je(e,t,n){qe(e,void 0,void 0,t,n)}e.catharsisTransform=Be,e.identityTransformRules=Ge,e.jtpTransform=We,e.parse=Ae,e.stringify=Le,e.stringifyRules=Fe,e.transform=Me,e.traverse=Je,e.tryParse=je,e.visitorKeys=Ke}))}}),Br=e=>e.name===`literal`,Vr=e=>e.value.replace(/['|"]/g,``),Hr=e=>{switch(e.type){case`function`:return{name:`function`};case`object`:let t={};return e.signature.properties.forEach(e=>{t[e.key]=Ur(e.value)}),{name:`object`,value:t};default:throw new Rr({type:e,language:`Flow`})}},Ur=e=>{let{name:t,raw:n}=e,r={};switch(typeof n<`u`&&(r.raw=n),e.name){case`literal`:return{...r,name:`other`,value:e.value};case`string`:case`number`:case`symbol`:case`boolean`:return{...r,name:t};case`Array`:return{...r,name:`array`,value:e.elements.map(Ur)};case`signature`:return{...r,...Hr(e)};case`union`:return e.elements?.every(Br)?{...r,name:`enum`,value:e.elements?.map(Vr)}:{...r,name:t,value:e.elements?.map(Ur)};case`intersection`:return{...r,name:t,value:e.elements?.map(Ur)};default:return{...r,name:`other`,value:t}}},Wr=/^['"]|['"]$/g,Gr=e=>e.replace(Wr,``),Kr=e=>Wr.test(e),qr=e=>{let t=Gr(e);return Kr(e)||Number.isNaN(Number(t))?t:Number(t)},Jr=/^\(.*\) => /,Yr=e=>{let{name:t,raw:n,computed:r,value:i}=e,a={};switch(typeof n<`u`&&(a.raw=n),t){case`enum`:{let e=r?i:i.map(e=>qr(e.value));return{...a,name:t,value:e}}case`string`:case`number`:case`symbol`:return{...a,name:t};case`func`:return{...a,name:`function`};case`bool`:case`boolean`:return{...a,name:`boolean`};case`arrayOf`:case`array`:return{...a,name:`array`,value:i&&Yr(i)};case`object`:return{...a,name:t};case`objectOf`:return{...a,name:t,value:Yr(i)};case`shape`:case`exact`:let e=pr(i,e=>Yr(e));return{...a,name:`object`,value:e};case`union`:return{...a,name:`union`,value:i.map(e=>Yr(e))};default:{if(t?.indexOf(`|`)>0)try{let e=t.split(`|`).map(e=>JSON.parse(e));return{...a,name:`enum`,value:e}}catch{}let e=i?`${t}(${i})`:t,n=Jr.test(t)?`function`:`other`;return{...a,name:n,value:e}}}},Xr=e=>e.name===`literal`,Zr=e=>e.name===`undefined`,Qr=e=>{switch(e.type){case`function`:return{name:`function`};case`object`:let t={};return e.signature.properties.forEach(e=>{t[e.key]=$r(e.value)}),{name:`object`,value:t};default:throw new Rr({type:e,language:`Typescript`})}},$r=e=>{let{name:t,raw:n}=e,r={};switch(typeof n<`u`&&(r.raw=n),e.name){case`string`:case`number`:case`symbol`:case`boolean`:return{...r,name:t};case`Array`:return{...r,name:`array`,value:e.elements.map($r)};case`signature`:return{...r,...Qr(e)};case`union`:{let n=e.elements.filter(e=>!Zr(e));if(n.length>0&&n.every(Xr)){let e=n.filter(Xr);return{...r,name:`enum`,value:e.map(e=>qr(e.value))}}return{...r,name:t,value:e.elements.map($r)}}case`intersection`:return{...r,name:t,value:e.elements.map($r)};default:return{...r,name:`other`,value:t}}},ei=e=>{let{type:t,tsType:n,flowType:r}=e;try{if(t!=null)return Yr(t);if(n!=null)return $r(n);if(r!=null)return Ur(r)}catch(e){console.error(e)}return null},ti=(e=>(e.JAVASCRIPT=`JavaScript`,e.FLOW=`Flow`,e.TYPESCRIPT=`TypeScript`,e.UNKNOWN=`Unknown`,e))(ti||{}),ni=[`null`,`undefined`];function ri(e){return ni.some(t=>t===e)}var ii=e=>{if(!e)return``;if(typeof e==`string`)return e;throw Error(`Description: expected string, got: ${JSON.stringify(e)}`)};function ai(e){return!!e.__docgenInfo}function oi(e){return e!=null&&Object.keys(e).length>0}function si(e,t){return ai(e)?e.__docgenInfo[t]:null}function ci(e){return ai(e)?ii(e.__docgenInfo.description):``}var li;(function(e){e.start=`/**`,e.nostart=`/***`,e.delim=`*`,e.end=`*/`})(li=li||={});function ui(e){return/^\s+$/.test(e)}function di(e){let t=e.match(/\r+$/);return t==null?[``,e]:[e.slice(-t[0].length),e.slice(0,-t[0].length)]}function fi(e){let t=e.match(/^\s+/);return t==null?[``,e]:[e.slice(0,t[0].length),e.slice(t[0].length)]}function pi(e){return e.split(/\n/)}function mi(e={}){return Object.assign({tag:``,name:``,type:``,optional:!1,description:``,problems:[],source:[]},e)}function hi(e={}){return Object.assign({start:``,delimiter:``,postDelimiter:``,tag:``,postTag:``,name:``,postName:``,type:``,postType:``,description:``,end:``,lineEnd:``},e)}var gi=/^@\S+/;function _i({fence:e="```"}={}){let t=vi(e),n=(e,n)=>t(e)?!n:n;return function(e){let t=[[]],r=!1;for(let i of e)gi.test(i.tokens.description)&&!r?t.push([i]):t[t.length-1].push(i),r=n(i.tokens.description,r);return t}}function vi(e){return typeof e==`string`?t=>t.split(e).length%2==0:e}function yi({startLine:e=0,markers:t=li}={}){let n=null,r=e;return function(e){let i=e,a=hi();if([a.lineEnd,i]=di(i),[a.start,i]=fi(i),n===null&&i.startsWith(t.start)&&!i.startsWith(t.nostart)&&(n=[],a.delimiter=i.slice(0,t.start.length),i=i.slice(t.start.length),[a.postDelimiter,i]=fi(i)),n===null)return r++,null;let o=i.trimRight().endsWith(t.end);if(a.delimiter===``&&i.startsWith(t.delim)&&!i.startsWith(t.end)&&(a.delimiter=t.delim,i=i.slice(t.delim.length),[a.postDelimiter,i]=fi(i)),o){let e=i.trimRight();a.end=i.slice(e.length-t.end.length),i=e.slice(0,-t.end.length)}if(a.description=i,n.push({number:r,source:e,tokens:a}),r++,o){let e=n.slice();return n=null,e}return null}}function bi({tokenizers:e}){return function(t){var n;let r=mi({source:t});for(let t of e)if(r=t(r),(n=r.problems[r.problems.length-1])!=null&&n.critical)break;return r}}function xi(){return e=>{let{tokens:t}=e.source[0],n=t.description.match(/\s*(@(\S+))(\s*)/);return n===null?(e.problems.push({code:`spec:tag:prefix`,message:`tag should start with "@" symbol`,line:e.source[0].number,critical:!0}),e):(t.tag=n[1],t.postTag=n[3],t.description=t.description.slice(n[0].length),e.tag=n[2],e)}}function Si(e=`compact`){let t=wi(e);return e=>{let n=0,r=[];for(let[t,{tokens:i}]of e.source.entries()){let a=``;if(t===0&&i.description[0]!==`{`)return e;for(let e of i.description)if(e===`{`&&n++,e===`}`&&n--,a+=e,n===0)break;if(r.push([i,a]),n===0)break}if(n!==0)return e.problems.push({code:`spec:type:unpaired-curlies`,message:`unpaired curlies`,line:e.source[0].number,critical:!0}),e;let i=[],a=r[0][0].postDelimiter.length;for(let[e,[t,n]]of r.entries())t.type=n,e>0&&(t.type=t.postDelimiter.slice(a)+n,t.postDelimiter=t.postDelimiter.slice(0,a)),[t.postType,t.description]=fi(t.description.slice(n.length)),i.push(t.type);return i[0]=i[0].slice(1),i[i.length-1]=i[i.length-1].slice(0,-1),e.type=t(i),e}}var Ci=e=>e.trim();function wi(e){return e===`compact`?e=>e.map(Ci).join(``):e===`preserve`?e=>e.join(`
`):e}var Ti=e=>e&&e.startsWith(`"`)&&e.endsWith(`"`);function Ei(){let e=(e,{tokens:t},n)=>t.type===``?e:n;return t=>{let{tokens:n}=t.source[t.source.reduce(e,0)],r=n.description.trimLeft(),i=r.split(`"`);if(i.length>1&&i[0]===``&&i.length%2==1)return t.name=i[1],n.name=`"${i[1]}"`,[n.postName,n.description]=fi(r.slice(n.name.length)),t;let a=0,o=``,s=!1,c;for(let e of r){if(a===0&&ui(e))break;e===`[`&&a++,e===`]`&&a--,o+=e}if(a!==0)return t.problems.push({code:`spec:name:unpaired-brackets`,message:`unpaired brackets`,line:t.source[0].number,critical:!0}),t;let l=o;if(o[0]===`[`&&o[o.length-1]===`]`){s=!0,o=o.slice(1,-1);let e=o.split(`=`);if(o=e[0].trim(),e[1]!==void 0&&(c=e.slice(1).join(`=`).trim()),o===``)return t.problems.push({code:`spec:name:empty-name`,message:`empty name`,line:t.source[0].number,critical:!0}),t;if(c===``)return t.problems.push({code:`spec:name:empty-default`,message:`empty default value`,line:t.source[0].number,critical:!0}),t;if(!Ti(c)&&/=(?!>)/.test(c))return t.problems.push({code:`spec:name:invalid-default`,message:`invalid default value syntax`,line:t.source[0].number,critical:!0}),t}return t.optional=s,t.name=o,n.name=l,c!==void 0&&(t.default=c),[n.postName,n.description]=fi(r.slice(n.name.length)),t}}function Di(e=`compact`,t=li){let n=Oi(e);return e=>(e.description=n(e.source,t),e)}function Oi(e){return e===`compact`?ki:e===`preserve`?Mi:e}function ki(e,t=li){return e.map(({tokens:{description:e}})=>e.trim()).filter(e=>e!==``).join(` `)}var Ai=(e,{tokens:t},n)=>t.type===``?e:n,ji=({tokens:e})=>(e.delimiter===``?e.start:e.postDelimiter.slice(1))+e.description;function Mi(e,t=li){if(e.length===0)return``;e[0].tokens.description===``&&e[0].tokens.delimiter===t.start&&(e=e.slice(1));let n=e[e.length-1];return n!==void 0&&n.tokens.description===``&&n.tokens.end.endsWith(t.end)&&(e=e.slice(0,-1)),e=e.slice(e.reduce(Ai,0)),e.map(ji).join(`
`)}function Ni({startLine:e=0,fence:t="```",spacing:n=`compact`,markers:r=li,tokenizers:i=[xi(),Si(n),Ei(),Di(n)]}={}){if(e<0||e%1>0)throw Error(`Invalid startLine`);let a=yi({startLine:e,markers:r}),o=_i({fence:t}),s=bi({tokenizers:i}),c=Oi(n);return function(e){let t=[];for(let n of pi(e)){let e=a(n);if(e===null)continue;let i=o(e),l=i.slice(1).map(s);t.push({description:c(i[0],r),tags:l,source:e,problems:l.reduce((e,t)=>e.concat(t.problems),[])})}return t}}function Pi(e,t={}){return Ni(t)(e)}var Fi=jn(zr(),1);function Ii(e){return e!=null&&e.includes(`@`)}function Li(e){let t=Pi(`/**
`+(e??``).split(`
`).map(e=>` * ${e}`).join(`
`)+`
*/`,{spacing:`preserve`});if(!t||t.length===0)throw Error(`Cannot parse JSDoc tags.`);return t[0]}var Ri={tags:[`param`,`arg`,`argument`,`returns`,`ignore`,`deprecated`]},zi=(e,t=Ri)=>{if(!Ii(e))return{includesJsDoc:!1,ignore:!1};let n=Li(e),r=Bi(n,t.tags);return r.ignore?{includesJsDoc:!0,ignore:!0}:{includesJsDoc:!0,ignore:!1,description:n.description.trim(),extractedTags:r}};function Bi(e,t){let n={params:null,deprecated:null,returns:null,ignore:!1};for(let r of e.tags)if(!(t!==void 0&&!t.includes(r.tag)))if(r.tag===`ignore`){n.ignore=!0;break}else switch(r.tag){case`param`:case`arg`:case`argument`:{let e=Hi(r);e!=null&&(n.params??=[],n.params.push(e));break}case`deprecated`:{let e=Ui(r);e!=null&&(n.deprecated=e);break}case`returns`:{let e=Ki(r);e!=null&&(n.returns=e);break}default:break}return n}function Vi(e){return e.replace(/[\.-]$/,``)}function Hi(e){if(!e.name||e.name===`-`)return null;let t=Yi(e.type);return{name:e.name,type:t,description:Gi(e.description),getPrettyName:()=>Vi(e.name),getTypeName:()=>t?Xi(t):null}}function Ui(e){return e.name?Wi(e.name,e.description):null}function Wi(e,t){return Gi(e===``?t:`${e} ${t}`)}function Gi(e){let t=e.replace(/^- /g,``).trim();return t===``?null:t}function Ki(e){let t=Yi(e.type);return t?{type:t,description:Wi(e.name,e.description),getTypeName:()=>Xi(t)}:null}var qi=(0,Fi.stringifyRules)(),Ji=qi.JsdocTypeObject;qi.JsdocTypeAny=()=>`any`,qi.JsdocTypeObject=(e,t)=>`(${Ji(e,t)})`,qi.JsdocTypeOptional=(e,t)=>t(e.element),qi.JsdocTypeNullable=(e,t)=>t(e.element),qi.JsdocTypeNotNullable=(e,t)=>t(e.element),qi.JsdocTypeUnion=(e,t)=>e.elements.map(t).join(`|`);function Yi(e){try{return(0,Fi.parse)(e,`typescript`)}catch{return null}}function Xi(e){return(0,Fi.transform)(qi,e)}function Zi(e){return e.length>90}function Qi(e){return e.length>50}function Y(e,t){return e===t?{summary:e}:{summary:e,detail:t}}function $i(e,t){if(e!=null){let{value:n}=e;if(!ri(n))return Qi(n)?Y(t?.name,n):Y(n)}return null}function ea({name:e,value:t,elements:n,raw:r}){return t??(n==null?r??e:n.map(ea).join(` | `))}function ta({name:e,raw:t,elements:n}){return Y(n==null?t==null?e:t.replace(/^\|\s*/,``):n.map(ea).join(` | `))}function na({type:e,raw:t}){return Y(t??e)}function ra({type:e,raw:t}){return t==null?Y(e):Zi(t)?Y(e,t):Y(t)}function ia(e){let{type:t}=e;return t===`object`?ra(e):na(e)}function aa({name:e,raw:t}){return t==null?Y(e):Zi(t)?Y(e,t):Y(t)}function oa(e){if(e==null)return null;switch(e.name){case`union`:return ta(e);case`signature`:return ia(e);default:return aa(e)}}var sa=(e,t)=>{let{flowType:n,description:r,required:i,defaultValue:a}=t;return{name:e,type:oa(n),required:i,description:r,defaultValue:$i(a??null,n??null)}};function ca({defaultValue:e}){if(e!=null){let{value:t}=e;if(!ri(t))return Y(t)}return null}function la({tsType:e,required:t}){if(e==null)return null;let n=e.name;return t||(n=n.replace(` | undefined`,``)),Y([`Array`,`Record`,`signature`].includes(e.name)?e.raw:n)}var ua=(e,t)=>{let{description:n,required:r}=t;return{name:e,type:la(t),required:r,description:n,defaultValue:ca(t)}};function da(e){return e==null?null:Y(e.name)}function fa(e){let{computed:t,func:n}=e;return typeof t>`u`&&typeof n>`u`}function pa(e){return e?e.name===`string`?!0:e.name===`enum`?Array.isArray(e.value)&&e.value.every(({value:e})=>typeof e==`string`&&e[0]===`"`&&e[e.length-1]===`"`):!1:!1}function ma(e,t){if(e!=null){let{value:n}=e;if(!ri(n))return fa(e)&&pa(t)?Y(JSON.stringify(n)):Y(n)}return null}function ha(e,t,n){let{description:r,required:i,defaultValue:a}=n;return{name:e,type:da(t),required:i,description:r,defaultValue:ma(a,t)}}function ga(e,t){if(t?.includesJsDoc){let{description:n,extractedTags:r}=t;n!=null&&(e.description=t.description);let i={...r,params:r?.params?.map(e=>({name:e.getPrettyName(),description:e.description}))};Object.values(i).filter(Boolean).length>0&&(e.jsDocTags=i)}return e}var _a=(e,t,n)=>{let r=ha(e,t.type,t);return r.sbType=ei(t),ga(r,n)},va=(e,t,n)=>{let r=ua(e,t);return r.sbType=ei(t),ga(r,n)},ya=(e,t,n)=>{let r=sa(e,t);return r.sbType=ei(t),ga(r,n)},ba=(e,t,n)=>ga(ha(e,{name:`unknown`},t),n),xa=e=>{switch(e){case`JavaScript`:return _a;case`TypeScript`:return va;case`Flow`:return ya;default:return ba}},Sa=e=>e.type==null?e.flowType==null?e.tsType==null?`Unknown`:`TypeScript`:`Flow`:`JavaScript`,Ca=e=>{let t=Sa(e[0]),n=xa(t);return e.map(e=>{let r=e;return e.type?.elements&&(r={...e,type:{...e.type,value:e.type.elements}}),Ea(r.name,r,t,n)})},wa=e=>{let t=Object.keys(e),n=Sa(e[t[0]]),r=xa(n);return t.map(t=>{let i=e[t];return i==null?null:Ea(t,i,n,r)}).filter(Boolean)},Ta=(e,t)=>{let n=si(e,t);return oi(n)?Array.isArray(n)?Ca(n):wa(n):[]};function Ea(e,t,n,r){let i=zi(t.description);return i.includesJsDoc&&i.ignore?null:{propDef:r(e,t,i),jsDocTags:i.extractedTags,docgenInfo:t,typeSystem:n}}function Da(e){return e==null?``:ci(e)}var Oa=e=>{let{component:t,argTypes:n,parameters:{docs:r={}}}=e,{extractArgTypes:i}=r;if(!i||!t)return n;let a=i(t);return a?wr(a,n):n},ka=`storybook/docs`;`${ka}`;var Aa=`${ka}/snippet-rendered`,ja=(e=>(e.AUTO=`auto`,e.CODE=`code`,e.DYNAMIC=`dynamic`,e))(ja||{}),Ma=`storybook/viewport`;`${Ma}`,`${Ma}`;var Na=On({"../../node_modules/entities/lib/maps/entities.json"(e,t){t.exports={Aacute:`Á`,aacute:`á`,Abreve:`Ă`,abreve:`ă`,ac:`∾`,acd:`∿`,acE:`∾̳`,Acirc:`Â`,acirc:`â`,acute:`´`,Acy:`А`,acy:`а`,AElig:`Æ`,aelig:`æ`,af:`⁡`,Afr:`𝔄`,afr:`𝔞`,Agrave:`À`,agrave:`à`,alefsym:`ℵ`,aleph:`ℵ`,Alpha:`Α`,alpha:`α`,Amacr:`Ā`,amacr:`ā`,amalg:`⨿`,amp:`&`,AMP:`&`,andand:`⩕`,And:`⩓`,and:`∧`,andd:`⩜`,andslope:`⩘`,andv:`⩚`,ang:`∠`,ange:`⦤`,angle:`∠`,angmsdaa:`⦨`,angmsdab:`⦩`,angmsdac:`⦪`,angmsdad:`⦫`,angmsdae:`⦬`,angmsdaf:`⦭`,angmsdag:`⦮`,angmsdah:`⦯`,angmsd:`∡`,angrt:`∟`,angrtvb:`⊾`,angrtvbd:`⦝`,angsph:`∢`,angst:`Å`,angzarr:`⍼`,Aogon:`Ą`,aogon:`ą`,Aopf:`𝔸`,aopf:`𝕒`,apacir:`⩯`,ap:`≈`,apE:`⩰`,ape:`≊`,apid:`≋`,apos:`'`,ApplyFunction:`⁡`,approx:`≈`,approxeq:`≊`,Aring:`Å`,aring:`å`,Ascr:`𝒜`,ascr:`𝒶`,Assign:`≔`,ast:`*`,asymp:`≈`,asympeq:`≍`,Atilde:`Ã`,atilde:`ã`,Auml:`Ä`,auml:`ä`,awconint:`∳`,awint:`⨑`,backcong:`≌`,backepsilon:`϶`,backprime:`‵`,backsim:`∽`,backsimeq:`⋍`,Backslash:`∖`,Barv:`⫧`,barvee:`⊽`,barwed:`⌅`,Barwed:`⌆`,barwedge:`⌅`,bbrk:`⎵`,bbrktbrk:`⎶`,bcong:`≌`,Bcy:`Б`,bcy:`б`,bdquo:`„`,becaus:`∵`,because:`∵`,Because:`∵`,bemptyv:`⦰`,bepsi:`϶`,bernou:`ℬ`,Bernoullis:`ℬ`,Beta:`Β`,beta:`β`,beth:`ℶ`,between:`≬`,Bfr:`𝔅`,bfr:`𝔟`,bigcap:`⋂`,bigcirc:`◯`,bigcup:`⋃`,bigodot:`⨀`,bigoplus:`⨁`,bigotimes:`⨂`,bigsqcup:`⨆`,bigstar:`★`,bigtriangledown:`▽`,bigtriangleup:`△`,biguplus:`⨄`,bigvee:`⋁`,bigwedge:`⋀`,bkarow:`⤍`,blacklozenge:`⧫`,blacksquare:`▪`,blacktriangle:`▴`,blacktriangledown:`▾`,blacktriangleleft:`◂`,blacktriangleright:`▸`,blank:`␣`,blk12:`▒`,blk14:`░`,blk34:`▓`,block:`█`,bne:`=⃥`,bnequiv:`≡⃥`,bNot:`⫭`,bnot:`⌐`,Bopf:`𝔹`,bopf:`𝕓`,bot:`⊥`,bottom:`⊥`,bowtie:`⋈`,boxbox:`⧉`,boxdl:`┐`,boxdL:`╕`,boxDl:`╖`,boxDL:`╗`,boxdr:`┌`,boxdR:`╒`,boxDr:`╓`,boxDR:`╔`,boxh:`─`,boxH:`═`,boxhd:`┬`,boxHd:`╤`,boxhD:`╥`,boxHD:`╦`,boxhu:`┴`,boxHu:`╧`,boxhU:`╨`,boxHU:`╩`,boxminus:`⊟`,boxplus:`⊞`,boxtimes:`⊠`,boxul:`┘`,boxuL:`╛`,boxUl:`╜`,boxUL:`╝`,boxur:`└`,boxuR:`╘`,boxUr:`╙`,boxUR:`╚`,boxv:`│`,boxV:`║`,boxvh:`┼`,boxvH:`╪`,boxVh:`╫`,boxVH:`╬`,boxvl:`┤`,boxvL:`╡`,boxVl:`╢`,boxVL:`╣`,boxvr:`├`,boxvR:`╞`,boxVr:`╟`,boxVR:`╠`,bprime:`‵`,breve:`˘`,Breve:`˘`,brvbar:`¦`,bscr:`𝒷`,Bscr:`ℬ`,bsemi:`⁏`,bsim:`∽`,bsime:`⋍`,bsolb:`⧅`,bsol:`\\`,bsolhsub:`⟈`,bull:`•`,bullet:`•`,bump:`≎`,bumpE:`⪮`,bumpe:`≏`,Bumpeq:`≎`,bumpeq:`≏`,Cacute:`Ć`,cacute:`ć`,capand:`⩄`,capbrcup:`⩉`,capcap:`⩋`,cap:`∩`,Cap:`⋒`,capcup:`⩇`,capdot:`⩀`,CapitalDifferentialD:`ⅅ`,caps:`∩︀`,caret:`⁁`,caron:`ˇ`,Cayleys:`ℭ`,ccaps:`⩍`,Ccaron:`Č`,ccaron:`č`,Ccedil:`Ç`,ccedil:`ç`,Ccirc:`Ĉ`,ccirc:`ĉ`,Cconint:`∰`,ccups:`⩌`,ccupssm:`⩐`,Cdot:`Ċ`,cdot:`ċ`,cedil:`¸`,Cedilla:`¸`,cemptyv:`⦲`,cent:`¢`,centerdot:`·`,CenterDot:`·`,cfr:`𝔠`,Cfr:`ℭ`,CHcy:`Ч`,chcy:`ч`,check:`✓`,checkmark:`✓`,Chi:`Χ`,chi:`χ`,circ:`ˆ`,circeq:`≗`,circlearrowleft:`↺`,circlearrowright:`↻`,circledast:`⊛`,circledcirc:`⊚`,circleddash:`⊝`,CircleDot:`⊙`,circledR:`®`,circledS:`Ⓢ`,CircleMinus:`⊖`,CirclePlus:`⊕`,CircleTimes:`⊗`,cir:`○`,cirE:`⧃`,cire:`≗`,cirfnint:`⨐`,cirmid:`⫯`,cirscir:`⧂`,ClockwiseContourIntegral:`∲`,CloseCurlyDoubleQuote:`”`,CloseCurlyQuote:`’`,clubs:`♣`,clubsuit:`♣`,colon:`:`,Colon:`∷`,Colone:`⩴`,colone:`≔`,coloneq:`≔`,comma:`,`,commat:`@`,comp:`∁`,compfn:`∘`,complement:`∁`,complexes:`ℂ`,cong:`≅`,congdot:`⩭`,Congruent:`≡`,conint:`∮`,Conint:`∯`,ContourIntegral:`∮`,copf:`𝕔`,Copf:`ℂ`,coprod:`∐`,Coproduct:`∐`,copy:`©`,COPY:`©`,copysr:`℗`,CounterClockwiseContourIntegral:`∳`,crarr:`↵`,cross:`✗`,Cross:`⨯`,Cscr:`𝒞`,cscr:`𝒸`,csub:`⫏`,csube:`⫑`,csup:`⫐`,csupe:`⫒`,ctdot:`⋯`,cudarrl:`⤸`,cudarrr:`⤵`,cuepr:`⋞`,cuesc:`⋟`,cularr:`↶`,cularrp:`⤽`,cupbrcap:`⩈`,cupcap:`⩆`,CupCap:`≍`,cup:`∪`,Cup:`⋓`,cupcup:`⩊`,cupdot:`⊍`,cupor:`⩅`,cups:`∪︀`,curarr:`↷`,curarrm:`⤼`,curlyeqprec:`⋞`,curlyeqsucc:`⋟`,curlyvee:`⋎`,curlywedge:`⋏`,curren:`¤`,curvearrowleft:`↶`,curvearrowright:`↷`,cuvee:`⋎`,cuwed:`⋏`,cwconint:`∲`,cwint:`∱`,cylcty:`⌭`,dagger:`†`,Dagger:`‡`,daleth:`ℸ`,darr:`↓`,Darr:`↡`,dArr:`⇓`,dash:`‐`,Dashv:`⫤`,dashv:`⊣`,dbkarow:`⤏`,dblac:`˝`,Dcaron:`Ď`,dcaron:`ď`,Dcy:`Д`,dcy:`д`,ddagger:`‡`,ddarr:`⇊`,DD:`ⅅ`,dd:`ⅆ`,DDotrahd:`⤑`,ddotseq:`⩷`,deg:`°`,Del:`∇`,Delta:`Δ`,delta:`δ`,demptyv:`⦱`,dfisht:`⥿`,Dfr:`𝔇`,dfr:`𝔡`,dHar:`⥥`,dharl:`⇃`,dharr:`⇂`,DiacriticalAcute:`´`,DiacriticalDot:`˙`,DiacriticalDoubleAcute:`˝`,DiacriticalGrave:"`",DiacriticalTilde:`˜`,diam:`⋄`,diamond:`⋄`,Diamond:`⋄`,diamondsuit:`♦`,diams:`♦`,die:`¨`,DifferentialD:`ⅆ`,digamma:`ϝ`,disin:`⋲`,div:`÷`,divide:`÷`,divideontimes:`⋇`,divonx:`⋇`,DJcy:`Ђ`,djcy:`ђ`,dlcorn:`⌞`,dlcrop:`⌍`,dollar:`$`,Dopf:`𝔻`,dopf:`𝕕`,Dot:`¨`,dot:`˙`,DotDot:`⃜`,doteq:`≐`,doteqdot:`≑`,DotEqual:`≐`,dotminus:`∸`,dotplus:`∔`,dotsquare:`⊡`,doublebarwedge:`⌆`,DoubleContourIntegral:`∯`,DoubleDot:`¨`,DoubleDownArrow:`⇓`,DoubleLeftArrow:`⇐`,DoubleLeftRightArrow:`⇔`,DoubleLeftTee:`⫤`,DoubleLongLeftArrow:`⟸`,DoubleLongLeftRightArrow:`⟺`,DoubleLongRightArrow:`⟹`,DoubleRightArrow:`⇒`,DoubleRightTee:`⊨`,DoubleUpArrow:`⇑`,DoubleUpDownArrow:`⇕`,DoubleVerticalBar:`∥`,DownArrowBar:`⤓`,downarrow:`↓`,DownArrow:`↓`,Downarrow:`⇓`,DownArrowUpArrow:`⇵`,DownBreve:`̑`,downdownarrows:`⇊`,downharpoonleft:`⇃`,downharpoonright:`⇂`,DownLeftRightVector:`⥐`,DownLeftTeeVector:`⥞`,DownLeftVectorBar:`⥖`,DownLeftVector:`↽`,DownRightTeeVector:`⥟`,DownRightVectorBar:`⥗`,DownRightVector:`⇁`,DownTeeArrow:`↧`,DownTee:`⊤`,drbkarow:`⤐`,drcorn:`⌟`,drcrop:`⌌`,Dscr:`𝒟`,dscr:`𝒹`,DScy:`Ѕ`,dscy:`ѕ`,dsol:`⧶`,Dstrok:`Đ`,dstrok:`đ`,dtdot:`⋱`,dtri:`▿`,dtrif:`▾`,duarr:`⇵`,duhar:`⥯`,dwangle:`⦦`,DZcy:`Џ`,dzcy:`џ`,dzigrarr:`⟿`,Eacute:`É`,eacute:`é`,easter:`⩮`,Ecaron:`Ě`,ecaron:`ě`,Ecirc:`Ê`,ecirc:`ê`,ecir:`≖`,ecolon:`≕`,Ecy:`Э`,ecy:`э`,eDDot:`⩷`,Edot:`Ė`,edot:`ė`,eDot:`≑`,ee:`ⅇ`,efDot:`≒`,Efr:`𝔈`,efr:`𝔢`,eg:`⪚`,Egrave:`È`,egrave:`è`,egs:`⪖`,egsdot:`⪘`,el:`⪙`,Element:`∈`,elinters:`⏧`,ell:`ℓ`,els:`⪕`,elsdot:`⪗`,Emacr:`Ē`,emacr:`ē`,empty:`∅`,emptyset:`∅`,EmptySmallSquare:`◻`,emptyv:`∅`,EmptyVerySmallSquare:`▫`,emsp13:` `,emsp14:` `,emsp:` `,ENG:`Ŋ`,eng:`ŋ`,ensp:` `,Eogon:`Ę`,eogon:`ę`,Eopf:`𝔼`,eopf:`𝕖`,epar:`⋕`,eparsl:`⧣`,eplus:`⩱`,epsi:`ε`,Epsilon:`Ε`,epsilon:`ε`,epsiv:`ϵ`,eqcirc:`≖`,eqcolon:`≕`,eqsim:`≂`,eqslantgtr:`⪖`,eqslantless:`⪕`,Equal:`⩵`,equals:`=`,EqualTilde:`≂`,equest:`≟`,Equilibrium:`⇌`,equiv:`≡`,equivDD:`⩸`,eqvparsl:`⧥`,erarr:`⥱`,erDot:`≓`,escr:`ℯ`,Escr:`ℰ`,esdot:`≐`,Esim:`⩳`,esim:`≂`,Eta:`Η`,eta:`η`,ETH:`Ð`,eth:`ð`,Euml:`Ë`,euml:`ë`,euro:`€`,excl:`!`,exist:`∃`,Exists:`∃`,expectation:`ℰ`,exponentiale:`ⅇ`,ExponentialE:`ⅇ`,fallingdotseq:`≒`,Fcy:`Ф`,fcy:`ф`,female:`♀`,ffilig:`ﬃ`,fflig:`ﬀ`,ffllig:`ﬄ`,Ffr:`𝔉`,ffr:`𝔣`,filig:`ﬁ`,FilledSmallSquare:`◼`,FilledVerySmallSquare:`▪`,fjlig:`fj`,flat:`♭`,fllig:`ﬂ`,fltns:`▱`,fnof:`ƒ`,Fopf:`𝔽`,fopf:`𝕗`,forall:`∀`,ForAll:`∀`,fork:`⋔`,forkv:`⫙`,Fouriertrf:`ℱ`,fpartint:`⨍`,frac12:`½`,frac13:`⅓`,frac14:`¼`,frac15:`⅕`,frac16:`⅙`,frac18:`⅛`,frac23:`⅔`,frac25:`⅖`,frac34:`¾`,frac35:`⅗`,frac38:`⅜`,frac45:`⅘`,frac56:`⅚`,frac58:`⅝`,frac78:`⅞`,frasl:`⁄`,frown:`⌢`,fscr:`𝒻`,Fscr:`ℱ`,gacute:`ǵ`,Gamma:`Γ`,gamma:`γ`,Gammad:`Ϝ`,gammad:`ϝ`,gap:`⪆`,Gbreve:`Ğ`,gbreve:`ğ`,Gcedil:`Ģ`,Gcirc:`Ĝ`,gcirc:`ĝ`,Gcy:`Г`,gcy:`г`,Gdot:`Ġ`,gdot:`ġ`,ge:`≥`,gE:`≧`,gEl:`⪌`,gel:`⋛`,geq:`≥`,geqq:`≧`,geqslant:`⩾`,gescc:`⪩`,ges:`⩾`,gesdot:`⪀`,gesdoto:`⪂`,gesdotol:`⪄`,gesl:`⋛︀`,gesles:`⪔`,Gfr:`𝔊`,gfr:`𝔤`,gg:`≫`,Gg:`⋙`,ggg:`⋙`,gimel:`ℷ`,GJcy:`Ѓ`,gjcy:`ѓ`,gla:`⪥`,gl:`≷`,glE:`⪒`,glj:`⪤`,gnap:`⪊`,gnapprox:`⪊`,gne:`⪈`,gnE:`≩`,gneq:`⪈`,gneqq:`≩`,gnsim:`⋧`,Gopf:`𝔾`,gopf:`𝕘`,grave:"`",GreaterEqual:`≥`,GreaterEqualLess:`⋛`,GreaterFullEqual:`≧`,GreaterGreater:`⪢`,GreaterLess:`≷`,GreaterSlantEqual:`⩾`,GreaterTilde:`≳`,Gscr:`𝒢`,gscr:`ℊ`,gsim:`≳`,gsime:`⪎`,gsiml:`⪐`,gtcc:`⪧`,gtcir:`⩺`,gt:`>`,GT:`>`,Gt:`≫`,gtdot:`⋗`,gtlPar:`⦕`,gtquest:`⩼`,gtrapprox:`⪆`,gtrarr:`⥸`,gtrdot:`⋗`,gtreqless:`⋛`,gtreqqless:`⪌`,gtrless:`≷`,gtrsim:`≳`,gvertneqq:`≩︀`,gvnE:`≩︀`,Hacek:`ˇ`,hairsp:` `,half:`½`,hamilt:`ℋ`,HARDcy:`Ъ`,hardcy:`ъ`,harrcir:`⥈`,harr:`↔`,hArr:`⇔`,harrw:`↭`,Hat:`^`,hbar:`ℏ`,Hcirc:`Ĥ`,hcirc:`ĥ`,hearts:`♥`,heartsuit:`♥`,hellip:`…`,hercon:`⊹`,hfr:`𝔥`,Hfr:`ℌ`,HilbertSpace:`ℋ`,hksearow:`⤥`,hkswarow:`⤦`,hoarr:`⇿`,homtht:`∻`,hookleftarrow:`↩`,hookrightarrow:`↪`,hopf:`𝕙`,Hopf:`ℍ`,horbar:`―`,HorizontalLine:`─`,hscr:`𝒽`,Hscr:`ℋ`,hslash:`ℏ`,Hstrok:`Ħ`,hstrok:`ħ`,HumpDownHump:`≎`,HumpEqual:`≏`,hybull:`⁃`,hyphen:`‐`,Iacute:`Í`,iacute:`í`,ic:`⁣`,Icirc:`Î`,icirc:`î`,Icy:`И`,icy:`и`,Idot:`İ`,IEcy:`Е`,iecy:`е`,iexcl:`¡`,iff:`⇔`,ifr:`𝔦`,Ifr:`ℑ`,Igrave:`Ì`,igrave:`ì`,ii:`ⅈ`,iiiint:`⨌`,iiint:`∭`,iinfin:`⧜`,iiota:`℩`,IJlig:`Ĳ`,ijlig:`ĳ`,Imacr:`Ī`,imacr:`ī`,image:`ℑ`,ImaginaryI:`ⅈ`,imagline:`ℐ`,imagpart:`ℑ`,imath:`ı`,Im:`ℑ`,imof:`⊷`,imped:`Ƶ`,Implies:`⇒`,incare:`℅`,in:`∈`,infin:`∞`,infintie:`⧝`,inodot:`ı`,intcal:`⊺`,int:`∫`,Int:`∬`,integers:`ℤ`,Integral:`∫`,intercal:`⊺`,Intersection:`⋂`,intlarhk:`⨗`,intprod:`⨼`,InvisibleComma:`⁣`,InvisibleTimes:`⁢`,IOcy:`Ё`,iocy:`ё`,Iogon:`Į`,iogon:`į`,Iopf:`𝕀`,iopf:`𝕚`,Iota:`Ι`,iota:`ι`,iprod:`⨼`,iquest:`¿`,iscr:`𝒾`,Iscr:`ℐ`,isin:`∈`,isindot:`⋵`,isinE:`⋹`,isins:`⋴`,isinsv:`⋳`,isinv:`∈`,it:`⁢`,Itilde:`Ĩ`,itilde:`ĩ`,Iukcy:`І`,iukcy:`і`,Iuml:`Ï`,iuml:`ï`,Jcirc:`Ĵ`,jcirc:`ĵ`,Jcy:`Й`,jcy:`й`,Jfr:`𝔍`,jfr:`𝔧`,jmath:`ȷ`,Jopf:`𝕁`,jopf:`𝕛`,Jscr:`𝒥`,jscr:`𝒿`,Jsercy:`Ј`,jsercy:`ј`,Jukcy:`Є`,jukcy:`є`,Kappa:`Κ`,kappa:`κ`,kappav:`ϰ`,Kcedil:`Ķ`,kcedil:`ķ`,Kcy:`К`,kcy:`к`,Kfr:`𝔎`,kfr:`𝔨`,kgreen:`ĸ`,KHcy:`Х`,khcy:`х`,KJcy:`Ќ`,kjcy:`ќ`,Kopf:`𝕂`,kopf:`𝕜`,Kscr:`𝒦`,kscr:`𝓀`,lAarr:`⇚`,Lacute:`Ĺ`,lacute:`ĺ`,laemptyv:`⦴`,lagran:`ℒ`,Lambda:`Λ`,lambda:`λ`,lang:`⟨`,Lang:`⟪`,langd:`⦑`,langle:`⟨`,lap:`⪅`,Laplacetrf:`ℒ`,laquo:`«`,larrb:`⇤`,larrbfs:`⤟`,larr:`←`,Larr:`↞`,lArr:`⇐`,larrfs:`⤝`,larrhk:`↩`,larrlp:`↫`,larrpl:`⤹`,larrsim:`⥳`,larrtl:`↢`,latail:`⤙`,lAtail:`⤛`,lat:`⪫`,late:`⪭`,lates:`⪭︀`,lbarr:`⤌`,lBarr:`⤎`,lbbrk:`❲`,lbrace:`{`,lbrack:`[`,lbrke:`⦋`,lbrksld:`⦏`,lbrkslu:`⦍`,Lcaron:`Ľ`,lcaron:`ľ`,Lcedil:`Ļ`,lcedil:`ļ`,lceil:`⌈`,lcub:`{`,Lcy:`Л`,lcy:`л`,ldca:`⤶`,ldquo:`“`,ldquor:`„`,ldrdhar:`⥧`,ldrushar:`⥋`,ldsh:`↲`,le:`≤`,lE:`≦`,LeftAngleBracket:`⟨`,LeftArrowBar:`⇤`,leftarrow:`←`,LeftArrow:`←`,Leftarrow:`⇐`,LeftArrowRightArrow:`⇆`,leftarrowtail:`↢`,LeftCeiling:`⌈`,LeftDoubleBracket:`⟦`,LeftDownTeeVector:`⥡`,LeftDownVectorBar:`⥙`,LeftDownVector:`⇃`,LeftFloor:`⌊`,leftharpoondown:`↽`,leftharpoonup:`↼`,leftleftarrows:`⇇`,leftrightarrow:`↔`,LeftRightArrow:`↔`,Leftrightarrow:`⇔`,leftrightarrows:`⇆`,leftrightharpoons:`⇋`,leftrightsquigarrow:`↭`,LeftRightVector:`⥎`,LeftTeeArrow:`↤`,LeftTee:`⊣`,LeftTeeVector:`⥚`,leftthreetimes:`⋋`,LeftTriangleBar:`⧏`,LeftTriangle:`⊲`,LeftTriangleEqual:`⊴`,LeftUpDownVector:`⥑`,LeftUpTeeVector:`⥠`,LeftUpVectorBar:`⥘`,LeftUpVector:`↿`,LeftVectorBar:`⥒`,LeftVector:`↼`,lEg:`⪋`,leg:`⋚`,leq:`≤`,leqq:`≦`,leqslant:`⩽`,lescc:`⪨`,les:`⩽`,lesdot:`⩿`,lesdoto:`⪁`,lesdotor:`⪃`,lesg:`⋚︀`,lesges:`⪓`,lessapprox:`⪅`,lessdot:`⋖`,lesseqgtr:`⋚`,lesseqqgtr:`⪋`,LessEqualGreater:`⋚`,LessFullEqual:`≦`,LessGreater:`≶`,lessgtr:`≶`,LessLess:`⪡`,lesssim:`≲`,LessSlantEqual:`⩽`,LessTilde:`≲`,lfisht:`⥼`,lfloor:`⌊`,Lfr:`𝔏`,lfr:`𝔩`,lg:`≶`,lgE:`⪑`,lHar:`⥢`,lhard:`↽`,lharu:`↼`,lharul:`⥪`,lhblk:`▄`,LJcy:`Љ`,ljcy:`љ`,llarr:`⇇`,ll:`≪`,Ll:`⋘`,llcorner:`⌞`,Lleftarrow:`⇚`,llhard:`⥫`,lltri:`◺`,Lmidot:`Ŀ`,lmidot:`ŀ`,lmoustache:`⎰`,lmoust:`⎰`,lnap:`⪉`,lnapprox:`⪉`,lne:`⪇`,lnE:`≨`,lneq:`⪇`,lneqq:`≨`,lnsim:`⋦`,loang:`⟬`,loarr:`⇽`,lobrk:`⟦`,longleftarrow:`⟵`,LongLeftArrow:`⟵`,Longleftarrow:`⟸`,longleftrightarrow:`⟷`,LongLeftRightArrow:`⟷`,Longleftrightarrow:`⟺`,longmapsto:`⟼`,longrightarrow:`⟶`,LongRightArrow:`⟶`,Longrightarrow:`⟹`,looparrowleft:`↫`,looparrowright:`↬`,lopar:`⦅`,Lopf:`𝕃`,lopf:`𝕝`,loplus:`⨭`,lotimes:`⨴`,lowast:`∗`,lowbar:`_`,LowerLeftArrow:`↙`,LowerRightArrow:`↘`,loz:`◊`,lozenge:`◊`,lozf:`⧫`,lpar:`(`,lparlt:`⦓`,lrarr:`⇆`,lrcorner:`⌟`,lrhar:`⇋`,lrhard:`⥭`,lrm:`‎`,lrtri:`⊿`,lsaquo:`‹`,lscr:`𝓁`,Lscr:`ℒ`,lsh:`↰`,Lsh:`↰`,lsim:`≲`,lsime:`⪍`,lsimg:`⪏`,lsqb:`[`,lsquo:`‘`,lsquor:`‚`,Lstrok:`Ł`,lstrok:`ł`,ltcc:`⪦`,ltcir:`⩹`,lt:`<`,LT:`<`,Lt:`≪`,ltdot:`⋖`,lthree:`⋋`,ltimes:`⋉`,ltlarr:`⥶`,ltquest:`⩻`,ltri:`◃`,ltrie:`⊴`,ltrif:`◂`,ltrPar:`⦖`,lurdshar:`⥊`,luruhar:`⥦`,lvertneqq:`≨︀`,lvnE:`≨︀`,macr:`¯`,male:`♂`,malt:`✠`,maltese:`✠`,Map:`⤅`,map:`↦`,mapsto:`↦`,mapstodown:`↧`,mapstoleft:`↤`,mapstoup:`↥`,marker:`▮`,mcomma:`⨩`,Mcy:`М`,mcy:`м`,mdash:`—`,mDDot:`∺`,measuredangle:`∡`,MediumSpace:` `,Mellintrf:`ℳ`,Mfr:`𝔐`,mfr:`𝔪`,mho:`℧`,micro:`µ`,midast:`*`,midcir:`⫰`,mid:`∣`,middot:`·`,minusb:`⊟`,minus:`−`,minusd:`∸`,minusdu:`⨪`,MinusPlus:`∓`,mlcp:`⫛`,mldr:`…`,mnplus:`∓`,models:`⊧`,Mopf:`𝕄`,mopf:`𝕞`,mp:`∓`,mscr:`𝓂`,Mscr:`ℳ`,mstpos:`∾`,Mu:`Μ`,mu:`μ`,multimap:`⊸`,mumap:`⊸`,nabla:`∇`,Nacute:`Ń`,nacute:`ń`,nang:`∠⃒`,nap:`≉`,napE:`⩰̸`,napid:`≋̸`,napos:`ŉ`,napprox:`≉`,natural:`♮`,naturals:`ℕ`,natur:`♮`,nbsp:`\xA0`,nbump:`≎̸`,nbumpe:`≏̸`,ncap:`⩃`,Ncaron:`Ň`,ncaron:`ň`,Ncedil:`Ņ`,ncedil:`ņ`,ncong:`≇`,ncongdot:`⩭̸`,ncup:`⩂`,Ncy:`Н`,ncy:`н`,ndash:`–`,nearhk:`⤤`,nearr:`↗`,neArr:`⇗`,nearrow:`↗`,ne:`≠`,nedot:`≐̸`,NegativeMediumSpace:`​`,NegativeThickSpace:`​`,NegativeThinSpace:`​`,NegativeVeryThinSpace:`​`,nequiv:`≢`,nesear:`⤨`,nesim:`≂̸`,NestedGreaterGreater:`≫`,NestedLessLess:`≪`,NewLine:`
`,nexist:`∄`,nexists:`∄`,Nfr:`𝔑`,nfr:`𝔫`,ngE:`≧̸`,nge:`≱`,ngeq:`≱`,ngeqq:`≧̸`,ngeqslant:`⩾̸`,nges:`⩾̸`,nGg:`⋙̸`,ngsim:`≵`,nGt:`≫⃒`,ngt:`≯`,ngtr:`≯`,nGtv:`≫̸`,nharr:`↮`,nhArr:`⇎`,nhpar:`⫲`,ni:`∋`,nis:`⋼`,nisd:`⋺`,niv:`∋`,NJcy:`Њ`,njcy:`њ`,nlarr:`↚`,nlArr:`⇍`,nldr:`‥`,nlE:`≦̸`,nle:`≰`,nleftarrow:`↚`,nLeftarrow:`⇍`,nleftrightarrow:`↮`,nLeftrightarrow:`⇎`,nleq:`≰`,nleqq:`≦̸`,nleqslant:`⩽̸`,nles:`⩽̸`,nless:`≮`,nLl:`⋘̸`,nlsim:`≴`,nLt:`≪⃒`,nlt:`≮`,nltri:`⋪`,nltrie:`⋬`,nLtv:`≪̸`,nmid:`∤`,NoBreak:`⁠`,NonBreakingSpace:`\xA0`,nopf:`𝕟`,Nopf:`ℕ`,Not:`⫬`,not:`¬`,NotCongruent:`≢`,NotCupCap:`≭`,NotDoubleVerticalBar:`∦`,NotElement:`∉`,NotEqual:`≠`,NotEqualTilde:`≂̸`,NotExists:`∄`,NotGreater:`≯`,NotGreaterEqual:`≱`,NotGreaterFullEqual:`≧̸`,NotGreaterGreater:`≫̸`,NotGreaterLess:`≹`,NotGreaterSlantEqual:`⩾̸`,NotGreaterTilde:`≵`,NotHumpDownHump:`≎̸`,NotHumpEqual:`≏̸`,notin:`∉`,notindot:`⋵̸`,notinE:`⋹̸`,notinva:`∉`,notinvb:`⋷`,notinvc:`⋶`,NotLeftTriangleBar:`⧏̸`,NotLeftTriangle:`⋪`,NotLeftTriangleEqual:`⋬`,NotLess:`≮`,NotLessEqual:`≰`,NotLessGreater:`≸`,NotLessLess:`≪̸`,NotLessSlantEqual:`⩽̸`,NotLessTilde:`≴`,NotNestedGreaterGreater:`⪢̸`,NotNestedLessLess:`⪡̸`,notni:`∌`,notniva:`∌`,notnivb:`⋾`,notnivc:`⋽`,NotPrecedes:`⊀`,NotPrecedesEqual:`⪯̸`,NotPrecedesSlantEqual:`⋠`,NotReverseElement:`∌`,NotRightTriangleBar:`⧐̸`,NotRightTriangle:`⋫`,NotRightTriangleEqual:`⋭`,NotSquareSubset:`⊏̸`,NotSquareSubsetEqual:`⋢`,NotSquareSuperset:`⊐̸`,NotSquareSupersetEqual:`⋣`,NotSubset:`⊂⃒`,NotSubsetEqual:`⊈`,NotSucceeds:`⊁`,NotSucceedsEqual:`⪰̸`,NotSucceedsSlantEqual:`⋡`,NotSucceedsTilde:`≿̸`,NotSuperset:`⊃⃒`,NotSupersetEqual:`⊉`,NotTilde:`≁`,NotTildeEqual:`≄`,NotTildeFullEqual:`≇`,NotTildeTilde:`≉`,NotVerticalBar:`∤`,nparallel:`∦`,npar:`∦`,nparsl:`⫽⃥`,npart:`∂̸`,npolint:`⨔`,npr:`⊀`,nprcue:`⋠`,nprec:`⊀`,npreceq:`⪯̸`,npre:`⪯̸`,nrarrc:`⤳̸`,nrarr:`↛`,nrArr:`⇏`,nrarrw:`↝̸`,nrightarrow:`↛`,nRightarrow:`⇏`,nrtri:`⋫`,nrtrie:`⋭`,nsc:`⊁`,nsccue:`⋡`,nsce:`⪰̸`,Nscr:`𝒩`,nscr:`𝓃`,nshortmid:`∤`,nshortparallel:`∦`,nsim:`≁`,nsime:`≄`,nsimeq:`≄`,nsmid:`∤`,nspar:`∦`,nsqsube:`⋢`,nsqsupe:`⋣`,nsub:`⊄`,nsubE:`⫅̸`,nsube:`⊈`,nsubset:`⊂⃒`,nsubseteq:`⊈`,nsubseteqq:`⫅̸`,nsucc:`⊁`,nsucceq:`⪰̸`,nsup:`⊅`,nsupE:`⫆̸`,nsupe:`⊉`,nsupset:`⊃⃒`,nsupseteq:`⊉`,nsupseteqq:`⫆̸`,ntgl:`≹`,Ntilde:`Ñ`,ntilde:`ñ`,ntlg:`≸`,ntriangleleft:`⋪`,ntrianglelefteq:`⋬`,ntriangleright:`⋫`,ntrianglerighteq:`⋭`,Nu:`Ν`,nu:`ν`,num:`#`,numero:`№`,numsp:` `,nvap:`≍⃒`,nvdash:`⊬`,nvDash:`⊭`,nVdash:`⊮`,nVDash:`⊯`,nvge:`≥⃒`,nvgt:`>⃒`,nvHarr:`⤄`,nvinfin:`⧞`,nvlArr:`⤂`,nvle:`≤⃒`,nvlt:`<⃒`,nvltrie:`⊴⃒`,nvrArr:`⤃`,nvrtrie:`⊵⃒`,nvsim:`∼⃒`,nwarhk:`⤣`,nwarr:`↖`,nwArr:`⇖`,nwarrow:`↖`,nwnear:`⤧`,Oacute:`Ó`,oacute:`ó`,oast:`⊛`,Ocirc:`Ô`,ocirc:`ô`,ocir:`⊚`,Ocy:`О`,ocy:`о`,odash:`⊝`,Odblac:`Ő`,odblac:`ő`,odiv:`⨸`,odot:`⊙`,odsold:`⦼`,OElig:`Œ`,oelig:`œ`,ofcir:`⦿`,Ofr:`𝔒`,ofr:`𝔬`,ogon:`˛`,Ograve:`Ò`,ograve:`ò`,ogt:`⧁`,ohbar:`⦵`,ohm:`Ω`,oint:`∮`,olarr:`↺`,olcir:`⦾`,olcross:`⦻`,oline:`‾`,olt:`⧀`,Omacr:`Ō`,omacr:`ō`,Omega:`Ω`,omega:`ω`,Omicron:`Ο`,omicron:`ο`,omid:`⦶`,ominus:`⊖`,Oopf:`𝕆`,oopf:`𝕠`,opar:`⦷`,OpenCurlyDoubleQuote:`“`,OpenCurlyQuote:`‘`,operp:`⦹`,oplus:`⊕`,orarr:`↻`,Or:`⩔`,or:`∨`,ord:`⩝`,order:`ℴ`,orderof:`ℴ`,ordf:`ª`,ordm:`º`,origof:`⊶`,oror:`⩖`,orslope:`⩗`,orv:`⩛`,oS:`Ⓢ`,Oscr:`𝒪`,oscr:`ℴ`,Oslash:`Ø`,oslash:`ø`,osol:`⊘`,Otilde:`Õ`,otilde:`õ`,otimesas:`⨶`,Otimes:`⨷`,otimes:`⊗`,Ouml:`Ö`,ouml:`ö`,ovbar:`⌽`,OverBar:`‾`,OverBrace:`⏞`,OverBracket:`⎴`,OverParenthesis:`⏜`,para:`¶`,parallel:`∥`,par:`∥`,parsim:`⫳`,parsl:`⫽`,part:`∂`,PartialD:`∂`,Pcy:`П`,pcy:`п`,percnt:`%`,period:`.`,permil:`‰`,perp:`⊥`,pertenk:`‱`,Pfr:`𝔓`,pfr:`𝔭`,Phi:`Φ`,phi:`φ`,phiv:`ϕ`,phmmat:`ℳ`,phone:`☎`,Pi:`Π`,pi:`π`,pitchfork:`⋔`,piv:`ϖ`,planck:`ℏ`,planckh:`ℎ`,plankv:`ℏ`,plusacir:`⨣`,plusb:`⊞`,pluscir:`⨢`,plus:`+`,plusdo:`∔`,plusdu:`⨥`,pluse:`⩲`,PlusMinus:`±`,plusmn:`±`,plussim:`⨦`,plustwo:`⨧`,pm:`±`,Poincareplane:`ℌ`,pointint:`⨕`,popf:`𝕡`,Popf:`ℙ`,pound:`£`,prap:`⪷`,Pr:`⪻`,pr:`≺`,prcue:`≼`,precapprox:`⪷`,prec:`≺`,preccurlyeq:`≼`,Precedes:`≺`,PrecedesEqual:`⪯`,PrecedesSlantEqual:`≼`,PrecedesTilde:`≾`,preceq:`⪯`,precnapprox:`⪹`,precneqq:`⪵`,precnsim:`⋨`,pre:`⪯`,prE:`⪳`,precsim:`≾`,prime:`′`,Prime:`″`,primes:`ℙ`,prnap:`⪹`,prnE:`⪵`,prnsim:`⋨`,prod:`∏`,Product:`∏`,profalar:`⌮`,profline:`⌒`,profsurf:`⌓`,prop:`∝`,Proportional:`∝`,Proportion:`∷`,propto:`∝`,prsim:`≾`,prurel:`⊰`,Pscr:`𝒫`,pscr:`𝓅`,Psi:`Ψ`,psi:`ψ`,puncsp:` `,Qfr:`𝔔`,qfr:`𝔮`,qint:`⨌`,qopf:`𝕢`,Qopf:`ℚ`,qprime:`⁗`,Qscr:`𝒬`,qscr:`𝓆`,quaternions:`ℍ`,quatint:`⨖`,quest:`?`,questeq:`≟`,quot:`"`,QUOT:`"`,rAarr:`⇛`,race:`∽̱`,Racute:`Ŕ`,racute:`ŕ`,radic:`√`,raemptyv:`⦳`,rang:`⟩`,Rang:`⟫`,rangd:`⦒`,range:`⦥`,rangle:`⟩`,raquo:`»`,rarrap:`⥵`,rarrb:`⇥`,rarrbfs:`⤠`,rarrc:`⤳`,rarr:`→`,Rarr:`↠`,rArr:`⇒`,rarrfs:`⤞`,rarrhk:`↪`,rarrlp:`↬`,rarrpl:`⥅`,rarrsim:`⥴`,Rarrtl:`⤖`,rarrtl:`↣`,rarrw:`↝`,ratail:`⤚`,rAtail:`⤜`,ratio:`∶`,rationals:`ℚ`,rbarr:`⤍`,rBarr:`⤏`,RBarr:`⤐`,rbbrk:`❳`,rbrace:`}`,rbrack:`]`,rbrke:`⦌`,rbrksld:`⦎`,rbrkslu:`⦐`,Rcaron:`Ř`,rcaron:`ř`,Rcedil:`Ŗ`,rcedil:`ŗ`,rceil:`⌉`,rcub:`}`,Rcy:`Р`,rcy:`р`,rdca:`⤷`,rdldhar:`⥩`,rdquo:`”`,rdquor:`”`,rdsh:`↳`,real:`ℜ`,realine:`ℛ`,realpart:`ℜ`,reals:`ℝ`,Re:`ℜ`,rect:`▭`,reg:`®`,REG:`®`,ReverseElement:`∋`,ReverseEquilibrium:`⇋`,ReverseUpEquilibrium:`⥯`,rfisht:`⥽`,rfloor:`⌋`,rfr:`𝔯`,Rfr:`ℜ`,rHar:`⥤`,rhard:`⇁`,rharu:`⇀`,rharul:`⥬`,Rho:`Ρ`,rho:`ρ`,rhov:`ϱ`,RightAngleBracket:`⟩`,RightArrowBar:`⇥`,rightarrow:`→`,RightArrow:`→`,Rightarrow:`⇒`,RightArrowLeftArrow:`⇄`,rightarrowtail:`↣`,RightCeiling:`⌉`,RightDoubleBracket:`⟧`,RightDownTeeVector:`⥝`,RightDownVectorBar:`⥕`,RightDownVector:`⇂`,RightFloor:`⌋`,rightharpoondown:`⇁`,rightharpoonup:`⇀`,rightleftarrows:`⇄`,rightleftharpoons:`⇌`,rightrightarrows:`⇉`,rightsquigarrow:`↝`,RightTeeArrow:`↦`,RightTee:`⊢`,RightTeeVector:`⥛`,rightthreetimes:`⋌`,RightTriangleBar:`⧐`,RightTriangle:`⊳`,RightTriangleEqual:`⊵`,RightUpDownVector:`⥏`,RightUpTeeVector:`⥜`,RightUpVectorBar:`⥔`,RightUpVector:`↾`,RightVectorBar:`⥓`,RightVector:`⇀`,ring:`˚`,risingdotseq:`≓`,rlarr:`⇄`,rlhar:`⇌`,rlm:`‏`,rmoustache:`⎱`,rmoust:`⎱`,rnmid:`⫮`,roang:`⟭`,roarr:`⇾`,robrk:`⟧`,ropar:`⦆`,ropf:`𝕣`,Ropf:`ℝ`,roplus:`⨮`,rotimes:`⨵`,RoundImplies:`⥰`,rpar:`)`,rpargt:`⦔`,rppolint:`⨒`,rrarr:`⇉`,Rrightarrow:`⇛`,rsaquo:`›`,rscr:`𝓇`,Rscr:`ℛ`,rsh:`↱`,Rsh:`↱`,rsqb:`]`,rsquo:`’`,rsquor:`’`,rthree:`⋌`,rtimes:`⋊`,rtri:`▹`,rtrie:`⊵`,rtrif:`▸`,rtriltri:`⧎`,RuleDelayed:`⧴`,ruluhar:`⥨`,rx:`℞`,Sacute:`Ś`,sacute:`ś`,sbquo:`‚`,scap:`⪸`,Scaron:`Š`,scaron:`š`,Sc:`⪼`,sc:`≻`,sccue:`≽`,sce:`⪰`,scE:`⪴`,Scedil:`Ş`,scedil:`ş`,Scirc:`Ŝ`,scirc:`ŝ`,scnap:`⪺`,scnE:`⪶`,scnsim:`⋩`,scpolint:`⨓`,scsim:`≿`,Scy:`С`,scy:`с`,sdotb:`⊡`,sdot:`⋅`,sdote:`⩦`,searhk:`⤥`,searr:`↘`,seArr:`⇘`,searrow:`↘`,sect:`§`,semi:`;`,seswar:`⤩`,setminus:`∖`,setmn:`∖`,sext:`✶`,Sfr:`𝔖`,sfr:`𝔰`,sfrown:`⌢`,sharp:`♯`,SHCHcy:`Щ`,shchcy:`щ`,SHcy:`Ш`,shcy:`ш`,ShortDownArrow:`↓`,ShortLeftArrow:`←`,shortmid:`∣`,shortparallel:`∥`,ShortRightArrow:`→`,ShortUpArrow:`↑`,shy:`­`,Sigma:`Σ`,sigma:`σ`,sigmaf:`ς`,sigmav:`ς`,sim:`∼`,simdot:`⩪`,sime:`≃`,simeq:`≃`,simg:`⪞`,simgE:`⪠`,siml:`⪝`,simlE:`⪟`,simne:`≆`,simplus:`⨤`,simrarr:`⥲`,slarr:`←`,SmallCircle:`∘`,smallsetminus:`∖`,smashp:`⨳`,smeparsl:`⧤`,smid:`∣`,smile:`⌣`,smt:`⪪`,smte:`⪬`,smtes:`⪬︀`,SOFTcy:`Ь`,softcy:`ь`,solbar:`⌿`,solb:`⧄`,sol:`/`,Sopf:`𝕊`,sopf:`𝕤`,spades:`♠`,spadesuit:`♠`,spar:`∥`,sqcap:`⊓`,sqcaps:`⊓︀`,sqcup:`⊔`,sqcups:`⊔︀`,Sqrt:`√`,sqsub:`⊏`,sqsube:`⊑`,sqsubset:`⊏`,sqsubseteq:`⊑`,sqsup:`⊐`,sqsupe:`⊒`,sqsupset:`⊐`,sqsupseteq:`⊒`,square:`□`,Square:`□`,SquareIntersection:`⊓`,SquareSubset:`⊏`,SquareSubsetEqual:`⊑`,SquareSuperset:`⊐`,SquareSupersetEqual:`⊒`,SquareUnion:`⊔`,squarf:`▪`,squ:`□`,squf:`▪`,srarr:`→`,Sscr:`𝒮`,sscr:`𝓈`,ssetmn:`∖`,ssmile:`⌣`,sstarf:`⋆`,Star:`⋆`,star:`☆`,starf:`★`,straightepsilon:`ϵ`,straightphi:`ϕ`,strns:`¯`,sub:`⊂`,Sub:`⋐`,subdot:`⪽`,subE:`⫅`,sube:`⊆`,subedot:`⫃`,submult:`⫁`,subnE:`⫋`,subne:`⊊`,subplus:`⪿`,subrarr:`⥹`,subset:`⊂`,Subset:`⋐`,subseteq:`⊆`,subseteqq:`⫅`,SubsetEqual:`⊆`,subsetneq:`⊊`,subsetneqq:`⫋`,subsim:`⫇`,subsub:`⫕`,subsup:`⫓`,succapprox:`⪸`,succ:`≻`,succcurlyeq:`≽`,Succeeds:`≻`,SucceedsEqual:`⪰`,SucceedsSlantEqual:`≽`,SucceedsTilde:`≿`,succeq:`⪰`,succnapprox:`⪺`,succneqq:`⪶`,succnsim:`⋩`,succsim:`≿`,SuchThat:`∋`,sum:`∑`,Sum:`∑`,sung:`♪`,sup1:`¹`,sup2:`²`,sup3:`³`,sup:`⊃`,Sup:`⋑`,supdot:`⪾`,supdsub:`⫘`,supE:`⫆`,supe:`⊇`,supedot:`⫄`,Superset:`⊃`,SupersetEqual:`⊇`,suphsol:`⟉`,suphsub:`⫗`,suplarr:`⥻`,supmult:`⫂`,supnE:`⫌`,supne:`⊋`,supplus:`⫀`,supset:`⊃`,Supset:`⋑`,supseteq:`⊇`,supseteqq:`⫆`,supsetneq:`⊋`,supsetneqq:`⫌`,supsim:`⫈`,supsub:`⫔`,supsup:`⫖`,swarhk:`⤦`,swarr:`↙`,swArr:`⇙`,swarrow:`↙`,swnwar:`⤪`,szlig:`ß`,Tab:`	`,target:`⌖`,Tau:`Τ`,tau:`τ`,tbrk:`⎴`,Tcaron:`Ť`,tcaron:`ť`,Tcedil:`Ţ`,tcedil:`ţ`,Tcy:`Т`,tcy:`т`,tdot:`⃛`,telrec:`⌕`,Tfr:`𝔗`,tfr:`𝔱`,there4:`∴`,therefore:`∴`,Therefore:`∴`,Theta:`Θ`,theta:`θ`,thetasym:`ϑ`,thetav:`ϑ`,thickapprox:`≈`,thicksim:`∼`,ThickSpace:`  `,ThinSpace:` `,thinsp:` `,thkap:`≈`,thksim:`∼`,THORN:`Þ`,thorn:`þ`,tilde:`˜`,Tilde:`∼`,TildeEqual:`≃`,TildeFullEqual:`≅`,TildeTilde:`≈`,timesbar:`⨱`,timesb:`⊠`,times:`×`,timesd:`⨰`,tint:`∭`,toea:`⤨`,topbot:`⌶`,topcir:`⫱`,top:`⊤`,Topf:`𝕋`,topf:`𝕥`,topfork:`⫚`,tosa:`⤩`,tprime:`‴`,trade:`™`,TRADE:`™`,triangle:`▵`,triangledown:`▿`,triangleleft:`◃`,trianglelefteq:`⊴`,triangleq:`≜`,triangleright:`▹`,trianglerighteq:`⊵`,tridot:`◬`,trie:`≜`,triminus:`⨺`,TripleDot:`⃛`,triplus:`⨹`,trisb:`⧍`,tritime:`⨻`,trpezium:`⏢`,Tscr:`𝒯`,tscr:`𝓉`,TScy:`Ц`,tscy:`ц`,TSHcy:`Ћ`,tshcy:`ћ`,Tstrok:`Ŧ`,tstrok:`ŧ`,twixt:`≬`,twoheadleftarrow:`↞`,twoheadrightarrow:`↠`,Uacute:`Ú`,uacute:`ú`,uarr:`↑`,Uarr:`↟`,uArr:`⇑`,Uarrocir:`⥉`,Ubrcy:`Ў`,ubrcy:`ў`,Ubreve:`Ŭ`,ubreve:`ŭ`,Ucirc:`Û`,ucirc:`û`,Ucy:`У`,ucy:`у`,udarr:`⇅`,Udblac:`Ű`,udblac:`ű`,udhar:`⥮`,ufisht:`⥾`,Ufr:`𝔘`,ufr:`𝔲`,Ugrave:`Ù`,ugrave:`ù`,uHar:`⥣`,uharl:`↿`,uharr:`↾`,uhblk:`▀`,ulcorn:`⌜`,ulcorner:`⌜`,ulcrop:`⌏`,ultri:`◸`,Umacr:`Ū`,umacr:`ū`,uml:`¨`,UnderBar:`_`,UnderBrace:`⏟`,UnderBracket:`⎵`,UnderParenthesis:`⏝`,Union:`⋃`,UnionPlus:`⊎`,Uogon:`Ų`,uogon:`ų`,Uopf:`𝕌`,uopf:`𝕦`,UpArrowBar:`⤒`,uparrow:`↑`,UpArrow:`↑`,Uparrow:`⇑`,UpArrowDownArrow:`⇅`,updownarrow:`↕`,UpDownArrow:`↕`,Updownarrow:`⇕`,UpEquilibrium:`⥮`,upharpoonleft:`↿`,upharpoonright:`↾`,uplus:`⊎`,UpperLeftArrow:`↖`,UpperRightArrow:`↗`,upsi:`υ`,Upsi:`ϒ`,upsih:`ϒ`,Upsilon:`Υ`,upsilon:`υ`,UpTeeArrow:`↥`,UpTee:`⊥`,upuparrows:`⇈`,urcorn:`⌝`,urcorner:`⌝`,urcrop:`⌎`,Uring:`Ů`,uring:`ů`,urtri:`◹`,Uscr:`𝒰`,uscr:`𝓊`,utdot:`⋰`,Utilde:`Ũ`,utilde:`ũ`,utri:`▵`,utrif:`▴`,uuarr:`⇈`,Uuml:`Ü`,uuml:`ü`,uwangle:`⦧`,vangrt:`⦜`,varepsilon:`ϵ`,varkappa:`ϰ`,varnothing:`∅`,varphi:`ϕ`,varpi:`ϖ`,varpropto:`∝`,varr:`↕`,vArr:`⇕`,varrho:`ϱ`,varsigma:`ς`,varsubsetneq:`⊊︀`,varsubsetneqq:`⫋︀`,varsupsetneq:`⊋︀`,varsupsetneqq:`⫌︀`,vartheta:`ϑ`,vartriangleleft:`⊲`,vartriangleright:`⊳`,vBar:`⫨`,Vbar:`⫫`,vBarv:`⫩`,Vcy:`В`,vcy:`в`,vdash:`⊢`,vDash:`⊨`,Vdash:`⊩`,VDash:`⊫`,Vdashl:`⫦`,veebar:`⊻`,vee:`∨`,Vee:`⋁`,veeeq:`≚`,vellip:`⋮`,verbar:`|`,Verbar:`‖`,vert:`|`,Vert:`‖`,VerticalBar:`∣`,VerticalLine:`|`,VerticalSeparator:`❘`,VerticalTilde:`≀`,VeryThinSpace:` `,Vfr:`𝔙`,vfr:`𝔳`,vltri:`⊲`,vnsub:`⊂⃒`,vnsup:`⊃⃒`,Vopf:`𝕍`,vopf:`𝕧`,vprop:`∝`,vrtri:`⊳`,Vscr:`𝒱`,vscr:`𝓋`,vsubnE:`⫋︀`,vsubne:`⊊︀`,vsupnE:`⫌︀`,vsupne:`⊋︀`,Vvdash:`⊪`,vzigzag:`⦚`,Wcirc:`Ŵ`,wcirc:`ŵ`,wedbar:`⩟`,wedge:`∧`,Wedge:`⋀`,wedgeq:`≙`,weierp:`℘`,Wfr:`𝔚`,wfr:`𝔴`,Wopf:`𝕎`,wopf:`𝕨`,wp:`℘`,wr:`≀`,wreath:`≀`,Wscr:`𝒲`,wscr:`𝓌`,xcap:`⋂`,xcirc:`◯`,xcup:`⋃`,xdtri:`▽`,Xfr:`𝔛`,xfr:`𝔵`,xharr:`⟷`,xhArr:`⟺`,Xi:`Ξ`,xi:`ξ`,xlarr:`⟵`,xlArr:`⟸`,xmap:`⟼`,xnis:`⋻`,xodot:`⨀`,Xopf:`𝕏`,xopf:`𝕩`,xoplus:`⨁`,xotime:`⨂`,xrarr:`⟶`,xrArr:`⟹`,Xscr:`𝒳`,xscr:`𝓍`,xsqcup:`⨆`,xuplus:`⨄`,xutri:`△`,xvee:`⋁`,xwedge:`⋀`,Yacute:`Ý`,yacute:`ý`,YAcy:`Я`,yacy:`я`,Ycirc:`Ŷ`,ycirc:`ŷ`,Ycy:`Ы`,ycy:`ы`,yen:`¥`,Yfr:`𝔜`,yfr:`𝔶`,YIcy:`Ї`,yicy:`ї`,Yopf:`𝕐`,yopf:`𝕪`,Yscr:`𝒴`,yscr:`𝓎`,YUcy:`Ю`,yucy:`ю`,yuml:`ÿ`,Yuml:`Ÿ`,Zacute:`Ź`,zacute:`ź`,Zcaron:`Ž`,zcaron:`ž`,Zcy:`З`,zcy:`з`,Zdot:`Ż`,zdot:`ż`,zeetrf:`ℨ`,ZeroWidthSpace:`​`,Zeta:`Ζ`,zeta:`ζ`,zfr:`𝔷`,Zfr:`ℨ`,ZHcy:`Ж`,zhcy:`ж`,zigrarr:`⇝`,zopf:`𝕫`,Zopf:`ℤ`,Zscr:`𝒵`,zscr:`𝓏`,zwj:`‍`,zwnj:`‌`}}}),Pa=On({"../../node_modules/entities/lib/maps/legacy.json"(e,t){t.exports={Aacute:`Á`,aacute:`á`,Acirc:`Â`,acirc:`â`,acute:`´`,AElig:`Æ`,aelig:`æ`,Agrave:`À`,agrave:`à`,amp:`&`,AMP:`&`,Aring:`Å`,aring:`å`,Atilde:`Ã`,atilde:`ã`,Auml:`Ä`,auml:`ä`,brvbar:`¦`,Ccedil:`Ç`,ccedil:`ç`,cedil:`¸`,cent:`¢`,copy:`©`,COPY:`©`,curren:`¤`,deg:`°`,divide:`÷`,Eacute:`É`,eacute:`é`,Ecirc:`Ê`,ecirc:`ê`,Egrave:`È`,egrave:`è`,ETH:`Ð`,eth:`ð`,Euml:`Ë`,euml:`ë`,frac12:`½`,frac14:`¼`,frac34:`¾`,gt:`>`,GT:`>`,Iacute:`Í`,iacute:`í`,Icirc:`Î`,icirc:`î`,iexcl:`¡`,Igrave:`Ì`,igrave:`ì`,iquest:`¿`,Iuml:`Ï`,iuml:`ï`,laquo:`«`,lt:`<`,LT:`<`,macr:`¯`,micro:`µ`,middot:`·`,nbsp:`\xA0`,not:`¬`,Ntilde:`Ñ`,ntilde:`ñ`,Oacute:`Ó`,oacute:`ó`,Ocirc:`Ô`,ocirc:`ô`,Ograve:`Ò`,ograve:`ò`,ordf:`ª`,ordm:`º`,Oslash:`Ø`,oslash:`ø`,Otilde:`Õ`,otilde:`õ`,Ouml:`Ö`,ouml:`ö`,para:`¶`,plusmn:`±`,pound:`£`,quot:`"`,QUOT:`"`,raquo:`»`,reg:`®`,REG:`®`,sect:`§`,shy:`­`,sup1:`¹`,sup2:`²`,sup3:`³`,szlig:`ß`,THORN:`Þ`,thorn:`þ`,times:`×`,Uacute:`Ú`,uacute:`ú`,Ucirc:`Û`,ucirc:`û`,Ugrave:`Ù`,ugrave:`ù`,uml:`¨`,Uuml:`Ü`,uuml:`ü`,Yacute:`Ý`,yacute:`ý`,yen:`¥`,yuml:`ÿ`}}}),Fa=On({"../../node_modules/entities/lib/maps/xml.json"(e,t){t.exports={amp:`&`,apos:`'`,gt:`>`,lt:`<`,quot:`"`}}}),Ia=On({"../../node_modules/entities/lib/maps/decode.json"(e,t){t.exports={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376}}}),La=On({"../../node_modules/entities/lib/decode_codepoint.js"(e){var t=e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0});var n=t(Ia()),r=String.fromCodePoint||function(e){var t=``;return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),t+=String.fromCharCode(e),t};function i(e){return e>=55296&&e<=57343||e>1114111?`�`:(e in n.default&&(e=n.default[e]),r(e))}e.default=i}}),Ra=On({"../../node_modules/entities/lib/decode.js"(e){var t=e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.decodeHTML=e.decodeHTMLStrict=e.decodeXML=void 0;var n=t(Na()),r=t(Pa()),i=t(Fa()),a=t(La()),o=/&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;e.decodeXML=s(i.default),e.decodeHTMLStrict=s(n.default);function s(e){var t=l(e);return function(e){return String(e).replace(o,t)}}var c=function(e,t){return e<t?1:-1};e.decodeHTML=(function(){for(var e=Object.keys(r.default).sort(c),t=Object.keys(n.default).sort(c),i=0,a=0;i<t.length;i++)e[a]===t[i]?(t[i]+=`;?`,a++):t[i]+=`;`;var o=RegExp(`&(?:`+t.join(`|`)+`|#[xX][\\da-fA-F]+;?|#\\d+;?)`,`g`),s=l(n.default);function u(e){return e.substr(-1)!==`;`&&(e+=`;`),s(e)}return function(e){return String(e).replace(o,u)}})();function l(e){return function(t){if(t.charAt(1)===`#`){var n=t.charAt(2);return n===`X`||n===`x`?a.default(parseInt(t.substr(3),16)):a.default(parseInt(t.substr(2),10))}return e[t.slice(1,-1)]||t}}}}),za=On({"../../node_modules/entities/lib/encode.js"(e){var t=e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.escapeUTF8=e.escape=e.encodeNonAsciiHTML=e.encodeHTML=e.encodeXML=void 0;var n=a(t(Fa()).default),r=o(n);e.encodeXML=m(n);var i=a(t(Na()).default);e.encodeHTML=u(i,o(i)),e.encodeNonAsciiHTML=m(i);function a(e){return Object.keys(e).sort().reduce(function(t,n){return t[e[n]]=`&`+n+`;`,t},{})}function o(e){for(var t=[],n=[],r=0,i=Object.keys(e);r<i.length;r++){var a=i[r];a.length===1?t.push(`\\`+a):n.push(a)}t.sort();for(var o=0;o<t.length-1;o++){for(var s=o;s<t.length-1&&t[s].charCodeAt(1)+1===t[s+1].charCodeAt(1);)s+=1;var c=1+s-o;c<3||t.splice(o,c,t[o]+`-`+t[s])}return n.unshift(`[`+t.join(``)+`]`),new RegExp(n.join(`|`),`g`)}var s=/(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,c=String.prototype.codePointAt==null?(function(e){return(e.charCodeAt(0)-55296)*1024+e.charCodeAt(1)-56320+65536}):(function(e){return e.codePointAt(0)});function l(e){return`&#x`+(e.length>1?c(e):e.charCodeAt(0)).toString(16).toUpperCase()+`;`}function u(e,t){return function(n){return n.replace(t,function(t){return e[t]}).replace(s,l)}}var d=RegExp(r.source+`|`+s.source,`g`);function f(e){return e.replace(d,l)}e.escape=f;function p(e){return e.replace(r,l)}e.escapeUTF8=p;function m(e){return function(t){return t.replace(d,function(t){return e[t]||l(t)})}}}}),Ba=On({"../../node_modules/entities/lib/index.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.decodeXMLStrict=e.decodeHTML5Strict=e.decodeHTML4Strict=e.decodeHTML5=e.decodeHTML4=e.decodeHTMLStrict=e.decodeHTML=e.decodeXML=e.encodeHTML5=e.encodeHTML4=e.escapeUTF8=e.escape=e.encodeNonAsciiHTML=e.encodeHTML=e.encodeXML=e.encode=e.decodeStrict=e.decode=void 0;var t=Ra(),n=za();function r(e,n){return(!n||n<=0?t.decodeXML:t.decodeHTML)(e)}e.decode=r;function i(e,n){return(!n||n<=0?t.decodeXML:t.decodeHTMLStrict)(e)}e.decodeStrict=i;function a(e,t){return(!t||t<=0?n.encodeXML:n.encodeHTML)(e)}e.encode=a;var o=za();Object.defineProperty(e,"encodeXML",{enumerable:!0,get:function(){return o.encodeXML}}),Object.defineProperty(e,"encodeHTML",{enumerable:!0,get:function(){return o.encodeHTML}}),Object.defineProperty(e,"encodeNonAsciiHTML",{enumerable:!0,get:function(){return o.encodeNonAsciiHTML}}),Object.defineProperty(e,"escape",{enumerable:!0,get:function(){return o.escape}}),Object.defineProperty(e,"escapeUTF8",{enumerable:!0,get:function(){return o.escapeUTF8}}),Object.defineProperty(e,"encodeHTML4",{enumerable:!0,get:function(){return o.encodeHTML}}),Object.defineProperty(e,"encodeHTML5",{enumerable:!0,get:function(){return o.encodeHTML}});var s=Ra();Object.defineProperty(e,"decodeXML",{enumerable:!0,get:function(){return s.decodeXML}}),Object.defineProperty(e,"decodeHTML",{enumerable:!0,get:function(){return s.decodeHTML}}),Object.defineProperty(e,"decodeHTMLStrict",{enumerable:!0,get:function(){return s.decodeHTMLStrict}}),Object.defineProperty(e,"decodeHTML4",{enumerable:!0,get:function(){return s.decodeHTML}}),Object.defineProperty(e,"decodeHTML5",{enumerable:!0,get:function(){return s.decodeHTML}}),Object.defineProperty(e,"decodeHTML4Strict",{enumerable:!0,get:function(){return s.decodeHTMLStrict}}),Object.defineProperty(e,"decodeHTML5Strict",{enumerable:!0,get:function(){return s.decodeHTMLStrict}}),Object.defineProperty(e,"decodeXMLStrict",{enumerable:!0,get:function(){return s.decodeXML}})}}),Va=On({"../../node_modules/ansi-to-html/lib/ansi_to_html.js"(e,t){function n(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function a(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&typeof e.length==`number`){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a=!0,s=!1,c;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,c=e},f:function(){try{!a&&n.return!=null&&n.return()}finally{if(s)throw c}}}}function o(e,t){if(e){if(typeof e==`string`)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`)return Array.from(e);if(n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}}function s(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var c=Ba(),l={fg:`#FFF`,bg:`#000`,newline:!1,escapeXML:!1,stream:!1,colors:u()};function u(){var e={0:`#000`,1:`#A00`,2:`#0A0`,3:`#A50`,4:`#00A`,5:`#A0A`,6:`#0AA`,7:`#AAA`,8:`#555`,9:`#F55`,10:`#5F5`,11:`#FF5`,12:`#55F`,13:`#F5F`,14:`#5FF`,15:`#FFF`};return v(0,5).forEach(function(t){v(0,5).forEach(function(n){v(0,5).forEach(function(r){return d(t,n,r,e)})})}),v(0,23).forEach(function(t){var n=t+232,r=f(t*10+8);e[n]=`#`+r+r+r}),e}function d(e,t,n,r){var i=16+e*36+t*6+n;r[i]=p([e>0?e*40+55:0,t>0?t*40+55:0,n>0?n*40+55:0])}function f(e){for(var t=e.toString(16);t.length<2;)t=`0`+t;return t}function p(e){var t=[],n=a(e),r;try{for(n.s();!(r=n.n()).done;){var i=r.value;t.push(f(i))}}catch(e){n.e(e)}finally{n.f()}return`#`+t.join(``)}function m(e,t,n,r){var i;return t===`text`?i=x(n,r):t===`display`?i=g(e,n,r):t===`xterm256Foreground`?i=w(e,r.colors[n]):t===`xterm256Background`?i=ee(e,r.colors[n]):t===`rgb`&&(i=h(e,n)),i}function h(e,t){t=t.substring(2).slice(0,-1);var n=+t.substr(0,2),r=t.substring(5).split(`;`).map(function(e){return(`0`+Number(e).toString(16)).substr(-2)}).join(``);return C(e,(n===38?`color:#`:`background-color:#`)+r)}function g(e,t,n){t=parseInt(t,10);var r={"-1":function(){return`<br/>`},0:function(){return e.length&&_(e)},1:function(){return S(e,`b`)},3:function(){return S(e,`i`)},4:function(){return S(e,`u`)},8:function(){return C(e,`display:none`)},9:function(){return S(e,`strike`)},22:function(){return C(e,`font-weight:normal;text-decoration:none;font-style:normal`)},23:function(){return T(e,`i`)},24:function(){return T(e,`u`)},39:function(){return w(e,n.fg)},49:function(){return ee(e,n.bg)},53:function(){return C(e,`text-decoration:overline`)}},i;return r[t]?i=r[t]():4<t&&t<7?i=S(e,`blink`):29<t&&t<38?i=w(e,n.colors[t-30]):39<t&&t<48?i=ee(e,n.colors[t-40]):89<t&&t<98?i=w(e,n.colors[8+(t-90)]):99<t&&t<108&&(i=ee(e,n.colors[8+(t-100)])),i}function _(e){var t=e.slice(0);return e.length=0,t.reverse().map(function(e){return`</`+e+`>`}).join(``)}function v(e,t){for(var n=[],r=e;r<=t;r++)n.push(r);return n}function y(e){return function(t){return(e===null||t.category!==e)&&e!==`all`}}function b(e){e=parseInt(e,10);var t=null;return e===0?t=`all`:e===1?t=`bold`:2<e&&e<5?t=`underline`:4<e&&e<7?t=`blink`:e===8?t=`hide`:e===9?t=`strike`:29<e&&e<38||e===39||89<e&&e<98?t=`foreground-color`:(39<e&&e<48||e===49||99<e&&e<108)&&(t=`background-color`),t}function x(e,t){return t.escapeXML?c.encodeXML(e):e}function S(e,t,n){return n||=``,e.push(t),`<${t}${n?` style="${n}"`:``}>`}function C(e,t){return S(e,`span`,t)}function w(e,t){return S(e,`span`,`color:`+t)}function ee(e,t){return S(e,`span`,`background-color:`+t)}function T(e,t){var n;if(e.slice(-1)[0]===t&&(n=e.pop()),n)return`</`+t+`>`}function te(e,t,n){var r=!1,i=3;function o(){return``}function s(e,t){return n(`xterm256Foreground`,t),``}function c(e,t){return n(`xterm256Background`,t),``}function l(e){return t.newline?n(`display`,-1):n(`text`,e),``}function u(e,t){r=!0,t.trim().length===0&&(t=`0`),t=t.trimRight(`;`).split(`;`);var i=a(t),o;try{for(i.s();!(o=i.n()).done;){var s=o.value;n(`display`,s)}}catch(e){i.e(e)}finally{i.f()}return``}function d(e){return n(`text`,e),``}function f(e){return n(`rgb`,e),``}var p=[{pattern:/^\x08+/,sub:o},{pattern:/^\x1b\[[012]?K/,sub:o},{pattern:/^\x1b\[\(B/,sub:o},{pattern:/^\x1b\[[34]8;2;\d+;\d+;\d+m/,sub:f},{pattern:/^\x1b\[38;5;(\d+)m/,sub:s},{pattern:/^\x1b\[48;5;(\d+)m/,sub:c},{pattern:/^\n/,sub:l},{pattern:/^\r+\n/,sub:l},{pattern:/^\r/,sub:l},{pattern:/^\x1b\[((?:\d{1,3};?)+|)m/,sub:u},{pattern:/^\x1b\[\d?J/,sub:o},{pattern:/^\x1b\[\d{0,3};\d{0,3}f/,sub:o},{pattern:/^\x1b\[?[\d;]{0,3}/,sub:o},{pattern:/^(([^\x1b\x08\r\n])+)/,sub:d}];function m(t,n){n>i&&r||(r=!1,e=e.replace(t.pattern,t.sub))}var h=[],g=e.length;outer:for(;g>0;){for(var _=0,v=0,y=p.length;v<y;_=++v){var b=p[_];if(m(b,_),e.length!==g){g=e.length;continue outer}}if(e.length===g)break;h.push(0),g=e.length}return h}function E(e,t,n){return t!==`text`&&(e=e.filter(y(b(n))),e.push({token:t,data:n,category:b(n)})),e}t.exports=(function(){function e(t){n(this,e),t||={},t.colors&&=Object.assign({},l.colors,t.colors),this.options=Object.assign({},l,t),this.stack=[],this.stickyStack=[]}return i(e,[{key:`toHtml`,value:function(e){var t=this;e=typeof e==`string`?[e]:e;var n=this.stack,r=this.options,i=[];return this.stickyStack.forEach(function(e){var t=m(n,e.token,e.data,r);t&&i.push(t)}),te(e.join(``),r,function(e,a){var o=m(n,e,a,r);o&&i.push(o),r.stream&&(t.stickyStack=E(t.stickyStack,e,a))}),n.length&&i.push(_(n)),i.join(``)}}]),e})()}});jn(On({"../../node_modules/picocolors/picocolors.browser.js"(e,t){var n=String,r=function(){return{isColorSupported:!1,reset:n,bold:n,dim:n,italic:n,underline:n,inverse:n,hidden:n,strikethrough:n,black:n,red:n,green:n,yellow:n,blue:n,magenta:n,cyan:n,white:n,gray:n,bgBlack:n,bgRed:n,bgGreen:n,bgYellow:n,bgBlue:n,bgMagenta:n,bgCyan:n,bgWhite:n,blackBright:n,redBright:n,greenBright:n,yellowBright:n,blueBright:n,magentaBright:n,cyanBright:n,whiteBright:n,bgBlackBright:n,bgRedBright:n,bgGreenBright:n,bgYellowBright:n,bgBlueBright:n,bgMagentaBright:n,bgCyanBright:n,bgWhiteBright:n}};t.exports=r(),t.exports.createColors=r}})(),1);function Ha(e){return e?.length?e.map(e=>{let t=typeof e==`object`&&e&&`key`in e?e.key:e;return typeof t==`number`?`[${t}]`:`.${String(t)}`}).join(``).replace(/^\./,``):``}function Ua(e){return e.map(e=>{let t=Ha(e.path);return t===``?e.message:`${t}: ${e.message}`}).join(`
`)}var Wa=class extends Nr{constructor(e){super({name:`OpenServiceValidationError`,category:`CORE-COMMON`,code:5,message:`Invalid ${e.phase} for ${e.kind} "${e.serviceId}.${e.name}":
${Ua(e.issues)}`}),this.data=e}},Ga=class extends Nr{constructor(e){super({name:`OpenServiceUnimplementedOperationError`,category:`CORE-COMMON`,code:8,message:`${e.kind[0].toUpperCase()}${e.kind.slice(1)} "${e.serviceId}.${e.name}" is not implemented for this environment.`}),this.data=e}},Ka=class extends Nr{constructor(e){super({name:`OpenServiceInvalidStaticPathError`,category:`CORE-COMMON`,code:10,message:`Invalid static path "${e.path}" for query "${e.serviceId}.${e.name}": use a relative path with forward slashes and no ".." segments.`}),this.data=e}},qa=class extends Nr{constructor(e){super({name:`OpenServiceAsyncSchemaError`,category:`CORE-COMMON`,code:9,message:`Async schema for ${e.kind} "${e.serviceId}.${e.name}" (${e.phase}): query input and output schemas must validate synchronously.`}),this.data=e}},Ja=class extends Nr{constructor(e){super({name:`OpenServiceLoadedDrainExceededError`,category:`CORE-COMMON`,code:11,message:`Query "${e.serviceId}.${e.name}".loaded(...) did not settle after ${e.iterations} drain iterations. Check for handlers that keep discovering new dependencies after every state change.`}),this.data=e}};function Ya(e,t){let n=t.status===`pending`,r=t.loadStatus===`loading`;return{data:e,error:t.error,status:t.status,loadStatus:t.loadStatus,isPending:n,isSuccess:t.status===`success`,isError:t.status===`error`,isLoading:r,isInitialLoading:n&&r&&e===void 0,isRefreshing:r&&!n}}function Xa(e){return e instanceof Error?e:Error(String(e))}var Za=(e=>(e.MANAGER_UNCAUGHT=`MANAGER_UNCAUGHT`,e.MANAGER_UI=`MANAGER_UI`,e.MANAGER_API=`MANAGER_API`,e.MANAGER_CLIENT_LOGGER=`MANAGER_CLIENT-LOGGER`,e.MANAGER_CHANNELS=`MANAGER_CHANNELS`,e.MANAGER_CORE_EVENTS=`MANAGER_CORE-EVENTS`,e.MANAGER_ROUTER=`MANAGER_ROUTER`,e.MANAGER_THEMING=`MANAGER_THEMING`,e.MANAGER_UNIVERSAL_STORE=`MANAGER_UNIVERSAL-STORE`,e.MANAGER_OPEN_SERVICE=`MANAGER_OPEN-SERVICE`,e))(Za||{}),Qa,$a={lang:void 0,message:void 0,abortEarly:void 0,abortPipeEarly:void 0};function eo(e){return!e&&!Qa?$a:{lang:e?.lang??Qa?.lang,message:e?.message,abortEarly:e?.abortEarly??Qa?.abortEarly,abortPipeEarly:e?.abortPipeEarly??Qa?.abortPipeEarly}}var to;function no(e){return to?.get(e)}var ro;function io(e){return ro?.get(e)}var ao;function oo(e,t){return ao?.get(e)?.get(t)}function so(e){let t=typeof e;return t===`string`?`"${e}"`:t===`number`||t===`bigint`||t===`boolean`?`${e}`:t===`object`||t===`function`?(e&&Object.getPrototypeOf(e)?.constructor?.name)??`null`:t}function co(e,t,n,r,i){let a=i&&`input`in i?i.input:n.value,o=i?.expected??e.expects??null,s=i?.received??so(a),c={kind:e.kind,type:e.type,input:a,expected:o,received:s,message:`Invalid ${t}: ${o?`Expected ${o} but r`:`R`}eceived ${s}`,requirement:e.requirement,path:i?.path,issues:i?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},l=e.kind===`schema`,u=i?.message??e.message??oo(e.reference,c.lang)??(l?io(c.lang):null)??r.message??no(c.lang);u!==void 0&&(c.message=typeof u==`function`?u(c):u),l&&(n.typed=!1),n.issues?n.issues.push(c):n.issues=[c]}var lo=new WeakMap;function uo(e){let t=lo.get(e);return t||(t={version:1,vendor:`valibot`,validate(t){return e[`~run`]({value:t},eo())}},lo.set(e,t)),t}function fo(e,t){return Object.prototype.hasOwnProperty.call(e,t)&&t!==`__proto__`&&t!==`prototype`&&t!==`constructor`}function po(e,t){return{kind:`validation`,type:`min_value`,reference:po,async:!1,expects:`>=${e instanceof Date?e.toJSON():so(e)}`,requirement:e,message:t,"~run"(e,t){return e.typed&&!(e.value>=this.requirement)&&co(this,`value`,e,t,{received:e.value instanceof Date?e.value.toJSON():so(e.value)}),e}}}function mo(e){return{kind:`validation`,type:`safe_integer`,reference:mo,async:!1,expects:null,requirement:Number.isSafeInteger,message:e,"~run"(e,t){return e.typed&&!this.requirement(e.value)&&co(this,`safe integer`,e,t),e}}}function ho(e,t,n){return typeof e.fallback==`function`?e.fallback(t,n):e.fallback}function go(e,t,n){return typeof e.default==`function`?e.default(t,n):e.default}function _o(e,t){return{kind:`schema`,type:`array`,reference:_o,expects:`Array`,async:!1,item:e,message:t,get"~standard"(){return uo(this)},"~run"(e,t){let n=e.value;if(Array.isArray(n)){e.typed=!0,e.value=[];for(let r=0;r<n.length;r++){let i=n[r],a=this.item[`~run`]({value:i},t);if(a.issues){let o={type:`array`,origin:`value`,input:n,key:r,value:i};for(let t of a.issues)t.path?t.path.unshift(o):t.path=[o],e.issues?.push(t);if(e.issues||=a.issues,t.abortEarly){e.typed=!1;break}}a.typed||(e.typed=!1),e.value.push(a.value)}}else co(this,`type`,e,t);return e}}}function vo(e,t){return{kind:`schema`,type:`custom`,reference:vo,expects:`unknown`,async:!1,check:e,message:t,get"~standard"(){return uo(this)},"~run"(e,t){return this.check(e.value)?e.typed=!0:co(this,`type`,e,t),e}}}function yo(e,t){return{kind:`schema`,type:`loose_object`,reference:yo,expects:`Object`,async:!1,entries:e,message:t,get"~standard"(){return uo(this)},"~run"(e,t){let n=e.value;if(n&&typeof n==`object`){e.typed=!0,e.value={};for(let r in this.entries){let i=this.entries[r];if(r in n||(i.type===`exact_optional`||i.type===`optional`||i.type===`nullish`)&&i.default!==void 0){let a=r in n?n[r]:go(i),o=i[`~run`]({value:a},t);if(o.issues){let i={type:`object`,origin:`value`,input:n,key:r,value:a};for(let t of o.issues)t.path?t.path.unshift(i):t.path=[i],e.issues?.push(t);if(e.issues||=o.issues,t.abortEarly){e.typed=!1;break}}o.typed||(e.typed=!1),e.value[r]=o.value}else if(i.fallback!==void 0)e.value[r]=ho(i);else if(i.type!==`exact_optional`&&i.type!==`optional`&&i.type!==`nullish`&&(co(this,`key`,e,t,{input:void 0,expected:`"${r}"`,path:[{type:`object`,origin:`key`,input:n,key:r,value:n[r]}]}),t.abortEarly))break}if(!e.issues||!t.abortEarly)for(let t in n)fo(n,t)&&!(t in this.entries)&&(e.value[t]=n[t])}else co(this,`type`,e,t);return e}}}function bo(e){return{kind:`schema`,type:`number`,reference:bo,expects:`number`,async:!1,message:e,get"~standard"(){return uo(this)},"~run"(e,t){return typeof e.value==`number`&&!isNaN(e.value)?e.typed=!0:co(this,`type`,e,t),e}}}function xo(e,t){return{kind:`schema`,type:`object`,reference:xo,expects:`Object`,async:!1,entries:e,message:t,get"~standard"(){return uo(this)},"~run"(e,t){let n=e.value;if(n&&typeof n==`object`){e.typed=!0,e.value={};for(let r in this.entries){let i=this.entries[r];if(r in n||(i.type===`exact_optional`||i.type===`optional`||i.type===`nullish`)&&i.default!==void 0){let a=r in n?n[r]:go(i),o=i[`~run`]({value:a},t);if(o.issues){let i={type:`object`,origin:`value`,input:n,key:r,value:a};for(let t of o.issues)t.path?t.path.unshift(i):t.path=[i],e.issues?.push(t);if(e.issues||=o.issues,t.abortEarly){e.typed=!1;break}}o.typed||(e.typed=!1),e.value[r]=o.value}else if(i.fallback!==void 0)e.value[r]=ho(i);else if(i.type!==`exact_optional`&&i.type!==`optional`&&i.type!==`nullish`&&(co(this,`key`,e,t,{input:void 0,expected:`"${r}"`,path:[{type:`object`,origin:`key`,input:n,key:r,value:n[r]}]}),t.abortEarly))break}}else co(this,`type`,e,t);return e}}}function So(e,t){return{kind:`schema`,type:`optional`,reference:So,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:t,get"~standard"(){return uo(this)},"~run"(e,t){return e.value===void 0&&(this.default!==void 0&&(e.value=go(this,e,t)),e.value===void 0)?(e.typed=!0,e):this.wrapped[`~run`](e,t)}}}function Co(e,t,n){return{kind:`schema`,type:`record`,reference:Co,expects:`Object`,async:!1,key:e,value:t,message:n,get"~standard"(){return uo(this)},"~run"(e,t){let n=e.value;if(n&&typeof n==`object`){e.typed=!0,e.value={};for(let r in n)if(fo(n,r)){let i=n[r],a=this.key[`~run`]({value:r},t);if(a.issues){let o={type:`object`,origin:`key`,input:n,key:r,value:i};for(let t of a.issues)t.path=[o],e.issues?.push(t);if(e.issues||=a.issues,t.abortEarly){e.typed=!1;break}}let o=this.value[`~run`]({value:i},t);if(o.issues){let a={type:`object`,origin:`value`,input:n,key:r,value:i};for(let t of o.issues)t.path?t.path.unshift(a):t.path=[a],e.issues?.push(t);if(e.issues||=o.issues,t.abortEarly){e.typed=!1;break}}(!a.typed||!o.typed)&&(e.typed=!1),a.typed&&(e.value[a.value]=o.value)}}else co(this,`type`,e,t);return e}}}function wo(e){return{kind:`schema`,type:`string`,reference:wo,expects:`string`,async:!1,message:e,get"~standard"(){return uo(this)},"~run"(e,t){return typeof e.value==`string`?e.typed=!0:co(this,`type`,e,t),e}}}function To(e){return{kind:`schema`,type:`undefined`,reference:To,expects:`undefined`,async:!1,message:e,get"~standard"(){return uo(this)},"~run"(e,t){return e.value===void 0?e.typed=!0:co(this,`type`,e,t),e}}}function Eo(){return{kind:`schema`,type:`unknown`,reference:Eo,expects:`unknown`,async:!1,get"~standard"(){return uo(this)},"~run"(e){return e.typed=!0,e}}}function Do(e){return{kind:`schema`,type:`void`,reference:Do,expects:`void`,async:!1,message:e,get"~standard"(){return uo(this)},"~run"(e,t){return e.value===void 0?e.typed=!0:co(this,`type`,e,t),e}}}function Oo(...e){return{...e[0],pipe:e,get"~standard"(){return uo(this)},"~run"(t,n){for(let r of e)if(r.kind!==`metadata`){if(t.issues&&(r.kind===`schema`||r.kind===`transformation`)){t.typed=!1;break}(!t.issues||!n.abortEarly&&!n.abortPipeEarly)&&(t=r[`~run`](t,n))}return t}}}Oo(bo(),mo(),po(0)),So(Eo()),So(Eo());var ko=Symbol.for(`preact-signals`);function Ao(){if(Fo>1)Fo--;else{var e,t=!1;for((function(){var e=Ro;for(Ro=void 0;e!==void 0;)e.S.v===e.v&&(e.S.i=e.i),e=e.o})();Po!==void 0;){var n=Po;for(Po=void 0,Io++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&Uo(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(Io=0,Fo--,t)throw e}}var jo=void 0;function Mo(e){var t=jo;jo=void 0;try{return e()}finally{jo=t}}var No,Po=void 0,Fo=0,Io=0,Lo=0,Ro=void 0,zo=0;function Bo(e){if(jo!==void 0){var t=e.n;if(t===void 0||t.t!==jo)return t={i:0,S:e,p:jo.s,n:void 0,t:jo,e:void 0,x:void 0,r:t},jo.s!==void 0&&(jo.s.n=t),jo.s=t,e.n=t,32&jo.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=jo.s,t.n=void 0,jo.s.n=t,jo.s=t),t}}function Vo(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}Vo.prototype.brand=ko,Vo.prototype.h=function(){return!0},Vo.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?Mo(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},Vo.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&Mo(function(){var e;(e=t.Z)==null||e.call(t)}))}},Vo.prototype.subscribe=function(e){var t=this;return Qo(function(){var n=t.value,r=jo;jo=void 0;try{e(n)}finally{jo=r}},{name:`sub`})},Vo.prototype.valueOf=function(){return this.value},Vo.prototype.toString=function(){return this.value+``},Vo.prototype.toJSON=function(){return this.value},Vo.prototype.peek=function(){var e=this;return Mo(function(){return e.value})},Object.defineProperty(Vo.prototype,"value",{get:function(){var e=Bo(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(Io>100)throw Error(`Cycle detected`);(function(e){Fo!==0&&Io===0&&e.l!==Lo&&(e.l=Lo,Ro={S:e,v:e.v,i:e.i,o:Ro})})(this),this.v=e,this.i++,zo++,Fo++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Ao()}}}});function Ho(e,t){return new Vo(e,t)}function Uo(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Wo(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function Go(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function Ko(e,t){Vo.call(this,void 0),this.x=e,this.s=void 0,this.g=zo-1,this.f=4,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}Ko.prototype=new Vo,Ko.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===zo))return!0;if(this.g=zo,this.f|=1,this.i>0&&!Uo(this))return this.f&=-2,!0;var e=jo;try{Wo(this),jo=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return jo=e,Go(this),this.f&=-2,!0},Ko.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}Vo.prototype.S.call(this,e)},Ko.prototype.U=function(e){if(this.t!==void 0&&(Vo.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},Ko.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(Ko.prototype,"value",{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=Bo(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function qo(e,t){return new Ko(e,t)}function Jo(e){var t=e.m;if(e.m=void 0,typeof t==`function`){Fo++;var n=jo;jo=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,Yo(e),t}finally{jo=n,Ao()}}}function Yo(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Jo(e)}function Xo(e){if(jo!==this)throw Error(`Out-of-order effect`);Go(this),jo=e,this.f&=-2,8&this.f&&Yo(this),Ao()}function Zo(e,t){this.x=e,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,No&&No.push(this)}Zo.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.m=t)}finally{e()}},Zo.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,Jo(this),Wo(this),Fo++;var e=jo;return jo=this,Xo.bind(this,e)},Zo.prototype.N=function(){2&this.f||(this.f|=2,this.u=Po,Po=this)},Zo.prototype.d=function(){this.f|=8,1&this.f||Yo(this)},Zo.prototype.dispose=function(){this.d()};function Qo(e,t){var n=new Zo(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var $o=new WeakMap,es=new WeakMap,ts=new WeakMap,ns=new WeakSet,rs=new WeakMap,is=/^\$/,as=Object.getOwnPropertyDescriptor,os=!1,ss=function(e,t){var n=new Proxy(e,t);return ns.add(n),n},cs=function(){throw Error(`Don't mutate the signals directly.`)},ls=function(e){return function(t,n,r){if(os)return Reflect.get(t,n,r);var i=e||n[0]===`$`;if(!e&&i&&Array.isArray(t)){if(n===`$`)return ts.has(t)||ts.set(t,ss(t,ds)),ts.get(t);i=n===`$length`}$o.has(r)||$o.set(r,new Map);var a=$o.get(r),o=i?n.replace(is,``):n;if(a.has(o)||typeof as(t,o)?.get!=`function`){var s=Reflect.get(t,o,r);if(i&&typeof s==`function`)return;if(typeof o==`symbol`&&fs.has(o))return s;a.has(o)||(ms(s)&&(es.has(s)||es.set(s,ss(s,us)),s=es.get(s)),a.set(o,Ho(s)))}else a.set(o,qo(function(){return Reflect.get(t,o,r)}));return i?a.get(o):a.get(o).value}},us={get:ls(!1),set:function(e,t,n,r){if(typeof as(e,t)?.set==`function`)return Reflect.set(e,t,n,r);$o.has(r)||$o.set(r,new Map);var i=$o.get(r);if(t[0]===`$`){n instanceof Vo||cs();var a=t.replace(is,``);return i.set(a,n),Reflect.set(e,a,n.peek(),r)}var o=n;ms(n)&&(es.has(n)||es.set(n,ss(n,us)),o=es.get(n));var s=!(t in e),c=Reflect.set(e,t,n,r);return i.has(t)?i.get(t).value=o:i.set(t,Ho(o)),s&&rs.has(e)&&rs.get(e).value++,Array.isArray(e)&&i.has(`length`)&&(i.get(`length`).value=e.length),c},deleteProperty:function(e,t){t[0]===`$`&&cs();var n=$o.get(es.get(e)),r=Reflect.deleteProperty(e,t);return n&&n.has(t)&&(n.get(t).value=void 0),rs.has(e)&&rs.get(e).value++,r},ownKeys:function(e){return rs.has(e)||rs.set(e,Ho(0)),rs._=rs.get(e).value,Reflect.ownKeys(e)}},ds={get:ls(!0),set:cs,deleteProperty:cs},fs=new Set(Object.getOwnPropertyNames(Symbol).map(function(e){return Symbol[e]}).filter(function(e){return typeof e==`symbol`})),ps=new Set([Object,Array]),ms=function(e){return typeof e==`object`&&!!e&&ps.has(e.constructor)&&!ns.has(e)};function hs(e,t,n){let r=e[`~standard`].validate(t);if(r instanceof Promise)throw new qa({kind:n.kind,serviceId:n.serviceId,name:n.name,phase:n.phase});if(r.issues)throw new Wa({...n,issues:r.issues});return r.value}var gs=32,_s=new Map,vs,ys=new Set;function bs(e){let t=e=>{if(e===void 0)return{__t:`undefined`};if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return e.map(t);let n={};for(let r of Object.keys(e).sort())n[r]=t(e[r]);return{__t:`object`,value:n}};return JSON.stringify(t(e))}function xs(e,t,n){return`${e}::${t}::${bs(n)}`}function Ss(e){let t=e.filter(e=>e.status===`rejected`);if(t.length===0)return;let[n,...r]=t.map(e=>e.reason);if(r.length>0&&n instanceof Error&&Reflect.get(n,`cause`)===void 0)try{Reflect.set(n,`cause`,{aggregated:r})}catch{}throw n}async function Cs(e,t,n,r){let i=0;for(;e.size>0;){if(i++>gs)throw new Ja({serviceId:n,name:r,iterations:gs});let a=[...e];e.clear();let o=await Promise.allSettled(a.map(e=>e.promise));if(t)for(let e of a)t.add(e.key);Ss(o)}}function ws(e){return typeof e!=`object`||!e?e:JSON.parse(JSON.stringify(e))}function Ts(e,t,n,r){return hs(n.input,r,{kind:`query`,serviceId:e.serviceId,name:t,phase:`input`})}function Es(e,t,n,r){return hs(n.output,r,{kind:`query`,serviceId:e.serviceId,name:t,phase:`output`})}function Ds(e,t,n,r,i,a){if(!n.handler)throw new Ga({kind:`query`,serviceId:e.serviceId,name:t});let o={self:{get state(){return e.state},queries:i},getService:a};return n.handler(r,o)}function Os(e,t,n,r,i){return function(a){let o=Ts(e,t,n,arguments.length===0?void 0:a);return n.load&&i?.(o),Es(e,t,n,Ds(e,t,n,o,r,e.registryApi.getService))}}function ks(e,t,n,r,i,a){let o=_s.get(i);if(o)return o;let s=new Set(a);s.add(i);let c=Promise.resolve().then(()=>As(e,t,n,r,s)).finally(()=>{_s.get(i)===c&&_s.delete(i)});return _s.set(i,c),c}async function As(e,t,n,r,i){if(!n.load)return;let a=new Set,o={self:{get state(){return e.state},queries:Ms(e,i,a),commands:e.getLoadCommands()},getService:e.registryApi.getService};await Promise.resolve(n.load(r,o)),await Cs(a,void 0,e.serviceId,t)}async function js(e,t,n,r,i){if(!n.load)return;let a={self:{get state(){return e.state},queries:e.reactiveLoadQueries,commands:e.buildGatedCommands(i)},getService:e.registryApi.getService};await Promise.resolve(n.load(r,a))}function Ms(e,t,n){let r={};for(let[i,a]of e.queryDefinitions){let o=e.defaultQueries[i];r[i]={get:Os(e,i,a,r,r=>{let o=xs(e.serviceId,i,r),s=ks(e,i,a,r,o,t);t.has(o)||n.add({key:o,promise:s})}),loaded(n){return Ns(e,i,a,arguments.length===0?void 0:n,t)},subscribe:o.subscribe}}return r}async function Ns(e,t,n,r,i=ys){let a=Ts(e,t,n,r),o=xs(e.serviceId,t,a),s=new Set(i);s.add(o);let c={ancestorChain:s,collector:new Set,settledKeys:new Set};if(n.load&&!i.has(o)){let r=ks(e,t,n,a,o,i);c.collector.add({key:o,promise:r})}let l=0,u=!0;for(;u;){if(l++>gs)throw new Ja({serviceId:e.serviceId,name:t,iterations:gs});for(;c.collector.size>0;){let e=[...c.collector];c.collector.clear();let t=await Promise.allSettled(e.map(e=>e.promise));for(let t of e)c.settledKeys.add(t.key);Ss(t)}let r=vs;vs=c;try{Ds(e,t,n,a,e.defaultQueries,e.registryApi.getService)}catch{}finally{vs=r}u=c.collector.size>0}let d=vs;vs=c;try{return Es(e,t,n,Ds(e,t,n,a,e.defaultQueries,e.registryApi.getService))}finally{vs=d}}var Ps=new Set([`__proto__`,`constructor`,`prototype`]);function Fs(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Is(e,t,n){if(!n.preserveMissingKeys)for(let n of Object.keys(e))Ps.has(n)||Object.prototype.hasOwnProperty.call(t,n)||delete e[n];for(let r of Object.keys(t)){if(Ps.has(r))continue;let i=t[r],a=e[r];Fs(i)&&Fs(a)?Is(a,i,n):a!==i&&(e[r]=i)}}var Ls=`__openServiceError__`,Rs=new Set([Ls,`name`,`message`,`stack`,`cause`]);function zs(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Bs(e){return zs(e)&&e[Ls]===!0}function Vs(e){if(e instanceof Error)return Hs(e);if(Array.isArray(e))return e.map(e=>Vs(e));if(zs(e)){let t={};for(let[n,r]of Object.entries(e))t[n]=Vs(r);return t}if(e===null)return null;let t=typeof e;if(t===`string`||t===`number`||t===`boolean`)return e;if(t===`bigint`)return e.toString()}function Hs(e){if(!(e instanceof Error))return{[Ls]:!0,name:`Error`,message:String(e)};let t={};for(let n of Object.keys(e))Rs.has(n)||(t[n]=Vs(e[n]));return{[Ls]:!0,name:e.name,message:e.message,...e.stack===void 0?{}:{stack:e.stack},...e.cause===void 0?{}:{cause:Vs(e.cause)},...Object.keys(t).length>0?{properties:t}:{}}}function Us(e){if(Bs(e))return Ws(e);if(Array.isArray(e))return e.map(e=>Us(e));if(zs(e)){let t={};for(let[n,r]of Object.entries(e))t[n]=Us(r);return t}return e}function Ws(e){let t=Error(e.message);if(t.name=e.name,e.stack!==void 0&&(t.stack=e.stack),`cause`in e&&(t.cause=Us(e.cause)),e.properties)for(let[n,r]of Object.entries(e.properties))t[n]=Us(r);return t}var Gs=(e=>(e.CHANNEL_WS_DISCONNECT=`channelWSDisconnect`,e.CHANNEL_CREATED=`channelCreated`,e.CONFIG_ERROR=`configError`,e.STORY_INDEX_INVALIDATED=`storyIndexInvalidated`,e.STORY_SPECIFIED=`storySpecified`,e.SET_CONFIG=`setConfig`,e.SET_STORIES=`setStories`,e.SET_INDEX=`setIndex`,e.SET_CURRENT_STORY=`setCurrentStory`,e.CURRENT_STORY_WAS_SET=`currentStoryWasSet`,e.FORCE_RE_RENDER=`forceReRender`,e.FORCE_REMOUNT=`forceRemount`,e.PRELOAD_ENTRIES=`preloadStories`,e.STORY_PREPARED=`storyPrepared`,e.DOCS_PREPARED=`docsPrepared`,e.STORY_CHANGED=`storyChanged`,e.STORY_UNCHANGED=`storyUnchanged`,e.STORY_RENDERED=`storyRendered`,e.STORY_FINISHED=`storyFinished`,e.STORY_MISSING=`storyMissing`,e.STORY_ERRORED=`storyErrored`,e.STORY_THREW_EXCEPTION=`storyThrewException`,e.STORY_RENDER_PHASE_CHANGED=`storyRenderPhaseChanged`,e.STORY_HOT_UPDATED=`storyHotUpdated`,e.PLAY_FUNCTION_THREW_EXCEPTION=`playFunctionThrewException`,e.UNHANDLED_ERRORS_WHILE_PLAYING=`unhandledErrorsWhilePlaying`,e.UPDATE_STORY_ARGS=`updateStoryArgs`,e.STORY_ARGS_UPDATED=`storyArgsUpdated`,e.RESET_STORY_ARGS=`resetStoryArgs`,e.SET_FILTER=`setFilter`,e.SET_GLOBALS=`setGlobals`,e.UPDATE_GLOBALS=`updateGlobals`,e.GLOBALS_UPDATED=`globalsUpdated`,e.REGISTER_SUBSCRIPTION=`registerSubscription`,e.PREVIEW_INITIALIZED=`previewInitialized`,e.PREVIEW_KEYDOWN=`previewKeydown`,e.PREVIEW_BUILDER_PROGRESS=`preview_builder_progress`,e.SELECT_STORY=`selectStory`,e.STORIES_COLLAPSE_ALL=`storiesCollapseAll`,e.STORIES_EXPAND_ALL=`storiesExpandAll`,e.DOCS_RENDERED=`docsRendered`,e.SHARED_STATE_CHANGED=`sharedStateChanged`,e.SHARED_STATE_SET=`sharedStateSet`,e.NAVIGATE_URL=`navigateUrl`,e.UPDATE_QUERY_PARAMS=`updateQueryParams`,e.REQUEST_WHATS_NEW_DATA=`requestWhatsNewData`,e.RESULT_WHATS_NEW_DATA=`resultWhatsNewData`,e.SET_WHATS_NEW_CACHE=`setWhatsNewCache`,e.TOGGLE_WHATS_NEW_NOTIFICATIONS=`toggleWhatsNewNotifications`,e.TELEMETRY_ERROR=`telemetryError`,e.FILE_COMPONENT_SEARCH_REQUEST=`fileComponentSearchRequest`,e.FILE_COMPONENT_SEARCH_RESPONSE=`fileComponentSearchResponse`,e.SAVE_STORY_REQUEST=`saveStoryRequest`,e.SAVE_STORY_RESPONSE=`saveStoryResponse`,e.ARGTYPES_INFO_REQUEST=`argtypesInfoRequest`,e.ARGTYPES_INFO_RESPONSE=`argtypesInfoResponse`,e.CREATE_NEW_STORYFILE_REQUEST=`createNewStoryfileRequest`,e.CREATE_NEW_STORYFILE_RESPONSE=`createNewStoryfileResponse`,e.GHOST_STORIES_REQUEST=`ghostStoriesRequest`,e.GHOST_STORIES_RESPONSE=`ghostStoriesResponse`,e.AI_SETUP_ANALYTICS_RESPONSE=`aiSetupAnalyticsResponse`,e.AI_SETUP_ANALYTICS_REQUEST=`aiSetupAnalyticsRequest`,e.OPEN_IN_EDITOR_REQUEST=`openInEditorRequest`,e.OPEN_IN_EDITOR_RESPONSE=`openInEditorResponse`,e.MANAGER_INERT_ATTRIBUTE_CHANGED=`managerInertAttributeChanged`,e.SHARE_ISOLATE_MODE=`shareIsolateMode`,e.AI_PROMPT_NUDGE=`aiPromptNudge`,e.SIDEBAR_FILTER_CHANGED=`sidebarFilterChanged`,e))(Gs||{}),{CHANNEL_WS_DISCONNECT:Ks,CHANNEL_CREATED:qs,CONFIG_ERROR:Js,CREATE_NEW_STORYFILE_REQUEST:Ys,CREATE_NEW_STORYFILE_RESPONSE:Xs,CURRENT_STORY_WAS_SET:Zs,DOCS_PREPARED:Qs,DOCS_RENDERED:$s,FILE_COMPONENT_SEARCH_REQUEST:ec,FILE_COMPONENT_SEARCH_RESPONSE:tc,FORCE_RE_RENDER:nc,FORCE_REMOUNT:rc,GLOBALS_UPDATED:ic,NAVIGATE_URL:ac,PLAY_FUNCTION_THREW_EXCEPTION:oc,UNHANDLED_ERRORS_WHILE_PLAYING:sc,PRELOAD_ENTRIES:cc,PREVIEW_INITIALIZED:lc,PREVIEW_BUILDER_PROGRESS:uc,PREVIEW_KEYDOWN:dc,REGISTER_SUBSCRIPTION:fc,RESET_STORY_ARGS:pc,SELECT_STORY:mc,SET_CONFIG:hc,SET_CURRENT_STORY:gc,SET_FILTER:_c,SET_GLOBALS:vc,SET_INDEX:yc,SET_STORIES:bc,SHARED_STATE_CHANGED:xc,SHARED_STATE_SET:Sc,STORIES_COLLAPSE_ALL:Cc,STORIES_EXPAND_ALL:wc,STORY_ARGS_UPDATED:Tc,STORY_CHANGED:Ec,STORY_ERRORED:Dc,STORY_INDEX_INVALIDATED:Oc,STORY_MISSING:kc,STORY_PREPARED:Ac,STORY_RENDER_PHASE_CHANGED:jc,STORY_RENDERED:Mc,STORY_FINISHED:Nc,STORY_SPECIFIED:Pc,STORY_THREW_EXCEPTION:Fc,STORY_UNCHANGED:Ic,STORY_HOT_UPDATED:Lc,UPDATE_GLOBALS:Rc,UPDATE_QUERY_PARAMS:zc,UPDATE_STORY_ARGS:Bc,REQUEST_WHATS_NEW_DATA:Vc,RESULT_WHATS_NEW_DATA:Hc,SET_WHATS_NEW_CACHE:Uc,TOGGLE_WHATS_NEW_NOTIFICATIONS:Wc,TELEMETRY_ERROR:Gc,SAVE_STORY_REQUEST:Kc,SAVE_STORY_RESPONSE:qc,ARGTYPES_INFO_REQUEST:Jc,ARGTYPES_INFO_RESPONSE:Yc,GHOST_STORIES_REQUEST:Xc,GHOST_STORIES_RESPONSE:Zc,AI_SETUP_ANALYTICS_RESPONSE:Qc,AI_SETUP_ANALYTICS_REQUEST:$c,OPEN_IN_EDITOR_REQUEST:el,OPEN_IN_EDITOR_RESPONSE:tl,MANAGER_INERT_ATTRIBUTE_CHANGED:nl,SHARE_ISOLATE_MODE:rl,AI_PROMPT_NUDGE:il,SIDEBAR_FILTER_CHANGED:al}=Gs,ol=`storybook/measure-addon`;`${ol}`,`${ol}`,`${ol}`,`${ol}`;var sl=vo(e=>typeof e==`object`&&!!e&&!Array.isArray(e)),cl=xo({name:wo(),message:wo()}),ll=Co(wo(),_o(wo())),ul={name:wo(),path:wo(),description:So(wo()),summary:So(wo()),jsDocTags:ll,argTypes:So(sl),error:So(cl)},dl=yo({...ul,import:So(wo())});So(yo({id:wo(),...ul,subcomponents:So(Co(wo(),dl))}));var fl=`storybook/highlight`,pl=`${fl}/add`,ml=`${fl}/remove`,hl=`${fl}/reset`,gl=`${fl}/scroll-into-view`,_l=2147483647,vl=`storybook/actions`;`${vl}`;var yl=`${vl}/action-event`;`${vl}`;var bl={depth:10,clearOnStoryChange:!0,limit:50},xl=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:xl(n,t)},Sl=e=>!!(typeof e==`object`&&e&&xl(e,e=>/^Synthetic(?:Base)?Event$/.test(e.constructor.name))&&typeof e.persist==`function`),Cl=e=>{if(Sl(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,`view`),r=n?.value;return typeof r==`object`&&r?.constructor.name===`Window`&&Object.defineProperty(t,"view",{...n,value:Object.create(r.constructor.prototype)}),t}return e};function wl(e,t={}){let n={...bl,...t},r=function(...r){if(t.implicit){let t=(`__STORYBOOK_PREVIEW__`in J?J.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(e=>e.phase===`playing`||e.phase===`rendering`);if(t){let n=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,r=new Fr({phase:t.phase,name:e,deprecated:n});if(n)console.warn(r);else throw r}}let i=eg.getChannel(),a=Date.now().toString(36)+Math.random().toString(36).substring(2),o=r.map(Cl),s={id:a,count:0,data:{name:e,args:r.length>1?o:o[0]},options:{...n,maxDepth:5+(n.depth||3)}};i.emit(yl,s)};return r.isAction=!0,r.implicit=t.implicit,r}var Tl=()=>void 0,El=e=>e??Tl,Dl=()=>!1,Ol=Tl,kl={CALL:`storybook/instrumenter/call`,SYNC:`storybook/instrumenter/sync`,START:`storybook/instrumenter/start`,BACK:`storybook/instrumenter/back`,GOTO:`storybook/instrumenter/goto`,NEXT:`storybook/instrumenter/next`,END:`storybook/instrumenter/end`},Al=Object.entries({reset:[0,0],bold:[1,22,`\x1B[22m\x1B[1m`],dim:[2,22,`\x1B[22m\x1B[2m`],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]});function jl(e){return String(e)}jl.open=``,jl.close=``,Al.reduce((e,[t])=>(e[t]=jl,e),{isColorSupported:!1});function Ml(e=!1){let t=typeof process<`u`?process:void 0,n=t?.env||{},r=t?.argv||[];return!(`NO_COLOR`in n||r.includes(`--no-color`))&&(`FORCE_COLOR`in n||r.includes(`--color`)||t?.platform===`win32`||e&&n.TERM!==`dumb`||`CI`in n)||typeof window<`u`&&!!window.chrome}function Nl(e=!1){let t=Ml(e),n=(e,t,n,r)=>{let i=``,a=0;do i+=e.substring(a,r)+n,a=r+t.length,r=e.indexOf(t,a);while(~r);return i+e.substring(a)},r=(e,t,r=e)=>{let i=i=>{let a=String(i),o=a.indexOf(t,e.length);return~o?e+n(a,t,r,o)+t:e+a+t};return i.open=e,i.close=t,i},i={isColorSupported:t},a=e=>`\x1B[${e}m`;for(let[e,n]of Al)i[e]=t?r(a(n[0]),a(n[1]),n[2]):jl;return i}var Pl=Nl();function Fl(e,t){return t.forEach(function(t){t&&typeof t!=`string`&&!Array.isArray(t)&&Object.keys(t).forEach(function(n){if(n!=="default"&&!(n in e)){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})}),Object.freeze(e)}function Il(e,t){let n=Object.keys(e),r=t===null?n:n.sort(t);if(Object.getOwnPropertySymbols)for(let t of Object.getOwnPropertySymbols(e))Object.getOwnPropertyDescriptor(e,t).enumerable&&r.push(t);return r}function Ll(e,t,n,r,i,a,o=`: `){let s=``,c=0,l=e.next();if(!l.done){s+=t.spacingOuter;let u=n+t.indent;for(;!l.done;){if(s+=u,c++===t.maxWidth){s+=`…`;break}let n=a(l.value[0],t,u,r,i),d=a(l.value[1],t,u,r,i);s+=n+o+d,l=e.next(),l.done?t.min||(s+=`,`):s+=`,${t.spacingInner}`}s+=t.spacingOuter+n}return s}function Rl(e,t,n,r,i,a){let o=``,s=0,c=e.next();if(!c.done){o+=t.spacingOuter;let l=n+t.indent;for(;!c.done;){if(o+=l,s++===t.maxWidth){o+=`…`;break}o+=a(c.value,t,l,r,i),c=e.next(),c.done?t.min||(o+=`,`):o+=`,${t.spacingInner}`}o+=t.spacingOuter+n}return o}function zl(e,t,n,r,i,a){let o=``;e=e instanceof ArrayBuffer?new DataView(e):e;let s=e=>e instanceof DataView,c=s(e)?e.byteLength:e.length;if(c>0){o+=t.spacingOuter;let l=n+t.indent;for(let n=0;n<c;n++){if(o+=l,n===t.maxWidth){o+=`…`;break}(s(e)||n in e)&&(o+=a(s(e)?e.getInt8(n):e[n],t,l,r,i)),n<c-1?o+=`,${t.spacingInner}`:t.min||(o+=`,`)}o+=t.spacingOuter+n}return o}function Bl(e,t,n,r,i,a){let o=``,s=Il(e,t.compareKeys);if(s.length>0){o+=t.spacingOuter;let c=n+t.indent;for(let n=0;n<s.length;n++){let l=s[n],u=a(l,t,c,r,i),d=a(e[l],t,c,r,i);o+=`${c+u}: ${d}`,n<s.length-1?o+=`,${t.spacingInner}`:t.min||(o+=`,`)}o+=t.spacingOuter+n}return o}var Vl=typeof Symbol==`function`&&Symbol.for?Symbol.for(`jest.asymmetricMatcher`):1267621,Hl=` `,Ul={serialize:(e,t,n,r,i,a)=>{let o=e.toString();if(o===`ArrayContaining`||o===`ArrayNotContaining`)return++r>t.maxDepth?`[${o}]`:`${o+Hl}[${zl(e.sample,t,n,r,i,a)}]`;if(o===`ObjectContaining`||o===`ObjectNotContaining`)return++r>t.maxDepth?`[${o}]`:`${o+Hl}{${Bl(e.sample,t,n,r,i,a)}}`;if(o===`StringMatching`||o===`StringNotMatching`||o===`StringContaining`||o===`StringNotContaining`)return o+Hl+a(e.sample,t,n,r,i);if(typeof e.toAsymmetricMatcher!=`function`)throw TypeError(`Asymmetric matcher ${e.constructor.name} does not implement toAsymmetricMatcher()`);return e.toAsymmetricMatcher()},test:e=>e&&e.$$typeof===Vl},Wl=` `,Gl=new Set([`DOMStringMap`,`NamedNodeMap`]),Kl=/^(?:HTML\w*Collection|NodeList)$/;function ql(e){return Gl.has(e)||Kl.test(e)}var Jl=e=>e&&e.constructor&&!!e.constructor.name&&ql(e.constructor.name);function Yl(e){return e.constructor.name===`NamedNodeMap`}var Xl={serialize:(e,t,n,r,i,a)=>{let o=e.constructor.name;return++r>t.maxDepth?`[${o}]`:(t.min?``:o+Wl)+(Gl.has(o)?`{${Bl(Yl(e)?[...e].reduce((e,t)=>(e[t.name]=t.value,e),{}):{...e},t,n,r,i,a)}}`:`[${zl([...e],t,n,r,i,a)}]`)},test:Jl};function Zl(e){return e.replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function Ql(e,t,n,r,i,a,o){let s=r+n.indent,c=n.colors;return e.map(e=>{let l=t[e],u=o(l,n,s,i,a);return typeof l!=`string`&&(u.includes(`
`)&&(u=n.spacingOuter+s+u+n.spacingOuter+r),u=`{${u}}`),`${n.spacingInner+r+c.prop.open+e+c.prop.close}=${c.value.open}${u}${c.value.close}`}).join(``)}function $l(e,t,n,r,i,a){return e.map(e=>t.spacingOuter+n+(typeof e==`string`?eu(e,t):a(e,t,n,r,i))).join(``)}function eu(e,t){let n=t.colors.content;return n.open+Zl(e)+n.close}function tu(e,t){let n=t.colors.comment;return`${n.open}<!--${Zl(e)}-->${n.close}`}function nu(e,t,n,r,i){let a=r.colors.tag;return`${a.open}<${e}${t&&a.close+t+r.spacingOuter+i+a.open}${n?`>${a.close}${n}${r.spacingOuter}${i}${a.open}</${e}`:`${t&&!r.min?``:` `}/`}>${a.close}`}function ru(e,t){let n=t.colors.tag;return`${n.open}<${e}${n.close} \u2026${n.open} />${n.close}`}var iu=1,au=3,ou=8,su=11,cu=/^(?:(?:HTML|SVG)\w*)?Element$/;function lu(e){try{return typeof e.hasAttribute==`function`&&e.hasAttribute(`is`)}catch{return!1}}function uu(e){let t=e.constructor.name,{nodeType:n,tagName:r}=e,i=typeof r==`string`&&r.includes(`-`)||lu(e);return n===iu&&(cu.test(t)||i)||n===au&&t===`Text`||n===ou&&t===`Comment`||n===su&&t===`DocumentFragment`}var du=e=>{var t;return(e==null||(t=e.constructor)==null?void 0:t.name)&&uu(e)};function fu(e){return e.nodeType===au}function pu(e){return e.nodeType===ou}function mu(e){return e.nodeType===su}var hu={serialize:(e,t,n,r,i,a)=>{if(fu(e))return eu(e.data,t);if(pu(e))return tu(e.data,t);let o=mu(e)?`DocumentFragment`:e.tagName.toLowerCase();return++r>t.maxDepth?ru(o,t):nu(o,Ql(mu(e)?[]:Array.from(e.attributes,e=>e.name).sort(),mu(e)?{}:[...e.attributes].reduce((e,t)=>(e[t.name]=t.value,e),{}),t,n+t.indent,r,i,a),$l(Array.prototype.slice.call(e.childNodes||e.children),t,n+t.indent,r,i,a),t,n)},test:du},gu=`@@__IMMUTABLE_ITERABLE__@@`,_u=`@@__IMMUTABLE_LIST__@@`,vu=`@@__IMMUTABLE_KEYED__@@`,yu=`@@__IMMUTABLE_MAP__@@`,bu=`@@__IMMUTABLE_ORDERED__@@`,xu=`@@__IMMUTABLE_RECORD__@@`,Su=`@@__IMMUTABLE_SEQ__@@`,Cu=`@@__IMMUTABLE_SET__@@`,wu=`@@__IMMUTABLE_STACK__@@`,Tu=e=>`Immutable.${e}`,Eu=e=>`[${e}]`,Du=` `,Ou=`…`;function ku(e,t,n,r,i,a,o){return++r>t.maxDepth?Eu(Tu(o)):`${Tu(o)+Du}{${Ll(e.entries(),t,n,r,i,a)}}`}function Au(e){let t=0;return{next(){if(t<e._keys.length){let n=e._keys[t++];return{done:!1,value:[n,e.get(n)]}}return{done:!0,value:void 0}}}}function ju(e,t,n,r,i,a){let o=Tu(e._name||`Record`);return++r>t.maxDepth?Eu(o):`${o+Du}{${Ll(Au(e),t,n,r,i,a)}}`}function Mu(e,t,n,r,i,a){let o=Tu(`Seq`);return++r>t.maxDepth?Eu(o):e[vu]?`${o+Du}{${e._iter||e._object?Ll(e.entries(),t,n,r,i,a):Ou}}`:`${o+Du}[${e._iter||e._array||e._collection||e._iterable?Rl(e.values(),t,n,r,i,a):Ou}]`}function Nu(e,t,n,r,i,a,o){return++r>t.maxDepth?Eu(Tu(o)):`${Tu(o)+Du}[${Rl(e.values(),t,n,r,i,a)}]`}var Pu={serialize:(e,t,n,r,i,a)=>e[yu]?ku(e,t,n,r,i,a,e[bu]?`OrderedMap`:`Map`):e[_u]?Nu(e,t,n,r,i,a,`List`):e[Cu]?Nu(e,t,n,r,i,a,e[bu]?`OrderedSet`:`Set`):e[wu]?Nu(e,t,n,r,i,a,`Stack`):e[Su]?Mu(e,t,n,r,i,a):ju(e,t,n,r,i,a),test:e=>e&&(e[gu]===!0||e[xu]===!0)};function Fu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}var Iu={exports:{}},Lu={},Ru;function zu(){if(Ru)return Lu;Ru=1;var e=Symbol.for(`react.transitional.element`),t=Symbol.for(`react.portal`),n=Symbol.for(`react.fragment`),r=Symbol.for(`react.strict_mode`),i=Symbol.for(`react.profiler`),a=Symbol.for(`react.consumer`),o=Symbol.for(`react.context`),s=Symbol.for(`react.forward_ref`),c=Symbol.for(`react.suspense`),l=Symbol.for(`react.suspense_list`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.view_transition`),p=Symbol.for(`react.client.reference`);function m(p){if(typeof p==`object`&&p){var m=p.$$typeof;switch(m){case e:switch(p=p.type,p){case n:case i:case r:case c:case l:case f:return p;default:switch(p&&=p.$$typeof,p){case o:case s:case d:case u:return p;case a:return p;default:return m}}case t:return m}}}return Lu.ContextConsumer=a,Lu.ContextProvider=o,Lu.Element=e,Lu.ForwardRef=s,Lu.Fragment=n,Lu.Lazy=d,Lu.Memo=u,Lu.Portal=t,Lu.Profiler=i,Lu.StrictMode=r,Lu.Suspense=c,Lu.SuspenseList=l,Lu.isContextConsumer=function(e){return m(e)===a},Lu.isContextProvider=function(e){return m(e)===o},Lu.isElement=function(t){return typeof t==`object`&&!!t&&t.$$typeof===e},Lu.isForwardRef=function(e){return m(e)===s},Lu.isFragment=function(e){return m(e)===n},Lu.isLazy=function(e){return m(e)===d},Lu.isMemo=function(e){return m(e)===u},Lu.isPortal=function(e){return m(e)===t},Lu.isProfiler=function(e){return m(e)===i},Lu.isStrictMode=function(e){return m(e)===r},Lu.isSuspense=function(e){return m(e)===c},Lu.isSuspenseList=function(e){return m(e)===l},Lu.isValidElementType=function(e){return typeof e==`string`||typeof e==`function`||e===n||e===i||e===r||e===c||e===l||typeof e==`object`&&!!e&&(e.$$typeof===d||e.$$typeof===u||e.$$typeof===o||e.$$typeof===a||e.$$typeof===s||e.$$typeof===p||e.getModuleId!==void 0)},Lu.typeOf=m,Lu}var Bu;function Vu(){return Bu||(Bu=1,Iu.exports=zu()),Iu.exports}var Hu=Vu(),Uu=Fl({__proto__:null,default:Fu(Hu)},[Hu]),Wu={exports:{}},X={},Gu;function Ku(){if(Gu)return X;Gu=1;var e=Symbol.for(`react.element`),t=Symbol.for(`react.portal`),n=Symbol.for(`react.fragment`),r=Symbol.for(`react.strict_mode`),i=Symbol.for(`react.profiler`),a=Symbol.for(`react.provider`),o=Symbol.for(`react.context`),s=Symbol.for(`react.server_context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.suspense_list`),d=Symbol.for(`react.memo`),f=Symbol.for(`react.lazy`),p=Symbol.for(`react.offscreen`),m=Symbol.for(`react.module.reference`);function h(p){if(typeof p==`object`&&p){var m=p.$$typeof;switch(m){case e:switch(p=p.type,p){case n:case i:case r:case l:case u:return p;default:switch(p&&=p.$$typeof,p){case s:case o:case c:case f:case d:case a:return p;default:return m}}case t:return m}}}return X.ContextConsumer=o,X.ContextProvider=a,X.Element=e,X.ForwardRef=c,X.Fragment=n,X.Lazy=f,X.Memo=d,X.Portal=t,X.Profiler=i,X.StrictMode=r,X.Suspense=l,X.SuspenseList=u,X.isAsyncMode=function(){return!1},X.isConcurrentMode=function(){return!1},X.isContextConsumer=function(e){return h(e)===o},X.isContextProvider=function(e){return h(e)===a},X.isElement=function(t){return typeof t==`object`&&!!t&&t.$$typeof===e},X.isForwardRef=function(e){return h(e)===c},X.isFragment=function(e){return h(e)===n},X.isLazy=function(e){return h(e)===f},X.isMemo=function(e){return h(e)===d},X.isPortal=function(e){return h(e)===t},X.isProfiler=function(e){return h(e)===i},X.isStrictMode=function(e){return h(e)===r},X.isSuspense=function(e){return h(e)===l},X.isSuspenseList=function(e){return h(e)===u},X.isValidElementType=function(e){return typeof e==`string`||typeof e==`function`||e===n||e===i||e===r||e===l||e===u||e===p||typeof e==`object`&&!!e&&(e.$$typeof===f||e.$$typeof===d||e.$$typeof===a||e.$$typeof===o||e.$$typeof===c||e.$$typeof===m||e.getModuleId!==void 0)},X.typeOf=h,X}var qu;function Ju(){return qu||(qu=1,Wu.exports=Ku()),Wu.exports}var Yu=Ju(),Xu=Fl({__proto__:null,default:Fu(Yu)},[Yu]),Zu=Object.fromEntries([`isAsyncMode`,`isConcurrentMode`,`isContextConsumer`,`isContextProvider`,`isElement`,`isForwardRef`,`isFragment`,`isLazy`,`isMemo`,`isPortal`,`isProfiler`,`isStrictMode`,`isSuspense`,`isSuspenseList`,`isValidElementType`].map(e=>[e,t=>Xu[e](t)||Uu[e](t)]));function Qu(e,t=[]){if(Array.isArray(e))for(let n of e)Qu(n,t);else e!=null&&e!==!1&&e!==``&&t.push(e);return t}function $u(e){let t=e.type;if(typeof t==`string`)return t;if(typeof t==`function`)return t.displayName||t.name||`Unknown`;if(Zu.isFragment(e))return`React.Fragment`;if(Zu.isSuspense(e))return`React.Suspense`;if(typeof t==`object`&&t){if(Zu.isContextProvider(e))return`Context.Provider`;if(Zu.isContextConsumer(e))return`Context.Consumer`;if(Zu.isForwardRef(e)){if(t.displayName)return t.displayName;let e=t.render.displayName||t.render.name||``;return e===``?`ForwardRef`:`ForwardRef(${e})`}if(Zu.isMemo(e)){let e=t.displayName||t.type.displayName||t.type.name||``;return e===``?`Memo`:`Memo(${e})`}}return`UNDEFINED`}function ed(e){let{props:t}=e;return Object.keys(t).filter(e=>e!==`children`&&t[e]!==void 0).sort()}var td={serialize:(e,t,n,r,i,a)=>++r>t.maxDepth?ru($u(e),t):nu($u(e),Ql(ed(e),e.props,t,n+t.indent,r,i,a),$l(Qu(e.props.children),t,n+t.indent,r,i,a),t,n),test:e=>e!=null&&Zu.isElement(e)},nd=typeof Symbol==`function`&&Symbol.for?Symbol.for(`react.test.json`):245830487;function rd(e){let{props:t}=e;return t?Object.keys(t).filter(e=>t[e]!==void 0).sort():[]}var id={serialize:(e,t,n,r,i,a)=>++r>t.maxDepth?ru(e.type,t):nu(e.type,e.props?Ql(rd(e),e.props,t,n+t.indent,r,i,a):``,e.children?$l(e.children,t,n+t.indent,r,i,a):``,t,n),test:e=>e&&e.$$typeof===nd},ad=Object.prototype.toString,od=Date.prototype.toISOString,sd=Error.prototype.toString,cd=RegExp.prototype.toString;function ld(e){return typeof e.constructor==`function`&&e.constructor.name||`Object`}function ud(e){return typeof window<`u`&&e===window}var dd=/^Symbol\((.*)\)(.*)$/,fd=/\n/g,pd=class extends Error{constructor(e,t){super(e),this.stack=t,this.name=this.constructor.name}};function md(e){return e===`[object Array]`||e===`[object ArrayBuffer]`||e===`[object DataView]`||e===`[object Float32Array]`||e===`[object Float64Array]`||e===`[object Int8Array]`||e===`[object Int16Array]`||e===`[object Int32Array]`||e===`[object Uint8Array]`||e===`[object Uint8ClampedArray]`||e===`[object Uint16Array]`||e===`[object Uint32Array]`}function hd(e){return Object.is(e,-0)?`-0`:String(e)}function gd(e){return`${e}n`}function _d(e,t){return t?`[Function ${e.name||`anonymous`}]`:`[Function]`}function vd(e){return String(e).replace(dd,`Symbol($1)`)}function yd(e){return`[${sd.call(e)}]`}function bd(e,t,n,r){if(e===!0||e===!1)return`${e}`;if(e===void 0)return`undefined`;if(e===null)return`null`;let i=typeof e;if(i===`number`)return hd(e);if(i===`bigint`)return gd(e);if(i===`string`)return r?`"${e.replaceAll(/"|\\/g,`\\$&`)}"`:`"${e}"`;if(i===`function`)return _d(e,t);if(i===`symbol`)return vd(e);let a=ad.call(e);return a===`[object WeakMap]`?`WeakMap {}`:a===`[object WeakSet]`?`WeakSet {}`:a===`[object Function]`||a===`[object GeneratorFunction]`?_d(e,t):a===`[object Symbol]`?vd(e):a===`[object Date]`?Number.isNaN(+e)?`Date { NaN }`:od.call(e):a===`[object Error]`?yd(e):a===`[object RegExp]`?n?cd.call(e).replaceAll(/[$()*+.?[\\\]^{|}]/g,`\\$&`):cd.call(e):e instanceof Error?yd(e):null}function xd(e,t,n,r,i,a){if(i.includes(e))return`[Circular]`;i=[...i],i.push(e);let o=++r>t.maxDepth,s=t.min;if(t.callToJSON&&!o&&e.toJSON&&typeof e.toJSON==`function`&&!a)return Ed(e.toJSON(),t,n,r,i,!0);let c=ad.call(e);return c===`[object Arguments]`?o?`[Arguments]`:`${s?``:`Arguments `}[${zl(e,t,n,r,i,Ed)}]`:md(c)?o?`[${e.constructor.name}]`:`${s||!t.printBasicPrototype&&e.constructor.name===`Array`?``:`${e.constructor.name} `}[${zl(e,t,n,r,i,Ed)}]`:c===`[object Map]`?o?`[Map]`:`Map {${Ll(e.entries(),t,n,r,i,Ed,` => `)}}`:c===`[object Set]`?o?`[Set]`:`Set {${Rl(e.values(),t,n,r,i,Ed)}}`:o||ud(e)?`[${ld(e)}]`:`${s||!t.printBasicPrototype&&ld(e)===`Object`?``:`${ld(e)} `}{${Bl(e,t,n,r,i,Ed)}}`}var Sd={test:e=>e&&e instanceof Error,serialize(e,t,n,r,i,a){if(i.includes(e))return`[Circular]`;i=[...i,e];let o=++r>t.maxDepth,{message:s,cause:c,...l}=e,u={message:s,...typeof c<`u`?{cause:c}:{},...e instanceof AggregateError?{errors:e.errors}:{},...l},d=e.name===`Error`?ld(e):e.name;return o?`[${d}]`:`${d} {${Ll(Object.entries(u).values(),t,n,r,i,a)}}`}};function Cd(e){return e.serialize!=null}function wd(e,t,n,r,i,a){let o;try{o=Cd(e)?e.serialize(t,n,r,i,a,Ed):e.print(t,e=>Ed(e,n,r,i,a),e=>{let t=r+n.indent;return t+e.replaceAll(fd,`
${t}`)},{edgeSpacing:n.spacingOuter,min:n.min,spacing:n.spacingInner},n.colors)}catch(e){throw new pd(e.message,e.stack)}if(typeof o!=`string`)throw TypeError(`pretty-format: Plugin must return type "string" but instead returned "${typeof o}".`);return o}function Td(e,t){for(let n of e)try{if(n.test(t))return n}catch(e){throw new pd(e.message,e.stack)}return null}function Ed(e,t,n,r,i,a){let o=Td(t.plugins,e);if(o!==null)return wd(o,e,t,n,r,i);let s=bd(e,t.printFunctionName,t.escapeRegex,t.escapeString);return s===null?xd(e,t,n,r,i,a):s}var Dd={comment:`gray`,content:`reset`,prop:`yellow`,tag:`cyan`,value:`green`},Od=Object.keys(Dd),kd={callToJSON:!0,compareKeys:void 0,escapeRegex:!1,escapeString:!0,highlight:!1,indent:2,maxDepth:1/0,maxWidth:1/0,min:!1,plugins:[],printBasicPrototype:!0,printFunctionName:!0,theme:Dd};function Ad(e){for(let t of Object.keys(e))if(!Object.prototype.hasOwnProperty.call(kd,t))throw Error(`pretty-format: Unknown option "${t}".`);if(e.min&&e.indent!==void 0&&e.indent!==0)throw Error(`pretty-format: Options "min" and "indent" cannot be used together.`)}function jd(){return Od.reduce((e,t)=>{let n=Dd[t],r=n&&Pl[n];if(r&&typeof r.close==`string`&&typeof r.open==`string`)e[t]=r;else throw Error(`pretty-format: Option "theme" has a key "${t}" whose value "${n}" is undefined in ansi-styles.`);return e},Object.create(null))}function Md(){return Od.reduce((e,t)=>(e[t]={close:``,open:``},e),Object.create(null))}function Nd(e){return e?.printFunctionName??kd.printFunctionName}function Pd(e){return e?.escapeRegex??kd.escapeRegex}function Fd(e){return e?.escapeString??kd.escapeString}function Id(e){return{callToJSON:e?.callToJSON??kd.callToJSON,colors:e?.highlight?jd():Md(),compareKeys:typeof e?.compareKeys==`function`||e?.compareKeys===null?e.compareKeys:kd.compareKeys,escapeRegex:Pd(e),escapeString:Fd(e),indent:e?.min?``:Ld(e?.indent??kd.indent),maxDepth:e?.maxDepth??kd.maxDepth,maxWidth:e?.maxWidth??kd.maxWidth,min:e?.min??kd.min,plugins:e?.plugins??kd.plugins,printBasicPrototype:e?.printBasicPrototype??!0,printFunctionName:Nd(e),spacingInner:e?.min?` `:`
`,spacingOuter:e?.min?``:`
`}}function Ld(e){return Array.from({length:e+1}).join(` `)}function Rd(e,t){if(t&&(Ad(t),t.plugins)){let n=Td(t.plugins,e);if(n!==null)return wd(n,e,Id(t),``,0,[])}let n=bd(e,Nd(t),Pd(t),Fd(t));return n===null?xd(e,Id(t),``,0,[]):n}var zd={AsymmetricMatcher:Ul,DOMCollection:Xl,DOMElement:hu,Immutable:Pu,ReactElement:td,ReactTestComponent:id,Error:Sd},Bd={bold:[`1`,`22`],dim:[`2`,`22`],italic:[`3`,`23`],underline:[`4`,`24`],inverse:[`7`,`27`],hidden:[`8`,`28`],strike:[`9`,`29`],black:[`30`,`39`],red:[`31`,`39`],green:[`32`,`39`],yellow:[`33`,`39`],blue:[`34`,`39`],magenta:[`35`,`39`],cyan:[`36`,`39`],white:[`37`,`39`],brightblack:[`30;1`,`39`],brightred:[`31;1`,`39`],brightgreen:[`32;1`,`39`],brightyellow:[`33;1`,`39`],brightblue:[`34;1`,`39`],brightmagenta:[`35;1`,`39`],brightcyan:[`36;1`,`39`],brightwhite:[`37;1`,`39`],grey:[`90`,`39`]},Vd={special:`cyan`,number:`yellow`,bigint:`yellow`,boolean:`yellow`,undefined:`grey`,null:`bold`,string:`green`,symbol:`green`,date:`magenta`,regexp:`red`},Hd=`…`;function Ud(e,t){let n=Bd[Vd[t]]||Bd[t]||``;return n?`\x1B[${n[0]}m${String(e)}\x1B[${n[1]}m`:String(e)}function Wd({showHidden:e=!1,depth:t=2,colors:n=!1,customInspect:r=!0,showProxy:i=!1,maxArrayLength:a=1/0,breakLength:o=1/0,seen:s=[],truncate:c=1/0,stylize:l=String}={},u){let d={showHidden:!!e,depth:Number(t),colors:!!n,customInspect:!!r,showProxy:!!i,maxArrayLength:Number(a),breakLength:Number(o),truncate:Number(c),seen:s,inspect:u,stylize:l};return d.colors&&(d.stylize=Ud),d}function Gd(e){return e>=`\ud800`&&e<=`\udbff`}function Kd(e,t,n=Hd){e=String(e);let r=n.length,i=e.length;if(r>t&&i>r)return n;if(i>t&&i>r){let i=t-r;return i>0&&Gd(e[i-1])&&--i,`${e.slice(0,i)}${n}`}return e}function qd(e,t,n,r=`, `){n||=t.inspect;let i=e.length;if(i===0)return``;let a=t.truncate,o=``,s=``,c=``;for(let l=0;l<i;l+=1){let i=l+1===e.length,u=l+2===e.length;c=`${Hd}(${e.length-l})`;let d=e[l];t.truncate=a-o.length-(i?0:r.length);let f=s||n(d,t)+(i?``:r),p=o.length+f.length,m=p+c.length;if(i&&p>a&&o.length+c.length<=a||!i&&!u&&m>a||(s=i?``:n(e[l+1],t)+(u?``:r),!i&&u&&m>a&&p+s.length>a))break;if(o+=f,!i&&!u&&p+s.length>=a){c=`${Hd}(${e.length-l-1})`;break}c=``}return`${o}${c}`}function Jd(e){return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)?e:JSON.stringify(e).replace(/'/g,`\\'`).replace(/\\"/g,`"`).replace(/(^"|"$)/g,`'`)}function Yd([e,t],n){return n.truncate-=2,typeof e==`string`?e=Jd(e):typeof e!=`number`&&(e=`[${n.inspect(e,n)}]`),n.truncate-=e.length,t=n.inspect(t,n),`${e}: ${t}`}function Xd(e,t){let n=Object.keys(e).slice(e.length);if(!e.length&&!n.length)return`[]`;t.truncate-=4;let r=qd(e,t);t.truncate-=r.length;let i=``;return n.length&&(i=qd(n.map(t=>[t,e[t]]),t,Yd)),`[ ${r}${i?`, ${i}`:``} ]`}var Zd=e=>typeof Buffer==`function`&&e instanceof Buffer?`Buffer`:e[Symbol.toStringTag]?e[Symbol.toStringTag]:e.constructor.name;function Qd(e,t){let n=Zd(e);t.truncate-=n.length+4;let r=Object.keys(e).slice(e.length);if(!e.length&&!r.length)return`${n}[]`;let i=``;for(let n=0;n<e.length;n++){let r=`${t.stylize(Kd(e[n],t.truncate),`number`)}${n===e.length-1?``:`, `}`;if(t.truncate-=r.length,e[n]!==e.length&&t.truncate<=3){i+=`${Hd}(${e.length-e[n]+1})`;break}i+=r}let a=``;return r.length&&(a=qd(r.map(t=>[t,e[t]]),t,Yd)),`${n}[ ${i}${a?`, ${a}`:``} ]`}function $d(e,t){let n=e.toJSON();if(n===null)return`Invalid Date`;let r=n.split(`T`),i=r[0];return t.stylize(`${i}T${Kd(r[1],t.truncate-i.length-1)}`,`date`)}function ef(e,t){let n=e[Symbol.toStringTag]||`Function`,r=e.name;return r?t.stylize(`[${n} ${Kd(r,t.truncate-11)}]`,`special`):t.stylize(`[${n}]`,`special`)}function tf([e,t],n){return n.truncate-=4,e=n.inspect(e,n),n.truncate-=e.length,t=n.inspect(t,n),`${e} => ${t}`}function nf(e){let t=[];return e.forEach((e,n)=>{t.push([n,e])}),t}function rf(e,t){return e.size===0?`Map{}`:(t.truncate-=7,`Map{ ${qd(nf(e),t,tf)} }`)}var af=Number.isNaN||(e=>e!==e);function of(e,t){return af(e)?t.stylize(`NaN`,`number`):e===1/0?t.stylize(`Infinity`,`number`):e===-1/0?t.stylize(`-Infinity`,`number`):e===0?t.stylize(1/e==1/0?`+0`:`-0`,`number`):t.stylize(Kd(String(e),t.truncate),`number`)}function sf(e,t){let n=Kd(e.toString(),t.truncate-1);return n!==Hd&&(n+=`n`),t.stylize(n,`bigint`)}function cf(e,t){let n=e.toString().split(`/`)[2],r=t.truncate-(2+n.length),i=e.source;return t.stylize(`/${Kd(i,r)}/${n}`,`regexp`)}function lf(e){let t=[];return e.forEach(e=>{t.push(e)}),t}function uf(e,t){return e.size===0?`Set{}`:(t.truncate-=7,`Set{ ${qd(lf(e),t)} }`)}var df=RegExp(`['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]`,`g`),ff={"\b":`\\b`,"	":`\\t`,"\n":`\\n`,"\f":`\\f`,"\r":`\\r`,"'":`\\'`,"\\":`\\\\`},pf=16,mf=4;function hf(e){return ff[e]||`\\u${`0000${e.charCodeAt(0).toString(pf)}`.slice(-mf)}`}function gf(e,t){return df.test(e)&&(e=e.replace(df,hf)),t.stylize(`'${Kd(e,t.truncate-2)}'`,`string`)}function _f(e){return`description`in Symbol.prototype?e.description?`Symbol(${e.description})`:`Symbol()`:e.toString()}var vf=()=>`Promise{…}`;try{let{getPromiseDetails:e,kPending:t,kRejected:n}=process.binding(`util`);Array.isArray(e(Promise.resolve()))&&(vf=(r,i)=>{let[a,o]=e(r);return a===t?`Promise{<pending>}`:`Promise${a===n?`!`:``}{${i.inspect(o,i)}}`})}catch{}var yf=vf;function bf(e,t){let n=Object.getOwnPropertyNames(e),r=Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[];if(n.length===0&&r.length===0)return`{}`;if(t.truncate-=4,t.seen=t.seen||[],t.seen.includes(e))return`[Circular]`;t.seen.push(e);let i=qd(n.map(t=>[t,e[t]]),t,Yd),a=qd(r.map(t=>[t,e[t]]),t,Yd);t.seen.pop();let o=``;return i&&a&&(o=`, `),`{ ${i}${o}${a} }`}var xf=typeof Symbol<`u`&&Symbol.toStringTag?Symbol.toStringTag:!1;function Sf(e,t){let n=``;return xf&&xf in e&&(n=e[xf]),n||=e.constructor.name,(!n||n===`_class`)&&(n=`<Anonymous Class>`),t.truncate-=n.length,`${n}${bf(e,t)}`}function Cf(e,t){return e.length===0?`Arguments[]`:(t.truncate-=13,`Arguments[ ${qd(e,t)} ]`)}var wf=[`stack`,`line`,`column`,`name`,`message`,`fileName`,`lineNumber`,`columnNumber`,`number`,`description`,`cause`];function Tf(e,t){let n=Object.getOwnPropertyNames(e).filter(e=>wf.indexOf(e)===-1),r=e.name;t.truncate-=r.length;let i=``;if(typeof e.message==`string`?i=Kd(e.message,t.truncate):n.unshift(`message`),i=i?`: ${i}`:``,t.truncate-=i.length+5,t.seen=t.seen||[],t.seen.includes(e))return`[Circular]`;t.seen.push(e);let a=qd(n.map(t=>[t,e[t]]),t,Yd);return`${r}${i}${a?` { ${a} }`:``}`}function Ef([e,t],n){return n.truncate-=3,t?`${n.stylize(String(e),`yellow`)}=${n.stylize(`"${t}"`,`string`)}`:`${n.stylize(String(e),`yellow`)}`}function Df(e,t){return qd(e,t,Of,`
`)}function Of(e,t){switch(e.nodeType){case 1:return kf(e,t);case 3:return t.inspect(e.data,t);default:return t.inspect(e,t)}}function kf(e,t){let n=e.getAttributeNames(),r=e.tagName.toLowerCase(),i=t.stylize(`<${r}`,`special`),a=t.stylize(`>`,`special`),o=t.stylize(`</${r}>`,`special`);t.truncate-=r.length*2+5;let s=``;n.length>0&&(s+=` `,s+=qd(n.map(t=>[t,e.getAttribute(t)]),t,Ef,` `)),t.truncate-=s.length;let c=t.truncate,l=Df(e.children,t);return l&&l.length>c&&(l=`${Hd}(${e.children.length})`),`${i}${s}${a}${l}${o}`}var Af=typeof Symbol==`function`&&typeof Symbol.for==`function`?Symbol.for(`chai/inspect`):`@@chai/inspect`,jf=Symbol.for(`nodejs.util.inspect.custom`),Mf=new WeakMap,Nf={},Pf={undefined:(e,t)=>t.stylize(`undefined`,`undefined`),null:(e,t)=>t.stylize(`null`,`null`),boolean:(e,t)=>t.stylize(String(e),`boolean`),Boolean:(e,t)=>t.stylize(String(e),`boolean`),number:of,Number:of,bigint:sf,BigInt:sf,string:gf,String:gf,function:ef,Function:ef,symbol:_f,Symbol:_f,Array:Xd,Date:$d,Map:rf,Set:uf,RegExp:cf,Promise:yf,WeakSet:(e,t)=>t.stylize(`WeakSet{…}`,`special`),WeakMap:(e,t)=>t.stylize(`WeakMap{…}`,`special`),Arguments:Cf,Int8Array:Qd,Uint8Array:Qd,Uint8ClampedArray:Qd,Int16Array:Qd,Uint16Array:Qd,Int32Array:Qd,Uint32Array:Qd,Float32Array:Qd,Float64Array:Qd,Generator:()=>``,DataView:()=>``,ArrayBuffer:()=>``,Error:Tf,HTMLCollection:Df,NodeList:Df},Ff=(e,t,n)=>Af in e&&typeof e[Af]==`function`?e[Af](t):jf in e&&typeof e[jf]==`function`?e[jf](t.depth,t):`inspect`in e&&typeof e.inspect==`function`?e.inspect(t.depth,t):`constructor`in e&&Mf.has(e.constructor)?Mf.get(e.constructor)(e,t):Nf[n]?Nf[n](e,t):``,If=Object.prototype.toString;function Lf(e,t={}){let n=Wd(t,Lf),{customInspect:r}=n,i=e===null?`null`:typeof e;if(i===`object`&&(i=If.call(e).slice(8,-1)),i in Pf)return Pf[i](e,n);if(r&&e){let t=Ff(e,n,i);if(t)return typeof t==`string`?t:Lf(t,n)}let a=e?Object.getPrototypeOf(e):!1;return a===Object.prototype||a===null?bf(e,n):e&&typeof HTMLElement==`function`&&e instanceof HTMLElement?kf(e,n):`constructor`in e?e.constructor===Object?bf(e,n):Sf(e,n):e===Object(e)?bf(e,n):n.stylize(String(e),i)}var{AsymmetricMatcher:Rf,DOMCollection:zf,DOMElement:Bf,Immutable:Vf,ReactElement:Hf,ReactTestComponent:Uf}=zd,Wf=[Uf,Hf,Bf,zf,Vf,Rf];function Gf(e,t=10,{maxLength:n,...r}={}){let i=n??1e4,a;try{a=Rd(e,{maxDepth:t,escapeString:!1,plugins:Wf,...r})}catch{a=Rd(e,{callToJSON:!1,maxDepth:t,escapeString:!1,plugins:Wf,...r})}return a.length>=i&&t>1?Gf(e,Math.floor(Math.min(t,2**53-1)/2),{maxLength:n,...r}):a}var Kf=/%[sdjifoOc%]/g;function qf(...e){if(typeof e[0]!=`string`){let t=[];for(let n=0;n<e.length;n++)t.push(Jf(e[n],{depth:0,colors:!1}));return t.join(` `)}let t=e.length,n=1,r=e[0],i=String(r).replace(Kf,r=>{if(r===`%%`)return`%`;if(n>=t)return r;switch(r){case`%s`:{let t=e[n++];return typeof t==`bigint`?`${t.toString()}n`:typeof t==`number`&&t===0&&1/t<0?`-0`:typeof t==`object`&&t?typeof t.toString==`function`&&t.toString!==Object.prototype.toString?t.toString():Jf(t,{depth:0,colors:!1}):String(t)}case`%d`:{let t=e[n++];return typeof t==`bigint`?`${t.toString()}n`:Number(t).toString()}case`%i`:{let t=e[n++];return typeof t==`bigint`?`${t.toString()}n`:Number.parseInt(String(t)).toString()}case`%f`:return Number.parseFloat(String(e[n++])).toString();case`%o`:return Jf(e[n++],{showHidden:!0,showProxy:!0});case`%O`:return Jf(e[n++]);case`%c`:return n++,``;case`%j`:try{return JSON.stringify(e[n++])}catch(e){let t=e.message;if(t.includes(`circular structure`)||t.includes(`cyclic structures`)||t.includes(`cyclic object`))return`[Circular]`;throw e}default:return r}});for(let r=e[n];n<t;r=e[++n])typeof r!=`object`||!r?i+=` ${r}`:i+=` ${Jf(r)}`;return i}function Jf(e,t={}){return t.truncate===0&&(t.truncate=1/0),Lf(e,t)}function Yf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}function Xf(e){return e===Object.prototype||e===Function.prototype||e===RegExp.prototype}function Zf(e){return Object.prototype.toString.apply(e).slice(8,-1)}function Qf(e,t){let n=typeof t==`function`?t:e=>t.add(e);Object.getOwnPropertyNames(e).forEach(n),Object.getOwnPropertySymbols(e).forEach(n)}function $f(e){let t=new Set;return Xf(e)?[]:(Qf(e,t),Array.from(t))}var ep={forceWritable:!1};function tp(e,t=ep){return np(e,new WeakMap,t)}function np(e,t,n=ep){let r,i;if(t.has(e))return t.get(e);if(Array.isArray(e)){for(i=Array.from({length:r=e.length}),t.set(e,i);r--;)i[r]=np(e[r],t,n);return i}if(Object.prototype.toString.call(e)===`[object Object]`){i=Object.create(Object.getPrototypeOf(e)),t.set(e,i);let r=$f(e);for(let a of r){let r=Object.getOwnPropertyDescriptor(e,a);if(!r)continue;let o=np(e[a],t,n);n.forceWritable?Object.defineProperty(i,a,{enumerable:r.enumerable,configurable:!0,writable:!0,value:o}):`get`in r?Object.defineProperty(i,a,{...r,get(){return o}}):Object.defineProperty(i,a,{...r,value:o})}return i}return e}var rp=-1,ip=1,ap=0,op=class{0;1;constructor(e,t){this[0]=e,this[1]=t}};function sp(e,t){if(!e||!t||e.charAt(0)!==t.charAt(0))return 0;let n=0,r=Math.min(e.length,t.length),i=r,a=0;for(;n<i;)e.substring(a,i)===t.substring(a,i)?(n=i,a=n):r=i,i=Math.floor((r-n)/2+n);return i}function cp(e,t){if(!e||!t||e.charAt(e.length-1)!==t.charAt(t.length-1))return 0;let n=0,r=Math.min(e.length,t.length),i=r,a=0;for(;n<i;)e.substring(e.length-i,e.length-a)===t.substring(t.length-i,t.length-a)?(n=i,a=n):r=i,i=Math.floor((r-n)/2+n);return i}function lp(e,t){let n=e.length,r=t.length;if(n===0||r===0)return 0;n>r?e=e.substring(n-r):n<r&&(t=t.substring(0,n));let i=Math.min(n,r);if(e===t)return i;let a=0,o=1;for(;;){let n=e.substring(i-o),r=t.indexOf(n);if(r===-1)return a;o+=r,(r===0||e.substring(i-o)===t.substring(0,o))&&(a=o,o++)}}function up(e){let t=!1,n=[],r=0,i=null,a=0,o=0,s=0,c=0,l=0;for(;a<e.length;)e[a][0]===ap?(n[r++]=a,o=c,s=l,c=0,l=0,i=e[a][1]):(e[a][0]===ip?c+=e[a][1].length:l+=e[a][1].length,i&&i.length<=Math.max(o,s)&&i.length<=Math.max(c,l)&&(e.splice(n[r-1],0,new op(rp,i)),e[n[r-1]+1][0]=ip,r--,r--,a=r>0?n[r-1]:-1,o=0,s=0,c=0,l=0,i=null,t=!0)),a++;for(t&&_p(e),gp(e),a=1;a<e.length;){if(e[a-1][0]===rp&&e[a][0]===ip){let t=e[a-1][1],n=e[a][1],r=lp(t,n),i=lp(n,t);r>=i?(r>=t.length/2||r>=n.length/2)&&(e.splice(a,0,new op(ap,n.substring(0,r))),e[a-1][1]=t.substring(0,t.length-r),e[a+1][1]=n.substring(r),a++):(i>=t.length/2||i>=n.length/2)&&(e.splice(a,0,new op(ap,t.substring(0,i))),e[a-1][0]=ip,e[a-1][1]=n.substring(0,n.length-i),e[a+1][0]=rp,e[a+1][1]=t.substring(i),a++),a++}a++}}var dp=/[^a-z0-9]/i,fp=/\s/,pp=/[\r\n]/,mp=/\n\r?\n$/,hp=/^\r?\n\r?\n/;function gp(e){let t=1;for(;t<e.length-1;){if(e[t-1][0]===ap&&e[t+1][0]===ap){let n=e[t-1][1],r=e[t][1],i=e[t+1][1],a=cp(n,r);if(a){let e=r.substring(r.length-a);n=n.substring(0,n.length-a),r=e+r.substring(0,r.length-a),i=e+i}let o=n,s=r,c=i,l=vp(n,r)+vp(r,i);for(;r.charAt(0)===i.charAt(0);){n+=r.charAt(0),r=r.substring(1)+i.charAt(0),i=i.substring(1);let e=vp(n,r)+vp(r,i);e>=l&&(l=e,o=n,s=r,c=i)}e[t-1][1]!==o&&(o?e[t-1][1]=o:(e.splice(t-1,1),t--),e[t][1]=s,c?e[t+1][1]=c:(e.splice(t+1,1),t--))}t++}}function _p(e){e.push(new op(ap,``));let t=0,n=0,r=0,i=``,a=``,o;for(;t<e.length;)switch(e[t][0]){case ip:r++,a+=e[t][1],t++;break;case rp:n++,i+=e[t][1],t++;break;case ap:n+r>1?(n!==0&&r!==0&&(o=sp(a,i),o!==0&&(t-n-r>0&&e[t-n-r-1][0]===ap?e[t-n-r-1][1]+=a.substring(0,o):(e.splice(0,0,new op(ap,a.substring(0,o))),t++),a=a.substring(o),i=i.substring(o)),o=cp(a,i),o!==0&&(e[t][1]=a.substring(a.length-o)+e[t][1],a=a.substring(0,a.length-o),i=i.substring(0,i.length-o))),t-=n+r,e.splice(t,n+r),i.length&&(e.splice(t,0,new op(rp,i)),t++),a.length&&(e.splice(t,0,new op(ip,a)),t++),t++):t!==0&&e[t-1][0]===ap?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++,r=0,n=0,i=``,a=``;break}e[e.length-1][1]===``&&e.pop();let s=!1;for(t=1;t<e.length-1;)e[t-1][0]===ap&&e[t+1][0]===ap&&(e[t][1].substring(e[t][1].length-e[t-1][1].length)===e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),s=!0):e[t][1].substring(0,e[t+1][1].length)===e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),s=!0)),t++;s&&_p(e)}function vp(e,t){if(!e||!t)return 6;let n=e.charAt(e.length-1),r=t.charAt(0),i=n.match(dp),a=r.match(dp),o=i&&n.match(fp),s=a&&r.match(fp),c=o&&n.match(pp),l=s&&r.match(pp),u=c&&e.match(mp),d=l&&t.match(hp);return u||d?5:c||l?4:i&&!o&&s?3:o||s?2:i||a?1:0}var yp=`Compared values have no visual difference.`,bp="Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.",xp={},Sp;function Cp(){if(Sp)return xp;Sp=1,Object.defineProperty(xp,"__esModule",{value:!0}),xp.default=d;let e=`diff-sequences`,t=(e,t,n,r,i)=>{let a=0;for(;e<t&&n<r&&i(e,n);)e+=1,n+=1,a+=1;return a},n=(e,t,n,r,i)=>{let a=0;for(;e<=t&&n<=r&&i(t,r);)--t,--r,a+=1;return a},r=(e,n,r,i,a,o,s)=>{let c=0,l=-e,u=o[c],d=u;o[c]+=t(u+1,n,i+u-l+1,r,a);let f=e<s?e:s;for(c+=1,l+=2;c<=f;c+=1,l+=2){if(c!==e&&d<o[c])u=o[c];else if(u=d+1,n<=u)return c-1;d=o[c],o[c]=u+t(u+1,n,i+u-l+1,r,a)}return s},i=(e,t,r,i,a,o,s)=>{let c=0,l=e,u=o[c],d=u;o[c]-=n(t,u-1,r,i+u-l-1,a);let f=e<s?e:s;for(c+=1,l-=2;c<=f;c+=1,l-=2){if(c!==e&&o[c]<d)u=o[c];else if(u=d-1,u<t)return c-1;d=o[c],o[c]=u-n(t,u-1,r,i+u-l-1,a)}return s},a=(e,r,i,a,o,s,c,l,u,d,f)=>{let p=a-r,m=i-r,h=o-a-m,g=-h-(e-1),_=-h+(e-1),v=0,y=e<l?e:l;for(let l=0,m=-e;l<=y;l+=1,m+=2){let y=l===0||l!==e&&v<c[l],b=y?c[l]:v,x=y?b:b+1,S=p+x-m,C=t(x+1,i,S+1,o,s),w=x+C;if(v=c[l],c[l]=w,g<=m&&m<=_){let t=(e-1-(m+h))/2;if(t<=d&&u[t]-1<=w){let t=p+b-(y?m+1:m-1),c=n(r,b,a,t,s),l=b-c,u=t-c,d=l+1,h=u+1;f.nChangePreceding=e-1,e-1===d+h-r-a?(f.aEndPreceding=r,f.bEndPreceding=a):(f.aEndPreceding=d,f.bEndPreceding=h),f.nCommonPreceding=c,c!==0&&(f.aCommonPreceding=d,f.bCommonPreceding=h),f.nCommonFollowing=C,C!==0&&(f.aCommonFollowing=x+1,f.bCommonFollowing=S+1);let g=w+1,_=S+C+1;return f.nChangeFollowing=e-1,e-1===i+o-g-_?(f.aStartFollowing=i,f.bStartFollowing=o):(f.aStartFollowing=g,f.bStartFollowing=_),!0}}}return!1},o=(e,r,i,a,o,s,c,l,u,d,f)=>{let p=o-i,m=i-r,h=o-a-m,g=h-e,_=h+e,v=0,y=e<d?e:d;for(let d=0,m=e;d<=y;d+=1,m-=2){let y=d===0||d!==e&&u[d]<v,b=y?u[d]:v,x=y?b:b-1,S=p+x-m,C=n(r,x-1,a,S-1,s),w=x-C;if(v=u[d],u[d]=w,g<=m&&m<=_){let n=(e+(m-h))/2;if(n<=l&&w-1<=c[n]){let n=S-C;if(f.nChangePreceding=e,e===w+n-r-a?(f.aEndPreceding=r,f.bEndPreceding=a):(f.aEndPreceding=w,f.bEndPreceding=n),f.nCommonPreceding=C,C!==0&&(f.aCommonPreceding=w,f.bCommonPreceding=n),f.nChangeFollowing=e-1,e===1)f.nCommonFollowing=0,f.aStartFollowing=i,f.bStartFollowing=o;else{let n=p+b-(y?m-1:m+1),r=t(b,i,n,o,s);f.nCommonFollowing=r,r!==0&&(f.aCommonFollowing=b,f.bCommonFollowing=n);let a=b+r,c=n+r;e-1===i+o-a-c?(f.aStartFollowing=i,f.bStartFollowing=o):(f.aStartFollowing=a,f.bStartFollowing=c)}return!0}}}return!1},s=(t,n,s,c,l,u,d,f,p)=>{let m=c-n,h=l-s,g=s-n,_=l-c,v=_-g,y=g,b=g;if(d[0]=n-1,f[0]=s,v%2==0){let e=(t||v)/2,a=(g+_)/2;for(let t=1;t<=a;t+=1)if(y=r(t,s,l,m,u,d,y),t<e)b=i(t,n,c,h,u,f,b);else if(o(t,n,s,c,l,u,d,y,f,b,p))return}else{let e=((t||v)+1)/2,o=(g+_+1)/2,x=1;for(y=r(x,s,l,m,u,d,y),x+=1;x<=o;x+=1)if(b=i(x-1,n,c,h,u,f,b),x<e)y=r(x,s,l,m,u,d,y);else if(a(x,n,s,c,l,u,d,y,f,b,p))return}throw Error(`${e}: no overlap aStart=${n} aEnd=${s} bStart=${c} bEnd=${l}`)},c=(e,t,n,r,i,a,o,l,u,d)=>{if(i-r<n-t){if(a=!a,a&&o.length===1){let{foundSubsequence:e,isCommon:t}=o[0];o[1]={foundSubsequence:(t,n,r)=>{e(t,r,n)},isCommon:(e,n)=>t(n,e)}}let e=t,s=n;t=r,n=i,r=e,i=s}let{foundSubsequence:f,isCommon:p}=o[+!!a];s(e,t,n,r,i,p,l,u,d);let{nChangePreceding:m,aEndPreceding:h,bEndPreceding:g,nCommonPreceding:_,aCommonPreceding:v,bCommonPreceding:y,nCommonFollowing:b,aCommonFollowing:x,bCommonFollowing:S,nChangeFollowing:C,aStartFollowing:w,bStartFollowing:ee}=d;t<h&&r<g&&c(m,t,h,r,g,a,o,l,u,d),_!==0&&f(_,v,y),b!==0&&f(b,x,S),w<n&&ee<i&&c(C,w,n,ee,i,a,o,l,u,d)},l=(t,n)=>{if(typeof n!=`number`)throw TypeError(`${e}: ${t} typeof ${typeof n} is not a number`);if(!Number.isSafeInteger(n))throw RangeError(`${e}: ${t} value ${n} is not a safe integer`);if(n<0)throw RangeError(`${e}: ${t} value ${n} is a negative integer`)},u=(t,n)=>{let r=typeof n;if(r!==`function`)throw TypeError(`${e}: ${t} typeof ${r} is not a function`)};function d(e,r,i,a){l(`aLength`,e),l(`bLength`,r),u(`isCommon`,i),u(`foundSubsequence`,a);let o=t(0,e,0,r,i);if(o!==0&&a(o,0,0),e!==o||r!==o){let t=o,s=o,l=n(t,e-1,s,r-1,i),u=e-l,d=r-l,f=o+l;e!==f&&r!==f&&c(0,t,u,s,d,!1,[{foundSubsequence:a,isCommon:i}],[0],[0],{aCommonFollowing:0,aCommonPreceding:0,aEndPreceding:0,aStartFollowing:0,bCommonFollowing:0,bCommonPreceding:0,bEndPreceding:0,bStartFollowing:0,nChangeFollowing:0,nChangePreceding:0,nCommonFollowing:0,nCommonPreceding:0}),l!==0&&a(l,u,d)}}return xp}var wp=Yf(Cp());function Tp(e,t){return e.replace(/\s+$/,e=>t(e))}function Ep(e,t,n,r,i,a){return e.length===0?r===` `?t&&a.length!==0?n(`${r} ${a}`):``:n(r):n(`${r} ${Tp(e,i)}`)}function Dp(e,t,{aColor:n,aIndicator:r,changeLineTrailingSpaceColor:i,emptyFirstOrLastLinePlaceholder:a}){return Ep(e,t,n,r,i,a)}function Op(e,t,{bColor:n,bIndicator:r,changeLineTrailingSpaceColor:i,emptyFirstOrLastLinePlaceholder:a}){return Ep(e,t,n,r,i,a)}function kp(e,t,{commonColor:n,commonIndicator:r,commonLineTrailingSpaceColor:i,emptyFirstOrLastLinePlaceholder:a}){return Ep(e,t,n,r,i,a)}function Ap(e,t,n,r,{patchColor:i}){return i(`@@ -${e+1},${t-e} +${n+1},${r-n} @@`)}function jp(e,t){let n=e.length,r=t.contextLines,i=r+r,a=n,o=!1,s=0,c=0;for(;c!==n;){let t=c;for(;c!==n&&e[c][0]===ap;)c+=1;if(t!==c)if(t===0)c>r&&(a-=c-r,o=!0);else if(c===n){let e=c-t;e>r&&(a-=e-r,o=!0)}else{let e=c-t;e>i&&(a-=e-i,s+=1)}for(;c!==n&&e[c][0]!==ap;)c+=1}let l=s!==0||o;s===0?o&&(a+=1):a+=s+1;let u=a-1,d=[],f=0;l&&d.push(``);let p=0,m=0,h=0,g=0,_=e=>{let n=d.length;d.push(kp(e,n===0||n===u,t)),h+=1,g+=1},v=e=>{let n=d.length;d.push(Dp(e,n===0||n===u,t)),h+=1},y=e=>{let n=d.length;d.push(Op(e,n===0||n===u,t)),g+=1};for(c=0;c!==n;){let a=c;for(;c!==n&&e[c][0]===ap;)c+=1;if(a!==c)if(a===0){c>r&&(a=c-r,p=a,m=a,h=p,g=m);for(let t=a;t!==c;t+=1)_(e[t][1])}else if(c===n){let t=c-a>r?a+r:c;for(let n=a;n!==t;n+=1)_(e[n][1])}else{let n=c-a;if(n>i){let o=a+r;for(let t=a;t!==o;t+=1)_(e[t][1]);d[f]=Ap(p,h,m,g,t),f=d.length,d.push(``);let s=n-i;p=h+s,m=g+s,h=p,g=m;for(let t=c-r;t!==c;t+=1)_(e[t][1])}else for(let t=a;t!==c;t+=1)_(e[t][1])}for(;c!==n&&e[c][0]===rp;)v(e[c][1]),c+=1;for(;c!==n&&e[c][0]===ip;)y(e[c][1]),c+=1}return l&&(d[f]=Ap(p,h,m,g,t)),d.join(`
`)}function Mp(e,t){return e.map((e,n,r)=>{let i=e[1],a=n===0||n===r.length-1;switch(e[0]){case rp:return Dp(i,a,t);case ip:return Op(i,a,t);default:return kp(i,a,t)}}).join(`
`)}var Np=e=>e,Pp=5,Fp=0;function Ip(){return{aAnnotation:`Expected`,aColor:Pl.green,aIndicator:`-`,bAnnotation:`Received`,bColor:Pl.red,bIndicator:`+`,changeColor:Pl.inverse,changeLineTrailingSpaceColor:Np,commonColor:Pl.dim,commonIndicator:` `,commonLineTrailingSpaceColor:Np,compareKeys:void 0,contextLines:Pp,emptyFirstOrLastLinePlaceholder:``,expand:!1,includeChangeCounts:!1,omitAnnotationLines:!1,patchColor:Pl.yellow,printBasicPrototype:!1,truncateThreshold:Fp,truncateAnnotation:`... Diff result is truncated`,truncateAnnotationColor:Np}}function Lp(e){return e&&typeof e==`function`?e:void 0}function Rp(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0?e:Pp}function zp(e={}){return{...Ip(),...e,compareKeys:Lp(e.compareKeys),contextLines:Rp(e.contextLines)}}function Bp(e){return e.length===1&&e[0].length===0}function Vp(e){let t=0,n=0;return e.forEach(e=>{switch(e[0]){case rp:t+=1;break;case ip:n+=1;break}}),{a:t,b:n}}function Hp({aAnnotation:e,aColor:t,aIndicator:n,bAnnotation:r,bColor:i,bIndicator:a,includeChangeCounts:o,omitAnnotationLines:s},c){if(s)return``;let l=``,u=``;if(o){let t=String(c.a),i=String(c.b),o=r.length-e.length,s=` `.repeat(Math.max(0,o)),d=` `.repeat(Math.max(0,-o)),f=i.length-t.length,p=` `.repeat(Math.max(0,f)),m=` `.repeat(Math.max(0,-f));l=`${s}  ${n} ${p}${t}`,u=`${d}  ${a} ${m}${i}`}let d=`${n} ${e}${l}`,f=`${a} ${r}${u}`;return`${t(d)}
${i(f)}

`}function Up(e,t,n){return Hp(n,Vp(e))+(n.expand?Mp(e,n):jp(e,n))+(t?n.truncateAnnotationColor(`
${n.truncateAnnotation}`):``)}function Wp(e,t,n){let r=zp(n),[i,a]=Kp(Bp(e)?[]:e,Bp(t)?[]:t,r);return Up(i,a,r)}function Gp(e,t,n,r,i){if(Bp(e)&&Bp(n)&&(e=[],n=[]),Bp(t)&&Bp(r)&&(t=[],r=[]),e.length!==n.length||t.length!==r.length)return Wp(e,t,i);let[a,o]=Kp(n,r,i),s=0,c=0;return a.forEach(n=>{switch(n[0]){case rp:n[1]=e[s],s+=1;break;case ip:n[1]=t[c],c+=1;break;default:n[1]=t[c],s+=1,c+=1}}),Up(a,o,zp(i))}function Kp(e,t,n){let r=n?.truncateThreshold??!1,i=Math.max(Math.floor(n?.truncateThreshold??0),0),a=r?Math.min(e.length,i):e.length,o=r?Math.min(t.length,i):t.length,s=a!==e.length||o!==t.length,c=(n,r)=>e[n]===t[r],l=[],u=0,d=0;for(wp(a,o,c,(n,r,i)=>{for(;u!==r;u+=1)l.push(new op(rp,e[u]));for(;d!==i;d+=1)l.push(new op(ip,t[d]));for(;n!==0;--n,u+=1,d+=1)l.push(new op(ap,t[d]))});u!==a;u+=1)l.push(new op(rp,e[u]));for(;d!==o;d+=1)l.push(new op(ip,t[d]));return[l,s]}function qp(e){if(e===void 0)return`undefined`;if(e===null)return`null`;if(Array.isArray(e))return`array`;if(typeof e==`boolean`)return`boolean`;if(typeof e==`function`)return`function`;if(typeof e==`number`)return`number`;if(typeof e==`string`)return`string`;if(typeof e==`bigint`)return`bigint`;if(typeof e==`object`){if(e!=null){if(e.constructor===RegExp)return`regexp`;if(e.constructor===Map)return`map`;if(e.constructor===Set)return`set`;if(e.constructor===Date)return`date`}return`object`}else if(typeof e==`symbol`)return`symbol`;throw Error(`value of unknown type: ${e}`)}function Jp(e){return e.includes(`\r
`)?`\r
`:`
`}function Yp(e,t,n){let r=n?.truncateThreshold??!1,i=Math.max(Math.floor(n?.truncateThreshold??0),0),a=e.length,o=t.length;if(r){let n=e.includes(`
`),r=t.includes(`
`),s=Jp(e),c=Jp(t),l=n?`${e.split(s,i).join(s)}
`:e,u=r?`${t.split(c,i).join(c)}
`:t;a=l.length,o=u.length}let s=a!==e.length||o!==t.length,c=(n,r)=>e[n]===t[r],l=0,u=0,d=[];return wp(a,o,c,(n,r,i)=>{l!==r&&d.push(new op(rp,e.slice(l,r))),u!==i&&d.push(new op(ip,t.slice(u,i))),l=r+n,u=i+n,d.push(new op(ap,t.slice(i,u)))}),l!==a&&d.push(new op(rp,e.slice(l))),u!==o&&d.push(new op(ip,t.slice(u))),[d,s]}function Xp(e,t,n){return t.reduce((t,r)=>t+(r[0]===ap?r[1]:r[0]===e&&r[1].length!==0?n(r[1]):``),``)}var Zp=class{op;line;lines;changeColor;constructor(e,t){this.op=e,this.line=[],this.lines=[],this.changeColor=t}pushSubstring(e){this.pushDiff(new op(this.op,e))}pushLine(){this.lines.push(this.line.length===1?this.line[0][0]===this.op?this.line[0]:new op(this.op,this.line[0][1]):new op(this.op,Xp(this.op,this.line,this.changeColor))),this.line.length=0}isLineEmpty(){return this.line.length===0}pushDiff(e){this.line.push(e)}align(e){let t=e[1];if(t.includes(`
`)){let e=t.split(`
`),n=e.length-1;e.forEach((e,t)=>{t<n?(this.pushSubstring(e),this.pushLine()):e.length!==0&&this.pushSubstring(e)})}else this.pushDiff(e)}moveLinesTo(e){this.isLineEmpty()||this.pushLine(),e.push(...this.lines),this.lines.length=0}},Qp=class{deleteBuffer;insertBuffer;lines;constructor(e,t){this.deleteBuffer=e,this.insertBuffer=t,this.lines=[]}pushDiffCommonLine(e){this.lines.push(e)}pushDiffChangeLines(e){let t=e[1].length===0;(!t||this.deleteBuffer.isLineEmpty())&&this.deleteBuffer.pushDiff(e),(!t||this.insertBuffer.isLineEmpty())&&this.insertBuffer.pushDiff(e)}flushChangeLines(){this.deleteBuffer.moveLinesTo(this.lines),this.insertBuffer.moveLinesTo(this.lines)}align(e){let t=e[0],n=e[1];if(n.includes(`
`)){let e=n.split(`
`),r=e.length-1;e.forEach((e,n)=>{if(n===0){let n=new op(t,e);this.deleteBuffer.isLineEmpty()&&this.insertBuffer.isLineEmpty()?(this.flushChangeLines(),this.pushDiffCommonLine(n)):(this.pushDiffChangeLines(n),this.flushChangeLines())}else n<r?this.pushDiffCommonLine(new op(t,e)):e.length!==0&&this.pushDiffChangeLines(new op(t,e))})}else this.pushDiffChangeLines(e)}getLines(){return this.flushChangeLines(),this.lines}};function $p(e,t){let n=new Zp(rp,t),r=new Zp(ip,t),i=new Qp(n,r);return e.forEach(e=>{switch(e[0]){case rp:n.align(e);break;case ip:r.align(e);break;default:i.align(e)}}),i.getLines()}function em(e,t){if(t){let t=e.length-1;return e.some((e,n)=>e[0]===ap&&(n!==t||e[1]!==`
`))}return e.some(e=>e[0]===ap)}function tm(e,t,n){if(e!==t&&e.length!==0&&t.length!==0){let r=e.includes(`
`)||t.includes(`
`),[i,a]=nm(r?`${e}
`:e,r?`${t}
`:t,!0,n);if(em(i,r)){let e=zp(n);return Up($p(i,e.changeColor),a,e)}}return Wp(e.split(`
`),t.split(`
`),n)}function nm(e,t,n,r){let[i,a]=Yp(e,t,r);return n&&up(i),[i,a]}function rm(e,t){let{commonColor:n}=zp(t);return n(e)}var{AsymmetricMatcher:im,DOMCollection:am,DOMElement:om,Immutable:sm,ReactElement:cm,ReactTestComponent:lm}=zd,um=[lm,cm,om,am,sm,im,zd.Error],dm={maxDepth:20,plugins:um},fm={callToJSON:!1,maxDepth:8,plugins:um};function pm(e,t,n){if(Object.is(e,t))return``;let r=qp(e),i=r,a=!1;if(r===`object`&&typeof e.asymmetricMatch==`function`){if(e.$$typeof!==Symbol.for(`jest.asymmetricMatcher`)||typeof e.getExpectedType!=`function`)return;i=e.getExpectedType(),a=i===`string`}if(i!==qp(t)){let r=function(e){return e.length<=p?e:`${e.slice(0,p)}...`},{aAnnotation:i,aColor:a,aIndicator:o,bAnnotation:s,bColor:c,bIndicator:l}=zp(n),u=vm(fm,n),d=Rd(e,u),f=Rd(t,u),p=1e5;return d=r(d),f=r(f),`${`${a(`${o} ${i}:`)} 
${d}`}

${`${c(`${l} ${s}:`)} 
${f}`}`}if(!a)switch(r){case`string`:return Wp(e.split(`
`),t.split(`
`),n);case`boolean`:case`number`:return mm(e,t,n);case`map`:return _m(hm(e),hm(t),n);case`set`:return _m(gm(e),gm(t),n);default:return _m(e,t,n)}}function mm(e,t,n){let r=Rd(e,dm),i=Rd(t,dm);return r===i?``:Wp(r.split(`
`),i.split(`
`),n)}function hm(e){return new Map(Array.from(e.entries()).sort())}function gm(e){return new Set(Array.from(e.values()).sort())}function _m(e,t,n){let r,i=!1;try{r=ym(e,t,vm(dm,n),n)}catch{i=!0}let a=rm(yp,n);return(r===void 0||r===a)&&(r=ym(e,t,vm(fm,n),n),r!==a&&!i&&(r=`${rm(bp,n)}

${r}`)),r}function vm(e,t){let{compareKeys:n,printBasicPrototype:r,maxDepth:i}=zp(t);return{...e,compareKeys:n,printBasicPrototype:r,maxDepth:i??e.maxDepth}}function ym(e,t,n,r){let i={...n,indent:0},a=Rd(e,i),o=Rd(t,i);if(a===o)return rm(yp,r);{let i=Rd(e,n),s=Rd(t,n);return Gp(i.split(`
`),s.split(`
`),a.split(`
`),o.split(`
`),r)}}var bm=2e4;function xm(e){return Zf(e)===`Object`&&typeof e.asymmetricMatch==`function`}function Sm(e,t){let n=Zf(e);return n===Zf(t)&&(n===`Object`||n===`Array`)}function Cm(e,t,n){let{aAnnotation:r,bAnnotation:i}=zp(n);if(typeof t==`string`&&typeof e==`string`&&t.length>0&&e.length>0&&t.length<=bm&&e.length<=bm&&t!==e){if(t.includes(`
`)||e.includes(`
`))return tm(t,e,n);let[a]=nm(t,e,!0),o=a.some(e=>e[0]===ap),s=Tm(r,i);return`${s(r)+km(Am(a,rp,o))}
${s(i)+Om(Am(a,ip,o))}`}let a=tp(t,{forceWritable:!0}),{replacedExpected:o,replacedActual:s}=wm(tp(e,{forceWritable:!0}),a);return pm(o,s,n)}function wm(e,t,n=new WeakSet,r=new WeakSet){return e instanceof Error&&t instanceof Error&&typeof e.cause<`u`&&typeof t.cause>`u`?(delete e.cause,{replacedActual:e,replacedExpected:t}):Sm(e,t)?n.has(e)||r.has(t)?{replacedActual:e,replacedExpected:t}:(n.add(e),r.add(t),$f(t).forEach(i=>{let a=t[i],o=e[i];if(xm(a))a.asymmetricMatch(o)&&(e[i]=a);else if(xm(o))o.asymmetricMatch(a)&&(t[i]=o);else if(Sm(o,a)){let s=wm(o,a,n,r);e[i]=s.replacedActual,t[i]=s.replacedExpected}}),{replacedActual:e,replacedExpected:t}):{replacedActual:e,replacedExpected:t}}function Tm(...e){let t=e.reduce((e,t)=>t.length>e?t.length:e,0);return e=>`${e}: ${` `.repeat(t-e.length)}`}var Em=`·`;function Dm(e){return e.replace(/\s+$/gm,e=>Em.repeat(e.length))}function Om(e){return Pl.red(Dm(Gf(e)))}function km(e){return Pl.green(Dm(Gf(e)))}function Am(e,t,n){return e.reduce((e,r)=>e+(r[0]===ap?r[1]:r[0]===t?n?Pl.inverse(r[1]):r[1]:``),``)}var jm=`@@__IMMUTABLE_RECORD__@@`,Mm=`@@__IMMUTABLE_ITERABLE__@@`;function Nm(e){return e&&(e[Mm]||e[jm])}var Pm=Object.getPrototypeOf({});function Fm(e){return e instanceof Error?`<unserializable>: ${e.message}`:typeof e==`string`?`<unserializable>: ${e}`:`<unserializable>`}function Im(e,t=new WeakMap){if(!e||typeof e==`string`)return e;if(e instanceof Error&&`toJSON`in e&&typeof e.toJSON==`function`){let n=e.toJSON();return n&&n!==e&&typeof n==`object`&&(typeof e.message==`string`&&Lm(()=>n.message??=e.message),typeof e.stack==`string`&&Lm(()=>n.stack??=e.stack),typeof e.name==`string`&&Lm(()=>n.name??=e.name),e.cause!=null&&Lm(()=>n.cause??=Im(e.cause,t))),Im(n,t)}if(typeof e==`function`)return`Function<${e.name||`anonymous`}>`;if(typeof e==`symbol`)return e.toString();if(typeof e!=`object`)return e;if(typeof Buffer<`u`&&e instanceof Buffer)return`<Buffer(${e.length}) ...>`;if(typeof Uint8Array<`u`&&e instanceof Uint8Array)return`<Uint8Array(${e.length}) ...>`;if(Nm(e))return Im(e.toJSON(),t);if(e instanceof Promise||e.constructor&&e.constructor.prototype===`AsyncFunction`)return`Promise`;if(typeof Element<`u`&&e instanceof Element)return e.tagName;if(typeof e.asymmetricMatch==`function`)return`${e.toString()} ${qf(e.sample)}`;if(typeof e.toJSON==`function`)return Im(e.toJSON(),t);if(t.has(e))return t.get(e);if(Array.isArray(e)){let n=Array(e.length);return t.set(e,n),e.forEach((e,r)=>{try{n[r]=Im(e,t)}catch(e){n[r]=Fm(e)}}),n}else{let n=Object.create(null);t.set(e,n);let r=e;for(;r&&r!==Pm;)Object.getOwnPropertyNames(r).forEach(r=>{if(!(r in n))try{n[r]=Im(e[r],t)}catch(e){delete n[r],n[r]=Fm(e)}}),r=Object.getPrototypeOf(r);return n}}function Lm(e){try{return e()}catch{}}function Rm(e){return e.replace(/__(vite_ssr_import|vi_import)_\d+__\./g,``)}function zm(e,t,n=new WeakSet){if(!e||typeof e!=`object`)return{message:String(e)};let r=e;(r.showDiff||r.showDiff===void 0&&r.expected!==void 0&&r.actual!==void 0)&&(r.diff=Cm(r.actual,r.expected,{...t,...r.diffOptions})),`expected`in r&&typeof r.expected!=`string`&&(r.expected=Gf(r.expected,10)),`actual`in r&&typeof r.actual!=`string`&&(r.actual=Gf(r.actual,10));try{typeof r.message==`string`&&(r.message=Rm(r.message))}catch{}try{!n.has(r)&&typeof r.cause==`object`&&(n.add(r),r.cause=zm(r.cause,t,n))}catch{}try{return Im(r)}catch(e){return Im(Error(`Failed to fully serialize error: ${e?.message}
Inner error message: ${r?.message}`))}}var Bm=globalThis.__STORYBOOK_ADDONS_PREVIEW,Vm=Error("This function ran after the play function completed. Did you forget to `await` it?"),Hm=e=>Object.prototype.toString.call(e)===`[object Object]`,Um=e=>Object.prototype.toString.call(e)===`[object Module]`,Wm=e=>{if(!Hm(e)&&!Um(e))return!1;if(e.constructor===void 0)return!0;let t=e.constructor.prototype;return!!Hm(t)},Gm=e=>{try{return new e.constructor}catch{return{}}},Km=()=>({renderPhase:`preparing`,isDebugging:!1,isPlaying:!1,isLocked:!1,cursor:0,calls:[],shadowCalls:[],callRefsByResult:new Map,chainedCallIds:new Set,ancestors:[],playUntil:void 0,resolvers:{},syncTimeout:void 0}),qm=(e,t=!1)=>{let n=(t?e.shadowCalls:e.calls).filter(e=>e.retain);if(!n.length)return;let r=new Map(Array.from(e.callRefsByResult.entries()).filter(([,e])=>e.retain));return{cursor:n.length,calls:n,callRefsByResult:r}},Jm=class{constructor(){this.detached=!1,this.initialized=!1,this.state={},this.loadParentWindowState=()=>{try{this.state=J.window?.parent?.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__||{}}catch{this.detached=!0}},this.updateParentWindowState=()=>{try{J.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__=this.state}catch{this.detached=!0}},this.loadParentWindowState();let e=({storyId:e,renderPhase:t,isPlaying:n=!0,isDebugging:r=!1})=>{let i=this.getState(e);this.setState(e,{...Km(),...qm(i,r),renderPhase:t||i.renderPhase,shadowCalls:r?i.shadowCalls:[],chainedCallIds:r?i.chainedCallIds:new Set,playUntil:r?i.playUntil:void 0,isPlaying:n,isDebugging:r}),this.sync(e)},t=e=>({storyId:t,playUntil:n})=>{this.getState(t).isDebugging||this.setState(t,({calls:e})=>({calls:[],shadowCalls:e.map(e=>({...e,status:`waiting`})),isDebugging:!0}));let r=this.getLog(t);this.setState(t,({shadowCalls:e})=>{if(n||!r.length)return{playUntil:n};let t=e.findIndex(e=>e.id===r[0].callId);return{playUntil:e.slice(0,t).filter(e=>e.interceptable&&!e.ancestors?.length).slice(-1)[0]?.id}}),e.emit(rc,{storyId:t,isDebugging:!0})},n=e=>({storyId:n})=>{let r=this.getLog(n).filter(e=>!e.ancestors?.length),i=r.reduceRight((e,t,n)=>e>=0||t.status===`waiting`?e:n,-1);t(e)({storyId:n,playUntil:r[i-1]?.callId})},r=e=>({storyId:n,callId:r})=>{let{calls:i,shadowCalls:a,resolvers:o}=this.getState(n),s=i.find(({id:e})=>e===r),c=a.find(({id:e})=>e===r);if(!s&&c&&Object.values(o).length>0){let e=this.getLog(n).find(e=>e.status===`waiting`)?.callId;c.id!==e&&this.setState(n,{playUntil:c.id}),Object.values(o).forEach(e=>e())}else t(e)({storyId:n,playUntil:r})},i=e=>({storyId:n})=>{let{resolvers:r}=this.getState(n);if(Object.values(r).length>0)Object.values(r).forEach(e=>e());else{let r=this.getLog(n).find(e=>e.status===`waiting`)?.callId;r?t(e)({storyId:n,playUntil:r}):a({storyId:n})}},a=({storyId:e})=>{this.setState(e,{playUntil:void 0,isDebugging:!1}),Object.values(this.getState(e).resolvers).forEach(e=>e())},o=({storyId:t,newPhase:n})=>{let{isDebugging:r}=this.getState(t);if(n===`preparing`&&r||n===`playing`)return e({storyId:t,renderPhase:n,isDebugging:r});n===`played`?this.setState(t,{renderPhase:n,isLocked:!1,isPlaying:!1,isDebugging:!1}):n===`errored`?this.setState(t,{renderPhase:n,isLocked:!1,isPlaying:!1}):n===`aborted`?this.setState(t,{renderPhase:n,isLocked:!0,isPlaying:!1}):this.setState(t,{renderPhase:n}),this.sync(t)};Bm&&Bm.ready().then(()=>{this.channel=Bm.getChannel(),this.channel.on(rc,e),this.channel.on(jc,o),this.channel.on(gc,()=>{this.initialized?this.cleanup():this.initialized=!0}),this.channel.on(kl.START,t(this.channel)),this.channel.on(kl.BACK,n(this.channel)),this.channel.on(kl.GOTO,r(this.channel)),this.channel.on(kl.NEXT,i(this.channel)),this.channel.on(kl.END,a)})}getState(e){return this.state[e]||Km()}setState(e,t){if(e){let n=this.getState(e),r=typeof t==`function`?t(n):t;this.state={...this.state,[e]:{...n,...r}},this.updateParentWindowState()}}cleanup(){this.state=Object.entries(this.state).reduce((e,[t,n])=>{let r=qm(n);return r&&(e[t]=Object.assign(Km(),r)),e},{});let e={controlStates:{detached:this.detached,start:!1,back:!1,goto:!1,next:!1,end:!1},logItems:[]};this.channel?.emit(kl.SYNC,e),this.updateParentWindowState()}getLog(e){let{calls:t,shadowCalls:n}=this.getState(e),r=[...n];t.forEach((e,t)=>{r[t]=e});let i=new Set;return r.reduceRight((e,t)=>(t.args.forEach(e=>{e?.__callId__&&i.add(e.__callId__)}),t.path.forEach(e=>{e.__callId__&&i.add(e.__callId__)}),(t.interceptable||t.exception)&&!i.has(t.id)&&(e.unshift({callId:t.id,status:t.status,ancestors:t.ancestors}),i.add(t.id)),e),[])}instrument(e,t,n=0){if(!Wm(e))return e;let{mutate:r=!1,path:i=[]}=t,a=t.getKeys?t.getKeys(e,n):Object.keys(e);return n+=1,a.reduce((r,a)=>{let o=Xm(e,a);if(typeof o?.get==`function`){if(o.configurable){let s=()=>o?.get?.bind(e)?.();Object.defineProperty(r,a,{get:()=>this.instrument(s(),{...t,path:i.concat(a)},n)})}return r}let s=e[a];return typeof s==`function`?`__originalFn__`in s&&typeof s.__originalFn__==`function`?(r[a]=s,r):(r[a]=(...n)=>this.track(a,s,e,n,t),r[a].__originalFn__=s,Object.defineProperty(r[a],"name",{value:a,writable:!1}),Object.keys(s).length>0&&Object.assign(r[a],this.instrument({...s},{...t,path:i.concat(a)},n)),r):(r[a]=this.instrument(s,{...t,path:i.concat(a)},n),r)},r?e:Gm(e))}track(e,t,n,r,i){let a=r?.[0]?.__storyId__||J.__STORYBOOK_PREVIEW__?.selectionStore?.selection?.storyId,{cursor:o,ancestors:s}=this.getState(a);this.setState(a,{cursor:o+1});let c=`${s.slice(-1)[0]||a} [${o}] ${e}`,{path:l=[],intercept:u=!1,retain:d=!1}=i,f=typeof u==`function`?u(e,l):u,p={id:c,cursor:o,storyId:a,ancestors:s,path:l,method:e,args:r,interceptable:f,retain:d},m=(f&&!s.length?this.intercept:this.invoke).call(this,t,n,p,i);return this.instrument(m,{...i,mutate:!0,path:[{__callId__:p.id}]})}intercept(e,t,n,r){let{chainedCallIds:i,isDebugging:a,playUntil:o}=this.getState(n.storyId),s=i.has(n.id);return!a||s||o?(o===n.id&&this.setState(n.storyId,{playUntil:void 0}),this.invoke(e,t,n,r)):new Promise(e=>{this.setState(n.storyId,({resolvers:t})=>({isLocked:!1,resolvers:{...t,[n.id]:e}}))}).then(()=>(this.setState(n.storyId,e=>{let{[n.id]:t,...r}=e.resolvers;return{isLocked:!0,resolvers:r}}),this.invoke(e,t,n,r)))}invoke(e,t,n,r){let{callRefsByResult:i,renderPhase:a}=this.getState(n.storyId),o=(e,t,n)=>{if(n.includes(e))return`[Circular]`;if(n=[...n,e],t>25)return`...`;if(i.has(e))return i.get(e);if(e instanceof Array)return e.map(e=>o(e,++t,n));if(e instanceof Date)return{__date__:{value:e.toISOString()}};if(e instanceof Error){let{name:t,message:n,stack:r}=e;return{__error__:{name:t,message:n,stack:r}}}if(e instanceof RegExp){let{flags:t,source:n}=e;return{__regexp__:{flags:t,source:n}}}if(e instanceof J.window?.HTMLElement){let{prefix:t,localName:n,id:r,classList:i,innerText:a}=e;return{__element__:{prefix:t,localName:n,id:r,classNames:Array.from(i),innerText:a}}}return typeof e==`function`?{__function__:{name:`getMockName`in e?e.getMockName():e.name}}:typeof e==`symbol`?{__symbol__:{description:e.description}}:typeof e==`object`&&e?.constructor?.name&&e?.constructor?.name!==`Object`?{__class__:{name:e.constructor.name}}:Object.prototype.toString.call(e)===`[object Object]`?Object.fromEntries(Object.entries(e).map(([e,r])=>[e,o(r,++t,n)])):e},s={...n,args:n.args.map(e=>o(e,0,[]))};n.path.forEach(e=>{e?.__callId__&&this.setState(n.storyId,({chainedCallIds:t})=>({chainedCallIds:new Set(Array.from(t).concat(e.__callId__))}))});let c=e=>{if(e instanceof Error){let{name:t,message:r,stack:i,callId:a=n.id}=e,{showDiff:o=void 0,diff:c=void 0,actual:l=void 0,expected:u=void 0}=e.name===`AssertionError`?zm(e):e,d={name:t,message:r,stack:i,callId:a,showDiff:o,diff:c,actual:l,expected:u};if(this.update({...s,status:`error`,exception:d}),this.setState(n.storyId,t=>({callRefsByResult:new Map([...Array.from(t.callRefsByResult.entries()),[e,{__callId__:n.id,retain:n.retain}]])})),n.ancestors?.length)throw Object.prototype.hasOwnProperty.call(e,`callId`)||Object.defineProperty(e,"callId",{value:n.id}),e}throw e};try{if(a===`played`&&!n.retain)throw Vm;let i=(r.getArgs?r.getArgs(n,this.getState(n.storyId)):n.args).map(e=>typeof e!=`function`||Zm(e)||Object.keys(e).length?e:(...t)=>{let{cursor:r,ancestors:i}=this.getState(n.storyId);this.setState(n.storyId,{cursor:0,ancestors:[...i,n.id]});let a=()=>this.setState(n.storyId,{cursor:r,ancestors:i}),o=!1;try{let n=e(...t);return n instanceof Promise?(o=!0,n.finally(a)):n}finally{o||a()}}),o=e.apply(t,i);return o&&[`object`,`function`,`symbol`].includes(typeof o)&&this.setState(n.storyId,e=>({callRefsByResult:new Map([...Array.from(e.callRefsByResult.entries()),[o,{__callId__:n.id,retain:n.retain}]])})),this.update({...s,status:o instanceof Promise?`active`:`done`}),o instanceof Promise?o.then(e=>(this.update({...s,status:`done`}),e),c):o}catch(e){return c(e)}}update(e){this.channel?.emit(kl.CALL,e),this.setState(e.storyId,({calls:t})=>{let n=t.concat(e).reduce((e,t)=>Object.assign(e,{[t.id]:t}),{});return{calls:Object.values(n).sort((e,t)=>e.id.localeCompare(t.id,void 0,{numeric:!0}))}}),this.sync(e.storyId)}sync(e){let t=()=>{let{isLocked:t,isPlaying:n}=this.getState(e),r=this.getLog(e),i=r.filter(({ancestors:e})=>!e.length).find(e=>e.status===`waiting`)?.callId,a=r.some(e=>e.status===`active`);if(this.detached||t||a||r.length===0){let e={controlStates:{detached:this.detached,start:!1,back:!1,goto:!1,next:!1,end:!1},logItems:r};this.channel?.emit(kl.SYNC,e);return}let o=r.some(e=>e.status===`done`||e.status===`error`),s={controlStates:{detached:this.detached,start:o,back:o,goto:!0,next:n,end:n},logItems:r,pausedAt:i};this.channel?.emit(kl.SYNC,s)};this.setState(e,({syncTimeout:e})=>(clearTimeout(e),{syncTimeout:setTimeout(t,0)}))}};function Ym(e,t={}){try{let n=!1,r=!1;return J.window?.location?.search?.includes(`instrument=true`)?n=!0:J.window?.location?.search?.includes(`instrument=false`)&&(r=!0),J.window?.parent===J.window&&!n||r?e:(J.window&&!J.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__&&(J.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__=new Jm),(J.window?.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__).instrument(e,t))}catch(t){return xr.warn(t),e}}function Xm(e,t){let n=e;for(;n!=null;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=Object.getPrototypeOf(n)}}function Zm(e){if(typeof e!=`function`)return!1;let t=Object.getOwnPropertyDescriptor(e,`prototype`);return t?!t.writable:!1}var Qm=On({"../../node_modules/@ngard/tiny-isequal/index.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.isEqual=(function(){var e=Object.prototype.toString,t=Object.getPrototypeOf,n=Object.getOwnPropertySymbols?function(e){return Object.keys(e).concat(Object.getOwnPropertySymbols(e))}:Object.keys;return function(r,i){return(function r(i,a,o){var s,c,l,u=e.call(i),d=e.call(a);if(i===a)return!0;if(i==null||a==null)return!1;if(o.indexOf(i)>-1&&o.indexOf(a)>-1)return!0;if(o.push(i,a),u!=d||(s=n(i),c=n(a),s.length!=c.length||s.some(function(e){return!r(i[e],a[e],o)})))return!1;switch(u.slice(8,-1)){case`Symbol`:return i.valueOf()==a.valueOf();case`Date`:case`Number`:return+i==+a||+i!=+i&&+a!=+a;case`RegExp`:case`Function`:case`String`:case`Boolean`:return``+i==``+a;case`Set`:case`Map`:s=i.entries(),c=a.entries();do if(!r((l=s.next()).value,c.next().value,o))return!1;while(!l.done);return!0;case`ArrayBuffer`:i=new Uint8Array(i),a=new Uint8Array(a);case`DataView`:i=new Uint8Array(i.buffer),a=new Uint8Array(a.buffer);case`Float32Array`:case`Float64Array`:case`Int8Array`:case`Int16Array`:case`Int32Array`:case`Uint8Array`:case`Uint16Array`:case`Uint32Array`:case`Uint8ClampedArray`:case`Arguments`:case`Array`:if(i.length!=a.length)return!1;for(l=0;l<i.length;l++)if((l in i||l in a)&&(l in i!=l in a||!r(i[l],a[l],o)))return!1;return!0;case`Object`:return r(t(i),t(a),o);default:return!1}})(r,i,[])}})()}});function $m(e){return e.replace(/_/g,` `).replace(/-/g,` `).replace(/\./g,` `).replace(/([^\n])([A-Z])([a-z])/g,(e,t,n,r)=>`${t} ${n}${r}`).replace(/([a-z])([A-Z])/g,(e,t,n)=>`${t} ${n}`).replace(/([a-z])([0-9])/gi,(e,t,n)=>`${t} ${n}`).replace(/([0-9])([a-z])/gi,(e,t,n)=>`${t} ${n}`).replace(/(\s|^)(\w)/g,(e,t,n)=>`${t}${n.toUpperCase()}`).replace(/ +/g,` `).trim()}var eh=e=>$m(e),th=jn(Qm(),1),nh=e=>e.map(e=>typeof e<`u`).filter(Boolean).length,rh=(e,t)=>{let{exists:n,eq:r,neq:i,truthy:a}=e;if(nh([n,r,i,a])>1)throw Error(`Invalid conditional test ${JSON.stringify({exists:n,eq:r,neq:i})}`);if(typeof r<`u`)return(0,th.isEqual)(t,r);if(typeof i<`u`)return!(0,th.isEqual)(t,i);if(typeof n<`u`){let e=typeof t<`u`;return n?e:!e}return typeof a>`u`||a?!!t:!t},ih=(e,t,n)=>{if(!e.if)return!0;let{arg:r,global:i}=e.if;if(nh([r,i])!==1)throw Error(`Invalid conditional value ${JSON.stringify({arg:r,global:i})}`);let a=r?t[r]:n[i];return rh(e.if,a)};kn({},{argsEnhancers:()=>oh});var ah=(e,t)=>typeof t[e]>`u`&&!(e in t),oh=[e=>{let{initialArgs:t,argTypes:n,parameters:{actions:r}}=e;return r?.disable||!n?{}:Object.entries(n).filter(([e,t])=>!!t.action).reduce((e,[n,r])=>(ah(n,t)&&(e[n]=wl(typeof r.action==`string`?r.action:n)),e),{})},e=>{let{initialArgs:t,argTypes:n,id:r,parameters:{actions:i}}=e;if(!i||i.disable||!i.argTypesRegex||!n)return{};let a=new RegExp(i.argTypesRegex);return Object.entries(n).filter(([e])=>!!a.test(e)).reduce((e,[n,i])=>(ah(n,t)&&(e[n]=wl(n,{implicit:!0,id:r})),e),{})}];kn({},{loaders:()=>ch});var sh=!1,ch=[e=>{let{parameters:t}=e;t?.actions?.disable||sh||(sh=!0)}],{document:lh}=globalThis;globalThis?.matchMedia&&globalThis.matchMedia(`(prefers-reduced-motion: reduce)`)?.matches,globalThis.FEATURES?.backgrounds;var{step:uh}=Ym({step:async(e,t,n)=>t(n)},{intercept:!0}),dh={chevronLeft:[`M9.10355 10.1464C9.29882 10.3417 9.29882 10.6583 9.10355 10.8536C8.90829 11.0488 8.59171 11.0488 8.39645 10.8536L4.89645 7.35355C4.70118 7.15829 4.70118 6.84171 4.89645 6.64645L8.39645 3.14645C8.59171 2.95118 8.90829 2.95118 9.10355 3.14645C9.29882 3.34171 9.29882 3.65829 9.10355 3.85355L5.95711 7L9.10355 10.1464Z`],chevronRight:[`M4.89645 10.1464C4.70118 10.3417 4.70118 10.6583 4.89645 10.8536C5.09171 11.0488 5.40829 11.0488 5.60355 10.8536L9.10355 7.35355C9.29882 7.15829 9.29882 6.84171 9.10355 6.64645L5.60355 3.14645C5.40829 2.95118 5.09171 2.95118 4.89645 3.14645C4.70118 3.34171 4.70118 3.65829 4.89645 3.85355L8.04289 7L4.89645 10.1464Z`],info:[`M7 5.5a.5.5 0 01.5.5v4a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zM7 4.5A.75.75 0 107 3a.75.75 0 000 1.5z`,`M7 14A7 7 0 107 0a7 7 0 000 14zm0-1A6 6 0 107 1a6 6 0 000 12z`],shareAlt:[`M2 1.004a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4.5a.5.5 0 00-1 0v4.5H2v-10h4.5a.5.5 0 000-1H2z`,`M7.354 7.357L12 2.711v1.793a.5.5 0 001 0v-3a.5.5 0 00-.5-.5h-3a.5.5 0 100 1h1.793L6.646 6.65a.5.5 0 10.708.707z`]},fh=`svg,path,rect,circle,line,polyline,polygon,ellipse,text`.split(`,`),ph=(e,t={},n)=>{let r=fh.includes(e)?document.createElementNS(`http://www.w3.org/2000/svg`,e):document.createElement(e);return Object.entries(t).forEach(([e,t])=>{/[A-Z]/.test(e)?(e===`onClick`&&(r.addEventListener(`click`,t),r.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),t())})),e===`onMouseEnter`&&r.addEventListener(`mouseenter`,t),e===`onMouseLeave`&&r.addEventListener(`mouseleave`,t)):r.setAttribute(e,t)}),n?.forEach(e=>{if(!(e==null||e===!1))try{r.appendChild(e)}catch{r.appendChild(document.createTextNode(String(e)))}}),r},mh=e=>dh[e]&&ph(`svg`,{width:`14`,height:`14`,viewBox:`0 0 14 14`,xmlns:`http://www.w3.org/2000/svg`},dh[e].map(e=>ph(`path`,{fill:`currentColor`,"fill-rule":`evenodd`,"clip-rule":`evenodd`,d:e}))),hh=e=>{if(`elements`in e){let{elements:t,color:n,style:r}=e;return{id:void 0,priority:0,selectors:t,styles:{outline:`2px ${r} ${n}`,outlineOffset:`2px`,boxShadow:`0 0 0 6px rgba(255,255,255,0.6)`},menu:void 0}}let{menu:t,...n}=e;return{id:void 0,priority:0,styles:{outline:`2px dashed #029cfd`},...n,menu:Array.isArray(t)?t.every(Array.isArray)?t:[t]:void 0}},gh=e=>e instanceof Function,_h=new Map,vh=new Map,yh=new Map,bh=e=>{let t=Symbol();return vh.set(t,[]),_h.set(t,e),{get:()=>_h.get(t),set:e=>{let n=_h.get(t),r=gh(e)?e(n):e;r!==n&&(_h.set(t,r),vh.get(t)?.forEach(e=>{yh.get(e)?.(),yh.set(e,e(r))}))},subscribe:e=>(vh.get(t)?.push(e),()=>{let n=vh.get(t);n&&vh.set(t,n.filter(t=>t!==e))}),teardown:()=>{vh.get(t)?.forEach(e=>{yh.get(e)?.(),yh.delete(e)}),vh.delete(t),_h.delete(t)}}},xh=e=>{let t=document.getElementById(`storybook-root`),n=new Map;for(let r of e){let{priority:e=0}=r;for(let i of r.selectors){let a=[...document.querySelectorAll(`:is(${i}):not([id^="storybook-"], [id^="storybook-"] *, [class^="sb-"], [class^="sb-"] *)`),...t?.querySelectorAll(i)||[]];for(let t of a){let a=n.get(t);(!a||a.priority<=e)&&n.set(t,{...r,priority:e,selectors:Array.from(new Set((a?.selectors||[]).concat(i)))})}}}return n},Sh=e=>Array.from(e.entries()).map(([e,{selectors:t,styles:n,hoverStyles:r,focusStyles:i,menu:a}])=>{let{top:o,left:s,width:c,height:l}=e.getBoundingClientRect(),{position:u}=getComputedStyle(e);return{element:e,selectors:t,styles:n,hoverStyles:r,focusStyles:i,menu:a,top:u===`fixed`?o:o+window.scrollY,left:u===`fixed`?s:s+window.scrollX,width:c,height:l}}).sort((e,t)=>t.width*t.height-e.width*e.height),Ch=(e,t)=>{let n=e.getBoundingClientRect(),{x:r,y:i}=t;return n?.top&&n?.left&&r>=n.left&&r<=n.left+n.width&&i>=n.top&&i<=n.top+n.height},wh=(e,t,n)=>{if(!t||!n)return!1;let{left:r,top:i,width:a,height:o}=e;o<28&&(i-=Math.round((28-o)/2),o=28),a<28&&(r-=Math.round((28-a)/2),a=28),t.style.position===`fixed`&&(r+=window.scrollX,i+=window.scrollY);let{x:s,y:c}=n;return s>=r&&s<=r+a&&c>=i&&c<=i+o},Th=(e,t,n={})=>{let{x:r,y:i}=t,{margin:a=5,topOffset:o=0,centered:s=!1}=n,{scrollX:c,scrollY:l,innerHeight:u,innerWidth:d}=window,f=Math.min(e.style.position===`fixed`?i-l:i,u-e.clientHeight-a-o+l),p=s?e.clientWidth/2:0,m=e.style.position===`fixed`?Math.max(Math.min(r-c,d-p-a),p+a):Math.max(Math.min(r,d-p-a+c),p+a+c);Object.assign(e.style,{...m!==r&&{left:`${m}px`},...f!==i&&{top:`${f}px`}})},Eh=e=>{window.HTMLElement.prototype.hasOwnProperty(`showPopover`)&&e.showPopover()},Dh=e=>{window.HTMLElement.prototype.hasOwnProperty(`showPopover`)&&e.hidePopover()},Oh=e=>({top:e.top,left:e.left,width:e.width,height:e.height,selectors:e.selectors,element:{attributes:Object.fromEntries(Array.from(e.element.attributes).map(e=>[e.name,e.value])),localName:e.element.localName,tagName:e.element.tagName,outerHTML:e.element.outerHTML}}),kh=`storybook-highlights-menu`,Ah=`storybook-highlights-root`,jh=`storybook-root`;globalThis?.FEATURES?.highlight&&eg?.ready&&eg.ready().then(e=>{if(globalThis.__STORYBOOK_HIGHLIGHT_INITIALIZED)return;globalThis.__STORYBOOK_HIGHLIGHT_INITIALIZED=!0;let{document:t}=globalThis,n=bh([]),r=bh(new Map),i=bh([]),a=bh(),o=bh(),s=bh([]),c=bh([]),l=bh(),u=bh(),d=t.getElementById(Ah);n.subscribe(()=>{d||(d=ph(`div`,{id:Ah}),t.body.appendChild(d))}),n.subscribe(e=>{let n=t.getElementById(jh);if(!n)return;r.set(xh(e));let i=new MutationObserver(()=>r.set(xh(e)));return i.observe(n,{subtree:!0,childList:!0}),()=>{i.disconnect()}}),r.subscribe(e=>{let n=()=>requestAnimationFrame(()=>i.set(Sh(e))),r=new ResizeObserver(n);r.observe(t.body),Array.from(e.keys()).forEach(e=>r.observe(e));let a=Array.from(t.body.querySelectorAll(`*`)).filter(e=>{let{overflow:t,overflowX:n,overflowY:r}=window.getComputedStyle(e);return[`auto`,`scroll`].some(e=>[t,n,r].includes(e))});return a.forEach(e=>e.addEventListener(`scroll`,n)),()=>{r.disconnect(),a.forEach(e=>e.removeEventListener(`scroll`,n))}}),r.subscribe(e=>{let n=Array.from(e.keys()).filter(({style:e})=>e.position===`sticky`),r=()=>requestAnimationFrame(()=>{i.set(e=>e.map(e=>{if(n.includes(e.element)){let{top:t,left:n}=e.element.getBoundingClientRect();return{...e,top:t+window.scrollY,left:n+window.scrollX}}return e}))});return t.addEventListener(`scroll`,r),()=>t.removeEventListener(`scroll`,r)}),r.subscribe(e=>{s.set(t=>t.filter(({element:t})=>e.has(t)))}),s.subscribe(e=>{e.length?(u.set(t=>e.some(e=>e.element===t?.element)?t:void 0),l.set(t=>e.some(e=>e.element===t?.element)?t:void 0)):(u.set(void 0),l.set(void 0),a.set(void 0))});let f=new Map(new Map);n.subscribe(e=>{e.forEach(({keyframes:e})=>{if(e){let n=f.get(e);n||(n=t.createElement(`style`),n.setAttribute(`data-highlight`,`keyframes`),f.set(e,n),t.head.appendChild(n)),n.innerHTML=e}}),f.forEach((t,n)=>{e.some(e=>e.keyframes===n)||(t.remove(),f.delete(n))})});let p=new Map(new Map);i.subscribe(e=>{e.forEach(e=>{let t=p.get(e.element);if(d&&!t){let n={popover:`manual`,"data-highlight-dimensions":`w${e.width.toFixed(0)}h${e.height.toFixed(0)}`,"data-highlight-coordinates":`x${e.left.toFixed(0)}y${e.top.toFixed(0)}`};t=d.appendChild(ph(`div`,n,[ph(`div`)])),p.set(e.element,t)}}),p.forEach((t,n)=>{e.some(({element:e})=>e===n)||(t.remove(),p.delete(n))})}),i.subscribe(e=>{let n=e.filter(e=>e.menu);if(!n.length)return;let r=e=>{requestAnimationFrame(()=>{let r=t.getElementById(kh),i={x:e.pageX,y:e.pageY};if(r&&!Ch(r,i)){let e=n.filter(e=>wh(e,p.get(e.element),i));a.set(e.length?i:void 0),s.set(e)}})};return t.addEventListener(`click`,r),()=>t.removeEventListener(`click`,r)});let m=()=>{let e=t.getElementById(kh),n=o.get();!n||e&&Ch(e,n)||c.set(e=>{let t=i.get().filter(e=>wh(e,p.get(e.element),n)),r=e.filter(e=>t.includes(e)),a=t.filter(t=>!e.includes(t)),o=e.length-r.length;return a.length||o?[...r,...a]:e})};o.subscribe(m),i.subscribe(m);let h=()=>{let e=u.get(),t=e?[e]:s.get(),n=t.length===1?t[0]:l.get(),r=a.get()!==void 0;i.get().forEach(e=>{let i=p.get(e.element);if(i){let a=n===e,o=r?n?a:t.includes(e):c.get()?.includes(e);Object.assign(i.style,{animation:`none`,background:`transparent`,border:`none`,boxSizing:`border-box`,outline:`none`,outlineOffset:`0px`,...e.styles,...o?e.hoverStyles:{},...a?e.focusStyles:{},position:getComputedStyle(e.element).position===`fixed`?`fixed`:`absolute`,zIndex:_l-10,top:`${e.top}px`,left:`${e.left}px`,width:`${e.width}px`,height:`${e.height}px`,margin:0,padding:0,cursor:e.menu&&o?`pointer`:`default`,pointerEvents:e.menu?`auto`:`none`,display:`flex`,alignItems:`center`,justifyContent:`center`,overflow:`visible`}),Object.assign(i.children[0].style,{width:`100%`,height:`100%`,minHeight:`28px`,minWidth:`28px`,boxSizing:`content-box`,padding:i.style.outlineWidth||`0px`}),Eh(i)}})};i.subscribe(h),s.subscribe(h),c.subscribe(h),l.subscribe(h),u.subscribe(h);let g=()=>{if(!d)return;let n=t.getElementById(kh);if(n)n.innerHTML=``;else{let e={id:kh,popover:`manual`};n=d.appendChild(ph(`div`,e)),d.appendChild(ph(`style`,{},[`
            #${kh} {
              position: absolute;
              z-index: ${_l};
              width: 300px;
              padding: 0px;
              margin: 15px 0 0 0;
              transform: translateX(-50%);
              font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
              font-size: 12px;
              background: white;
              border: none;
              border-radius: 6px;
              box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.1);
              color: #2E3438;
            }
            #${kh} ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            #${kh} > ul {
              max-height: 300px;
              overflow-y: auto;
              padding: 4px 0;
            }
            #${kh} li {
              padding: 0 4px;
              margin: 0;
            }
            #${kh} li > :not(ul) {
              display: flex;
              padding: 8px;
              margin: 0;
              align-items: center;
              gap: 8px;
              border-radius: 4px;
            }
            #${kh} button {
              width: 100%;
              border: 0;
              background: transparent;
              color: inherit;
              text-align: left;
              font-family: inherit;
              font-size: inherit;
            }
            #${kh} button:focus-visible {
              outline-color: #029CFD;
            }
            #${kh} button:hover {
              background: rgba(2, 156, 253, 0.07);
              color: #029CFD;
              cursor: pointer;
            }
            #${kh} li code {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 16px;
              font-size: 11px;
            }
            #${kh} li svg {
              flex-shrink: 0;
              margin: 1px;
              color: #73828C;
            }
            #${kh} li > button:hover svg, #${kh} li > button:focus-visible svg {
              color: #029CFD;
            }
            #${kh} .element-list li svg {
              display: none;
            }
            #${kh} li.selectable svg, #${kh} li.selected svg {
              display: block;
            }
            #${kh} .menu-list {
              border-top: 1px solid rgba(38, 85, 115, 0.15);
            }
            #${kh} .menu-list > li:not(:last-child) {
              padding-bottom: 4px;
              margin-bottom: 4px;
              border-bottom: 1px solid rgba(38, 85, 115, 0.15);
            }
            #${kh} .menu-items, #${kh} .menu-items li {
              padding: 0;
            }
            #${kh} .menu-item {
              display: flex;
            }
            #${kh} .menu-item-content {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
          `]))}let r=u.get(),i=r?[r]:s.get();if(i.length&&(n.style.position=getComputedStyle(i[0].element).position===`fixed`?`fixed`:`absolute`,n.appendChild(ph(`ul`,{class:`element-list`},i.map(e=>{let t=i.length>1&&!!e.menu?.some(t=>t.some(t=>!t.selectors||t.selectors.some(t=>e.selectors.includes(t)))),n=t?{class:`selectable`,onClick:()=>u.set(e),onMouseEnter:()=>l.set(e),onMouseLeave:()=>l.set(void 0)}:r?{class:`selected`,onClick:()=>u.set(void 0)}:{},a=t||r;return ph(`li`,n,[ph(a?`button`:`div`,a?{type:`button`}:{},[r?mh(`chevronLeft`):null,ph(`code`,{},[e.element.outerHTML]),t?mh(`chevronRight`):null])])})))),u.get()||s.get().length===1){let t=u.get()||s.get()[0],r=t.menu?.filter(e=>e.some(e=>!e.selectors||e.selectors.some(e=>t.selectors.includes(e))));r?.length&&n.appendChild(ph(`ul`,{class:`menu-list`},r.map(n=>ph(`li`,{},[ph(`ul`,{class:`menu-items`},n.map(({id:n,title:r,description:i,iconLeft:a,iconRight:o,clickEvent:s})=>{let c=s&&(()=>e.emit(s,n,Oh(t)));return ph(`li`,{},[ph(c?`button`:`div`,c?{class:`menu-item`,type:`button`,onClick:c}:{class:`menu-item`},[a?mh(a):null,ph(`div`,{class:`menu-item-content`},[ph(i?`strong`:`span`,{},[r]),i&&ph(`span`,{},[i])]),o?mh(o):null])])}))]))))}let o=a.get();o?(Object.assign(n.style,{display:`block`,left:`${n.style.position===`fixed`?o.x-window.scrollX:o.x}px`,top:`${n.style.position===`fixed`?o.y-window.scrollY:o.y}px`}),Eh(n),requestAnimationFrame(()=>Th(n,o,{topOffset:15,centered:!0}))):(Dh(n),Object.assign(n.style,{display:`none`}))};s.subscribe(g),u.subscribe(g);let _=e=>{let t=hh(e);n.set(e=>{let n=t.id?e.filter(e=>e.id!==t.id):e;return t.selectors?.length?[...n,t]:n})},v=e=>{e&&n.set(t=>t.filter(t=>t.id!==e))},y=()=>{n.set([]),r.set(new Map),i.set([]),a.set(void 0),o.set(void 0),s.set([]),c.set([]),l.set(void 0),u.set(void 0)},b;t.body.addEventListener(`mousemove`,e=>{requestAnimationFrame(()=>o.set({x:e.pageX,y:e.pageY}))}),e.on(pl,_),e.on(ml,v),e.on(hl,y),e.on(gl,(e,r)=>{let i=`scrollIntoView-highlight`;clearTimeout(b),v(i);let a=t.querySelector(e);if(!a){console.warn(`Cannot scroll into view: ${e} not found`);return}a.scrollIntoView({behavior:`smooth`,block:`center`,...r});let o=`kf-${Math.random().toString(36).substring(2,15)}`;n.set(t=>[...t,{id:i,priority:1e3,selectors:[e],styles:{outline:`2px solid #1EA7FD`,outlineOffset:`-1px`,animation:`${o} 3s linear forwards`},keyframes:`@keyframes ${o} {
          0% { outline: 2px solid #1EA7FD; }
          20% { outline: 2px solid #1EA7FD00; }
          40% { outline: 2px solid #1EA7FD; }
          60% { outline: 2px solid #1EA7FD00; }
          80% { outline: 2px solid #1EA7FD; }
          100% { outline: 2px solid #1EA7FD00; }
        }`}]),b=setTimeout(()=>v(i),3500)}),e.on(jc,({newPhase:e})=>{e===`loading`&&y()})});var Mh={margin:`#f6b26b`,border:`#ffe599`,padding:`#93c47d`,content:`#6fa8dc`,text:`#232020`},Nh=6;function Ph(e,{x:t,y:n,w:r,h:i,r:a}){t-=r/2,n-=i/2,r<2*a&&(a=r/2),i<2*a&&(a=i/2),e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}function Fh(e,{padding:t,border:n,width:r,height:i,top:a,left:o}){let s=r-n.left-n.right-t.left-t.right,c=i-t.top-t.bottom-n.top-n.bottom,l=o+n.left+t.left,u=a+n.top+t.top;return e===`top`?l+=s/2:e===`right`?(l+=s,u+=c/2):e===`bottom`?(l+=s/2,u+=c):e===`left`?u+=c/2:e===`center`&&(l+=s/2,u+=c/2),{x:l,y:u}}function Ih(e,t,{margin:n,border:r,padding:i},a,o){let s=e=>0,c=0,l=0,u=o?1:.5,d=o?a*2:0;return e===`padding`?s=e=>i[e]*u+d:e===`border`?s=e=>i[e]+r[e]*u+d:e===`margin`&&(s=e=>i[e]+r[e]+n[e]*u+d),t===`top`?l=-s(`top`):t===`right`?c=s(`right`):t===`bottom`?l=s(`bottom`):t===`left`&&(c=-s(`left`)),{offsetX:c,offsetY:l}}function Lh(e,t){return Math.abs(e.x-t.x)<Math.abs(e.w+t.w)/2&&Math.abs(e.y-t.y)<Math.abs(e.h+t.h)/2}function Rh(e,t,n){return e===`top`?t.y=n.y-n.h-Nh:e===`right`?t.x=n.x+n.w/2+Nh+t.w/2:e===`bottom`?t.y=n.y+n.h+Nh:e===`left`&&(t.x=n.x-n.w/2-Nh-t.w/2),{x:t.x,y:t.y}}function zh(e,t,{x:n,y:r,w:i,h:a},o){return Ph(e,{x:n,y:r,w:i,h:a,r:3}),e.fillStyle=`${Mh[t]}dd`,e.fill(),e.strokeStyle=Mh[t],e.stroke(),e.fillStyle=Mh.text,e.fillText(o,n,r),Ph(e,{x:n,y:r,w:i,h:a,r:3}),e.fillStyle=`${Mh[t]}dd`,e.fill(),e.strokeStyle=Mh[t],e.stroke(),e.fillStyle=Mh.text,e.fillText(o,n,r),{x:n,y:r,w:i,h:a}}function Bh(e,t){e.font=`600 12px monospace`,e.textBaseline=`middle`,e.textAlign=`center`;let n=e.measureText(t),r=n.actualBoundingBoxAscent+n.actualBoundingBoxDescent;return{w:n.width+Nh*2,h:r+Nh*2}}function Vh(e,t,{type:n,position:r=`center`,text:i},a,o=!1){let{x:s,y:c}=Fh(r,t),{offsetX:l,offsetY:u}=Ih(n,r,t,Nh+1,o);s+=l,c+=u;let{w:d,h:f}=Bh(e,i);if(a&&Lh({x:s,y:c,w:d,h:f},a)){let e=Rh(r,{x:s,y:c,w:d,h:f},a);s=e.x,c=e.y}return zh(e,n,{x:s,y:c,w:d,h:f},i)}function Hh(e,{w:t,h:n}){let r=t*.5+Nh,i=n*.5+Nh;return{offsetX:(e.x===`left`?-1:1)*r,offsetY:(e.y===`top`?-1:1)*i}}function Uh(e,t,{type:n,text:r}){let{floatingAlignment:i,extremities:a}=t,o=a[i.x],s=a[i.y],{w:c,h:l}=Bh(e,r),{offsetX:u,offsetY:d}=Hh(i,{w:c,h:l});return o+=u,s+=d,zh(e,n,{x:o,y:s,w:c,h:l},r)}globalThis.FEATURES?.measure,globalThis.FEATURES?.outline;var Wh=xo({name:wo(),message:wo()}),Gh=xo({id:wo(),name:wo(),snippet:So(wo()),description:So(wo()),summary:So(wo()),error:So(Wh)});So(xo({id:wo(),name:wo(),path:wo(),import:So(wo()),stories:Co(wo(),Gh),error:So(Wh)}));var Kh=(e,t=0,n)=>{if(t>5||e==null)return e;if(Dl(e))return n&&e.mockName(n),e;if(typeof e==`function`&&`isAction`in e&&e.isAction&&!(`implicit`in e&&e.implicit)){let t=El(e);return n&&t.mockName(n),t}if(Array.isArray(e)){t++;for(let n=0;n<e.length;n++)Object.getOwnPropertyDescriptor(e,n)?.writable&&(e[n]=Kh(e[n],t));return e}if(typeof e==`object`&&e.constructor===Object){t++;for(let[n,r]of Object.entries(e))Object.getOwnPropertyDescriptor(e,n)?.writable&&(e[n]=Kh(r,t,n));return e}return e},qh=e=>e.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,`-`).replace(/-+/g,`-`).replace(/^-+/,``).replace(/-+$/,``),Jh=(e,t)=>{let n=qh(e);if(n===``)throw Error(`Invalid ${t} '${e}', must include alphanumeric characters`);return n},Yh=(e,t)=>`${Jh(e,`kind`)}${t?`--${Jh(t,`name`)}`:``}`,Xh=(...e)=>{let t=e.reduce((e,t)=>(t.startsWith(`!`)?e.delete(t.slice(1)):e.add(t),e),new Set);return Array.from(t)},Zh=class{constructor(){this.getChannel=()=>{if(this.channel)return this.channel;let e=mn();return e?(this.channel=e,this.resolve(),this.channel):vn()},this.ready=()=>this.promise,this.hasChannel=()=>!!this.channel||!!mn(),this.setChannel=e=>{this.channel=e,hn(e),this.resolve()},this.promise=new Promise(e=>{this.resolve=()=>e(this.getChannel())})}},Qh=`__STORYBOOK_ADDONS_PREVIEW`;function $h(){return globalThis[Qh]||(globalThis[Qh]=new Zh),globalThis[Qh]}var eg=$h(),tg=class{constructor(){this.hookListsMap=void 0,this.mountedDecorators=void 0,this.prevMountedDecorators=void 0,this.currentHooks=void 0,this.nextHookIndex=void 0,this.currentPhase=void 0,this.currentEffects=void 0,this.prevEffects=void 0,this.currentDecoratorName=void 0,this.hasUpdates=void 0,this.currentContext=void 0,this.renderListener=e=>{e===this.currentContext?.id&&(this.triggerEffects(),this.currentContext=null,this.removeRenderListeners())},this.init()}init(){this.hookListsMap=new WeakMap,this.mountedDecorators=new Set,this.prevMountedDecorators=new Set,this.currentHooks=[],this.nextHookIndex=0,this.currentPhase=`NONE`,this.currentEffects=[],this.prevEffects=[],this.currentDecoratorName=null,this.hasUpdates=!1,this.currentContext=null}clean(){this.prevEffects.forEach(e=>{e.destroy&&e.destroy()}),this.init(),this.removeRenderListeners()}getNextHook(){let e=this.currentHooks[this.nextHookIndex];return this.nextHookIndex+=1,e}triggerEffects(){this.prevEffects.forEach(e=>{!this.currentEffects.includes(e)&&e.destroy&&e.destroy()}),this.currentEffects.forEach(e=>{this.prevEffects.includes(e)||(e.destroy=e.create())}),this.prevEffects=this.currentEffects,this.currentEffects=[]}addRenderListeners(){this.removeRenderListeners(),eg.getChannel().on(Mc,this.renderListener)}removeRenderListeners(){eg.getChannel().removeListener(Mc,this.renderListener)}};function ng(e){let t=(...t)=>{let{hooks:n}=typeof t[0]==`function`?t[1]:t[0],r=n.currentPhase,i=n.currentHooks,a=n.nextHookIndex,o=n.currentDecoratorName;n.currentDecoratorName=e.name,n.prevMountedDecorators.has(e)?(n.currentPhase=`UPDATE`,n.currentHooks=n.hookListsMap.get(e)||[]):(n.currentPhase=`MOUNT`,n.currentHooks=[],n.hookListsMap.set(e,n.currentHooks),n.prevMountedDecorators.add(e)),n.nextHookIndex=0;let s=J.STORYBOOK_HOOKS_CONTEXT;J.STORYBOOK_HOOKS_CONTEXT=n;let c=e(...t);if(J.STORYBOOK_HOOKS_CONTEXT=s,n.currentPhase===`UPDATE`&&n.getNextHook()!=null)throw Error(`Rendered fewer hooks than expected. This may be caused by an accidental early return statement.`);return n.currentPhase=r,n.currentHooks=i,n.nextHookIndex=a,n.currentDecoratorName=o,c};return t.originalFn=e,t}var rg=0,ig=25,ag=e=>(t,n)=>{let r=e(ng(t),n.map(e=>ng(e)));return e=>{let{hooks:i}=e;i.prevMountedDecorators??=new Set,i.mountedDecorators=new Set([t,...n]),i.currentContext=e,i.hasUpdates=!1;let a=r(e);for(rg=1;i.hasUpdates;)if(i.hasUpdates=!1,i.currentEffects=[],a=r(e),rg+=1,rg>ig)throw Error(`Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.`);return i.addRenderListeners(),a}},og=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),sg=()=>Error(`Storybook preview hooks can only be called inside decorators and story functions.

When combining Storybook hooks (e.g. useArgs) with framework hooks (e.g. React's useState, useEffect, useRef) in the same render function, use Storybook's equivalents from 'storybook/preview-api' instead: useState, useEffect, useRef, useMemo, useCallback, useReducer.`);function cg(){return J.STORYBOOK_HOOKS_CONTEXT||null}function lg(){let e=cg();if(e==null)throw sg();return e}function ug(e,t,n){let r=lg();if(r.currentPhase===`MOUNT`){n!=null&&!Array.isArray(n)&&yr.warn(`${e} received a final argument that is not an array (instead, received ${n}). When specified, the final argument must be an array.`);let i={name:e,deps:n};return r.currentHooks.push(i),t(i),i}if(r.currentPhase===`UPDATE`){let i=r.getNextHook();if(i==null)throw Error(`Rendered more hooks than during the previous render.`);return i.name!==e&&yr.warn(`Storybook has detected a change in the order of Hooks${r.currentDecoratorName?` called by ${r.currentDecoratorName}`:``}. This will lead to bugs and errors if not fixed.`),n!=null&&i.deps==null&&yr.warn(`${e} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`),n!=null&&i.deps!=null&&n.length!==i.deps.length&&yr.warn(`The final argument passed to ${e} changed size between renders. The order and size of this array must remain constant.
Previous: ${i.deps}
Incoming: ${n}`),(n==null||i.deps==null||!og(n,i.deps))&&(t(i),i.deps=n),i}throw sg()}function dg(e,t,n){let{memoizedState:r}=ug(e,e=>{e.memoizedState=t()},n);return r}function fg(e,t){return dg(e,()=>({current:t}),[])}function pg(e){return fg(`useRef`,e)}function mg(e,t){let n=lg(),r=dg(`useEffect`,()=>({create:e}),t);n.currentEffects.includes(r)||n.currentEffects.push(r)}jn(Mn(),1);var hg=Symbol(`incompatible`),gg=(e,t)=>{let n=t.type;if(e==null||!n||t.mapping)return e;switch(n.name){case`string`:return String(e);case`enum`:return e;case`number`:return Number(e);case`boolean`:return String(e)===`true`;case`array`:return!n.value||!Array.isArray(e)?hg:e.reduce((e,t,r)=>{let i=gg(t,{type:n.value});return i!==hg&&(e[r]=i),e},Array(e.length));case`object`:return typeof e==`string`||typeof e==`number`?e:!n.value||typeof e!=`object`?hg:Object.entries(e).reduce((e,[t,r])=>{let i=gg(r,{type:n.value[t]});return i===hg?e:Object.assign(e,{[t]:i})},{});case`other`:return typeof e==`string`||typeof e==`number`||typeof e==`boolean`?e:hg;default:return hg}},_g=(e,t)=>Array.isArray(e)&&Array.isArray(t)?t.reduce((n,r,i)=>(n[i]=_g(e[i],t[i]),n),[...e]).filter(e=>e!==void 0):!Pn(e)||!Pn(t)?t:Object.keys({...e,...t}).reduce((n,r)=>{if(r in t){let i=_g(e[r],t[r]);i!==void 0&&(n[r]=i)}else n[r]=e[r];return n},{}),vg=Symbol(`Deeply equal`),yg=(e,t)=>{if(typeof e!=typeof t)return t;if(fr(e,t))return vg;if(Array.isArray(e)&&Array.isArray(t)){let n=t.reduce((t,n,r)=>{let i=yg(e[r],n);return i!==vg&&(t[r]=i),t},Array(t.length));return t.length>=e.length?n:n.concat(Array(e.length-t.length).fill(void 0))}return Pn(e)&&Pn(t)?Object.keys({...e,...t}).reduce((n,r)=>{let i=yg(e?.[r],t?.[r]);return i===vg?n:Object.assign(n,{[r]:i})},{}):t},bg=`UNTARGETED`;function xg({args:e,argTypes:t}){let n={};return Object.entries(e).forEach(([e,r])=>{let{target:i=bg}=t[e]||{};n[i]=n[i]||{},n[i][e]=r}),n}var Sg=(e={})=>Object.entries(e).reduce((e,[t,{defaultValue:n}])=>(typeof n<`u`&&(e[t]=n),e),{});(0,jn(Mn(),1).default)(1)(e=>Object.values(e).reduce((e,t)=>(e[t.importPath]=e[t.importPath]||t,e),{}));var Cg=e=>typeof e==`string`?{name:e}:e,wg=e=>typeof e==`string`?{type:e,disable:!1}:e&&typeof e==`object`&&`type`in e&&!(`disable`in e)?{...e,disable:!1}:e,Tg=(e,t)=>{let{type:n,control:r,...i}=e,a={name:t,...i};return n&&(a.type=Cg(n)),r?a.control=wg(r):r===!1&&(a.control={disable:!0}),a},Eg=e=>pr(e,Tg),Dg=e=>Array.isArray(e)?e:e?[e]:[],Og=hr`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;function kg(e,t,n){let r=t,i=typeof t==`function`?t:null,{story:a}=r;a&&(yr.debug(`deprecated story`,a),Sr(Og));let o=eh(e),s=typeof r!=`function`&&r.name||r.storyName||a?.name||o,c=[...Dg(r.decorators),...Dg(a?.decorators)],l={...a?.parameters,...r.parameters},u={...a?.args,...r.args},d={...a?.argTypes,...r.argTypes},f=[...Dg(r.loaders),...Dg(a?.loaders)],p=[...Dg(r.beforeEach),...Dg(a?.beforeEach)],m=[...Dg(r.afterEach),...Dg(a?.afterEach)],{render:h,play:g,tags:_=[],globals:v={}}=r;return{moduleExport:t,id:l.__id||Yh(n.id,o),name:s,tags:_,decorators:c,parameters:l,args:u,argTypes:Eg(d),loaders:f,beforeEach:p,afterEach:m,globals:v,...h&&{render:h},...i&&{userStoryFn:i},...g&&{play:g}}}function Ag(e,t=e.title,n){let{id:r,argTypes:i}=e;return{id:qh(r||t),...e,title:t,...i&&{argTypes:Eg(i)},parameters:{fileName:n,...e.parameters}}}function jg(e){return e!=null&&Mg(e).includes(`mount`)}function Mg(e){let[,t,n]=e.toString().match(/[^(]*\(([^)]+)\)(?:.*{([^]+)})?/)||[];if(!t)return[];let[r]=Pg(t);if(!r)return[];let[,i]=r.match(/^{([^]+)}$/)||[];if(i)return Pg(Ng(i)).map(e=>e.replace(/:.*|=.*/g,``).trim());if(!r.match(/^[a-z_$][0-9a-z_$]*$/i))return[];let a=r.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),[,o]=n?.trim()?.match(RegExp(`^(?:const|let|var)\\s*{([^}]+)}\\s*=\\s*${a};`))||[];return o?Pg(Ng(o)).map(e=>e.replace(/:.*|=.*/g,``).trim()):[]}function Ng(e){return e=e.replace(/\/\/.*$/gm,``),e=e.replace(/\/\*[\s\S]*?\*\//g,``),e}function Pg(e){let t=[],n=[],r=0;for(let i=0;i<e.length;i++)if(e[i]===`{`||e[i]===`[`)n.push(e[i]===`{`?`}`:`]`);else if(e[i]===n[n.length-1])n.pop();else if(!n.length&&e[i]===`,`){let n=e.substring(r,i).trim();n&&t.push(n),r=i+1}let i=e.substring(r).trim();return i&&t.push(i),t}function Fg(e,t,n){let r=n(e);return e=>t(r,e)}function Ig({componentId:e,title:t,kind:n,id:r,name:i,story:a,parameters:o,initialArgs:s,argTypes:c,...l}={}){return l}function Lg(e,t){let n={},r=e=>t=>{if(!n.value)throw Error(`Decorated function called without init`);return n.value={...n.value,...Ig(t)},e(n.value)},i=t.reduce((e,t)=>Fg(e,t,r),e);return e=>(n.value=e,i(e))}function Rg(e,t,n){let{moduleExport:r,id:i,name:a}=e||{},o=zg(e,t,n),s=async r=>{let i={};for(let a of[Dg(n.loaders),Dg(t.loaders),Dg(e.loaders)]){if(r.abortSignal.aborted)return i;let e=await Promise.all(a.map(e=>e(r)));Object.assign(i,...e)}return i},c=async r=>{let i=[];for(let a of[...Dg(n.beforeEach),...Dg(t.beforeEach),...Dg(e.beforeEach)]){if(r.abortSignal.aborted)return i;let e=await a(r);e&&i.push(e)}return i},l=async r=>{let i=[...Dg(n.afterEach),...Dg(t.afterEach),...Dg(e.afterEach)].reverse();for(let e of i){if(r.abortSignal.aborted)return;await e(r)}},u=e=>e.originalStoryFn(e.args,e),{applyDecorators:d=Lg,runStep:f}=n,p=[...Dg(e?.decorators),...Dg(t?.decorators),...Dg(n?.decorators)],m=e?.userStoryFn||e?.render||t.render||n.render,h=ag(d)(u,p),g=e=>h(e),_=e?.play??t?.play,v=jg(_);if(!m&&!v)throw new Lr({id:i});let y=e.mount??t.mount??n.mount??(e=>async()=>(await e.renderToCanvas(),e.canvas)),b=n.testingLibraryRender;return{storyGlobals:{},...o,moduleExport:r,id:i,name:a,story:a,originalStoryFn:m,undecoratedStoryFn:u,unboundStoryFn:g,applyLoaders:s,applyBeforeEach:c,applyAfterEach:l,playFunction:_,runStep:f,mount:y,testingLibraryRender:b,renderToCanvas:n.renderToCanvas,usesMount:v}}function zg(e,t,n){let r=[yn.DEV,yn.TEST],i=J.DOCS_OPTIONS?.autodocs===!0?[yn.AUTODOCS]:[],a=e?.tags?.includes(yn.TEST_FN)?[`!${yn.AUTODOCS}`]:[],o=Xh(...r,...i,...n.tags??[],...t.tags??[],...a,...e?.tags??[]),s=wr(n.parameters,t.parameters,e?.parameters),{argTypesEnhancers:c=[],argsEnhancers:l=[]}=n,u=wr(n.argTypes,t.argTypes,e?.argTypes);if(e){let r=e?.userStoryFn||e?.render||t.render||n.render;s.__isArgsStory=r&&r.length>0}let d={...n.args,...t.args,...e?.args},f={...t.globals,...e?.globals},p={componentId:t.id,title:t.title,kind:t.title,id:e?.id||t.id,name:e?.name||`__meta`,story:e?.name||`__meta`,component:t.component,subcomponents:t.subcomponents,tags:o,parameters:s,initialArgs:d,argTypes:u,storyGlobals:f};p.argTypes=c.filter(e=>!(J.FEATURES?.experimentalDocgenServer&&e.secondPass)).reduce((e,t)=>t({...p,argTypes:e}),p.argTypes);let m={...d};p.initialArgs=[...l].reduce((e,t)=>({...e,...t({...p,initialArgs:e})}),m);let{name:h,story:g,..._}=p;return _}function Bg(e){let{args:t}=e,n={...e,allArgs:void 0,argsByTarget:void 0};if(J.FEATURES?.argTypeTargetsV7){let t=xg(e);n={...e,allArgs:e.args,argsByTarget:t,args:t[bg]||{}}}let r=Object.entries(n.args).reduce((e,[t,r])=>{if(!n.argTypes[t]?.mapping)return e[t]=r,e;let i=e=>{let r=n.argTypes[t].mapping;return r&&e in r?r[e]:e};return e[t]=Array.isArray(r)?r.map(i):i(r),e},{}),i=Object.entries(r).reduce((e,[t,i])=>(ih(n.argTypes[t]||{},r,n.globals)&&(e[t]=i),e),{});return{...n,unmappedArgs:t,args:i}}function Vg({argTypes:e,argTypesEnhancers:t,decorators:n,loaders:r,beforeEach:i,afterEach:a,initialGlobals:o,...s}){return{...e&&{argTypes:Eg(e)},decorators:Dg(n),loaders:Dg(r),beforeEach:Dg(i),afterEach:Dg(a),argTypesEnhancers:[...t||[],Ar,Or],initialGlobals:o,...s}}var Hg=e=>async()=>{let t=[];for(let n of e){let e=await n();e&&t.unshift(e)}return async()=>{for(let e of t)await e()}};function Ug(e){return async(t,n,r)=>{await e.reduceRight((e,n)=>async()=>n(t,e,r),async()=>n(r))()}}function Wg(e,t){return e.map(e=>e.default?.[t]??e[t]).filter(Boolean)}function Gg(e,t,n={}){return Wg(e,t).reduce((e,t)=>{let r=Dg(t);return n.reverseFileOrder?[...r,...e]:[...e,...r]},[])}function Kg(e,t){return Object.assign({},...Wg(e,t))}function qg(e,t){return Wg(e,t).pop()}function Jg(e){let t=Gg(e,`argTypesEnhancers`),n=Wg(e,`runStep`),r=Gg(e,`beforeAll`);return{parameters:wr(...Wg(e,`parameters`)),decorators:Gg(e,`decorators`,{reverseFileOrder:!(J.FEATURES?.legacyDecoratorFileOrder??!1)}),args:Kg(e,`args`),argsEnhancers:Gg(e,`argsEnhancers`),argTypes:Kg(e,`argTypes`),argTypesEnhancers:[...t.filter(e=>!e.secondPass),...t.filter(e=>e.secondPass)],initialGlobals:Kg(e,`initialGlobals`),globalTypes:Kg(e,`globalTypes`),loaders:Gg(e,`loaders`),beforeAll:Hg(r),beforeEach:Gg(e,`beforeEach`),afterEach:Gg(e,`afterEach`),render:qg(e,`render`),renderToCanvas:qg(e,`renderToCanvas`),applyDecorators:qg(e,`applyDecorators`),runStep:Ug(n),tags:Gg(e,`tags`),mount:qg(e,`mount`),testingLibraryRender:qg(e,`testingLibraryRender`)}}var Yg=class{constructor(){this.reports=[]}async addReport(e){this.reports.push(e)}},Xg=`ComposedStory`,Zg=`Unnamed Story`,Qg=[];function $g(e,t,n,r,i){if(e===void 0)throw Error(`Expected a story but received undefined.`);t.title=t.title??Xg;let a=Ag(t),o=i||e.storyName||e.story?.name||e.name||Zg,s=kg(o,e,a),c=Vg(Jg([r??globalThis.globalProjectAnnotations??{},n??{}])),l=Rg(s,a,c),u={...Sg(c.globalTypes),...c.initialGlobals,...l.storyGlobals},d=new Yg,f=()=>{let e=Bg({hooks:new tg,globals:u,args:{...l.initialArgs},viewMode:`story`,reporting:d,loaded:{},abortSignal:new AbortController().signal,step:(t,n)=>l.runStep(t,n,e),canvasElement:null,canvas:{},userEvent:{},globalTypes:c.globalTypes,...l,context:null,mount:null});return e.parameters.__isPortableStory=!0,e.context=e,l.renderToCanvas&&(e.renderToCanvas=async()=>{let t=await l.renderToCanvas?.({componentId:l.componentId,title:l.title,id:l.id,name:l.name,tags:l.tags,showMain:()=>{},showError:e=>{throw Error(`${e.title}
${e.description}`)},showException:e=>{throw e},forceRemount:!0,storyContext:e,storyFn:()=>l.unboundStoryFn(e),unboundStoryFn:l.unboundStoryFn},e.canvasElement);t&&Qg.push(t);let n=e.hooks;Qg.push(()=>n.clean()),n.renderListener(e.id)}),e.mount=l.mount(e),e},p,m=async e=>{let t=f();return t.canvasElement??=globalThis?.document?.body,p&&(t.loaded=p.loaded),Object.assign(t,e),l.playFunction(t)},h=e=>{let t=f();return Object.assign(t,e),e_(l,t)},g=l.playFunction?m:void 0;return Object.assign(function(e){let t=f();return p&&(t.loaded=p.loaded),t.args={...t.initialArgs,...e},l.unboundStoryFn(t)},{id:l.id,storyName:o,load:async()=>{for(let e of[...Qg].reverse())await e();Qg.length=0;let e=f();e.loaded=await l.applyLoaders(e),Qg.push(...(await l.applyBeforeEach(e)).filter(Boolean)),p=e},globals:u,args:l.initialArgs,parameters:l.parameters,argTypes:l.argTypes,play:g,run:h,reporting:d,tags:l.tags})}async function e_(e,t){for(let e of[...Qg].reverse())await e();if(Qg.length=0,!t.canvasElement){let e=document.createElement(`div`);globalThis?.document?.body?.appendChild(e),t.canvasElement=e,Qg.push(()=>{globalThis?.document?.body?.contains(e)&&globalThis?.document?.body?.removeChild(e)})}if(t.loaded=await e.applyLoaders(t),t.abortSignal.aborted)return;Qg.push(...(await e.applyBeforeEach(t)).filter(Boolean));let n=e.playFunction,r=e.usesMount;if(r||await t.mount(),t.abortSignal.aborted)return;n&&(r||(t.mount=async()=>{throw new Ir({playFunction:n.toString()})}),await n(t));let i;rn()?i=an():await on(t.abortSignal),await e.applyAfterEach(t),await i?.()}var{AbortController:t_}=globalThis,{fetch:n_}=J,r_=new Set([`area`,`base`,`body`,`head`,`link`,`map`,`meta`,`nobr`,`optgroup`,`option`,`script`,`style`,`template`,`title`,`track`,`wbr`]);`${Array.from(r_).map(e=>`:not(${e})`).join(``)}`;var{history:i_,document:a_}=J,o_=jn(Va(),1),{document:s_}=J,c_=(e=>(e.MAIN=`MAIN`,e.NOPREVIEW=`NOPREVIEW`,e.PREPARING_STORY=`PREPARING_STORY`,e.PREPARING_DOCS=`PREPARING_DOCS`,e.ERROR=`ERROR`,e))(c_||{});new o_.default({escapeXML:!0});var{document:l_}=J;async function u_(e,t){let n=t.parameters?.docs?.source?.transform,{id:r,unmappedArgs:i}=t,a=n&&e?n?.(e,t):e,o=a?await a:void 0;eg.getChannel().emit(Aa,{id:r,source:o,args:i})}var d_=(e,t)=>Lg(t=>q.createElement(e,t),t),f_=Object.create,p_=Object.defineProperty,m_=Object.getOwnPropertyDescriptor,h_=Object.getOwnPropertyNames,g_=Object.getPrototypeOf,__=Object.prototype.hasOwnProperty,v_=(e,t)=>function(){try{return t||(0,e[h_(e)[0]])((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},y_=(e,t)=>{for(var n in t)p_(e,n,{get:t[n],enumerable:!0})},b_=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(let i of h_(t))!__.call(e,i)&&i!==n&&p_(e,i,{get:()=>t[i],enumerable:!(r=m_(t,i))||r.enumerable});return e},x_=(e,t,n)=>(n=e==null?{}:f_(g_(e)),b_(t||!e||!e.__esModule?p_(n,`default`,{value:e,enumerable:!0}):n,e)),S_={};y_(S_,{applyDecorators:()=>d_,beforeAll:()=>L_,decorators:()=>F_,mount:()=>P_,parameters:()=>I_,render:()=>E_,renderToCanvas:()=>N_}),{...q};function C_(e){globalThis.IS_REACT_ACT_ENVIRONMENT=e}function w_(){return globalThis.IS_REACT_ACT_ENVIRONMENT}var T_=async({disableAct:e=!1}={})=>e=>e(),E_=(e,t)=>{let{id:n,component:r}=t;if(!r)throw Error(`Unable to render story ${n} as the component annotation is missing from the default export`);return q.createElement(r,{...e})},{FRAMEWORK_OPTIONS:D_}=J,O_=class extends q.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidMount(){let{hasError:e}=this.state,{showMain:t}=this.props;e||t()}componentDidCatch(e){let{showException:t}=this.props;t(e)}render(){let{hasError:e}=this.state,{children:t}=this.props;return e?null:t}},k_=D_?.strictMode?q.StrictMode:q.Fragment,A_=[],j_=!1,M_=async()=>{if(j_||A_.length===0)return;j_=!0;let e=A_.shift();e&&await e(),j_=!1,M_()};async function N_({storyContext:e,unboundStoryFn:t,showMain:n,showException:r,forceRemount:i},a){let{renderElement:o,unmountElement:s}=await ye(async()=>{let{renderElement:e,unmountElement:t}=await import(`../chunks/chunk-JTTtZPr_2.js`);return{renderElement:e,unmountElement:t}},__vite__mapDeps([0,1,2,3,4,5,6,7,8])),c=t,l=e.parameters.__isPortableStory?q.createElement(c,{...e}):q.createElement(O_,{key:e.id,showMain:n,showException:r},q.createElement(c,{...e})),u=k_?q.createElement(k_,null,l):l;i&&s(a);let d=await T_({disableAct:e.viewMode===`docs`});return await new Promise(async(t,n)=>{A_.push(async()=>{try{await d(async()=>{await o(u,a,e?.parameters?.react?.rootOptions)}),t()}catch(e){n(e)}}),M_()}),async()=>{await d(()=>{s(a)})}}var P_=e=>async t=>(t!=null&&(e.originalStoryFn=()=>t),await e.renderToCanvas(),e.canvas),F_=[(e,t)=>{if(!t.parameters?.react?.rsc)return e();let[n,r]=`19.2.8`.split(`.`).map(e=>parseInt(e,10));if(!Number.isInteger(n)||!Number.isInteger(r))throw Error(`Unable to parse React version`);if(n<18||n===18&&r<3)throw Error(`React Server Components require React >= 18.3`);return q.createElement(q.Suspense,null,e())},(e,t)=>{if(t.tags?.includes(yn.TEST_FN)&&!J.FEATURES?.experimentalTestSyntax)throw Error(`To use the experimental test function, you must enable the experimentalTestSyntax feature flag. See https://storybook.js.org/docs/api/main-config/main-config-features#experimentaltestsyntax`);return e()}],I_={renderer:`react`},L_=async()=>{try{let e=await T_();Ol({unstable_advanceTimersWrapper:t=>e(t),asyncWrapper:async e=>{let t=w_();C_(!1);try{let t=await e();return await new Promise(e=>{setTimeout(()=>{e()},0);let t=R_(globalThis);t&&t.advanceTimersByTime(0)}),t}finally{C_(t)}},eventWrapper:t=>{let n;return e(()=>(n=t(),n)),n}})}catch{}};function R_(e){let t=Reflect.get(e,`jest`);return t==null?void 0:setTimeout._isMockFunction===!0||Object.prototype.hasOwnProperty.call(setTimeout,`clock`)?t:void 0}var z_=v_({"../../../node_modules/@base2/pretty-print-object/dist/index.js"(e){var t=e&&e.__assign||function(){return t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},t.apply(this,arguments)},n=e&&e.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),i=0,t=0;t<n;t++)for(var a=arguments[t],o=0,s=a.length;o<s;o++,i++)r[i]=a[o];return r};Object.defineProperty(e,"__esModule",{value:!0});var r=[];function i(e){var t=typeof e;return e!==null&&(t===`object`||t===`function`)}function a(e){return Object.prototype.toString.call(e)===`[object RegExp]`}function o(e){return Object.getOwnPropertySymbols(e).filter(function(t){return Object.prototype.propertyIsEnumerable.call(e,t)})}function s(e,c,l){l===void 0&&(l=``);var u=t(t({},{indent:`	`,singleQuotes:!0}),c),d=u.inlineCharacterLimit===void 0?{newLine:`
`,newLineOrSpace:`
`,pad:l,indent:l+u.indent}:{newLine:`@@__PRETTY_PRINT_NEW_LINE__@@`,newLineOrSpace:`@@__PRETTY_PRINT_NEW_LINE_OR_SPACE__@@`,pad:`@@__PRETTY_PRINT_PAD__@@`,indent:`@@__PRETTY_PRINT_INDENT__@@`},f=function(e){if(u.inlineCharacterLimit===void 0)return e;var t=e.replace(new RegExp(d.newLine,`g`),``).replace(new RegExp(d.newLineOrSpace,`g`),` `).replace(RegExp(d.pad+`|`+d.indent,`g`),``);return t.length<=u.inlineCharacterLimit?t:e.replace(RegExp(d.newLine+`|`+d.newLineOrSpace,`g`),`
`).replace(new RegExp(d.pad,`g`),l).replace(new RegExp(d.indent,`g`),l+u.indent)};if(r.indexOf(e)!==-1)return`"[Circular]"`;if(e==null||typeof e==`number`||typeof e==`boolean`||typeof e==`function`||typeof e==`symbol`||a(e))return String(e);if(e instanceof Date)return`new Date('`+e.toISOString()+`')`;if(Array.isArray(e)){if(e.length===0)return`[]`;r.push(e);var p=`[`+d.newLine+e.map(function(t,n){var r=e.length-1===n?d.newLine:`,`+d.newLineOrSpace,i=s(t,u,l+u.indent);return u.transform&&(i=u.transform(e,n,i)),d.indent+i+r}).join(``)+d.pad+`]`;return r.pop(),f(p)}if(i(e)){var m=n(Object.keys(e),o(e));if(u.filter&&(m=m.filter(function(t){return u.filter&&u.filter(e,t)})),m.length===0)return`{}`;r.push(e);var p=`{`+d.newLine+m.map(function(t,n){var r=m.length-1===n?d.newLine:`,`+d.newLineOrSpace,i=typeof t==`symbol`,a=!i&&/^[a-z$_][a-z$_0-9]*$/i.test(t.toString()),o=i||a?t:s(t,u),c=s(e[t],u,l+u.indent);return u.transform&&(c=u.transform(e,t,c)),d.indent+String(o)+`: `+c+r}).join(``)+d.pad+`}`;return r.pop(),f(p)}return e=String(e).replace(/[\r\n]/g,function(e){return e===`
`?`\\n`:`\\r`}),u.singleQuotes?(e=e.replace(/\\?'/g,`\\'`),`'`+e+`'`):(e=e.replace(/"/g,`\\"`),`"`+e+`"`)}e.prettyPrint=s}}),B_=v_({"../../../node_modules/react-element-to-jsx-string/node_modules/react-is/cjs/react-is.production.min.js"(e){var t=Symbol.for(`react.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.provider`),s=Symbol.for(`react.context`),c=Symbol.for(`react.server_context`),l=Symbol.for(`react.forward_ref`),u=Symbol.for(`react.suspense`),d=Symbol.for(`react.suspense_list`),f=Symbol.for(`react.memo`),p=Symbol.for(`react.lazy`),m=Symbol.for(`react.offscreen`),h=Symbol.for(`react.module.reference`);function g(e){if(typeof e==`object`&&e){var m=e.$$typeof;switch(m){case t:switch(e=e.type,e){case r:case a:case i:case u:case d:return e;default:switch(e&&=e.$$typeof,e){case c:case s:case l:case p:case f:case o:return e;default:return m}}case n:return m}}}e.ContextConsumer=s,e.ContextProvider=o,e.Element=t,e.ForwardRef=l,e.Fragment=r,e.Lazy=p,e.Memo=f,e.Portal=n,e.Profiler=a,e.StrictMode=i,e.Suspense=u,e.SuspenseList=d,e.isAsyncMode=function(){return!1},e.isConcurrentMode=function(){return!1},e.isContextConsumer=function(e){return g(e)===s},e.isContextProvider=function(e){return g(e)===o},e.isElement=function(e){return typeof e==`object`&&!!e&&e.$$typeof===t},e.isForwardRef=function(e){return g(e)===l},e.isFragment=function(e){return g(e)===r},e.isLazy=function(e){return g(e)===p},e.isMemo=function(e){return g(e)===f},e.isPortal=function(e){return g(e)===n},e.isProfiler=function(e){return g(e)===a},e.isStrictMode=function(e){return g(e)===i},e.isSuspense=function(e){return g(e)===u},e.isSuspenseList=function(e){return g(e)===d},e.isValidElementType=function(e){return typeof e==`string`||typeof e==`function`||e===r||e===a||e===i||e===u||e===d||e===m||typeof e==`object`&&!!e&&(e.$$typeof===p||e.$$typeof===f||e.$$typeof===o||e.$$typeof===s||e.$$typeof===l||e.$$typeof===h||e.getModuleId!==void 0)},e.typeOf=g}}),V_=v_({"../../../node_modules/react-element-to-jsx-string/node_modules/react-is/index.js"(e,t){t.exports=B_()}}),H_=e=>e.$$typeof===Symbol.for(`react.memo`),U_=e=>e.$$typeof===Symbol.for(`react.forward_ref`);function W_(e){return Object.prototype.toString.call(e)===`[object Object]`}function G_(e){var t,n;return W_(e)===!1?!1:(t=e.constructor,t===void 0?!0:(n=t.prototype,!(W_(n)===!1||n.hasOwnProperty(`isPrototypeOf`)===!1)))}var K_=x_(z_()),q_=x_(V_()),J_=(function(e,t){return e===0?``:Array(e*t).fill(` `).join(``)});function Y_(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function X_(e){if(Array.isArray(e))return Y_(e)}function Z_(e,t,n){return(t=iv(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Q_(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function $_(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ev(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function tv(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ev(Object(n),!0).forEach(function(t){Z_(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ev(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function nv(e){return X_(e)||Q_(e)||ov(e)||$_()}function rv(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function iv(e){var t=rv(e,`string`);return typeof t==`symbol`?t:t+``}function av(e){"@babel/helpers - typeof";return av=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},av(e)}function ov(e,t){if(e){if(typeof e==`string`)return Y_(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y_(e,t):void 0}}function sv(e,t){if(e===null||av(e)!==`object`||e instanceof Date||e instanceof RegExp)return e;if(q.isValidElement(e)){var n=tv({},e);return delete n._owner,n}return t.add(e),Array.isArray(e)?e.map(function(e){return sv(e,t)}):Object.keys(e).sort().reduce(function(n,r){return r===`current`||t.has(e[r])?n[r]=`[Circular]`:n[r]=sv(e[r],t),n},{})}function cv(e){return sv(e,new WeakSet)}var lv=function(e){return{type:`string`,value:e}},uv=function(e){return{type:`number`,value:e}},dv=function(e,t,n,r){return{type:`ReactElement`,displayName:e,props:t,defaultProps:n,childrens:r}},fv=function(e,t){return{type:`ReactFragment`,key:e,childrens:t}},pv=!!q.Fragment,mv=function(e){return!e.name||e.name===`_default`?`No Display Name`:e.name},hv=function(e){switch(!0){case!!e.displayName:return e.displayName;case e.$$typeof===q_.Memo:return hv(e.type);case e.$$typeof===q_.ForwardRef:return hv(e.render);default:return mv(e)}},gv=function(e){switch(!0){case typeof e.type==`string`:return e.type;case typeof e.type==`function`:return e.type.displayName?e.type.displayName:mv(e.type);case(0,q_.isForwardRef)(e):case(0,q_.isMemo)(e):return hv(e.type);case(0,q_.isContextConsumer)(e):return`${e.type._context.displayName||`Context`}.Consumer`;case(0,q_.isContextProvider)(e):return`${e.type._context.displayName||`Context`}.Provider`;case(0,q_.isLazy)(e):return`Lazy`;case(0,q_.isProfiler)(e):return`Profiler`;case(0,q_.isStrictMode)(e):return`StrictMode`;case(0,q_.isSuspense)(e):return`Suspense`;default:return`UnknownElementType`}},_v=function(e,t){return t!==`children`},vv=function(e){return e!==!0&&e!==!1&&e!==null&&e!==``},yv=function(e,t){var n={};return Object.keys(e).filter(function(n){return t(e[n],n)}).forEach(function(t){return n[t]=e[t]}),n},bv=function(e,t){var n=t.displayName,r=n===void 0?gv:n;if(typeof e==`string`)return lv(e);if(typeof e==`number`)return uv(e);if(!q.isValidElement(e))throw Error(`react-element-to-jsx-string: Expected a React.Element, got \`${av(e)}\``);var i=r(e),a=yv(e.props,_v);e.ref!==null&&(a.ref=e.ref);var o=e.key;typeof o==`string`&&o.search(/^\./)&&(a.key=o);var s=yv(e.type.defaultProps||{},_v),c=q.Children.toArray(e.props.children).filter(vv).map(function(e){return bv(e,t)});return pv&&e.type===q.Fragment?fv(o,c):dv(i,a,s,c)};function xv(){}var Sv=function(e){return e.toString().split(`
`).map(function(e){return e.trim()}).join(``)},Cv=(function(e,t){var n=t.functionValue,r=n===void 0?Sv:n,i=t.showFunctions;return r(!i&&r===Sv?xv:e)}),wv=(function(e,t,n,r){var i=cv(e),a=(0,K_.prettyPrint)(i,{transform:function(e,t,i){var a=e[t];return a&&(0,q.isValidElement)(a)?Jv(bv(a,r),!0,n,r):typeof a==`function`?Cv(a,r):i}});return t?a.replace(/\s+/g,` `).replace(/{ /g,`{`).replace(/ }/g,`}`).replace(/\[ /g,`[`).replace(/ ]/g,`]`):a.replace(/\t/g,J_(1,r.tabStop)).replace(/\n([^$])/g,`
${J_(n+1,r.tabStop)}\$1`)}),Tv=function(e){return e.replace(/"/g,`&quot;`)},Ev=function(e,t,n,r){if(typeof e==`number`)return`{${String(e)}}`;if(typeof e==`string`)return`"${Tv(e)}"`;if(av(e)===`symbol`){var i=e.valueOf().toString().replace(/Symbol\((.*)\)/,`$1`);return i?`{Symbol('${i}')}`:`{Symbol()}`}return typeof e==`function`?`{${Cv(e,r)}}`:(0,q.isValidElement)(e)?`{${Jv(bv(e,r),!0,n,r)}}`:e instanceof Date?isNaN(e.valueOf())?`{new Date(NaN)}`:`{new Date("${e.toISOString()}")}`:G_(e)||Array.isArray(e)?`{${wv(e,t,n,r)}}`:`{${String(e)}}`},Dv=(function(e,t,n,r,i,a,o,s){if(!t&&!r)throw Error(`The prop "${e}" has no value and no default: could not be formatted`);var c=t?n:i,l=s.useBooleanShorthandSyntax,u=s.tabStop,d=Ev(c,a,o,s),f=` `,p=`
${J_(o+1,u)}`,m=d.includes(`
`);return l&&d===`{true}`?(f+=`${e}`,p+=`${e}`):(f+=`${e}=${d}`,p+=`${e}=${d}`),{attributeFormattedInline:f,attributeFormattedMultiline:p,isMultilineAttribute:m}}),Ov=(function(e,t){var n=e.slice(0,e.length>0?e.length-1:0),r=e[e.length-1];return r&&(t.type===`string`||t.type===`number`)&&(r.type===`string`||r.type===`number`)?n.push(lv(String(r.value)+String(t.value))):(r&&n.push(r),n.push(t)),n}),kv=function(e){return[`key`,`ref`].includes(e)},Av=(function(e){return function(t){var n=t.includes(`key`),r=t.includes(`ref`),i=t.filter(function(e){return!kv(e)}),a=nv(e?i.sort():i);return r&&a.unshift(`ref`),n&&a.unshift(`key`),a}});function jv(e,t){return Array.isArray(t)?function(e){return t.indexOf(e)===-1}:function(n){return t(e[n],n)}}var Mv=function(e,t,n,r,i){var a=i.tabStop;return e.type===`string`?t.split(`
`).map(function(e,t){return t===0?e:`${J_(r,a)}${e}`}).join(`
`):t},Nv=function(e,t,n){return function(r){return Mv(r,Jv(r,e,t,n),e,t,n)}},Pv=function(e,t){return function(n){var r=Object.keys(e).includes(n);return!r||r&&e[n]!==t[n]}},Fv=function(e,t,n,r,i){return i?J_(n,r).length+t.length>i:e.length>1},Iv=function(e,t,n,r,i,a,o){return(Fv(e,t,i,a,o)||n)&&!r},Lv=(function(e,t,n,r){var i=e.type,a=e.displayName,o=a===void 0?``:a,s=e.childrens,c=e.props,l=c===void 0?{}:c,u=e.defaultProps,d=u===void 0?{}:u;if(i!==`ReactElement`)throw Error(`The "formatReactElementNode" function could only format node of type "ReactElement". Given:  ${i}`);var f=r.filterProps,p=r.maxInlineAttributesLineLength,m=r.showDefaultProps,h=r.sortProps,g=r.tabStop,_=`<${o}`,v=_,y=_,b=!1,x=[],S=jv(l,f);Object.keys(l).filter(S).filter(Pv(d,l)).forEach(function(e){return x.push(e)}),Object.keys(d).filter(S).filter(function(){return m}).filter(function(e){return!x.includes(e)}).forEach(function(e){return x.push(e)});var C=Av(h)(x);if(C.forEach(function(e){var i=Dv(e,Object.keys(l).includes(e),l[e],Object.keys(d).includes(e),d[e],t,n,r),a=i.attributeFormattedInline,o=i.attributeFormattedMultiline;i.isMultilineAttribute&&(b=!0),v+=a,y+=o}),y+=`
${J_(n,g)}`,_=Iv(C,v,b,t,n,g,p)?y:v,s&&s.length>0){var w=n+1;_+=`>`,t||(_+=`
`,_+=J_(w,g)),_+=s.reduce(Ov,[]).map(Nv(t,w,r)).join(t?``:`
${J_(w,g)}`),t||(_+=`
`,_+=J_(w-1,g)),_+=`</${o}>`}else Fv(C,v,n,g,p)||(_+=` `),_+=`/>`;return _}),Rv=``,zv=`React.Fragment`,Bv=function(e,t,n){var r={};return t&&(r={key:t}),{type:`ReactElement`,displayName:e,props:r,defaultProps:{},childrens:n}},Vv=function(e){return!!e.key},Hv=function(e){return e.childrens.length===0},Uv=(function(e,t,n,r){var i=e.type,a=e.key,o=e.childrens;if(i!==`ReactFragment`)throw Error(`The "formatReactFragmentNode" function could only format node of type "ReactFragment". Given: ${i}`);var s=r.useFragmentShortSyntax,c;return c=s?Hv(e)||Vv(e)?zv:Rv:zv,Lv(Bv(c,a,o),t,n,r)}),Wv=[`<`,`>`,`{`,`}`],Gv=function(e){return Wv.some(function(t){return e.includes(t)})},Kv=function(e){return Gv(e)?`{\`${e}\`}`:e},qv=function(e){var t=e;return t.endsWith(` `)&&(t=t.replace(/^(.*?)(\s+)$/,`$1{'$2'}`)),t.startsWith(` `)&&(t=t.replace(/^(\s+)(.*)$/,`{'$1'}$2`)),t},Jv=(function(e,t,n,r){if(e.type===`number`)return String(e.value);if(e.type===`string`)return e.value?`${qv(Kv(String(e.value)))}`:``;if(e.type===`ReactElement`)return Lv(e,t,n,r);if(e.type===`ReactFragment`)return Uv(e,t,n,r);throw TypeError(`Unknow format type "${e.type}"`)}),Yv=(function(e,t){return Jv(e,!1,0,t)}),Xv=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.filterProps,r=n===void 0?[]:n,i=t.showDefaultProps,a=i===void 0?!0:i,o=t.showFunctions,s=o===void 0?!1:o,c=t.functionValue,l=t.tabStop,u=l===void 0?2:l,d=t.useBooleanShorthandSyntax,f=d===void 0?!0:d,p=t.useFragmentShortSyntax,m=p===void 0?!0:p,h=t.sortProps,g=h===void 0?!0:h,_=t.maxInlineAttributesLineLength,v=t.displayName;if(!e)throw Error(`react-element-to-jsx-string: Expected a ReactElement`);var y={filterProps:r,showDefaultProps:a,showFunctions:s,functionValue:c,tabStop:u,useBooleanShorthandSyntax:f,useFragmentShortSyntax:m,sortProps:g,maxInlineAttributesLineLength:_,displayName:v};return Yv(bv(e,y),y)},Zv=v_({"../../../node_modules/estraverse/estraverse.js"(e){(function e(t){var n,r,i,a,o,s;function c(e){var t={},n,r;for(n in e)e.hasOwnProperty(n)&&(r=e[n],typeof r==`object`&&r?t[n]=c(r):t[n]=r);return t}function l(e,t){var n,r,i,a;for(r=e.length,i=0;r;)n=r>>>1,a=i+n,t(e[a])?r=n:(i=a+1,r-=n+1);return i}n={AssignmentExpression:`AssignmentExpression`,AssignmentPattern:`AssignmentPattern`,ArrayExpression:`ArrayExpression`,ArrayPattern:`ArrayPattern`,ArrowFunctionExpression:`ArrowFunctionExpression`,AwaitExpression:`AwaitExpression`,BlockStatement:`BlockStatement`,BinaryExpression:`BinaryExpression`,BreakStatement:`BreakStatement`,CallExpression:`CallExpression`,CatchClause:`CatchClause`,ChainExpression:`ChainExpression`,ClassBody:`ClassBody`,ClassDeclaration:`ClassDeclaration`,ClassExpression:`ClassExpression`,ComprehensionBlock:`ComprehensionBlock`,ComprehensionExpression:`ComprehensionExpression`,ConditionalExpression:`ConditionalExpression`,ContinueStatement:`ContinueStatement`,DebuggerStatement:`DebuggerStatement`,DirectiveStatement:`DirectiveStatement`,DoWhileStatement:`DoWhileStatement`,EmptyStatement:`EmptyStatement`,ExportAllDeclaration:`ExportAllDeclaration`,ExportDefaultDeclaration:`ExportDefaultDeclaration`,ExportNamedDeclaration:`ExportNamedDeclaration`,ExportSpecifier:`ExportSpecifier`,ExpressionStatement:`ExpressionStatement`,ForStatement:`ForStatement`,ForInStatement:`ForInStatement`,ForOfStatement:`ForOfStatement`,FunctionDeclaration:`FunctionDeclaration`,FunctionExpression:`FunctionExpression`,GeneratorExpression:`GeneratorExpression`,Identifier:`Identifier`,IfStatement:`IfStatement`,ImportExpression:`ImportExpression`,ImportDeclaration:`ImportDeclaration`,ImportDefaultSpecifier:`ImportDefaultSpecifier`,ImportNamespaceSpecifier:`ImportNamespaceSpecifier`,ImportSpecifier:`ImportSpecifier`,Literal:`Literal`,LabeledStatement:`LabeledStatement`,LogicalExpression:`LogicalExpression`,MemberExpression:`MemberExpression`,MetaProperty:`MetaProperty`,MethodDefinition:`MethodDefinition`,ModuleSpecifier:`ModuleSpecifier`,NewExpression:`NewExpression`,ObjectExpression:`ObjectExpression`,ObjectPattern:`ObjectPattern`,PrivateIdentifier:`PrivateIdentifier`,Program:`Program`,Property:`Property`,PropertyDefinition:`PropertyDefinition`,RestElement:`RestElement`,ReturnStatement:`ReturnStatement`,SequenceExpression:`SequenceExpression`,SpreadElement:`SpreadElement`,Super:`Super`,SwitchStatement:`SwitchStatement`,SwitchCase:`SwitchCase`,TaggedTemplateExpression:`TaggedTemplateExpression`,TemplateElement:`TemplateElement`,TemplateLiteral:`TemplateLiteral`,ThisExpression:`ThisExpression`,ThrowStatement:`ThrowStatement`,TryStatement:`TryStatement`,UnaryExpression:`UnaryExpression`,UpdateExpression:`UpdateExpression`,VariableDeclaration:`VariableDeclaration`,VariableDeclarator:`VariableDeclarator`,WhileStatement:`WhileStatement`,WithStatement:`WithStatement`,YieldExpression:`YieldExpression`},i={AssignmentExpression:[`left`,`right`],AssignmentPattern:[`left`,`right`],ArrayExpression:[`elements`],ArrayPattern:[`elements`],ArrowFunctionExpression:[`params`,`body`],AwaitExpression:[`argument`],BlockStatement:[`body`],BinaryExpression:[`left`,`right`],BreakStatement:[`label`],CallExpression:[`callee`,`arguments`],CatchClause:[`param`,`body`],ChainExpression:[`expression`],ClassBody:[`body`],ClassDeclaration:[`id`,`superClass`,`body`],ClassExpression:[`id`,`superClass`,`body`],ComprehensionBlock:[`left`,`right`],ComprehensionExpression:[`blocks`,`filter`,`body`],ConditionalExpression:[`test`,`consequent`,`alternate`],ContinueStatement:[`label`],DebuggerStatement:[],DirectiveStatement:[],DoWhileStatement:[`body`,`test`],EmptyStatement:[],ExportAllDeclaration:[`source`],ExportDefaultDeclaration:[`declaration`],ExportNamedDeclaration:[`declaration`,`specifiers`,`source`],ExportSpecifier:[`exported`,`local`],ExpressionStatement:[`expression`],ForStatement:[`init`,`test`,`update`,`body`],ForInStatement:[`left`,`right`,`body`],ForOfStatement:[`left`,`right`,`body`],FunctionDeclaration:[`id`,`params`,`body`],FunctionExpression:[`id`,`params`,`body`],GeneratorExpression:[`blocks`,`filter`,`body`],Identifier:[],IfStatement:[`test`,`consequent`,`alternate`],ImportExpression:[`source`],ImportDeclaration:[`specifiers`,`source`],ImportDefaultSpecifier:[`local`],ImportNamespaceSpecifier:[`local`],ImportSpecifier:[`imported`,`local`],Literal:[],LabeledStatement:[`label`,`body`],LogicalExpression:[`left`,`right`],MemberExpression:[`object`,`property`],MetaProperty:[`meta`,`property`],MethodDefinition:[`key`,`value`],ModuleSpecifier:[],NewExpression:[`callee`,`arguments`],ObjectExpression:[`properties`],ObjectPattern:[`properties`],PrivateIdentifier:[],Program:[`body`],Property:[`key`,`value`],PropertyDefinition:[`key`,`value`],RestElement:[`argument`],ReturnStatement:[`argument`],SequenceExpression:[`expressions`],SpreadElement:[`argument`],Super:[],SwitchStatement:[`discriminant`,`cases`],SwitchCase:[`test`,`consequent`],TaggedTemplateExpression:[`tag`,`quasi`],TemplateElement:[],TemplateLiteral:[`quasis`,`expressions`],ThisExpression:[],ThrowStatement:[`argument`],TryStatement:[`block`,`handler`,`finalizer`],UnaryExpression:[`argument`],UpdateExpression:[`argument`],VariableDeclaration:[`declarations`],VariableDeclarator:[`id`,`init`],WhileStatement:[`test`,`body`],WithStatement:[`object`,`body`],YieldExpression:[`argument`]},a={},o={},s={},r={Break:a,Skip:o,Remove:s};function u(e,t){this.parent=e,this.key=t}u.prototype.replace=function(e){this.parent[this.key]=e},u.prototype.remove=function(){return Array.isArray(this.parent)?(this.parent.splice(this.key,1),!0):(this.replace(null),!1)};function d(e,t,n,r){this.node=e,this.path=t,this.wrap=n,this.ref=r}function f(){}f.prototype.path=function(){var e,t,n,r,i,a;function o(e,t){if(Array.isArray(t))for(n=0,r=t.length;n<r;++n)e.push(t[n]);else e.push(t)}if(!this.__current.path)return null;for(i=[],e=2,t=this.__leavelist.length;e<t;++e)a=this.__leavelist[e],o(i,a.path);return o(i,this.__current.path),i},f.prototype.type=function(){return this.current().type||this.__current.wrap},f.prototype.parents=function(){var e,t,n;for(n=[],e=1,t=this.__leavelist.length;e<t;++e)n.push(this.__leavelist[e].node);return n},f.prototype.current=function(){return this.__current.node},f.prototype.__execute=function(e,t){var n,r;return r=void 0,n=this.__current,this.__current=t,this.__state=null,e&&(r=e.call(this,t.node,this.__leavelist[this.__leavelist.length-1].node)),this.__current=n,r},f.prototype.notify=function(e){this.__state=e},f.prototype.skip=function(){this.notify(o)},f.prototype.break=function(){this.notify(a)},f.prototype.remove=function(){this.notify(s)},f.prototype.__initialize=function(e,t){this.visitor=t,this.root=e,this.__worklist=[],this.__leavelist=[],this.__current=null,this.__state=null,this.__fallback=null,t.fallback===`iteration`?this.__fallback=Object.keys:typeof t.fallback==`function`&&(this.__fallback=t.fallback),this.__keys=i,t.keys&&(this.__keys=Object.assign(Object.create(this.__keys),t.keys))};function p(e){return e==null?!1:typeof e==`object`&&typeof e.type==`string`}function m(e,t){return(e===n.ObjectExpression||e===n.ObjectPattern)&&t===`properties`}function h(e,t){for(var n=e.length-1;n>=0;--n)if(e[n].node===t)return!0;return!1}f.prototype.traverse=function(e,t){var n,r,i,s,c,l,u,f,g,_,v,y;for(this.__initialize(e,t),y={},n=this.__worklist,r=this.__leavelist,n.push(new d(e,null,null,null)),r.push(new d(null,null,null,null));n.length;){if(i=n.pop(),i===y){if(i=r.pop(),l=this.__execute(t.leave,i),this.__state===a||l===a)return;continue}if(i.node){if(l=this.__execute(t.enter,i),this.__state===a||l===a)return;if(n.push(y),r.push(i),this.__state===o||l===o)continue;if(s=i.node,c=s.type||i.wrap,_=this.__keys[c],!_)if(this.__fallback)_=this.__fallback(s);else throw Error(`Unknown node type `+c+`.`);for(f=_.length;--f>=0;)if(u=_[f],v=s[u],v){if(Array.isArray(v)){for(g=v.length;--g>=0;)if(v[g]&&!h(r,v[g])){if(m(c,_[f]))i=new d(v[g],[u,g],`Property`,null);else if(p(v[g]))i=new d(v[g],[u,g],null,null);else continue;n.push(i)}}else if(p(v)){if(h(r,v))continue;n.push(new d(v,u,null,null))}}}}},f.prototype.replace=function(e,t){var n,r,i,c,l,f,h,g,_,v,y,b,x;function S(e){var t,r,i,a;if(e.ref.remove()){for(r=e.ref.key,a=e.ref.parent,t=n.length;t--;)if(i=n[t],i.ref&&i.ref.parent===a){if(i.ref.key<r)break;--i.ref.key}}}for(this.__initialize(e,t),y={},n=this.__worklist,r=this.__leavelist,b={root:e},f=new d(e,null,null,new u(b,`root`)),n.push(f),r.push(f);n.length;){if(f=n.pop(),f===y){if(f=r.pop(),l=this.__execute(t.leave,f),l!==void 0&&l!==a&&l!==o&&l!==s&&f.ref.replace(l),(this.__state===s||l===s)&&S(f),this.__state===a||l===a)return b.root;continue}if(l=this.__execute(t.enter,f),l!==void 0&&l!==a&&l!==o&&l!==s&&(f.ref.replace(l),f.node=l),(this.__state===s||l===s)&&(S(f),f.node=null),this.__state===a||l===a)return b.root;if(i=f.node,i&&(n.push(y),r.push(f),!(this.__state===o||l===o))){if(c=i.type||f.wrap,_=this.__keys[c],!_)if(this.__fallback)_=this.__fallback(i);else throw Error(`Unknown node type `+c+`.`);for(h=_.length;--h>=0;)if(x=_[h],v=i[x],v)if(Array.isArray(v)){for(g=v.length;--g>=0;)if(v[g]){if(m(c,_[h]))f=new d(v[g],[x,g],`Property`,new u(v,g));else if(p(v[g]))f=new d(v[g],[x,g],null,new u(v,g));else continue;n.push(f)}}else p(v)&&n.push(new d(v,x,null,new u(i,x)))}}return b.root};function g(e,t){return new f().traverse(e,t)}function _(e,t){return new f().replace(e,t)}function v(e,t){var n;return n=l(t,function(t){return t.range[0]>e.range[0]}),e.extendedRange=[e.range[0],e.range[1]],n!==t.length&&(e.extendedRange[1]=t[n].range[0]),--n,n>=0&&(e.extendedRange[0]=t[n].range[1]),e}function y(e,t,n){var i=[],a,o,s,l;if(!e.range)throw Error(`attachComments needs range information`);if(!n.length){if(t.length){for(s=0,o=t.length;s<o;s+=1)a=c(t[s]),a.extendedRange=[0,e.range[0]],i.push(a);e.leadingComments=i}return e}for(s=0,o=t.length;s<o;s+=1)i.push(v(c(t[s]),n));return l=0,g(e,{enter:function(e){for(var t;l<i.length&&(t=i[l],!(t.extendedRange[1]>e.range[0]));)t.extendedRange[1]===e.range[0]?(e.leadingComments||=[],e.leadingComments.push(t),i.splice(l,1)):l+=1;if(l===i.length)return r.Break;if(i[l].extendedRange[0]>e.range[1])return r.Skip}}),l=0,g(e,{leave:function(e){for(var t;l<i.length&&(t=i[l],!(e.range[1]<t.extendedRange[0]));)e.range[1]===t.extendedRange[0]?(e.trailingComments||=[],e.trailingComments.push(t),i.splice(l,1)):l+=1;if(l===i.length)return r.Break;if(i[l].extendedRange[0]>e.range[1])return r.Skip}}),e}return t.Syntax=n,t.traverse=g,t.replace=_,t.attachComments=y,t.VisitorKeys=i,t.VisitorOption=r,t.Controller=f,t.cloneEnvironment=function(){return e({})},t})(e)}}),Qv=v_({"../../../node_modules/esutils/lib/ast.js"(e,t){(function(){function e(e){if(e==null)return!1;switch(e.type){case`ArrayExpression`:case`AssignmentExpression`:case`BinaryExpression`:case`CallExpression`:case`ConditionalExpression`:case`FunctionExpression`:case`Identifier`:case`Literal`:case`LogicalExpression`:case`MemberExpression`:case`NewExpression`:case`ObjectExpression`:case`SequenceExpression`:case`ThisExpression`:case`UnaryExpression`:case`UpdateExpression`:return!0}return!1}function n(e){if(e==null)return!1;switch(e.type){case`DoWhileStatement`:case`ForInStatement`:case`ForStatement`:case`WhileStatement`:return!0}return!1}function r(e){if(e==null)return!1;switch(e.type){case`BlockStatement`:case`BreakStatement`:case`ContinueStatement`:case`DebuggerStatement`:case`DoWhileStatement`:case`EmptyStatement`:case`ExpressionStatement`:case`ForInStatement`:case`ForStatement`:case`IfStatement`:case`LabeledStatement`:case`ReturnStatement`:case`SwitchStatement`:case`ThrowStatement`:case`TryStatement`:case`VariableDeclaration`:case`WhileStatement`:case`WithStatement`:return!0}return!1}function i(e){return r(e)||e!=null&&e.type===`FunctionDeclaration`}function a(e){switch(e.type){case`IfStatement`:return e.alternate==null?e.consequent:e.alternate;case`LabeledStatement`:case`ForStatement`:case`ForInStatement`:case`WhileStatement`:case`WithStatement`:return e.body}return null}function o(e){var t;if(e.type!==`IfStatement`||e.alternate==null)return!1;t=e.consequent;do{if(t.type===`IfStatement`&&t.alternate==null)return!0;t=a(t)}while(t);return!1}t.exports={isExpression:e,isStatement:r,isIterationStatement:n,isSourceElement:i,isProblematicIfStatement:o,trailingStatement:a}})()}}),$v=v_({"../../../node_modules/esutils/lib/code.js"(e,t){(function(){var e,n={NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,NonAsciiIdentifierPart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/},r,i,a,o;e={NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,NonAsciiIdentifierPart:/[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/};function s(e){return 48<=e&&e<=57}function c(e){return 48<=e&&e<=57||97<=e&&e<=102||65<=e&&e<=70}function l(e){return e>=48&&e<=55}r=[5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function u(e){return e===32||e===9||e===11||e===12||e===160||e>=5760&&r.indexOf(e)>=0}function d(e){return e===10||e===13||e===8232||e===8233}function f(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(Math.floor((e-65536)/1024)+55296)+String.fromCharCode((e-65536)%1024+56320)}for(i=Array(128),o=0;o<128;++o)i[o]=o>=97&&o<=122||o>=65&&o<=90||o===36||o===95;for(a=Array(128),o=0;o<128;++o)a[o]=o>=97&&o<=122||o>=65&&o<=90||o>=48&&o<=57||o===36||o===95;function p(e){return e<128?i[e]:n.NonAsciiIdentifierStart.test(f(e))}function m(e){return e<128?a[e]:n.NonAsciiIdentifierPart.test(f(e))}function h(t){return t<128?i[t]:e.NonAsciiIdentifierStart.test(f(t))}function g(t){return t<128?a[t]:e.NonAsciiIdentifierPart.test(f(t))}t.exports={isDecimalDigit:s,isHexDigit:c,isOctalDigit:l,isWhiteSpace:u,isLineTerminator:d,isIdentifierStartES5:p,isIdentifierPartES5:m,isIdentifierStartES6:h,isIdentifierPartES6:g}})()}}),ey=v_({"../../../node_modules/esutils/lib/keyword.js"(e,t){(function(){var e=$v();function n(e){switch(e){case`implements`:case`interface`:case`package`:case`private`:case`protected`:case`public`:case`static`:case`let`:return!0;default:return!1}}function r(e,t){return!t&&e===`yield`?!1:i(e,t)}function i(e,t){if(t&&n(e))return!0;switch(e.length){case 2:return e===`if`||e===`in`||e===`do`;case 3:return e===`var`||e===`for`||e===`new`||e===`try`;case 4:return e===`this`||e===`else`||e===`case`||e===`void`||e===`with`||e===`enum`;case 5:return e===`while`||e===`break`||e===`catch`||e===`throw`||e===`const`||e===`yield`||e===`class`||e===`super`;case 6:return e===`return`||e===`typeof`||e===`delete`||e===`switch`||e===`export`||e===`import`;case 7:return e==="default"||e===`finally`||e===`extends`;case 8:return e===`function`||e===`continue`||e===`debugger`;case 10:return e===`instanceof`;default:return!1}}function a(e,t){return e===`null`||e===`true`||e===`false`||r(e,t)}function o(e,t){return e===`null`||e===`true`||e===`false`||i(e,t)}function s(e){return e===`eval`||e===`arguments`}function c(t){var n,r,i;if(t.length===0||(i=t.charCodeAt(0),!e.isIdentifierStartES5(i)))return!1;for(n=1,r=t.length;n<r;++n)if(i=t.charCodeAt(n),!e.isIdentifierPartES5(i))return!1;return!0}function l(e,t){return(e-55296)*1024+(t-56320)+65536}function u(t){var n,r,i,a,o;if(t.length===0)return!1;for(o=e.isIdentifierStartES6,n=0,r=t.length;n<r;++n){if(i=t.charCodeAt(n),55296<=i&&i<=56319){if(++n,n>=r||(a=t.charCodeAt(n),!(56320<=a&&a<=57343)))return!1;i=l(i,a)}if(!o(i))return!1;o=e.isIdentifierPartES6}return!0}function d(e,t){return c(e)&&!a(e,t)}function f(e,t){return u(e)&&!o(e,t)}t.exports={isKeywordES5:r,isKeywordES6:i,isReservedWordES5:a,isReservedWordES6:o,isRestrictedWord:s,isIdentifierNameES5:c,isIdentifierNameES6:u,isIdentifierES5:d,isIdentifierES6:f}})()}}),ty=v_({"../../../node_modules/esutils/lib/utils.js"(e){(function(){e.ast=Qv(),e.code=$v(),e.keyword=ey()})()}}),ny=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/base64.js"(e){var t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.split(``);e.encode=function(e){if(0<=e&&e<t.length)return t[e];throw TypeError(`Must be between 0 and 63: `+e)},e.decode=function(e){var t=65,n=90,r=97,i=122,a=48;return t<=e&&e<=n?e-t:r<=e&&e<=i?e-r+26:a<=e&&e<=57?e-a+52:e==43?62:e==47?63:-1}}}),ry=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/base64-vlq.js"(e){var t=ny(),n=5,r=1<<n,i=r-1,a=r;function o(e){return e<0?(-e<<1)+1:(e<<1)+0}function s(e){var t=(e&1)==1,n=e>>1;return t?-n:n}e.encode=function(e){var r=``,s,c=o(e);do s=c&i,c>>>=n,c>0&&(s|=a),r+=t.encode(s);while(c>0);return r},e.decode=function(e,r,o){var c=e.length,l=0,u=0,d,f;do{if(r>=c)throw Error(`Expected more digits in base 64 VLQ value.`);if(f=t.decode(e.charCodeAt(r++)),f===-1)throw Error(`Invalid base64 digit: `+e.charAt(r-1));d=!!(f&a),f&=i,l+=f<<u,u+=n}while(d);o.value=s(l),o.rest=r}}}),iy=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/util.js"(e){function t(e,t,n){if(t in e)return e[t];if(arguments.length===3)return n;throw Error(`"`+t+`" is a required argument.`)}e.getArg=t;var n=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,r=/^data:.+\,.+$/;function i(e){var t=e.match(n);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}e.urlParse=i;function a(e){var t=``;return e.scheme&&(t+=e.scheme+`:`),t+=`//`,e.auth&&(t+=e.auth+`@`),e.host&&(t+=e.host),e.port&&(t+=`:`+e.port),e.path&&(t+=e.path),t}e.urlGenerate=a;function o(t){var n=t,r=i(t);if(r){if(!r.path)return t;n=r.path}for(var o=e.isAbsolute(n),s=n.split(/\/+/),c,l=0,u=s.length-1;u>=0;u--)c=s[u],c===`.`?s.splice(u,1):c===`..`?l++:l>0&&(c===``?(s.splice(u+1,l),l=0):(s.splice(u,2),l--));return n=s.join(`/`),n===``&&(n=o?`/`:`.`),r?(r.path=n,a(r)):n}e.normalize=o;function s(e,t){e===``&&(e=`.`),t===``&&(t=`.`);var n=i(t),s=i(e);if(s&&(e=s.path||`/`),n&&!n.scheme)return s&&(n.scheme=s.scheme),a(n);if(n||t.match(r))return t;if(s&&!s.host&&!s.path)return s.host=t,a(s);var c=t.charAt(0)===`/`?t:o(e.replace(/\/+$/,``)+`/`+t);return s?(s.path=c,a(s)):c}e.join=s,e.isAbsolute=function(e){return e.charAt(0)===`/`||n.test(e)};function c(e,t){e===``&&(e=`.`),e=e.replace(/\/$/,``);for(var n=0;t.indexOf(e+`/`)!==0;){var r=e.lastIndexOf(`/`);if(r<0||(e=e.slice(0,r),e.match(/^([^\/]+:\/)?\/*$/)))return t;++n}return Array(n+1).join(`../`)+t.substr(e.length+1)}e.relative=c;var l=(function(){return!(`__proto__`in Object.create(null))})();function u(e){return e}function d(e){return p(e)?`$`+e:e}e.toSetString=l?u:d;function f(e){return p(e)?e.slice(1):e}e.fromSetString=l?u:f;function p(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var n=t-10;n>=0;n--)if(e.charCodeAt(n)!==36)return!1;return!0}function m(e,t,n){var r=g(e.source,t.source);return r!==0||(r=e.originalLine-t.originalLine,r!==0)||(r=e.originalColumn-t.originalColumn,r!==0||n)||(r=e.generatedColumn-t.generatedColumn,r!==0)||(r=e.generatedLine-t.generatedLine,r!==0)?r:g(e.name,t.name)}e.compareByOriginalPositions=m;function h(e,t,n){var r=e.generatedLine-t.generatedLine;return r!==0||(r=e.generatedColumn-t.generatedColumn,r!==0||n)||(r=g(e.source,t.source),r!==0)||(r=e.originalLine-t.originalLine,r!==0)||(r=e.originalColumn-t.originalColumn,r!==0)?r:g(e.name,t.name)}e.compareByGeneratedPositionsDeflated=h;function g(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function _(e,t){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=g(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:g(e.name,t.name)}e.compareByGeneratedPositionsInflated=_;function v(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,``))}e.parseSourceMapInput=v;function y(e,t,n){if(t||=``,e&&(e[e.length-1]!==`/`&&t[0]!==`/`&&(e+=`/`),t=e+t),n){var r=i(n);if(!r)throw Error(`sourceMapURL could not be parsed`);if(r.path){var c=r.path.lastIndexOf(`/`);c>=0&&(r.path=r.path.substring(0,c+1))}t=s(a(r),t)}return o(t)}e.computeSourceURL=y}}),ay=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/array-set.js"(e){var t=iy(),n=Object.prototype.hasOwnProperty,r=typeof Map<`u`;function i(){this._array=[],this._set=r?new Map:Object.create(null)}i.fromArray=function(e,t){for(var n=new i,r=0,a=e.length;r<a;r++)n.add(e[r],t);return n},i.prototype.size=function(){return r?this._set.size:Object.getOwnPropertyNames(this._set).length},i.prototype.add=function(e,i){var a=r?e:t.toSetString(e),o=r?this.has(e):n.call(this._set,a),s=this._array.length;(!o||i)&&this._array.push(e),o||(r?this._set.set(e,s):this._set[a]=s)},i.prototype.has=function(e){if(r)return this._set.has(e);var i=t.toSetString(e);return n.call(this._set,i)},i.prototype.indexOf=function(e){if(r){var i=this._set.get(e);if(i>=0)return i}else{var a=t.toSetString(e);if(n.call(this._set,a))return this._set[a]}throw Error(`"`+e+`" is not in the set.`)},i.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw Error(`No element indexed by `+e)},i.prototype.toArray=function(){return this._array.slice()},e.ArraySet=i}}),oy=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/mapping-list.js"(e){var t=iy();function n(e,n){var r=e.generatedLine,i=n.generatedLine,a=e.generatedColumn,o=n.generatedColumn;return i>r||i==r&&o>=a||t.compareByGeneratedPositionsInflated(e,n)<=0}function r(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}r.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},r.prototype.add=function(e){n(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},r.prototype.toArray=function(){return this._sorted||=(this._array.sort(t.compareByGeneratedPositionsInflated),!0),this._array},e.MappingList=r}}),sy=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/source-map-generator.js"(e){var t=ry(),n=iy(),r=ay().ArraySet,i=oy().MappingList;function a(e){e||={},this._file=n.getArg(e,`file`,null),this._sourceRoot=n.getArg(e,`sourceRoot`,null),this._skipValidation=n.getArg(e,`skipValidation`,!1),this._sources=new r,this._names=new r,this._mappings=new i,this._sourcesContents=null}a.prototype._version=3,a.fromSourceMap=function(e){var t=e.sourceRoot,r=new a({file:e.file,sourceRoot:t});return e.eachMapping(function(e){var i={generated:{line:e.generatedLine,column:e.generatedColumn}};e.source!=null&&(i.source=e.source,t!=null&&(i.source=n.relative(t,i.source)),i.original={line:e.originalLine,column:e.originalColumn},e.name!=null&&(i.name=e.name)),r.addMapping(i)}),e.sources.forEach(function(i){var a=i;t!==null&&(a=n.relative(t,i)),r._sources.has(a)||r._sources.add(a);var o=e.sourceContentFor(i);o!=null&&r.setSourceContent(i,o)}),r},a.prototype.addMapping=function(e){var t=n.getArg(e,`generated`),r=n.getArg(e,`original`,null),i=n.getArg(e,`source`,null),a=n.getArg(e,`name`,null);this._skipValidation||this._validateMapping(t,r,i,a),i!=null&&(i=String(i),this._sources.has(i)||this._sources.add(i)),a!=null&&(a=String(a),this._names.has(a)||this._names.add(a)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:i,name:a})},a.prototype.setSourceContent=function(e,t){var r=e;this._sourceRoot!=null&&(r=n.relative(this._sourceRoot,r)),t==null?this._sourcesContents&&(delete this._sourcesContents[n.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null)):(this._sourcesContents||=Object.create(null),this._sourcesContents[n.toSetString(r)]=t)},a.prototype.applySourceMap=function(e,t,i){var a=t;if(t==null){if(e.file==null)throw Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);a=e.file}var o=this._sourceRoot;o!=null&&(a=n.relative(o,a));var s=new r,c=new r;this._mappings.unsortedForEach(function(t){if(t.source===a&&t.originalLine!=null){var r=e.originalPositionFor({line:t.originalLine,column:t.originalColumn});r.source!=null&&(t.source=r.source,i!=null&&(t.source=n.join(i,t.source)),o!=null&&(t.source=n.relative(o,t.source)),t.originalLine=r.line,t.originalColumn=r.column,r.name!=null&&(t.name=r.name))}var l=t.source;l!=null&&!s.has(l)&&s.add(l);var u=t.name;u!=null&&!c.has(u)&&c.add(u)},this),this._sources=s,this._names=c,e.sources.forEach(function(t){var r=e.sourceContentFor(t);r!=null&&(i!=null&&(t=n.join(i,t)),o!=null&&(t=n.relative(o,t)),this.setSourceContent(t,r))},this)},a.prototype._validateMapping=function(e,t,n,r){if(t&&typeof t.line!=`number`&&typeof t.column!=`number`)throw Error(`original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.`);if(!(e&&`line`in e&&`column`in e&&e.line>0&&e.column>=0&&!t&&!n&&!r)){if(e&&`line`in e&&`column`in e&&t&&`line`in t&&`column`in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&n)return;throw Error(`Invalid mapping: `+JSON.stringify({generated:e,source:n,original:t,name:r}))}},a.prototype._serializeMappings=function(){for(var e=0,r=1,i=0,a=0,o=0,s=0,c=``,l,u,d,f,p=this._mappings.toArray(),m=0,h=p.length;m<h;m++){if(u=p[m],l=``,u.generatedLine!==r)for(e=0;u.generatedLine!==r;)l+=`;`,r++;else if(m>0){if(!n.compareByGeneratedPositionsInflated(u,p[m-1]))continue;l+=`,`}l+=t.encode(u.generatedColumn-e),e=u.generatedColumn,u.source!=null&&(f=this._sources.indexOf(u.source),l+=t.encode(f-s),s=f,l+=t.encode(u.originalLine-1-a),a=u.originalLine-1,l+=t.encode(u.originalColumn-i),i=u.originalColumn,u.name!=null&&(d=this._names.indexOf(u.name),l+=t.encode(d-o),o=d)),c+=l}return c},a.prototype._generateSourcesContent=function(e,t){return e.map(function(e){if(!this._sourcesContents)return null;t!=null&&(e=n.relative(t,e));var r=n.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,r)?this._sourcesContents[r]:null},this)},a.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},a.prototype.toString=function(){return JSON.stringify(this.toJSON())},e.SourceMapGenerator=a}}),cy=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/binary-search.js"(e){e.GREATEST_LOWER_BOUND=1,e.LEAST_UPPER_BOUND=2;function t(n,r,i,a,o,s){var c=Math.floor((r-n)/2)+n,l=o(i,a[c],!0);return l===0?c:l>0?r-c>1?t(c,r,i,a,o,s):s==e.LEAST_UPPER_BOUND?r<a.length?r:-1:c:c-n>1?t(n,c,i,a,o,s):s==e.LEAST_UPPER_BOUND?c:n<0?-1:n}e.search=function(n,r,i,a){if(r.length===0)return-1;var o=t(-1,r.length,n,r,i,a||e.GREATEST_LOWER_BOUND);if(o<0)return-1;for(;o-1>=0&&i(r[o],r[o-1],!0)===0;)--o;return o}}}),ly=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/quick-sort.js"(e){function t(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function n(e,t){return Math.round(e+Math.random()*(t-e))}function r(e,i,a,o){if(a<o){var s=n(a,o),c=a-1;t(e,s,o);for(var l=e[o],u=a;u<o;u++)i(e[u],l)<=0&&(c+=1,t(e,c,u));t(e,c+1,u);var d=c+1;r(e,i,a,d-1),r(e,i,d+1,o)}}e.quickSort=function(e,t){r(e,t,0,e.length-1)}}}),uy=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/source-map-consumer.js"(e){var t=iy(),n=cy(),r=ay().ArraySet,i=ry(),a=ly().quickSort;function o(e,n){var r=e;return typeof e==`string`&&(r=t.parseSourceMapInput(e)),r.sections==null?new s(r,n):new l(r,n)}o.fromSourceMap=function(e,t){return s.fromSourceMap(e,t)},o.prototype._version=3,o.prototype.__generatedMappings=null,Object.defineProperty(o.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),o.prototype.__originalMappings=null,Object.defineProperty(o.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),o.prototype._charIsMappingSeparator=function(e,t){var n=e.charAt(t);return n===`;`||n===`,`},o.prototype._parseMappings=function(e,t){throw Error(`Subclasses must implement _parseMappings`)},o.GENERATED_ORDER=1,o.ORIGINAL_ORDER=2,o.GREATEST_LOWER_BOUND=1,o.LEAST_UPPER_BOUND=2,o.prototype.eachMapping=function(e,n,r){var i=n||null,a=r||o.GENERATED_ORDER,s;switch(a){case o.GENERATED_ORDER:s=this._generatedMappings;break;case o.ORIGINAL_ORDER:s=this._originalMappings;break;default:throw Error(`Unknown order of iteration.`)}var c=this.sourceRoot;s.map(function(e){var n=e.source===null?null:this._sources.at(e.source);return n=t.computeSourceURL(c,n,this._sourceMapURL),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:e.name===null?null:this._names.at(e.name)}},this).forEach(e,i)},o.prototype.allGeneratedPositionsFor=function(e){var r=t.getArg(e,`line`),i={source:t.getArg(e,`source`),originalLine:r,originalColumn:t.getArg(e,`column`,0)};if(i.source=this._findSourceIndex(i.source),i.source<0)return[];var a=[],o=this._findMapping(i,this._originalMappings,`originalLine`,`originalColumn`,t.compareByOriginalPositions,n.LEAST_UPPER_BOUND);if(o>=0){var s=this._originalMappings[o];if(e.column===void 0)for(var c=s.originalLine;s&&s.originalLine===c;)a.push({line:t.getArg(s,`generatedLine`,null),column:t.getArg(s,`generatedColumn`,null),lastColumn:t.getArg(s,`lastGeneratedColumn`,null)}),s=this._originalMappings[++o];else for(var l=s.originalColumn;s&&s.originalLine===r&&s.originalColumn==l;)a.push({line:t.getArg(s,`generatedLine`,null),column:t.getArg(s,`generatedColumn`,null),lastColumn:t.getArg(s,`lastGeneratedColumn`,null)}),s=this._originalMappings[++o]}return a},e.SourceMapConsumer=o;function s(e,n){var i=e;typeof e==`string`&&(i=t.parseSourceMapInput(e));var a=t.getArg(i,`version`),o=t.getArg(i,`sources`),s=t.getArg(i,`names`,[]),c=t.getArg(i,`sourceRoot`,null),l=t.getArg(i,`sourcesContent`,null),u=t.getArg(i,`mappings`),d=t.getArg(i,`file`,null);if(a!=this._version)throw Error(`Unsupported version: `+a);c&&=t.normalize(c),o=o.map(String).map(t.normalize).map(function(e){return c&&t.isAbsolute(c)&&t.isAbsolute(e)?t.relative(c,e):e}),this._names=r.fromArray(s.map(String),!0),this._sources=r.fromArray(o,!0),this._absoluteSources=this._sources.toArray().map(function(e){return t.computeSourceURL(c,e,n)}),this.sourceRoot=c,this.sourcesContent=l,this._mappings=u,this._sourceMapURL=n,this.file=d}s.prototype=Object.create(o.prototype),s.prototype.consumer=o,s.prototype._findSourceIndex=function(e){var n=e;if(this.sourceRoot!=null&&(n=t.relative(this.sourceRoot,n)),this._sources.has(n))return this._sources.indexOf(n);var r;for(r=0;r<this._absoluteSources.length;++r)if(this._absoluteSources[r]==e)return r;return-1},s.fromSourceMap=function(e,n){var i=Object.create(s.prototype),o=i._names=r.fromArray(e._names.toArray(),!0),l=i._sources=r.fromArray(e._sources.toArray(),!0);i.sourceRoot=e._sourceRoot,i.sourcesContent=e._generateSourcesContent(i._sources.toArray(),i.sourceRoot),i.file=e._file,i._sourceMapURL=n,i._absoluteSources=i._sources.toArray().map(function(e){return t.computeSourceURL(i.sourceRoot,e,n)});for(var u=e._mappings.toArray().slice(),d=i.__generatedMappings=[],f=i.__originalMappings=[],p=0,m=u.length;p<m;p++){var h=u[p],g=new c;g.generatedLine=h.generatedLine,g.generatedColumn=h.generatedColumn,h.source&&(g.source=l.indexOf(h.source),g.originalLine=h.originalLine,g.originalColumn=h.originalColumn,h.name&&(g.name=o.indexOf(h.name)),f.push(g)),d.push(g)}return a(i.__originalMappings,t.compareByOriginalPositions),i},s.prototype._version=3,Object.defineProperty(s.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function c(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}s.prototype._parseMappings=function(e,n){for(var r=1,o=0,s=0,l=0,u=0,d=0,f=e.length,p=0,m={},h={},g=[],_=[],v,y,b,x,S;p<f;)if(e.charAt(p)===`;`)r++,p++,o=0;else if(e.charAt(p)===`,`)p++;else{for(v=new c,v.generatedLine=r,x=p;x<f&&!this._charIsMappingSeparator(e,x);x++);if(y=e.slice(p,x),b=m[y],b)p+=y.length;else{for(b=[];p<x;)i.decode(e,p,h),S=h.value,p=h.rest,b.push(S);if(b.length===2)throw Error(`Found a source, but no line and column`);if(b.length===3)throw Error(`Found a source and line, but no column`);m[y]=b}v.generatedColumn=o+b[0],o=v.generatedColumn,b.length>1&&(v.source=u+b[1],u+=b[1],v.originalLine=s+b[2],s=v.originalLine,v.originalLine+=1,v.originalColumn=l+b[3],l=v.originalColumn,b.length>4&&(v.name=d+b[4],d+=b[4])),_.push(v),typeof v.originalLine==`number`&&g.push(v)}a(_,t.compareByGeneratedPositionsDeflated),this.__generatedMappings=_,a(g,t.compareByOriginalPositions),this.__originalMappings=g},s.prototype._findMapping=function(e,t,r,i,a,o){if(e[r]<=0)throw TypeError(`Line must be greater than or equal to 1, got `+e[r]);if(e[i]<0)throw TypeError(`Column must be greater than or equal to 0, got `+e[i]);return n.search(e,t,a,o)},s.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var n=this._generatedMappings[e+1];if(t.generatedLine===n.generatedLine){t.lastGeneratedColumn=n.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}},s.prototype.originalPositionFor=function(e){var n={generatedLine:t.getArg(e,`line`),generatedColumn:t.getArg(e,`column`)},r=this._findMapping(n,this._generatedMappings,`generatedLine`,`generatedColumn`,t.compareByGeneratedPositionsDeflated,t.getArg(e,`bias`,o.GREATEST_LOWER_BOUND));if(r>=0){var i=this._generatedMappings[r];if(i.generatedLine===n.generatedLine){var a=t.getArg(i,`source`,null);a!==null&&(a=this._sources.at(a),a=t.computeSourceURL(this.sourceRoot,a,this._sourceMapURL));var s=t.getArg(i,`name`,null);return s!==null&&(s=this._names.at(s)),{source:a,line:t.getArg(i,`originalLine`,null),column:t.getArg(i,`originalColumn`,null),name:s}}}return{source:null,line:null,column:null,name:null}},s.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1},s.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var i=e;this.sourceRoot!=null&&(i=t.relative(this.sourceRoot,i));var a;if(this.sourceRoot!=null&&(a=t.urlParse(this.sourceRoot))){var o=i.replace(/^file:\/\//,``);if(a.scheme==`file`&&this._sources.has(o))return this.sourcesContent[this._sources.indexOf(o)];if((!a.path||a.path==`/`)&&this._sources.has(`/`+i))return this.sourcesContent[this._sources.indexOf(`/`+i)]}if(n)return null;throw Error(`"`+i+`" is not in the SourceMap.`)},s.prototype.generatedPositionFor=function(e){var n=t.getArg(e,`source`);if(n=this._findSourceIndex(n),n<0)return{line:null,column:null,lastColumn:null};var r={source:n,originalLine:t.getArg(e,`line`),originalColumn:t.getArg(e,`column`)},i=this._findMapping(r,this._originalMappings,`originalLine`,`originalColumn`,t.compareByOriginalPositions,t.getArg(e,`bias`,o.GREATEST_LOWER_BOUND));if(i>=0){var a=this._originalMappings[i];if(a.source===r.source)return{line:t.getArg(a,`generatedLine`,null),column:t.getArg(a,`generatedColumn`,null),lastColumn:t.getArg(a,`lastGeneratedColumn`,null)}}return{line:null,column:null,lastColumn:null}},e.BasicSourceMapConsumer=s;function l(e,n){var i=e;typeof e==`string`&&(i=t.parseSourceMapInput(e));var a=t.getArg(i,`version`),s=t.getArg(i,`sections`);if(a!=this._version)throw Error(`Unsupported version: `+a);this._sources=new r,this._names=new r;var c={line:-1,column:0};this._sections=s.map(function(e){if(e.url)throw Error(`Support for url field in sections not implemented.`);var r=t.getArg(e,`offset`),i=t.getArg(r,`line`),a=t.getArg(r,`column`);if(i<c.line||i===c.line&&a<c.column)throw Error(`Section offsets must be ordered and non-overlapping.`);return c=r,{generatedOffset:{generatedLine:i+1,generatedColumn:a+1},consumer:new o(t.getArg(e,`map`),n)}})}l.prototype=Object.create(o.prototype),l.prototype.constructor=o,l.prototype._version=3,Object.defineProperty(l.prototype,"sources",{get:function(){for(var e=[],t=0;t<this._sections.length;t++)for(var n=0;n<this._sections[t].consumer.sources.length;n++)e.push(this._sections[t].consumer.sources[n]);return e}}),l.prototype.originalPositionFor=function(e){var r={generatedLine:t.getArg(e,`line`),generatedColumn:t.getArg(e,`column`)},i=n.search(r,this._sections,function(e,t){return e.generatedLine-t.generatedOffset.generatedLine||e.generatedColumn-t.generatedOffset.generatedColumn}),a=this._sections[i];return a?a.consumer.originalPositionFor({line:r.generatedLine-(a.generatedOffset.generatedLine-1),column:r.generatedColumn-(a.generatedOffset.generatedLine===r.generatedLine?a.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},l.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},l.prototype.sourceContentFor=function(e,t){for(var n=0;n<this._sections.length;n++){var r=this._sections[n].consumer.sourceContentFor(e,!0);if(r)return r}if(t)return null;throw Error(`"`+e+`" is not in the SourceMap.`)},l.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer._findSourceIndex(t.getArg(e,`source`))!==-1){var i=r.consumer.generatedPositionFor(e);if(i)return{line:i.line+(r.generatedOffset.generatedLine-1),column:i.column+(r.generatedOffset.generatedLine===i.line?r.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}},l.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var i=this._sections[r],o=i.consumer._generatedMappings,s=0;s<o.length;s++){var c=o[s],l=i.consumer._sources.at(c.source);l=t.computeSourceURL(i.consumer.sourceRoot,l,this._sourceMapURL),this._sources.add(l),l=this._sources.indexOf(l);var u=null;c.name&&(u=i.consumer._names.at(c.name),this._names.add(u),u=this._names.indexOf(u));var d={source:l,generatedLine:c.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:c.generatedColumn+(i.generatedOffset.generatedLine===c.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:c.originalLine,originalColumn:c.originalColumn,name:u};this.__generatedMappings.push(d),typeof d.originalLine==`number`&&this.__originalMappings.push(d)}a(this.__generatedMappings,t.compareByGeneratedPositionsDeflated),a(this.__originalMappings,t.compareByOriginalPositions)},e.IndexedSourceMapConsumer=l}}),dy=v_({"../../../node_modules/escodegen/node_modules/source-map/lib/source-node.js"(e){var t=sy().SourceMapGenerator,n=iy(),r=/(\r?\n)/,i=10,a=`$$$isSourceNode$$$`;function o(e,t,n,r,i){this.children=[],this.sourceContents={},this.line=e??null,this.column=t??null,this.source=n??null,this.name=i??null,this[a]=!0,r!=null&&this.add(r)}o.fromStringWithSourceMap=function(e,t,i){var a=new o,s=e.split(r),c=0,l=function(){return e()+(e()||``);function e(){return c<s.length?s[c++]:void 0}},u=1,d=0,f=null;return t.eachMapping(function(e){if(f!==null)if(u<e.generatedLine)p(f,l()),u++,d=0;else{var t=s[c]||``,n=t.substr(0,e.generatedColumn-d);s[c]=t.substr(e.generatedColumn-d),d=e.generatedColumn,p(f,n),f=e;return}for(;u<e.generatedLine;)a.add(l()),u++;if(d<e.generatedColumn){var t=s[c]||``;a.add(t.substr(0,e.generatedColumn)),s[c]=t.substr(e.generatedColumn),d=e.generatedColumn}f=e},this),c<s.length&&(f&&p(f,l()),a.add(s.splice(c).join(``))),t.sources.forEach(function(e){var r=t.sourceContentFor(e);r!=null&&(i!=null&&(e=n.join(i,e)),a.setSourceContent(e,r))}),a;function p(e,t){if(e===null||e.source===void 0)a.add(t);else{var r=i?n.join(i,e.source):e.source;a.add(new o(e.originalLine,e.originalColumn,r,t,e.name))}}},o.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(e){this.add(e)},this);else if(e[a]||typeof e==`string`)e&&this.children.push(e);else throw TypeError(`Expected a SourceNode, string, or an array of SourceNodes and strings. Got `+e);return this},o.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else if(e[a]||typeof e==`string`)this.children.unshift(e);else throw TypeError(`Expected a SourceNode, string, or an array of SourceNodes and strings. Got `+e);return this},o.prototype.walk=function(e){for(var t,n=0,r=this.children.length;n<r;n++)t=this.children[n],t[a]?t.walk(e):t!==``&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})},o.prototype.join=function(e){var t,n,r=this.children.length;if(r>0){for(t=[],n=0;n<r-1;n++)t.push(this.children[n]),t.push(e);t.push(this.children[n]),this.children=t}return this},o.prototype.replaceRight=function(e,t){var n=this.children[this.children.length-1];return n[a]?n.replaceRight(e,t):typeof n==`string`?this.children[this.children.length-1]=n.replace(e,t):this.children.push(``.replace(e,t)),this},o.prototype.setSourceContent=function(e,t){this.sourceContents[n.toSetString(e)]=t},o.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][a]&&this.children[t].walkSourceContents(e);for(var i=Object.keys(this.sourceContents),t=0,r=i.length;t<r;t++)e(n.fromSetString(i[t]),this.sourceContents[i[t]])},o.prototype.toString=function(){var e=``;return this.walk(function(t){e+=t}),e},o.prototype.toStringWithSourceMap=function(e){var n={code:``,line:1,column:0},r=new t(e),a=!1,o=null,s=null,c=null,l=null;return this.walk(function(e,t){n.code+=e,t.source!==null&&t.line!==null&&t.column!==null?((o!==t.source||s!==t.line||c!==t.column||l!==t.name)&&r.addMapping({source:t.source,original:{line:t.line,column:t.column},generated:{line:n.line,column:n.column},name:t.name}),o=t.source,s=t.line,c=t.column,l=t.name,a=!0):a&&=(r.addMapping({generated:{line:n.line,column:n.column}}),o=null,!1);for(var u=0,d=e.length;u<d;u++)e.charCodeAt(u)===i?(n.line++,n.column=0,u+1===d?(o=null,a=!1):a&&r.addMapping({source:t.source,original:{line:t.line,column:t.column},generated:{line:n.line,column:n.column},name:t.name})):n.column++}),this.walkSourceContents(function(e,t){r.setSourceContent(e,t)}),{code:n.code,map:r}},e.SourceNode=o}}),fy=v_({"../../../node_modules/escodegen/node_modules/source-map/source-map.js"(e){e.SourceMapGenerator=sy().SourceMapGenerator,e.SourceMapConsumer=uy().SourceMapConsumer,e.SourceNode=dy().SourceNode}}),py=v_({"../../../node_modules/escodegen/package.json"(e,t){t.exports={name:`escodegen`,description:`ECMAScript code generator`,homepage:`http://github.com/estools/escodegen`,main:`escodegen.js`,bin:{esgenerate:`./bin/esgenerate.js`,escodegen:`./bin/escodegen.js`},files:[`LICENSE.BSD`,`README.md`,`bin`,`escodegen.js`,`package.json`],version:`2.1.0`,engines:{node:`>=6.0`},maintainers:[{name:`Yusuke Suzuki`,email:`utatane.tea@gmail.com`,web:`http://github.com/Constellation`}],repository:{type:`git`,url:`http://github.com/estools/escodegen.git`},dependencies:{estraverse:`^5.2.0`,esutils:`^2.0.2`,esprima:`^4.0.1`},optionalDependencies:{"source-map":`~0.6.1`},devDependencies:{acorn:`^8.0.4`,bluebird:`^3.4.7`,"bower-registry-client":`^1.0.0`,chai:`^4.2.0`,"chai-exclude":`^2.0.2`,"commonjs-everywhere":`^0.9.7`,gulp:`^4.0.2`,"gulp-eslint":`^6.0.0`,"gulp-mocha":`^7.0.2`,minimist:`^1.2.5`,optionator:`^0.9.1`,semver:`^7.3.4`},license:`BSD-2-Clause`,scripts:{test:`gulp travis`,"unit-test":`gulp test`,lint:`gulp lint`,release:`node tools/release.js`,"build-min":`./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js`,build:`./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js`}}}}),my=v_({"../../../node_modules/escodegen/escodegen.js"(e){(function(){var t,n,r,i,a=Zv(),o=ty(),s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,ee,T;t=a.Syntax;function te(e){return Me.Expression.hasOwnProperty(e.type)}function E(e){return Me.Statement.hasOwnProperty(e.type)}n={Sequence:0,Yield:1,Assignment:1,Conditional:2,ArrowFunction:2,Coalesce:3,LogicalOR:4,LogicalAND:5,BitwiseOR:6,BitwiseXOR:7,BitwiseAND:8,Equality:9,Relational:10,BitwiseSHIFT:11,Additive:12,Multiplicative:13,Exponentiation:14,Await:15,Unary:15,Postfix:16,OptionalChaining:17,Call:18,New:19,TaggedTemplate:20,Member:21,Primary:22},r={"??":n.Coalesce,"||":n.LogicalOR,"&&":n.LogicalAND,"|":n.BitwiseOR,"^":n.BitwiseXOR,"&":n.BitwiseAND,"==":n.Equality,"!=":n.Equality,"===":n.Equality,"!==":n.Equality,is:n.Equality,isnt:n.Equality,"<":n.Relational,">":n.Relational,"<=":n.Relational,">=":n.Relational,in:n.Relational,instanceof:n.Relational,"<<":n.BitwiseSHIFT,">>":n.BitwiseSHIFT,">>>":n.BitwiseSHIFT,"+":n.Additive,"-":n.Additive,"*":n.Multiplicative,"%":n.Multiplicative,"/":n.Multiplicative,"**":n.Exponentiation};var D=1,O=2,ne=4,re=8,k=16,A=32,ie=64,ae=O|ne,oe=D|O,j=D|O|ne,se=D,ce=ne,le=D|ne,M=D,ue=D|A,N=0,de=D|k,fe=D|re;function pe(){return{indent:null,base:null,parse:null,comment:!1,format:{indent:{style:`    `,base:0,adjustMultilineComment:!1},newline:`
`,space:` `,json:!1,renumber:!1,hexadecimal:!1,quotes:`single`,escapeless:!1,compact:!1,parentheses:!0,semicolons:!0,safeConcatenation:!1,preserveBlankLines:!1},moz:{comprehensionExpressionStartsWithAssignment:!1,starlessGenerator:!1},sourceMap:null,sourceMapRoot:null,sourceMapWithCode:!1,directive:!1,raw:!0,verbatim:null,sourceCode:null}}function me(e,t){var n=``;for(t|=0;t>0;t>>>=1,e+=e)t&1&&(n+=e);return n}function he(e){return/[\r\n]/g.test(e)}function P(e){var t=e.length;return t&&o.code.isLineTerminator(e.charCodeAt(t-1))}function ge(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function F(e,t){var n,r;function i(e){return typeof e==`object`&&e instanceof Object&&!(e instanceof RegExp)}for(n in t)t.hasOwnProperty(n)&&(r=t[n],i(r)?i(e[n])?F(e[n],r):e[n]=F({},r):e[n]=r);return e}function I(e){var t,n,r,i,a;if(e!==e)throw Error(`Numeric literal whose value is NaN`);if(e<0||e===0&&1/e<0)throw Error(`Numeric literal whose value is negative`);if(e===1/0)return l?`null`:u?`1e400`:`1e+400`;if(t=``+e,!u||t.length<3)return t;for(n=t.indexOf(`.`),!l&&t.charCodeAt(0)===48&&n===1&&(n=0,t=t.slice(1)),r=t,t=t.replace(`e+`,`e`),i=0,(a=r.indexOf(`e`))>0&&(i=+r.slice(a+1),r=r.slice(0,a)),n>=0&&(i-=r.length-n-1,r=+(r.slice(0,n)+r.slice(n+1))+``),a=0;r.charCodeAt(r.length+a-1)===48;)--a;return a!==0&&(i-=a,r=r.slice(0,a)),i!==0&&(r+=`e`+i),(r.length<t.length||d&&e>0xe8d4a51000&&Math.floor(e)===e&&(r=`0x`+e.toString(16)).length<t.length)&&+r===e&&(t=r),t}function _e(e,t){return(e&-2)==8232?(t?`u`:`\\u`)+(e===8232?`2028`:`2029`):e===10||e===13?(t?``:`\\`)+(e===10?`n`:`r`):String.fromCharCode(e)}function L(e){var t,n,r,i,a,o,s,c;if(n=e.toString(),e.source){if(t=n.match(/\/([^/]*)$/),!t)return n;for(r=t[1],n=``,s=!1,c=!1,i=0,a=e.source.length;i<a;++i)o=e.source.charCodeAt(i),c?(n+=_e(o,c),c=!1):(s?o===93&&(s=!1):o===47?n+=`\\`:o===91&&(s=!0),n+=_e(o,c),c=o===92);return`/`+n+`/`+r}return n}function ve(e,t){var n;return e===8?`\\b`:e===12?`\\f`:e===9?`\\t`:(n=e.toString(16).toUpperCase(),l||e>255?`\\u`+`0000`.slice(n.length)+n:e===0&&!o.code.isDecimalDigit(t)?`\\0`:e===11?`\\x0B`:`\\x`+`00`.slice(n.length)+n)}function ye(e){if(e===92)return`\\\\`;if(e===10)return`\\n`;if(e===13)return`\\r`;if(e===8232)return`\\u2028`;if(e===8233)return`\\u2029`;throw Error(`Incorrectly classified character`)}function be(e){var t,n,r,i;for(i=f===`double`?`"`:`'`,t=0,n=e.length;t<n;++t)if(r=e.charCodeAt(t),r===39){i=`"`;break}else if(r===34){i=`'`;break}else r===92&&++t;return i+e+i}function R(e){var t=``,n,r,i,a=0,s=0,c,u;for(n=0,r=e.length;n<r;++n){if(i=e.charCodeAt(n),i===39)++a;else if(i===34)++s;else if(i===47&&l)t+=`\\`;else if(o.code.isLineTerminator(i)||i===92){t+=ye(i);continue}else if(!o.code.isIdentifierPartES5(i)&&(l&&i<32||!l&&!p&&(i<32||i>126))){t+=ve(i,e.charCodeAt(n+1));continue}t+=String.fromCharCode(i)}if(c=!(f===`double`||f===`auto`&&s<a),u=c?`'`:`"`,!(c?a:s))return u+t+u;for(e=t,t=u,n=0,r=e.length;n<r;++n)i=e.charCodeAt(n),(i===39&&c||i===34&&!c)&&(t+=`\\`),t+=String.fromCharCode(i);return t+u}function xe(e){var t,n,r,i=``;for(t=0,n=e.length;t<n;++t)r=e[t],i+=Array.isArray(r)?xe(r):r;return i}function z(e,t){if(!S)return Array.isArray(e)?xe(e):e;if(t==null){if(e instanceof i)return e;t={}}return t.loc==null?new i(null,null,S,e,t.name||null):new i(t.loc.start.line,t.loc.start.column,S===!0?t.loc.source||null:S,e,t.name||null)}function Se(){return h||` `}function B(e,t){var n,r,i,a;return n=z(e).toString(),n.length===0?[t]:(r=z(t).toString(),r.length===0?[e]:(i=n.charCodeAt(n.length-1),a=r.charCodeAt(0),(i===43||i===45)&&i===a||o.code.isIdentifierPartES5(i)&&o.code.isIdentifierPartES5(a)||i===47&&a===105?[e,Se(),t]:o.code.isWhiteSpace(i)||o.code.isLineTerminator(i)||o.code.isWhiteSpace(a)||o.code.isLineTerminator(a)?[e,t]:[e,h,t]))}function Ce(e){return[s,e]}function we(e){var t=s;s+=c,e(s),s=t}function Te(e){var t;for(t=e.length-1;t>=0&&!o.code.isLineTerminator(e.charCodeAt(t));--t);return e.length-1-t}function V(e,t){var n,r,i,a,c,l,u,d;for(n=e.split(/\r\n|[\r\n]/),l=Number.MAX_VALUE,r=1,i=n.length;r<i;++r){for(a=n[r],c=0;c<a.length&&o.code.isWhiteSpace(a.charCodeAt(c));)++c;l>c&&(l=c)}for(typeof t<`u`?(u=s,n[1][l]===`*`&&(t+=` `),s=t):(l&1&&--l,u=s),r=1,i=n.length;r<i;++r)d=z(Ce(n[r].slice(l))),n[r]=S?d.join(``):d;return s=u,n.join(`
`)}function Ee(e,t){if(e.type===`Line`){if(P(e.value))return`//`+e.value;var n=`//`+e.value;return w||(n+=`
`),n}return b.format.indent.adjustMultilineComment&&/[\n\r]/.test(e.value)?V(`/*`+e.value+`*/`,t):`/*`+e.value+`*/`}function De(e,n){var r,i,a,o,l,u,d,f,p,m,h,g,_,y;if(e.leadingComments&&e.leadingComments.length>0){if(o=n,w){for(a=e.leadingComments[0],n=[],f=a.extendedRange,p=a.range,h=C.substring(f[0],p[0]),y=(h.match(/\n/g)||[]).length,y>0?(n.push(me(`
`,y)),n.push(Ce(Ee(a)))):(n.push(h),n.push(Ee(a))),m=p,r=1,i=e.leadingComments.length;r<i;r++)a=e.leadingComments[r],p=a.range,g=C.substring(m[1],p[0]),y=(g.match(/\n/g)||[]).length,n.push(me(`
`,y)),n.push(Ce(Ee(a))),m=p;_=C.substring(p[1],f[1]),y=(_.match(/\n/g)||[]).length,n.push(me(`
`,y))}else for(a=e.leadingComments[0],n=[],v&&e.type===t.Program&&e.body.length===0&&n.push(`
`),n.push(Ee(a)),P(z(n).toString())||n.push(`
`),r=1,i=e.leadingComments.length;r<i;++r)a=e.leadingComments[r],d=[Ee(a)],P(z(d).toString())||d.push(`
`),n.push(Ce(d));n.push(Ce(o))}if(e.trailingComments)if(w)a=e.trailingComments[0],f=a.extendedRange,p=a.range,h=C.substring(f[0],p[0]),y=(h.match(/\n/g)||[]).length,y>0?(n.push(me(`
`,y)),n.push(Ce(Ee(a)))):(n.push(h),n.push(Ee(a)));else for(l=!P(z(n).toString()),u=me(` `,Te(z([s,n,c]).toString())),r=0,i=e.trailingComments.length;r<i;++r)a=e.trailingComments[r],l?(n=r===0?[n,c]:[n,u],n.push(Ee(a,u))):n=[n,Ce(Ee(a))],r!==i-1&&!P(z(n).toString())&&(n=[n,`
`]);return n}function Oe(e,t,n){var r,i=0;for(r=e;r<t;r++)C[r]===`
`&&i++;for(r=1;r<i;r++)n.push(m)}function ke(e,t,n){return t<n?[`(`,e,`)`]:e}function Ae(e){var t,n,r;for(r=e.split(/\r\n|\n/),t=1,n=r.length;t<n;t++)r[t]=m+s+r[t];return r}function je(e,t){var r,i,a;return r=e[b.verbatim],typeof r==`string`?i=ke(Ae(r),n.Sequence,t):(i=Ae(r.content),a=r.precedence==null?n.Sequence:r.precedence,i=ke(i,a,t)),z(i,e)}function Me(){}Me.prototype.maybeBlock=function(e,n){var r,i,a=this;return i=!b.comment||!e.leadingComments,e.type===t.BlockStatement&&i?[h,this.generateStatement(e,n)]:e.type===t.EmptyStatement&&i?`;`:(we(function(){r=[m,Ce(a.generateStatement(e,n))]}),r)},Me.prototype.maybeBlockSuffix=function(e,n){var r=P(z(n).toString());return e.type===t.BlockStatement&&(!b.comment||!e.leadingComments)&&!r?[n,h]:r?[n,s]:[n,m,s]};function H(e){return z(e.name,e)}function U(e,t){return e.async?`async`+(t?Se():h):``}function Ne(e){return e.generator&&!b.moz.starlessGenerator?`*`+h:``}function Pe(e){var t=e.value,n=``;return t.async&&(n+=U(t,!e.computed)),t.generator&&(n+=Ne(t)?`*`:``),n}Me.prototype.generatePattern=function(e,n,r){return e.type===t.Identifier?H(e):this.generateExpression(e,n,r)},Me.prototype.generateFunctionParams=function(e){var r,i,a,o;if(o=!1,e.type===t.ArrowFunctionExpression&&!e.rest&&(!e.defaults||e.defaults.length===0)&&e.params.length===1&&e.params[0].type===t.Identifier)a=[U(e,!0),H(e.params[0])];else{for(a=e.type===t.ArrowFunctionExpression?[U(e,!1)]:[],a.push(`(`),e.defaults&&(o=!0),r=0,i=e.params.length;r<i;++r)o&&e.defaults[r]?a.push(this.generateAssignment(e.params[r],e.defaults[r],`=`,n.Assignment,j)):a.push(this.generatePattern(e.params[r],n.Assignment,j)),r+1<i&&a.push(`,`+h);e.rest&&(e.params.length&&a.push(`,`+h),a.push(`...`),a.push(H(e.rest))),a.push(`)`)}return a},Me.prototype.generateFunctionBody=function(e){var r,i;return r=this.generateFunctionParams(e),e.type===t.ArrowFunctionExpression&&(r.push(h),r.push(`=>`)),e.expression?(r.push(h),i=this.generateExpression(e.body,n.Assignment,j),i.toString().charAt(0)===`{`&&(i=[`(`,i,`)`]),r.push(i)):r.push(this.maybeBlock(e.body,fe)),r},Me.prototype.generateIterationForStatement=function(e,r,i){var a=[`for`+(r.await?Se()+`await`:``)+h+`(`],o=this;return we(function(){r.left.type===t.VariableDeclaration?we(function(){a.push(r.left.kind+Se()),a.push(o.generateStatement(r.left.declarations[0],N))}):a.push(o.generateExpression(r.left,n.Call,j)),a=B(a,e),a=[B(a,o.generateExpression(r.right,n.Assignment,j)),`)`]}),a.push(this.maybeBlock(r.body,i)),a},Me.prototype.generatePropertyKey=function(e,t){var r=[];return t&&r.push(`[`),r.push(this.generateExpression(e,n.Assignment,j)),t&&r.push(`]`),r},Me.prototype.generateAssignment=function(e,t,r,i,a){return n.Assignment<i&&(a|=D),ke([this.generateExpression(e,n.Call,a),h+r+h,this.generateExpression(t,n.Assignment,a)],n.Assignment,i)},Me.prototype.semicolon=function(e){return!_&&e&A?``:`;`},Me.Statement={BlockStatement:function(e,t){var n,r,i=[`{`,m],a=this;return we(function(){e.body.length===0&&w&&(n=e.range,n[1]-n[0]>2&&(r=C.substring(n[0]+1,n[1]-1),r[0]===`
`&&(i=[`{`]),i.push(r)));var o,s,c,l;for(l=M,t&re&&(l|=k),o=0,s=e.body.length;o<s;++o)w&&(o===0&&(e.body[0].leadingComments&&(n=e.body[0].leadingComments[0].extendedRange,r=C.substring(n[0],n[1]),r[0]===`
`&&(i=[`{`])),e.body[0].leadingComments||Oe(e.range[0],e.body[0].range[0],i)),o>0&&!e.body[o-1].trailingComments&&!e.body[o].leadingComments&&Oe(e.body[o-1].range[1],e.body[o].range[0],i)),o===s-1&&(l|=A),c=e.body[o].leadingComments&&w?a.generateStatement(e.body[o],l):Ce(a.generateStatement(e.body[o],l)),i.push(c),P(z(c).toString())||w&&o<s-1&&e.body[o+1].leadingComments||i.push(m),w&&o===s-1&&(e.body[o].trailingComments||Oe(e.body[o].range[1],e.range[1],i))}),i.push(Ce(`}`)),i},BreakStatement:function(e,t){return e.label?`break `+e.label.name+this.semicolon(t):`break`+this.semicolon(t)},ContinueStatement:function(e,t){return e.label?`continue `+e.label.name+this.semicolon(t):`continue`+this.semicolon(t)},ClassBody:function(e,t){var r=[`{`,m],i=this;return we(function(t){var a,o;for(a=0,o=e.body.length;a<o;++a)r.push(t),r.push(i.generateExpression(e.body[a],n.Sequence,j)),a+1<o&&r.push(m)}),P(z(r).toString())||r.push(m),r.push(s),r.push(`}`),r},ClassDeclaration:function(e,t){var r,i;return r=[`class`],e.id&&(r=B(r,this.generateExpression(e.id,n.Sequence,j))),e.superClass&&(i=B(`extends`,this.generateExpression(e.superClass,n.Unary,j)),r=B(r,i)),r.push(h),r.push(this.generateStatement(e.body,ue)),r},DirectiveStatement:function(e,t){return b.raw&&e.raw?e.raw+this.semicolon(t):be(e.directive)+this.semicolon(t)},DoWhileStatement:function(e,t){var r=B(`do`,this.maybeBlock(e.body,M));return r=this.maybeBlockSuffix(e.body,r),B(r,[`while`+h+`(`,this.generateExpression(e.test,n.Sequence,j),`)`+this.semicolon(t)])},CatchClause:function(e,t){var r,i=this;return we(function(){var t;e.param?(r=[`catch`+h+`(`,i.generateExpression(e.param,n.Sequence,j),`)`],e.guard&&(t=i.generateExpression(e.guard,n.Sequence,j),r.splice(2,0,` if `,t))):r=[`catch`]}),r.push(this.maybeBlock(e.body,M)),r},DebuggerStatement:function(e,t){return`debugger`+this.semicolon(t)},EmptyStatement:function(e,t){return`;`},ExportDefaultDeclaration:function(e,t){var r=[`export`],i;return i=t&A?ue:M,r=B(r,`default`),r=E(e.declaration)?B(r,this.generateStatement(e.declaration,i)):B(r,this.generateExpression(e.declaration,n.Assignment,j)+this.semicolon(t)),r},ExportNamedDeclaration:function(e,r){var i=[`export`],a,o=this;return a=r&A?ue:M,e.declaration?B(i,this.generateStatement(e.declaration,a)):(e.specifiers&&(e.specifiers.length===0?i=B(i,`{`+h+`}`):e.specifiers[0].type===t.ExportBatchSpecifier?i=B(i,this.generateExpression(e.specifiers[0],n.Sequence,j)):(i=B(i,`{`),we(function(t){var r,a;for(i.push(m),r=0,a=e.specifiers.length;r<a;++r)i.push(t),i.push(o.generateExpression(e.specifiers[r],n.Sequence,j)),r+1<a&&i.push(`,`+m)}),P(z(i).toString())||i.push(m),i.push(s+`}`)),e.source?i=B(i,[`from`+h,this.generateExpression(e.source,n.Sequence,j),this.semicolon(r)]):i.push(this.semicolon(r))),i)},ExportAllDeclaration:function(e,t){return[`export`+h,`*`+h,`from`+h,this.generateExpression(e.source,n.Sequence,j),this.semicolon(t)]},ExpressionStatement:function(e,r){var i,a;function s(e){var t;return e.slice(0,5)===`class`?(t=e.charCodeAt(5),t===123||o.code.isWhiteSpace(t)||o.code.isLineTerminator(t)):!1}function c(e){var t;return e.slice(0,8)===`function`?(t=e.charCodeAt(8),t===40||o.code.isWhiteSpace(t)||t===42||o.code.isLineTerminator(t)):!1}function l(e){var t,n,r;if(e.slice(0,5)!==`async`||!o.code.isWhiteSpace(e.charCodeAt(5)))return!1;for(n=6,r=e.length;n<r&&o.code.isWhiteSpace(e.charCodeAt(n));++n);return n===r||e.slice(n,n+8)!==`function`?!1:(t=e.charCodeAt(n+8),t===40||o.code.isWhiteSpace(t)||t===42||o.code.isLineTerminator(t))}return i=[this.generateExpression(e.expression,n.Sequence,j)],a=z(i).toString(),a.charCodeAt(0)===123||s(a)||c(a)||l(a)||y&&r&k&&e.expression.type===t.Literal&&typeof e.expression.value==`string`?i=[`(`,i,`)`+this.semicolon(r)]:i.push(this.semicolon(r)),i},ImportDeclaration:function(e,r){var i,a,o=this;return e.specifiers.length===0?[`import`,h,this.generateExpression(e.source,n.Sequence,j),this.semicolon(r)]:(i=[`import`],a=0,e.specifiers[a].type===t.ImportDefaultSpecifier&&(i=B(i,[this.generateExpression(e.specifiers[a],n.Sequence,j)]),++a),e.specifiers[a]&&(a!==0&&i.push(`,`),e.specifiers[a].type===t.ImportNamespaceSpecifier?i=B(i,[h,this.generateExpression(e.specifiers[a],n.Sequence,j)]):(i.push(h+`{`),e.specifiers.length-a===1?(i.push(h),i.push(this.generateExpression(e.specifiers[a],n.Sequence,j)),i.push(h+`}`+h)):(we(function(t){var r,s;for(i.push(m),r=a,s=e.specifiers.length;r<s;++r)i.push(t),i.push(o.generateExpression(e.specifiers[r],n.Sequence,j)),r+1<s&&i.push(`,`+m)}),P(z(i).toString())||i.push(m),i.push(s+`}`+h)))),i=B(i,[`from`+h,this.generateExpression(e.source,n.Sequence,j),this.semicolon(r)]),i)},VariableDeclarator:function(e,t){var r=t&D?j:ae;return e.init?[this.generateExpression(e.id,n.Assignment,r),h,`=`,h,this.generateExpression(e.init,n.Assignment,r)]:this.generatePattern(e.id,n.Assignment,r)},VariableDeclaration:function(e,t){var n,r,i,a,o,s=this;n=[e.kind],o=t&D?M:N;function c(){for(a=e.declarations[0],b.comment&&a.leadingComments?(n.push(`
`),n.push(Ce(s.generateStatement(a,o)))):(n.push(Se()),n.push(s.generateStatement(a,o))),r=1,i=e.declarations.length;r<i;++r)a=e.declarations[r],b.comment&&a.leadingComments?(n.push(`,`+m),n.push(Ce(s.generateStatement(a,o)))):(n.push(`,`+h),n.push(s.generateStatement(a,o)))}return e.declarations.length>1?we(c):c(),n.push(this.semicolon(t)),n},ThrowStatement:function(e,t){return[B(`throw`,this.generateExpression(e.argument,n.Sequence,j)),this.semicolon(t)]},TryStatement:function(e,t){var n,r,i,a;if(n=[`try`,this.maybeBlock(e.block,M)],n=this.maybeBlockSuffix(e.block,n),e.handlers)for(r=0,i=e.handlers.length;r<i;++r)n=B(n,this.generateStatement(e.handlers[r],M)),(e.finalizer||r+1!==i)&&(n=this.maybeBlockSuffix(e.handlers[r].body,n));else{for(a=e.guardedHandlers||[],r=0,i=a.length;r<i;++r)n=B(n,this.generateStatement(a[r],M)),(e.finalizer||r+1!==i)&&(n=this.maybeBlockSuffix(a[r].body,n));if(e.handler)if(Array.isArray(e.handler))for(r=0,i=e.handler.length;r<i;++r)n=B(n,this.generateStatement(e.handler[r],M)),(e.finalizer||r+1!==i)&&(n=this.maybeBlockSuffix(e.handler[r].body,n));else n=B(n,this.generateStatement(e.handler,M)),e.finalizer&&(n=this.maybeBlockSuffix(e.handler.body,n))}return e.finalizer&&(n=B(n,[`finally`,this.maybeBlock(e.finalizer,M)])),n},SwitchStatement:function(e,t){var r,i,a,o,s,c=this;if(we(function(){r=[`switch`+h+`(`,c.generateExpression(e.discriminant,n.Sequence,j),`)`+h+`{`+m]}),e.cases)for(s=M,a=0,o=e.cases.length;a<o;++a)a===o-1&&(s|=A),i=Ce(this.generateStatement(e.cases[a],s)),r.push(i),P(z(i).toString())||r.push(m);return r.push(Ce(`}`)),r},SwitchCase:function(e,r){var i,a,o,s,c,l=this;return we(function(){for(i=e.test?[B(`case`,l.generateExpression(e.test,n.Sequence,j)),`:`]:[`default:`],o=0,s=e.consequent.length,s&&e.consequent[0].type===t.BlockStatement&&(a=l.maybeBlock(e.consequent[0],M),i.push(a),o=1),o!==s&&!P(z(i).toString())&&i.push(m),c=M;o<s;++o)o===s-1&&r&A&&(c|=A),a=Ce(l.generateStatement(e.consequent[o],c)),i.push(a),o+1!==s&&!P(z(a).toString())&&i.push(m)}),i},IfStatement:function(e,r){var i,a,o,s=this;return we(function(){i=[`if`+h+`(`,s.generateExpression(e.test,n.Sequence,j),`)`]}),o=r&A,a=M,o&&(a|=A),e.alternate?(i.push(this.maybeBlock(e.consequent,M)),i=this.maybeBlockSuffix(e.consequent,i),i=e.alternate.type===t.IfStatement?B(i,[`else `,this.generateStatement(e.alternate,a)]):B(i,B(`else`,this.maybeBlock(e.alternate,a)))):i.push(this.maybeBlock(e.consequent,a)),i},ForStatement:function(e,r){var i,a=this;return we(function(){i=[`for`+h+`(`],e.init?e.init.type===t.VariableDeclaration?i.push(a.generateStatement(e.init,N)):(i.push(a.generateExpression(e.init,n.Sequence,ae)),i.push(`;`)):i.push(`;`),e.test&&(i.push(h),i.push(a.generateExpression(e.test,n.Sequence,j))),i.push(`;`),e.update&&(i.push(h),i.push(a.generateExpression(e.update,n.Sequence,j))),i.push(`)`)}),i.push(this.maybeBlock(e.body,r&A?ue:M)),i},ForInStatement:function(e,t){return this.generateIterationForStatement(`in`,e,t&A?ue:M)},ForOfStatement:function(e,t){return this.generateIterationForStatement(`of`,e,t&A?ue:M)},LabeledStatement:function(e,t){return[e.label.name+`:`,this.maybeBlock(e.body,t&A?ue:M)]},Program:function(e,t){var n,r,i,a,o;for(a=e.body.length,n=[v&&a>0?`
`:``],o=de,i=0;i<a;++i)!v&&i===a-1&&(o|=A),w&&(i===0&&(e.body[0].leadingComments||Oe(e.range[0],e.body[i].range[0],n)),i>0&&!e.body[i-1].trailingComments&&!e.body[i].leadingComments&&Oe(e.body[i-1].range[1],e.body[i].range[0],n)),r=Ce(this.generateStatement(e.body[i],o)),n.push(r),i+1<a&&!P(z(r).toString())&&(w&&e.body[i+1].leadingComments||n.push(m)),w&&i===a-1&&(e.body[i].trailingComments||Oe(e.body[i].range[1],e.range[1],n));return n},FunctionDeclaration:function(e,t){return[U(e,!0),`function`,Ne(e)||Se(),e.id?H(e.id):``,this.generateFunctionBody(e)]},ReturnStatement:function(e,t){return e.argument?[B(`return`,this.generateExpression(e.argument,n.Sequence,j)),this.semicolon(t)]:[`return`+this.semicolon(t)]},WhileStatement:function(e,t){var r,i=this;return we(function(){r=[`while`+h+`(`,i.generateExpression(e.test,n.Sequence,j),`)`]}),r.push(this.maybeBlock(e.body,t&A?ue:M)),r},WithStatement:function(e,t){var r,i=this;return we(function(){r=[`with`+h+`(`,i.generateExpression(e.object,n.Sequence,j),`)`]}),r.push(this.maybeBlock(e.body,t&A?ue:M)),r}},ge(Me.prototype,Me.Statement),Me.Expression={SequenceExpression:function(e,t,r){var i,a,o;for(n.Sequence<t&&(r|=D),i=[],a=0,o=e.expressions.length;a<o;++a)i.push(this.generateExpression(e.expressions[a],n.Assignment,r)),a+1<o&&i.push(`,`+h);return ke(i,n.Sequence,t)},AssignmentExpression:function(e,t,n){return this.generateAssignment(e.left,e.right,e.operator,t,n)},ArrowFunctionExpression:function(e,t,r){return ke(this.generateFunctionBody(e),n.ArrowFunction,t)},ConditionalExpression:function(e,t,r){return n.Conditional<t&&(r|=D),ke([this.generateExpression(e.test,n.Coalesce,r),h+`?`+h,this.generateExpression(e.consequent,n.Assignment,r),h+`:`+h,this.generateExpression(e.alternate,n.Assignment,r)],n.Conditional,t)},LogicalExpression:function(e,t,n){return e.operator===`??`&&(n|=ie),this.BinaryExpression(e,t,n)},BinaryExpression:function(e,t,i){var a,s,c,l,u,d;return l=r[e.operator],s=e.operator===`**`?n.Postfix:l,c=e.operator===`**`?l:l+1,l<t&&(i|=D),u=this.generateExpression(e.left,s,i),d=u.toString(),a=d.charCodeAt(d.length-1)===47&&o.code.isIdentifierPartES5(e.operator.charCodeAt(0))?[u,Se(),e.operator]:B(u,e.operator),u=this.generateExpression(e.right,c,i),e.operator===`/`&&u.toString().charAt(0)===`/`||e.operator.slice(-1)===`<`&&u.toString().slice(0,3)===`!--`?(a.push(Se()),a.push(u)):a=B(a,u),e.operator===`in`&&!(i&D)||(e.operator===`||`||e.operator===`&&`)&&i&ie?[`(`,a,`)`]:ke(a,l,t)},CallExpression:function(e,t,r){var i,a,o;for(i=[this.generateExpression(e.callee,n.Call,oe)],e.optional&&i.push(`?.`),i.push(`(`),a=0,o=e.arguments.length;a<o;++a)i.push(this.generateExpression(e.arguments[a],n.Assignment,j)),a+1<o&&i.push(`,`+h);return i.push(`)`),r&O?ke(i,n.Call,t):[`(`,i,`)`]},ChainExpression:function(e,t,r){return n.OptionalChaining<t&&(r|=O),ke(this.generateExpression(e.expression,n.OptionalChaining,r),n.OptionalChaining,t)},NewExpression:function(e,t,r){var i,a,o,s,c;if(a=e.arguments.length,c=r&ne&&!g&&a===0?le:se,i=B(`new`,this.generateExpression(e.callee,n.New,c)),!(r&ne)||g||a>0){for(i.push(`(`),o=0,s=a;o<s;++o)i.push(this.generateExpression(e.arguments[o],n.Assignment,j)),o+1<s&&i.push(`,`+h);i.push(`)`)}return ke(i,n.New,t)},MemberExpression:function(e,r,i){var a,s;return a=[this.generateExpression(e.object,n.Call,i&O?oe:se)],e.computed?(e.optional&&a.push(`?.`),a.push(`[`),a.push(this.generateExpression(e.property,n.Sequence,i&O?j:le)),a.push(`]`)):(!e.optional&&e.object.type===t.Literal&&typeof e.object.value==`number`&&(s=z(a).toString(),s.indexOf(`.`)<0&&!/[eExX]/.test(s)&&o.code.isDecimalDigit(s.charCodeAt(s.length-1))&&!(s.length>=2&&s.charCodeAt(0)===48)&&a.push(` `)),a.push(e.optional?`?.`:`.`),a.push(H(e.property))),ke(a,n.Member,r)},MetaProperty:function(e,t,r){var i;return i=[],i.push(typeof e.meta==`string`?e.meta:H(e.meta)),i.push(`.`),i.push(typeof e.property==`string`?e.property:H(e.property)),ke(i,n.Member,t)},UnaryExpression:function(e,t,r){var i,a,s,c,l;return a=this.generateExpression(e.argument,n.Unary,j),h===``?i=B(e.operator,a):(i=[e.operator],e.operator.length>2?i=B(i,a):(c=z(i).toString(),l=c.charCodeAt(c.length-1),s=a.toString().charCodeAt(0),((l===43||l===45)&&l===s||o.code.isIdentifierPartES5(l)&&o.code.isIdentifierPartES5(s))&&i.push(Se()),i.push(a))),ke(i,n.Unary,t)},YieldExpression:function(e,t,r){var i;return i=e.delegate?`yield*`:`yield`,e.argument&&(i=B(i,this.generateExpression(e.argument,n.Yield,j))),ke(i,n.Yield,t)},AwaitExpression:function(e,t,r){return ke(B(e.all?`await*`:`await`,this.generateExpression(e.argument,n.Await,j)),n.Await,t)},UpdateExpression:function(e,t,r){return e.prefix?ke([e.operator,this.generateExpression(e.argument,n.Unary,j)],n.Unary,t):ke([this.generateExpression(e.argument,n.Postfix,j),e.operator],n.Postfix,t)},FunctionExpression:function(e,t,n){var r=[U(e,!0),`function`];return e.id?(r.push(Ne(e)||Se()),r.push(H(e.id))):r.push(Ne(e)||h),r.push(this.generateFunctionBody(e)),r},ArrayPattern:function(e,t,n){return this.ArrayExpression(e,t,n,!0)},ArrayExpression:function(e,t,r,i){var a,o,c=this;return e.elements.length?(o=i?!1:e.elements.length>1,a=[`[`,o?m:``],we(function(t){var r,i;for(r=0,i=e.elements.length;r<i;++r)e.elements[r]?(a.push(o?t:``),a.push(c.generateExpression(e.elements[r],n.Assignment,j))):(o&&a.push(t),r+1===i&&a.push(`,`)),r+1<i&&a.push(`,`+(o?m:h))}),o&&!P(z(a).toString())&&a.push(m),a.push(o?s:``),a.push(`]`),a):`[]`},RestElement:function(e,t,n){return`...`+this.generatePattern(e.argument)},ClassExpression:function(e,t,r){var i,a;return i=[`class`],e.id&&(i=B(i,this.generateExpression(e.id,n.Sequence,j))),e.superClass&&(a=B(`extends`,this.generateExpression(e.superClass,n.Unary,j)),i=B(i,a)),i.push(h),i.push(this.generateStatement(e.body,ue)),i},MethodDefinition:function(e,t,n){var r,i;return r=e.static?[`static`+h]:[],i=e.kind===`get`||e.kind===`set`?[B(e.kind,this.generatePropertyKey(e.key,e.computed)),this.generateFunctionBody(e.value)]:[Pe(e),this.generatePropertyKey(e.key,e.computed),this.generateFunctionBody(e.value)],B(r,i)},Property:function(e,t,r){return e.kind===`get`||e.kind===`set`?[e.kind,Se(),this.generatePropertyKey(e.key,e.computed),this.generateFunctionBody(e.value)]:e.shorthand?e.value.type===`AssignmentPattern`?this.AssignmentPattern(e.value,n.Sequence,j):this.generatePropertyKey(e.key,e.computed):e.method?[Pe(e),this.generatePropertyKey(e.key,e.computed),this.generateFunctionBody(e.value)]:[this.generatePropertyKey(e.key,e.computed),`:`+h,this.generateExpression(e.value,n.Assignment,j)]},ObjectExpression:function(e,t,r){var i,a,o,c=this;return e.properties.length?(i=e.properties.length>1,we(function(){o=c.generateExpression(e.properties[0],n.Sequence,j)}),!i&&!he(z(o).toString())?[`{`,h,o,h,`}`]:(we(function(t){var r,s;if(a=[`{`,m,t,o],i)for(a.push(`,`+m),r=1,s=e.properties.length;r<s;++r)a.push(t),a.push(c.generateExpression(e.properties[r],n.Sequence,j)),r+1<s&&a.push(`,`+m)}),P(z(a).toString())||a.push(m),a.push(s),a.push(`}`),a)):`{}`},AssignmentPattern:function(e,t,n){return this.generateAssignment(e.left,e.right,`=`,t,n)},ObjectPattern:function(e,r,i){var a,o,c,l,u,d=this;if(!e.properties.length)return`{}`;if(l=!1,e.properties.length===1)u=e.properties[0],u.type===t.Property&&u.value.type!==t.Identifier&&(l=!0);else for(o=0,c=e.properties.length;o<c;++o)if(u=e.properties[o],u.type===t.Property&&!u.shorthand){l=!0;break}return a=[`{`,l?m:``],we(function(t){var r,i;for(r=0,i=e.properties.length;r<i;++r)a.push(l?t:``),a.push(d.generateExpression(e.properties[r],n.Sequence,j)),r+1<i&&a.push(`,`+(l?m:h))}),l&&!P(z(a).toString())&&a.push(m),a.push(l?s:``),a.push(`}`),a},ThisExpression:function(e,t,n){return`this`},Super:function(e,t,n){return`super`},Identifier:function(e,t,n){return H(e)},ImportDefaultSpecifier:function(e,t,n){return H(e.id||e.local)},ImportNamespaceSpecifier:function(e,t,n){var r=[`*`],i=e.id||e.local;return i&&r.push(h+`as`+Se()+H(i)),r},ImportSpecifier:function(e,t,n){var r=e.imported,i=[r.name],a=e.local;return a&&a.name!==r.name&&i.push(Se()+`as`+Se()+H(a)),i},ExportSpecifier:function(e,t,n){var r=e.local,i=[r.name],a=e.exported;return a&&a.name!==r.name&&i.push(Se()+`as`+Se()+H(a)),i},Literal:function(e,n,r){var i;if(e.hasOwnProperty(`raw`)&&x&&b.raw)try{if(i=x(e.raw).body[0].expression,i.type===t.Literal&&i.value===e.value)return e.raw}catch{}return e.regex?`/`+e.regex.pattern+`/`+e.regex.flags:typeof e.value==`bigint`?e.value.toString()+`n`:e.bigint?e.bigint+`n`:e.value===null?`null`:typeof e.value==`string`?R(e.value):typeof e.value==`number`?I(e.value):typeof e.value==`boolean`?e.value?`true`:`false`:L(e.value)},GeneratorExpression:function(e,t,n){return this.ComprehensionExpression(e,t,n)},ComprehensionExpression:function(e,r,i){var a,o,s,c,l=this;return a=e.type===t.GeneratorExpression?[`(`]:[`[`],b.moz.comprehensionExpressionStartsWithAssignment&&(c=this.generateExpression(e.body,n.Assignment,j),a.push(c)),e.blocks&&we(function(){for(o=0,s=e.blocks.length;o<s;++o)c=l.generateExpression(e.blocks[o],n.Sequence,j),o>0||b.moz.comprehensionExpressionStartsWithAssignment?a=B(a,c):a.push(c)}),e.filter&&(a=B(a,`if`+h),c=this.generateExpression(e.filter,n.Sequence,j),a=B(a,[`(`,c,`)`])),b.moz.comprehensionExpressionStartsWithAssignment||(c=this.generateExpression(e.body,n.Assignment,j),a=B(a,c)),a.push(e.type===t.GeneratorExpression?`)`:`]`),a},ComprehensionBlock:function(e,r,i){var a;return a=e.left.type===t.VariableDeclaration?[e.left.kind,Se(),this.generateStatement(e.left.declarations[0],N)]:this.generateExpression(e.left,n.Call,j),a=B(a,e.of?`of`:`in`),a=B(a,this.generateExpression(e.right,n.Sequence,j)),[`for`+h+`(`,a,`)`]},SpreadElement:function(e,t,r){return[`...`,this.generateExpression(e.argument,n.Assignment,j)]},TaggedTemplateExpression:function(e,t,r){var i=oe;return r&O||(i=se),ke([this.generateExpression(e.tag,n.Call,i),this.generateExpression(e.quasi,n.Primary,ce)],n.TaggedTemplate,t)},TemplateElement:function(e,t,n){return e.value.raw},TemplateLiteral:function(e,t,r){var i,a,o;for(i=["`"],a=0,o=e.quasis.length;a<o;++a)i.push(this.generateExpression(e.quasis[a],n.Primary,j)),a+1<o&&(i.push("${"+h),i.push(this.generateExpression(e.expressions[a],n.Sequence,j)),i.push(h+`}`));return i.push("`"),i},ModuleSpecifier:function(e,t,n){return this.Literal(e,t,n)},ImportExpression:function(e,t,r){return ke([`import(`,this.generateExpression(e.source,n.Assignment,j),`)`],n.Call,t)}},ge(Me.prototype,Me.Expression),Me.prototype.generateExpression=function(e,n,r){var i,a;return a=e.type||t.Property,b.verbatim&&e.hasOwnProperty(b.verbatim)?je(e,n):(i=this[a](e,n,r),b.comment&&(i=De(e,i)),z(i,e))},Me.prototype.generateStatement=function(e,n){var r,i;return r=this[e.type](e,n),b.comment&&(r=De(e,r)),i=z(r).toString(),e.type===t.Program&&!v&&m===``&&i.charAt(i.length-1)===`
`&&(r=S?z(r).replaceRight(/\s+$/,``):i.replace(/\s+$/,``)),z(r,e)};function Fe(e){var t;if(t=new Me,E(e))return t.generateStatement(e,M);if(te(e))return t.generateExpression(e,n.Sequence,j);throw Error(`Unknown node type: `+e.type)}function Ie(t,n){var r=pe(),a,o;return n==null?(n=r,c=n.format.indent.style,s=me(c,n.format.indent.base)):(typeof n.indent==`string`&&(r.format.indent.style=n.indent),typeof n.base==`number`&&(r.format.indent.base=n.base),n=F(r,n),c=n.format.indent.style,s=typeof n.base==`string`?n.base:me(c,n.format.indent.base)),l=n.format.json,u=n.format.renumber,d=l?!1:n.format.hexadecimal,f=l?`double`:n.format.quotes,p=n.format.escapeless,m=n.format.newline,h=n.format.space,n.format.compact&&(m=h=c=s=``),g=n.format.parentheses,_=n.format.semicolons,v=n.format.safeConcatenation,y=n.directive,x=l?null:n.parse,S=n.sourceMap,C=n.sourceCode,w=n.format.preserveBlankLines&&C!==null,b=n,S&&(i=e.browser?global.sourceMap.SourceNode:fy().SourceNode),a=Fe(t),S?(o=a.toStringWithSourceMap({file:n.file,sourceRoot:n.sourceMapRoot}),n.sourceContent&&o.map.setSourceContent(n.sourceMap,n.sourceContent),n.sourceMapWithCode?o:o.map.toString()):(o={code:a.toString(),map:null},n.sourceMapWithCode?o:o.code)}ee={indent:{style:``,base:0},renumber:!0,hexadecimal:!0,quotes:`auto`,escapeless:!0,compact:!0,parentheses:!1,semicolons:!1},T=pe().format,e.version=py().version,e.generate=Ie,e.attachComments=a.attachComments,e.Precedence=F({},n),e.browser=!1,e.FORMAT_MINIFY=ee,e.FORMAT_DEFAULTS=T})()}}),hy=v_({"node_modules/acorn/dist/acorn.js"(e,t){(function(n,r){typeof e==`object`&&typeof t<`u`?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n||=self,r(n.acorn={}))})(e,(function(e){var t={3:`abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile`,5:`class enum extends super const export import`,6:`enum`,strict:`implements interface let package private protected public static yield`,strictBind:`eval arguments`},n=`break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this`,r={5:n,"5module":n+` export import`,6:n+` const class extends export import super`},i=/^in(stanceof)?$/,a=`ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ`,o=`‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿`,s=RegExp(`[`+a+`]`),c=RegExp(`[`+a+o+`]`);a=o=null;var l=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,349,41,7,1,79,28,11,0,9,21,107,20,28,22,13,52,76,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,230,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,35,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,190,0,80,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,689,63,129,74,6,0,67,12,65,1,2,0,29,6135,9,1237,43,8,8952,286,50,2,18,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,2357,44,11,6,17,0,370,43,1301,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42717,35,4148,12,221,3,5761,15,7472,3104,541,1507,4938],u=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,370,1,154,10,176,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,161,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,19306,9,135,4,60,6,26,9,1014,0,2,54,8,3,82,0,12,1,19628,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,262,6,10,9,419,13,1495,6,110,6,6,9,4759,9,787719,239];function d(e,t){for(var n=65536,r=0;r<t.length;r+=2){if(n+=t[r],n>e)return!1;if(n+=t[r+1],n>=e)return!0}}function f(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&s.test(String.fromCharCode(e)):t===!1?!1:d(e,l)}function p(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&c.test(String.fromCharCode(e)):t===!1?!1:d(e,l)||d(e,u)}var m=function(e,t){t===void 0&&(t={}),this.label=e,this.keyword=t.keyword,this.beforeExpr=!!t.beforeExpr,this.startsExpr=!!t.startsExpr,this.isLoop=!!t.isLoop,this.isAssign=!!t.isAssign,this.prefix=!!t.prefix,this.postfix=!!t.postfix,this.binop=t.binop||null,this.updateContext=null};function h(e,t){return new m(e,{beforeExpr:!0,binop:t})}var g={beforeExpr:!0},_={startsExpr:!0},v={};function y(e,t){return t===void 0&&(t={}),t.keyword=e,v[e]=new m(e,t)}var b={num:new m(`num`,_),regexp:new m(`regexp`,_),string:new m(`string`,_),name:new m(`name`,_),eof:new m(`eof`),bracketL:new m(`[`,{beforeExpr:!0,startsExpr:!0}),bracketR:new m(`]`),braceL:new m(`{`,{beforeExpr:!0,startsExpr:!0}),braceR:new m(`}`),parenL:new m(`(`,{beforeExpr:!0,startsExpr:!0}),parenR:new m(`)`),comma:new m(`,`,g),semi:new m(`;`,g),colon:new m(`:`,g),dot:new m(`.`),question:new m(`?`,g),questionDot:new m(`?.`),arrow:new m(`=>`,g),template:new m(`template`),invalidTemplate:new m(`invalidTemplate`),ellipsis:new m(`...`,g),backQuote:new m("`",_),dollarBraceL:new m("${",{beforeExpr:!0,startsExpr:!0}),eq:new m(`=`,{beforeExpr:!0,isAssign:!0}),assign:new m(`_=`,{beforeExpr:!0,isAssign:!0}),incDec:new m(`++/--`,{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new m(`!/~`,{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:h(`||`,1),logicalAND:h(`&&`,2),bitwiseOR:h(`|`,3),bitwiseXOR:h(`^`,4),bitwiseAND:h(`&`,5),equality:h(`==/!=/===/!==`,6),relational:h(`</>/<=/>=`,7),bitShift:h(`<</>>/>>>`,8),plusMin:new m(`+/-`,{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:h(`%`,10),star:h(`*`,10),slash:h(`/`,10),starstar:new m(`**`,{beforeExpr:!0}),coalesce:h(`??`,1),_break:y(`break`),_case:y(`case`,g),_catch:y(`catch`),_continue:y(`continue`),_debugger:y(`debugger`),_default:y(`default`,g),_do:y(`do`,{isLoop:!0,beforeExpr:!0}),_else:y(`else`,g),_finally:y(`finally`),_for:y(`for`,{isLoop:!0}),_function:y(`function`,_),_if:y(`if`),_return:y(`return`,g),_switch:y(`switch`),_throw:y(`throw`,g),_try:y(`try`),_var:y(`var`),_const:y(`const`),_while:y(`while`,{isLoop:!0}),_with:y(`with`),_new:y(`new`,{beforeExpr:!0,startsExpr:!0}),_this:y(`this`,_),_super:y(`super`,_),_class:y(`class`,_),_extends:y(`extends`,g),_export:y(`export`),_import:y(`import`,_),_null:y(`null`,_),_true:y(`true`,_),_false:y(`false`,_),_in:y(`in`,{beforeExpr:!0,binop:7}),_instanceof:y(`instanceof`,{beforeExpr:!0,binop:7}),_typeof:y(`typeof`,{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:y(`void`,{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:y(`delete`,{beforeExpr:!0,prefix:!0,startsExpr:!0})},x=/\r\n?|\n|\u2028|\u2029/,S=new RegExp(x.source,`g`);function C(e,t){return e===10||e===13||!t&&(e===8232||e===8233)}var w=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,ee=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,T=Object.prototype,te=T.hasOwnProperty,E=T.toString;function D(e,t){return te.call(e,t)}var O=Array.isArray||(function(e){return E.call(e)===`[object Array]`});function ne(e){return RegExp(`^(?:`+e.replace(/ /g,`|`)+`)$`)}var re=function(e,t){this.line=e,this.column=t};re.prototype.offset=function(e){return new re(this.line,this.column+e)};var k=function(e,t,n){this.start=t,this.end=n,e.sourceFile!==null&&(this.source=e.sourceFile)};function A(e,t){for(var n=1,r=0;;){S.lastIndex=r;var i=S.exec(e);if(i&&i.index<t)++n,r=i.index+i[0].length;else return new re(n,t-r)}}var ie={ecmaVersion:10,sourceType:`script`,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:!1,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1};function ae(e){var t={};for(var n in ie)t[n]=e&&D(e,n)?e[n]:ie[n];if(t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved??=t.ecmaVersion<5,O(t.onToken)){var r=t.onToken;t.onToken=function(e){return r.push(e)}}return O(t.onComment)&&(t.onComment=oe(t,t.onComment)),t}function oe(e,t){return function(n,r,i,a,o,s){var c={type:n?`Block`:`Line`,value:r,start:i,end:a};e.locations&&(c.loc=new k(this,o,s)),e.ranges&&(c.range=[i,a]),t.push(c)}}var j=1,se=2,ce=j|se,le=4,M=8,ue=16,N=32,de=64,fe=128;function pe(e,t){return se|(e?le:0)|(t?M:0)}var me=0,he=1,P=2,ge=3,F=4,I=5,_e=function(e,n,i){this.options=e=ae(e),this.sourceFile=e.sourceFile,this.keywords=ne(r[e.ecmaVersion>=6?6:e.sourceType===`module`?`5module`:5]);var a=``;if(e.allowReserved!==!0){for(var o=e.ecmaVersion;!(a=t[o]);o--);e.sourceType===`module`&&(a+=` await`)}this.reservedWords=ne(a);var s=(a?a+` `:``)+t.strict;this.reservedWordsStrict=ne(s),this.reservedWordsStrictBind=ne(s+` `+t.strictBind),this.input=String(n),this.containsEsc=!1,i?(this.pos=i,this.lineStart=this.input.lastIndexOf(`
`,i-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(x).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=b.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=e.sourceType===`module`,this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports={},this.pos===0&&e.allowHashBang&&this.input.slice(0,2)===`#!`&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(j),this.regexpState=null},L={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0}};_e.prototype.parse=function(){var e=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(e)},L.inFunction.get=function(){return(this.currentVarScope().flags&se)>0},L.inGenerator.get=function(){return(this.currentVarScope().flags&M)>0},L.inAsync.get=function(){return(this.currentVarScope().flags&le)>0},L.allowSuper.get=function(){return(this.currentThisScope().flags&de)>0},L.allowDirectSuper.get=function(){return(this.currentThisScope().flags&fe)>0},L.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())},_e.prototype.inNonArrowFunction=function(){return(this.currentThisScope().flags&se)>0},_e.extend=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];for(var n=this,r=0;r<e.length;r++)n=e[r](n);return n},_e.parse=function(e,t){return new this(t,e).parse()},_e.parseExpressionAt=function(e,t,n){var r=new this(n,e,t);return r.nextToken(),r.parseExpression()},_e.tokenizer=function(e,t){return new this(t,e)},Object.defineProperties(_e.prototype,L);var ve=_e.prototype,ye=/^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;ve.strictDirective=function(e){for(;;){ee.lastIndex=e,e+=ee.exec(this.input)[0].length;var t=ye.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])===`use strict`){ee.lastIndex=e+t[0].length;var n=ee.exec(this.input),r=n.index+n[0].length,i=this.input.charAt(r);return i===`;`||i===`}`||x.test(n[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(i)||i===`!`&&this.input.charAt(r+1)===`=`)}e+=t[0].length,ee.lastIndex=e,e+=ee.exec(this.input)[0].length,this.input[e]===`;`&&e++}},ve.eat=function(e){return this.type===e?(this.next(),!0):!1},ve.isContextual=function(e){return this.type===b.name&&this.value===e&&!this.containsEsc},ve.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1},ve.expectContextual=function(e){this.eatContextual(e)||this.unexpected()},ve.canInsertSemicolon=function(){return this.type===b.eof||this.type===b.braceR||x.test(this.input.slice(this.lastTokEnd,this.start))},ve.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},ve.semicolon=function(){!this.eat(b.semi)&&!this.insertSemicolon()&&this.unexpected()},ve.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0},ve.expect=function(e){this.eat(e)||this.unexpected()},ve.unexpected=function(e){this.raise(e??this.start,`Unexpected token`)};function be(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1}ve.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,`Comma is not permitted after the rest element`);var n=t?e.parenthesizedAssign:e.parenthesizedBind;n>-1&&this.raiseRecoverable(n,`Parenthesized pattern`)}},ve.checkExpressionErrors=function(e,t){if(!e)return!1;var n=e.shorthandAssign,r=e.doubleProto;if(!t)return n>=0||r>=0;n>=0&&this.raise(n,`Shorthand property assignments are valid only in destructuring patterns`),r>=0&&this.raiseRecoverable(r,`Redefinition of __proto__ property`)},ve.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,`Yield expression cannot be a default value`),this.awaitPos&&this.raise(this.awaitPos,`Await expression cannot be a default value`)},ve.isSimpleAssignTarget=function(e){return e.type===`ParenthesizedExpression`?this.isSimpleAssignTarget(e.expression):e.type===`Identifier`||e.type===`MemberExpression`};var R=_e.prototype;R.parseTopLevel=function(e){var t={};for(e.body||=[];this.type!==b.eof;){var n=this.parseStatement(null,!0,t);e.body.push(n)}if(this.inModule)for(var r=0,i=Object.keys(this.undefinedExports);r<i.length;r+=1){var a=i[r];this.raiseRecoverable(this.undefinedExports[a].start,`Export '`+a+`' is not defined`)}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType,this.finishNode(e,`Program`)};var xe={kind:`loop`},z={kind:`switch`};R.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual(`let`))return!1;ee.lastIndex=this.pos;var t=ee.exec(this.input),n=this.pos+t[0].length,r=this.input.charCodeAt(n);if(r===91)return!0;if(e)return!1;if(r===123)return!0;if(f(r,!0)){for(var a=n+1;p(this.input.charCodeAt(a),!0);)++a;var o=this.input.slice(n,a);if(!i.test(o))return!0}return!1},R.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual(`async`))return!1;ee.lastIndex=this.pos;var e=ee.exec(this.input),t=this.pos+e[0].length;return!x.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)===`function`&&(t+8===this.input.length||!p(this.input.charAt(t+8)))},R.parseStatement=function(e,t,n){var r=this.type,i=this.startNode(),a;switch(this.isLet(e)&&(r=b._var,a=`let`),r){case b._break:case b._continue:return this.parseBreakContinueStatement(i,r.keyword);case b._debugger:return this.parseDebuggerStatement(i);case b._do:return this.parseDoStatement(i);case b._for:return this.parseForStatement(i);case b._function:return e&&(this.strict||e!==`if`&&e!==`label`)&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(i,!1,!e);case b._class:return e&&this.unexpected(),this.parseClass(i,!0);case b._if:return this.parseIfStatement(i);case b._return:return this.parseReturnStatement(i);case b._switch:return this.parseSwitchStatement(i);case b._throw:return this.parseThrowStatement(i);case b._try:return this.parseTryStatement(i);case b._const:case b._var:return a||=this.value,e&&a!==`var`&&this.unexpected(),this.parseVarStatement(i,a);case b._while:return this.parseWhileStatement(i);case b._with:return this.parseWithStatement(i);case b.braceL:return this.parseBlock(!0,i);case b.semi:return this.parseEmptyStatement(i);case b._export:case b._import:if(this.options.ecmaVersion>10&&r===b._import){ee.lastIndex=this.pos;var o=ee.exec(this.input),s=this.pos+o[0].length,c=this.input.charCodeAt(s);if(c===40||c===46)return this.parseExpressionStatement(i,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,`'import' and 'export' may only appear at the top level`),this.inModule||this.raise(this.start,`'import' and 'export' may appear only with 'sourceType: module'`)),r===b._import?this.parseImport(i):this.parseExport(i,n);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(i,!0,!e);var l=this.value,u=this.parseExpression();return r===b.name&&u.type===`Identifier`&&this.eat(b.colon)?this.parseLabeledStatement(i,l,u,e):this.parseExpressionStatement(i,u)}},R.parseBreakContinueStatement=function(e,t){var n=t===`break`;this.next(),this.eat(b.semi)||this.insertSemicolon()?e.label=null:this.type===b.name?(e.label=this.parseIdent(),this.semicolon()):this.unexpected();for(var r=0;r<this.labels.length;++r){var i=this.labels[r];if((e.label==null||i.name===e.label.name)&&(i.kind!=null&&(n||i.kind===`loop`)||e.label&&n))break}return r===this.labels.length&&this.raise(e.start,`Unsyntactic `+t),this.finishNode(e,n?`BreakStatement`:`ContinueStatement`)},R.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,`DebuggerStatement`)},R.parseDoStatement=function(e){return this.next(),this.labels.push(xe),e.body=this.parseStatement(`do`),this.labels.pop(),this.expect(b._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(b.semi):this.semicolon(),this.finishNode(e,`DoWhileStatement`)},R.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&(this.inAsync||!this.inFunction&&this.options.allowAwaitOutsideFunction)&&this.eatContextual(`await`)?this.lastTokStart:-1;if(this.labels.push(xe),this.enterScope(0),this.expect(b.parenL),this.type===b.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var n=this.isLet();if(this.type===b._var||this.type===b._const||n){var r=this.startNode(),i=n?`let`:this.value;return this.next(),this.parseVar(r,!0,i),this.finishNode(r,`VariableDeclaration`),(this.type===b._in||this.options.ecmaVersion>=6&&this.isContextual(`of`))&&r.declarations.length===1?(this.options.ecmaVersion>=9&&(this.type===b._in?t>-1&&this.unexpected(t):e.await=t>-1),this.parseForIn(e,r)):(t>-1&&this.unexpected(t),this.parseFor(e,r))}var a=new be,o=this.parseExpression(!0,a);return this.type===b._in||this.options.ecmaVersion>=6&&this.isContextual(`of`)?(this.options.ecmaVersion>=9&&(this.type===b._in?t>-1&&this.unexpected(t):e.await=t>-1),this.toAssignable(o,!1,a),this.checkLVal(o),this.parseForIn(e,o)):(this.checkExpressionErrors(a,!0),t>-1&&this.unexpected(t),this.parseFor(e,o))},R.parseFunctionStatement=function(e,t,n){return this.next(),this.parseFunction(e,B|(n?0:Ce),!1,t)},R.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement(`if`),e.alternate=this.eat(b._else)?this.parseStatement(`if`):null,this.finishNode(e,`IfStatement`)},R.parseReturnStatement=function(e){return!this.inFunction&&!this.options.allowReturnOutsideFunction&&this.raise(this.start,`'return' outside of function`),this.next(),this.eat(b.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,`ReturnStatement`)},R.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(b.braceL),this.labels.push(z),this.enterScope(0);for(var t,n=!1;this.type!==b.braceR;)if(this.type===b._case||this.type===b._default){var r=this.type===b._case;t&&this.finishNode(t,`SwitchCase`),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),r?t.test=this.parseExpression():(n&&this.raiseRecoverable(this.lastTokStart,`Multiple default clauses`),n=!0,t.test=null),this.expect(b.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,`SwitchCase`),this.next(),this.labels.pop(),this.finishNode(e,`SwitchStatement`)},R.parseThrowStatement=function(e){return this.next(),x.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,`Illegal newline after throw`),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,`ThrowStatement`)};var Se=[];R.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===b._catch){var t=this.startNode();if(this.next(),this.eat(b.parenL)){t.param=this.parseBindingAtom();var n=t.param.type===`Identifier`;this.enterScope(n?N:0),this.checkLVal(t.param,n?F:P),this.expect(b.parenR)}else this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0);t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,`CatchClause`)}return e.finalizer=this.eat(b._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,`Missing catch or finally clause`),this.finishNode(e,`TryStatement`)},R.parseVarStatement=function(e,t){return this.next(),this.parseVar(e,!1,t),this.semicolon(),this.finishNode(e,`VariableDeclaration`)},R.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(xe),e.body=this.parseStatement(`while`),this.labels.pop(),this.finishNode(e,`WhileStatement`)},R.parseWithStatement=function(e){return this.strict&&this.raise(this.start,`'with' in strict mode`),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement(`with`),this.finishNode(e,`WithStatement`)},R.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,`EmptyStatement`)},R.parseLabeledStatement=function(e,t,n,r){for(var i=0,a=this.labels;i<a.length;i+=1)a[i].name===t&&this.raise(n.start,`Label '`+t+`' is already declared`);for(var o=this.type.isLoop?`loop`:this.type===b._switch?`switch`:null,s=this.labels.length-1;s>=0;s--){var c=this.labels[s];if(c.statementStart===e.start)c.statementStart=this.start,c.kind=o;else break}return this.labels.push({name:t,kind:o,statementStart:this.start}),e.body=this.parseStatement(r?r.indexOf(`label`)===-1?r+`label`:r:`label`),this.labels.pop(),e.label=n,this.finishNode(e,`LabeledStatement`)},R.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,`ExpressionStatement`)},R.parseBlock=function(e,t,n){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(b.braceL),e&&this.enterScope(0);this.type!==b.braceR;){var r=this.parseStatement(null);t.body.push(r)}return n&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,`BlockStatement`)},R.parseFor=function(e,t){return e.init=t,this.expect(b.semi),e.test=this.type===b.semi?null:this.parseExpression(),this.expect(b.semi),e.update=this.type===b.parenR?null:this.parseExpression(),this.expect(b.parenR),e.body=this.parseStatement(`for`),this.exitScope(),this.labels.pop(),this.finishNode(e,`ForStatement`)},R.parseForIn=function(e,t){var n=this.type===b._in;return this.next(),t.type===`VariableDeclaration`&&t.declarations[0].init!=null&&(!n||this.options.ecmaVersion<8||this.strict||t.kind!==`var`||t.declarations[0].id.type!==`Identifier`)?this.raise(t.start,(n?`for-in`:`for-of`)+` loop variable declaration may not have an initializer`):t.type===`AssignmentPattern`&&this.raise(t.start,`Invalid left-hand side in for-loop`),e.left=t,e.right=n?this.parseExpression():this.parseMaybeAssign(),this.expect(b.parenR),e.body=this.parseStatement(`for`),this.exitScope(),this.labels.pop(),this.finishNode(e,n?`ForInStatement`:`ForOfStatement`)},R.parseVar=function(e,t,n){for(e.declarations=[],e.kind=n;;){var r=this.startNode();if(this.parseVarId(r,n),this.eat(b.eq)?r.init=this.parseMaybeAssign(t):n===`const`&&!(this.type===b._in||this.options.ecmaVersion>=6&&this.isContextual(`of`))?this.unexpected():r.id.type!==`Identifier`&&!(t&&(this.type===b._in||this.isContextual(`of`)))?this.raise(this.lastTokEnd,`Complex binding patterns require an initialization value`):r.init=null,e.declarations.push(this.finishNode(r,`VariableDeclarator`)),!this.eat(b.comma))break}return e},R.parseVarId=function(e,t){e.id=this.parseBindingAtom(),this.checkLVal(e.id,t===`var`?he:P,!1)};var B=1,Ce=2,we=4;R.parseFunction=function(e,t,n,r){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!r)&&(this.type===b.star&&t&Ce&&this.unexpected(),e.generator=this.eat(b.star)),this.options.ecmaVersion>=8&&(e.async=!!r),t&B&&(e.id=t&we&&this.type!==b.name?null:this.parseIdent(),e.id&&!(t&Ce)&&this.checkLVal(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?he:P:ge));var i=this.yieldPos,a=this.awaitPos,o=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(pe(e.async,e.generator)),t&B||(e.id=this.type===b.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,n,!1),this.yieldPos=i,this.awaitPos=a,this.awaitIdentPos=o,this.finishNode(e,t&B?`FunctionDeclaration`:`FunctionExpression`)},R.parseFunctionParams=function(e){this.expect(b.parenL),e.params=this.parseBindingList(b.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()},R.parseClass=function(e,t){this.next();var n=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var r=this.startNode(),i=!1;for(r.body=[],this.expect(b.braceL);this.type!==b.braceR;){var a=this.parseClassElement(e.superClass!==null);a&&(r.body.push(a),a.type===`MethodDefinition`&&a.kind===`constructor`&&(i&&this.raise(a.start,`Duplicate constructor in the same class`),i=!0))}return this.strict=n,this.next(),e.body=this.finishNode(r,`ClassBody`),this.finishNode(e,t?`ClassDeclaration`:`ClassExpression`)},R.parseClassElement=function(e){var t=this;if(this.eat(b.semi))return null;var n=this.startNode(),r=function(e,r){r===void 0&&(r=!1);var i=t.start,a=t.startLoc;return t.eatContextual(e)?t.type!==b.parenL&&(!r||!t.canInsertSemicolon())?!0:(n.key&&t.unexpected(),n.computed=!1,n.key=t.startNodeAt(i,a),n.key.name=e,t.finishNode(n.key,`Identifier`),!1):!1};n.kind=`method`,n.static=r(`static`);var i=this.eat(b.star),a=!1;i||(this.options.ecmaVersion>=8&&r(`async`,!0)?(a=!0,i=this.options.ecmaVersion>=9&&this.eat(b.star)):r(`get`)?n.kind=`get`:r(`set`)&&(n.kind=`set`)),n.key||this.parsePropertyName(n);var o=n.key,s=!1;return!n.computed&&!n.static&&(o.type===`Identifier`&&o.name===`constructor`||o.type===`Literal`&&o.value===`constructor`)?(n.kind!==`method`&&this.raise(o.start,`Constructor can't have get/set modifier`),i&&this.raise(o.start,`Constructor can't be a generator`),a&&this.raise(o.start,`Constructor can't be an async method`),n.kind=`constructor`,s=e):n.static&&o.type===`Identifier`&&o.name===`prototype`&&this.raise(o.start,`Classes may not have a static property named prototype`),this.parseClassMethod(n,i,a,s),n.kind===`get`&&n.value.params.length!==0&&this.raiseRecoverable(n.value.start,`getter should have no params`),n.kind===`set`&&n.value.params.length!==1&&this.raiseRecoverable(n.value.start,`setter should have exactly one param`),n.kind===`set`&&n.value.params[0].type===`RestElement`&&this.raiseRecoverable(n.value.params[0].start,`Setter cannot use rest params`),n},R.parseClassMethod=function(e,t,n,r){return e.value=this.parseMethod(t,n,r),this.finishNode(e,`MethodDefinition`)},R.parseClassId=function(e,t){this.type===b.name?(e.id=this.parseIdent(),t&&this.checkLVal(e.id,P,!1)):(t===!0&&this.unexpected(),e.id=null)},R.parseClassSuper=function(e){e.superClass=this.eat(b._extends)?this.parseExprSubscripts():null},R.parseExport=function(e,t){if(this.next(),this.eat(b.star))return this.options.ecmaVersion>=11&&(this.eatContextual(`as`)?(e.exported=this.parseIdent(!0),this.checkExport(t,e.exported.name,this.lastTokStart)):e.exported=null),this.expectContextual(`from`),this.type!==b.string&&this.unexpected(),e.source=this.parseExprAtom(),this.semicolon(),this.finishNode(e,`ExportAllDeclaration`);if(this.eat(b._default)){this.checkExport(t,`default`,this.lastTokStart);var n;if(this.type===b._function||(n=this.isAsyncFunction())){var r=this.startNode();this.next(),n&&this.next(),e.declaration=this.parseFunction(r,B|we,!1,n)}else if(this.type===b._class){var i=this.startNode();e.declaration=this.parseClass(i,`nullableID`)}else e.declaration=this.parseMaybeAssign(),this.semicolon();return this.finishNode(e,`ExportDefaultDeclaration`)}if(this.shouldParseExportStatement())e.declaration=this.parseStatement(null),e.declaration.type===`VariableDeclaration`?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id.name,e.declaration.id.start),e.specifiers=[],e.source=null;else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual(`from`))this.type!==b.string&&this.unexpected(),e.source=this.parseExprAtom();else{for(var a=0,o=e.specifiers;a<o.length;a+=1){var s=o[a];this.checkUnreserved(s.local),this.checkLocalExport(s.local)}e.source=null}this.semicolon()}return this.finishNode(e,`ExportNamedDeclaration`)},R.checkExport=function(e,t,n){e&&(D(e,t)&&this.raiseRecoverable(n,`Duplicate export '`+t+`'`),e[t]=!0)},R.checkPatternExport=function(e,t){var n=t.type;if(n===`Identifier`)this.checkExport(e,t.name,t.start);else if(n===`ObjectPattern`)for(var r=0,i=t.properties;r<i.length;r+=1){var a=i[r];this.checkPatternExport(e,a)}else if(n===`ArrayPattern`)for(var o=0,s=t.elements;o<s.length;o+=1){var c=s[o];c&&this.checkPatternExport(e,c)}else n===`Property`?this.checkPatternExport(e,t.value):n===`AssignmentPattern`?this.checkPatternExport(e,t.left):n===`RestElement`?this.checkPatternExport(e,t.argument):n===`ParenthesizedExpression`&&this.checkPatternExport(e,t.expression)},R.checkVariableExport=function(e,t){if(e)for(var n=0,r=t;n<r.length;n+=1){var i=r[n];this.checkPatternExport(e,i.id)}},R.shouldParseExportStatement=function(){return this.type.keyword===`var`||this.type.keyword===`const`||this.type.keyword===`class`||this.type.keyword===`function`||this.isLet()||this.isAsyncFunction()},R.parseExportSpecifiers=function(e){var t=[],n=!0;for(this.expect(b.braceL);!this.eat(b.braceR);){if(n)n=!1;else if(this.expect(b.comma),this.afterTrailingComma(b.braceR))break;var r=this.startNode();r.local=this.parseIdent(!0),r.exported=this.eatContextual(`as`)?this.parseIdent(!0):r.local,this.checkExport(e,r.exported.name,r.exported.start),t.push(this.finishNode(r,`ExportSpecifier`))}return t},R.parseImport=function(e){return this.next(),this.type===b.string?(e.specifiers=Se,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual(`from`),e.source=this.type===b.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(e,`ImportDeclaration`)},R.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===b.name){var n=this.startNode();if(n.local=this.parseIdent(),this.checkLVal(n.local,P),e.push(this.finishNode(n,`ImportDefaultSpecifier`)),!this.eat(b.comma))return e}if(this.type===b.star){var r=this.startNode();return this.next(),this.expectContextual(`as`),r.local=this.parseIdent(),this.checkLVal(r.local,P),e.push(this.finishNode(r,`ImportNamespaceSpecifier`)),e}for(this.expect(b.braceL);!this.eat(b.braceR);){if(t)t=!1;else if(this.expect(b.comma),this.afterTrailingComma(b.braceR))break;var i=this.startNode();i.imported=this.parseIdent(!0),this.eatContextual(`as`)?i.local=this.parseIdent():(this.checkUnreserved(i.imported),i.local=i.imported),this.checkLVal(i.local,P),e.push(this.finishNode(i,`ImportSpecifier`))}return e},R.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)},R.isDirectiveCandidate=function(e){return e.type===`ExpressionStatement`&&e.expression.type===`Literal`&&typeof e.expression.value==`string`&&(this.input[e.start]===`"`||this.input[e.start]===`'`)};var Te=_e.prototype;Te.toAssignable=function(e,t,n){if(this.options.ecmaVersion>=6&&e)switch(e.type){case`Identifier`:this.inAsync&&e.name===`await`&&this.raise(e.start,`Cannot use 'await' as identifier inside an async function`);break;case`ObjectPattern`:case`ArrayPattern`:case`RestElement`:break;case`ObjectExpression`:e.type=`ObjectPattern`,n&&this.checkPatternErrors(n,!0);for(var r=0,i=e.properties;r<i.length;r+=1){var a=i[r];this.toAssignable(a,t),a.type===`RestElement`&&(a.argument.type===`ArrayPattern`||a.argument.type===`ObjectPattern`)&&this.raise(a.argument.start,`Unexpected token`)}break;case`Property`:e.kind!==`init`&&this.raise(e.key.start,`Object pattern can't contain getter or setter`),this.toAssignable(e.value,t);break;case`ArrayExpression`:e.type=`ArrayPattern`,n&&this.checkPatternErrors(n,!0),this.toAssignableList(e.elements,t);break;case`SpreadElement`:e.type=`RestElement`,this.toAssignable(e.argument,t),e.argument.type===`AssignmentPattern`&&this.raise(e.argument.start,`Rest elements cannot have a default value`);break;case`AssignmentExpression`:e.operator!==`=`&&this.raise(e.left.end,`Only '=' operator can be used for specifying default value.`),e.type=`AssignmentPattern`,delete e.operator,this.toAssignable(e.left,t);case`AssignmentPattern`:break;case`ParenthesizedExpression`:this.toAssignable(e.expression,t,n);break;case`ChainExpression`:this.raiseRecoverable(e.start,`Optional chaining cannot appear in left-hand side`);break;case`MemberExpression`:if(!t)break;default:this.raise(e.start,`Assigning to rvalue`)}else n&&this.checkPatternErrors(n,!0);return e},Te.toAssignableList=function(e,t){for(var n=e.length,r=0;r<n;r++){var i=e[r];i&&this.toAssignable(i,t)}if(n){var a=e[n-1];this.options.ecmaVersion===6&&t&&a&&a.type===`RestElement`&&a.argument.type!==`Identifier`&&this.unexpected(a.argument.start)}return e},Te.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,`SpreadElement`)},Te.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==b.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,`RestElement`)},Te.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case b.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(b.bracketR,!0,!0),this.finishNode(e,`ArrayPattern`);case b.braceL:return this.parseObj(!0)}return this.parseIdent()},Te.parseBindingList=function(e,t,n){for(var r=[],i=!0;!this.eat(e);)if(i?i=!1:this.expect(b.comma),t&&this.type===b.comma)r.push(null);else{if(n&&this.afterTrailingComma(e))break;if(this.type===b.ellipsis){var a=this.parseRestBinding();this.parseBindingListItem(a),r.push(a),this.type===b.comma&&this.raise(this.start,`Comma is not permitted after the rest element`),this.expect(e);break}else{var o=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(o),r.push(o)}}return r},Te.parseBindingListItem=function(e){return e},Te.parseMaybeDefault=function(e,t,n){if(n||=this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(b.eq))return n;var r=this.startNodeAt(e,t);return r.left=n,r.right=this.parseMaybeAssign(),this.finishNode(r,`AssignmentPattern`)},Te.checkLVal=function(e,t,n){switch(t===void 0&&(t=me),e.type){case`Identifier`:t===P&&e.name===`let`&&this.raiseRecoverable(e.start,`let is disallowed as a lexically bound name`),this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(t?`Binding `:`Assigning to `)+e.name+` in strict mode`),n&&(D(n,e.name)&&this.raiseRecoverable(e.start,`Argument name clash`),n[e.name]=!0),t!==me&&t!==I&&this.declareName(e.name,t,e.start);break;case`ChainExpression`:this.raiseRecoverable(e.start,`Optional chaining cannot appear in left-hand side`);break;case`MemberExpression`:t&&this.raiseRecoverable(e.start,`Binding member expression`);break;case`ObjectPattern`:for(var r=0,i=e.properties;r<i.length;r+=1){var a=i[r];this.checkLVal(a,t,n)}break;case`Property`:this.checkLVal(e.value,t,n);break;case`ArrayPattern`:for(var o=0,s=e.elements;o<s.length;o+=1){var c=s[o];c&&this.checkLVal(c,t,n)}break;case`AssignmentPattern`:this.checkLVal(e.left,t,n);break;case`RestElement`:this.checkLVal(e.argument,t,n);break;case`ParenthesizedExpression`:this.checkLVal(e.expression,t,n);break;default:this.raise(e.start,(t?`Binding`:`Assigning to`)+` rvalue`)}};var V=_e.prototype;V.checkPropClash=function(e,t,n){if(!(this.options.ecmaVersion>=9&&e.type===`SpreadElement`)&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var r=e.key,i;switch(r.type){case`Identifier`:i=r.name;break;case`Literal`:i=String(r.value);break;default:return}var a=e.kind;if(this.options.ecmaVersion>=6){i===`__proto__`&&a===`init`&&(t.proto&&(n?n.doubleProto<0&&(n.doubleProto=r.start):this.raiseRecoverable(r.start,`Redefinition of __proto__ property`)),t.proto=!0);return}i=`$`+i;var o=t[i];o?(a===`init`?this.strict&&o.init||o.get||o.set:o.init||o[a])&&this.raiseRecoverable(r.start,`Redefinition of property`):o=t[i]={init:!1,get:!1,set:!1},o[a]=!0}},V.parseExpression=function(e,t){var n=this.start,r=this.startLoc,i=this.parseMaybeAssign(e,t);if(this.type===b.comma){var a=this.startNodeAt(n,r);for(a.expressions=[i];this.eat(b.comma);)a.expressions.push(this.parseMaybeAssign(e,t));return this.finishNode(a,`SequenceExpression`)}return i},V.parseMaybeAssign=function(e,t,n){if(this.isContextual(`yield`)){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var r=!1,i=-1,a=-1;t?(i=t.parenthesizedAssign,a=t.trailingComma,t.parenthesizedAssign=t.trailingComma=-1):(t=new be,r=!0);var o=this.start,s=this.startLoc;(this.type===b.parenL||this.type===b.name)&&(this.potentialArrowAt=this.start);var c=this.parseMaybeConditional(e,t);if(n&&(c=n.call(this,c,o,s)),this.type.isAssign){var l=this.startNodeAt(o,s);return l.operator=this.value,l.left=this.type===b.eq?this.toAssignable(c,!1,t):c,r||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=l.left.start&&(t.shorthandAssign=-1),this.checkLVal(c),this.next(),l.right=this.parseMaybeAssign(e),this.finishNode(l,`AssignmentExpression`)}else r&&this.checkExpressionErrors(t,!0);return i>-1&&(t.parenthesizedAssign=i),a>-1&&(t.trailingComma=a),c},V.parseMaybeConditional=function(e,t){var n=this.start,r=this.startLoc,i=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return i;if(this.eat(b.question)){var a=this.startNodeAt(n,r);return a.test=i,a.consequent=this.parseMaybeAssign(),this.expect(b.colon),a.alternate=this.parseMaybeAssign(e),this.finishNode(a,`ConditionalExpression`)}return i},V.parseExprOps=function(e,t){var n=this.start,r=this.startLoc,i=this.parseMaybeUnary(t,!1);return this.checkExpressionErrors(t)||i.start===n&&i.type===`ArrowFunctionExpression`?i:this.parseExprOp(i,n,r,-1,e)},V.parseExprOp=function(e,t,n,r,i){var a=this.type.binop;if(a!=null&&(!i||this.type!==b._in)&&a>r){var o=this.type===b.logicalOR||this.type===b.logicalAND,s=this.type===b.coalesce;s&&(a=b.logicalAND.binop);var c=this.value;this.next();var l=this.start,u=this.startLoc,d=this.parseExprOp(this.parseMaybeUnary(null,!1),l,u,a,i),f=this.buildBinary(t,n,e,d,c,o||s);return(o&&this.type===b.coalesce||s&&(this.type===b.logicalOR||this.type===b.logicalAND))&&this.raiseRecoverable(this.start,`Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses`),this.parseExprOp(f,t,n,r,i)}return e},V.buildBinary=function(e,t,n,r,i,a){var o=this.startNodeAt(e,t);return o.left=n,o.operator=i,o.right=r,this.finishNode(o,a?`LogicalExpression`:`BinaryExpression`)},V.parseMaybeUnary=function(e,t){var n=this.start,r=this.startLoc,i;if(this.isContextual(`await`)&&(this.inAsync||!this.inFunction&&this.options.allowAwaitOutsideFunction))i=this.parseAwait(),t=!0;else if(this.type.prefix){var a=this.startNode(),o=this.type===b.incDec;a.operator=this.value,a.prefix=!0,this.next(),a.argument=this.parseMaybeUnary(null,!0),this.checkExpressionErrors(e,!0),o?this.checkLVal(a.argument):this.strict&&a.operator===`delete`&&a.argument.type===`Identifier`?this.raiseRecoverable(a.start,`Deleting local variable in strict mode`):t=!0,i=this.finishNode(a,o?`UpdateExpression`:`UnaryExpression`)}else{if(i=this.parseExprSubscripts(e),this.checkExpressionErrors(e))return i;for(;this.type.postfix&&!this.canInsertSemicolon();){var s=this.startNodeAt(n,r);s.operator=this.value,s.prefix=!1,s.argument=i,this.checkLVal(i),this.next(),i=this.finishNode(s,`UpdateExpression`)}}return!t&&this.eat(b.starstar)?this.buildBinary(n,r,i,this.parseMaybeUnary(null,!1),`**`,!1):i},V.parseExprSubscripts=function(e){var t=this.start,n=this.startLoc,r=this.parseExprAtom(e);if(r.type===`ArrowFunctionExpression`&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==`)`)return r;var i=this.parseSubscripts(r,t,n);return e&&i.type===`MemberExpression`&&(e.parenthesizedAssign>=i.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=i.start&&(e.parenthesizedBind=-1)),i},V.parseSubscripts=function(e,t,n,r){for(var i=this.options.ecmaVersion>=8&&e.type===`Identifier`&&e.name===`async`&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,a=!1;;){var o=this.parseSubscript(e,t,n,r,i,a);if(o.optional&&(a=!0),o===e||o.type===`ArrowFunctionExpression`){if(a){var s=this.startNodeAt(t,n);s.expression=o,o=this.finishNode(s,`ChainExpression`)}return o}e=o}},V.parseSubscript=function(e,t,n,r,i,a){var o=this.options.ecmaVersion>=11,s=o&&this.eat(b.questionDot);r&&s&&this.raise(this.lastTokStart,`Optional chaining cannot appear in the callee of new expressions`);var c=this.eat(b.bracketL);if(c||s&&this.type!==b.parenL&&this.type!==b.backQuote||this.eat(b.dot)){var l=this.startNodeAt(t,n);l.object=e,l.property=c?this.parseExpression():this.parseIdent(this.options.allowReserved!==`never`),l.computed=!!c,c&&this.expect(b.bracketR),o&&(l.optional=s),e=this.finishNode(l,`MemberExpression`)}else if(!r&&this.eat(b.parenL)){var u=new be,d=this.yieldPos,f=this.awaitPos,p=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var m=this.parseExprList(b.parenR,this.options.ecmaVersion>=8,!1,u);if(i&&!s&&!this.canInsertSemicolon()&&this.eat(b.arrow))return this.checkPatternErrors(u,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,`Cannot use 'await' as identifier inside an async function`),this.yieldPos=d,this.awaitPos=f,this.awaitIdentPos=p,this.parseArrowExpression(this.startNodeAt(t,n),m,!0);this.checkExpressionErrors(u,!0),this.yieldPos=d||this.yieldPos,this.awaitPos=f||this.awaitPos,this.awaitIdentPos=p||this.awaitIdentPos;var h=this.startNodeAt(t,n);h.callee=e,h.arguments=m,o&&(h.optional=s),e=this.finishNode(h,`CallExpression`)}else if(this.type===b.backQuote){(s||a)&&this.raise(this.start,`Optional chaining cannot appear in the tag of tagged template expressions`);var g=this.startNodeAt(t,n);g.tag=e,g.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(g,`TaggedTemplateExpression`)}return e},V.parseExprAtom=function(e){this.type===b.slash&&this.readRegexp();var t,n=this.potentialArrowAt===this.start;switch(this.type){case b._super:return this.allowSuper||this.raise(this.start,`'super' keyword outside a method`),t=this.startNode(),this.next(),this.type===b.parenL&&!this.allowDirectSuper&&this.raise(t.start,`super() call outside constructor of a subclass`),this.type!==b.dot&&this.type!==b.bracketL&&this.type!==b.parenL&&this.unexpected(),this.finishNode(t,`Super`);case b._this:return t=this.startNode(),this.next(),this.finishNode(t,`ThisExpression`);case b.name:var r=this.start,i=this.startLoc,a=this.containsEsc,o=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!a&&o.name===`async`&&!this.canInsertSemicolon()&&this.eat(b._function))return this.parseFunction(this.startNodeAt(r,i),0,!1,!0);if(n&&!this.canInsertSemicolon()){if(this.eat(b.arrow))return this.parseArrowExpression(this.startNodeAt(r,i),[o],!1);if(this.options.ecmaVersion>=8&&o.name===`async`&&this.type===b.name&&!a)return o=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(b.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(r,i),[o],!0)}return o;case b.regexp:var s=this.value;return t=this.parseLiteral(s.value),t.regex={pattern:s.pattern,flags:s.flags},t;case b.num:case b.string:return this.parseLiteral(this.value);case b._null:case b._true:case b._false:return t=this.startNode(),t.value=this.type===b._null?null:this.type===b._true,t.raw=this.type.keyword,this.next(),this.finishNode(t,`Literal`);case b.parenL:var c=this.start,l=this.parseParenAndDistinguishExpression(n);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(l)&&(e.parenthesizedAssign=c),e.parenthesizedBind<0&&(e.parenthesizedBind=c)),l;case b.bracketL:return t=this.startNode(),this.next(),t.elements=this.parseExprList(b.bracketR,!0,!0,e),this.finishNode(t,`ArrayExpression`);case b.braceL:return this.parseObj(!1,e);case b._function:return t=this.startNode(),this.next(),this.parseFunction(t,0);case b._class:return this.parseClass(this.startNode(),!1);case b._new:return this.parseNew();case b.backQuote:return this.parseTemplate();case b._import:return this.options.ecmaVersion>=11?this.parseExprImport():this.unexpected();default:this.unexpected()}},V.parseExprImport=function(){var e=this.startNode();this.containsEsc&&this.raiseRecoverable(this.start,`Escape sequence in keyword import`);var t=this.parseIdent(!0);switch(this.type){case b.parenL:return this.parseDynamicImport(e);case b.dot:return e.meta=t,this.parseImportMeta(e);default:this.unexpected()}},V.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),!this.eat(b.parenR)){var t=this.start;this.eat(b.comma)&&this.eat(b.parenR)?this.raiseRecoverable(t,`Trailing comma is not allowed in import()`):this.unexpected(t)}return this.finishNode(e,`ImportExpression`)},V.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!==`meta`&&this.raiseRecoverable(e.property.start,`The only valid meta property for import is 'import.meta'`),t&&this.raiseRecoverable(e.start,`'import.meta' must not contain escaped characters`),this.options.sourceType!==`module`&&this.raiseRecoverable(e.start,`Cannot use 'import.meta' outside a module`),this.finishNode(e,`MetaProperty`)},V.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.raw.slice(0,-1).replace(/_/g,``)),this.next(),this.finishNode(t,`Literal`)},V.parseParenExpression=function(){this.expect(b.parenL);var e=this.parseExpression();return this.expect(b.parenR),e},V.parseParenAndDistinguishExpression=function(e){var t=this.start,n=this.startLoc,r,i=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var a=this.start,o=this.startLoc,s=[],c=!0,l=!1,u=new be,d=this.yieldPos,f=this.awaitPos,p;for(this.yieldPos=0,this.awaitPos=0;this.type!==b.parenR;)if(c?c=!1:this.expect(b.comma),i&&this.afterTrailingComma(b.parenR,!0)){l=!0;break}else if(this.type===b.ellipsis){p=this.start,s.push(this.parseParenItem(this.parseRestBinding())),this.type===b.comma&&this.raise(this.start,`Comma is not permitted after the rest element`);break}else s.push(this.parseMaybeAssign(!1,u,this.parseParenItem));var m=this.start,h=this.startLoc;if(this.expect(b.parenR),e&&!this.canInsertSemicolon()&&this.eat(b.arrow))return this.checkPatternErrors(u,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=d,this.awaitPos=f,this.parseParenArrowList(t,n,s);(!s.length||l)&&this.unexpected(this.lastTokStart),p&&this.unexpected(p),this.checkExpressionErrors(u,!0),this.yieldPos=d||this.yieldPos,this.awaitPos=f||this.awaitPos,s.length>1?(r=this.startNodeAt(a,o),r.expressions=s,this.finishNodeAt(r,`SequenceExpression`,m,h)):r=s[0]}else r=this.parseParenExpression();if(this.options.preserveParens){var g=this.startNodeAt(t,n);return g.expression=r,this.finishNode(g,`ParenthesizedExpression`)}else return r},V.parseParenItem=function(e){return e},V.parseParenArrowList=function(e,t,n){return this.parseArrowExpression(this.startNodeAt(e,t),n)};var Ee=[];V.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,`Escape sequence in keyword new`);var e=this.startNode(),t=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(b.dot)){e.meta=t;var n=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!==`target`&&this.raiseRecoverable(e.property.start,`The only valid meta property for new is 'new.target'`),n&&this.raiseRecoverable(e.start,`'new.target' must not contain escaped characters`),this.inNonArrowFunction()||this.raiseRecoverable(e.start,`'new.target' can only be used in functions`),this.finishNode(e,`MetaProperty`)}var r=this.start,i=this.startLoc,a=this.type===b._import;return e.callee=this.parseSubscripts(this.parseExprAtom(),r,i,!0),a&&e.callee.type===`ImportExpression`&&this.raise(r,`Cannot use new with import()`),this.eat(b.parenL)?e.arguments=this.parseExprList(b.parenR,this.options.ecmaVersion>=8,!1):e.arguments=Ee,this.finishNode(e,`NewExpression`)},V.parseTemplateElement=function(e){var t=e.isTagged,n=this.startNode();return this.type===b.invalidTemplate?(t||this.raiseRecoverable(this.start,`Bad escape sequence in untagged template literal`),n.value={raw:this.value,cooked:null}):n.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),n.tail=this.type===b.backQuote,this.finishNode(n,`TemplateElement`)},V.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var n=this.startNode();this.next(),n.expressions=[];var r=this.parseTemplateElement({isTagged:t});for(n.quasis=[r];!r.tail;)this.type===b.eof&&this.raise(this.pos,`Unterminated template literal`),this.expect(b.dollarBraceL),n.expressions.push(this.parseExpression()),this.expect(b.braceR),n.quasis.push(r=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(n,`TemplateLiteral`)},V.isAsyncProp=function(e){return!e.computed&&e.key.type===`Identifier`&&e.key.name===`async`&&(this.type===b.name||this.type===b.num||this.type===b.string||this.type===b.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===b.star)&&!x.test(this.input.slice(this.lastTokEnd,this.start))},V.parseObj=function(e,t){var n=this.startNode(),r=!0,i={};for(n.properties=[],this.next();!this.eat(b.braceR);){if(r)r=!1;else if(this.expect(b.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(b.braceR))break;var a=this.parseProperty(e,t);e||this.checkPropClash(a,i,t),n.properties.push(a)}return this.finishNode(n,e?`ObjectPattern`:`ObjectExpression`)},V.parseProperty=function(e,t){var n=this.startNode(),r,i,a,o;if(this.options.ecmaVersion>=9&&this.eat(b.ellipsis))return e?(n.argument=this.parseIdent(!1),this.type===b.comma&&this.raise(this.start,`Comma is not permitted after the rest element`),this.finishNode(n,`RestElement`)):(this.type===b.parenL&&t&&(t.parenthesizedAssign<0&&(t.parenthesizedAssign=this.start),t.parenthesizedBind<0&&(t.parenthesizedBind=this.start)),n.argument=this.parseMaybeAssign(!1,t),this.type===b.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(n,`SpreadElement`));this.options.ecmaVersion>=6&&(n.method=!1,n.shorthand=!1,(e||t)&&(a=this.start,o=this.startLoc),e||(r=this.eat(b.star)));var s=this.containsEsc;return this.parsePropertyName(n),!e&&!s&&this.options.ecmaVersion>=8&&!r&&this.isAsyncProp(n)?(i=!0,r=this.options.ecmaVersion>=9&&this.eat(b.star),this.parsePropertyName(n,t)):i=!1,this.parsePropertyValue(n,e,r,i,a,o,t,s),this.finishNode(n,`Property`)},V.parsePropertyValue=function(e,t,n,r,i,a,o,s){if((n||r)&&this.type===b.colon&&this.unexpected(),this.eat(b.colon))e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,o),e.kind=`init`;else if(this.options.ecmaVersion>=6&&this.type===b.parenL)t&&this.unexpected(),e.kind=`init`,e.method=!0,e.value=this.parseMethod(n,r);else if(!t&&!s&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type===`Identifier`&&(e.key.name===`get`||e.key.name===`set`)&&this.type!==b.comma&&this.type!==b.braceR&&this.type!==b.eq){(n||r)&&this.unexpected(),e.kind=e.key.name,this.parsePropertyName(e),e.value=this.parseMethod(!1);var c=e.kind===`get`?0:1;if(e.value.params.length!==c){var l=e.value.start;e.kind===`get`?this.raiseRecoverable(l,`getter should have no params`):this.raiseRecoverable(l,`setter should have exactly one param`)}else e.kind===`set`&&e.value.params[0].type===`RestElement`&&this.raiseRecoverable(e.value.params[0].start,`Setter cannot use rest params`)}else this.options.ecmaVersion>=6&&!e.computed&&e.key.type===`Identifier`?((n||r)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name===`await`&&!this.awaitIdentPos&&(this.awaitIdentPos=i),e.kind=`init`,t?e.value=this.parseMaybeDefault(i,a,e.key):this.type===b.eq&&o?(o.shorthandAssign<0&&(o.shorthandAssign=this.start),e.value=this.parseMaybeDefault(i,a,e.key)):e.value=e.key,e.shorthand=!0):this.unexpected()},V.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(b.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(b.bracketR),e.key;e.computed=!1}return e.key=this.type===b.num||this.type===b.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!==`never`)},V.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)},V.parseMethod=function(e,t,n){var r=this.startNode(),i=this.yieldPos,a=this.awaitPos,o=this.awaitIdentPos;return this.initFunction(r),this.options.ecmaVersion>=6&&(r.generator=e),this.options.ecmaVersion>=8&&(r.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(pe(t,r.generator)|de|(n?fe:0)),this.expect(b.parenL),r.params=this.parseBindingList(b.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(r,!1,!0),this.yieldPos=i,this.awaitPos=a,this.awaitIdentPos=o,this.finishNode(r,`FunctionExpression`)},V.parseArrowExpression=function(e,t,n){var r=this.yieldPos,i=this.awaitPos,a=this.awaitIdentPos;return this.enterScope(pe(n,!1)|ue),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!n),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1),this.yieldPos=r,this.awaitPos=i,this.awaitIdentPos=a,this.finishNode(e,`ArrowFunctionExpression`)},V.parseFunctionBody=function(e,t,n){var r=t&&this.type!==b.braceL,i=this.strict,a=!1;if(r)e.body=this.parseMaybeAssign(),e.expression=!0,this.checkParams(e,!1);else{var o=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!i||o)&&(a=this.strictDirective(this.end),a&&o&&this.raiseRecoverable(e.start,`Illegal 'use strict' directive in function with non-simple parameter list`));var s=this.labels;this.labels=[],a&&(this.strict=!0),this.checkParams(e,!i&&!a&&!t&&!n&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLVal(e.id,I),e.body=this.parseBlock(!1,void 0,a&&!i),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=s}this.exitScope()},V.isSimpleParamList=function(e){for(var t=0,n=e;t<n.length;t+=1)if(n[t].type!==`Identifier`)return!1;return!0},V.checkParams=function(e,t){for(var n={},r=0,i=e.params;r<i.length;r+=1){var a=i[r];this.checkLVal(a,he,t?null:n)}},V.parseExprList=function(e,t,n,r){for(var i=[],a=!0;!this.eat(e);){if(a)a=!1;else if(this.expect(b.comma),t&&this.afterTrailingComma(e))break;var o=void 0;n&&this.type===b.comma?o=null:this.type===b.ellipsis?(o=this.parseSpread(r),r&&this.type===b.comma&&r.trailingComma<0&&(r.trailingComma=this.start)):o=this.parseMaybeAssign(!1,r),i.push(o)}return i},V.checkUnreserved=function(e){var t=e.start,n=e.end,r=e.name;this.inGenerator&&r===`yield`&&this.raiseRecoverable(t,`Cannot use 'yield' as identifier inside a generator`),this.inAsync&&r===`await`&&this.raiseRecoverable(t,`Cannot use 'await' as identifier inside an async function`),this.keywords.test(r)&&this.raise(t,`Unexpected keyword '`+r+`'`),!(this.options.ecmaVersion<6&&this.input.slice(t,n).indexOf(`\\`)!==-1)&&(this.strict?this.reservedWordsStrict:this.reservedWords).test(r)&&(!this.inAsync&&r===`await`&&this.raiseRecoverable(t,`Cannot use keyword 'await' outside an async function`),this.raiseRecoverable(t,`The keyword '`+r+`' is reserved`))},V.parseIdent=function(e,t){var n=this.startNode();return this.type===b.name?n.name=this.value:this.type.keyword?(n.name=this.type.keyword,(n.name===`class`||n.name===`function`)&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop()):this.unexpected(),this.next(!!e),this.finishNode(n,`Identifier`),e||(this.checkUnreserved(n),n.name===`await`&&!this.awaitIdentPos&&(this.awaitIdentPos=n.start)),n},V.parseYield=function(e){this.yieldPos||=this.start;var t=this.startNode();return this.next(),this.type===b.semi||this.canInsertSemicolon()||this.type!==b.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(b.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,`YieldExpression`)},V.parseAwait=function(){this.awaitPos||=this.start;var e=this.startNode();return this.next(),e.argument=this.parseMaybeUnary(null,!1),this.finishNode(e,`AwaitExpression`)};var De=_e.prototype;De.raise=function(e,t){var n=A(this.input,e);t+=` (`+n.line+`:`+n.column+`)`;var r=SyntaxError(t);throw r.pos=e,r.loc=n,r.raisedAt=this.pos,r},De.raiseRecoverable=De.raise,De.curPosition=function(){if(this.options.locations)return new re(this.curLine,this.pos-this.lineStart)};var Oe=_e.prototype,ke=function(e){this.flags=e,this.var=[],this.lexical=[],this.functions=[]};Oe.enterScope=function(e){this.scopeStack.push(new ke(e))},Oe.exitScope=function(){this.scopeStack.pop()},Oe.treatFunctionsAsVarInScope=function(e){return e.flags&se||!this.inModule&&e.flags&j},Oe.declareName=function(e,t,n){var r=!1;if(t===P){var i=this.currentScope();r=i.lexical.indexOf(e)>-1||i.functions.indexOf(e)>-1||i.var.indexOf(e)>-1,i.lexical.push(e),this.inModule&&i.flags&j&&delete this.undefinedExports[e]}else if(t===F)this.currentScope().lexical.push(e);else if(t===ge){var a=this.currentScope();r=this.treatFunctionsAsVar?a.lexical.indexOf(e)>-1:a.lexical.indexOf(e)>-1||a.var.indexOf(e)>-1,a.functions.push(e)}else for(var o=this.scopeStack.length-1;o>=0;--o){var s=this.scopeStack[o];if(s.lexical.indexOf(e)>-1&&!(s.flags&N&&s.lexical[0]===e)||!this.treatFunctionsAsVarInScope(s)&&s.functions.indexOf(e)>-1){r=!0;break}if(s.var.push(e),this.inModule&&s.flags&j&&delete this.undefinedExports[e],s.flags&ce)break}r&&this.raiseRecoverable(n,`Identifier '`+e+`' has already been declared`)},Oe.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)},Oe.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]},Oe.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&ce)return t}},Oe.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&ce&&!(t.flags&ue))return t}};var Ae=function(e,t,n){this.type=``,this.start=t,this.end=0,e.options.locations&&(this.loc=new k(e,n)),e.options.directSourceFile&&(this.sourceFile=e.options.directSourceFile),e.options.ranges&&(this.range=[t,0])},je=_e.prototype;je.startNode=function(){return new Ae(this,this.start,this.startLoc)},je.startNodeAt=function(e,t){return new Ae(this,e,t)};function Me(e,t,n,r){return e.type=t,e.end=n,this.options.locations&&(e.loc.end=r),this.options.ranges&&(e.range[1]=n),e}je.finishNode=function(e,t){return Me.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)},je.finishNodeAt=function(e,t,n,r){return Me.call(this,e,t,n,r)};var H=function(e,t,n,r,i){this.token=e,this.isExpr=!!t,this.preserveSpace=!!n,this.override=r,this.generator=!!i},U={b_stat:new H(`{`,!1),b_expr:new H(`{`,!0),b_tmpl:new H("${",!1),p_stat:new H(`(`,!1),p_expr:new H(`(`,!0),q_tmpl:new H("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new H(`function`,!1),f_expr:new H(`function`,!0),f_expr_gen:new H(`function`,!0,!1,null,!0),f_gen:new H(`function`,!1,!1,null,!0)},Ne=_e.prototype;Ne.initialContext=function(){return[U.b_stat]},Ne.braceIsBlock=function(e){var t=this.curContext();return t===U.f_expr||t===U.f_stat?!0:e===b.colon&&(t===U.b_stat||t===U.b_expr)?!t.isExpr:e===b._return||e===b.name&&this.exprAllowed?x.test(this.input.slice(this.lastTokEnd,this.start)):e===b._else||e===b.semi||e===b.eof||e===b.parenR||e===b.arrow?!0:e===b.braceL?t===U.b_stat:e===b._var||e===b._const||e===b.name?!1:!this.exprAllowed},Ne.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token===`function`)return t.generator}return!1},Ne.updateContext=function(e){var t,n=this.type;n.keyword&&e===b.dot?this.exprAllowed=!1:(t=n.updateContext)?t.call(this,e):this.exprAllowed=n.beforeExpr},b.parenR.updateContext=b.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===U.b_stat&&this.curContext().token===`function`&&(e=this.context.pop()),this.exprAllowed=!e.isExpr},b.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?U.b_stat:U.b_expr),this.exprAllowed=!0},b.dollarBraceL.updateContext=function(){this.context.push(U.b_tmpl),this.exprAllowed=!0},b.parenL.updateContext=function(e){var t=e===b._if||e===b._for||e===b._with||e===b._while;this.context.push(t?U.p_stat:U.p_expr),this.exprAllowed=!0},b.incDec.updateContext=function(){},b._function.updateContext=b._class.updateContext=function(e){e.beforeExpr&&e!==b.semi&&e!==b._else&&!(e===b._return&&x.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===b.colon||e===b.braceL)&&this.curContext()===U.b_stat)?this.context.push(U.f_expr):this.context.push(U.f_stat),this.exprAllowed=!1},b.backQuote.updateContext=function(){this.curContext()===U.q_tmpl?this.context.pop():this.context.push(U.q_tmpl),this.exprAllowed=!1},b.star.updateContext=function(e){if(e===b._function){var t=this.context.length-1;this.context[t]===U.f_expr?this.context[t]=U.f_expr_gen:this.context[t]=U.f_gen}this.exprAllowed=!0},b.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==b.dot&&(this.value===`of`&&!this.exprAllowed||this.value===`yield`&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var Pe=`ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS`,Fe=Pe+` Extended_Pictographic`,Ie={9:Pe,10:Fe,11:Fe},Le=`Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu`,Re=`Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb`,W=Re+` Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd`,ze={9:Re,10:W,11:W+` Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho`},Be={};function Ve(e){var t=Be[e]={binary:ne(Ie[e]+` `+Le),nonBinary:{General_Category:ne(Le),Script:ne(ze[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}Ve(9),Ve(10),Ve(11);var G=_e.prototype,He=function(e){this.parser=e,this.validFlags=`gim`+(e.options.ecmaVersion>=6?`uy`:``)+(e.options.ecmaVersion>=9?`s`:``),this.unicodeProperties=Be[e.options.ecmaVersion>=11?11:e.options.ecmaVersion],this.source=``,this.flags=``,this.start=0,this.switchU=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue=``,this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=[],this.backReferenceNames=[]};He.prototype.reset=function(e,t,n){var r=n.indexOf(`u`)!==-1;this.start=e|0,this.source=t+``,this.flags=n,this.switchU=r&&this.parser.options.ecmaVersion>=6,this.switchN=r&&this.parser.options.ecmaVersion>=9},He.prototype.raise=function(e){this.parser.raiseRecoverable(this.start,`Invalid regular expression: /`+this.source+`/: `+e)},He.prototype.at=function(e,t){t===void 0&&(t=!1);var n=this.source,r=n.length;if(e>=r)return-1;var i=n.charCodeAt(e);if(!(t||this.switchU)||i<=55295||i>=57344||e+1>=r)return i;var a=n.charCodeAt(e+1);return a>=56320&&a<=57343?(i<<10)+a-56613888:i},He.prototype.nextIndex=function(e,t){t===void 0&&(t=!1);var n=this.source,r=n.length;if(e>=r)return r;var i=n.charCodeAt(e),a;return!(t||this.switchU)||i<=55295||i>=57344||e+1>=r||(a=n.charCodeAt(e+1))<56320||a>57343?e+1:e+2},He.prototype.current=function(e){return e===void 0&&(e=!1),this.at(this.pos,e)},He.prototype.lookahead=function(e){return e===void 0&&(e=!1),this.at(this.nextIndex(this.pos,e),e)},He.prototype.advance=function(e){e===void 0&&(e=!1),this.pos=this.nextIndex(this.pos,e)},He.prototype.eat=function(e,t){return t===void 0&&(t=!1),this.current(t)===e?(this.advance(t),!0):!1};function Ue(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}G.validateRegExpFlags=function(e){for(var t=e.validFlags,n=e.flags,r=0;r<n.length;r++){var i=n.charAt(r);t.indexOf(i)===-1&&this.raise(e.start,`Invalid regular expression flag`),n.indexOf(i,r+1)>-1&&this.raise(e.start,`Duplicate regular expression flag`)}},G.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&e.groupNames.length>0&&(e.switchN=!0,this.regexp_pattern(e))},G.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue=``,e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames.length=0,e.backReferenceNames.length=0,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise(`Unmatched ')'`),(e.eat(93)||e.eat(125))&&e.raise(`Lone quantifier brackets`)),e.maxBackReference>e.numCapturingParens&&e.raise(`Invalid escape`);for(var t=0,n=e.backReferenceNames;t<n.length;t+=1){var r=n[t];e.groupNames.indexOf(r)===-1&&e.raise(`Invalid named capture referenced`)}},G.regexp_disjunction=function(e){for(this.regexp_alternative(e);e.eat(124);)this.regexp_alternative(e);this.regexp_eatQuantifier(e,!0)&&e.raise(`Nothing to repeat`),e.eat(123)&&e.raise(`Lone quantifier brackets`)},G.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););},G.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise(`Invalid quantifier`),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1},G.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var n=!1;if(this.options.ecmaVersion>=9&&(n=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise(`Unterminated group`),e.lastAssertionIsQuantifiable=!n,!0}return e.pos=t,!1},G.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1},G.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)},G.regexp_eatBracedQuantifier=function(e,t){var n=e.pos;if(e.eat(123)){var r=0,i=-1;if(this.regexp_eatDecimalDigits(e)&&(r=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(i=e.lastIntValue),e.eat(125)))return i!==-1&&i<r&&!t&&e.raise(`numbers out of order in {} quantifier`),!0;e.switchU&&!t&&e.raise(`Incomplete quantifier`),e.pos=n}return!1},G.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)},G.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1},G.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)&&e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise(`Unterminated group`)}e.pos=t}return!1},G.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise(`Invalid group`),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise(`Unterminated group`)}return!1},G.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)},G.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise(`Nothing to repeat`),!1},G.regexp_eatSyntaxCharacter=function(e){var t=e.current();return We(t)?(e.lastIntValue=t,e.advance(),!0):!1};function We(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}G.regexp_eatPatternCharacters=function(e){for(var t=e.pos,n=0;(n=e.current())!==-1&&!We(n);)e.advance();return e.pos!==t},G.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1},G.regexp_groupSpecifier=function(e){if(e.eat(63)){if(this.regexp_eatGroupName(e)){e.groupNames.indexOf(e.lastStringValue)!==-1&&e.raise(`Duplicate capture group name`),e.groupNames.push(e.lastStringValue);return}e.raise(`Invalid group`)}},G.regexp_eatGroupName=function(e){if(e.lastStringValue=``,e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise(`Invalid capture group name`)}return!1},G.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue=``,this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=Ue(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=Ue(e.lastIntValue);return!0}return!1},G.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,n=this.options.ecmaVersion>=11,r=e.current(n);return e.advance(n),r===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,n)&&(r=e.lastIntValue),Ge(r)?(e.lastIntValue=r,!0):(e.pos=t,!1)};function Ge(e){return f(e,!0)||e===36||e===95}G.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,n=this.options.ecmaVersion>=11,r=e.current(n);return e.advance(n),r===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,n)&&(r=e.lastIntValue),Ke(r)?(e.lastIntValue=r,!0):(e.pos=t,!1)};function Ke(e){return p(e,!0)||e===36||e===95||e===8204||e===8205}G.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise(`Invalid unicode escape`),e.raise(`Invalid escape`)),!1)},G.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var n=e.lastIntValue;if(e.switchU)return n>e.maxBackReference&&(e.maxBackReference=n),!0;if(n<=e.numCapturingParens)return!0;e.pos=t}return!1},G.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise(`Invalid named reference`)}return!1},G.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)},G.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1},G.regexp_eatZero=function(e){return e.current()===48&&!Qe(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1},G.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1},G.regexp_eatControlLetter=function(e){var t=e.current();return qe(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function qe(e){return e>=65&&e<=90||e>=97&&e<=122}G.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var n=e.pos,r=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var i=e.lastIntValue;if(r&&i>=55296&&i<=56319){var a=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var o=e.lastIntValue;if(o>=56320&&o<=57343)return e.lastIntValue=(i-55296)*1024+(o-56320)+65536,!0}e.pos=a,e.lastIntValue=i}return!0}if(r&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&Je(e.lastIntValue))return!0;r&&e.raise(`Invalid unicode escape`),e.pos=n}return!1};function Je(e){return e>=0&&e<=1114111}G.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1},G.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1},G.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(Ye(t))return e.lastIntValue=-1,e.advance(),!0;if(e.switchU&&this.options.ecmaVersion>=9&&(t===80||t===112)){if(e.lastIntValue=-1,e.advance(),e.eat(123)&&this.regexp_eatUnicodePropertyValueExpression(e)&&e.eat(125))return!0;e.raise(`Invalid property name`)}return!1};function Ye(e){return e===100||e===68||e===115||e===83||e===119||e===87}G.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var n=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var r=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,n,r),!0}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var i=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,i),!0}return!1},G.regexp_validateUnicodePropertyNameAndValue=function(e,t,n){D(e.unicodeProperties.nonBinary,t)||e.raise(`Invalid property name`),e.unicodeProperties.nonBinary[t].test(n)||e.raise(`Invalid property value`)},G.regexp_validateUnicodePropertyNameOrValue=function(e,t){e.unicodeProperties.binary.test(t)||e.raise(`Invalid property name`)},G.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue=``;Xe(t=e.current());)e.lastStringValue+=Ue(t),e.advance();return e.lastStringValue!==``};function Xe(e){return qe(e)||e===95}G.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue=``;Ze(t=e.current());)e.lastStringValue+=Ue(t),e.advance();return e.lastStringValue!==``};function Ze(e){return Xe(e)||Qe(e)}G.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)},G.regexp_eatCharacterClass=function(e){if(e.eat(91)){if(e.eat(94),this.regexp_classRanges(e),e.eat(93))return!0;e.raise(`Unterminated character class`)}return!1},G.regexp_classRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var n=e.lastIntValue;e.switchU&&(t===-1||n===-1)&&e.raise(`Invalid character class`),t!==-1&&n!==-1&&t>n&&e.raise(`Range out of order in character class`)}}},G.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var n=e.current();(n===99||tt(n))&&e.raise(`Invalid class escape`),e.raise(`Invalid escape`)}e.pos=t}var r=e.current();return r===93?!1:(e.lastIntValue=r,e.advance(),!0)},G.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)},G.regexp_eatClassControlLetter=function(e){var t=e.current();return Qe(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1},G.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise(`Invalid escape`),e.pos=t}return!1},G.regexp_eatDecimalDigits=function(e){var t=e.pos,n=0;for(e.lastIntValue=0;Qe(n=e.current());)e.lastIntValue=10*e.lastIntValue+(n-48),e.advance();return e.pos!==t};function Qe(e){return e>=48&&e<=57}G.regexp_eatHexDigits=function(e){var t=e.pos,n=0;for(e.lastIntValue=0;$e(n=e.current());)e.lastIntValue=16*e.lastIntValue+et(n),e.advance();return e.pos!==t};function $e(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function et(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}G.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var n=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+n*8+e.lastIntValue:e.lastIntValue=t*8+n}else e.lastIntValue=t;return!0}return!1},G.regexp_eatOctalDigit=function(e){var t=e.current();return tt(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function tt(e){return e>=48&&e<=55}G.regexp_eatFixedHexDigits=function(e,t){var n=e.pos;e.lastIntValue=0;for(var r=0;r<t;++r){var i=e.current();if(!$e(i))return e.pos=n,!1;e.lastIntValue=16*e.lastIntValue+et(i),e.advance()}return!0};var nt=function(e){this.type=e.type,this.value=e.value,this.start=e.start,this.end=e.end,e.options.locations&&(this.loc=new k(e,e.startLoc,e.endLoc)),e.options.ranges&&(this.range=[e.start,e.end])},K=_e.prototype;K.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,`Escape sequence in keyword `+this.type.keyword),this.options.onToken&&this.options.onToken(new nt(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},K.getToken=function(){return this.next(),new nt(this)},typeof Symbol<`u`&&(K[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===b.eof,value:t}}}}),K.curContext=function(){return this.context[this.context.length-1]},K.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(b.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())},K.readToken=function(e){return f(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)},K.fullCharCodeAtPos=function(){var e=this.input.charCodeAt(this.pos);if(e<=55295||e>=57344)return e;var t=this.input.charCodeAt(this.pos+1);return(e<<10)+t-56613888},K.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,n=this.input.indexOf(`*/`,this.pos+=2);if(n===-1&&this.raise(this.pos-2,`Unterminated comment`),this.pos=n+2,this.options.locations){S.lastIndex=t;for(var r;(r=S.exec(this.input))&&r.index<this.pos;)++this.curLine,this.lineStart=r.index+r[0].length}this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,n),t,this.pos,e,this.curPosition())},K.skipLineComment=function(e){for(var t=this.pos,n=this.options.onComment&&this.curPosition(),r=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!C(r);)r=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,n,this.curPosition())},K.skipSpace=function(){loop:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break loop}break;default:if(e>8&&e<14||e>=5760&&w.test(String.fromCharCode(e)))++this.pos;else break loop}}},K.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var n=this.type;this.type=e,this.value=t,this.updateContext(n)},K.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(b.ellipsis)):(++this.pos,this.finishToken(b.dot))},K.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(b.assign,2):this.finishOp(b.slash,1)},K.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),n=1,r=e===42?b.star:b.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++n,r=b.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(b.assign,n+1):this.finishOp(r,n)},K.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?this.options.ecmaVersion>=12&&this.input.charCodeAt(this.pos+2)===61?this.finishOp(b.assign,3):this.finishOp(e===124?b.logicalOR:b.logicalAND,2):t===61?this.finishOp(b.assign,2):this.finishOp(e===124?b.bitwiseOR:b.bitwiseAND,1)},K.readToken_caret=function(){return this.input.charCodeAt(this.pos+1)===61?this.finishOp(b.assign,2):this.finishOp(b.bitwiseXOR,1)},K.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||x.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(b.incDec,2):t===61?this.finishOp(b.assign,2):this.finishOp(b.plusMin,1)},K.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),n=1;return t===e?(n=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+n)===61?this.finishOp(b.assign,n+1):this.finishOp(b.bitShift,n)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(n=2),this.finishOp(b.relational,n))},K.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(b.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(b.arrow)):this.finishOp(e===61?b.eq:b.prefix,1)},K.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var n=this.input.charCodeAt(this.pos+2);if(n<48||n>57)return this.finishOp(b.questionDot,2)}if(t===63)return e>=12&&this.input.charCodeAt(this.pos+2)===61?this.finishOp(b.assign,3):this.finishOp(b.coalesce,2)}return this.finishOp(b.question,1)},K.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(b.parenL);case 41:return++this.pos,this.finishToken(b.parenR);case 59:return++this.pos,this.finishToken(b.semi);case 44:return++this.pos,this.finishToken(b.comma);case 91:return++this.pos,this.finishToken(b.bracketL);case 93:return++this.pos,this.finishToken(b.bracketR);case 123:return++this.pos,this.finishToken(b.braceL);case 125:return++this.pos,this.finishToken(b.braceR);case 58:return++this.pos,this.finishToken(b.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(b.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(b.prefix,1)}this.raise(this.pos,`Unexpected character '`+at(e)+`'`)},K.finishOp=function(e,t){var n=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,n)},K.readRegexp=function(){for(var e,t,n=this.pos;;){this.pos>=this.input.length&&this.raise(n,`Unterminated regular expression`);var r=this.input.charAt(this.pos);if(x.test(r)&&this.raise(n,`Unterminated regular expression`),e)e=!1;else{if(r===`[`)t=!0;else if(r===`]`&&t)t=!1;else if(r===`/`&&!t)break;e=r===`\\`}++this.pos}var i=this.input.slice(n,this.pos);++this.pos;var a=this.pos,o=this.readWord1();this.containsEsc&&this.unexpected(a);var s=this.regexpState||=new He(this);s.reset(n,i,o),this.validateRegExpFlags(s),this.validateRegExpPattern(s);var c=null;try{c=new RegExp(i,o)}catch{}return this.finishToken(b.regexp,{pattern:i,flags:o,value:c})},K.readInt=function(e,t,n){for(var r=this.options.ecmaVersion>=12&&t===void 0,i=n&&this.input.charCodeAt(this.pos)===48,a=this.pos,o=0,s=0,c=0,l=t??1/0;c<l;++c,++this.pos){var u=this.input.charCodeAt(this.pos),d=void 0;if(r&&u===95){i&&this.raiseRecoverable(this.pos,`Numeric separator is not allowed in legacy octal numeric literals`),s===95&&this.raiseRecoverable(this.pos,`Numeric separator must be exactly one underscore`),c===0&&this.raiseRecoverable(this.pos,`Numeric separator is not allowed at the first of digits`),s=u;continue}if(d=u>=97?u-97+10:u>=65?u-65+10:u>=48&&u<=57?u-48:1/0,d>=e)break;s=u,o=o*e+d}return r&&s===95&&this.raiseRecoverable(this.pos-1,`Numeric separator is not allowed at the last of digits`),this.pos===a||t!=null&&this.pos-a!==t?null:o};function rt(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,``))}function it(e){return typeof BigInt==`function`?BigInt(e.replace(/_/g,``)):null}K.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var n=this.readInt(e);return n??this.raise(this.start+2,`Expected number in radix `+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(n=it(this.input.slice(t,this.pos)),++this.pos):f(this.fullCharCodeAtPos())&&this.raise(this.pos,`Identifier directly after number`),this.finishToken(b.num,n)},K.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,`Invalid number`);var n=this.pos-t>=2&&this.input.charCodeAt(t)===48;n&&this.strict&&this.raise(t,`Invalid number`);var r=this.input.charCodeAt(this.pos);if(!n&&!e&&this.options.ecmaVersion>=11&&r===110){var i=it(this.input.slice(t,this.pos));return++this.pos,f(this.fullCharCodeAtPos())&&this.raise(this.pos,`Identifier directly after number`),this.finishToken(b.num,i)}n&&/[89]/.test(this.input.slice(t,this.pos))&&(n=!1),r===46&&!n&&(++this.pos,this.readInt(10),r=this.input.charCodeAt(this.pos)),(r===69||r===101)&&!n&&(r=this.input.charCodeAt(++this.pos),(r===43||r===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,`Invalid number`)),f(this.fullCharCodeAtPos())&&this.raise(this.pos,`Identifier directly after number`);var a=rt(this.input.slice(t,this.pos),n);return this.finishToken(b.num,a)},K.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var n=++this.pos;t=this.readHexChar(this.input.indexOf(`}`,this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(n,`Code point out of bounds`)}else t=this.readHexChar(4);return t};function at(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}K.readString=function(e){for(var t=``,n=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,`Unterminated string constant`);var r=this.input.charCodeAt(this.pos);if(r===e)break;r===92?(t+=this.input.slice(n,this.pos),t+=this.readEscapedChar(!1),n=this.pos):(C(r,this.options.ecmaVersion>=10)&&this.raise(this.start,`Unterminated string constant`),++this.pos)}return t+=this.input.slice(n,this.pos++),this.finishToken(b.string,t)};var ot={};K.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===ot)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1},K.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw ot;this.raise(e,t)},K.readTmplToken=function(){for(var e=``,t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,`Unterminated template`);var n=this.input.charCodeAt(this.pos);if(n===96||n===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===b.template||this.type===b.invalidTemplate)?n===36?(this.pos+=2,this.finishToken(b.dollarBraceL)):(++this.pos,this.finishToken(b.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(b.template,e));if(n===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(C(n)){switch(e+=this.input.slice(t,this.pos),++this.pos,n){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(n);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else ++this.pos}},K.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case`\\`:++this.pos;break;case`$`:if(this.input[this.pos+1]!==`{`)break;case"`":return this.finishToken(b.invalidTemplate,this.input.slice(this.start,this.pos))}this.raise(this.start,`Unterminated template`)},K.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return`\r`;case 120:return String.fromCharCode(this.readHexChar(2));case 117:return at(this.readCodePoint());case 116:return`	`;case 98:return`\b`;case 118:return`\v`;case 102:return`\f`;case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),``;case 56:case 57:if(e){var n=this.pos-1;return this.invalidStringToken(n,`Invalid escape sequence in template string`),null}default:if(t>=48&&t<=55){var r=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],i=parseInt(r,8);return i>255&&(r=r.slice(0,-1),i=parseInt(r,8)),this.pos+=r.length-1,t=this.input.charCodeAt(this.pos),(r!==`0`||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-r.length,e?`Octal literal in template string`:`Octal literal in strict mode`),String.fromCharCode(i)}return C(t)?``:String.fromCharCode(t)}},K.readHexChar=function(e){var t=this.pos,n=this.readInt(16,e);return n===null&&this.invalidStringToken(t,`Bad character escape sequence`),n},K.readWord1=function(){this.containsEsc=!1;for(var e=``,t=!0,n=this.pos,r=this.options.ecmaVersion>=6;this.pos<this.input.length;){var i=this.fullCharCodeAtPos();if(p(i,r))this.pos+=i<=65535?1:2;else if(i===92){this.containsEsc=!0,e+=this.input.slice(n,this.pos);var a=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,`Expecting Unicode escape sequence \\uXXXX`),++this.pos;var o=this.readCodePoint();(t?f:p)(o,r)||this.invalidStringToken(a,`Invalid Unicode escape`),e+=at(o),n=this.pos}else break;t=!1}return e+this.input.slice(n,this.pos)},K.readWord=function(){var e=this.readWord1(),t=b.name;return this.keywords.test(e)&&(t=v[e]),this.finishToken(t,e)};var st=`7.4.1`;_e.acorn={Parser:_e,version:st,defaultOptions:ie,Position:re,SourceLocation:k,getLineInfo:A,Node:Ae,TokenType:m,tokTypes:b,keywordTypes:v,TokContext:H,tokContexts:U,isIdentifierChar:p,isIdentifierStart:f,Token:nt,isNewLine:C,lineBreak:x,lineBreakG:S,nonASCIIwhitespace:w};function ct(e,t){return _e.parse(e,t)}function lt(e,t,n){return _e.parseExpressionAt(e,t,n)}function ut(e,t){return _e.tokenizer(e,t)}e.Node=Ae,e.Parser=_e,e.Position=re,e.SourceLocation=k,e.TokContext=H,e.Token=nt,e.TokenType=m,e.defaultOptions=ie,e.getLineInfo=A,e.isIdentifierChar=p,e.isIdentifierStart=f,e.isNewLine=C,e.keywordTypes=v,e.lineBreak=x,e.lineBreakG=S,e.nonASCIIwhitespace=w,e.parse=ct,e.parseExpressionAt=lt,e.tokContexts=U,e.tokTypes=b,e.tokenizer=ut,e.version=st,Object.defineProperty(e,"__esModule",{value:!0})}))}}),gy=v_({"node_modules/acorn-jsx/xhtml.js"(e,t){t.exports={quot:`"`,amp:`&`,apos:`'`,lt:`<`,gt:`>`,nbsp:`\xA0`,iexcl:`¡`,cent:`¢`,pound:`£`,curren:`¤`,yen:`¥`,brvbar:`¦`,sect:`§`,uml:`¨`,copy:`©`,ordf:`ª`,laquo:`«`,not:`¬`,shy:`­`,reg:`®`,macr:`¯`,deg:`°`,plusmn:`±`,sup2:`²`,sup3:`³`,acute:`´`,micro:`µ`,para:`¶`,middot:`·`,cedil:`¸`,sup1:`¹`,ordm:`º`,raquo:`»`,frac14:`¼`,frac12:`½`,frac34:`¾`,iquest:`¿`,Agrave:`À`,Aacute:`Á`,Acirc:`Â`,Atilde:`Ã`,Auml:`Ä`,Aring:`Å`,AElig:`Æ`,Ccedil:`Ç`,Egrave:`È`,Eacute:`É`,Ecirc:`Ê`,Euml:`Ë`,Igrave:`Ì`,Iacute:`Í`,Icirc:`Î`,Iuml:`Ï`,ETH:`Ð`,Ntilde:`Ñ`,Ograve:`Ò`,Oacute:`Ó`,Ocirc:`Ô`,Otilde:`Õ`,Ouml:`Ö`,times:`×`,Oslash:`Ø`,Ugrave:`Ù`,Uacute:`Ú`,Ucirc:`Û`,Uuml:`Ü`,Yacute:`Ý`,THORN:`Þ`,szlig:`ß`,agrave:`à`,aacute:`á`,acirc:`â`,atilde:`ã`,auml:`ä`,aring:`å`,aelig:`æ`,ccedil:`ç`,egrave:`è`,eacute:`é`,ecirc:`ê`,euml:`ë`,igrave:`ì`,iacute:`í`,icirc:`î`,iuml:`ï`,eth:`ð`,ntilde:`ñ`,ograve:`ò`,oacute:`ó`,ocirc:`ô`,otilde:`õ`,ouml:`ö`,divide:`÷`,oslash:`ø`,ugrave:`ù`,uacute:`ú`,ucirc:`û`,uuml:`ü`,yacute:`ý`,thorn:`þ`,yuml:`ÿ`,OElig:`Œ`,oelig:`œ`,Scaron:`Š`,scaron:`š`,Yuml:`Ÿ`,fnof:`ƒ`,circ:`ˆ`,tilde:`˜`,Alpha:`Α`,Beta:`Β`,Gamma:`Γ`,Delta:`Δ`,Epsilon:`Ε`,Zeta:`Ζ`,Eta:`Η`,Theta:`Θ`,Iota:`Ι`,Kappa:`Κ`,Lambda:`Λ`,Mu:`Μ`,Nu:`Ν`,Xi:`Ξ`,Omicron:`Ο`,Pi:`Π`,Rho:`Ρ`,Sigma:`Σ`,Tau:`Τ`,Upsilon:`Υ`,Phi:`Φ`,Chi:`Χ`,Psi:`Ψ`,Omega:`Ω`,alpha:`α`,beta:`β`,gamma:`γ`,delta:`δ`,epsilon:`ε`,zeta:`ζ`,eta:`η`,theta:`θ`,iota:`ι`,kappa:`κ`,lambda:`λ`,mu:`μ`,nu:`ν`,xi:`ξ`,omicron:`ο`,pi:`π`,rho:`ρ`,sigmaf:`ς`,sigma:`σ`,tau:`τ`,upsilon:`υ`,phi:`φ`,chi:`χ`,psi:`ψ`,omega:`ω`,thetasym:`ϑ`,upsih:`ϒ`,piv:`ϖ`,ensp:` `,emsp:` `,thinsp:` `,zwnj:`‌`,zwj:`‍`,lrm:`‎`,rlm:`‏`,ndash:`–`,mdash:`—`,lsquo:`‘`,rsquo:`’`,sbquo:`‚`,ldquo:`“`,rdquo:`”`,bdquo:`„`,dagger:`†`,Dagger:`‡`,bull:`•`,hellip:`…`,permil:`‰`,prime:`′`,Prime:`″`,lsaquo:`‹`,rsaquo:`›`,oline:`‾`,frasl:`⁄`,euro:`€`,image:`ℑ`,weierp:`℘`,real:`ℜ`,trade:`™`,alefsym:`ℵ`,larr:`←`,uarr:`↑`,rarr:`→`,darr:`↓`,harr:`↔`,crarr:`↵`,lArr:`⇐`,uArr:`⇑`,rArr:`⇒`,dArr:`⇓`,hArr:`⇔`,forall:`∀`,part:`∂`,exist:`∃`,empty:`∅`,nabla:`∇`,isin:`∈`,notin:`∉`,ni:`∋`,prod:`∏`,sum:`∑`,minus:`−`,lowast:`∗`,radic:`√`,prop:`∝`,infin:`∞`,ang:`∠`,and:`∧`,or:`∨`,cap:`∩`,cup:`∪`,int:`∫`,there4:`∴`,sim:`∼`,cong:`≅`,asymp:`≈`,ne:`≠`,equiv:`≡`,le:`≤`,ge:`≥`,sub:`⊂`,sup:`⊃`,nsub:`⊄`,sube:`⊆`,supe:`⊇`,oplus:`⊕`,otimes:`⊗`,perp:`⊥`,sdot:`⋅`,lceil:`⌈`,rceil:`⌉`,lfloor:`⌊`,rfloor:`⌋`,lang:`〈`,rang:`〉`,loz:`◊`,spades:`♠`,clubs:`♣`,hearts:`♥`,diams:`♦`}}}),_y=v_({"node_modules/acorn-jsx/index.js"(e,t){var n=gy(),r=/^[\da-fA-F]+$/,i=/^\d+$/,a=new WeakMap;function o(e){e=e.Parser.acorn||e;let t=a.get(e);if(!t){let n=e.tokTypes,r=e.TokContext,i=e.TokenType,o=new r(`<tag`,!1),s=new r(`</tag`,!1),c=new r(`<tag>...</tag>`,!0,!0),l={tc_oTag:o,tc_cTag:s,tc_expr:c},u={jsxName:new i(`jsxName`),jsxText:new i(`jsxText`,{beforeExpr:!0}),jsxTagStart:new i(`jsxTagStart`,{startsExpr:!0}),jsxTagEnd:new i(`jsxTagEnd`)};u.jsxTagStart.updateContext=function(){this.context.push(c),this.context.push(o),this.exprAllowed=!1},u.jsxTagEnd.updateContext=function(e){let t=this.context.pop();t===o&&e===n.slash||t===s?(this.context.pop(),this.exprAllowed=this.curContext()===c):this.exprAllowed=!0},t={tokContexts:l,tokTypes:u},a.set(e,t)}return t}function s(e){if(!e)return e;if(e.type===`JSXIdentifier`)return e.name;if(e.type===`JSXNamespacedName`)return e.namespace.name+`:`+e.name.name;if(e.type===`JSXMemberExpression`)return s(e.object)+`.`+s(e.property)}t.exports=function(e){return e||={},function(t){return c({allowNamespaces:e.allowNamespaces!==!1,allowNamespacedObjects:!!e.allowNamespacedObjects},t)}},Object.defineProperty(t.exports,"tokTypes",{get:function(){return o(hy()).tokTypes},configurable:!0,enumerable:!0});function c(e,t){let a=t.acorn||hy(),c=o(a),l=a.tokTypes,u=c.tokTypes,d=a.tokContexts,f=c.tokContexts.tc_oTag,p=c.tokContexts.tc_cTag,m=c.tokContexts.tc_expr,h=a.isNewLine,g=a.isIdentifierStart,_=a.isIdentifierChar;return class extends t{static get acornJsx(){return c}jsx_readToken(){let e=``,t=this.pos;for(;;){this.pos>=this.input.length&&this.raise(this.start,`Unterminated JSX contents`);let n=this.input.charCodeAt(this.pos);switch(n){case 60:case 123:return this.pos===this.start?n===60&&this.exprAllowed?(++this.pos,this.finishToken(u.jsxTagStart)):this.getTokenFromCode(n):(e+=this.input.slice(t,this.pos),this.finishToken(u.jsxText,e));case 38:e+=this.input.slice(t,this.pos),e+=this.jsx_readEntity(),t=this.pos;break;case 62:case 125:this.raise(this.pos,"Unexpected token `"+this.input[this.pos]+"`. Did you mean `"+(n===62?`&gt;`:`&rbrace;`)+'` or `{"'+this.input[this.pos]+'"}`?');default:h(n)?(e+=this.input.slice(t,this.pos),e+=this.jsx_readNewLine(!0),t=this.pos):++this.pos}}}jsx_readNewLine(e){let t=this.input.charCodeAt(this.pos),n;return++this.pos,t===13&&this.input.charCodeAt(this.pos)===10?(++this.pos,n=e?`
`:`\r
`):n=String.fromCharCode(t),this.options.locations&&(++this.curLine,this.lineStart=this.pos),n}jsx_readString(e){let t=``,n=++this.pos;for(;;){this.pos>=this.input.length&&this.raise(this.start,`Unterminated string constant`);let r=this.input.charCodeAt(this.pos);if(r===e)break;r===38?(t+=this.input.slice(n,this.pos),t+=this.jsx_readEntity(),n=this.pos):h(r)?(t+=this.input.slice(n,this.pos),t+=this.jsx_readNewLine(!1),n=this.pos):++this.pos}return t+=this.input.slice(n,this.pos++),this.finishToken(l.string,t)}jsx_readEntity(){let e=``,t=0,a,o=this.input[this.pos];o!==`&`&&this.raise(this.pos,`Entity must start with an ampersand`);let s=++this.pos;for(;this.pos<this.input.length&&t++<10;){if(o=this.input[this.pos++],o===`;`){e[0]===`#`?e[1]===`x`?(e=e.substr(2),r.test(e)&&(a=String.fromCharCode(parseInt(e,16)))):(e=e.substr(1),i.test(e)&&(a=String.fromCharCode(parseInt(e,10)))):a=n[e];break}e+=o}return a||(this.pos=s,`&`)}jsx_readWord(){let e,t=this.pos;do e=this.input.charCodeAt(++this.pos);while(_(e)||e===45);return this.finishToken(u.jsxName,this.input.slice(t,this.pos))}jsx_parseIdentifier(){let e=this.startNode();return this.type===u.jsxName?e.name=this.value:this.type.keyword?e.name=this.type.keyword:this.unexpected(),this.next(),this.finishNode(e,`JSXIdentifier`)}jsx_parseNamespacedName(){let t=this.start,n=this.startLoc,r=this.jsx_parseIdentifier();if(!e.allowNamespaces||!this.eat(l.colon))return r;var i=this.startNodeAt(t,n);return i.namespace=r,i.name=this.jsx_parseIdentifier(),this.finishNode(i,`JSXNamespacedName`)}jsx_parseElementName(){if(this.type===u.jsxTagEnd)return``;let t=this.start,n=this.startLoc,r=this.jsx_parseNamespacedName();for(this.type===l.dot&&r.type===`JSXNamespacedName`&&!e.allowNamespacedObjects&&this.unexpected();this.eat(l.dot);){let e=this.startNodeAt(t,n);e.object=r,e.property=this.jsx_parseIdentifier(),r=this.finishNode(e,`JSXMemberExpression`)}return r}jsx_parseAttributeValue(){switch(this.type){case l.braceL:let e=this.jsx_parseExpressionContainer();return e.expression.type===`JSXEmptyExpression`&&this.raise(e.start,`JSX attributes must only be assigned a non-empty expression`),e;case u.jsxTagStart:case l.string:return this.parseExprAtom();default:this.raise(this.start,`JSX value should be either an expression or a quoted JSX text`)}}jsx_parseEmptyExpression(){let e=this.startNodeAt(this.lastTokEnd,this.lastTokEndLoc);return this.finishNodeAt(e,`JSXEmptyExpression`,this.start,this.startLoc)}jsx_parseExpressionContainer(){let e=this.startNode();return this.next(),e.expression=this.type===l.braceR?this.jsx_parseEmptyExpression():this.parseExpression(),this.expect(l.braceR),this.finishNode(e,`JSXExpressionContainer`)}jsx_parseAttribute(){let e=this.startNode();return this.eat(l.braceL)?(this.expect(l.ellipsis),e.argument=this.parseMaybeAssign(),this.expect(l.braceR),this.finishNode(e,`JSXSpreadAttribute`)):(e.name=this.jsx_parseNamespacedName(),e.value=this.eat(l.eq)?this.jsx_parseAttributeValue():null,this.finishNode(e,`JSXAttribute`))}jsx_parseOpeningElementAt(e,t){let n=this.startNodeAt(e,t);n.attributes=[];let r=this.jsx_parseElementName();for(r&&(n.name=r);this.type!==l.slash&&this.type!==u.jsxTagEnd;)n.attributes.push(this.jsx_parseAttribute());return n.selfClosing=this.eat(l.slash),this.expect(u.jsxTagEnd),this.finishNode(n,r?`JSXOpeningElement`:`JSXOpeningFragment`)}jsx_parseClosingElementAt(e,t){let n=this.startNodeAt(e,t),r=this.jsx_parseElementName();return r&&(n.name=r),this.expect(u.jsxTagEnd),this.finishNode(n,r?`JSXClosingElement`:`JSXClosingFragment`)}jsx_parseElementAt(e,t){let n=this.startNodeAt(e,t),r=[],i=this.jsx_parseOpeningElementAt(e,t),a=null;if(!i.selfClosing){contents:for(;;)switch(this.type){case u.jsxTagStart:if(e=this.start,t=this.startLoc,this.next(),this.eat(l.slash)){a=this.jsx_parseClosingElementAt(e,t);break contents}r.push(this.jsx_parseElementAt(e,t));break;case u.jsxText:r.push(this.parseExprAtom());break;case l.braceL:r.push(this.jsx_parseExpressionContainer());break;default:this.unexpected()}s(a.name)!==s(i.name)&&this.raise(a.start,`Expected corresponding JSX closing tag for <`+s(i.name)+`>`)}let o=i.name?`Element`:`Fragment`;return n[`opening`+o]=i,n[`closing`+o]=a,n.children=r,this.type===l.relational&&this.value===`<`&&this.raise(this.start,`Adjacent JSX elements must be wrapped in an enclosing tag`),this.finishNode(n,`JSX`+o)}jsx_parseText(){let e=this.parseLiteral(this.value);return e.type=`JSXText`,e}jsx_parseElement(){let e=this.start,t=this.startLoc;return this.next(),this.jsx_parseElementAt(e,t)}parseExprAtom(e){return this.type===u.jsxText?this.jsx_parseText():this.type===u.jsxTagStart?this.jsx_parseElement():super.parseExprAtom(e)}readToken(e){let t=this.curContext();if(t===m)return this.jsx_readToken();if(t===f||t===p){if(g(e))return this.jsx_readWord();if(e==62)return++this.pos,this.finishToken(u.jsxTagEnd);if((e===34||e===39)&&t==f)return this.jsx_readString(e)}return e===60&&this.exprAllowed&&this.input.charCodeAt(this.pos+1)!==33?(++this.pos,this.finishToken(u.jsxTagStart)):super.readToken(e)}updateContext(e){if(this.type==l.braceL){var t=this.curContext();t==f?this.context.push(d.b_expr):t==m?this.context.push(d.b_tmpl):super.updateContext(e),this.exprAllowed=!0}else if(this.type===l.slash&&e===u.jsxTagStart)this.context.length-=2,this.context.push(p),this.exprAllowed=!1;else return super.updateContext(e)}}}}}),vy=v_({"../../../node_modules/html-tags/html-tags.json"(e,t){t.exports=`a.abbr.address.area.article.aside.audio.b.base.bdi.bdo.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.link.main.map.mark.math.menu.menuitem.meta.meter.nav.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rb.rp.rt.rtc.ruby.s.samp.script.search.section.select.slot.small.source.span.strong.style.sub.summary.sup.svg.table.tbody.td.template.textarea.tfoot.th.thead.time.title.tr.track.u.ul.var.video.wbr`.split(`.`)}}),yy=v_({"../../../node_modules/html-tags/index.js"(e,t){t.exports=vy()}}),by={};y_(by,{argTypesEnhancers:()=>sx,parameters:()=>ox});var xy=`custom`,Sy=`object`,Cy=`array`,wy=`class`,Ty=`func`,Ey=`element`,Dy=x_(my(),1);function Oy(e){var t=[...arguments].slice(1),n=Array.from(typeof e==`string`?[e]:e);n[n.length-1]=n[n.length-1].replace(/\r?\n([\t ]*)$/,``);var r=n.reduce(function(e,t){var n=t.match(/\n([\t ]+|(?!\s).)/g);return n?e.concat(n.map(function(e){return e.match(/[\t ]/g)?.length??0})):e},[]);if(r.length){var i=RegExp(`
[	 ]{`+Math.min.apply(Math,r)+`}`,`g`);n=n.map(function(e){return e.replace(i,`
`)})}n[0]=n[0].replace(/^\r?\n/,``);var a=n[0];return t.forEach(function(e,t){var r=a.match(/(?:^|\n)( *)$/),i=r?r[1]:``,o=e;typeof e==`string`&&e.includes(`
`)&&(o=String(e).split(`
`).map(function(e,t){return t===0?e:``+i+e}).join(`
`)),a+=o+n[t+1]}),a}var ky={format:{indent:{style:`  `},semicolons:!1}},Ay={...ky,format:{newline:``}},jy={...ky};function My(e,t=!1){return(0,Dy.generate)(e,t?Ay:jy)}function Ny(e,t=!1){return t?Py(e):My(e)}function Py(e){let t=My(e,!0);return t.endsWith(` }`)||(t=`${t.slice(0,-1)} }`),t}function Fy(e,t=!1){return t?Ly(e):Iy(e)}function Iy(e){let t=My(e);return t.endsWith(`  }]`)&&(t=Oy(t)),t}function Ly(e){let t=My(e,!0);return t.startsWith(`[    `)&&(t=t.replace(`[    `,`[`)),t}var Ry=x_(hy(),1),zy=x_(_y(),1);function By(e,t,n,r,i){n||=Z,(function e(r,i,a){var o=a||r.type,s=t[o];n[o](r,i,e),s&&s(r,i)})(e,r,i)}function Vy(e,t,n,r,i){var a=[];n||=Z,(function e(r,i,o){var s=o||r.type,c=t[s],l=r!==a[a.length-1];l&&a.push(r),n[s](r,i,e),c&&c(r,i||a,a),l&&a.pop()})(e,r,i)}function Hy(e,t,n){n(e,t)}function Uy(e,t,n){}var Z={};Z.Program=Z.BlockStatement=function(e,t,n){for(var r=0,i=e.body;r<i.length;r+=1){var a=i[r];n(a,t,`Statement`)}},Z.Statement=Hy,Z.EmptyStatement=Uy,Z.ExpressionStatement=Z.ParenthesizedExpression=Z.ChainExpression=function(e,t,n){return n(e.expression,t,`Expression`)},Z.IfStatement=function(e,t,n){n(e.test,t,`Expression`),n(e.consequent,t,`Statement`),e.alternate&&n(e.alternate,t,`Statement`)},Z.LabeledStatement=function(e,t,n){return n(e.body,t,`Statement`)},Z.BreakStatement=Z.ContinueStatement=Uy,Z.WithStatement=function(e,t,n){n(e.object,t,`Expression`),n(e.body,t,`Statement`)},Z.SwitchStatement=function(e,t,n){n(e.discriminant,t,`Expression`);for(var r=0,i=e.cases;r<i.length;r+=1){var a=i[r];a.test&&n(a.test,t,`Expression`);for(var o=0,s=a.consequent;o<s.length;o+=1){var c=s[o];n(c,t,`Statement`)}}},Z.SwitchCase=function(e,t,n){e.test&&n(e.test,t,`Expression`);for(var r=0,i=e.consequent;r<i.length;r+=1){var a=i[r];n(a,t,`Statement`)}},Z.ReturnStatement=Z.YieldExpression=Z.AwaitExpression=function(e,t,n){e.argument&&n(e.argument,t,`Expression`)},Z.ThrowStatement=Z.SpreadElement=function(e,t,n){return n(e.argument,t,`Expression`)},Z.TryStatement=function(e,t,n){n(e.block,t,`Statement`),e.handler&&n(e.handler,t),e.finalizer&&n(e.finalizer,t,`Statement`)},Z.CatchClause=function(e,t,n){e.param&&n(e.param,t,`Pattern`),n(e.body,t,`Statement`)},Z.WhileStatement=Z.DoWhileStatement=function(e,t,n){n(e.test,t,`Expression`),n(e.body,t,`Statement`)},Z.ForStatement=function(e,t,n){e.init&&n(e.init,t,`ForInit`),e.test&&n(e.test,t,`Expression`),e.update&&n(e.update,t,`Expression`),n(e.body,t,`Statement`)},Z.ForInStatement=Z.ForOfStatement=function(e,t,n){n(e.left,t,`ForInit`),n(e.right,t,`Expression`),n(e.body,t,`Statement`)},Z.ForInit=function(e,t,n){e.type===`VariableDeclaration`?n(e,t):n(e,t,`Expression`)},Z.DebuggerStatement=Uy,Z.FunctionDeclaration=function(e,t,n){return n(e,t,`Function`)},Z.VariableDeclaration=function(e,t,n){for(var r=0,i=e.declarations;r<i.length;r+=1){var a=i[r];n(a,t)}},Z.VariableDeclarator=function(e,t,n){n(e.id,t,`Pattern`),e.init&&n(e.init,t,`Expression`)},Z.Function=function(e,t,n){e.id&&n(e.id,t,`Pattern`);for(var r=0,i=e.params;r<i.length;r+=1){var a=i[r];n(a,t,`Pattern`)}n(e.body,t,e.expression?`Expression`:`Statement`)},Z.Pattern=function(e,t,n){e.type===`Identifier`?n(e,t,`VariablePattern`):e.type===`MemberExpression`?n(e,t,`MemberPattern`):n(e,t)},Z.VariablePattern=Uy,Z.MemberPattern=Hy,Z.RestElement=function(e,t,n){return n(e.argument,t,`Pattern`)},Z.ArrayPattern=function(e,t,n){for(var r=0,i=e.elements;r<i.length;r+=1){var a=i[r];a&&n(a,t,`Pattern`)}},Z.ObjectPattern=function(e,t,n){for(var r=0,i=e.properties;r<i.length;r+=1){var a=i[r];a.type===`Property`?(a.computed&&n(a.key,t,`Expression`),n(a.value,t,`Pattern`)):a.type===`RestElement`&&n(a.argument,t,`Pattern`)}},Z.Expression=Hy,Z.ThisExpression=Z.Super=Z.MetaProperty=Uy,Z.ArrayExpression=function(e,t,n){for(var r=0,i=e.elements;r<i.length;r+=1){var a=i[r];a&&n(a,t,`Expression`)}},Z.ObjectExpression=function(e,t,n){for(var r=0,i=e.properties;r<i.length;r+=1){var a=i[r];n(a,t)}},Z.FunctionExpression=Z.ArrowFunctionExpression=Z.FunctionDeclaration,Z.SequenceExpression=function(e,t,n){for(var r=0,i=e.expressions;r<i.length;r+=1){var a=i[r];n(a,t,`Expression`)}},Z.TemplateLiteral=function(e,t,n){for(var r=0,i=e.quasis;r<i.length;r+=1){var a=i[r];n(a,t)}for(var o=0,s=e.expressions;o<s.length;o+=1){var c=s[o];n(c,t,`Expression`)}},Z.TemplateElement=Uy,Z.UnaryExpression=Z.UpdateExpression=function(e,t,n){n(e.argument,t,`Expression`)},Z.BinaryExpression=Z.LogicalExpression=function(e,t,n){n(e.left,t,`Expression`),n(e.right,t,`Expression`)},Z.AssignmentExpression=Z.AssignmentPattern=function(e,t,n){n(e.left,t,`Pattern`),n(e.right,t,`Expression`)},Z.ConditionalExpression=function(e,t,n){n(e.test,t,`Expression`),n(e.consequent,t,`Expression`),n(e.alternate,t,`Expression`)},Z.NewExpression=Z.CallExpression=function(e,t,n){if(n(e.callee,t,`Expression`),e.arguments)for(var r=0,i=e.arguments;r<i.length;r+=1){var a=i[r];n(a,t,`Expression`)}},Z.MemberExpression=function(e,t,n){n(e.object,t,`Expression`),e.computed&&n(e.property,t,`Expression`)},Z.ExportNamedDeclaration=Z.ExportDefaultDeclaration=function(e,t,n){e.declaration&&n(e.declaration,t,e.type===`ExportNamedDeclaration`||e.declaration.id?`Statement`:`Expression`),e.source&&n(e.source,t,`Expression`)},Z.ExportAllDeclaration=function(e,t,n){e.exported&&n(e.exported,t),n(e.source,t,`Expression`)},Z.ImportDeclaration=function(e,t,n){for(var r=0,i=e.specifiers;r<i.length;r+=1){var a=i[r];n(a,t)}n(e.source,t,`Expression`)},Z.ImportExpression=function(e,t,n){n(e.source,t,`Expression`)},Z.ImportSpecifier=Z.ImportDefaultSpecifier=Z.ImportNamespaceSpecifier=Z.Identifier=Z.Literal=Uy,Z.TaggedTemplateExpression=function(e,t,n){n(e.tag,t,`Expression`),n(e.quasi,t,`Expression`)},Z.ClassDeclaration=Z.ClassExpression=function(e,t,n){return n(e,t,`Class`)},Z.Class=function(e,t,n){e.id&&n(e.id,t,`Pattern`),e.superClass&&n(e.superClass,t,`Expression`),n(e.body,t)},Z.ClassBody=function(e,t,n){for(var r=0,i=e.body;r<i.length;r+=1){var a=i[r];n(a,t)}},Z.MethodDefinition=Z.Property=function(e,t,n){e.computed&&n(e.key,t,`Expression`),n(e.value,t,`Expression`)};var Wy={...Z,JSXElement:()=>{}},Gy=Ry.Parser.extend((0,zy.default)());function Ky(e){return e==null?null:e.name}function qy(e){return e.filter(e=>e.type===`ObjectExpression`||e.type===`ArrayExpression`)}function Jy(e){let t=[];return Vy(e,{ObjectExpression(e,n){t.push(qy(n).length)},ArrayExpression(e,n){t.push(qy(n).length)}},Wy),Math.max(...t)}function Yy(e){return{inferredType:{type:`Identifier`,identifier:Ky(e)},ast:e}}function Xy(e){return{inferredType:{type:`Literal`},ast:e}}function Zy(e){let t;By(e.body,{JSXElement(e){t=e}},Wy);let n={type:t==null?`Function`:`Element`,params:e.params,hasParams:e.params.length!==0},r=Ky(e.id);return r!=null&&(n.identifier=r),{inferredType:n,ast:e}}function Qy(e){let t;return By(e.body,{JSXElement(e){t=e}},Wy),{inferredType:{type:t==null?`Class`:`Element`,identifier:Ky(e.id)},ast:e}}function $y(e){let t={type:`Element`},n=Ky(e.openingElement.name);return n!=null&&(t.identifier=n),{inferredType:t,ast:e}}function eb(e){return Ky(e.callee.type===`MemberExpression`?e.callee.property:e.callee)===`shape`?tb(e.arguments[0]):null}function tb(e){return{inferredType:{type:`Object`,depth:Jy(e)},ast:e}}function nb(e){return{inferredType:{type:`Array`,depth:Jy(e)},ast:e}}function rb(e){switch(e.type){case`Identifier`:return Yy(e);case`Literal`:return Xy(e);case`FunctionExpression`:case`ArrowFunctionExpression`:return Zy(e);case`ClassExpression`:return Qy(e);case`JSXElement`:return $y(e);case`CallExpression`:return eb(e);case`ObjectExpression`:return tb(e);case`ArrayExpression`:return nb(e);default:return null}}function ib(e){let t=Gy.parse(`(${e})`,{ecmaVersion:2020}),n={inferredType:{type:`Unknown`},ast:t};if(t.body[0]!=null){let e=t.body[0];if(e.type===`ExpressionStatement`){let t=rb(e.expression);t!=null&&(n=t)}}return n}function ab(e){try{return{...ib(e)}}catch{}return{inferredType:{type:`Unknown`}}}var ob=x_(yy(),1);function sb(e){return ob.default.includes(e.toLowerCase())}function cb({inferredType:e,ast:t}){let{depth:n}=e;if(n<=2){let e=Fy(t,!0);if(!Qi(e))return Y(e)}return Y(Cy,Fy(t))}function lb({inferredType:e,ast:t}){let{depth:n}=e;if(n===1){let e=Ny(t,!0);if(!Qi(e))return Y(e)}return Y(Sy,Ny(t))}function ub(e,t){return t?`${e}( ... )`:`${e}()`}function db(e){return`<${e} />`}function fb(e){let{type:t,identifier:n}=e;switch(t){case`Function`:return ub(n,e.hasParams);case`Element`:return db(n);default:return n}}function pb({inferredType:e,ast:t}){let{identifier:n}=e;if(n!=null)return Y(fb(e),My(t));let r=My(t,!0);return Qi(r)?Y(Ty,My(t)):Y(r)}function mb(e,t){let{inferredType:n}=t,{identifier:r}=n;return r!=null&&!sb(r)?Y(fb(n),e):Qi(e)?Y(Ey,e):Y(e)}function hb(e){try{let t=ab(e);switch(t.inferredType.type){case`Object`:return lb(t);case`Function`:return pb(t);case`Element`:return mb(e,t);case`Array`:return cb(t);default:return null}}catch(e){console.error(e)}return null}function gb(e){if(!e||typeof e!=`object`)return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)===`[object Object]`:!1}function _b(e){return typeof e==`function`}function vb(e){return typeof e==`string`}var yb=Xv;function bb(e){return e.$$typeof!=null}function xb(e,t){let{name:n}=e;return n!==``&&n!==`anonymous`&&n!==t?n:null}var Sb=e=>Y(JSON.stringify(e));function Cb(e){let{type:t}=e,{displayName:n}=t,r=yb(e,{});if(n!=null)return Y(db(n),r);if(vb(t)&&sb(t)){let t=yb(e,{tabStop:0}).replace(/\r?\n|\r/g,``);if(!Qi(t))return Y(t)}return Y(Ey,r)}var wb={string:Sb,object:e=>bb(e)&&e.type!=null?Cb(e):gb(e)?lb(ab(JSON.stringify(e))):Array.isArray(e)?cb(ab(JSON.stringify(e))):Y(Sy),function:(e,t)=>{let n=!1,r;if(_b(e.render))n=!0;else if(e.prototype!=null&&_b(e.prototype.render))n=!0;else{let t;try{r=ab(e.toString());let{hasParams:i,params:a}=r.inferredType;i?a.length===1&&a[0].type===`ObjectPattern`&&(t=e({})):t=e(),t!=null&&bb(t)&&(n=!0)}catch{}}let i=xb(e,t.name);if(i!=null){if(n)return Y(db(i));r!=null&&(r=ab(e.toString()));let{hasParams:t}=r.inferredType;return Y(ub(i,t))}return Y(n?Ey:Ty)},default:e=>Y(e.toString())};function Tb(e={}){return{...wb,...e}}function Eb(e,t,n=wb){try{switch(typeof e){case`string`:return n.string(e,t);case`object`:return n.object(e,t);case`function`:return n.function(e,t);default:return n.default(e,t)}}catch(e){console.error(e)}return null}function Db(e,t){let n=e!=null,r=t!=null;if(!n&&!r)return``;let i=[];if(n){let t=e.map(e=>{let t=e.getPrettyName(),n=e.getTypeName();return n==null?t:`${t}: ${n}`});i.push(`(${t.join(`, `)})`)}else i.push(`()`);return r&&i.push(`=> ${t.getTypeName()}`),i.join(` `)}function Ob(e,t){let n=e!=null,r=t!=null;if(!n&&!r)return``;let i=[];return n?i.push(`( ... )`):i.push(`()`),r&&i.push(`=> ${t.getTypeName()}`),i.join(` `)}function kb(e){return e.replace(/,/g,`,\r
`)}var Ab=150;function jb({name:e,short:t,compact:n,full:r,inferredType:i}){return{name:e,short:t,compact:n,full:r??t,inferredType:i}}function Mb(e){return e.replace(/PropTypes./g,``).replace(/.isRequired/g,``)}function Nb(e){return e.split(/\r?\n/)}function Pb(e,t=!1){return Mb(Ny(e,t))}function Fb(e,t=!1){return Mb(My(e,t))}function Ib(e){switch(e){case`Object`:return Sy;case`Array`:return Cy;case`Class`:return wy;case`Function`:return Ty;case`Element`:return Ey;default:return xy}}function Lb(e,t){let{inferredType:n,ast:r}=ab(e),{type:i}=n,a,o,s;switch(i){case`Identifier`:case`Literal`:a=e,o=e;break;case`Object`:{let{depth:e}=n;a=Sy,o=e===1?Pb(r,!0):null,s=Pb(r);break}case`Element`:{let{identifier:t}=n;a=t!=null&&!sb(t)?t:Ey,o=Nb(e).length===1?e:null,s=e;break}case`Array`:{let{depth:e}=n;a=Cy,o=e<=2?Fb(r,!0):null,s=Fb(r);break}default:a=Ib(i),o=Nb(e).length===1?e:null,s=e;break}return jb({name:t,short:a,compact:o,full:s,inferredType:i})}function Rb({raw:e}){return e==null?jb({name:`custom`,short:xy,compact:xy}):Lb(e,`custom`)}function zb(e){let{jsDocTags:t}=e;return t!=null&&(t.params!=null||t.returns!=null)?jb({name:`func`,short:Ob(t.params,t.returns),compact:null,full:Db(t.params,t.returns)}):jb({name:`func`,short:Ty,compact:Ty})}function Bb(e,t){let{inferredType:n,ast:r}=ab(`{ ${Object.keys(e.value).map(n=>`${n}: ${Xb(e.value[n],t).full}`).join(`, `)} }`),{depth:i}=n;return jb({name:`shape`,short:Sy,compact:i===1&&r?Pb(r,!0):null,full:r?Pb(r):null})}function Vb(e){return`objectOf(${e})`}function Hb(e,t){let{short:n,compact:r,full:i}=Xb(e.value,t);return jb({name:`objectOf`,short:Vb(n),compact:r==null?null:Vb(r),full:i&&Vb(i)})}function Ub(e,t){if(Array.isArray(e.value)){let n=e.value.reduce((e,n)=>{let{short:r,compact:i,full:a}=Xb(n,t);return e.short.push(r),e.compact.push(i),e.full.push(a),e},{short:[],compact:[],full:[]});return jb({name:`union`,short:n.short.join(` | `),compact:n.compact.every(e=>e!=null)?n.compact.join(` | `):null,full:n.full.join(` | `)})}return jb({name:`union`,short:e.value,compact:null})}function Wb({value:e,computed:t}){return t?Lb(e,`enumvalue`):jb({name:`enumvalue`,short:e,compact:e})}function Gb(e){if(Array.isArray(e.value)){let t=e.value.reduce((e,t)=>{let{short:n,compact:r,full:i}=Wb(t);return e.short.push(n),e.compact.push(r),e.full.push(i),e},{short:[],compact:[],full:[]});return jb({name:`enum`,short:t.short.join(` | `),compact:t.compact.every(e=>e!=null)?t.compact.join(` | `):null,full:t.full.join(` | `)})}return jb({name:`enum`,short:e.value,compact:e.value})}function Kb(e){return`${e}[]`}function qb(e){return`[${e}]`}function Jb(e,t,n){return jb({name:`arrayOf`,short:Kb(e),compact:t==null?null:qb(t),full:n&&qb(n)})}function Yb(e,t){let{name:n,short:r,compact:i,full:a,inferredType:o}=Xb(e.value,t);if(n===`custom`){if(o===`Object`)return Jb(r,i,a)}else if(n===`shape`)return Jb(r,i,a);return jb({name:`arrayOf`,short:Kb(r),compact:Kb(r)})}function Xb(e,t){try{switch(e.name){case`custom`:return Rb(e);case`func`:return zb(t);case`shape`:return Bb(e,t);case`instanceOf`:return jb({name:`instanceOf`,short:e.value,compact:e.value});case`objectOf`:return Hb(e,t);case`union`:return Ub(e,t);case`enum`:return Gb(e);case`arrayOf`:return Yb(e,t);default:return jb({name:e.name,short:e.name,compact:e.name})}}catch(e){console.error(e)}return jb({name:`unknown`,short:`unknown`,compact:`unknown`})}function Zb(e){let{type:t}=e.docgenInfo;if(t==null)return null;try{switch(t.name){case`custom`:case`shape`:case`instanceOf`:case`objectOf`:case`union`:case`enum`:case`arrayOf`:{let{short:n,compact:r,full:i}=Xb(t,e);return r!=null&&!Zi(r)?Y(r):i?Y(n,i):Y(n)}case`func`:{let{short:n,full:r}=Xb(t,e),i=n,a;return r&&r.length<Ab?i=r:r&&(a=kb(r)),Y(i,a)}default:return null}}catch(e){console.error(e)}return null}var Qb=Tb({function:(e,{name:t,type:n})=>{let r=n?.summary===`element`||n?.summary===`elementType`,i=xb(e,t);if(i!=null){if(r)return Y(db(i));let{hasParams:t}=ab(e.toString()).inferredType;return Y(ub(i,t))}return Y(r?Ey:Ty)}});function $b(e,t){let{propTypes:n}=t;return n==null?e:Object.keys(n).map(t=>e.find(e=>e.name===t)).filter(Boolean)}function ex(e,t){let{propDef:n}=e,r=Zb(e);r!=null&&(n.type=r);let{defaultValue:i}=e.docgenInfo;if(i!=null&&i.value!=null){let e=hb(i.value);e!=null&&(n.defaultValue=e)}else if(t!=null){let e=Eb(t,n,Qb);e!=null&&(n.defaultValue=e)}return n}function tx(e,t){let n=t.defaultProps==null?{}:t.defaultProps;return $b(e.map(e=>ex(e,n[e.propDef.name])),t)}function nx(e,t){let{propDef:n}=e,{defaultValue:r}=e.docgenInfo;if(r!=null&&r.value!=null){let e=hb(r.value);e!=null&&(n.defaultValue=e)}else if(t!=null){let e=Eb(t,n);e!=null&&(n.defaultValue=e)}return n}function rx(e){return e.map(e=>nx(e))}function ix(e,t){let n=e;!ai(e)&&!e.propTypes&&H_(e)&&(n=e.type);let r=Ta(n,t);if(r.length===0)return[];switch(r[0].typeSystem){case ti.JAVASCRIPT:return tx(r,e);case ti.TYPESCRIPT:return rx(r);default:return r.map(e=>e.propDef)}}var ax=e=>({rows:ix(e,`props`)}),ox={docs:{extractArgTypes:e=>{if(e){let{rows:t}=ax(e);if(t)return t.reduce((e,t)=>{let{name:n,description:r,type:i,sbType:a,defaultValue:o,jsDocTags:s,required:c}=t;return e[n]={name:n,description:r,type:{required:c,...a},table:{type:i??void 0,jsDocTags:s,defaultValue:o??void 0}},e},{})}return null},extractComponentDescription:Da}},sx=[Oa];y_({},{applyDecorators:()=>vx,decorators:()=>xx,parameters:()=>Sx});var cx=Xv,lx=e=>e.charAt(0).toUpperCase()+e.slice(1),ux=e=>(e.$$typeof||e).toString().replace(/^Symbol\((.*)\)$/,`$1`).split(`.`).map(e=>e.split(`_`).map(lx).join(``)).join(`.`);function dx(e){if((0,q.isValidElement)(e)){let t=Object.keys(e.props).reduce((t,n)=>(t[n]=dx(e.props[n]),t),{});return{...e,props:t,_owner:null}}return Array.isArray(e)?e.map(dx):e}var fx=(e,t)=>{if(typeof e>`u`)return yr.warn(`Too many skip or undefined component`),null;let n=e,r=n.type;for(let e=0;e<t?.skip;e+=1){if(typeof n>`u`)return yr.warn(`Cannot skip undefined element`),null;if(q.Children.count(n)>1)return yr.warn(`Trying to skip an array of elements`),null;typeof n.props.children>`u`?(yr.warn(`Not enough children to skip elements.`),typeof n.type==`function`&&n.type.name===``&&(n=q.createElement(r,{...n.props}))):n=typeof n.props.children==`function`?n.props.children():n.props.children}let i;i=typeof t?.displayName==`string`?{showFunctions:!0,displayName:()=>t.displayName}:{displayName:e=>{if(e.type.displayName)return e.type.displayName;if(si(e.type,`displayName`))return si(e.type,`displayName`);if(e.type.render?.displayName)return e.type.render.displayName;if(typeof e.type==`symbol`||e.type.$$typeof&&typeof e.type.$$typeof==`symbol`)return ux(e.type);if(e.type.name&&e.type.name!==`_default`)return e.type.name;if(typeof e.type==`function`){let n=t?.parentComponent;if(n){for(let t of Object.keys(n))if(/^[A-Z]/.test(t)&&n[t]===e.type){let e=n.displayName||n.name||``;return e?`${e}.${t}`:t}}return`No Display Name`}else return U_(e.type)?e.type.render.name:H_(e.type)?e.type.type.name:e.type}};let a={...i,filterProps:(e,t)=>e!==void 0,...t};return q.Children.map(e,e=>{let t=typeof e==`number`?e.toString():e,n=(typeof cx==`function`?cx:cx.default)(dx(t),a);if(n.indexOf(`&quot;`)>-1){let e=n.match(/\S+=\\"([^"]*)\\"/g);e&&e.forEach(e=>{n=n.replace(e,e.replace(/&quot;/g,`'`))})}return n}).join(`
`).replace(/function\s+noRefCheck\(\)\s*\{\}/g,`() => {}`)},px={skip:0,showFunctions:!1,enableBeautify:!0,showDefaultProps:!1},mx=e=>{let t=e?.parameters.docs?.source,n=e?.parameters.__isArgsStory;return e?.parameters.__isPortableStory?!0:t?.type===ja.DYNAMIC?!1:!n||t?.code||t?.type===ja.CODE},hx=e=>e.type?.displayName===`MDXCreateElement`&&!!e.props?.mdxType,gx=e=>{if(!hx(e))return e;let{mdxType:t,originalType:n,children:r,...i}=e.props,a=[];return r&&(a=(Array.isArray(r)?r:[r]).map(gx)),(0,q.createElement)(n,i,...a)},_x=(e,t)=>{let n=pg(void 0),r=e(),i=mx(t),a={...px,...t?.parameters.jsx||{},parentComponent:t?.component},o=t.originalStoryFn(t.args,t);return mg(()=>{if(i)return;let e=fx(gx(o),a);e&&n.current!==e&&(u_(e,t),n.current=e)}),r},vx=(e,t)=>{let n=t.findIndex(e=>e.originalFn===_x);return d_(e,n===-1?t:[...t.splice(n,1),...t])},yx=`FEATURES`in globalThis&&globalThis?.FEATURES?.experimentalDocgenServer,bx=`FEATURES`in globalThis&&globalThis?.FEATURES?.experimentalCodeExamples,xx=yx||bx?[]:[_x],Sx={docs:{story:{inline:!0}}},{window:Cx}=J;Cx&&(Cx.STORYBOOK_ENV=`react`);var wx=Jg([S_,by,{renderToCanvas:async(e,t)=>{if(e.storyContext.testingLibraryRender==null)return N_(e,t);let{storyContext:{context:n,unboundStoryFn:r,testingLibraryRender:i}}=e,{unmount:a}=i(q.createElement(r,{...n}),{container:n.canvasElement});return a}}]);function Tx(e,t,n,r){return $g(e,t,n,globalThis.globalProjectAnnotations??wx,r)}var Ex=/^[A-Za-z_$][\w$]*$/,Dx=80,Ox=e=>{let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},kx=e=>{if(e===null)return!0;switch(typeof e){case`string`:case`number`:case`boolean`:return!0;case`object`:return Array.isArray(e)?e.every(kx):Ox(e)&&Object.values(e).every(kx);default:return!1}},Ax=String.raw`\"`,jx=String.raw`\'`,Mx=e=>`'${JSON.stringify(e).slice(1,-1).replaceAll(Ax,`"`).replaceAll(`'`,jx)}'`,Nx=e=>e===`__proto__`?`[${Mx(e)}]`:Ex.test(e)?e:Mx(e),Px=e=>{if(e===null)return`null`;if(typeof e==`string`)return Mx(e);if(Array.isArray(e))return`[${e.map(Px).join(`, `)}]`;if(typeof e==`object`){let t=Object.entries(e).filter(([,e])=>e!==void 0).map(([e,t])=>`${Nx(e)}: ${Px(t)}`);return t.length===0?`{}`:`{ ${t.join(`, `)} }`}return String(e)},Fx=(e,t,n)=>{let r=t.filter(t=>t!==`children`&&e[t]!==void 0&&kx(e[t]));for(let t of n)e[t]!==void 0&&kx(e[t])&&!r.includes(t)&&r.push(t);return r},Ix=/^[^"&\p{Cc}]*$/u,Lx=/^[^<>{}&\p{Cc}]*$/u,Rx=(e,t)=>t===!0?e:typeof t==`string`?Ix.test(t)?`${e}="${t}"`:`${e}={${Px(t)}}`:typeof t==`number`||typeof t==`boolean`?`${e}={${String(t)}}`:`${e}={${Px(t)}}`,zx=e=>{if(typeof e==`number`)return String(e);if(typeof e==`string`)return Lx.test(e)?e:`{${Px(e)}}`},Bx=(e,t,n)=>{let r=Fx(t,n,[`aria-label`]).map(e=>Rx(e,t[e])),i=zx(t.children),a=r.length>0?` ${r.join(` `)}`:``,o=i===void 0?`<${e}${a} />`:`<${e}${a}>${i}</${e}>`;if(o.length<=Dx||r.length===0)return o;let s=r.map(e=>`  ${e}`).join(`
`);return i===void 0?`<${e}\n${s}\n/>`:`<${e}\n${s}\n>\n  ${i}\n</${e}>`},Vx=(e,t)=>{let n=Fx(e,t,[`aria-label`,`children`]),r=Object.create(null);for(let t of n)r[t]=e[t];let i=Px(r);return i.length<=Dx?i:`{\n${n.map(t=>`  ${Nx(t)}: ${Px(e[t])},`).join(`
`)}\n}`},Hx=(e,t)=>{if(!e.startsWith(`.`))return e;if(e===`.`||e===`..`)return t;let n=e.replace(/^(\.\.?\/)+/,``);if(n===``)return t;let r=n.split(`/`);return`${t}/${r[0]===`utils`?n:r[0]}`},Ux=(e,t)=>{let n=e.replaceAll(/[.*+?^${}()|[\]\\]/g,String.raw`\$&`),r=new RegExp(String.raw`(?<![\w$-])${n}(?![\w$-])`);return t.some(e=>r.test(e))},Wx=(e,t)=>({defaultBinding:e.defaultBinding&&Ux(e.defaultBinding,t)?e.defaultBinding:void 0,namespaceBinding:e.namespaceBinding&&Ux(e.namespaceBinding,t)?e.namespaceBinding:void 0,namedBindings:e.namedBindings.filter(e=>Ux(e.local,t))}),Gx=(e,t)=>{let n=t.namedBindings.length>0?`{ ${t.namedBindings.map(e=>e.imported===e.local?e.local:`${e.imported} as ${e.local}`).join(`, `)} }`:void 0,r=t.namespaceBinding?`* as ${t.namespaceBinding}`:void 0;return`import ${[t.defaultBinding,r,n].filter(Boolean).join(`, `)} from '${e}'`},Kx=(e,t,n,r)=>t.renderBody===void 0?{body:Bx(e.componentName,n,r)}:t.renderParamKind===`none`?{body:t.renderBody}:{body:t.renderBody,argsConst:`const ${t.renderParamText} = ${Vx(n,r)}`},qx=(e,t)=>{let n=[];for(;;){let r=[t,...n],i=e.declarations.filter(e=>!n.includes(e.text)&&e.names.some(e=>Ux(e,r)));if(i.length===0)break;for(let e of i)n.push(e.text)}return e.declarations.filter(e=>n.includes(e.text)).map(e=>e.text)},Jx=(e,t,n)=>{let r=new Map;for(let i of e.imports){if(i.typeOnly)continue;let e=Wx(i,t);if(!e.defaultBinding&&!e.namespaceBinding&&e.namedBindings.length===0)continue;let a=Hx(i.specifier,n),o=r.get(a)??{namedBindings:[]};o.defaultBinding??=e.defaultBinding,o.namespaceBinding??=e.namespaceBinding,o.namedBindings.push(...e.namedBindings),r.set(a,o)}return r},Yx=(e,t,n)=>{let r=[`export default function Demo() {`,...t?[xe(t,2)]:[]];return n?[...r,xe(e,2),`}`]:[...r,`  return (`,xe(e,4),`  )`,`}`]},Xx=e=>{let{parsed:t,storyName:n,args:r,include:i=[],packageName:a}=e,o=t.stories.get(n);if(!o){let e=[...t.stories.keys()].join(`, `);throw Error(`Unknown story "${n}" - this module exports: ${e}`)}let s=Kx(t,o,r,i),{argsConst:c}=s,{body:l}=s,u=qx(t,l),d=Jx(t,[l,...u],a),f=d.get(`${a}/${t.componentName}`);if(c&&f){let e=`${t.componentName}Props`;f.namedBindings.push({imported:`type ${e}`,local:`type ${e}`}),c=c.replace(` = `,`: Partial<${e}> = `)}let p=[...d].map(([e,t])=>Gx(e,t)),m=Yx(l,c,o.isBlockBody),h=p.join(`
`),g=u.join(`

`),_=[h,...u,m.join(`
`)].filter(e=>e!==``),v=c?[c,l]:[l];return{preview:v.join(`

`),previewParts:v,importsText:h,helpersText:g,full:`${_.join(`

`)}\n`}},Zx=new Set([`select`,`inline-radio`]),Qx=new Set([`boolean`,`text`,`number`,`range`]),$x=(e,t)=>t.parameters?.controls?.include??e.parameters?.controls?.include??[],eS=(e,t)=>{let n=$x(e,t),r={...e.argTypes,...t.argTypes},i=[];for(let e of n){let t=r[e];if(!t?.control)continue;let n=typeof t.control==`string`?{type:t.control}:t.control,{type:a}=n;if(a===void 0)continue;let o=t.table?.defaultValue?.summary;if(Zx.has(a)){if(!t.options?.length)continue;i.push({kind:a,name:e,description:t.description,defaultValue:o,options:t.options});continue}Qx.has(a)&&i.push({kind:a,name:e,description:t.description,defaultValue:o,min:n.min,max:n.max,step:n.step})}return i},tS=e=>{let t=e.split(`/`);return e.startsWith(`@`)?t.slice(0,2).join(`/`):t[0]},nS=(e,t)=>{let n={};for(let r of e.matchAll(/^import[^'"]*['"]([^'"]+)['"]/gm)){let e=r[1];if(e.startsWith(`.`))continue;let i=tS(e);n[i]=t[i]??`latest`}return n},rS=e=>B(e,{transforms:[`typescript`,`jsx`],jsxRuntime:`preserve`,disableESTransforms:!0,keepUnusedImports:!0}).code.split(`
`).map(e=>{let t=e.trimEnd();return t.startsWith(`import `)?t.replace(/,\s*\}/,` }`):t}).join(`
`).replaceAll(/\n{3,}/g,`

`).trimEnd()+`
`,iS=`<div id="root"></div>`,aS=`import { createRoot } from 'react-dom/client'
import { ThemeProvider, baseTheme, createTheme } from '@soroush.tech/design-system/theme'
import Demo from './Demo'

const theme = createTheme(baseTheme, {})

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Demo />
  </ThemeProvider>
)
`,oS={compilerOptions:{target:`ES2020`,lib:[`ES2022`,`DOM`,`DOM.Iterable`],module:`ESNext`,moduleResolution:`bundler`,jsx:`react-jsx`,strict:!0,skipLibCheck:!0,noEmit:!0},include:[`src`]},sS=e=>e.toLowerCase().replaceAll(/[^a-z0-9]+/g,`-`).replaceAll(/^-|-$/g,``)||`story`,cS=(e,t,n)=>{let{language:r,versions:i,reactVersion:a}=n,o=r===`ts`?`tsx`:`jsx`,s=r===`ts`?aS:rS(aS),c=r===`ts`?{"tsconfig.json":{content:oS}}:{},l=r===`ts`?{typescript:`latest`,"@types/react":`latest`,"@types/react-dom":`latest`}:{};return{"package.json":{content:{name:`${sS(e)}-demo`,private:!0,main:`src/index.${o}`,dependencies:{...nS(t,i),...nS(s,i),react:a,"react-dom":a},devDependencies:{"react-scripts":`latest`,...l}}},...c,"public/index.html":{content:iS},[`src/index.${o}`]:{content:s},[`src/Demo.${o}`]:{content:t}}},lS=e(r(((e,t)=>{var n=(function(){var e=String.fromCharCode,t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$`,r={};function i(e,t){if(!r[e]){r[e]={};for(var n=0;n<e.length;n++)r[e][e.charAt(n)]=n}return r[e][t]}var a={compressToBase64:function(e){if(e==null)return``;var n=a._compress(e,6,function(e){return t.charAt(e)});switch(n.length%4){default:case 0:return n;case 1:return n+`===`;case 2:return n+`==`;case 3:return n+`=`}},decompressFromBase64:function(e){return e==null?``:e==``?null:a._decompress(e.length,32,function(n){return i(t,e.charAt(n))})},compressToUTF16:function(t){return t==null?``:a._compress(t,15,function(t){return e(t+32)})+` `},decompressFromUTF16:function(e){return e==null?``:e==``?null:a._decompress(e.length,16384,function(t){return e.charCodeAt(t)-32})},compressToUint8Array:function(e){for(var t=a.compress(e),n=new Uint8Array(t.length*2),r=0,i=t.length;r<i;r++){var o=t.charCodeAt(r);n[r*2]=o>>>8,n[r*2+1]=o%256}return n},decompressFromUint8Array:function(t){if(t==null)return a.decompress(t);for(var n=Array(t.length/2),r=0,i=n.length;r<i;r++)n[r]=t[r*2]*256+t[r*2+1];var o=[];return n.forEach(function(t){o.push(e(t))}),a.decompress(o.join(``))},compressToEncodedURIComponent:function(e){return e==null?``:a._compress(e,6,function(e){return n.charAt(e)})},decompressFromEncodedURIComponent:function(e){return e==null?``:e==``?null:(e=e.replace(/ /g,`+`),a._decompress(e.length,32,function(t){return i(n,e.charAt(t))}))},compress:function(t){return a._compress(t,16,function(t){return e(t)})},_compress:function(e,t,n){if(e==null)return``;var r,i,a={},o={},s=``,c=``,l=``,u=2,d=3,f=2,p=[],m=0,h=0,g;for(g=0;g<e.length;g+=1)if(s=e.charAt(g),Object.prototype.hasOwnProperty.call(a,s)||(a[s]=d++,o[s]=!0),c=l+s,Object.prototype.hasOwnProperty.call(a,c))l=c;else{if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++),a[c]=d++,l=String(s)}if(l!==``){if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++)}for(i=2,r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;for(;;)if(m<<=1,h==t-1){p.push(n(m));break}else h++;return p.join(``)},decompress:function(e){return e==null?``:e==``?null:a._decompress(e.length,32768,function(t){return e.charCodeAt(t)})},_decompress:function(t,n,r){var i=[],a=4,o=4,s=3,c=``,l=[],u,d,f,p,m,h,g,_={val:r(0),position:n,index:1};for(u=0;u<3;u+=1)i[u]=u;for(f=0,m=2**2,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;switch(f){case 0:for(f=0,m=2**8,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;g=e(f);break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;g=e(f);break;case 2:return``}for(i[3]=g,d=g,l.push(g);;){if(_.index>t)return``;for(f=0,m=2**s,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;switch(g=f){case 0:for(f=0,m=2**8,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 2:return l.join(``)}if(a==0&&(a=2**s,s++),i[g])c=i[g];else if(g===o)c=d+d.charAt(0);else return null;l.push(c),i[o++]=d+c.charAt(0),a--,d=c,a==0&&(a=2**s,s++)}}};return a})();typeof define==`function`&&define.amd?define(function(){return n}):t!==void 0&&t!=null?t.exports=n:typeof angular<`u`&&angular!=null&&angular.module(`LZString`,[]).factory(`LZString`,function(){return n})}))(),1),uS=e=>lS.default.compressToBase64(JSON.stringify({files:e})).replaceAll(`+`,`-`).replaceAll(`/`,`_`).replace(/={0,2}$/,``),dS=`https://codesandbox.io/api/v1/sandboxes/define`,fS=(e,t,n)=>{let r=uS(cS(e,t,n)),i=document.createElement(`form`);i.method=`POST`,i.action=dS,i.target=`_blank`;let a=document.createElement(`input`);a.type=`hidden`,a.name=`parameters`,a.value=r,i.appendChild(a),document.body.appendChild(i),i.submit(),i.remove()},pS=/^(?:import|export|const|let|var|type|interface|function|async)\b/,mS=/^[A-Za-z_$][\w$]*$/,hS=(e,t,n)=>{let{length:r}=t,i=n+1;for(;i<r&&/\s/.test(t[i]);)i++;if(i>=r)return!0;let a=t.lastIndexOf(`
`,i-1)+1;return i===a&&pS.test(e.slice(i,i+12))},gS=(e,t,n)=>{let{length:r}=t,i=0;for(let a=n;a<r;a++){let n=t[a];if(`{([`.includes(n))i++;else if(`})]`.includes(n))i--;else if(n===`
`&&i===0&&hS(e,t,a))return a}return r},_S=(e,t)=>{let n=[],{length:r}=e,i=0;for(;i<r;){for(;i<r&&/\s/.test(t[i]);)i++;if(i>=r)break;let a=gS(e,t,i);n.push({start:i,end:a,text:e.slice(i,a).trimEnd()}),i=a}return n},vS=(e,t,n,r)=>{let i=0;for(let a=t;a<e.length;a++)if(e[a]===n)i++;else if(e[a]===r&&--i===0)return a;throw Error(`Unbalanced \`${n}\` at index ${t} in stories source.`)},yS=(e,t)=>{let n=[],r=e.slice(t+1,e.lastIndexOf(`}`));for(let e of r.split(`,`)){let t=e.replace(/^\s*type\s+/,``).trim();if(t===``)continue;let r=/^([\w$]+)\s+as\s+([\w$]+)$/.exec(t);r?n.push({imported:r[1],local:r[2]}):n.push({imported:t,local:t})}return n},bS=e=>{let t=/^import\s+type\b/.test(e),n=/from\s*['"]([^'"]+)['"]\s*;?$/.exec(e)?.[1]??/^import\s*['"]([^'"]+)['"]/.exec(e)?.[1];if(!n)throw Error(`Could not read the import specifier of: ${e}`);let r=/\bfrom\s*['"][^'"]+['"]\s*;?$/.exec(e),i=r===null?``:e.slice(0,r.index).replace(/^import\s+(type\s+)?/,``),a=[],o,s,c=i.indexOf(`{`),l=(c===-1?i:i.slice(0,c)).trim(),u=/\*\s*as\s+([\w$]+)/.exec(l);u&&(s=u[1]);let d=l.replace(/\*\s*as\s+[\w$]+/,``).replaceAll(`,`,``).trim();mS.test(d)&&(o=d),c!==-1&&a.push(...yS(i,c));let f=[...o?[o]:[],...s?[s]:[],...a.map(e=>e.local)];return{statement:e,specifier:n,defaultBinding:o,namespaceBinding:s,namedBindings:a,bindings:f,typeOnly:t}},xS=e=>{let t=/Meta<\s*typeof\s+([A-Za-z_$][\w$]*)/.exec(e)?.[1]??/component:\s*([A-Za-z_$][\w$]*)/.exec(e)?.[1];if(!t)throw Error(`Unsupported stories module - could not determine the component from meta.`);return t},SS=(e,t,n)=>{let r=t;for(;r!==0;){let t=e.lastIndexOf(`
`,r-2)+1;if(!e.slice(t,r-1).trim().startsWith(`//`))break;r=t}return r===t?n:`${e.slice(r,t)}${n}`},CS=/^([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:/,wS=/^\.\.\.\s*([A-Za-z_$][\w$]*)\s*(?=[,}]|$)/,TS=(e,t,n,r)=>{let i=t.slice(n,r),a=wS.exec(i);if(a){let e=n+a[0].length;return{name:`...`,spreadFrom:a[1],valueStart:e,valueEnd:e}}let o=CS.exec(i);if(!o)throw Error(`Could not read a property key at index ${n} in stories source.`);let s=e.slice(n,n+o[1].length);return{name:/^['"]/.test(s)?s.slice(1,-1):s,valueStart:n+o[0].length,valueEnd:r}},ES=(e,t,n)=>{let r=t+1;for(;r<n&&/\s/.test(e[r]);)r++;if(r>=n)return!0;let i=e.slice(r,n);return CS.test(i)||wS.test(i)},DS=(e,t,n,r)=>{let i=[],a=1,o=!0,s=n+1;for(;s<=r;){let n=t[s];if(`{([`.includes(n))a++;else if(`})]`.includes(n))a--;else if(a===1&&o&&!/\s/.test(n)){let n=TS(e,t,s,r);i.push(n),o=!1,s=n.valueStart;continue}else a===1&&n===`,`&&ES(t,s,r)&&(i.at(-1).valueEnd=s,o=!0);s++}return i},OS=(e,t,n,r)=>{if(t[n]===`(`){let r=vS(t,n,`(`,`)`),i=e.slice(n+1,r).trim();if(i===``)return{kind:`none`,end:r+1};let a=i.split(`:`)[0].trim();return mS.test(a)?{kind:`args`,text:a,end:r+1}:{kind:`pattern`,text:i,end:r+1}}let i=/^([A-Za-z_$][\w$]*)\s*=>/.exec(e.slice(n,r));return i?{kind:`args`,text:i[1],end:n+i[1].length}:{kind:`none`,end:n}},kS=(e,t,n)=>{let r=n.valueStart;for(;r<n.valueEnd&&/\s/.test(t[r]);)r++;let i=OS(e,t,r,n.valueEnd),a={renderParamKind:i.kind,renderParamText:i.text},o=t.indexOf(`=>`,i.end);if(o===-1||o>=n.valueEnd)throw Error(`Unsupported render value - expected an arrow function.`);for(r=o+2;r<n.valueEnd&&/\s/.test(t[r]);)r++;if(t[r]===`(`){let n=vS(t,r,`(`,`)`);return{renderBody:z(e.slice(r+1,n)),isBlockBody:!1,...a}}if(t[r]===`{`){let n=vS(t,r,`{`,`}`);return{renderBody:z(e.slice(r+1,n)),isBlockBody:!0,...a}}return{renderBody:z(e.slice(r,n.valueEnd)).trim(),isBlockBody:!1,...a}},AS=(e,t,n,r,i)=>{let a=t.indexOf(`{`,t.indexOf(`=`,n.start)),o=vS(t,a,`{`,`}`),s=DS(e,t,a,o),c=s.find(e=>e.name===`render`),l=c?kS(e,t,c):void 0,u;for(let e of s)e.spreadFrom&&(u=i.get(e.spreadFrom)??u);let d=l?void 0:u;return{name:r,text:e.slice(a,o+1),renderBody:l?.renderBody??d?.renderBody,isBlockBody:l?.isBlockBody??d?.isBlockBody??!1,renderParamKind:l?.renderParamKind??d?.renderParamKind??`none`,renderParamText:l?.renderParamText??d?.renderParamText,hasDecorators:s.some(e=>e.name===`decorators`)||(u?.hasDecorators??!1)}},jS=e=>{let t=e.replaceAll(`\r
`,`
`),n=Se(t),r=[],i=[],a=new Map,o;for(let e of _S(t,n)){let{text:s}=e;if(/^import\b/.test(s)){r.push(bS(s));continue}if(/^(?:export\s+default|type|interface)\b/.test(s))continue;if(/^const\s+meta\b/.test(s)){o=xS(s);continue}let c=/^export\s+const\s+([A-Za-z_$][\w$]*)\s*:\s*Story\b/.exec(s);if(c){let r=c[1];a.set(r,AS(t,n,e,r,a));continue}let l=/^(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)/.exec(s)??/^(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/.exec(s);l&&i.push({names:[l[1]],text:SS(t,e.start,s)})}if(!o)throw Error(`Unsupported stories module - could not find the CSF meta declaration.`);return{imports:r,declarations:i,stories:a,componentName:o}},Q=ge(),MS={pre:{my:0}};function NS({code:e,language:t}){return(0,Q.jsx)(ie,{slotProps:MS,children:`\`\`\`${t===`ts`?`tsx`:`jsx`}\n${e}\n\`\`\``})}var PS=e=>e===``?void 0:Number(e);function FS({control:e,value:t,disabled:n,onChange:r}){let{kind:i,name:a,description:o,defaultValue:s,options:c,min:l,max:u,step:f}=e;if(i===`boolean`)return(0,Q.jsx)(ct,{checked:!!t,disabled:n,size:`sm`,color:`primary`,onChange:e=>r(a,e.target.checked),children:a});let p=(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,title:o,m:0,children:a});return i===`select`?(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[p,(0,Q.jsx)(d,{options:c.map(e=>({label:String(e),value:e})),value:t??``,placeholder:s??`unset`,disabled:n,selectProps:{"aria-label":a},onChange:e=>r(a,e)})]}):i===`inline-radio`?(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[p,(0,Q.jsx)(L,{flexDirection:`row`,gap:1,flexWrap:`wrap`,role:`radiogroup`,"aria-label":a,children:c.map(e=>(0,Q.jsx)(ot,{value:e,size:`sm`,disabled:n,isSelected:t===e,onChange:()=>r(a,e),children:String(e)},e))})]}):i===`range`?(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[p,(0,Q.jsx)(`input`,{type:`range`,"aria-label":a,min:l,max:u,step:f,disabled:n,value:typeof t==`number`?t:l??0,onChange:e=>r(a,Number(e.target.value))})]}):(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[p,(0,Q.jsx)(W,{type:i===`number`?`number`:`text`,value:t===void 0?``:String(t),placeholder:s,disabled:n,inputProps:{"aria-label":a,min:l,max:u,step:f},onChange:e=>r(a,i===`number`?PS(e.target.value):e.target.value)})]})}function IS({controls:e,values:t,onChange:n}){return(0,Q.jsx)(O,{p:3,mx:2,mb:2,children:(0,Q.jsx)(L,{flexDirection:`row`,flexWrap:`wrap`,gap:3,alignItems:`flex-end`,children:e.map(e=>(0,Q.jsx)(FS,{control:e,value:t[e.name],onChange:n},e.name))})})}var LS=e=>e===`ts`||e===`js`;function RS({language:e,onLanguageChange:t,copied:n,onCopy:r,onOpenSandbox:i,onReset:a,isExpanded:o,onToggleExpanded:s,hasControls:c,isControlsOpen:l,onToggleControls:d}){let f=n?`Copied`:`Copy the source`;return(0,Q.jsxs)(L,{flexDirection:`row`,flexWrap:`wrap`,justifyContent:`space-between`,alignItems:`center`,gap:2,px:2,py:1,children:[(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:c&&(0,Q.jsx)(u,{variant:`outlined`,color:`primary`,size:`sm`,shape:`pill`,onClick:d,"aria-expanded":l,children:`Controls`})}),(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(u,{variant:`outlined`,color:`default`,size:`sm`,shape:`pill`,onClick:s,"aria-expanded":o,children:o?`Collapse code`:`Expand code`}),(0,Q.jsxs)(K,{value:e,isExclusive:!0,size:`sm`,color:`primary`,"aria-label":`Code language`,onChange:e=>{LS(e)&&t(e)},children:[(0,Q.jsx)(ot,{value:`ts`,title:`Show TypeScript source`,children:`TS`}),(0,Q.jsx)(ot,{value:`js`,title:`Show JavaScript source`,children:`JS`})]}),(0,Q.jsx)(u,{variant:`text`,color:`default`,size:`sm`,onClick:i,"aria-label":`Edit in CodeSandbox`,title:`Edit in CodeSandbox`,children:(0,Q.jsx)(A,{name:`external_link`,size:`1.1rem`})}),(0,Q.jsx)(u,{variant:`text`,color:`default`,size:`sm`,onClick:r,"aria-label":f,title:f,children:(0,Q.jsx)(A,{name:n?`check`:`content_copy`,size:`1.1rem`})}),(0,Q.jsx)(u,{variant:`text`,color:`default`,size:`sm`,onClick:a,"aria-label":`Reset demo`,title:`Reset demo`,children:(0,Q.jsx)(A,{name:`refresh`,size:`1.1rem`})})]})]})}var zS=(0,q.lazy)(()=>ye(()=>import(`../chunks/chunk-CIiz954-.js`).then(e=>({default:e.LiveCode})),__vite__mapDeps([9,1,4,5,10])));function BS({stories:e,source:t,storyName:n,title:r,description:i,scope:a={},versions:o={},reactVersion:s=`latest`,packageName:c=`@soroush.tech/design-system`}){let[l,u]=(0,q.useState)(`ts`),[d,f]=(0,q.useState)(!1),[p,h]=(0,q.useState)(!1),[g,_]=(0,q.useState)({}),[v,y]=(0,q.useState)(null),[b,x]=(0,q.useState)(0),[S,C]=(0,q.useState)(()=>typeof a==`function`?null:a),{copied:w,copy:ee}=m();(0,q.useEffect)(()=>{if(typeof a!=`function`||S!==null)return;let e=!1;return a().then(t=>{e||C(t)}).catch(()=>{}),()=>{e=!0}},[a,S]);let T=e.default,te=e[n];if(!te)throw Error(`Unknown story "${n}" in the module for "${r}".`);let E=(0,q.useMemo)(()=>Tx(te,T),[te,T]),D=(0,q.useMemo)(()=>jS(t),[t]),O=D.stories.get(n),ne=(0,q.useMemo)(()=>eS(T,te),[T,te]),re=ne.length>0&&(O?.renderBody===void 0||O.renderParamKind!==`none`),k=(0,q.useMemo)(()=>({...E.args,...g}),[E,g]),A=(0,q.useMemo)(()=>Xx({parsed:D,storyName:n,args:k,include:$x(T,te),packageName:c}),[D,n,k,T,te,c]),ie=l===`js`?rS(A.full):A.full,ae=d?ie:l===`js`?A.previewParts.map(e=>rS(e).trimEnd()).join(`

`):A.preview,oe=v??ae,j=()=>{y(null),x(e=>e+1)},se=(e,t)=>{_(n=>({...n,[e]:t})),j()},ce=(0,Q.jsx)(RS,{language:l,onLanguageChange:e=>{u(e),j()},copied:w,onCopy:()=>ee(oe),onOpenSandbox:()=>{fS(r,v===null?ie:Ce(v,{importsText:l===`js`?rS(A.importsText).trimEnd():A.importsText,helpersText:l===`js`?rS(A.helpersText).trimEnd():A.helpersText}),{language:l,versions:o,reactVersion:s})},onReset:()=>{_({}),j()},isExpanded:d,onToggleExpanded:()=>{f(!d),j()},hasControls:re,isControlsOpen:p,onToggleControls:()=>h(!p)}),le=re&&p&&(0,Q.jsx)(IS,{controls:ne,values:k,onChange:se}),M=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(L,{p:5,bg:`paper`,borderRadius:`md`,flexDirection:`row`,flexWrap:`wrap`,alignItems:`center`,justifyContent:`center`,gap:3,children:(0,Q.jsx)(E,{...g})}),ce,le,(0,Q.jsx)(F,{px:2,pb:2,children:(0,Q.jsx)(NS,{code:ae,language:l})})]});return(0,Q.jsxs)(F,{as:`section`,mb:5,children:[(0,Q.jsx)(I,{variant:`h4`,as:`h2`,gutterBottom:!0,children:r}),i&&(0,Q.jsx)(I,{variant:`body1`,color:`secondary`,gutterBottom:!0,children:i}),(0,Q.jsx)(F,{borderWidth:`thin`,borderColor:`light`,borderRadius:`md`,children:S===null?M:(0,Q.jsx)(q.Suspense,{fallback:M,children:(0,Q.jsx)(zS,{code:ae,language:l,scope:S,helpersText:A.helpersText,onCodeChange:y,toolbar:(0,Q.jsxs)(Q.Fragment,{children:[ce,le]})},b)})})]})}var VS={control:{type:`select`},options:Ot,description:"Background color - resolves from `theme.background`.",table:{category:`Visual`}},HS={control:{type:`range`,min:0,max:1,step:.05},description:`CSS opacity (0-1).`,table:{category:`Visual`}},US={control:{type:`select`},options:je,description:"Padding - resolves from `theme.space`.",table:{category:`Spacing`,type:{summary:`space`},defaultValue:{summary:`0`}}},WS={control:{type:`select`},options:je,description:"Margin - resolves from `theme.space`.",table:{category:`Spacing`,type:{summary:`space`},defaultValue:{summary:`0`}}},GS={control:{type:`select`},options:je,description:"Gap between items - resolves from `theme.space`.",table:{category:`Spacing`,type:{summary:`GapToken`},defaultValue:{summary:`0`}}},KS={control:`text`,description:`CSS width - any valid value.`,table:{category:`Layout`,type:{summary:`string | number`}}},qS={control:`text`,description:`CSS height - any valid value.`,table:{category:`Layout`,type:{summary:`string | number`}}},JS={control:`text`,description:`CSS min-width.`,table:{category:`Layout`,type:{summary:`string | number`}}},YS={control:`text`,description:`CSS min-height.`,table:{category:`Layout`,type:{summary:`string | number`}}},XS={control:`text`,description:`CSS max-width.`,table:{category:`Layout`,type:{summary:`string | number`}}},ZS={control:`text`,description:`CSS max-height.`,table:{category:`Layout`,type:{summary:`string | number`}}},QS={control:{type:`select`},options:ze,description:`CSS display property.`,table:{category:`Layout`,type:{summary:`string`}}},$S={control:{type:`select`},options:Jt,description:`CSS position property.`,table:{category:`Layout`,type:{summary:`string`}}},eC={control:{type:`select`},options:Pe,description:`CSS cursor - controls the mouse pointer style.`,table:{category:`Visual`,type:{summary:`CSSProperties["cursor"]`}}},tC={control:`text`,description:`CSS aspect-ratio for fixed-ratio surfaces (e.g. "16/9", "1").`,table:{category:`Layout`,type:{summary:`CSSProperties["aspectRatio"]`}}},nC={control:`number`,description:`CSS order for flex/grid item placement. Accepts responsive arrays.`,table:{category:`Layout`,type:{summary:`CSSProperties["order"]`}}},rC={control:`text`,description:'CSS border shorthand (e.g. `"1px solid"`). Width and style are raw CSS - use `borderRadius` for theme tokens.',table:{category:`Visual`,type:{summary:`string`}}},iC={control:{type:`select`},options:We,description:"Border width - resolves from `theme.borderWidths`: none (0) · thin (1px) · base (2px) · thick (4px).",table:{category:`Visual`,type:{summary:`none | thin | base | thick`}}},aC={control:{type:`select`},options:He,description:`CSS border-style.`,table:{category:`Visual`,type:{summary:`string`}}},oC={control:{type:`select`},options:Te,description:"Border color - resolves from `theme.border`.",table:{category:`Visual`}},sC={control:{type:`select`},options:Et,description:"Border radius - resolves from `theme.radii`: sm (4px) · md (8px) · lg (16px).",table:{category:`Visual`,type:{summary:`sm | md | lg`}}},cC={control:{type:`select`},options:qe,description:"Selected-item color - resolves against `theme.palette`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},lC={control:{type:`select`},options:[`text`,`outlined`],description:`Item style.`,table:{category:`Visual`,defaultValue:{summary:`text`}}},uC={control:{type:`select`},options:[`circular`,`rounded`],description:`Item corner shape.`,table:{category:`Visual`,defaultValue:{summary:`circular`}}},dC={control:{type:`select`},options:Le,description:"Item density - resolves against `theme.sizes`.",table:{category:`Layout`,defaultValue:{summary:`md`}}},fC={control:{type:`number`,min:-1},description:"Total number of rows; `-1` = unknown (server-side pagination).",table:{category:`Content`}},pC={control:`boolean`,description:`Shows the first-page button.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},mC={control:`boolean`,description:`Shows the last-page button.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},hC=t({Colors:()=>SC,DarkMode:()=>kC,Default:()=>xC,Elevations:()=>TC,Frosted:()=>OC,Positions:()=>wC,SiteHeader:()=>DC,Sizes:()=>CC,default:()=>bC}),gC=ve(P,{name:`light`,colorScheme:`light`,background:{appBar:`#F9F9F9CC`,paper:`#F3F3F3`,default:`#FFFFFF`,primary:`#F9F9F9`,secondary:`#EEEEEE`},text:{initial:`#1A1C1C`,secondary:`#444748`},border:{default:`#D7D8DA`}}),_C=e=>(0,Q.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`0.6em`,height:`0.6em`,fill:`none`,stroke:`currentColor`,strokeWidth:2.5,strokeLinecap:`round`,"aria-hidden":`true`,xmlns:`http://www.w3.org/2000/svg`,...e,children:[(0,Q.jsx)(`circle`,{cx:12,cy:12,r:4}),(0,Q.jsx)(`path`,{d:`M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41`})]}),vC=e=>(0,Q.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`0.6em`,height:`0.6em`,fill:`none`,stroke:`currentColor`,strokeWidth:2.5,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,xmlns:`http://www.w3.org/2000/svg`,...e,children:(0,Q.jsx)(`path`,{d:`M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z`})}),yC=`/soroush.svg`,bC={title:`Theme/AppBar`,component:C,tags:[`autodocs`],parameters:{layout:`fullscreen`,controls:{include:[`children`,`color`,`size`,`elevation`,`position`,`blur`,`border`,`m`,`p`]}},argTypes:{children:{control:`text`,description:`Content rendered inside the AppBar.`,table:{category:`Content`}},color:{control:{type:`select`},options:Ot,description:`Background color - resolves from theme.background.`,table:{category:`Visual`}},size:{control:{type:`select`},options:et,description:`Padding preset - resolves from theme.sizes. Default: "md".`,table:{category:`Visual`,defaultValue:{summary:`md`}}},elevation:{control:{type:`number`,min:0,max:24},description:`Box-shadow elevation - resolves from theme.shadows[n]. Omit for no shadow.`,table:{category:`Visual`}},position:$S,blur:{control:`boolean`,description:'Applies `backdrop-filter: blur(theme.blur)` + `-webkit-` prefix. Use with `color="backdrop"` for a frosted-glass effect.',table:{category:`Visual`,defaultValue:{summary:`false`}}},border:rC,m:WS,p:US}},xC={args:{color:`paper`,children:`Application Header`}},SC={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,children:[`paper`,`primary`,`secondary`,`modal`].map(e=>(0,Q.jsx)(C,{color:e,mb:1,children:(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,px:2,py:1.5,children:(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`color="`,e,`"`]})})},e))})},CC={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsx)(C,{size:e,color:`paper`,mb:1,children:(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,children:(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`size="`,e,`"`]})})},e))})},wC={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,children:[[`static`,`relative`,`sticky`].map(e=>(0,Q.jsx)(C,{position:e,color:`paper`,mb:1,children:(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,px:2,py:1.5,children:(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`position="`,e,`"`]})})},e)),[`absolute`,`fixed`].map(e=>(0,Q.jsx)(L,{position:`relative`,height:`48px`,mb:1,children:(0,Q.jsx)(C,{position:e,color:`paper`,children:(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,px:2,py:1.5,children:(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`position="`,e,`"`]})})})},e))]})},TC={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,children:[0,4,8,12,16,24].map(e=>(0,Q.jsx)(C,{elevation:e,color:`paper`,mb:1,children:(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,px:2,py:1.5,children:(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`elevation=`,e]})})},e))})},EC=[`Home`,`Experience`,`Stack`,`Architecture`,`Contact`],DC={parameters:{layout:`fullscreen`,controls:{disable:!0}},render:()=>(0,Q.jsxs)(C,{color:`primary`,flexDirection:`row`,alignItems:`center`,justifyContent:`space-between`,px:3,elevation:4,minHeight:64,children:[(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:[(0,Q.jsx)(Qe,{variant:`square`,size:`sm`,src:yC,alt:`Masoud Soroush`,children:(0,Q.jsx)(I,{variant:`caption`,color:`primary`,m:0,children:`M`})}),(0,Q.jsx)(I,{variant:`h6`,color:`secondary`,m:0,fontFamily:`monospace`,children:`Masoud Soroush`})]}),(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:EC.map((e,t)=>(0,Q.jsx)(ae,{underline:`hover`,color:t===0?`secondary`:`initial`,m:0,fontFamily:`monospace`,children:e},e))}),(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(F,{height:`32px`,mx:2,width:`2px`,bg:`grid`}),(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`flex-end`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,style:{fontSize:`10px`,letterSpacing:`0.2em`,textTransform:`uppercase`},children:`Status`}),(0,Q.jsx)(I,{variant:`caption`,color:`primary`,m:0,style:{fontFamily:`monospace`,fontSize:`12px`},children:`OPTIMIZED`})]})]})]})},OC={parameters:{layout:`fullscreen`,controls:{disable:!0}},render:()=>(0,Q.jsxs)(C,{color:`backdrop`,blur:!0,borderBottom:`1px solid rgba(0,0,0,0.1)`,flexDirection:`row`,alignItems:`center`,justifyContent:`space-between`,px:3,elevation:0,minHeight:64,children:[(0,Q.jsx)(I,{variant:`h6`,color:`secondary`,m:0,children:`Frosted Glass Header`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`blur + color="backdrop"`})]})},kC={parameters:{layout:`fullscreen`,controls:{disable:!0}},decorators:[(e,t)=>{let[n,r]=(0,q.useState)(!1);return(0,Q.jsx)(_e,{theme:n?P:gC,children:(0,Q.jsx)(e,{args:{...t.args,isDark:n,onToggle:()=>r(e=>!e)}})})}],render:({isDark:e,onToggle:t})=>(0,Q.jsxs)(C,{color:`secondary`,flexDirection:`row`,alignItems:`center`,justifyContent:`space-between`,px:3,elevation:4,minHeight:64,children:[(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:[(0,Q.jsx)(Qe,{variant:`square`,size:`sm`,src:yC,alt:`Masoud Soroush`,children:(0,Q.jsx)(I,{variant:`caption`,color:`primary`,m:0,children:`M`})}),(0,Q.jsx)(I,{variant:`h6`,color:`secondary`,m:0,fontFamily:`monospace`,children:`Masoud Soroush`})]}),(0,Q.jsx)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:EC.map((e,t)=>(0,Q.jsx)(ae,{underline:`hover`,color:t===0?`secondary`:`initial`,m:0,fontFamily:`monospace`,children:e},e))}),(0,Q.jsx)(ct,{checked:e,color:`default`,onChange:t,icon:(0,Q.jsx)(_C,{"aria-hidden":`true`,width:14,height:14}),checkedIcon:(0,Q.jsx)(vC,{"aria-hidden":`true`,width:14,height:14}),"aria-label":`Toggle dark mode`})]})},AC=t({AllSizes:()=>LC,AllVariants:()=>IC,FallbackImage:()=>PC,FallbackInitials:()=>FC,RingShapes:()=>zC,RingVariants:()=>BC,WithImage:()=>NC,WithRing:()=>RC,default:()=>MC}),jC=`/soroush.svg`,MC={title:`Theme/Avatar`,component:Qe,tags:[`autodocs`],args:{ring:!1},parameters:{layout:`padded`,controls:{include:[`src`,`srcSet`,`fallback`,`alt`,`children`,`variant`,`size`,`ring`,`ringColor`,`ringWidth`,`bg`,`m`]}},argTypes:{src:{control:`text`,description:`Primary image URL.`,table:{category:`Content`}},srcSet:{control:`text`,description:"Responsive image URLs - used as the primary source when `src` is absent.",table:{category:`Content`}},fallback:{control:`text`,description:"Fallback image URL shown when `src` is absent. Children are shown when both are absent.",table:{category:`Content`}},alt:{control:`text`,description:`Alt text for the image, required for accessibility.`,table:{category:`Content`}},children:{control:`text`,description:"Fallback content rendered when no `src` is provided (initials, icon, etc.).",table:{category:`Content`}},variant:{control:{type:`inline-radio`},options:Ke,description:`Shape of the avatar container.`,table:{category:`Layout`,defaultValue:{summary:`circular`}}},size:{control:{type:`inline-radio`},options:Ae,description:`Preset size - resolves against theme.space (small=32px, medium=40px, large=48px).`,table:{category:`Layout`,defaultValue:{summary:`medium`}}},ring:{control:`boolean`,description:`Adds a CSS outline ring around the avatar.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},ringColor:{control:{type:`select`},options:Te,description:`Ring color - resolves against theme.border.`,table:{category:`Visual`}},ringWidth:{control:{type:`select`},options:We,description:`Ring width - resolves against theme.borderWidths.`,table:{category:`Visual`}},bg:VS,m:WS}},NC={args:{src:jC,alt:`Soroush logo`,variant:`circular`,size:`md`}},PC={args:{fallback:jC,alt:`Fallback image`,variant:`circular`,size:`md`}},FC={args:{children:`MS`,variant:`circular`,size:`md`,bg:`secondary`}},IC={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:3,alignItems:`center`,children:[`circular`,`rounded`,`square`].map(e=>(0,Q.jsxs)(L,{alignItems:`center`,gap:1,children:[(0,Q.jsx)(Qe,{variant:e,size:`lg`,bg:`secondary`,children:`MS`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},LC={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:3,alignItems:`flex-end`,children:[`sm`,`md`,`lg`,`xl`].map(e=>(0,Q.jsxs)(L,{alignItems:`center`,gap:1,children:[(0,Q.jsx)(Qe,{size:e,bg:`secondary`,children:`MS`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},RC={args:{src:jC,alt:`Soroush logo`,variant:`circular`,size:`lg`,ring:!0}},zC={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[`circular`,`rounded`,`square`].map(e=>(0,Q.jsxs)(L,{alignItems:`center`,gap:1,children:[(0,Q.jsx)(Qe,{ring:!0,variant:e,size:`lg`,bg:`secondary`,children:`MS`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},BC={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[`light`,`primary`,`dark`].map(e=>(0,Q.jsxs)(L,{alignItems:`center`,gap:1,children:[(0,Q.jsx)(Qe,{ring:!0,ringColor:e,size:`lg`,bg:`secondary`,children:`MS`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},VC=t({Default:()=>UC,Tinted:()=>WC,default:()=>HC}),HC={title:`Theme/Backdrop`,component:pe,tags:[`autodocs`],parameters:{layout:`fullscreen`,controls:{include:[`bg`,`opacity`]}},argTypes:{bg:VS,opacity:HS}},UC={args:{}},WC={args:{bg:`modal`}},GC=t({AsLink:()=>ew,Colors:()=>YC,Default:()=>qC,Disabled:()=>$C,FullWidth:()=>tw,Loading:()=>QC,RainbowBorder:()=>ow,Shapes:()=>nw,Sizes:()=>XC,Variants:()=>JC,WithIcons:()=>ZC,default:()=>KC}),KC={title:`Theme/Button`,component:u,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`variant`,`color`,`size`,`shape`,`borderRadius`,`fullWidth`,`disabled`,`loading`,`loadingPosition`,`href`,`m`,`p`]}},args:{children:`Action`,onClick:El()},argTypes:{children:{control:`text`,description:`Button label text.`,table:{category:`Content`}},variant:{control:{type:`inline-radio`},options:Xe,description:`Visual style - filled, stroked, or ghost.`,table:{category:`Visual`,defaultValue:{summary:`contained`}}},color:{control:{type:`select`},options:qe,description:"Color palette - resolves from `theme.palette[color]`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},size:{control:{type:`inline-radio`},options:Ve,description:`Controls padding and font size.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},fullWidth:{control:`boolean`,description:`Stretch button to full container width.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},disabled:{control:`boolean`,description:`Disables the button.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},loading:{control:`boolean`,description:`Shows loading indicator and disables the button.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},shape:{control:{type:`inline-radio`},options:Ie,description:"Corner shape - sets the default `borderRadius`. `borderRadius` prop always overrides.",table:{category:`Visual`,defaultValue:{summary:`rounded`}}},borderRadius:{control:{type:`inline-radio`},options:Et,description:'Border radius token from `theme.radii`. Overrides `shape`. Only meaningful when `shape="rounded"`.',table:{category:`Visual`}},loadingPosition:{control:{type:`inline-radio`},options:U,description:`Where the loading indicator appears relative to the label.`,table:{category:`Visual`,defaultValue:{summary:`center`}}},href:{control:`text`,description:"URL to link to. If defined, the root renders as an `a` element.",table:{category:`Content`}},m:WS,p:US}},qC={args:{variant:`contained`,color:`primary`,size:`md`,children:`Action`}},JC={render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,flexWrap:`wrap`,children:[(0,Q.jsx)(u,{variant:`contained`,children:`Contained`}),(0,Q.jsx)(u,{variant:`outlined`,children:`Outlined`}),(0,Q.jsx)(u,{variant:`text`,children:`Text`})]})},YC={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`primary`,`secondary`,`success`,`error`,`info`,`warning`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,flexWrap:`wrap`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(u,{variant:`contained`,color:e,children:`Contained`}),(0,Q.jsx)(u,{variant:`outlined`,color:e,children:`Outlined`}),(0,Q.jsx)(u,{variant:`text`,color:e,children:`Text`})]},e))})},XC={render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,flexWrap:`wrap`,children:[(0,Q.jsx)(u,{size:`sm`,children:`Small`}),(0,Q.jsx)(u,{size:`md`,children:`Medium`}),(0,Q.jsx)(u,{size:`lg`,children:`Large`})]})},ZC={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,flexWrap:`wrap`,children:[(0,Q.jsx)(u,{startIcon:(0,Q.jsx)(`span`,{children:`▶`}),children:`Start Icon`}),(0,Q.jsx)(u,{endIcon:(0,Q.jsx)(`span`,{children:`◀`}),children:`End Icon`}),(0,Q.jsx)(u,{startIcon:(0,Q.jsx)(`span`,{children:`▶`}),endIcon:(0,Q.jsx)(`span`,{children:`◀`}),children:`Both Icons`})]}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,flexWrap:`wrap`,children:[(0,Q.jsx)(u,{variant:`outlined`,startIcon:(0,Q.jsx)(`span`,{children:`+`}),children:`New Item`}),(0,Q.jsx)(u,{variant:`text`,endIcon:(0,Q.jsx)(`span`,{children:`→`}),children:`Learn More`})]})]})},QC={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`start`,`center`,`end`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`4rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(u,{loading:!0,loadingPosition:e,startIcon:(0,Q.jsx)(`span`,{children:`▶`}),children:`Deploy`}),(0,Q.jsx)(u,{loading:!0,loadingPosition:e,variant:`outlined`,children:`Deploy`}),(0,Q.jsx)(u,{loading:!0,loadingPosition:e,variant:`text`,children:`Deploy`})]},e))})},$C={render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,flexWrap:`wrap`,children:[(0,Q.jsx)(u,{disabled:!0,variant:`contained`,children:`Contained`}),(0,Q.jsx)(u,{disabled:!0,variant:`outlined`,children:`Outlined`}),(0,Q.jsx)(u,{disabled:!0,variant:`text`,children:`Text`})]})},ew={name:`As Link (href)`,render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,flexWrap:`wrap`,alignItems:`center`,children:[(0,Q.jsx)(u,{href:`#contained`,children:`Contained`}),(0,Q.jsx)(u,{href:`#outlined`,variant:`outlined`,endIcon:(0,Q.jsx)(`span`,{children:`→`}),children:`Outlined`}),(0,Q.jsx)(u,{href:`#text`,variant:`text`,children:`Text`})]})},tw={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,maxWidth:`480px`,children:[(0,Q.jsx)(u,{fullWidth:!0,children:`Full Width Contained`}),(0,Q.jsx)(u,{fullWidth:!0,variant:`outlined`,children:`Full Width Outlined`})]})},nw={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[[`square`,`rounded`,`pill`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,flexWrap:`wrap`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(u,{shape:e,children:`Contained`}),(0,Q.jsx)(u,{shape:e,variant:`outlined`,children:`Outlined`}),(0,Q.jsx)(u,{shape:e,variant:`text`,children:`Text`})]},e)),(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`rounded - borderRadius override`}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,flexWrap:`wrap`,children:[(0,Q.jsx)(u,{shape:`rounded`,borderRadius:`sm`,children:`sm (4px)`}),(0,Q.jsx)(u,{shape:`rounded`,borderRadius:`md`,children:`md (8px)`}),(0,Q.jsx)(u,{shape:`rounded`,borderRadius:`lg`,children:`lg (16px)`})]})]})]})},rw=pt({to:{backgroundPosition:`200% center`}}),iw=[`hsl(0 100% 50%)`,`hsl(270 100% 50%)`,`hsl(210 100% 50%)`,`hsl(195 100% 50%)`,`hsl(90 100% 50%)`,`hsl(0 100% 50%)`];function aw({speed:e=`2s`,innerBg:t=P.background.paper,colors:n=iw}={}){return Qt({"&&":{textTransform:`initial`,border:`1px solid transparent`,borderBottomWidth:`2.5px`,background:[`linear-gradient(${t}, ${t}) padding-box`,`linear-gradient(90deg, ${n.join(`, `)}) border-box`].join(`, `),backgroundSize:`200% auto`,animation:`${rw} ${e} linear infinite`,"&:hover:not(:disabled), &:active:not(:disabled)":{backgroundColor:`transparent`}}})}var ow={name:`Custom - Rainbow Border`,render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:4,children:[(0,Q.jsxs)(L,{flexDirection:`row`,gap:3,alignItems:`center`,children:[(0,Q.jsx)(u,{variant:`text`,shape:`pill`,letterSpacing:`normal`,fontWeight:`medium`,className:aw(),children:`Get started`}),(0,Q.jsx)(u,{variant:`text`,shape:`pill`,letterSpacing:`normal`,fontWeight:`medium`,className:aw({speed:`4s`}),children:`Slow (4s)`}),(0,Q.jsx)(u,{variant:`text`,shape:`pill`,letterSpacing:`normal`,fontWeight:`medium`,disabled:!0,className:aw(),children:`Disabled`})]}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:3,alignItems:`center`,children:[(0,Q.jsx)(u,{variant:`text`,shape:`pill`,letterSpacing:`normal`,fontWeight:`medium`,className:aw({colors:[P.palette.primary.main,P.palette.secondary.main,P.palette.primary.main]}),children:`Theme colors`}),(0,Q.jsx)(u,{variant:`text`,shape:`pill`,letterSpacing:`normal`,fontWeight:`medium`,className:aw({colors:[P.palette.error.main,P.palette.warning.main,P.palette.error.main],speed:`1s`}),children:`Fast warm`})]})]})},sw=t({Default:()=>uw,FullWidth:()=>hw,Radii:()=>pw,SizesAndColors:()=>fw,Variants:()=>dw,Vertical:()=>mw,default:()=>cw}),cw={title:`Theme/ButtonGroup`,component:Be,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`variant`,`color`,`size`,`orientation`,`borderRadius`,`disabled`,`fullWidth`]}},args:{"aria-label":`Basic button group`},argTypes:{variant:{control:{type:`select`},options:Xe,description:`Visual style for all child buttons.`,table:{category:`Visual`,defaultValue:{summary:`outlined`}}},color:{control:{type:`select`},options:qe,description:"Color palette for all child buttons - resolves against `theme.palette`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},size:{control:{type:`select`},options:Ve,description:"Density for all child buttons - resolves against `theme.sizes`.",table:{category:`Layout`,defaultValue:{summary:`md`}}},orientation:{control:{type:`select`},options:[`horizontal`,`vertical`],description:`Layout flow direction.`,table:{category:`Layout`,defaultValue:{summary:`horizontal`}}},borderRadius:{control:{type:`select`},options:Et,description:`Group corner radius - rounds the group's outer corners only.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},disabled:{control:`boolean`,description:`Disables all child buttons.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},fullWidth:{control:`boolean`,description:`Group fills its container; children share the width.`,table:{category:`Layout`,defaultValue:{summary:`false`}}}}},lw=[(0,Q.jsx)(u,{children:`One`},`one`),(0,Q.jsx)(u,{children:`Two`},`two`),(0,Q.jsx)(u,{children:`Three`},`three`)],uw={render:e=>(0,Q.jsx)(Be,{...e,children:lw})},dw={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,alignItems:`center`,children:[`contained`,`outlined`,`text`].map(e=>(0,Q.jsx)(Be,{variant:e,"aria-label":`${e} button group`,children:lw},e))})},fw={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,alignItems:`center`,children:[(0,Q.jsx)(Be,{size:`sm`,"aria-label":`Small button group`,children:lw}),(0,Q.jsx)(Be,{color:`secondary`,"aria-label":`Medium-sized button group`,children:lw}),(0,Q.jsx)(Be,{size:`lg`,"aria-label":`Large button group`,children:lw})]})},pw={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,alignItems:`center`,children:Et.map(e=>(0,Q.jsx)(Be,{borderRadius:e,"aria-label":`${e} radius button group`,children:lw},e))})},mw={render:()=>(0,Q.jsx)(Be,{orientation:`vertical`,"aria-label":`Vertical button group`,children:lw})},hw={render:()=>(0,Q.jsx)(Be,{fullWidth:!0,"aria-label":`Full-width button group`,children:lw})},gw=t({BracketBox:()=>bw,Default:()=>vw,Interactive:()=>Sw,Paper:()=>yw,SubtitleOnly:()=>Tw,TitleOnly:()=>ww,Variants:()=>Cw,WithChildren:()=>Ew,WithIcon:()=>xw,default:()=>_w}),_w={title:`Theme/Card`,component:nn,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`variant`,`icon`,`title`,`caption`,`elevation`,`bg`,`borderRadius`,`borderColor`,`borderWidth`,`borderStyle`,`p`,`m`]}},argTypes:{children:{control:`text`,description:`Additional content rendered below the caption.`,table:{category:`Content`}},icon:{control:{type:`select`},options:[void 0,`account_tree`,`psychology`,`smart_toy`,`code`],description:`Icon registry name rendered as the topmost element of the card.`,table:{category:`Content`}},title:{control:`text`,description:'Rendered as `caption` Typography with `color="primary"` and `fontFamily="mono"`.',table:{category:`Content`}},caption:{control:`text`,description:'Rendered as `caption` Typography with `color="secondary"`.',table:{category:`Content`}},variant:{control:{type:`inline-radio`},options:en,description:"`paper` uses a plain Paper surface; `bracketBox` adds corner bracket accents; `interactive` fills with the secondary background on hover.",table:{category:`Visual`,defaultValue:{summary:`paper`}}},elevation:{control:{type:`range`,min:0,max:24,step:1},description:`Shadow depth - 0 (flat) to 24 (highest). Resolves to theme.shadows[n].`,table:{category:`Visual`,defaultValue:{summary:`1`}}},bg:VS,borderRadius:sC,borderColor:oC,borderWidth:iC,borderStyle:aC,p:US,m:WS}},vw={args:{title:`Component`,caption:`A flexible card surface with paper and bracketBox variants.`,p:3}},yw={render:()=>(0,Q.jsx)(nn,{variant:`paper`,p:3,title:`Paper`,caption:`Default surface with elevation shadow.`})},bw={render:()=>(0,Q.jsx)(nn,{variant:`bracketBox`,p:3,elevation:0,title:`BracketBox`,caption:`Flat surface with corner bracket accents.`})},xw={render:()=>(0,Q.jsx)(nn,{variant:`interactive`,icon:`account_tree`,iconProps:{color:`primary`,size:`2.25rem`},p:4,bg:`paper`,title:`System Scalability`,caption:`Pass an icon name and the card renders it.`})},Sw={render:()=>(0,Q.jsx)(nn,{variant:`interactive`,p:3,bg:`paper`,title:`Interactive`,caption:`Hover to fill with the secondary background.`})},Cw={render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:3,flexWrap:`wrap`,children:[(0,Q.jsx)(nn,{variant:`paper`,p:3,title:`paper`,caption:`Default card variant.`}),(0,Q.jsx)(nn,{variant:`bracketBox`,p:3,elevation:0,title:`bracketBox`,caption:`Corner bracket variant.`}),(0,Q.jsx)(nn,{variant:`interactive`,p:3,bg:`paper`,title:`interactive`,caption:`Hover-fill variant.`})]})},ww={render:()=>(0,Q.jsx)(nn,{p:3,title:`Title Only`})},Tw={render:()=>(0,Q.jsx)(nn,{p:3,caption:`Subtitle only - no title above it.`})},Ew={render:()=>(0,Q.jsx)(nn,{variant:`bracketBox`,p:3,elevation:0,title:`Stack`,caption:`Tech in use.`,children:(0,Q.jsx)(F,{mt:2,children:[`React`,`TypeScript`,`Vite`].map(e=>(0,Q.jsx)(F,{p:.5,children:e},e))})})},Dw=(e,t)=>{let[n,r]=(0,q.useState)(!1);return(0,Q.jsx)(e,{args:{...t.args,checked:n,onChange:e=>r(e.target.checked)}})},Ow=[`default`,`primary`,`secondary`,`success`,`error`,`info`,`warning`];function kw({controls:e}){return(0,Q.jsx)(L,{flexDirection:`column`,gap:2,children:Ow.map(t=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:t}),e(t)]},t))})}var Aw=t({Checked:()=>Nw,Colors:()=>Lw,Controlled:()=>Hw,CustomIcons:()=>zw,Default:()=>Mw,Indeterminate:()=>Pw,SelectAll:()=>Vw,Sizes:()=>Rw,States:()=>Iw,WithLabel:()=>Fw,default:()=>jw}),jw={title:`Theme/Checkbox`,component:S,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`checked`,`disabled`,`indeterminate`,`color`,`size`,`fullWidth`,`children`,`m`]}},argTypes:{checked:{control:`boolean`,description:`Controlled checked state.`,table:{category:`State`}},disabled:{control:`boolean`,description:`Disables the checkbox.`,table:{category:`State`,defaultValue:{summary:`false`}}},indeterminate:{control:`boolean`,description:"Shows the indeterminate (dash) state. Takes priority over `checked`.",table:{category:`State`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:Ee,description:'Stroke/fill color. `"default"` resolves to `theme.text.secondary`; others to `theme.palette[color].main`.',table:{category:`Visual`,defaultValue:{summary:`default`}}},size:{control:{type:`inline-radio`},options:rt,description:`Icon size.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},fullWidth:{control:`boolean`,description:"Stretches the root to `width: 100%`.",table:{category:`Visual`,defaultValue:{summary:`false`}}},children:{control:`text`,description:`Label text rendered next to the checkbox.`,table:{category:`Content`}},m:WS}},Mw={args:{color:`default`,size:`md`,"aria-label":`Checkbox`}},Nw={args:{checked:!0,color:`primary`,"aria-label":`Checkbox`},render:e=>(0,Q.jsx)(S,{...e,onChange:()=>{}})},Pw={args:{indeterminate:!0,color:`primary`,"aria-label":`Checkbox`}},Fw={args:{children:`Accept terms and conditions`,color:`primary`}},Iw={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:2,children:[{label:`Unchecked`,props:{}},{label:`Checked`,props:{checked:!0,onChange:()=>{}}},{label:`Indeterminate`,props:{indeterminate:!0}},{label:`Disabled unchecked`,props:{disabled:!0}},{label:`Disabled checked`,props:{disabled:!0,checked:!0,onChange:()=>{}}},{label:`Disabled indeterminate`,props:{disabled:!0,indeterminate:!0}}].map(({label:e,props:t})=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`10rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(S,{color:`primary`,...t,children:e})]},e))})},Lw={render:()=>(0,Q.jsx)(kw,{controls:e=>(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(S,{color:e,"aria-label":`${e} unchecked`}),(0,Q.jsx)(S,{color:e,checked:!0,onChange:()=>{},"aria-label":`${e} checked`}),(0,Q.jsx)(S,{color:e,indeterminate:!0,"aria-label":`${e} indeterminate`})]})})},Rw={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(S,{size:e,color:`primary`,checked:!0,onChange:()=>{},"aria-label":e}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},zw={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsx)(S,{color:`primary`,icon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`☆`}),checkedIcon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`★`}),children:`Custom star icons (unchecked)`}),(0,Q.jsx)(S,{color:`primary`,checked:!0,onChange:()=>{},icon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`☆`}),checkedIcon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`★`}),children:`Custom star icons (checked)`})]})},Bw=[`Apple`,`Banana`,`Cherry`,`Mango`,`Strawberry`],Vw={decorators:[(e,t)=>{let[n,r]=(0,q.useState)(Object.fromEntries(Bw.map((e,t)=>[e,t<2])));return(0,Q.jsx)(e,{args:{...t.args,checked:n,setChecked:r}})}],render:({checked:e,setChecked:t})=>{let n=Object.values(e).filter(Boolean).length,r=n===Bw.length,i=n>0&&!r;return(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(S,{color:`primary`,checked:r,indeterminate:i,onChange:()=>{let e=!r;t(Object.fromEntries(Bw.map(t=>[t,e])))},children:(0,Q.jsx)(I,{variant:`body2`,m:0,children:`Select all`})}),(0,Q.jsx)(L,{flexDirection:`column`,gap:1,ml:4,children:Bw.map(n=>(0,Q.jsx)(S,{color:`primary`,checked:e[n],onChange:e=>t(t=>({...t,[n]:e.target.checked})),children:(0,Q.jsx)(I,{variant:`body2`,m:0,children:n})},n))}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,mt:1,mb:0,children:[n,` of `,Bw.length,` selected`]})]})}},Hw={decorators:[Dw],render:({checked:e,onChange:t})=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(S,{color:`primary`,checked:e,onChange:t,children:[e?`Checked`:`Unchecked`,` - click to toggle`]}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`State: `,String(e)]})]})},Uw=t({Colors:()=>Jw,CustomRange:()=>$w,Default:()=>Gw,Determinate:()=>Kw,DisableShrink:()=>tT,Easing:()=>Qw,ShowTrack:()=>Zw,Sizes:()=>Yw,SpinningDeterminate:()=>qw,SpinningWithTrack:()=>eT,Thickness:()=>Xw,default:()=>Ww}),Ww={title:`Theme/CircularProgress`,component:me,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`variant`,`color`,`size`,`thickness`,`value`,`min`,`max`,`disableShrink`,`spinning`,`easing`,`showTrack`,`m`]}},argTypes:{variant:{control:{type:`inline-radio`},options:at,description:`Visual variant - looping animation or value-driven arc.`,table:{category:`Visual`,defaultValue:{summary:`indeterminate`}}},color:{control:{type:`select`},options:Fe,description:'Stroke color - resolves to `theme.palette[color].main`; `"inherit"` uses `currentColor`.',table:{category:`Visual`,defaultValue:{summary:`primary`}}},size:{control:{type:`number`},description:`Width and height in px (number) or raw CSS unit (string).`,table:{category:`Visual`,defaultValue:{summary:`40`}}},thickness:{control:{type:`number`,min:1,max:10,step:.2},description:`SVG stroke width in viewBox user units.`,table:{category:`Visual`,defaultValue:{summary:`3.6`}}},value:{control:{type:`number`},description:'Progress value for the `"determinate"` variant (clamped between min and max).',table:{category:`Progress`}},min:{control:{type:`number`},description:'Minimum value for the `"determinate"` variant.',table:{category:`Progress`,defaultValue:{summary:`0`}}},max:{control:{type:`number`},description:'Maximum value for the `"determinate"` variant.',table:{category:`Progress`,defaultValue:{summary:`100`}}},disableShrink:{control:`boolean`,description:'Disables the stroke shrink/expand keyframe animation (`"indeterminate"` only).',table:{category:`Visual`,defaultValue:{summary:`false`}}},spinning:{control:`boolean`,description:'Applies rotation animation to `"determinate"` - arc length reflects `value` while the spinner still rotates.',table:{category:`Visual`,defaultValue:{summary:`false`}}},easing:{control:{type:`inline-radio`},options:nt,description:`Timing function for the rotation animation.`,table:{category:`Visual`,defaultValue:{summary:`linear`}}},showTrack:{control:`boolean`,description:`Renders a faint full-ring track behind the progress arc.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},m:WS}},Gw={args:{variant:`indeterminate`,color:`primary`,size:40}},Kw={args:{variant:`determinate`,value:70,color:`primary`,size:40}},qw={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[25,50,75].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{variant:`determinate`,value:e,spinning:!0,size:48}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[e,`%`]})]},e))})},Jw={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`primary`,`secondary`,`success`,`error`,`info`,`warning`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(me,{showTrack:!0,color:e,size:32}),(0,Q.jsx)(me,{showTrack:!0,variant:`determinate`,value:65,color:e,size:32})]},e))})},Yw={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:3,alignItems:`end`,flexWrap:`wrap`,children:[16,24,40,64,80].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{size:e}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[e,`px`]})]},e))})},Xw={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:3,alignItems:`center`,flexWrap:`wrap`,children:[1,2,3.6,6,10].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{thickness:e,size:48}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},Zw={render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:4,alignItems:`center`,flexWrap:`wrap`,children:[(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{showTrack:!0,size:48}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`indeterminate`})]}),(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{variant:`determinate`,value:65,showTrack:!0,size:48}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`determinate 65%`})]})]})},Qw={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,flexWrap:`wrap`,children:[`linear`,`ease`,`ease-in`,`ease-out`,`ease-in-out`].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{easing:e,size:48}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},$w={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[{value:3,min:0,max:10,label:`3 of 10`},{value:120,min:0,max:200,label:`120 of 200`},{value:7,min:5,max:15,label:`7 of 5-15`}].map(({value:e,min:t,max:n,label:r})=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(me,{variant:`determinate`,value:e,min:t,max:n,showTrack:!0,size:48}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:r})]},r))})},eT={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,flexWrap:`wrap`,children:[25,50,75,90].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{variant:`determinate`,value:e,spinning:!0,showTrack:!0,size:56,thickness:5}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[e,`%`]})]},e))})},tT={render:()=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`default`})]}),(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(me,{disableShrink:!0}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`disableShrink`})]})]})},nT=t({Default:()=>aT,default:()=>rT}),rT={title:`Theme/Drawer`,component:se,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`anchor`,`elevation`,`hasBackdrop`,`transitionDuration`]}},argTypes:{anchor:{control:{type:`inline-radio`},options:Yt,description:`Edge the drawer slides in from.`,table:{category:`Layout`,defaultValue:{summary:`left`}}},elevation:{control:{type:`range`,min:0,max:24,step:1},description:`Shadow depth of the panel (0-24), forwarded to Paper.`,table:{category:`Visual`,defaultValue:{summary:`16`}}},hasBackdrop:{control:`boolean`,description:`Render the dimmed backdrop behind the panel.`,table:{category:`Visual`,defaultValue:{summary:`true`}}},transitionDuration:{control:{type:`number`},description:`Slide duration in milliseconds.`,table:{category:`Visual`,defaultValue:{summary:`225`}}}}},iT=e=>{let[t,n]=(0,q.useState)(!1),r=e.anchor===`top`||e.anchor===`bottom`;return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(u,{onClick:()=>n(!0),children:`Open drawer`}),(0,Q.jsx)(se,{...e,isOpen:t,onClose:()=>n(!1),children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,p:4,width:r?`100%`:`260px`,children:[(0,Q.jsx)(I,{variant:`h6`,m:0,children:`Drawer`}),(0,Q.jsxs)(I,{variant:`body2`,color:`secondary`,m:0,children:[`Slides in from the "`,e.anchor,`" edge. Press Escape or click the backdrop to close.`]}),(0,Q.jsx)(u,{onClick:()=>n(!1),children:`Close`})]})})]})},aT={args:{anchor:`left`,elevation:16,hasBackdrop:!0,transitionDuration:225},render:e=>(0,Q.jsx)(iT,{...e})},oT=t({Column:()=>cT,JustifyCenter:()=>uT,Row:()=>lT,SpaceBetween:()=>dT,Wrap:()=>fT,default:()=>sT}),sT={title:`Theme/Flex`,component:L,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Extends [`View`](../View). Renders as a `<div>` with `display: flex` and `flex-direction: column` by default. All `View` props are inherited."}},controls:{include:[`flexDirection`,`justifyContent`,`alignItems`,`flexWrap`,`gap`,`p`,`m`,`width`,`height`,`minWidth`,`minHeight`,`maxWidth`,`maxHeight`,`border`,`borderWidth`,`borderStyle`,`borderColor`,`borderRadius`,`opacity`,`bg`,`position`]}},argTypes:{flexDirection:{control:{type:`select`},options:Re,description:`CSS flex-direction.`,table:{category:`Layout`,type:{summary:`string`},defaultValue:{summary:`column`}}},justifyContent:{control:{type:`select`},options:lt,description:`CSS justify-content.`,table:{category:`Layout`,type:{summary:`string`}}},alignItems:{control:{type:`select`},options:Bt,description:`CSS align-items.`,table:{category:`Layout`,type:{summary:`string`}}},flexWrap:{control:{type:`select`},options:st,description:`CSS flex-wrap.`,table:{category:`Layout`,type:{summary:`string`},defaultValue:{summary:`nowrap`}}},gap:GS,minWidth:JS,minHeight:YS,maxWidth:XS,maxHeight:ZS},args:{flexDirection:`column`,gap:2,p:2,width:`360px`,height:`280px`,bg:`secondary`,borderRadius:`sm`,children:(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(F,{p:2,bg:`primary`,borderRadius:`sm`,children:`A`}),(0,Q.jsx)(F,{p:2,bg:`primary`,borderRadius:`sm`,children:`B`}),(0,Q.jsx)(F,{p:2,bg:`primary`,borderRadius:`sm`,children:`C`})]})}},cT={args:{flexDirection:`column`}},lT={args:{flexDirection:`row`}},uT={args:{flexDirection:`row`,justifyContent:`center`,alignItems:`center`,height:`100px`,bg:`secondary`,borderRadius:`sm`}},dT={args:{flexDirection:`row`,justifyContent:`space-between`,alignItems:`center`,p:2,bg:`secondary`,borderRadius:`sm`}},fT={args:{flexDirection:`row`,flexWrap:`wrap`,height:`auto`},render:e=>(0,Q.jsx)(L,{...e,children:Array.from({length:9},(e,t)=>(0,Q.jsx)(F,{p:2,bg:`primary`,borderRadius:`sm`,width:`100px`,children:t+1},t))})},pT=t({Default:()=>hT,default:()=>mT}),mT={title:`Theme/FocusTrap`,component:x,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`isEnabled`,`shouldAutoFocus`,`shouldTrapFocus`,`shouldEnforceFocus`,`shouldRestoreFocus`]}},argTypes:{isEnabled:{control:`boolean`,description:`When false, focus is neither moved nor trapped.`,table:{category:`Behavior`,defaultValue:{summary:`true`}}},shouldAutoFocus:{control:`boolean`,description:`Move focus into the trap when it activates.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldTrapFocus:{control:`boolean`,description:`Keep Tab / Shift+Tab cycling within the trap.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldEnforceFocus:{control:`boolean`,description:`Pull focus back inside whenever it escapes the trap.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldRestoreFocus:{control:`boolean`,description:`Restore focus to the previously focused element when the trap deactivates.`,table:{category:`Focus`,defaultValue:{summary:`true`}}}}},hT={args:{isEnabled:!0,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0},render:e=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,alignItems:`flex-start`,children:[(0,Q.jsx)(W,{inputProps:{placeholder:`Outside the trap`}}),(0,Q.jsx)(x,{...e,children:(0,Q.jsx)(O,{p:4,width:`320px`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Focus trap`}),(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Tab and Shift+Tab cycle through these fields without leaving the panel.`}),(0,Q.jsx)(W,{fullWidth:!0,inputProps:{placeholder:`First name`}}),(0,Q.jsx)(W,{fullWidth:!0,inputProps:{placeholder:`Last name`}}),(0,Q.jsx)(W,{fullWidth:!0,inputProps:{type:`email`,placeholder:`Email`}}),(0,Q.jsx)(u,{children:`Submit`})]})})})]})},gT=t({Default:()=>vT,default:()=>_T}),_T={title:`Theme/Form`,component:Mt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`size`,`color`,`textColor`,`disabled`,`fullWidth`]}},argTypes:{size:{control:{type:`select`},options:Ft,description:`Default control size for every field.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},color:{control:{type:`select`},options:Wt,description:`Default accent color for every field.`,table:{category:`Visual`}},textColor:{control:{type:`select`},options:G,description:"Default text color for every field's label/helper/input - resolves against `theme.text`.",table:{category:`Visual`}},disabled:{control:`boolean`,description:`Disables every field.`,table:{category:`State`,defaultValue:{summary:`false`}}},fullWidth:{control:`boolean`,description:`Stretches every field to fill its container.`,table:{category:`Layout`,defaultValue:{summary:`false`}}}}},vT={args:{size:`md`,color:`primary`,fullWidth:!0},render:e=>(0,Q.jsx)(Mt,{...e,onSubmit:e=>e.preventDefault(),children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:4,maxWidth:`420px`,children:[(0,Q.jsx)(fe,{children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,alignItems:`flex-start`,children:[(0,Q.jsx)(qt,{children:`Name`}),(0,Q.jsx)(W,{variant:`outlined`,placeholder:`John Smith`})]})}),(0,Q.jsx)(fe,{children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,alignItems:`flex-start`,children:[(0,Q.jsx)(qt,{children:`Email`}),(0,Q.jsx)(W,{variant:`outlined`,placeholder:`me@example.com`}),(0,Q.jsx)(xt,{children:`We'll never share it.`})]})})]})})},yT=t({Default:()=>xT,ErrorState:()=>ST,default:()=>bT}),bT={title:`Theme/FormControl`,component:fe,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`error`,`disabled`,`required`,`size`,`fullWidth`,`color`,`textColor`,`p`,`m`]}},argTypes:{error:{control:`boolean`,description:`Marks the field invalid - trickles to the control and helper text.`,table:{category:`State`,defaultValue:{summary:`false`}}},disabled:{control:`boolean`,description:`Disables the field - trickles to the control.`,table:{category:`State`,defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`Marks the field required - trickles to the label indicator and control.`,table:{category:`State`,defaultValue:{summary:`false`}}},size:{control:{type:`select`},options:Ft,description:`Control size - trickles to the control.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},fullWidth:{control:`boolean`,description:`Stretches the field and control to fill the container.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:Wt,description:`Accent color - trickles to the control.`,table:{category:`Visual`}},textColor:{control:{type:`select`},options:G,description:"Text color for the label/helper/input - resolves against `theme.text`.",table:{category:`Visual`}},p:US,m:WS}},xT={args:{required:!0,fullWidth:!0},render:e=>(0,Q.jsx)(fe,{...e,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,alignItems:`flex-start`,children:[(0,Q.jsx)(qt,{children:`Email`}),(0,Q.jsx)(W,{variant:`outlined`,placeholder:`me@example.com`}),(0,Q.jsx)(xt,{children:`We'll never share it.`})]})})},ST={args:{error:!0,required:!0,fullWidth:!0},render:e=>(0,Q.jsx)(fe,{...e,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,alignItems:`flex-start`,children:[(0,Q.jsx)(qt,{children:`Email`}),(0,Q.jsx)(W,{variant:`outlined`,value:`not-an-email`,onChange:()=>{}}),(0,Q.jsx)(xt,{children:`Enter a valid e-mail address.`})]})})},CT=t({Default:()=>TT,ErrorState:()=>ET,FromContext:()=>DT,default:()=>wT}),wT={title:`Theme/FormHelperText`,component:xt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`error`,`color`]}},argTypes:{children:{control:`text`,description:`Helper or error text.`,table:{category:`Content`}},error:{control:`boolean`,description:'Renders in the error color and announces via `role="alert"`. Falls back to the FormControl `error` value.',table:{category:`State`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`. Inherits `textColor` from context when unset; ignored in the error state.",table:{category:`Visual`,defaultValue:{summary:`secondary`}}}}},TT={args:{children:`We'll never share it.`}},ET={args:{children:`Enter a valid e-mail address.`,error:!0}},DT={render:()=>(0,Q.jsx)(fe,{id:`email`,error:!0,children:(0,Q.jsx)(xt,{children:`Enter a valid e-mail address.`})})},OT=t({Default:()=>AT,FromContext:()=>MT,Required:()=>jT,default:()=>kT}),kT={title:`Theme/FormLabel`,component:qt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`required`,`color`]}},argTypes:{children:{control:`text`,description:`Label text.`,table:{category:`Content`}},required:{control:`boolean`,description:"Appends a `*` indicator. Falls back to the FormControl `required` value.",table:{category:`State`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`. Inherits `textColor` from context when unset.",table:{category:`Visual`}}}},AT={args:{children:`Email`}},jT={args:{children:`Email`,required:!0}},MT={render:()=>(0,Q.jsx)(fe,{id:`email`,required:!0,children:(0,Q.jsx)(qt,{children:`Email`})})},NT=t({AsymmetricGap:()=>qT,AutoFill:()=>VT,AutoFlow:()=>GT,AutoRows:()=>WT,ColumnRowGap:()=>zT,Default:()=>LT,GapScale:()=>UT,GridAreaProp:()=>JT,NamedAreas:()=>HT,PlacementExample:()=>RT,SpanningItems:()=>KT,ThreeColumns:()=>BT,default:()=>IT}),$=({label:e})=>(0,Q.jsx)(L,{p:2,bg:`secondary`,borderRadius:`sm`,alignItems:`center`,justifyContent:`center`,children:e}),PT=`https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout`,FT=`Raw CSS string - grid layout values are structurally varied and can't be reduced to a fixed token set. See the [MDN Grid reference](${PT}) for all valid values.`,IT={title:`Theme/Grid`,component:a,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`A \`<div>\` with \`display: grid\` that extends **View**. Layout props (\`gridTemplateColumns\`, \`gridTemplateAreas\`, etc.) accept raw CSS strings - grid structures are too varied for a fixed token set. The \`gap\` prop is the exception: it resolves from \`theme.space\` like all spacing props.\n\n[MDN CSS Grid Layout reference](${PT})`}},controls:{include:[`gridTemplateColumns`,`gridTemplateRows`,`gridTemplateAreas`,`gridAutoFlow`,`gridAutoColumns`,`gridAutoRows`,`gap`,`columnGap`,`rowGap`,`justifyContent`,`alignItems`,`alignContent`,`justifyItems`,`p`,`m`]}},argTypes:{gridTemplateColumns:{control:`text`,description:`Defines column track sizes. ${FT}\n\n**Examples:** \`"repeat(3, 1fr)"\` · \`"200px 1fr"\` · \`"repeat(auto-fill, minmax(240px, 1fr))"\``,table:{category:`Layout`,type:{summary:`string`}}},gridTemplateRows:{control:`text`,description:`Defines row track sizes. ${FT}\n\n**Examples:** \`"60px auto 40px"\` · \`"repeat(3, 100px)"\``,table:{category:`Layout`,type:{summary:`string`}}},gridTemplateAreas:{control:`text`,description:`Assigns named areas to grid cells using quoted row strings. ${FT}\n\n**Example:** \`'"header header" "sidebar main"'\``,table:{category:`Layout`,type:{summary:`string`}}},gridAutoFlow:{control:{type:`inline-radio`},options:ft,description:"Controls the auto-placement algorithm direction. `row` fills each row before moving to the next; `column` fills each column first; `dense` backfills holes left by larger items.",table:{category:`Layout`,type:{summary:`string`},defaultValue:{summary:`row`}}},gridAutoColumns:{control:`text`,description:`Size applied to implicitly created columns (columns not defined in \`gridTemplateColumns\`). ${FT}\n\n**Examples:** \`"100px"\` · \`"minmax(100px, auto)"\``,table:{category:`Layout`,type:{summary:`string`}}},gridAutoRows:{control:`text`,description:`Size applied to implicitly created rows (rows not defined in \`gridTemplateRows\`). ${FT}\n\n**Examples:** \`"80px"\` · \`"minmax(60px, auto)"\``,table:{category:`Layout`,type:{summary:`string`}}},gap:{...GS,description:"Gap between all rows and columns - resolves from `theme.space`. Unlike the other grid props, this uses theme tokens (not a raw CSS string)."},columnGap:{control:{type:`select`},options:je,description:"Gap between columns - resolves from `theme.space`. Use when column and row gaps should differ; prefer `gap` when both axes match.",table:{category:`Spacing`,type:{summary:`GapToken`},defaultValue:{summary:`0`}}},rowGap:{control:{type:`select`},options:je,description:"Gap between rows - resolves from `theme.space`. Use when column and row gaps should differ; prefer `gap` when both axes match.",table:{category:`Spacing`,type:{summary:`GapToken`},defaultValue:{summary:`0`}}},justifyContent:{control:{type:`select`},options:Lt,description:`Aligns grid tracks along the inline (row) axis when there is extra space.`,table:{category:`Layout`,type:{summary:`string`}}},alignItems:{control:{type:`select`},options:Tt,description:`Aligns grid items within their cell along the block (column) axis.`,table:{category:`Layout`,type:{summary:`string`}}},alignContent:{control:{type:`select`},options:Vt,description:`Aligns grid tracks along the block (column) axis when there is extra space.`,table:{category:`Layout`,type:{summary:`string`}}},justifyItems:{control:{type:`select`},options:Ht,description:`Aligns grid items within their cell along the inline (row) axis.`,table:{category:`Layout`,type:{summary:`string`}}}}},LT={args:{gridTemplateColumns:`1fr 1fr`,gap:2},render:e=>(0,Q.jsxs)(a,{...e,children:[(0,Q.jsx)($,{label:`A`}),(0,Q.jsx)($,{label:`B`}),(0,Q.jsx)($,{label:`C`}),(0,Q.jsx)($,{label:`D`})]})},RT={render:()=>(0,Q.jsxs)(a,{gridTemplateColumns:`repeat(3, 1fr)`,gap:1,gridAutoRows:`minmax(100px, auto)`,maxWidth:`940px`,children:[(0,Q.jsx)(a,{gridColumn:`1 / 3`,gridRow:`1`,bg:`backdrop`,borderColor:`primary`,borderWidth:`thin`,borderStyle:`solid`,borderRadius:`sm`,p:2,children:`One`}),(0,Q.jsx)(a,{gridColumn:`2 / 4`,gridRow:`1 / 3`,bg:`backdrop`,borderColor:`primary`,borderWidth:`thin`,borderStyle:`solid`,borderRadius:`sm`,p:2,children:`Two`}),(0,Q.jsx)(a,{gridColumn:`1`,gridRow:`2 / 5`,bg:`backdrop`,borderColor:`primary`,borderWidth:`thin`,borderStyle:`solid`,borderRadius:`sm`,p:2,children:`Three`}),(0,Q.jsx)(a,{gridColumn:`3`,gridRow:`3`,bg:`backdrop`,borderColor:`primary`,borderWidth:`thin`,borderStyle:`solid`,borderRadius:`sm`,p:2,children:`Four`}),(0,Q.jsx)(a,{gridColumn:`2`,gridRow:`4`,bg:`backdrop`,borderColor:`primary`,borderWidth:`thin`,borderStyle:`solid`,borderRadius:`sm`,p:2,children:`Five`}),(0,Q.jsx)(a,{gridColumn:`3`,gridRow:`4`,bg:`backdrop`,borderColor:`primary`,borderWidth:`thin`,borderStyle:`solid`,borderRadius:`sm`,p:2,children:`Six`})]})},zT={args:{gridTemplateColumns:`repeat(3, 1fr)`,columnGap:4,rowGap:1},render:e=>(0,Q.jsx)(a,{...e,children:Array.from({length:6},(e,t)=>(0,Q.jsx)($,{label:String(t+1)},t))})},BT={render:()=>(0,Q.jsx)(a,{gridTemplateColumns:`repeat(3, 1fr)`,gap:3,p:2,children:Array.from({length:6},(e,t)=>(0,Q.jsx)($,{label:String(t+1)},t))})},VT={render:()=>(0,Q.jsx)(a,{gridTemplateColumns:`repeat(auto-fill, minmax(120px, 1fr))`,gap:2,p:2,children:Array.from({length:8},(e,t)=>(0,Q.jsx)($,{label:String(t+1)},t))})},HT={render:()=>(0,Q.jsxs)(a,{gridTemplateAreas:`"header header" "sidebar content" "footer footer"`,gridTemplateColumns:`180px 1fr`,gridTemplateRows:`auto 1fr auto`,gap:2,p:2,height:`300px`,children:[(0,Q.jsx)(F,{bg:`primary`,p:2,borderRadius:`sm`,style:{gridArea:`header`},children:`header`}),(0,Q.jsx)(F,{bg:`secondary`,p:2,borderRadius:`sm`,style:{gridArea:`sidebar`},children:`sidebar`}),(0,Q.jsx)(F,{bg:`secondary`,p:2,borderRadius:`sm`,style:{gridArea:`content`},children:`content`}),(0,Q.jsx)(F,{bg:`primary`,p:2,borderRadius:`sm`,style:{gridArea:`footer`},children:`footer`})]})},UT={render:()=>(0,Q.jsx)(a,{gridTemplateColumns:`1fr`,gap:0,children:[0,.5,1,2,3,4].map(e=>(0,Q.jsxs)(F,{mb:3,children:[(0,Q.jsxs)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:.5,children:[`gap=`,`{${e}}`]}),(0,Q.jsxs)(a,{gridTemplateColumns:`1fr 1fr 1fr`,gap:e,children:[(0,Q.jsx)($,{label:`A`}),(0,Q.jsx)($,{label:`B`}),(0,Q.jsx)($,{label:`C`})]})]},e))})},WT={render:()=>(0,Q.jsxs)(a,{gridTemplateColumns:`1fr`,gap:0,children:[(0,Q.jsx)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:1,children:`Without gridAutoRows - row height follows content`}),(0,Q.jsxs)(a,{gridTemplateColumns:`repeat(4, 1fr)`,gap:2,mb:4,children:[(0,Q.jsx)($,{label:`short`}),(0,Q.jsx)(F,{bg:`secondary`,borderRadius:`sm`,p:2,children:`tall content that grows the row`}),(0,Q.jsx)($,{label:`short`}),(0,Q.jsx)($,{label:`short`})]}),(0,Q.jsx)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:1,children:`gridAutoRows="80px" - all rows fixed height`}),(0,Q.jsxs)(a,{gridTemplateColumns:`repeat(4, 1fr)`,gridAutoRows:`80px`,gap:2,children:[(0,Q.jsx)($,{label:`1`}),(0,Q.jsx)($,{label:`2`}),(0,Q.jsx)($,{label:`3`}),(0,Q.jsx)($,{label:`4`}),(0,Q.jsx)($,{label:`5`}),(0,Q.jsx)($,{label:`6`}),(0,Q.jsx)($,{label:`7`}),(0,Q.jsx)($,{label:`8`})]})]})},GT={render:()=>(0,Q.jsxs)(a,{gridTemplateColumns:`1fr`,gap:0,children:[(0,Q.jsx)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:1,children:`gridAutoFlow="row" (default) - items fill row by row`}),(0,Q.jsx)(a,{gridTemplateColumns:`repeat(3, 1fr)`,gridAutoFlow:`row`,gap:2,mb:4,children:[`A`,`B`,`C`,`D`,`E`,`F`].map(e=>(0,Q.jsx)($,{label:e},e))}),(0,Q.jsx)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:1,children:`gridAutoFlow="column" - items fill column by column`}),(0,Q.jsx)(a,{gridTemplateRows:`repeat(2, 60px)`,gridAutoFlow:`column`,gap:2,children:[`A`,`B`,`C`,`D`,`E`,`F`].map(e=>(0,Q.jsx)($,{label:e},e))})]})},KT={render:()=>(0,Q.jsxs)(a,{gridTemplateColumns:`repeat(3, 1fr)`,gap:2,children:[(0,Q.jsx)(a,{gridColumn:`1 / -1`,bg:`primary`,p:2,borderRadius:`sm`,justifyContent:`center`,children:`gridColumn="1 / -1" - full width`}),(0,Q.jsx)($,{label:`1`}),(0,Q.jsx)($,{label:`2`}),(0,Q.jsx)($,{label:`3`}),(0,Q.jsx)(a,{gridColumn:`1 / 3`,bg:`secondary`,p:2,borderRadius:`sm`,justifyContent:`center`,children:`gridColumn="1 / 3" - spans 2`}),(0,Q.jsx)($,{label:`5`}),(0,Q.jsx)($,{label:`6`}),(0,Q.jsx)(a,{gridRow:`3 / 5`,gridColumn:`3`,bg:`primary`,p:2,borderRadius:`sm`,justifyContent:`center`,children:`gridRow="3/5"`}),(0,Q.jsx)($,{label:`7`})]})},qT={render:()=>(0,Q.jsxs)(a,{gridTemplateColumns:`1fr`,gap:0,children:[(0,Q.jsxs)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:1,children:[`columnGap=`,`{4}`,` (32px) · rowGap=`,`{1}`,` (8px)`]}),(0,Q.jsx)(a,{gridTemplateColumns:`repeat(3, 1fr)`,columnGap:4,rowGap:1,mb:4,children:Array.from({length:6},(e,t)=>(0,Q.jsx)($,{label:String(t+1)},t))}),(0,Q.jsxs)(I,{variant:`caption`,as:`div`,color:`secondary`,mb:1,children:[`columnGap=`,`{1}`,` · rowGap=`,`{4}`]}),(0,Q.jsx)(a,{gridTemplateColumns:`repeat(3, 1fr)`,columnGap:1,rowGap:4,children:Array.from({length:6},(e,t)=>(0,Q.jsx)($,{label:String(t+1)},t))})]})},JT={render:()=>(0,Q.jsxs)(a,{gridTemplateAreas:`"header header header" "sidebar main main" "footer footer footer"`,gridTemplateColumns:`140px 1fr 1fr`,gridTemplateRows:`48px 1fr 40px`,gap:2,p:2,height:`280px`,children:[(0,Q.jsx)(a,{gridArea:`header`,bg:`primary`,p:2,borderRadius:`sm`,alignItems:`center`,children:`gridArea="header"`}),(0,Q.jsx)(a,{gridArea:`sidebar`,bg:`secondary`,p:2,borderRadius:`sm`,alignItems:`center`,children:`gridArea="sidebar"`}),(0,Q.jsx)(a,{gridArea:`main`,bg:`secondary`,p:2,borderRadius:`sm`,alignItems:`center`,children:`gridArea="main"`}),(0,Q.jsx)(a,{gridArea:`footer`,bg:`primary`,p:2,borderRadius:`sm`,alignItems:`center`,children:`gridArea="footer"`})]})},YT=t({ColorVariants:()=>$T,Default:()=>QT,Gallery:()=>eE,default:()=>ZT}),XT=Object.keys(ce),ZT={title:`Theme/Icon`,component:A,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`name`,`color`,`size`]}},args:{name:`hub`,color:`primary`,size:`3rem`},argTypes:{name:{control:{type:`select`},options:XT,description:`Registry key of the icon to render.`,table:{category:`Content`}},color:{control:{type:`select`},options:G,description:"Icon color - resolves from `theme.text` and fills the SVG via `currentColor`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},size:{control:`text`,description:`Sets both width and height - any valid CSS length.`,table:{category:`Layout`,defaultValue:{summary:`1.5rem`}}}}},QT={},$T={render:()=>(0,Q.jsxs)(`div`,{style:{display:`flex`,gap:`24px`},children:[(0,Q.jsx)(A,{name:`hub`,color:`primary`,size:`3rem`}),(0,Q.jsx)(A,{name:`hub`,color:`secondary`,size:`3rem`}),(0,Q.jsx)(A,{name:`hub`,color:`initial`,size:`3rem`})]})},eE={render:()=>(0,Q.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`24px`,maxWidth:`480px`},children:XT.map(e=>(0,Q.jsx)(A,{name:e,color:`primary`,size:`2rem`},e))})},tE=t({Cover:()=>aE,Default:()=>iE,ObjectFitVariants:()=>sE,WithFallback:()=>oE,default:()=>rE}),nE=`/soroush.svg`,rE={title:`Theme/Image`,component:E,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`src`,`srcSet`,`alt`,`fallback`,`width`,`height`,`objectFit`,`borderRadius`,`m`,`p`]}},argTypes:{src:{control:`text`,description:`Primary image URL.`,table:{category:`Content`}},srcSet:{control:`text`,description:"Responsive image URLs - used as primary source when `src` is absent.",table:{category:`Content`}},alt:{control:`text`,description:`Alt text - required for accessibility.`,table:{category:`Content`}},fallback:{control:`text`,description:"Fallback URL tried when primary source fails. `onError` fires when both fail.",table:{category:`Content`}},width:KS,height:qS,objectFit:{control:{type:`select`},options:dt,description:`CSS object-fit - controls how the image fills its container.`,table:{category:`Layout`}},borderRadius:sC,m:WS,p:US}},iE={args:{src:nE,alt:`Soroush logo`,width:`200px`,height:`200px`,objectFit:`contain`}},aE={args:{src:nE,alt:`Cover`,width:`300px`,height:`200px`,objectFit:`cover`}},oE={args:{src:`broken.jpg`,fallback:nE,alt:`With fallback`,width:`200px`,height:`200px`,objectFit:`contain`}},sE={render:()=>(0,Q.jsx)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:dt.map(e=>(0,Q.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,Q.jsx)(E,{src:nE,alt:e,width:`150px`,height:`120px`,objectFit:e}),(0,Q.jsx)(`p`,{style:{fontSize:`12px`,margin:`4px 0 0`},children:e})]},e))})},cE=t({Buffer:()=>fE,BufferAnimated:()=>wE,Colors:()=>hE,CustomRange:()=>AE,CustomValueText:()=>kE,Default:()=>uE,Determinate:()=>dE,DeterminateAnimated:()=>SE,Easing:()=>_E,Query:()=>pE,Rounded:()=>vE,SpinningDeterminate:()=>mE,Thickness:()=>gE,WithLabel:()=>EE,WithoutTrack:()=>yE,default:()=>lE}),lE={title:`Theme/LinearProgress`,component:Rt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`variant`,`color`,`thickness`,`value`,`buffer`,`valueBuffer`,`min`,`max`,`spinning`,`easing`,`showTrack`,`round`,`m`]}},argTypes:{variant:{control:{type:`inline-radio`},options:bt,description:`Visual variant - looping animation, value-driven bar, or reversed loop.`,table:{category:`Visual`,defaultValue:{summary:`indeterminate`}}},color:{control:{type:`select`},options:Kt,description:'Bar color - resolves to `theme.palette[color].main`; `"inherit"` uses `currentColor`.',table:{category:`Visual`,defaultValue:{summary:`primary`}}},thickness:{control:{type:`number`},description:`Bar height in px (number) or raw CSS unit (string).`,table:{category:`Visual`,defaultValue:{summary:`4`}}},value:{control:{type:`number`},description:'Progress value for the `"determinate"` variant (clamped between min and max).',table:{category:`Progress`}},buffer:{control:`boolean`,description:'Renders a buffer bar driven by `valueBuffer` behind a `"determinate"` bar, with a dotted leading edge.',table:{category:`Progress`,defaultValue:{summary:`false`}}},valueBuffer:{control:{type:`number`},description:"Buffer value when `buffer` is set (clamped between min and max).",table:{category:`Progress`}},min:{control:{type:`number`},description:'Minimum value for the `"determinate"` variant.',table:{category:`Progress`,defaultValue:{summary:`0`}}},max:{control:{type:`number`},description:'Maximum value for the `"determinate"` variant.',table:{category:`Progress`,defaultValue:{summary:`100`}}},spinning:{control:`boolean`,description:'Sends the value-length segment travelling along a `"determinate"` track, wrapping past the end back to the beginning.',table:{category:`Visual`,defaultValue:{summary:`false`}}},easing:{control:{type:`inline-radio`},options:_t,description:"Timing function for the value transition and the `spinning` travel.",table:{category:`Visual`,defaultValue:{summary:`linear`}}},showTrack:{control:`boolean`,description:"Renders the faint track behind the bars (dotted edge when `buffer` is set).",table:{category:`Visual`,defaultValue:{summary:`true`}}},round:{control:`boolean`,description:`Rounds the bar's corners into a pill shape.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},m:WS}},uE={args:{variant:`indeterminate`,color:`primary`}},dE={args:{variant:`determinate`,value:70,color:`primary`}},fE={args:{variant:`determinate`,buffer:!0,value:40,valueBuffer:70,color:`primary`}},pE={args:{variant:`query`,color:`primary`}},mE={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[25,50,75].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:[e,`%`]}),(0,Q.jsx)(Rt,{variant:`determinate`,value:e,spinning:!0})]},e))})},hE={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`primary`,`secondary`,`success`,`error`,`info`,`warning`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(Rt,{variant:`determinate`,value:65,color:e})]},e))})},gE={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[2,4,8,12].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:[e,`px`]}),(0,Q.jsx)(Rt,{variant:`determinate`,value:65,thickness:e})]},e))})},_E={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`linear`,`ease`,`ease-in`,`ease-out`,`ease-in-out`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(Rt,{variant:`determinate`,value:65,spinning:!0,easing:e})]},e))})},vE={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[4,8,12].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:[e,`px`]}),(0,Q.jsx)(Rt,{variant:`determinate`,value:65,thickness:e,round:!0})]},e))})},yE={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:`with track`}),(0,Q.jsx)(Rt,{variant:`determinate`,value:65})]}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:`without`}),(0,Q.jsx)(Rt,{variant:`determinate`,value:65,showTrack:!1})]})]})},bE=(e,t,n)=>{let[r,i]=(0,q.useState)(e);return(0,q.useEffect)(()=>{let r=setInterval(()=>{i(n=>n>=100?e:n+t)},n);return()=>clearInterval(r)},[e,t,n]),r},xE=()=>(0,Q.jsx)(Rt,{variant:`determinate`,value:bE(10,10,800),"aria-label":`Export data`}),SE={render:()=>(0,Q.jsx)(xE,{})},CE=()=>{let e=bE(10,10,800);return(0,Q.jsx)(Rt,{variant:`determinate`,buffer:!0,value:e,valueBuffer:Math.min(e+20,100),"aria-label":`Loading data`})},wE={render:()=>(0,Q.jsx)(CE,{})},TE=()=>{let e=bE(20,10,800);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Uploading photos...`}),(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:[(0,Q.jsx)(Rt,{variant:`determinate`,value:e,"aria-label":`Uploading photos`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,flexShrink:0,children:`${Math.round(e)}%`})]})]})},EE={render:()=>(0,Q.jsx)(TE,{})},DE=[`Ground floor`,`First floor`,`Second floor`,`Third floor`],OE=()=>{let[e,t]=(0,q.useState)(0);(0,q.useEffect)(()=>{let e=setInterval(()=>{t(e=>(e+1)%DE.length)},1200);return()=>clearInterval(e)},[]);let n=e/(DE.length-1)*100;return(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsxs)(I,{variant:`body2`,color:`secondary`,m:0,children:[`Elevator status: `,DE[e]]}),(0,Q.jsx)(Rt,{variant:`determinate`,value:n,"aria-label":`Elevator status`,"aria-valuetext":DE[e]})]})},kE={render:()=>(0,Q.jsx)(OE,{})},AE={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[{value:3,min:0,max:10,label:`3 of 10`},{value:120,min:0,max:200,label:`120 of 200`}].map(({value:e,min:t,max:n,label:r})=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:r}),(0,Q.jsx)(Rt,{variant:`determinate`,value:e,min:t,max:n})]},r))})},jE=t({Colors:()=>FE,Default:()=>NE,InlineProse:()=>LE,Underline:()=>PE,Variants:()=>IE,default:()=>ME}),ME={title:`Theme/Link`,component:ae,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`href`,`underline`,`variant`,`color`,`target`,`rel`,`m`,`p`]}},argTypes:{children:{control:`text`,description:`Link text content.`,table:{category:`Content`}},href:{control:`text`,description:`URL the link points to.`,table:{category:`Content`}},target:{control:{type:`select`},options:Nt,description:'Specifies where to open the linked URL. Setting `"_blank"` auto-injects `rel="noopener noreferrer"` unless `rel` is already provided.',table:{category:`Content`,defaultValue:{summary:`_self`}}},rel:{control:{type:`select`},options:zt,description:"Relationship between the document and the linked resource. Only values valid for `<a>` are listed; space-separate multiple values manually.",table:{category:`Content`}},underline:{control:{type:`inline-radio`},options:Ct,description:'Controls `text-decoration`. `"hover"` shows the underline only on pointer hover.',table:{category:`Visual`,defaultValue:{summary:`always`}}},color:{control:{type:`select`},options:G,description:"Semantic text color - resolves from `theme.text`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},variant:{control:{type:`select`},options:it,description:'Typographic scale. Inherits surrounding text size by default (`"inherit"`).',table:{category:`Typography`,defaultValue:{summary:`inherit`}}},m:WS,p:US}},NE={args:{href:`#`,children:`Visit the design system docs`}},PE={render:()=>(0,Q.jsx)(L,{children:Ct.map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,mb:2,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`4rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(ae,{href:`#`,underline:e,children:e===`hover`?`Hover to see underline`:`underline="${e}"`})]},e))})},FE={render:e=>(0,Q.jsx)(L,{children:G.map(t=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,mb:1,children:[(0,Q.jsx)(I,{variant:`caption`,width:`6rem`,flexShrink:0,m:0,color:`secondary`,children:t}),(0,Q.jsx)(ae,{href:`#`,...e,color:t,children:t})]},t))})},IE={render:()=>(0,Q.jsx)(L,{children:it.map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,mb:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsxs)(ae,{href:`#`,variant:e,m:0,children:[e,` link`]})]},e))})},LE={render:()=>(0,Q.jsxs)(I,{variant:`body1`,maxWidth:`480px`,children:[`The design system is built with `,(0,Q.jsx)(ae,{href:`#`,children:`Emotion`}),` and`,` `,(0,Q.jsx)(ae,{href:`#`,children:`styled-system`}),`. All components resolve color, spacing, and typography from theme tokens - see the`,` `,(0,Q.jsx)(ae,{href:`#`,underline:`hover`,color:`secondary`,children:`design-system docs`}),` `,`for details.`]})},RE=t({Default:()=>BE,DividersAndDense:()=>WE,MultipleWithCheckmark:()=>UE,Selected:()=>VE,States:()=>HE,default:()=>zE}),zE={title:`Theme/MenuItem`,component:yt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`value`,`children`,`disabled`,`selected`,`highlighted`,`multiple`,`color`,`textColor`,`size`,`dense`,`disableGutters`,`divider`,`autoFocus`,`as`]}},args:{value:`web`,children:`Web`,color:`primary`,size:`md`},argTypes:{value:{control:`text`,description:`The value this option represents - reported to Select's onChange.`,table:{category:`Content`}},children:{control:`text`,description:`The option label.`,table:{category:`Content`}},disabled:{control:`boolean`,description:`Disables the option.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},selected:{control:`boolean`,description:`Marks the option as selected. Injected by Select.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},highlighted:{control:`boolean`,description:`Marks the option as keyboard-highlighted. Injected by Select.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},multiple:{control:`boolean`,description:`Reserves a leading checkmark slot. Injected by Select.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:qe,description:"Accent color - resolves to `theme.palette[color]`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},textColor:{control:{type:`select`},options:G,description:"Base text color of the row - resolves against `theme.text`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},size:{control:{type:`select`},options:tn,description:"Density - resolves against `theme.sizes`.",table:{category:`Layout`,defaultValue:{summary:`md`}}},dense:{control:`boolean`,description:"Compact vertical padding, independent of `size`.",table:{category:`Layout`,defaultValue:{summary:`false`}}},disableGutters:{control:`boolean`,description:`Remove the left and right padding.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},divider:{control:`boolean`,description:`Add a 1px bottom border to separate the row.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},autoFocus:{control:`boolean`,description:`Focus the row on first mount (and when it flips false → true).`,table:{category:`Focus`,defaultValue:{summary:`false`}}},as:{control:{type:`select`},options:Me,description:`The element used for the root node.`,table:{category:`Layout`,defaultValue:{summary:`li`}}}},decorators:[e=>(0,Q.jsx)(O,{elevation:8,p:0,borderRadius:`sm`,style:{width:220},children:(0,Q.jsx)(`ul`,{style:{margin:0,padding:`0.25rem 0`,listStyle:`none`},children:(0,Q.jsx)(e,{})})})]},BE={},VE={args:{selected:!0}},HE={render:()=>(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(yt,{value:`a`,children:`Default`}),(0,Q.jsx)(yt,{value:`b`,highlighted:!0,children:`Highlighted`}),(0,Q.jsx)(yt,{value:`c`,selected:!0,children:`Selected`}),(0,Q.jsx)(yt,{value:`d`,disabled:!0,children:`Disabled`})]})},UE={render:()=>(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(yt,{value:`a`,multiple:!0,selected:!0,children:`Selected`}),(0,Q.jsx)(yt,{value:`b`,multiple:!0,children:`Unselected`})]})},WE={render:()=>(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(yt,{value:`a`,divider:!0,children:`Profile`}),(0,Q.jsx)(yt,{value:`b`,divider:!0,children:`Settings`}),(0,Q.jsx)(yt,{value:`c`,dense:!0,children:`Compact row`}),(0,Q.jsx)(yt,{value:`d`,dense:!0,children:`Another compact row`})]})},GE=t({Default:()=>JE,Form:()=>nD,Nested:()=>XE,ScrollBody:()=>eD,ScrollPaper:()=>QE,default:()=>KE}),KE={title:`Theme/Modal`,component:te,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`scroll`,`hasBackdrop`,`shouldUsePortal`,`shouldKeepMounted`,`shouldLockScroll`,`shouldAutoFocus`,`shouldTrapFocus`,`shouldEnforceFocus`,`shouldRestoreFocus`]}},argTypes:{scroll:{control:{type:`inline-radio`},options:St,description:`Whether long content scrolls within the surface (paper) or the whole root (body).`,table:{category:`Layout`,defaultValue:{summary:`paper`}}},hasBackdrop:{control:`boolean`,description:`Render the dimmed backdrop behind the content.`,table:{category:`Visual`,defaultValue:{summary:`true`}}},shouldUsePortal:{control:`boolean`,description:`Portal the modal into the document body.`,table:{category:`Visual`,defaultValue:{summary:`true`}}},shouldKeepMounted:{control:`boolean`,description:`Keep the children mounted while the modal is closed.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldLockScroll:{control:`boolean`,description:`Lock body scroll while the modal is open.`,table:{category:`Behavior`,defaultValue:{summary:`true`}}},shouldAutoFocus:{control:`boolean`,description:`Move focus into the modal on open.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldTrapFocus:{control:`boolean`,description:`Trap Tab focus within the modal.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldEnforceFocus:{control:`boolean`,description:`Pull focus back into the modal whenever it escapes.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldRestoreFocus:{control:`boolean`,description:`Restore focus to the trigger on close.`,table:{category:`Focus`,defaultValue:{summary:`true`}}}}},qE=e=>{let[t,n]=(0,q.useState)(!1);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(u,{onClick:()=>n(!0),children:`Open modal`}),(0,Q.jsx)(te,{...e,isOpen:t,onClose:()=>n(!1),children:(0,Q.jsx)(O,{role:`dialog`,"aria-modal":`true`,"aria-label":`Example dialog`,p:4,width:`320px`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Modal title`}),(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Press Escape, click the backdrop, or use the button to close.`}),(0,Q.jsx)(u,{onClick:()=>n(!1),children:`Close`})]})})})]})},JE={args:{scroll:`paper`,hasBackdrop:!0,shouldUsePortal:!0,shouldKeepMounted:!1,shouldLockScroll:!0,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0},render:e=>(0,Q.jsx)(qE,{...e})},YE=e=>{let[t,n]=(0,q.useState)(!1),[r,i]=(0,q.useState)(!1);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(u,{onClick:()=>n(!0),children:`Open modal`}),(0,Q.jsx)(te,{...e,isOpen:r,onClose:()=>i(!1),children:(0,Q.jsx)(O,{role:`dialog`,"aria-modal":`true`,"aria-label":`Nested dialog`,p:4,width:`300px`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Nested modal`}),(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Layered above the outer modal, with its own backdrop and focus trap.`}),(0,Q.jsx)(u,{onClick:()=>i(!1),children:`Close`})]})})}),(0,Q.jsx)(te,{...e,isOpen:t,onClose:()=>n(!1),children:(0,Q.jsx)(O,{role:`dialog`,"aria-modal":`true`,"aria-label":`Outer dialog`,p:4,width:`360px`,borderRadius:`lg`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Outer modal`}),(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Open a second modal on top. The manager stacks it above and Escape closes the top one first.`}),(0,Q.jsx)(u,{onClick:()=>i(!0),children:`Open nested modal`}),(0,Q.jsx)(u,{onClick:()=>n(!1),children:`Close`})]})})})]})},XE={args:{scroll:`paper`,hasBackdrop:!0,shouldUsePortal:!0,shouldKeepMounted:!1,shouldLockScroll:!0,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0},render:e=>(0,Q.jsx)(YE,{...e})},ZE=e=>{let[t,n]=(0,q.useState)(!1),r=Array.from({length:30},(e,t)=>`Background line ${t+1}`),i=Array.from({length:20},(e,t)=>`Paragraph ${t+1}`);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsx)(u,{onClick:()=>n(!0),children:`Open modal`}),r.map(e=>(0,Q.jsxs)(I,{variant:`body2`,color:`secondary`,m:0,children:[e,` - background scroll is locked while the modal is open.`]},e))]}),(0,Q.jsx)(te,{...e,isOpen:t,onClose:()=>n(!1),children:(0,Q.jsx)(O,{role:`dialog`,"aria-modal":`true`,"aria-label":`Paper-scroll dialog`,p:4,width:`700px`,maxWidth:`80vW`,maxHeight:`70vh`,overflow:`auto`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Paper-scroll modal`}),i.map(e=>(0,Q.jsxs)(I,{variant:`body2`,color:`secondary`,m:0,children:[e,` - content scrolls within the surface while the page stays put.`]},e)),(0,Q.jsx)(u,{onClick:()=>n(!1),children:`Close`})]})})})]})},QE={args:{scroll:`paper`,hasBackdrop:!0,shouldUsePortal:!0,shouldKeepMounted:!1,shouldLockScroll:!0,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0},render:e=>(0,Q.jsx)(ZE,{...e})},$E=e=>{let[t,n]=(0,q.useState)(!1),r=Array.from({length:40},(e,t)=>`Paragraph ${t+1}`);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(u,{onClick:()=>n(!0),children:`Open modal`}),(0,Q.jsx)(te,{...e,isOpen:t,onClose:()=>n(!1),children:(0,Q.jsx)(O,{role:`dialog`,"aria-modal":`true`,"aria-label":`Body-scroll dialog`,p:4,m:4,width:`600px`,maxWidth:`80vW`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Body-scroll modal`}),r.map(e=>(0,Q.jsxs)(I,{variant:`body2`,color:`secondary`,m:0,children:[e,` - the surface and backdrop scroll together within the root.`]},e)),(0,Q.jsx)(u,{onClick:()=>n(!1),children:`Close`})]})})})]})},eD={args:{scroll:`body`,hasBackdrop:!0,shouldUsePortal:!0,shouldKeepMounted:!1,shouldLockScroll:!0,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0},render:e=>(0,Q.jsx)($E,{...e})},tD=e=>{let[t,n]=(0,q.useState)(!1);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(u,{onClick:()=>n(!0),children:`Open form`}),(0,Q.jsx)(te,{...e,isOpen:t,onClose:()=>n(!1),children:(0,Q.jsx)(O,{role:`dialog`,"aria-modal":`true`,"aria-label":`Sign in`,p:4,width:`360px`,children:(0,Q.jsxs)(L,{as:`form`,flexDirection:`column`,gap:3,onSubmit:e=>{e.preventDefault(),n(!1)},children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Sign in`}),(0,Q.jsx)(W,{fullWidth:!0,autoFocus:!0,inputProps:{placeholder:`Email`}}),(0,Q.jsx)(W,{fullWidth:!0,inputProps:{type:`password`,placeholder:`Password`}}),(0,Q.jsxs)(L,{gap:2,justifyContent:`flex-end`,children:[(0,Q.jsx)(u,{type:`button`,onClick:()=>n(!1),children:`Cancel`}),(0,Q.jsx)(u,{type:`submit`,children:`Submit`})]})]})})})]})},nD={args:{scroll:`paper`,hasBackdrop:!0,shouldUsePortal:!0,shouldKeepMounted:!1,shouldLockScroll:!0,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0},render:e=>(0,Q.jsx)(tD,{...e})},rD=t({Controlled:()=>fD,Default:()=>sD,ErrorState:()=>uD,Sizes:()=>lD,Variants:()=>cD,default:()=>oD}),iD=[{label:`Web`,value:`web`},{label:`Android`,value:`android`},{label:`iOS`,value:`ios`}],aD=[{label:`10`,value:10},{label:`25`,value:25},{label:`50`,value:50},{label:`100`,value:100}],oD={title:`Theme/NativeSelect`,component:d,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`variant`,`color`,`textColor`,`bg`,`size`,`disabled`,`error`,`required`,`fullWidth`,`placeholder`,`iconName`,`p`,`m`,`width`,`minWidth`,`maxWidth`]}},args:{options:iD,placeholder:`Pick a platform`,variant:`outlined`},argTypes:{variant:{control:{type:`select`},options:De,description:"`outlined`/`default` - full border box · `underline` - bottom border only · `text` - no border.",table:{category:`Visual`,defaultValue:{summary:`default`}}},color:{control:{type:`select`},options:Ze,description:"Focus/active border color - resolves to `theme.palette[color]`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},textColor:{control:{type:`select`},options:G,description:"Text color of the selected value - resolves against `theme.text`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},bg:{control:{type:`select`},options:Ot,description:"Background color - resolves against `theme.background`.",table:{category:`Visual`,defaultValue:{summary:`terminal`}}},size:{control:{type:`select`},options:tn,description:"Controls padding and font size - resolves against `theme.sizes`.",table:{category:`Layout`,defaultValue:{summary:`md`}}},disabled:{control:`boolean`,description:`Disables the select.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},error:{control:`boolean`,description:`Marks the field as invalid - applies error border color.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`Marks the native select as required.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},fullWidth:{control:`boolean`,description:`Stretches the root to fill its container.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},placeholder:{control:`text`,description:`Empty-state label shown while nothing is selected.`,table:{category:`Content`}},iconName:{control:`text`,description:`Dropdown affordance icon from the Icon registry.`,table:{category:`Visual`,defaultValue:{summary:`expand_more`}}},p:US,m:WS,width:KS,minWidth:JS,maxWidth:XS}},sD={},cD={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`outlined`,`default`,`underline`,`text`].map(e=>(0,Q.jsx)(d,{variant:e,options:iD,placeholder:e},e))})},lD={render:()=>(0,Q.jsx)(L,{gap:3,alignItems:`center`,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsx)(d,{size:e,variant:`outlined`,options:iD,placeholder:e},e))})},uD={args:{error:!0}};function dD(e){let[t,n]=(0,q.useState)(25);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,children:[`Rows per page: `,t]}),(0,Q.jsx)(d,{variant:`outlined`,options:aD,value:t,onChange:n,...e})]})}var fD={render:()=>(0,Q.jsx)(dD,{})},pD=t({Buttons:()=>yD,Controlled:()=>SD,Default:()=>hD,Outlined:()=>gD,Ranges:()=>bD,Rounded:()=>_D,Sizes:()=>vD,default:()=>mD}),mD={title:`Theme/Pagination/Pagination`,component:c,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`count`,`defaultPage`,`siblingCount`,`boundaryCount`,`color`,`variant`,`shape`,`size`,`disabled`,`shouldShowFirstButton`,`shouldShowLastButton`,`shouldHidePrevButton`,`shouldHideNextButton`]}},args:{count:10},argTypes:{count:{control:{type:`number`,min:0},description:`Total number of pages.`,table:{category:`Content`}},defaultPage:{control:{type:`number`,min:1},description:`Uncontrolled initial page (1-based).`,table:{category:`Behavior`,defaultValue:{summary:`1`}}},siblingCount:{control:{type:`number`,min:0},description:`Pages always visible either side of the current page.`,table:{category:`Behavior`,defaultValue:{summary:`1`}}},boundaryCount:{control:{type:`number`,min:0},description:`Pages always visible at the start and end.`,table:{category:`Behavior`,defaultValue:{summary:`1`}}},color:cC,variant:lC,shape:uC,size:dC,disabled:{control:`boolean`,description:`Disables every item.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldShowFirstButton:pC,shouldShowLastButton:mC,shouldHidePrevButton:{control:`boolean`,description:`Hides the previous-page button.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldHideNextButton:{control:`boolean`,description:`Hides the next-page button.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}}}},hD={},gD={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(c,{count:10,variant:`outlined`}),(0,Q.jsx)(c,{count:10,variant:`outlined`,color:`secondary`}),(0,Q.jsx)(c,{count:10,variant:`outlined`,disabled:!0})]})},_D={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(c,{count:10,shape:`rounded`}),(0,Q.jsx)(c,{count:10,variant:`outlined`,shape:`rounded`})]})},vD={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsx)(c,{count:10,size:e},e))})},yD={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(c,{count:10,shouldShowFirstButton:!0,shouldShowLastButton:!0}),(0,Q.jsx)(c,{count:10,shouldHidePrevButton:!0,shouldHideNextButton:!0})]})},bD={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,children:[(0,Q.jsx)(c,{count:11,defaultPage:6,siblingCount:0}),(0,Q.jsx)(c,{count:11,defaultPage:6}),(0,Q.jsx)(c,{count:11,defaultPage:6,siblingCount:0,boundaryCount:2}),(0,Q.jsx)(c,{count:11,defaultPage:6,boundaryCount:2})]})};function xD(){let[e,t]=(0,q.useState)(1);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,children:[`Page: `,e]}),(0,Q.jsx)(c,{count:10,page:e,onChange:t})]})}var SD={render:()=>(0,Q.jsx)(xD,{})},CD=t({AllTypes:()=>ED,Default:()=>TD,default:()=>wD}),wD={title:`Theme/Pagination/PaginationItem`,component:f,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`type`,`page`,`isSelected`,`color`,`variant`,`shape`,`size`,`disabled`]}},args:{type:`page`,page:1},argTypes:{type:{control:{type:`select`},options:[`page`,`first`,`previous`,`next`,`last`,`start-ellipsis`,`end-ellipsis`],description:`What the item renders - page number, nav control, or ellipsis.`,table:{category:`Content`,defaultValue:{summary:`page`}}},page:{control:{type:`number`,min:1},description:'The page number/content for `type="page"`.',table:{category:`Content`}},isSelected:{control:`boolean`,description:'Active styling for the current page - also sets `aria-current="page"`.',table:{category:`Behavior`,defaultValue:{summary:`false`}}},color:cC,variant:lC,shape:uC,size:dC,disabled:{control:`boolean`,description:`Disables the item.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}}}},TD={},ED={render:()=>(0,Q.jsxs)(L,{gap:2,alignItems:`center`,children:[(0,Q.jsx)(f,{type:`first`}),(0,Q.jsx)(f,{type:`previous`}),(0,Q.jsx)(f,{page:1}),(0,Q.jsx)(f,{page:2,isSelected:!0}),(0,Q.jsx)(f,{type:`start-ellipsis`}),(0,Q.jsx)(f,{page:9}),(0,Q.jsx)(f,{type:`next`}),(0,Q.jsx)(f,{type:`last`})]})},DD=t({AspectRatio:()=>MD,BackgroundTokens:()=>jD,Composed:()=>ND,Default:()=>kD,Elevations:()=>AD,default:()=>OD}),OD={title:`Theme/Paper`,component:O,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`elevation`,`bg`,`borderRadius`,`aspectRatio`,`transition`,`opacity`,`cursor`,`m`,`p`,`width`,`height`]}},argTypes:{children:{control:`text`,description:`Content rendered inside the surface.`,table:{category:`Content`}},elevation:{control:{type:`range`,min:0,max:24,step:1},description:`Shadow depth - 0 (flat) to 24 (highest). Resolves to theme.shadows[n].`,table:{category:`Visual`,defaultValue:{summary:`1`}}},bg:VS,borderRadius:{control:{type:`inline-radio`},options:Et,description:`Border radius - resolves from theme.radii.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},aspectRatio:{control:`text`,description:`CSS aspect-ratio for fixed-ratio surfaces (e.g. "16/9", "1").`,table:{category:`Layout`}},transition:{control:`text`,description:`CSS transition for surface animations (e.g. "box-shadow 0.3s ease").`,table:{category:`Visual`}},opacity:HS,cursor:eC,m:WS,p:US,width:KS,height:qS}},kD={args:{elevation:1,p:3,width:`320px`,children:`A surface with default elevation, background, and border radius.`}},AD={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,flexWrap:`wrap`,gap:3,children:[0,1,2,4,8,16,24].map(e=>(0,Q.jsxs)(O,{elevation:e,p:3,width:`120px`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`elevation`}),(0,Q.jsx)(I,{variant:`body2`,m:0,children:e})]},e))})},jD={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,flexWrap:`wrap`,gap:3,children:[`paper`,`primary`,`secondary`,`modal`].map(e=>(0,Q.jsxs)(O,{bg:e,elevation:2,p:3,width:`140px`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`bg`}),(0,Q.jsx)(I,{variant:`body2`,m:0,children:e})]},e))})},MD={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,flexWrap:`wrap`,gap:3,children:[`1`,`4/3`,`16/9`].map(e=>(0,Q.jsx)(O,{elevation:2,aspectRatio:e,width:`160px`,children:(0,Q.jsx)(L,{height:`100%`,alignItems:`center`,justifyContent:`center`,children:(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})})},e))})},ND={render:()=>(0,Q.jsx)(O,{elevation:3,p:4,width:`320px`,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsx)(I,{variant:`h5`,m:0,children:`Card Title`}),(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Compose Flex or Grid inside Paper for layout. Paper intentionally has no flex or grid props.`})]})})},PD=t({Bottom:()=>UD,Default:()=>VD,Left:()=>KD,Right:()=>GD,Top:()=>WD,WithBackdrop:()=>HD,default:()=>BD});function FD(e){let[t,n]=(0,q.useState)(null);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(u,{onClick:e=>n(e.currentTarget),children:`Open popover`}),(0,Q.jsx)(gt,{...e,open:!!t,anchorEl:t,onClose:()=>n(null),children:(0,Q.jsx)(F,{p:3,style:{maxWidth:240},children:(0,Q.jsx)(I,{variant:`body2`,children:`Portaled content, positioned relative to the button and closed on Escape or an outside click.`})})})]})}function ID({anchorOriginVertical:e,anchorOriginHorizontal:t,transformOriginVertical:n,transformOriginHorizontal:r,...i}){return(0,Q.jsx)(FD,{...i,anchorOrigin:{vertical:e,horizontal:t},transformOrigin:{vertical:n,horizontal:r}})}var LD=e=>(0,Q.jsx)(F,{style:{minHeight:`60vh`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,Q.jsx)(e,{})}),RD=[`top`,`center`,`bottom`],zD=[`left`,`center`,`right`],BD={title:`Theme/Popover`,component:gt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`anchorReference`,`anchorOriginVertical`,`anchorOriginHorizontal`,`transformOriginVertical`,`transformOriginHorizontal`,`marginThreshold`,`elevation`,`hasBackdrop`,`disableScrollLock`,`disableAriaHidden`,`shouldAutoFocus`,`shouldTrapFocus`,`shouldEnforceFocus`,`shouldRestoreFocus`,`shouldKeepMounted`,`layer`]}},args:{anchorReference:`anchorEl`,anchorOriginVertical:`bottom`,anchorOriginHorizontal:`left`,transformOriginVertical:`top`,transformOriginHorizontal:`left`,elevation:8,marginThreshold:2,hasBackdrop:!1,disableScrollLock:!1,disableAriaHidden:!1,shouldAutoFocus:!0,shouldTrapFocus:!0,shouldEnforceFocus:!0,shouldRestoreFocus:!0,shouldKeepMounted:!1,layer:`modal`},argTypes:{open:{control:!1,description:`If true, the popover is shown.`,table:{category:`Content`}},children:{control:!1,description:`The content of the popover.`,table:{category:`Content`}},anchorEl:{control:!1,description:`Element (or getter) the popover is positioned against.`,table:{category:`Layout`}},anchorPosition:{control:!1,description:"Client coordinates used when `anchorReference` is `'anchorPosition'`.",table:{category:`Layout`}},anchorOrigin:{control:!1,description:`The point on the anchor the popover attaches to. Set via the split selects.`,table:{category:`Layout`}},transformOrigin:{control:!1,description:`The point on the popover that meets the anchor. Set via the split selects.`,table:{category:`Layout`}},onClose:{control:!1,description:`Fired on Escape or a click outside the surface.`,table:{category:`Behavior`}},container:{control:!1,description:`Portal target passed to the underlying Modal.`,table:{category:`Behavior`}},action:{control:!1,description:"Imperative handle exposing `updatePosition()`.",table:{category:`Behavior`}},slotProps:{control:!1,description:"Props for the paper slot (the surface) - e.g. `bg`, `p`, `style`.",table:{category:`Visual`}},anchorReference:{control:{type:`inline-radio`},options:[`anchorEl`,`anchorPosition`,`none`],description:`Which anchor to position against.`,table:{category:`Layout`,defaultValue:{summary:`anchorEl`}}},anchorOriginVertical:{control:{type:`select`},options:RD,description:`Vertical point on the anchor the popover attaches to.`,table:{category:`Layout`,defaultValue:{summary:`bottom`}}},anchorOriginHorizontal:{control:{type:`select`},options:zD,description:`Horizontal point on the anchor the popover attaches to.`,table:{category:`Layout`,defaultValue:{summary:`left`}}},transformOriginVertical:{control:{type:`select`},options:RD,description:`Vertical point on the popover that meets the anchor.`,table:{category:`Layout`,defaultValue:{summary:`top`}}},transformOriginHorizontal:{control:{type:`select`},options:zD,description:`Horizontal point on the popover that meets the anchor.`,table:{category:`Layout`,defaultValue:{summary:`left`}}},marginThreshold:{control:{type:`select`},options:[0,.5,1,1.5,2,3,4],description:"Minimum gap from the viewport edge as a spacing token (`theme.space`, e.g. `2` → 16px).",table:{category:`Layout`,defaultValue:{summary:`2`}}},elevation:{control:{type:`range`,min:0,max:24,step:1},description:"Shadow depth of the surface - resolves against `theme.shadows`.",table:{category:`Visual`,defaultValue:{summary:`8`}}},hasBackdrop:{control:`boolean`,description:`Render a dimmed backdrop instead of the invisible click-away layer.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},disableScrollLock:{control:`boolean`,description:`Disable body scroll-lock; the popover then re-positions on scroll.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},disableAriaHidden:{control:`boolean`,description:"Skip `aria-hidden` on background content (for non-modal popovers).",table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldKeepMounted:{control:`boolean`,description:`Keep the content mounted while closed.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},layer:{control:{type:`select`},options:[`appBar`,`drawer`,`modal`],description:"Stacking layer from `theme.zOrder`.",table:{category:`Behavior`,defaultValue:{summary:`modal`}}},shouldAutoFocus:{control:`boolean`,description:`Move focus into the popover on open.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldTrapFocus:{control:`boolean`,description:`Trap Tab focus within the popover.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldEnforceFocus:{control:`boolean`,description:`Pull focus back whenever it escapes.`,table:{category:`Focus`,defaultValue:{summary:`true`}}},shouldRestoreFocus:{control:`boolean`,description:`Restore focus to the trigger on close.`,table:{category:`Focus`,defaultValue:{summary:`true`}}}},render:ID},VD={},HD={args:{hasBackdrop:!0}},UD={decorators:[LD],args:{anchorOriginVertical:`bottom`,anchorOriginHorizontal:`left`,transformOriginVertical:`top`,transformOriginHorizontal:`left`}},WD={decorators:[LD],args:{anchorOriginVertical:`top`,anchorOriginHorizontal:`left`,transformOriginVertical:`bottom`,transformOriginHorizontal:`left`}},GD={decorators:[LD],args:{anchorOriginVertical:`top`,anchorOriginHorizontal:`right`,transformOriginVertical:`top`,transformOriginHorizontal:`left`}},KD={decorators:[LD],args:{anchorOriginVertical:`top`,anchorOriginHorizontal:`left`,transformOriginVertical:`top`,transformOriginHorizontal:`right`}},qD=t({Default:()=>XD,default:()=>JD}),JD={title:`Theme/Portal`,component:de,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`target`]}},argTypes:{target:{control:{type:`inline-radio`},options:[`body`,`container`],description:`Where the Portal mounts its children - the document body or a custom element.`,table:{category:`Behavior`,defaultValue:{summary:`body`}}}}},YD=({target:e})=>{let[t,n]=(0,q.useState)(null);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,width:`360px`,children:[(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Switch the target control to move the portaled banner between the document body and the bordered box below.`}),(0,Q.jsx)(F,{ref:n,p:3,minHeight:`64px`,borderWidth:`thin`,borderStyle:`solid`,borderColor:`primary`,borderRadius:`md`,children:(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`Custom container`})}),(e===`body`||t)&&(0,Q.jsx)(de,{container:e===`container`?t:void 0,children:(0,Q.jsx)(O,{p:3,mt:2,style:e===`body`?{position:`fixed`,top:16,left:16,right:16,zIndex:1}:void 0,children:(0,Q.jsxs)(I,{color:`info`,variant:`body2`,m:0,children:[`Portaled to `,e===`body`?`document.body`:`the custom container`]})})})]})},XD={args:{target:`container`},render:e=>(0,Q.jsx)(YD,{...e})},ZD=t({Default:()=>$D,Highlight:()=>tO,Opacity:()=>eO,WrappingContent:()=>nO,default:()=>QD}),QD={title:`Theme/Pressable`,component:Gt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`as`,`feedback`,`color`,`activeOpacity`,`disabled`,`href`,`p`,`borderRadius`]}},args:{children:`Press me`},argTypes:{as:{control:{type:`inline-radio`},options:[`div`,`button`,`span`],description:"Element to render. `div` (default) and any other tag get button semantics via a role, tab stop, and Enter/Space handling; `button` is native.",table:{category:`Behavior`,defaultValue:{summary:`div`}}},feedback:{control:{type:`inline-radio`},options:$t,description:"Feedback shown while held - `none` leaves the content untouched, `opacity` dims it, `highlight` tints the surface behind it.",table:{category:`Behavior`,defaultValue:{summary:`none`}}},color:{control:{type:`select`},options:qe,description:"Palette the `highlight` tint derives from - resolves against `theme.palette`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},activeOpacity:{control:{type:`range`,min:0,max:1,step:.05},description:'Opacity held content fades to under `feedback="opacity"`.',table:{category:`Behavior`,defaultValue:{summary:`0.7`}}},disabled:{control:`boolean`,description:`Disables the surface - suppresses press feedback and the pointer cursor.`,table:{category:`State`,defaultValue:{summary:`false`}}},href:{control:`text`,description:"Renders an `a` element instead of the default `div` when set.",table:{category:`Behavior`}},p:{control:{type:`select`},options:[0,1,2,3,4],description:"Padding - resolves from `theme.space`. Zero by default, like every other box.",table:{category:`Spacing`,type:{summary:`space`},defaultValue:{summary:`0`}}},borderRadius:{control:{type:`select`},options:[`sm`,`md`,`lg`],description:"Border radius - resolves from `theme.radii`. Clips the `highlight` tint.",table:{category:`Visual`,type:{summary:`sm | md | lg`}}}}},$D={},eO={args:{feedback:`opacity`,children:`Hold to dim`}},tO={args:{feedback:`highlight`,children:`Hold to tint`,p:2,borderRadius:`md`}},nO={render:()=>(0,Q.jsx)(Gt,{feedback:`highlight`,p:2,borderRadius:`md`,width:`16rem`,children:(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,width:`100%`,children:[(0,Q.jsx)(A,{name:`folder`,size:`1.25rem`,color:`inherit`}),(0,Q.jsx)(I,{as:`span`,variant:`inherit`,m:0,children:`Documents`})]})})},rO=t({Default:()=>aO,Rounded:()=>oO,default:()=>iO}),iO={title:`Theme/Quote`,component:ee,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`bg`,`p`,`m`,`borderRadius`]}},args:{bg:`terminal`,p:3},argTypes:{bg:VS,p:US,m:WS,borderRadius:sC},render:e=>(0,Q.jsx)(ee,{...e,children:(0,Q.jsx)(I,{variant:`body1`,color:`secondary`,m:0,children:`A View with a 2px primary left border - for terminal readouts and markdown blockquotes.`})})},aO={},oO={args:{borderRadius:`md`}},sO=t({Checked:()=>uO,Colors:()=>pO,Controlled:()=>_O,CustomIcons:()=>hO,Default:()=>lO,Group:()=>gO,Sizes:()=>mO,States:()=>fO,WithLabel:()=>dO,default:()=>cO}),cO={title:`Theme/Radio`,component:At,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`checked`,`disabled`,`color`,`size`,`children`,`m`]}},argTypes:{checked:{control:`boolean`,description:"Controlled checked state. Must be paired with `onChange`.",table:{category:`State`}},disabled:{control:`boolean`,description:`Disables the radio.`,table:{category:`State`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:mt,description:'Stroke/fill color. `"default"` resolves to `theme.text.secondary`; others to `theme.palette[color].main`.',table:{category:`Visual`,defaultValue:{summary:`default`}}},size:{control:{type:`inline-radio`},options:Zt,description:`Icon size.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},children:{control:`text`,description:`Label text rendered next to the radio.`,table:{category:`Content`}},m:WS}},lO={args:{color:`default`,size:`md`}},uO={args:{checked:!0,color:`primary`},render:e=>(0,Q.jsx)(At,{...e,onChange:()=>{}})},dO={args:{children:`Option A`,color:`primary`}},fO={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:2,children:[{label:`Unchecked`,props:{}},{label:`Checked`,props:{checked:!0,onChange:()=>{}}},{label:`Disabled unchecked`,props:{disabled:!0}},{label:`Disabled checked`,props:{disabled:!0,checked:!0,onChange:()=>{}}}].map(({label:e,props:t})=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`10rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(At,{color:`primary`,...t})]},e))})},pO={render:()=>(0,Q.jsx)(kw,{controls:e=>(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(At,{color:e}),(0,Q.jsx)(At,{color:e,checked:!0,onChange:()=>{}})]})})},mO={render:()=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(At,{size:e,color:`primary`,checked:!0,onChange:()=>{}}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e})]},e))})},hO={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsx)(At,{color:`primary`,icon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`○`}),checkedIcon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`●`}),children:`Custom icons (unchecked)`}),(0,Q.jsx)(At,{color:`primary`,checked:!0,onChange:()=>{},icon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`○`}),checkedIcon:(0,Q.jsx)(`span`,{style:{fontSize:`1.2em`},children:`●`}),children:`Custom icons (checked)`})]})},gO={decorators:[(e,t)=>{let[n,r]=(0,q.useState)(`b`);return(0,Q.jsx)(e,{args:{...t.args,selected:n,setSelected:r}})}],render:({selected:e,setSelected:t})=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[[`a`,`b`,`c`].map(n=>(0,Q.jsxs)(At,{color:`primary`,name:`demo`,value:n,checked:e===n,onChange:()=>t(n),children:[`Option `,n.toUpperCase()]},n)),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,mt:1,mb:0,children:[`Selected: `,e]})]})},_O={decorators:[Dw],render:({checked:e,onChange:t})=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(At,{color:`primary`,checked:e,onChange:t,children:[e?`Selected`:`Unselected`,` - click to toggle`]}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`State: `,String(e)]})]})},vO=t({Controlled:()=>OO,Default:()=>xO,ErrorState:()=>TO,Multiple:()=>AO,Native:()=>SO,Sizes:()=>wO,Variants:()=>CO,WithDividers:()=>EO,default:()=>bO}),yO=[(0,Q.jsx)(yt,{value:`web`,children:`Web`},`web`),(0,Q.jsx)(yt,{value:`android`,children:`Android`},`android`),(0,Q.jsx)(yt,{value:`ios`,children:`iOS`},`ios`),(0,Q.jsx)(yt,{value:`desktop`,disabled:!0,children:`Desktop (soon)`},`desktop`)],bO={title:`Theme/Select`,component:It,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`native`,`multiple`,`autoWidth`,`variant`,`color`,`textColor`,`bg`,`size`,`borderRadius`,`disabled`,`error`,`required`,`fullWidth`,`placeholder`,`iconName`,`p`,`m`,`width`,`minWidth`,`maxWidth`]}},args:{children:yO,placeholder:`Pick a platform`,variant:`outlined`},argTypes:{native:{control:`boolean`,description:"Render a native `<select>` (single-select) instead of the custom listbox.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},multiple:{control:`boolean`,description:`Allow selecting several options. Ignored on the native path.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},autoWidth:{control:`boolean`,description:"Size the trigger to the current selection. When `false` (default) it reserves the widest option's width, avoiding layout shift on selection.",table:{category:`Layout`,defaultValue:{summary:`false`}}},variant:{control:{type:`select`},options:Xt,description:"`outlined`/`default` - full border box · `underline` - bottom border only · `text` - no border.",table:{category:`Visual`,defaultValue:{summary:`default`}}},color:{control:{type:`select`},options:$e,description:"Focus/active border color - resolves to `theme.palette[color]`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},textColor:{control:{type:`select`},options:G,description:"Text color of the trigger value - resolves against `theme.text`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},bg:{control:{type:`select`},options:Ot,description:"Background color - resolves against `theme.background`.",table:{category:`Visual`,defaultValue:{summary:`terminal`}}},size:{control:{type:`select`},options:ke,description:"Controls padding and font size - resolves against `theme.sizes`.",table:{category:`Layout`,defaultValue:{summary:`md`}}},borderRadius:{control:{type:`select`},options:Et,description:"Corner radius - applies only to `default`/`outlined` variants. Resolves against `theme.radii`.",table:{category:`Layout`}},disabled:{control:`boolean`,description:`Disables the select.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},error:{control:`boolean`,description:`Marks the field as invalid - applies the error border color.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`Marks the field as required.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},fullWidth:{control:`boolean`,description:`Stretches the trigger to fill its container.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},placeholder:{control:`text`,description:`Empty-state label shown while nothing is selected.`,table:{category:`Content`}},iconName:{control:`text`,description:`Dropdown affordance icon from the Icon registry.`,table:{category:`Visual`,defaultValue:{summary:`expand_more`}}},p:US,m:WS,width:KS,minWidth:JS,maxWidth:XS}},xO={},SO={args:{native:!0}},CO={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`outlined`,`default`,`underline`,`text`].map(e=>(0,Q.jsx)(It,{variant:e,placeholder:e,children:yO},e))})},wO={render:()=>(0,Q.jsx)(L,{gap:3,alignItems:`center`,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsx)(It,{size:e,variant:`outlined`,placeholder:e,children:yO},e))})},TO={args:{error:!0}},EO={args:{placeholder:`Pick a platform`,children:[(0,Q.jsx)(yt,{value:`web`,divider:!0,children:`Web`},`web`),(0,Q.jsx)(yt,{value:`android`,divider:!0,children:`Android`},`android`),(0,Q.jsx)(yt,{value:`ios`,children:`iOS`},`ios`)]}};function DO(e){let[t,n]=(0,q.useState)(`web`);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,style:{maxWidth:240},children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,children:[`Selected: `,String(t)]}),(0,Q.jsx)(It,{variant:`outlined`,value:t,onChange:n,...e,children:yO})]})}var OO={render:()=>(0,Q.jsx)(DO,{})};function kO(){let[e,t]=(0,q.useState)([`web`,`ios`]);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,children:[`Selected: `,Array.isArray(e)?e.join(`, `)||`none`:e]}),(0,Q.jsx)(It,{multiple:!0,variant:`outlined`,placeholder:`Pick platforms`,value:e,onChange:t,children:yO})]})}var AO={render:()=>(0,Q.jsx)(kO,{})},jO=t({Default:()=>NO,Open:()=>PO,PanelOpenRail:()=>BO,PanelRightAnchored:()=>VO,PanelStyled:()=>HO,RightAnchored:()=>FO,Tinted:()=>IO,WithPanel:()=>zO,default:()=>MO}),MO={title:`Theme/Sidebar`,component:wt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`isOpen`,`anchor`,`variant`,`expandedWidth`,`collapsedWidth`,`hasPanel`,`panelWidth`,`bg`,`aria-label`]}},args:{isOpen:!1,anchor:`left`,"aria-label":`Editor panels`},argTypes:{isOpen:{control:`boolean`,description:`Whether item labels are shown. Controlled by the consumer (e.g. an app-bar menu button).`,table:{category:`Layout`}},anchor:{control:`radio`,options:[`left`,`right`],description:`Screen edge the rail hugs - labels render away from it.`,table:{category:`Layout`}},variant:{control:`radio`,options:[`text`,`outlined`,`plain`],description:"Default variant for every item - an item's own `variant` wins.",table:{category:`Visual`,defaultValue:{summary:`text`}}},expandedWidth:{control:`text`,description:`Rail width while open.`,table:{category:`Layout`}},collapsedWidth:{control:`text`,description:`Rail width while collapsed (icons only).`,table:{category:`Layout`}},hasPanel:{control:`boolean`,description:"Render a second column holding the selected item's `children`. Off by default, where children render inline in the item row instead.",table:{category:`Layout`,defaultValue:{summary:`false`}}},panelWidth:{control:`text`,description:"Width of the panel column. Only meaningful with `hasPanel`.",table:{category:`Layout`,defaultValue:{summary:`18rem`}}},panelProps:{control:!1,description:"Props for the panel column - any `Flex` prop, plus `as`. Overrides `panelWidth` and the derived `aria-label`.",table:{category:`Layout`}},bg:VS,"aria-label":{control:`text`,description:`Accessible name of the navigation landmark.`,table:{category:`Content`}}},render:e=>(0,Q.jsxs)(wt,{...e,children:[(0,Q.jsx)(Pt,{icon:`folder`,label:`Directory`,isSelected:!0}),(0,Q.jsx)(Pt,{icon:`history`,label:`Gist history`}),(0,Q.jsx)(Pt,{icon:`edit_note`,label:`Drafts`}),(0,Q.jsx)(Pt,{icon:`terminal`,label:`Terminal console`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,p:2,mt:`auto`,children:`v1.1.0`})]})},NO={},PO={args:{isOpen:!0}},FO={args:{anchor:`right`,isOpen:!0}},IO={args:{isOpen:!0,bg:`paper`}},LO=[{id:`directory`,icon:`folder`,label:`Directory`,lines:[`README.md`,`notes.md`]},{id:`gists`,icon:`history`,label:`Gist history`,lines:[`snippet.ts`,`scratch.md`]},{id:`drafts`,icon:`edit_note`,label:`Drafts`,lines:[`Untitled`,`Release post`]}],RO=e=>{let[t,n]=(0,q.useState)(`directory`);return(0,Q.jsx)(wt,{...e,"aria-label":e[`aria-label`]??`Editor panels`,isOpen:e.isOpen??!1,hasPanel:!0,children:LO.map(({id:e,icon:r,label:i,lines:a})=>(0,Q.jsx)(Pt,{icon:r,label:i,isSelected:t===e,onSelect:()=>n(t===e?null:e),children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,p:2,children:[(0,Q.jsx)(I,{variant:`subtitle2`,m:0,children:i}),a.map(e=>(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:e},e))]})},e))})},zO={args:{isOpen:!1,hasPanel:!0},render:e=>(0,Q.jsx)(RO,{...e})},BO={...zO,args:{isOpen:!0,hasPanel:!0}},VO={...zO,args:{isOpen:!0,hasPanel:!0,anchor:`right`}},HO={...zO,args:{isOpen:!0,hasPanel:!0,bg:`grid`,panelProps:{as:`aside`,bg:`paper`,width:`22rem`,borderLeft:`thin`}}},UO=t({Default:()=>GO,Disabled:()=>YO,Outlined:()=>qO,Selected:()=>KO,WithChildren:()=>JO,default:()=>WO}),WO={title:`Theme/Sidebar/SidebarItem`,component:Pt,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`icon`,`label`,`variant`,`isSelected`,`disabled`]}},args:{icon:`folder`,label:`Directory`,variant:`text`},argTypes:{icon:{control:`select`,options:Object.keys(ce),description:`Icon shown in both the collapsed and open states.`,table:{category:`Content`}},label:{control:`text`,description:`Accessible name; also the default visible content while open.`,table:{category:`Content`}},variant:{control:`radio`,options:[`text`,`outlined`,`plain`],description:"Borderless (`text`), bordered (`outlined`), or `plain` - no fill or hover feedback.",table:{category:`Visual`}},isSelected:{control:`boolean`,description:"Active state - drives `aria-pressed` and the selected fill.",table:{category:`State`}},disabled:{control:`boolean`,description:`Disables the item.`,table:{category:`State`}}},render:e=>(0,Q.jsx)(wt,{"aria-label":`Panels`,isOpen:!0,children:(0,Q.jsx)(Pt,{...e})})},GO={},KO={args:{isSelected:!0,icon:`terminal`,label:`Terminal console`}},qO={args:{variant:`outlined`,icon:`history`,label:`Gist history`}},JO={args:{icon:`edit_note`,label:`Drafts`},render:e=>(0,Q.jsx)(wt,{"aria-label":`Panels`,isOpen:!0,children:(0,Q.jsx)(Pt,{...e,children:(0,Q.jsx)(`span`,{children:`Drafts (3)`})})})},YO={args:{disabled:!0,icon:`history`,label:`Gist history`}},XO=t({Animations:()=>nk,InferredFromChildren:()=>ik,MediaCard:()=>ak,PostCard:()=>ck,PostCardGrid:()=>lk,Text:()=>ek,Variants:()=>tk,WaveInSync:()=>rk,default:()=>$O}),ZO=`(min-width: 640px) min(30vw, 400px), 100vw`,QO={sources:{},img:{src:`/soroush.svg`}},$O={title:`Theme/Skeleton`,component:Ut,tags:[`autodocs`],args:{variant:`text`,animation:`pulse`},parameters:{layout:`padded`,controls:{include:[`variant`,`borderRadius`,`animation`,`width`,`height`,`children`,`m`]}},argTypes:{variant:{control:{type:`select`},options:H,description:`Shape of the placeholder.`,table:{category:`Layout`,defaultValue:{summary:`text`}}},animation:{control:{type:`select`},options:tt,description:"Loading animation - `false` disables it.",table:{category:`Behavior`,defaultValue:{summary:`pulse`}}},children:{control:`text`,description:`Content to infer width and height from - rendered invisibly.`,table:{category:`Content`}},borderRadius:sC,width:KS,height:qS,m:WS}},ek={args:{width:240}},tk={render:({animation:e})=>(0,Q.jsx)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:H.map(t=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,alignItems:`center`,children:[(0,Q.jsx)(Ut,{variant:t,width:64,height:t===`text`?void 0:64,animation:e}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:t})]},t))})},nk={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:tt.map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e===!1?`false (none)`:e}),(0,Q.jsx)(Ut,{variant:`rectangular`,borderRadius:`md`,width:`100%`,height:24,animation:e})]},String(e)))})},rk={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsx)(Ut,{variant:`rectangular`,borderRadius:`md`,width:`90%`,height:20,animation:`wave`}),(0,Q.jsx)(Ut,{variant:`rectangular`,borderRadius:`md`,width:`40%`,height:20,animation:`wave`}),(0,Q.jsx)(Ut,{variant:`rectangular`,borderRadius:`md`,width:`65%`,height:20,animation:`wave`})]})},ik={render:({animation:e})=>(0,Q.jsx)(Ut,{animation:e,children:(0,Q.jsx)(I,{variant:`h3`,m:0,children:`Loading title`})})},ak={render:({animation:e})=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(Ut,{variant:`circular`,width:40,height:40,animation:e}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,flex:1,children:[(0,Q.jsx)(Ut,{variant:`text`,width:`60%`,animation:e}),(0,Q.jsx)(Ut,{variant:`text`,width:`40%`,animation:e})]})]})},ok=({animation:e})=>(0,Q.jsxs)(O,{flexDirection:`column`,gap:2,p:3,width:`100%`,children:[(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(Ut,{variant:`circular`,width:44,height:44,animation:e}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,flex:1,children:[(0,Q.jsx)(Ut,{variant:`text`,width:`55%`,animation:e}),(0,Q.jsx)(Ut,{variant:`text`,width:`35%`,animation:e})]})]}),(0,Q.jsx)(Ut,{variant:`rectangular`,borderRadius:`md`,width:`100%`,height:400,animation:e}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(Ut,{variant:`text`,width:`90%`,animation:e}),(0,Q.jsx)(Ut,{variant:`text`,width:`80%`,animation:e})]})]}),sk=()=>(0,Q.jsxs)(nn,{variant:`paper`,flexDirection:`column`,gap:2,p:3,width:`100%`,children:[(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(Qe,{size:`md`,bg:`secondary`,children:`MS`}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:0,children:[(0,Q.jsx)(I,{variant:`subtitle2`,m:0,children:`Masoud Soroush`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:1,children:`@soroush`})]})]}),(0,Q.jsx)(F,{borderRadius:`md`,overflow:`hidden`,width:`100%`,height:400,children:(0,Q.jsxs)(`picture`,{children:[Object.entries(QO.sources).map(([e,t])=>(0,Q.jsx)(`source`,{srcSet:t,type:`image/${e}`,sizes:ZO},e)),(0,Q.jsx)(E,{src:QO.img.src,sizes:ZO,alt:`Portrait of Masoud Soroush, Principal Software Engineer`,width:`100%`,objectFit:`cover`,borderRadius:`md`})]})}),(0,Q.jsx)(I,{variant:`body2`,color:`secondary`,m:0,children:`Building a design system from the ground up tokens, primitives, and the craft behind consistent, accessible components.`})]}),ck={render:({animation:e})=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:4,alignItems:`flex-start`,flexWrap:`wrap`,children:[(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,width:360,children:[(0,Q.jsx)(I,{variant:`overline`,color:`secondary`,m:0,children:`Loading`}),(0,Q.jsx)(ok,{animation:e})]}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,width:360,children:[(0,Q.jsx)(I,{variant:`overline`,color:`secondary`,m:0,children:`Loaded`}),(0,Q.jsx)(sk,{})]})]})},lk={render:({animation:e})=>(0,Q.jsx)(a,{gridTemplateColumns:`2fr 1fr`,gap:3,children:Array.from({length:4},(t,n)=>(0,Q.jsx)(ok,{animation:e},n))})},uk=t({Colors:()=>hk,Controlled:()=>yk,Default:()=>mk,Disabled:()=>_k,Marked:()=>Sk,Sizes:()=>gk,Variants:()=>xk,WithIcons:()=>Ck,WithLabel:()=>bk,default:()=>pk}),dk=()=>(0,Q.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`0.6em`,height:`0.6em`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,"aria-hidden":`true`,children:[(0,Q.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`}),(0,Q.jsx)(`path`,{d:`M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41`})]}),fk=()=>(0,Q.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`0.6em`,height:`0.6em`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,Q.jsx)(`path`,{d:`M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z`})}),pk={title:`Theme/Switch`,component:ct,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`checked`,`disabled`,`color`,`bg`,`size`,`variant`,`marked`,`edge`,`children`,`m`]}},argTypes:{checked:{control:`boolean`,description:`Controlled checked state.`,table:{category:`Visual`}},disabled:{control:`boolean`,description:`Disables the switch.`,table:{category:`Visual`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:kt,description:"Track and thumb color when checked. Resolves to `theme.palette[color].dark` for the track and `theme.palette[color].main` for the thumb.",table:{category:`Visual`,defaultValue:{summary:`default`}}},bg:{control:{type:`select`},options:Ot,description:"Track background color in the unchecked state. Uses `theme.background` tokens. Defaults to `theme.background.primary` when not set.",table:{category:`Visual`}},size:{control:{type:`inline-radio`},options:Dt,description:'Track and thumb size. Applies to both `"outside"` and `"inside"` variants.',table:{category:`Visual`,defaultValue:{summary:`md`}}},variant:{control:{type:`inline-radio`},options:Ue,description:'`"outside"` - thumb overflows the track vertically (MUI-style). `"inside"` - thumb is contained within the track (iOS-style). The `size` prop works for both.',table:{category:`Visual`,defaultValue:{summary:`outside`}}},marked:{control:`boolean`,description:'Shows ✓/✕ indicators. For `"outside"`, SVG icons appear inside the thumb. For `"inside"`, marks appear as CSS pseudo-elements in the track.',table:{category:`Visual`,defaultValue:{summary:`false`}}},edge:{control:{type:`inline-radio`},options:V,description:`Applies a negative margin to counteract root padding on the given side. Useful when the switch sits at the edge of a layout.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},children:{control:`text`,description:`Label text rendered next to the switch.`,table:{category:`Content`}},m:WS}},mk={args:{color:`default`,size:`md`,variant:`outside`,"aria-label":`Toggle`}},hk={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:2,children:kt.map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(ct,{color:e,"aria-label":`${e} off`}),(0,Q.jsx)(ct,{color:e,checked:!0,onChange:()=>{},"aria-label":`${e} on`})]},e))})},gk={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`outside`,`inside`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,gap:4,alignItems:`center`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,m:0,children:e}),[`sm`,`md`,`lg`].map(t=>(0,Q.jsxs)(L,{flexDirection:`column`,alignItems:`center`,gap:1,children:[(0,Q.jsx)(ct,{variant:e,size:t,color:`primary`,checked:!0,onChange:()=>{},"aria-label":`${e} ${t}`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:t})]},t))]},e))})},_k={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:2,children:[{label:`Disabled off`,props:{disabled:!0}},{label:`Disabled on`,props:{disabled:!0,checked:!0,onChange:()=>{}}}].map(({label:e,props:t})=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:2,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`8rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(ct,{color:`primary`,...t,"aria-label":e})]},e))})},vk=(e,t)=>{let[n,r]=(0,q.useState)(!1);return(0,Q.jsx)(e,{args:{...t.args,checked:n,onChange:e=>r(e.target.checked)}})},yk={decorators:[vk],render:({checked:e,onChange:t})=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,children:[(0,Q.jsxs)(ct,{color:`primary`,checked:e,onChange:t,children:[e?`On`:`Off`,` - click to toggle`]}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`State: `,String(e)]})]})},bk={args:{children:`Enable dark mode`,color:`primary`}},xk={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`outside`,`inside`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(ct,{variant:e,color:`primary`,"aria-label":`${e} off`}),(0,Q.jsx)(ct,{variant:e,color:`primary`,checked:!0,onChange:()=>{},"aria-label":`${e} on`})]},e))})},Sk={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`outside`,`inside`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(ct,{variant:e,marked:!0,color:`primary`,"aria-label":`${e} marked off`}),(0,Q.jsx)(ct,{variant:e,marked:!0,color:`primary`,checked:!0,onChange:()=>{},"aria-label":`${e} marked on`})]},e))})},Ck={decorators:[vk],render:({checked:e,onChange:t,...n})=>(0,Q.jsx)(O,{p:2,children:(0,Q.jsx)(L,{flexDirection:`column`,gap:3,children:[`sm`,`md`,`lg`].map(r=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`3rem`,flexShrink:0,m:0,children:r}),(0,Q.jsx)(ct,{size:r,variant:`outside`,color:`primary`,...n,checked:e,onChange:t,icon:(0,Q.jsx)(fk,{}),checkedIcon:(0,Q.jsx)(dk,{}),"aria-label":`outside ${r} theme toggle`}),(0,Q.jsx)(ct,{variant:`inside`,size:r,color:`primary`,...n,checked:e,onChange:t,icon:(0,Q.jsx)(fk,{}),checkedIcon:(0,Q.jsx)(dk,{}),"aria-label":`inside ${r} theme toggle`})]},r))})})},wk=t({Composed:()=>Ak,Default:()=>kk,Dense:()=>jk,RowSelection:()=>Nk,default:()=>Ok}),Tk=[{service:`web`,region:`fra1`,status:`healthy`,latency:42},{service:`api`,region:`fra1`,status:`healthy`,latency:87},{service:`worker`,region:`iad1`,status:`degraded`,latency:213},{service:`cron`,region:`iad1`,status:`healthy`,latency:55},{service:`edge`,region:`sin1`,status:`healthy`,latency:12},{service:`db-proxy`,region:`fra1`,status:`healthy`,latency:31},{service:`queue`,region:`sfo1`,status:`degraded`,latency:158},{service:`auth`,region:`fra1`,status:`healthy`,latency:64},{service:`cdn`,region:`global`,status:`healthy`,latency:8},{service:`search`,region:`iad1`,status:`healthy`,latency:96},{service:`mailer`,region:`sfo1`,status:`healthy`,latency:120},{service:`metrics`,region:`sin1`,status:`degraded`,latency:176}];function Ek({sort:e}){return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(T,{sortDirection:e.service.isActive?e.service.direction:void 0,children:(0,Q.jsx)(D,{...e.service,children:`Service`})}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{children:`Status`}),(0,Q.jsx)(T,{align:`right`,sortDirection:e.latency.isActive?e.latency.direction:void 0,children:(0,Q.jsx)(D,{...e.latency,children:`Latency (ms)`})})]})}function Dk({children:e,...t}){let n=j([`service`,`latency`]);return(0,Q.jsxs)(k,{...t,children:[(0,Q.jsx)(y,{children:(0,Q.jsx)(v,{children:(0,Q.jsx)(Ek,{sort:n})})}),(0,Q.jsx)(M,{children:(0,Q.jsx)(h,{data:Tk,sort:n,children:e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.service}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{children:e.status}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.service)})}),e]})}var Ok={title:`Theme/Table/Table`,component:k,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`size`,`cellPadding`,`hasStickyHeader`,`shouldHideSortIcon`,`hasEllipsis`,`align`,`color`,`bg`,`p`,`m`,`width`,`height`,`minWidth`,`minHeight`,`maxWidth`,`maxHeight`,`display`,`border`,`borderWidth`,`borderStyle`,`borderColor`,`borderRadius`]}},argTypes:{align:{control:{type:`select`},options:[`left`,`right`,`center`,`justify`],description:'Default text alignment for every cell - cells with `align="inherit"` follow it.',table:{category:`Layout`}},size:{control:{type:`select`},options:Le,description:"Cell density - broadcast to descendant `TableCell`s via `TableContext`.",table:{category:`Layout`,defaultValue:{summary:`md`}}},cellPadding:{control:{type:`select`},options:Je,description:"Cell padding mode - `none` zeroes cell padding.",table:{category:`Layout`,defaultValue:{summary:`normal`}}},hasStickyHeader:{control:`boolean`,description:"Makes header cells stick to the top of a scrolling `TableContainer` with a bounded height.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldHideSortIcon:{control:`boolean`,description:"Hides inactive sort icons (revealed on hover/focus) - broadcast to `TableSortLabel`s via `TableContext`. Set `false` to keep them always visible (dimmed).",table:{category:`Behavior`,defaultValue:{summary:`true`}}},hasEllipsis:{control:`boolean`,description:"Truncates overflowing cell text with an ellipsis - broadcast to `TableCell`s via `TableContext`. Cells need a constrained width for the truncation to kick in.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:qe,description:"Palette color for descendant rows' hover/selected shading - broadcast to `TableRow`s via `TableContext`; a row's own `color` wins.",table:{category:`Visual`}},bg:VS,p:US,m:WS,width:KS,height:qS,minWidth:JS,minHeight:YS,maxWidth:XS,maxHeight:ZS,display:QS,border:rC,borderWidth:iC,borderStyle:aC,borderColor:oC,borderRadius:sC}},kk={render:e=>(0,Q.jsx)(Dk,{...e})},Ak={render:e=>(0,Q.jsx)(i,{maxHeight:`320px`,borderColor:`light`,borderWidth:`thin`,borderStyle:`solid`,children:(0,Q.jsx)(Dk,{hasStickyHeader:!0,...e,children:(0,Q.jsx)(b,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{colSpan:3,children:`Total services`}),(0,Q.jsx)(T,{align:`right`,children:Tk.length})]})})})})},jk={render:()=>(0,Q.jsx)(Dk,{size:`sm`,bg:`paper`})};function Mk(){let e=w(Tk.map(e=>e.service)),t=ne({defaultRowsPerPage:5}),n=j([`service`,`latency`]);return(0,Q.jsxs)(k,{size:`sm`,shouldHideSortIcon:!1,children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:(0,Q.jsx)(S,{size:`sm`,color:`primary`,...e.all,"aria-label":`Select all deployments`})}),(0,Q.jsx)(Ek,{sort:n})]})}),(0,Q.jsx)(M,{children:(0,Q.jsx)(h,{data:Tk,sort:n,pagination:t,children:t=>(0,Q.jsxs)(v,{isHoverable:!0,isSelected:e.isSelected(t.service),children:[(0,Q.jsx)(T,{children:(0,Q.jsx)(S,{size:`sm`,color:`primary`,...e.row(t.service),"aria-label":`Select ${t.service}`})}),(0,Q.jsx)(T,{children:t.service}),(0,Q.jsx)(T,{children:t.region}),(0,Q.jsx)(T,{children:t.status}),(0,Q.jsx)(T,{align:`right`,children:t.latency})]},t.service)})}),(0,Q.jsx)(b,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{colSpan:2,children:(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,as:`span`,children:[e.selected.length,` of `,Tk.length,` selected`]})}),(0,Q.jsx)(l,{count:Tk.length,...t,rowsPerPageOptions:[5,10],colSpan:3})]})})]})}var Nk={render:()=>(0,Q.jsx)(Mk,{})},Pk=t({Default:()=>Lk,default:()=>Ik}),Fk=[{service:`web`,region:`fra1`,latency:42},{service:`api`,region:`fra1`,latency:87},{service:`worker`,region:`iad1`,latency:213}],Ik={title:`Theme/Table/TableBody`,component:M,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`color`,`bg`,`borderColor`,`p`,`m`,`border`,`borderWidth`,`borderStyle`]}},argTypes:{color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`.",table:{category:`Visual`}},bg:VS,borderColor:oC,p:US,m:WS,border:rC,borderWidth:iC,borderStyle:aC}},Lk={render:e=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`Service`}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{align:`right`,children:`Latency (ms)`})]})}),(0,Q.jsx)(M,{...e,children:Fk.map(e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.service}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.service))})]})},Rk=t({Default:()=>Vk,Densities:()=>Hk,default:()=>zk}),zk={title:`Theme/Table/TableCell`,component:T,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`variant`,`align`,`size`,`cellPadding`,`sortDirection`,`hasEllipsis`,`scope`,`color`,`bg`,`borderColor`,`fontFamily`,`fontSize`,`fontWeight`,`lineHeight`,`letterSpacing`,`p`,`m`,`border`,`borderWidth`,`borderStyle`]}},argTypes:{variant:{control:{type:`select`},options:Ne,description:'Cell type - inherited from the enclosing section (`TableHead`/`TableBody`/`TableFooter`), overridable per cell. `head` renders `<th scope="col">`.',table:{category:`Behavior`}},align:{control:{type:`select`},options:Ge,description:`Text alignment of the cell content. Numbers should be right-aligned.`,table:{category:`Layout`,defaultValue:{summary:`inherit`}}},size:{control:{type:`select`},options:Le,description:"Cell density - inherited from the `Table`, overridable per cell.",table:{category:`Layout`}},cellPadding:{control:{type:`select`},options:Je,description:"Padding mode - inherited from the `Table`. `none` zeroes padding.",table:{category:`Layout`}},sortDirection:{control:{type:`select`},options:[`asc`,`desc`],description:"Sets `aria-sort` on the cell - pair with `TableSortLabel` for the control.",table:{category:`Behavior`}},hasEllipsis:{control:`boolean`,description:"Truncates overflowing text with an ellipsis - inherits the `Table`'s `hasEllipsis`. Needs a constrained width (e.g. `maxWidth`) to kick in.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},scope:{control:`text`,description:"Native scope attribute - defaults to `col` on header cells for screen-reader navigation.",table:{category:`Behavior`}},color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`.",table:{category:`Visual`}},bg:VS,borderColor:oC,fontFamily:{control:{type:`select`},options:ut,description:"Font family - resolves against `theme.fonts`.",table:{category:`Typography`}},fontSize:{control:{type:`select`},options:Ye,description:"Font size index - resolves against `theme.fontSizes`.",table:{category:`Typography`}},fontWeight:{control:{type:`select`},options:vt,description:"Font weight - resolves against `theme.fontWeights`.",table:{category:`Typography`}},lineHeight:{control:{type:`select`},options:jt,description:"Line height - resolves against `theme.lineHeights`.",table:{category:`Typography`}},letterSpacing:{control:{type:`select`},options:ht,description:"Letter spacing - resolves against `theme.letterSpacings`.",table:{category:`Typography`}},p:US,m:WS,border:rC,borderWidth:iC,borderStyle:aC}},Bk=[{service:`web`,region:`fra1`,latency:42},{service:`api`,region:`fra1`,latency:87},{service:`worker`,region:`iad1`,latency:213}],Vk={render:e=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{...e,children:`Service`}),(0,Q.jsx)(T,{...e,children:`Region`}),(0,Q.jsx)(T,{align:`right`,...e,children:`Latency (ms)`})]})}),(0,Q.jsx)(M,{children:Bk.map(t=>(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{...e,children:t.service}),(0,Q.jsx)(T,{...e,children:t.region}),(0,Q.jsx)(T,{align:`right`,...e,children:t.latency})]},t.service))})]})},Hk={render:()=>(0,Q.jsx)(k,{children:(0,Q.jsx)(M,{children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsxs)(v,{children:[(0,Q.jsxs)(T,{size:e,children:[e,` density`]}),(0,Q.jsx)(T,{size:e,align:`right`,children:`42`})]},e))})})},Uk=t({WideTableScrolls:()=>Kk,default:()=>Gk}),Wk=Array.from({length:12},(e,t)=>`Metric ${t+1}`),Gk={title:`Theme/Table/TableContainer`,component:i,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`bg`,`opacity`,`cursor`,`p`,`m`,`width`,`height`,`minWidth`,`minHeight`,`maxWidth`,`maxHeight`,`display`,`position`,`border`,`borderWidth`,`borderStyle`,`borderColor`,`borderRadius`]}},argTypes:{bg:VS,opacity:HS,cursor:eC,p:US,m:WS,width:KS,height:qS,minWidth:JS,minHeight:YS,maxWidth:XS,maxHeight:ZS,display:QS,position:$S,border:rC,borderWidth:iC,borderStyle:aC,borderColor:oC,borderRadius:sC}},Kk={args:{maxWidth:`480px`},render:e=>(0,Q.jsx)(i,{...e,children:(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsx)(v,{children:Wk.map(e=>(0,Q.jsx)(T,{style:{whiteSpace:`nowrap`},children:e},e))})}),(0,Q.jsx)(M,{children:(0,Q.jsx)(v,{children:Wk.map(e=>(0,Q.jsx)(T,{align:`right`,children:e.length},e))})})]})})},qk=t({Default:()=>Qk,SortOnlyTable:()=>eA,default:()=>Yk}),Jk=[`fra1`,`iad1`,`sfo1`,`sin1`],Yk={title:`Theme/Table/TableControl`,component:h,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`data`]}},args:{data:Array.from({length:23},(e,t)=>({name:`service-${String(t+1).padStart(2,`0`)}`,region:Jk[t%Jk.length],latency:8+t*13%220}))},argTypes:{data:{control:`object`,description:"The full dataset - `TableControl` derives the visible rows from it.",table:{category:`Content`}}}};function Xk({sort:e}){return(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{sortDirection:e.name.isActive?e.name.direction:void 0,children:(0,Q.jsx)(D,{...e.name,children:`Service`})}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{align:`right`,sortDirection:e.latency.isActive?e.latency.direction:void 0,children:(0,Q.jsx)(D,{...e.latency,children:`Latency (ms)`})})]})})}function Zk({data:e}){let t=j([`name`,`latency`]),n=ne({defaultRowsPerPage:5});return(0,Q.jsxs)(k,{size:`sm`,shouldHideSortIcon:!1,children:[(0,Q.jsx)(Xk,{sort:t}),(0,Q.jsx)(M,{children:(0,Q.jsx)(h,{data:e,sort:t,pagination:n,children:e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.name}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.name)})}),(0,Q.jsx)(b,{children:(0,Q.jsx)(v,{children:(0,Q.jsx)(l,{count:e.length,...n,rowsPerPageOptions:[5,10,{label:`All`,value:-1}]})})})]})}var Qk={render:e=>(0,Q.jsx)(Zk,{data:[...e.data]})};function $k({data:e}){let t=j([`name`,`latency`]);return(0,Q.jsxs)(k,{size:`sm`,shouldHideSortIcon:!1,children:[(0,Q.jsx)(Xk,{sort:t}),(0,Q.jsx)(M,{children:(0,Q.jsx)(h,{data:e.slice(0,6),sort:t,children:e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.name}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.name)})})]})}var eA={render:e=>(0,Q.jsx)($k,{data:[...e.data]})},tA=t({Default:()=>iA,default:()=>rA}),nA=[{service:`web`,region:`fra1`,latency:42},{service:`api`,region:`fra1`,latency:87},{service:`worker`,region:`iad1`,latency:213}],rA={title:`Theme/Table/TableFooter`,component:b,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`color`,`bg`,`borderColor`,`p`,`m`,`border`,`borderWidth`,`borderStyle`]}},argTypes:{color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`.",table:{category:`Visual`}},bg:VS,borderColor:oC,p:US,m:WS,border:rC,borderWidth:iC,borderStyle:aC}},iA={render:e=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`Service`}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{align:`right`,children:`Latency (ms)`})]})}),(0,Q.jsx)(M,{children:nA.map(e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.service}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.service))}),(0,Q.jsx)(b,{...e,children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{colSpan:2,children:`Total services`}),(0,Q.jsx)(T,{align:`right`,children:nA.length})]})})]})},aA=t({Default:()=>cA,default:()=>sA}),oA=[{service:`web`,region:`fra1`,latency:42},{service:`api`,region:`fra1`,latency:87},{service:`worker`,region:`iad1`,latency:213}],sA={title:`Theme/Table/TableHead`,component:y,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`color`,`bg`,`borderColor`,`p`,`m`,`border`,`borderWidth`,`borderStyle`]}},argTypes:{color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`.",table:{category:`Visual`}},bg:VS,borderColor:oC,p:US,m:WS,border:rC,borderWidth:iC,borderStyle:aC}},cA={render:e=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{...e,children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`Service`}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{align:`right`,children:`Latency (ms)`})]})}),(0,Q.jsx)(M,{children:oA.map(e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.service}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.service))})]})},lA=t({Default:()=>_A,InAFullTable:()=>yA,default:()=>uA}),uA={title:`Theme/Table/TablePagination`,component:l,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`count`,`page`,`rowsPerPage`,`rowsPerPageOptions`,`disabled`,`shouldShowFirstButton`,`shouldShowLastButton`,`rowsPerPageLabel`,`colSpan`,`size`,`cellPadding`,`color`,`bg`,`p`,`m`]}},args:{count:100,page:2,rowsPerPage:10},argTypes:{count:fC,page:{control:{type:`number`,min:0},description:`Zero-based current page (controlled).`,table:{category:`Behavior`}},rowsPerPage:{control:{type:`number`,min:-1},description:"Rows per page; `-1` shows all rows (controlled).",table:{category:`Behavior`}},disabled:{control:`boolean`,description:`Disables all controls.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldShowFirstButton:pC,shouldShowLastButton:mC,rowsPerPageLabel:{control:`text`,description:`Label for the rows-per-page selector.`,table:{category:`Content`,defaultValue:{summary:`Rows per page:`}}},rowsPerPageOptions:{control:`object`,description:"Selector options - numbers or `{ label, value }`; fewer than two hides the selector.",table:{category:`Content`,defaultValue:{summary:`[10, 25, 50, 100]`}}},colSpan:{control:{type:`number`,min:1},description:`Spans the footer row.`,table:{category:`Layout`,defaultValue:{summary:`1000`}}},size:{control:{type:`select`},options:Le,description:"Cell density - inherited from the `Table`, overridable here.",table:{category:`Layout`}},cellPadding:{control:{type:`select`},options:Je,description:"Padding mode - inherited from the `Table`. `none` zeroes padding.",table:{category:`Layout`}},color:{control:{type:`select`},options:G,description:"Text color - resolves against `theme.text`.",table:{category:`Visual`}},bg:VS,p:US,m:WS}},dA=[`fra1`,`iad1`,`sfo1`,`sin1`],fA=[`healthy`,`healthy`,`healthy`,`degraded`],pA=Array.from({length:57},(e,t)=>({name:`service-${String(t+1).padStart(2,`0`)}`,region:dA[t%dA.length],status:fA[t*7%fA.length],latency:8+t*13%220})),mA=(e,t)=>t===-1?pA:pA.slice(e*t,(e+1)*t),hA=e=>e.map(e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.name}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{children:e.status}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.name)),gA=(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`Service`}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{children:`Status`}),(0,Q.jsx)(T,{align:`right`,children:`Latency (ms)`})]}),_A={args:{count:pA.length},render:e=>(0,Q.jsxs)(k,{size:`sm`,children:[(0,Q.jsx)(y,{children:gA}),(0,Q.jsx)(M,{children:hA(mA(e.page,e.rowsPerPage))}),(0,Q.jsx)(b,{children:(0,Q.jsx)(v,{children:(0,Q.jsx)(l,{...e})})})]})};function vA(){let e=ne({defaultRowsPerPage:10});return(0,Q.jsxs)(k,{size:`sm`,children:[(0,Q.jsx)(y,{children:gA}),(0,Q.jsx)(M,{children:(0,Q.jsx)(h,{data:pA,pagination:e,children:e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.name}),(0,Q.jsx)(T,{children:e.region}),(0,Q.jsx)(T,{children:e.status}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.name)})}),(0,Q.jsx)(b,{children:(0,Q.jsx)(v,{children:(0,Q.jsx)(l,{count:pA.length,...e,shouldShowFirstButton:!0,shouldShowLastButton:!0})})})]})}var yA={render:()=>(0,Q.jsx)(vA,{})},bA=t({Default:()=>SA,Interactive:()=>wA,default:()=>xA}),xA={title:`Theme/Table/TablePaginationActions`,component:_,tags:[`autodocs`],parameters:{layout:`centered`,controls:{include:[`count`,`page`,`rowsPerPage`,`disabled`,`shouldShowFirstButton`,`shouldShowLastButton`,`size`]}},args:{count:100,page:2,rowsPerPage:10,getItemAriaLabel:e=>`Go to ${e} page`,onPageChange:()=>{}},argTypes:{count:fC,page:{control:{type:`number`,min:0},description:`Zero-based current page.`,table:{category:`Behavior`}},rowsPerPage:{control:{type:`number`,min:-1},description:`Rows per page - used to derive the last page.`,table:{category:`Behavior`}},disabled:{control:`boolean`,description:`Disables all buttons.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},shouldShowFirstButton:pC,shouldShowLastButton:mC,size:{control:{type:`select`},options:[`sm`,`md`,`lg`],description:"Button density - resolves against `theme.sizes`.",table:{category:`Layout`,defaultValue:{summary:`sm`}}}}},SA={};function CA(){let[e,t]=(0,q.useState)(0);return(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,alignItems:`center`,children:[(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,children:[`Page `,e+1,` of 10`]}),(0,Q.jsx)(_,{count:100,page:e,rowsPerPage:10,onPageChange:t,getItemAriaLabel:e=>`Go to ${e} page`,shouldShowFirstButton:!0,shouldShowLastButton:!0})]})}var wA={render:()=>(0,Q.jsx)(CA,{})},TA=t({Default:()=>OA,States:()=>kA,default:()=>DA}),EA=[{service:`web`,region:`fra1`,latency:42},{service:`api`,region:`fra1`,latency:87},{service:`worker`,region:`iad1`,latency:213}],DA={title:`Theme/Table/TableRow`,component:v,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`isHoverable`,`isSelected`,`color`,`bg`,`borderColor`,`p`,`m`,`border`,`borderWidth`,`borderStyle`]}},argTypes:{isHoverable:{control:`boolean`,description:"Shades the row on hover with `theme.palette[color].light`.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},isSelected:{control:`boolean`,description:"Fills the row with `theme.palette[color].dark` + contrast text.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:qe,description:"Palette color for the hover/selected shading - resolves against `theme.palette`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},bg:VS,borderColor:oC,p:US,m:WS,border:rC,borderWidth:iC,borderStyle:aC}},OA={args:{isHoverable:!0},render:e=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`Service`}),(0,Q.jsx)(T,{children:`Region`}),(0,Q.jsx)(T,{align:`right`,children:`Latency (ms)`})]})}),(0,Q.jsx)(M,{children:EA.map(t=>(0,Q.jsxs)(v,{...e,children:[(0,Q.jsx)(T,{children:t.service}),(0,Q.jsx)(T,{children:t.region}),(0,Q.jsx)(T,{align:`right`,children:t.latency})]},t.service))})]})},kA={render:()=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`State`}),(0,Q.jsx)(T,{children:`Service`}),(0,Q.jsx)(T,{align:`right`,children:`Latency (ms)`})]})}),(0,Q.jsxs)(M,{children:[(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:`default`}),(0,Q.jsx)(T,{children:`web`}),(0,Q.jsx)(T,{align:`right`,children:`42`})]}),(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:`isHoverable`}),(0,Q.jsx)(T,{children:`api`}),(0,Q.jsx)(T,{align:`right`,children:`87`})]}),(0,Q.jsxs)(v,{isSelected:!0,children:[(0,Q.jsx)(T,{children:`isSelected`}),(0,Q.jsx)(T,{children:`worker`}),(0,Q.jsx)(T,{align:`right`,children:`213`})]})]})]})},AA=t({Default:()=>MA,SortableColumns:()=>FA,default:()=>jA}),jA={title:`Theme/Table/TableSortLabel`,component:D,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`isActive`,`direction`,`shouldHideSortIcon`,`iconName`,`p`,`m`]}},args:{children:`Name`,isActive:!0,direction:`asc`},argTypes:{children:{control:`text`,description:`Label contents - the arrow is appended automatically.`,table:{category:`Content`}},isActive:{control:`boolean`,description:`Active styling for the currently-sorted column.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},direction:{control:{type:`select`},options:[`asc`,`desc`],description:`Current sort direction - rotates the arrow.`,table:{category:`Behavior`,defaultValue:{summary:`asc`}}},shouldHideSortIcon:{control:`boolean`,description:"Hides the inactive sort icon, revealing it on hover/focus. Set `false` to keep it always visible (dimmed). Inherited from the enclosing `Table` via `TableContext`.",table:{category:`Behavior`,defaultValue:{summary:`true`}}},iconName:{control:`text`,description:`Sort arrow icon from the Icon registry.`,table:{category:`Visual`,defaultValue:{summary:`arrow_upward`}}},p:US,m:WS}},MA={render:({children:e,...t})=>(0,Q.jsxs)(k,{children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{children:(0,Q.jsx)(D,{...t,children:e})}),(0,Q.jsx)(T,{children:(0,Q.jsx)(D,{...t,children:`Region`})}),(0,Q.jsx)(T,{align:`right`,children:(0,Q.jsx)(D,{...t,children:`Latency (ms)`})})]})}),(0,Q.jsx)(M,{children:NA.map(e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.name}),(0,Q.jsx)(T,{children:`fra1`}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.name))})]})},NA=[{name:`web`,latency:42},{name:`api`,latency:87},{name:`worker`,latency:213}];function PA(){let e=j([`name`,`latency`]);return(0,Q.jsxs)(k,{shouldHideSortIcon:!1,children:[(0,Q.jsx)(y,{children:(0,Q.jsxs)(v,{children:[(0,Q.jsx)(T,{sortDirection:e.name.isActive?e.name.direction:void 0,children:(0,Q.jsx)(D,{...e.name,children:`Service`})}),(0,Q.jsx)(T,{align:`right`,sortDirection:e.latency.isActive?e.latency.direction:void 0,children:(0,Q.jsx)(D,{...e.latency,children:`Latency (ms)`})})]})}),(0,Q.jsx)(M,{children:(0,Q.jsx)(h,{data:NA,sort:e,children:e=>(0,Q.jsxs)(v,{isHoverable:!0,children:[(0,Q.jsx)(T,{children:e.name}),(0,Q.jsx)(T,{align:`right`,children:e.latency})]},e.name)})})]})}var FA={render:()=>(0,Q.jsx)(PA,{})},IA=t({Colors:()=>VA,Controlled:()=>KA,Default:()=>RA,FullWidth:()=>WA,MultilineAutoGrow:()=>HA,MultilineFixedRows:()=>UA,States:()=>zA,Types:()=>GA,Variants:()=>BA,default:()=>LA}),LA={title:`Theme/TextInput`,component:W,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`variant`,`color`,`textColor`,`disabled`,`error`,`readOnly`,`required`,`fullWidth`,`multiline`,`resize`,`type`,`size`,`inputSize`,`autoComplete`,`placeholder`,`rows`,`minRows`,`maxRows`,`inputProps`,`p`,`m`,`width`,`minWidth`,`maxWidth`]}},argTypes:{variant:{control:{type:`select`},options:De,description:"`outlined`/`default` - full border box · `underline` - bottom border only · `text` - no border.",table:{category:`Visual`,defaultValue:{summary:`default`}}},color:{control:{type:`select`},options:Ze,description:"Border color token. `palette[color].main` on focus · `palette[color].light` when disabled.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},textColor:{control:{type:`select`},options:G,description:"Text color of the typed value - resolves against `theme.text`.",table:{category:`Visual`,defaultValue:{summary:`primary`}}},disabled:{control:`boolean`,description:"Disables the input. Border switches to `palette[color].light`.",table:{category:`State`,defaultValue:{summary:`false`}}},error:{control:`boolean`,description:"Marks the field as invalid - border becomes `palette.error.main`.",table:{category:`State`,defaultValue:{summary:`false`}}},readOnly:{control:`boolean`,description:`Prevents changing the value while keeping the field interactive.`,table:{category:`State`,defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`Marks the field as required for form submission.`,table:{category:`State`,defaultValue:{summary:`false`}}},fullWidth:{control:`boolean`,description:`Stretches the root to fill its container.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},multiline:{control:`boolean`,description:"Renders a `<textarea>`. Combine with `resize` for auto-growing or `rows` for a fixed height.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},resize:{control:`boolean`,description:"Auto-grows the textarea as content increases. Requires `multiline`.",table:{category:`Behavior`,defaultValue:{summary:`false`}}},type:{control:{type:`select`},options:[`text`,`email`,`password`,`number`,`tel`,`url`,`search`],description:"HTML input type. Non-text types disable `multiline` and `resize`.",table:{category:`Behavior`,defaultValue:{summary:`text`}}},size:{control:{type:`select`},options:tn,description:`Controls padding and font size.`,table:{category:`Visual`,defaultValue:{summary:`md`}}},placeholder:{control:`text`,description:`Short hint displayed before the user enters a value.`,table:{category:`Content`}},rows:{control:`number`,description:`Fixes the textarea height. Also enables multiline when > 1.`,table:{category:`Behavior`}},minRows:{control:`number`,description:"Minimum rows for the auto-grow textarea. Requires `resize`.",table:{category:`Behavior`}},maxRows:{control:`number`,description:"Maximum rows before the auto-grow textarea starts scrolling. Requires `resize`.",table:{category:`Behavior`}},inputSize:{control:`number`,description:"Native HTML `size` attribute - visible width in character widths. Has no effect with `multiline` or `resize`.",table:{category:`Behavior`}},autoComplete:{control:`text`,description:"Hints the browser for autofill. Accepts any valid HTML `autocomplete` value.",table:{category:`Content`}},inputProps:{control:`object`,description:"Extra props spread onto the native element - e.g. `aria-label`, `cols`, `data-*`. Top-level props take priority.",table:{category:`Behavior`}},p:US,m:WS,width:KS,minWidth:JS,maxWidth:XS}},RA={args:{placeholder:`Enter a value...`,resize:!1}},zA={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:2,maxWidth:`360px`,children:[{label:`Default`,props:{placeholder:`Default`}},{label:`Disabled`,props:{placeholder:`Disabled`,disabled:!0}},{label:`Disabled + value`,props:{value:`Cannot edit`,disabled:!0,onChange:()=>{}}},{label:`Error`,props:{placeholder:`Invalid field`,error:!0}},{label:`Error + value`,props:{value:`bad@`,error:!0,onChange:()=>{}}}].map(({label:e,props:t})=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`8rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(W,{color:`primary`,fullWidth:!0,...t})]},e))})},BA={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,maxWidth:`560px`,children:[(0,Q.jsx)(L,{flexDirection:`row`,gap:2,mb:1,children:[`Normal`,`Disabled`,`Error`].map(e=>(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,flex:1,m:0,children:e},e))}),[`outlined`,`underline`,`text`].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,alignItems:`center`,children:[(0,Q.jsx)(W,{variant:e,color:`primary`,placeholder:`Normal`,fullWidth:!0}),(0,Q.jsx)(W,{variant:e,color:`primary`,placeholder:`Disabled`,disabled:!0,fullWidth:!0}),(0,Q.jsx)(W,{variant:e,color:`primary`,placeholder:`Error`,error:!0,fullWidth:!0})]})]},e))]})},VA={render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,maxWidth:`560px`,children:[(0,Q.jsx)(L,{flexDirection:`row`,gap:2,mb:1,children:[`Default (click)`,`Disabled`,`Error`].map(e=>(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,flex:1,m:0,children:e},e))}),[`primary`,`secondary`,`success`,`error`,`info`,`warning`].map(e=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:e}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,children:[(0,Q.jsx)(W,{variant:`outlined`,color:e,placeholder:`Click to focus`,fullWidth:!0}),(0,Q.jsx)(W,{variant:`outlined`,color:e,placeholder:`Disabled`,disabled:!0,fullWidth:!0}),(0,Q.jsx)(W,{variant:`outlined`,color:e,placeholder:`Error`,error:!0,fullWidth:!0})]})]},e))]})},HA={name:`Multiline - Auto-grow`,render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,maxWidth:`480px`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`Grows with content - no fixed height`}),(0,Q.jsx)(W,{multiline:!0,resize:!0,fullWidth:!0,placeholder:`Start typing... the field expands as you write.`})]})},UA={name:`Multiline - Fixed rows`,render:()=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,maxWidth:`480px`,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,m:0,children:`Fixed to 4 rows - scrolls when content overflows`}),(0,Q.jsx)(W,{rows:4,fullWidth:!0,placeholder:`Write something...`})]})},WA={render:e=>(0,Q.jsx)(L,{width:`100%`,maxWidth:`480px`,children:(0,Q.jsx)(W,{...e,fullWidth:!0,placeholder:`Full-width input...`})})},GA={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:2,maxWidth:`360px`,children:[{type:`text`,placeholder:`Text`},{type:`email`,placeholder:`email@example.com`},{type:`password`,placeholder:`Password`},{type:`number`,placeholder:`0`},{type:`search`,placeholder:`Search...`},{type:`url`,placeholder:`https://`}].map(({type:e,placeholder:t})=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,gap:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(W,{type:e,placeholder:t,fullWidth:!0})]},e))})},KA={decorators:[(e,t)=>{let[n,r]=(0,q.useState)(``);return(0,Q.jsx)(e,{args:{...t.args,value:n,onChange:e=>r(e.target.value)}})}],render:({value:e,onChange:t})=>(0,Q.jsxs)(L,{flexDirection:`column`,gap:2,maxWidth:`360px`,children:[(0,Q.jsx)(W,{fullWidth:!0,value:e,onChange:t,placeholder:`Type something...`}),(0,Q.jsxs)(I,{variant:`caption`,color:`secondary`,m:0,children:[`Value: `,e||`(empty)`]})]})},qA=t({Default:()=>YA,Standalone:()=>ZA,default:()=>JA}),JA={title:`Theme/ToggleButton/ToggleButton`,component:ot,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`value`,`isSelected`,`color`,`size`,`fullWidth`,`disabled`,`loading`]}},args:{value:`check`,children:`Check`},argTypes:{value:{control:`text`,description:"The value associated with the button inside a `ToggleButtonGroup`.",table:{category:`Content`}},isSelected:{control:`boolean`,description:"Active state - inferred from the group value when omitted. Drives `aria-pressed`.",table:{category:`Behavior`}},color:{control:{type:`select`},options:qe,description:"Active-state color - resolves against `theme.palette`. Inherited from the group.",table:{category:`Visual`,defaultValue:{summary:`default`}}},size:{control:{type:`select`},options:Le,description:"Padding and font size - resolves against `theme.sizes`. Inherited from the group.",table:{category:`Layout`,defaultValue:{summary:`md`}}},fullWidth:{control:`boolean`,description:`Stretches the button to fill its container.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},disabled:{control:`boolean`,description:`Disables the button. Inherited from the group.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},loading:{control:`boolean`,description:`Shows loading indicator and disables the button - e.g. while a toggle saves.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}}}},YA={};function XA(){let[e,t]=(0,q.useState)(!1);return(0,Q.jsx)(ot,{value:`check`,isSelected:e,onChange:()=>t(e=>!e),"aria-label":`check`,children:(0,Q.jsx)(A,{name:`check`,size:`1em`,color:`inherit`})})}var ZA={render:()=>(0,Q.jsx)(XA,{})},QA=t({Disabled:()=>sj,ExclusiveSelection:()=>nj,FullWidth:()=>oj,MultipleSelection:()=>rj,Sizes:()=>ij,Vertical:()=>aj,default:()=>$A}),$A={title:`Theme/ToggleButton/ToggleButtonGroup`,component:K,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`isExclusive`,`color`,`size`,`orientation`,`disabled`,`fullWidth`]}},argTypes:{isExclusive:{control:`boolean`,description:`Only one child value can be selected at a time.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},color:{control:{type:`select`},options:qe,description:"Selected-state color for all children - resolves against `theme.palette`.",table:{category:`Visual`}},size:{control:{type:`select`},options:Le,description:"Density for all children - resolves against `theme.sizes`.",table:{category:`Layout`}},orientation:{control:{type:`select`},options:[`horizontal`,`vertical`],description:`Layout flow direction.`,table:{category:`Layout`,defaultValue:{summary:`horizontal`}}},disabled:{control:`boolean`,description:`Disables all children.`,table:{category:`Behavior`,defaultValue:{summary:`false`}}},fullWidth:{control:`boolean`,description:`Group fills its container; children share the width.`,table:{category:`Layout`,defaultValue:{summary:`false`}}}}};function ej(e){let[t,n]=(0,q.useState)(`web`);return(0,Q.jsxs)(K,{isExclusive:!0,value:t,onChange:n,color:`primary`,"aria-label":`Platform`,...e,children:[(0,Q.jsx)(ot,{value:`web`,children:`Web`}),(0,Q.jsx)(ot,{value:`android`,children:`Android`}),(0,Q.jsx)(ot,{value:`ios`,children:`iOS`})]})}function tj(e){let[t,n]=(0,q.useState)([`bold`]);return(0,Q.jsxs)(K,{value:t,onChange:n,color:`secondary`,"aria-label":`Text formatting`,...e,children:[(0,Q.jsx)(ot,{value:`bold`,children:`Bold`}),(0,Q.jsx)(ot,{value:`italic`,children:`Italic`}),(0,Q.jsx)(ot,{value:`underline`,children:`Underline`})]})}var nj={render:e=>(0,Q.jsx)(ej,{...e})},rj={render:e=>(0,Q.jsx)(tj,{...e})},ij={render:()=>(0,Q.jsx)(L,{flexDirection:`column`,gap:3,alignItems:`flex-start`,children:[`sm`,`md`,`lg`].map(e=>(0,Q.jsx)(ej,{size:e},e))})},aj={render:()=>(0,Q.jsx)(ej,{orientation:`vertical`})},oj={render:()=>(0,Q.jsx)(ej,{fullWidth:!0})},sj={render:()=>(0,Q.jsx)(ej,{disabled:!0})},cj=t({Alignment:()=>pj,AllVariants:()=>dj,Colors:()=>mj,Composed:()=>yj,Default:()=>uj,GutterBottom:()=>vj,LetterSpacing:()=>hj,LineHeights:()=>gj,NoWrap:()=>_j,default:()=>lj}),lj={title:`Theme/Typography`,component:I,tags:[`autodocs`],parameters:{layout:`padded`,controls:{include:[`children`,`variant`,`align`,`gutterBottom`,`noWrap`,`as`,`color`,`bg`,`opacity`,`m`,`p`,`fontFamily`,`fontSize`,`fontWeight`,`fontStyle`,`lineHeight`,`letterSpacing`]}},argTypes:{children:{control:`text`,description:`Text content rendered inside the element.`,table:{category:`Content`}},variant:{control:{type:`select`},options:it,description:`Sets typographic scale and maps to a semantic HTML element via variantMapping.`,table:{category:`Typography`,defaultValue:{summary:`body1`}}},align:{control:{type:`inline-radio`},options:Oe,description:`CSS text-align.`,table:{category:`Layout`}},gutterBottom:{control:`boolean`,description:`Adds margin-bottom: 0.5em beneath the element.`,table:{category:`Layout`,defaultValue:{summary:`false`}}},noWrap:{control:`boolean`,description:`Clips overflow text with an ellipsis (white-space: nowrap).`,table:{category:`Layout`,defaultValue:{summary:`false`}}},as:{control:{type:`select`},options:Me,description:`Overrides the HTML element chosen by variant.`,table:{category:`Layout`}},color:{control:{type:`select`},options:G,description:`Semantic text color - resolves from theme.text.`,table:{category:`Visual`}},bg:VS,opacity:HS,m:WS,p:US,fontFamily:{control:{type:`inline-radio`},options:ut,description:`Theme font token (theme.fonts).`,table:{category:`Typography`}},fontSize:{control:{type:`select`},options:Ye,description:`theme.fontSizes index - 0=12px · 1=14px · 2=16px · 3=20px · 4=24px · 5=32px · 6=48px`,table:{category:`Typography`}},fontWeight:{control:{type:`select`},options:vt,description:`Theme font-weight keyword (theme.fontWeights).`,table:{category:`Typography`}},fontStyle:{control:{type:`inline-radio`},options:we,description:`CSS font-style.`,table:{category:`Typography`}},lineHeight:{control:{type:`select`},options:jt,description:`theme.lineHeights key - none=1 · tight=1.2 · snug=1.35 · base=1.5 · relaxed=1.625 · loose=2`,table:{category:`Typography`}},letterSpacing:{control:{type:`select`},options:ht,description:`theme.letterSpacings key.`,table:{category:`Typography`}}}},uj={args:{variant:`body1`,children:`Great products are built through clarity, consistency, and attention to detail.`}},dj={render:()=>(0,Q.jsx)(L,{children:[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`subtitle1`,`subtitle2`,`body1`,`body2`,`caption`,`overline`,`button`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,mb:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(I,{variant:e,m:0,children:`The quick brown fox`})]},e))})},fj={left:`The quick brown fox jumps over the lazy dog.`,center:`The quick brown fox jumps over the lazy dog.`,right:`The quick brown fox jumps over the lazy dog.`,justify:`Justify only stretches lines that wrap - the last line stays left. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.`},pj={render:()=>(0,Q.jsx)(L,{width:`360px`,children:[`left`,`center`,`right`,`justify`].map(e=>(0,Q.jsxs)(F,{mb:3,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,mb:.5,m:0,children:e}),(0,Q.jsx)(I,{variant:`body1`,align:e,m:0,children:fj[e]})]},e))})},mj={render:()=>(0,Q.jsx)(L,{p:3,children:[`inherit`,`initial`,`primary`,`secondary`,`disabled`,`error`,`success`,`info`,`warning`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`center`,mb:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`6rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(I,{variant:`body1`,color:e,m:0,children:`The quick brown fox`})]},e))})},hj={render:()=>(0,Q.jsx)(L,{children:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`baseline`,mb:1,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,m:0,children:e}),(0,Q.jsx)(I,{variant:`body1`,letterSpacing:e,m:0,children:`The quick brown fox`})]},e))})},gj={render:()=>(0,Q.jsx)(L,{children:[`none`,`tight`,`snug`,`base`,`relaxed`,`loose`].map(e=>(0,Q.jsxs)(L,{flexDirection:`row`,alignItems:`flex-start`,mb:2,children:[(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,width:`5rem`,flexShrink:0,mt:0,mb:0,children:e}),(0,Q.jsx)(I,{variant:`body2`,lineHeight:e,m:0,maxWidth:`320px`,children:`The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.`})]},e))})},_j={render:()=>(0,Q.jsxs)(F,{width:`240px`,border:`1px dashed`,borderColor:`light`,p:1.5,children:[(0,Q.jsx)(I,{variant:`body1`,noWrap:!0,m:0,children:`This very long text will be truncated with an ellipsis when it overflows its container.`}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,mt:1,mb:0,children:`↑ noWrap (240px container)`})]})},vj={render:()=>(0,Q.jsxs)(F,{border:`1px dashed`,borderColor:`light`,p:1.5,maxWidth:`480px`,children:[(0,Q.jsx)(I,{variant:`h4`,gutterBottom:!0,children:`Heading with gutterBottom`}),(0,Q.jsx)(I,{variant:`body1`,m:0,children:`This paragraph follows directly after the heading. The gutter (0.5em) creates breathing room between them without extra margin props.`})]})},yj={render:()=>(0,Q.jsxs)(L,{as:`article`,maxWidth:`480px`,children:[(0,Q.jsx)(I,{variant:`overline`,color:`secondary`,m:0,children:`Design system`}),(0,Q.jsx)(I,{variant:`h2`,gutterBottom:!0,mt:0,children:`Typography component`}),(0,Q.jsx)(I,{variant:`subtitle1`,color:`secondary`,m:0,children:`A flexible text primitive with variant, alignment, truncation, and full styled-system support.`}),(0,Q.jsxs)(I,{variant:`body2`,mt:2,mb:0,children:[`Variants map to semantic HTML elements via`,` `,(0,Q.jsx)(I,{as:`code`,variant:`inherit`,children:`variantMapping`}),`. Pass`,` `,(0,Q.jsx)(I,{as:`code`,variant:`inherit`,children:`as`}),` `,`to override the element while keeping variant styles.`]}),(0,Q.jsx)(I,{variant:`caption`,color:`secondary`,mt:1,mb:0,children:`Last updated: 2026`})]})},bj=t({Default:()=>Sj,Positioned:()=>wj,WithSpacingAndBackground:()=>Cj,default:()=>xj}),xj={title:`Theme/View`,component:F,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"The base layout primitive. Renders as `<div>`. All styled-system prop groups are supported: space, layout, color, typography, flexbox, border, and position."}},controls:{include:[`bg`,`opacity`,`p`,`m`,`width`,`height`,`display`,`border`,`borderWidth`,`borderStyle`,`borderColor`,`borderRadius`,`position`,`cursor`,`aspectRatio`,`order`]}},argTypes:{bg:VS,opacity:HS,p:US,m:WS,width:KS,height:qS,display:QS,border:rC,borderWidth:iC,borderStyle:aC,borderColor:oC,borderRadius:sC,position:$S,cursor:eC,aspectRatio:tC,order:nC},args:{children:`View content`}},Sj={},Cj={args:{p:3,bg:`secondary`,borderRadius:`md`,children:`Padded container with background`}},wj={args:{position:`relative`,height:`150px`,bg:`secondary`,borderRadius:`sm`},render:e=>(0,Q.jsx)(F,{...e,children:(0,Q.jsx)(F,{position:`absolute`,top:`20px`,left:`20px`,p:2,bg:`primary`,borderRadius:`sm`,children:`Absolute child`})})},Tj=t({ThemeComponents:()=>Oj,default:()=>Dj}),Ej=ve(P,{components:{Button:{defaultProps:{size:`sm`,shape:`rounded`},styleOverrides:{root:({theme:e,ownerState:t})=>({letterSpacing:e.letterSpacings.wide,...t.variant===`contained`&&{textTransform:`none`}})},variants:[{props:{variant:`dashed`},style:({theme:e})=>({backgroundColor:`transparent`,color:e.palette.primary.main,border:`${e.borderWidths.thin} dashed ${e.border.primary}`})}]}}}),Dj={title:`Theme/Customization`,component:_e,tags:[`autodocs`],parameters:{layout:`padded`,controls:{disable:!0}}},Oj={render:()=>(0,Q.jsx)(_e,{theme:Ej,children:(0,Q.jsxs)(L,{flexDirection:`column`,gap:3,p:2,children:[(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`overline`,color:`secondary`,m:0,children:`defaultProps - sm + rounded without touching call sites`}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,children:[(0,Q.jsx)(u,{children:`Customized default`}),(0,Q.jsx)(u,{size:`lg`,shape:`pill`,children:`Explicit props still win`})]})]}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`overline`,color:`secondary`,m:0,children:`styleOverrides - contained loses its uppercase via ownerState`}),(0,Q.jsxs)(L,{flexDirection:`row`,gap:2,children:[(0,Q.jsx)(u,{variant:`contained`,children:`No Uppercase Here`}),(0,Q.jsx)(u,{variant:`outlined`,children:`OUTLINED KEEPS IT`})]})]}),(0,Q.jsxs)(L,{flexDirection:`column`,gap:1,children:[(0,Q.jsx)(I,{variant:`overline`,color:`secondary`,m:0,children:`variants - a theme-contributed "dashed" value`}),(0,Q.jsxs)(Be,{children:[(0,Q.jsx)(u,{variant:`dashed`,children:`Draft`}),(0,Q.jsx)(u,{variant:`dashed`,children:`Autosave`})]})]})]})})},kj=`import { useState, type SVGProps } from 'react'
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite'
import { border, m, p, position } from '../utils/test/storiesArgs'
import { appBarSizeTokens, backgroundTokens } from '../utils/test/storiesOptions'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme } from '../theme/themes'

// Story-local light variant - the package ships only \`baseTheme\`; consumers
// build their own light themes the same way.
const light = createTheme(baseTheme, {
  name: 'light',
  colorScheme: 'light',
  background: {
    appBar: '#F9F9F9CC',
    paper: '#F3F3F3',
    default: '#FFFFFF',
    primary: '#F9F9F9',
    secondary: '#EEEEEE',
  },
  text: { initial: '#1A1C1C', secondary: '#444748' },
  border: { default: '#D7D8DA' },
})
import { Avatar } from '../Avatar'
import { Flex } from '../Flex'
import { Link } from '../Link'
import { Typography } from '../Typography'
import { Switch } from '../Switch'
import { View } from '../View'
import { AppBar } from './AppBar'

// Story-local copies of the app's sun/moon assets - the package has no svgr pipeline.
const SunIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="0.6em"
    height="0.6em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={12} r={4} />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const MoonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="0.6em"
    height="0.6em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)
// Public site asset served by the app's Storybook.
const Logo = '/soroush.svg'

const meta: Meta<typeof AppBar> = {
  title: 'Theme/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['children', 'color', 'size', 'elevation', 'position', 'blur', 'border', 'm', 'p'],
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content rendered inside the AppBar.',
      table: { category: 'Content' },
    },
    color: {
      control: { type: 'select' },
      options: backgroundTokens,
      description: 'Background color - resolves from theme.background.',
      table: { category: 'Visual' },
    },
    size: {
      control: { type: 'select' },
      options: appBarSizeTokens,
      description: 'Padding preset - resolves from theme.sizes. Default: "md".',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Box-shadow elevation - resolves from theme.shadows[n]. Omit for no shadow.',
      table: { category: 'Visual' },
    },
    position,
    blur: {
      control: 'boolean',
      description:
        'Applies \`backdrop-filter: blur(theme.blur)\` + \`-webkit-\` prefix. Use with \`color="backdrop"\` for a frosted-glass effect.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    border,
    m,
    p,
  },
}

export default meta
type Story = StoryObj<typeof AppBar>

export const Default: Story = {
  args: {
    color: 'paper',
    children: 'Application Header',
  },
}

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="column">
      {(['paper', 'primary', 'secondary', 'modal'] as const).map((color) => (
        <AppBar key={color} color={color} mb={1}>
          <Flex flexDirection="row" alignItems="center" px={2} py={1.5}>
            <Typography variant="caption" color="secondary" m={0}>
              color="{color}"
            </Typography>
          </Flex>
        </AppBar>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="column">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <AppBar key={size} size={size} color="paper" mb={1}>
          <Flex flexDirection="row" alignItems="center">
            <Typography variant="caption" color="secondary" m={0}>
              size=&quot;{size}&quot;
            </Typography>
          </Flex>
        </AppBar>
      ))}
    </Flex>
  ),
}

export const Positions: Story = {
  render: () => (
    <Flex flexDirection="column">
      {(['static', 'relative', 'sticky'] as const).map((pos) => (
        <AppBar key={pos} position={pos} color="paper" mb={1}>
          <Flex flexDirection="row" alignItems="center" px={2} py={1.5}>
            <Typography variant="caption" color="secondary" m={0}>
              position=&quot;{pos}&quot;
            </Typography>
          </Flex>
        </AppBar>
      ))}
      {(['absolute', 'fixed'] as const).map((pos) => (
        <Flex key={pos} position="relative" height="48px" mb={1}>
          <AppBar position={pos} color="paper">
            <Flex flexDirection="row" alignItems="center" px={2} py={1.5}>
              <Typography variant="caption" color="secondary" m={0}>
                position=&quot;{pos}&quot;
              </Typography>
            </Flex>
          </AppBar>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Elevations: Story = {
  render: () => (
    <Flex flexDirection="column">
      {([0, 4, 8, 12, 16, 24] as const).map((elevation) => (
        <AppBar key={elevation} elevation={elevation} color="paper" mb={1}>
          <Flex flexDirection="row" alignItems="center" px={2} py={1.5}>
            <Typography variant="caption" color="secondary" m={0}>
              elevation={elevation}
            </Typography>
          </Flex>
        </AppBar>
      ))}
    </Flex>
  ),
}

const NAV_LINKS = ['Home', 'Experience', 'Stack', 'Architecture', 'Contact'] as const

export const SiteHeader: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <AppBar
      color="primary"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      elevation={4}
      minHeight={64}
    >
      {/* Logo */}
      <Flex flexDirection="row" alignItems="center" gap={2}>
        <Avatar variant="square" size="sm" src={Logo} alt="Masoud Soroush">
          <Typography variant="caption" color="primary" m={0}>
            M
          </Typography>
        </Avatar>
        <Typography variant="h6" color="secondary" m={0} fontFamily="monospace">
          Masoud Soroush
        </Typography>
      </Flex>

      {/* Nav */}
      <Flex flexDirection="row" alignItems="center" gap={3}>
        {NAV_LINKS.map((label, i) => (
          <Link
            key={label}
            underline="hover"
            color={i === 0 ? 'secondary' : 'initial'}
            m={0}
            fontFamily="monospace"
          >
            {label}
          </Link>
        ))}
      </Flex>

      {/* Actions */}
      <Flex flexDirection="row" alignItems="center" gap={1}>
        <View height="32px" mx={2} width="2px" bg="grid" />
        <Flex flexDirection="column" alignItems="flex-end">
          <Typography
            variant="caption"
            color="secondary"
            m={0}
            style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Status
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            m={0}
            style={{ fontFamily: 'monospace', fontSize: '12px' }}
          >
            OPTIMIZED
          </Typography>
        </Flex>
      </Flex>
    </AppBar>
  ),
}

export const Frosted: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <AppBar
      color="backdrop"
      blur
      borderBottom="1px solid rgba(0,0,0,0.1)"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      elevation={0}
      minHeight={64}
    >
      <Typography variant="h6" color="secondary" m={0}>
        Frosted Glass Header
      </Typography>
      <Typography variant="caption" color="secondary" m={0}>
        blur + color="backdrop"
      </Typography>
    </AppBar>
  ),
}

interface DarkModeArgs {
  isDark: boolean
  onToggle: () => void
}

// Owns the theme-mode state and ThemeProvider in a decorator, injecting \`isDark\` and
// \`onToggle\` into the story so the toggle Switch can stay inside the AppBar content.
const WithThemeToggle: Decorator = (Story, ctx) => {
  const [isDark, setIsDark] = useState(false)
  return (
    <ThemeProvider theme={isDark ? baseTheme : light}>
      <Story args={{ ...ctx.args, isDark, onToggle: () => setIsDark((value) => !value) }} />
    </ThemeProvider>
  )
}

export const DarkMode: StoryObj<DarkModeArgs> = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  decorators: [WithThemeToggle],
  render: ({ isDark, onToggle }) => (
    <AppBar
      color="secondary"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      elevation={4}
      minHeight={64}
    >
      <Flex flexDirection="row" alignItems="center" gap={2}>
        <Avatar variant="square" size="sm" src={Logo} alt="Masoud Soroush">
          <Typography variant="caption" color="primary" m={0}>
            M
          </Typography>
        </Avatar>
        <Typography variant="h6" color="secondary" m={0} fontFamily="monospace">
          Masoud Soroush
        </Typography>
      </Flex>

      <Flex flexDirection="row" alignItems="center" gap={3}>
        {NAV_LINKS.map((label, i) => (
          <Link
            key={label}
            underline="hover"
            color={i === 0 ? 'secondary' : 'initial'}
            m={0}
            fontFamily="monospace"
          >
            {label}
          </Link>
        ))}
      </Flex>

      <Switch
        checked={isDark}
        color="default"
        onChange={onToggle}
        icon={<SunIcon aria-hidden="true" width={14} height={14} />}
        checkedIcon={<MoonIcon aria-hidden="true" width={14} height={14} />}
        aria-label="Toggle dark mode"
      />
    </AppBar>
  ),
}
`,Aj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { bg, m } from '../utils/test/storiesArgs'
import {
  avatarSizeTokens,
  avatarVariantTokens,
  borderColorTokens,
  borderWidthTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Avatar } from './Avatar'

const DEMO_IMG = '/soroush.svg'

const meta: Meta<typeof Avatar> = {
  title: 'Theme/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    ring: false,
  },
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'src',
        'srcSet',
        'fallback',
        'alt',
        'children',
        'variant',
        'size',
        'ring',
        'ringColor',
        'ringWidth',
        'bg',
        'm',
      ],
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Primary image URL.',
      table: { category: 'Content' },
    },
    srcSet: {
      control: 'text',
      description: 'Responsive image URLs - used as the primary source when \`src\` is absent.',
      table: { category: 'Content' },
    },
    fallback: {
      control: 'text',
      description:
        'Fallback image URL shown when \`src\` is absent. Children are shown when both are absent.',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image, required for accessibility.',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'Fallback content rendered when no \`src\` is provided (initials, icon, etc.).',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: avatarVariantTokens,
      description: 'Shape of the avatar container.',
      table: { category: 'Layout', defaultValue: { summary: 'circular' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: avatarSizeTokens,
      description:
        'Preset size - resolves against theme.space (small=32px, medium=40px, large=48px).',
      table: { category: 'Layout', defaultValue: { summary: 'medium' } },
    },
    ring: {
      control: 'boolean',
      description: 'Adds a CSS outline ring around the avatar.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    ringColor: {
      control: { type: 'select' },
      options: borderColorTokens,
      description: 'Ring color - resolves against theme.border.',
      table: { category: 'Visual' },
    },
    ringWidth: {
      control: { type: 'select' },
      options: borderWidthTokens,
      description: 'Ring width - resolves against theme.borderWidths.',
      table: { category: 'Visual' },
    },
    bg,
    m,
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: DEMO_IMG,
    alt: 'Soroush logo',
    variant: 'circular',
    size: 'md',
  },
}

export const FallbackImage: Story = {
  args: {
    fallback: DEMO_IMG,
    alt: 'Fallback image',
    variant: 'circular',
    size: 'md',
  },
}

export const FallbackInitials: Story = {
  args: {
    children: 'MS',
    variant: 'circular',
    size: 'md',
    bg: 'secondary',
  },
}

export const AllVariants: Story = {
  render: () => (
    <Flex flexDirection="row" gap={3} alignItems="center">
      {(['circular', 'rounded', 'square'] as const).map((v) => (
        <Flex key={v} alignItems="center" gap={1}>
          <Avatar variant={v} size="lg" bg="secondary">
            MS
          </Avatar>
          <Typography variant="caption" color="secondary" m={0}>
            {v}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <Flex flexDirection="row" gap={3} alignItems="flex-end">
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Flex key={s} alignItems="center" gap={1}>
          <Avatar size={s} bg="secondary">
            MS
          </Avatar>
          <Typography variant="caption" color="secondary" m={0}>
            {s}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const WithRing: Story = {
  args: {
    src: DEMO_IMG,
    alt: 'Soroush logo',
    variant: 'circular',
    size: 'lg',
    ring: true,
  },
}

export const RingShapes: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      {(['circular', 'rounded', 'square'] as const).map((v) => (
        <Flex key={v} alignItems="center" gap={1}>
          <Avatar ring variant={v} size="lg" bg="secondary">
            MS
          </Avatar>
          <Typography variant="caption" color="secondary" m={0}>
            {v}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const RingVariants: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      {(['light', 'primary', 'dark'] as const).map((c) => (
        <Flex key={c} alignItems="center" gap={1}>
          <Avatar ring ringColor={c} size="lg" bg="secondary">
            MS
          </Avatar>
          <Typography variant="caption" color="secondary" m={0}>
            {c}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}
`,jj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { bg, opacity } from '../utils/test/storiesArgs'
import { Backdrop } from './Backdrop'

const meta: Meta<typeof Backdrop> = {
  title: 'Theme/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['bg', 'opacity'],
    },
  },
  argTypes: {
    bg,
    opacity,
  },
}

export default meta
type Story = StoryObj<typeof Backdrop>

export const Default: Story = {
  args: {},
}

export const Tinted: Story = {
  args: {
    bg: 'modal',
  },
}
`,Mj=`import { css, keyframes } from '@emotion/css'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { m, p } from '../utils/test/storiesArgs'
import { baseTheme } from '../theme/themes'
import {
  borderRadiiTokens,
  buttonColorTokens,
  buttonLoadingPositionTokens,
  buttonShapeTokens,
  buttonSizeTokens,
  buttonVariantTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Theme/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'children',
        'variant',
        'color',
        'size',
        'shape',
        'borderRadius',
        'fullWidth',
        'disabled',
        'loading',
        'loadingPosition',
        'href',
        'm',
        'p',
      ],
    },
  },
  args: {
    children: 'Action',
    onClick: fn(),
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label text.',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: buttonVariantTokens,
      description: 'Visual style - filled, stroked, or ghost.',
      table: { category: 'Visual', defaultValue: { summary: 'contained' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Color palette - resolves from \`theme.palette[color]\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: buttonSizeTokens,
      description: 'Controls padding and font size.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch button to full container width.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading indicator and disables the button.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    shape: {
      control: { type: 'inline-radio' },
      options: buttonShapeTokens,
      description:
        'Corner shape - sets the default \`borderRadius\`. \`borderRadius\` prop always overrides.',
      table: { category: 'Visual', defaultValue: { summary: 'rounded' } },
    },
    borderRadius: {
      control: { type: 'inline-radio' },
      options: borderRadiiTokens,
      description:
        'Border radius token from \`theme.radii\`. Overrides \`shape\`. Only meaningful when \`shape="rounded"\`.',
      table: { category: 'Visual' },
    },
    loadingPosition: {
      control: { type: 'inline-radio' },
      options: buttonLoadingPositionTokens,
      description: 'Where the loading indicator appears relative to the label.',
      table: { category: 'Visual', defaultValue: { summary: 'center' } },
    },
    href: {
      control: 'text',
      description: 'URL to link to. If defined, the root renders as an \`a\` element.',
      table: { category: 'Content' },
    },
    m,
    p,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    children: 'Action',
  },
}

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="row" gap={2} flexWrap="wrap">
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Flex>
  ),
}

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const).map((color) => (
        <Flex key={color} flexDirection="row" gap={2} alignItems="center" flexWrap="wrap">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {color}
          </Typography>
          <Button variant="contained" color={color}>
            Contained
          </Button>
          <Button variant="outlined" color={color}>
            Outlined
          </Button>
          <Button variant="text" color={color}>
            Text
          </Button>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="row" gap={2} alignItems="center" flexWrap="wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Flex>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      <Flex flexDirection="row" gap={2} flexWrap="wrap">
        <Button startIcon={<span>▶</span>}>Start Icon</Button>
        <Button endIcon={<span>◀</span>}>End Icon</Button>
        <Button startIcon={<span>▶</span>} endIcon={<span>◀</span>}>
          Both Icons
        </Button>
      </Flex>
      <Flex flexDirection="row" gap={2} flexWrap="wrap">
        <Button variant="outlined" startIcon={<span>+</span>}>
          New Item
        </Button>
        <Button variant="text" endIcon={<span>→</span>}>
          Learn More
        </Button>
      </Flex>
    </Flex>
  ),
}

export const Loading: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['start', 'center', 'end'] as const).map((pos) => (
        <Flex key={pos} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="4rem" flexShrink={0} m={0}>
            {pos}
          </Typography>
          <Button loading loadingPosition={pos} startIcon={<span>▶</span>}>
            Deploy
          </Button>
          <Button loading loadingPosition={pos} variant="outlined">
            Deploy
          </Button>
          <Button loading loadingPosition={pos} variant="text">
            Deploy
          </Button>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Flex flexDirection="row" gap={2} flexWrap="wrap">
      <Button disabled variant="contained">
        Contained
      </Button>
      <Button disabled variant="outlined">
        Outlined
      </Button>
      <Button disabled variant="text">
        Text
      </Button>
    </Flex>
  ),
}

export const AsLink: Story = {
  name: 'As Link (href)',
  render: () => (
    <Flex flexDirection="row" gap={2} flexWrap="wrap" alignItems="center">
      <Button href="#contained">Contained</Button>
      <Button href="#outlined" variant="outlined" endIcon={<span>→</span>}>
        Outlined
      </Button>
      <Button href="#text" variant="text">
        Text
      </Button>
    </Flex>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2} maxWidth="480px">
      <Button fullWidth>Full Width Contained</Button>
      <Button fullWidth variant="outlined">
        Full Width Outlined
      </Button>
    </Flex>
  ),
}

export const Shapes: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['square', 'rounded', 'pill'] as const).map((shape) => (
        <Flex key={shape} flexDirection="row" gap={2} alignItems="center" flexWrap="wrap">
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} m={0}>
            {shape}
          </Typography>
          <Button shape={shape}>Contained</Button>
          <Button shape={shape} variant="outlined">
            Outlined
          </Button>
          <Button shape={shape} variant="text">
            Text
          </Button>
        </Flex>
      ))}
      <Flex flexDirection="column" gap={2}>
        <Typography variant="caption" color="secondary" m={0}>
          rounded - borderRadius override
        </Typography>
        <Flex flexDirection="row" gap={2} flexWrap="wrap">
          <Button shape="rounded" borderRadius="sm">
            sm (4px)
          </Button>
          <Button shape="rounded" borderRadius="md">
            md (8px)
          </Button>
          <Button shape="rounded" borderRadius="lg">
            lg (16px)
          </Button>
        </Flex>
      </Flex>
    </Flex>
  ),
}

// ─── Custom styling showcase ───────────────────────────────────────────────────

const gradientShift = keyframes({
  to: { backgroundPosition: '200% center' },
})

const RAINBOW = [
  'hsl(0 100% 50%)',
  'hsl(270 100% 50%)',
  'hsl(210 100% 50%)',
  'hsl(195 100% 50%)',
  'hsl(90 100% 50%)',
  'hsl(0 100% 50%)',
]

// Returns a plain className - no new component needed. Button props handle
// shape/typography; only the animated gradient border needs custom CSS.
// The \`&&\` selector doubles specificity to beat Button's own variant styles.
function rainbowBorderClass({
  speed = '2s',
  innerBg = baseTheme.background.paper,
  colors = RAINBOW,
}: { speed?: string; innerBg?: string; colors?: string[] } = {}) {
  return css({
    '&&': {
      textTransform: 'initial',
      border: '1px solid transparent',
      borderBottomWidth: '2.5px',
      background: [
        \`linear-gradient(\${innerBg}, \${innerBg}) padding-box\`,
        \`linear-gradient(90deg, \${colors.join(', ')}) border-box\`,
      ].join(', '),
      backgroundSize: '200% auto',
      animation: \`\${gradientShift} \${speed} linear infinite\`,
      '&:hover:not(:disabled), &:active:not(:disabled)': {
        backgroundColor: 'transparent',
      },
    },
  })
}

export const RainbowBorder: Story = {
  name: 'Custom - Rainbow Border',
  render: () => (
    <Flex flexDirection="column" gap={4}>
      <Flex flexDirection="row" gap={3} alignItems="center">
        <Button
          variant="text"
          shape="pill"
          letterSpacing="normal"
          fontWeight="medium"
          className={rainbowBorderClass()}
        >
          Get started
        </Button>
        <Button
          variant="text"
          shape="pill"
          letterSpacing="normal"
          fontWeight="medium"
          className={rainbowBorderClass({ speed: '4s' })}
        >
          Slow (4s)
        </Button>
        <Button
          variant="text"
          shape="pill"
          letterSpacing="normal"
          fontWeight="medium"
          disabled
          className={rainbowBorderClass()}
        >
          Disabled
        </Button>
      </Flex>
      <Flex flexDirection="row" gap={3} alignItems="center">
        <Button
          variant="text"
          shape="pill"
          letterSpacing="normal"
          fontWeight="medium"
          className={rainbowBorderClass({
            colors: [
              baseTheme.palette.primary.main,
              baseTheme.palette.secondary.main,
              baseTheme.palette.primary.main,
            ],
          })}
        >
          Theme colors
        </Button>
        <Button
          variant="text"
          shape="pill"
          letterSpacing="normal"
          fontWeight="medium"
          className={rainbowBorderClass({
            colors: [
              baseTheme.palette.error.main,
              baseTheme.palette.warning.main,
              baseTheme.palette.error.main,
            ],
            speed: '1s',
          })}
        >
          Fast warm
        </Button>
      </Flex>
    </Flex>
  ),
}
`,Nj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  buttonColorTokens,
  buttonVariantTokens,
  buttonSizeTokens,
  borderRadiiTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { ButtonGroup } from './ButtonGroup'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Theme/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['variant', 'color', 'size', 'orientation', 'borderRadius', 'disabled', 'fullWidth'],
    },
  },
  args: {
    'aria-label': 'Basic button group',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: buttonVariantTokens,
      description: 'Visual style for all child buttons.',
      table: { category: 'Visual', defaultValue: { summary: 'outlined' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Color palette for all child buttons - resolves against \`theme.palette\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: buttonSizeTokens,
      description: 'Density for all child buttons - resolves against \`theme.sizes\`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout flow direction.',
      table: { category: 'Layout', defaultValue: { summary: 'horizontal' } },
    },
    borderRadius: {
      control: { type: 'select' },
      options: borderRadiiTokens,
      description: "Group corner radius - rounds the group's outer corners only.",
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all child buttons.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Group fills its container; children share the width.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

// ButtonGroup accepts multiple children directly - no fragment wrapper needed.
const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
]

export const Default: Story = {
  render: (args) => <ButtonGroup {...args}>{buttons}</ButtonGroup>,
}

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} alignItems="center">
      {(['contained', 'outlined', 'text'] as const).map((variant) => (
        <ButtonGroup key={variant} variant={variant} aria-label={\`\${variant} button group\`}>
          {buttons}
        </ButtonGroup>
      ))}
    </Flex>
  ),
}

export const SizesAndColors: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} alignItems="center">
      <ButtonGroup size="sm" aria-label="Small button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup color="secondary" aria-label="Medium-sized button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup size="lg" aria-label="Large button group">
        {buttons}
      </ButtonGroup>
    </Flex>
  ),
}

export const Radii: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} alignItems="center">
      {borderRadiiTokens.map((radius) => (
        <ButtonGroup
          key={radius}
          borderRadius={radius}
          aria-label={\`\${radius} radius button group\`}
        >
          {buttons}
        </ButtonGroup>
      ))}
    </Flex>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
      {buttons}
    </ButtonGroup>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <ButtonGroup fullWidth aria-label="Full-width button group">
      {buttons}
    </ButtonGroup>
  ),
}
`,Pj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  m,
  p,
} from '../utils/test/storiesArgs'
import { cardVariantTokens } from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { View } from '../View'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Theme/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'children',
        'variant',
        'icon',
        'title',
        'caption',
        'elevation',
        'bg',
        'borderRadius',
        'borderColor',
        'borderWidth',
        'borderStyle',
        'p',
        'm',
      ],
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Additional content rendered below the caption.',
      table: { category: 'Content' },
    },
    icon: {
      control: { type: 'select' },
      options: [undefined, 'account_tree', 'psychology', 'smart_toy', 'code'],
      description: 'Icon registry name rendered as the topmost element of the card.',
      table: { category: 'Content' },
    },
    title: {
      control: 'text',
      description:
        'Rendered as \`caption\` Typography with \`color="primary"\` and \`fontFamily="mono"\`.',
      table: { category: 'Content' },
    },
    caption: {
      control: 'text',
      description: 'Rendered as \`caption\` Typography with \`color="secondary"\`.',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: cardVariantTokens,
      description:
        '\`paper\` uses a plain Paper surface; \`bracketBox\` adds corner bracket accents; \`interactive\` fills with the secondary background on hover.',
      table: { category: 'Visual', defaultValue: { summary: 'paper' } },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth - 0 (flat) to 24 (highest). Resolves to theme.shadows[n].',
      table: { category: 'Visual', defaultValue: { summary: '1' } },
    },
    bg,
    borderRadius,
    borderColor,
    borderWidth,
    borderStyle,
    p,
    m,
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Component',
    caption: 'A flexible card surface with paper and bracketBox variants.',
    p: 3,
  },
}

export const Paper: Story = {
  render: () => (
    <Card variant="paper" p={3} title="Paper" caption="Default surface with elevation shadow." />
  ),
}

export const BracketBox: Story = {
  render: () => (
    <Card
      variant="bracketBox"
      p={3}
      elevation={0}
      title="BracketBox"
      caption="Flat surface with corner bracket accents."
    />
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Card
      variant="interactive"
      icon="account_tree"
      iconProps={{ color: 'primary', size: '2.25rem' }}
      p={4}
      bg="paper"
      title="System Scalability"
      caption="Pass an icon name and the card renders it."
    />
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card
      variant="interactive"
      p={3}
      bg="paper"
      title="Interactive"
      caption="Hover to fill with the secondary background."
    />
  ),
}

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="row" gap={3} flexWrap="wrap">
      <Card variant="paper" p={3} title="paper" caption="Default card variant." />
      <Card
        variant="bracketBox"
        p={3}
        elevation={0}
        title="bracketBox"
        caption="Corner bracket variant."
      />
      <Card
        variant="interactive"
        p={3}
        bg="paper"
        title="interactive"
        caption="Hover-fill variant."
      />
    </Flex>
  ),
}

export const TitleOnly: Story = {
  render: () => <Card p={3} title="Title Only" />,
}

export const SubtitleOnly: Story = {
  render: () => <Card p={3} caption="Subtitle only - no title above it." />,
}

export const WithChildren: Story = {
  render: () => (
    <Card variant="bracketBox" p={3} elevation={0} title="Stack" caption="Tech in use.">
      <View mt={2}>
        {['React', 'TypeScript', 'Vite'].map((item) => (
          <View key={item} p={0.5}>
            {item}
          </View>
        ))}
      </View>
    </Card>
  ),
}
`,Fj=`import { useState, type Dispatch, type SetStateAction } from 'react'
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite'
import { m } from '../utils/test/storiesArgs'
import { checkboxColorTokens, checkboxSizeTokens } from '../utils/test/storiesOptions'
import { ColorSwatchRows, WithCheckedState, type ControlledArgs } from '../utils/test/storiesToggle'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Theme/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'checked',
        'disabled',
        'indeterminate',
        'color',
        'size',
        'fullWidth',
        'children',
        'm',
      ],
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state.',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Shows the indeterminate (dash) state. Takes priority over \`checked\`.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: checkboxColorTokens,
      description:
        'Stroke/fill color. \`"default"\` resolves to \`theme.text.secondary\`; others to \`theme.palette[color].main\`.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: checkboxSizeTokens,
      description: 'Icon size.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the root to \`width: 100%\`.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Label text rendered next to the checkbox.',
      table: { category: 'Content' },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { color: 'default', size: 'md', 'aria-label': 'Checkbox' },
}

export const Checked: Story = {
  args: { checked: true, color: 'primary', 'aria-label': 'Checkbox' },
  render: (args) => <Checkbox {...args} onChange={() => {}} />,
}

export const Indeterminate: Story = {
  args: { indeterminate: true, color: 'primary', 'aria-label': 'Checkbox' },
}

export const WithLabel: Story = {
  args: { children: 'Accept terms and conditions', color: 'primary' },
}

export const States: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      {(
        [
          { label: 'Unchecked', props: {} },
          { label: 'Checked', props: { checked: true, onChange: () => {} } },
          { label: 'Indeterminate', props: { indeterminate: true } },
          { label: 'Disabled unchecked', props: { disabled: true } },
          {
            label: 'Disabled checked',
            props: { disabled: true, checked: true, onChange: () => {} },
          },
          { label: 'Disabled indeterminate', props: { disabled: true, indeterminate: true } },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} flexDirection="row" alignItems="center" gap={2}>
          <Typography variant="caption" color="secondary" width="10rem" flexShrink={0} m={0}>
            {label}
          </Typography>
          <Checkbox color="primary" {...props}>
            {label}
          </Checkbox>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: () => (
    <ColorSwatchRows
      controls={(color) => (
        <>
          <Checkbox color={color} aria-label={\`\${color} unchecked\`} />
          <Checkbox color={color} checked onChange={() => {}} aria-label={\`\${color} checked\`} />
          <Checkbox color={color} indeterminate aria-label={\`\${color} indeterminate\`} />
        </>
      )}
    />
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Flex key={size} flexDirection="column" alignItems="center" gap={1}>
          <Checkbox size={size} color="primary" checked onChange={() => {}} aria-label={size} />
          <Typography variant="caption" color="secondary" m={0}>
            {size}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      <Checkbox
        color="primary"
        icon={<span style={{ fontSize: '1.2em' }}>☆</span>}
        checkedIcon={<span style={{ fontSize: '1.2em' }}>★</span>}
      >
        Custom star icons (unchecked)
      </Checkbox>
      <Checkbox
        color="primary"
        checked
        onChange={() => {}}
        icon={<span style={{ fontSize: '1.2em' }}>☆</span>}
        checkedIcon={<span style={{ fontSize: '1.2em' }}>★</span>}
      >
        Custom star icons (checked)
      </Checkbox>
    </Flex>
  ),
}

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Mango', 'Strawberry']

interface SelectAllArgs {
  checked: Record<string, boolean>
  setChecked: Dispatch<SetStateAction<Record<string, boolean>>>
}

// Owns the per-item checked map in a decorator and injects it (plus its setter) via args.
const WithSelectAllState: Decorator = (Story, ctx) => {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(FRUITS.map((f, i) => [f, i < 2]))
  )
  return <Story args={{ ...ctx.args, checked, setChecked }} />
}

export const SelectAll: StoryObj<SelectAllArgs> = {
  decorators: [WithSelectAllState],
  render: ({ checked, setChecked }) => {
    const checkedCount = Object.values(checked).filter(Boolean).length
    const allChecked = checkedCount === FRUITS.length
    const someChecked = checkedCount > 0 && !allChecked

    const toggleAll = () => {
      const next = !allChecked
      setChecked(Object.fromEntries(FRUITS.map((f) => [f, next])))
    }

    return (
      <Flex flexDirection="column" gap={1}>
        <Checkbox
          color="primary"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        >
          <Typography variant="body2" m={0}>
            Select all
          </Typography>
        </Checkbox>
        <Flex flexDirection="column" gap={1} ml={4}>
          {FRUITS.map((fruit) => (
            <Checkbox
              key={fruit}
              color="primary"
              checked={checked[fruit]}
              onChange={(e) => setChecked((prev) => ({ ...prev, [fruit]: e.target.checked }))}
            >
              <Typography variant="body2" m={0}>
                {fruit}
              </Typography>
            </Checkbox>
          ))}
        </Flex>
        <Typography variant="caption" color="secondary" mt={1} mb={0}>
          {checkedCount} of {FRUITS.length} selected
        </Typography>
      </Flex>
    )
  },
}

export const Controlled: StoryObj<ControlledArgs> = {
  decorators: [WithCheckedState],
  render: ({ checked, onChange }) => (
    <Flex flexDirection="column" gap={2}>
      <Checkbox color="primary" checked={checked} onChange={onChange}>
        {checked ? 'Checked' : 'Unchecked'} - click to toggle
      </Checkbox>
      <Typography variant="caption" color="secondary" m={0}>
        State: {String(checked)}
      </Typography>
    </Flex>
  ),
}
`,Ij=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { m } from '../utils/test/storiesArgs'
import {
  circularProgressColorTokens,
  circularProgressEasingTokens,
  circularProgressVariantTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { CircularProgress } from './CircularProgress'

const meta: Meta<typeof CircularProgress> = {
  title: 'Theme/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'color',
        'size',
        'thickness',
        'value',
        'min',
        'max',
        'disableShrink',
        'spinning',
        'easing',
        'showTrack',
        'm',
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: circularProgressVariantTokens,
      description: 'Visual variant - looping animation or value-driven arc.',
      table: { category: 'Visual', defaultValue: { summary: 'indeterminate' } },
    },
    color: {
      control: { type: 'select' },
      options: circularProgressColorTokens,
      description:
        'Stroke color - resolves to \`theme.palette[color].main\`; \`"inherit"\` uses \`currentColor\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'number' },
      description: 'Width and height in px (number) or raw CSS unit (string).',
      table: { category: 'Visual', defaultValue: { summary: '40' } },
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10, step: 0.2 },
      description: 'SVG stroke width in viewBox user units.',
      table: { category: 'Visual', defaultValue: { summary: '3.6' } },
    },
    value: {
      control: { type: 'number' },
      description: 'Progress value for the \`"determinate"\` variant (clamped between min and max).',
      table: { category: 'Progress' },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value for the \`"determinate"\` variant.',
      table: { category: 'Progress', defaultValue: { summary: '0' } },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value for the \`"determinate"\` variant.',
      table: { category: 'Progress', defaultValue: { summary: '100' } },
    },
    disableShrink: {
      control: 'boolean',
      description: 'Disables the stroke shrink/expand keyframe animation (\`"indeterminate"\` only).',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    spinning: {
      control: 'boolean',
      description:
        'Applies rotation animation to \`"determinate"\` - arc length reflects \`value\` while the spinner still rotates.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    easing: {
      control: { type: 'inline-radio' },
      options: circularProgressEasingTokens,
      description: 'Timing function for the rotation animation.',
      table: { category: 'Visual', defaultValue: { summary: 'linear' } },
    },
    showTrack: {
      control: 'boolean',
      description: 'Renders a faint full-ring track behind the progress arc.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof CircularProgress>

export const Default: Story = {
  args: {
    variant: 'indeterminate',
    color: 'primary',
    size: 40,
  },
}

export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 70,
    color: 'primary',
    size: 40,
  },
}

export const SpinningDeterminate: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      {([25, 50, 75] as const).map((value) => (
        <Flex key={value} flexDirection="column" alignItems="center" gap={1}>
          <CircularProgress variant="determinate" value={value} spinning size={48} />
          <Typography variant="caption" color="secondary" m={0}>
            {value}%
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const).map((color) => (
        <Flex key={color} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {color}
          </Typography>
          <CircularProgress showTrack color={color} size={32} />
          <CircularProgress showTrack variant="determinate" value={65} color={color} size={32} />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="row" gap={3} alignItems="end" flexWrap="wrap">
      {([16, 24, 40, 64, 80] as const).map((size) => (
        <Flex key={size} flexDirection="column" alignItems="center" gap={1}>
          <CircularProgress size={size} />
          <Typography variant="caption" color="secondary" m={0}>
            {size}px
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Thickness: Story = {
  render: () => (
    <Flex flexDirection="row" gap={3} alignItems="center" flexWrap="wrap">
      {([1, 2, 3.6, 6, 10] as const).map((thickness) => (
        <Flex key={thickness} flexDirection="column" alignItems="center" gap={1}>
          <CircularProgress thickness={thickness} size={48} />
          <Typography variant="caption" color="secondary" m={0}>
            {thickness}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const ShowTrack: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center" flexWrap="wrap">
      <Flex flexDirection="column" alignItems="center" gap={1}>
        <CircularProgress showTrack size={48} />
        <Typography variant="caption" color="secondary" m={0}>
          indeterminate
        </Typography>
      </Flex>
      <Flex flexDirection="column" alignItems="center" gap={1}>
        <CircularProgress variant="determinate" value={65} showTrack size={48} />
        <Typography variant="caption" color="secondary" m={0}>
          determinate 65%
        </Typography>
      </Flex>
    </Flex>
  ),
}

export const Easing: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center" flexWrap="wrap">
      {(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'] as const).map((easing) => (
        <Flex key={easing} flexDirection="column" alignItems="center" gap={1}>
          <CircularProgress easing={easing} size={48} />
          <Typography variant="caption" color="secondary" m={0}>
            {easing}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const CustomRange: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(
        [
          { value: 3, min: 0, max: 10, label: '3 of 10' },
          { value: 120, min: 0, max: 200, label: '120 of 200' },
          { value: 7, min: 5, max: 15, label: '7 of 5-15' },
        ] as const
      ).map(({ value, min, max, label }) => (
        <Flex key={label} flexDirection="row" gap={2} alignItems="center">
          <CircularProgress
            variant="determinate"
            value={value}
            min={min}
            max={max}
            showTrack
            size={48}
          />
          <Typography variant="caption" color="secondary" m={0}>
            {label}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const SpinningWithTrack: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center" flexWrap="wrap">
      {([25, 50, 75, 90] as const).map((value) => (
        <Flex key={value} flexDirection="column" alignItems="center" gap={1}>
          <CircularProgress
            variant="determinate"
            value={value}
            spinning
            showTrack
            size={56}
            thickness={5}
          />
          <Typography variant="caption" color="secondary" m={0}>
            {value}%
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const DisableShrink: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      <Flex flexDirection="column" alignItems="center" gap={1}>
        <CircularProgress />
        <Typography variant="caption" color="secondary" m={0}>
          default
        </Typography>
      </Flex>
      <Flex flexDirection="column" alignItems="center" gap={1}>
        <CircularProgress disableShrink />
        <Typography variant="caption" color="secondary" m={0}>
          disableShrink
        </Typography>
      </Flex>
    </Flex>
  ),
}
`,Lj=`import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { anchorTokens } from '../utils/test/storiesOptions'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Drawer } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Theme/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['anchor', 'elevation', 'hasBackdrop', 'transitionDuration'],
    },
  },
  argTypes: {
    anchor: {
      control: { type: 'inline-radio' },
      options: anchorTokens,
      description: 'Edge the drawer slides in from.',
      table: { category: 'Layout', defaultValue: { summary: 'left' } },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth of the panel (0-24), forwarded to Paper.',
      table: { category: 'Visual', defaultValue: { summary: '16' } },
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'Render the dimmed backdrop behind the panel.',
      table: { category: 'Visual', defaultValue: { summary: 'true' } },
    },
    transitionDuration: {
      control: { type: 'number' },
      description: 'Slide duration in milliseconds.',
      table: { category: 'Visual', defaultValue: { summary: '225' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>
type DrawerArgs = Partial<ComponentProps<typeof Drawer>>

const DrawerDemo = (args: DrawerArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  const isHorizontal = args.anchor === 'top' || args.anchor === 'bottom'
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Flex flexDirection="column" gap={3} p={4} width={isHorizontal ? '100%' : '260px'}>
          <Typography variant="h6" m={0}>
            Drawer
          </Typography>
          <Typography variant="body2" color="secondary" m={0}>
            Slides in from the "{args.anchor}" edge. Press Escape or click the backdrop to close.
          </Typography>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Flex>
      </Drawer>
    </>
  )
}

export const Default: Story = {
  args: {
    anchor: 'left',
    elevation: 16,
    hasBackdrop: true,
    transitionDuration: 225,
  },
  render: (args) => <DrawerDemo {...args} />,
}
`,Rj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { gap, maxHeight, maxWidth, minHeight, minWidth } from '../utils/test/storiesArgs'
import {
  flexAlignItemsTokens,
  flexDirectionTokens,
  flexJustifyContentTokens,
  flexWrapTokens,
} from '../utils/test/storiesOptions'
import { View } from '../View'
import { Flex } from './Flex'

const meta: Meta<typeof Flex> = {
  title: 'Theme/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Extends [\`View\`](../View). Renders as a \`<div>\` with \`display: flex\` and \`flex-direction: column\` by default. All \`View\` props are inherited.',
      },
    },
    controls: {
      include: [
        'flexDirection',
        'justifyContent',
        'alignItems',
        'flexWrap',
        'gap',
        'p',
        'm',
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'border',
        'borderWidth',
        'borderStyle',
        'borderColor',
        'borderRadius',
        'opacity',
        'bg',
        'position',
      ],
    },
  },
  argTypes: {
    flexDirection: {
      control: { type: 'select' },
      options: flexDirectionTokens,
      description: 'CSS flex-direction.',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: { summary: 'column' },
      },
    },
    justifyContent: {
      control: { type: 'select' },
      options: flexJustifyContentTokens,
      description: 'CSS justify-content.',
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    alignItems: {
      control: { type: 'select' },
      options: flexAlignItemsTokens,
      description: 'CSS align-items.',
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    flexWrap: {
      control: { type: 'select' },
      options: flexWrapTokens,
      description: 'CSS flex-wrap.',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: { summary: 'nowrap' },
      },
    },
    gap,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  },
  args: {
    flexDirection: 'column',
    gap: 2,
    p: 2,
    width: '360px',
    height: '280px',
    bg: 'secondary',
    borderRadius: 'sm',
    children: (
      <>
        <View p={2} bg="primary" borderRadius="sm">
          A
        </View>
        <View p={2} bg="primary" borderRadius="sm">
          B
        </View>
        <View p={2} bg="primary" borderRadius="sm">
          C
        </View>
      </>
    ),
  },
}

export default meta
type Story = StoryObj<typeof Flex>

export const Column: Story = {
  args: { flexDirection: 'column' },
}

export const Row: Story = {
  args: { flexDirection: 'row' },
}

export const JustifyCenter: Story = {
  args: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    bg: 'secondary',
    borderRadius: 'sm',
  },
}

export const SpaceBetween: Story = {
  args: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    bg: 'secondary',
    borderRadius: 'sm',
  },
}

export const Wrap: Story = {
  args: { flexDirection: 'row', flexWrap: 'wrap', height: 'auto' },
  render: (args) => (
    <Flex {...args}>
      {Array.from({ length: 9 }, (_, i) => (
        <View key={i} p={2} bg="primary" borderRadius="sm" width="100px">
          {i + 1}
        </View>
      ))}
    </Flex>
  ),
}
`,zj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Paper } from '../Paper'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { TextInput } from '../TextInput'
import { FocusTrap } from './FocusTrap'

const meta: Meta<typeof FocusTrap> = {
  title: 'Theme/FocusTrap',
  component: FocusTrap,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'isEnabled',
        'shouldAutoFocus',
        'shouldTrapFocus',
        'shouldEnforceFocus',
        'shouldRestoreFocus',
      ],
    },
  },
  argTypes: {
    isEnabled: {
      control: 'boolean',
      description: 'When false, focus is neither moved nor trapped.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldAutoFocus: {
      control: 'boolean',
      description: 'Move focus into the trap when it activates.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'Keep Tab / Shift+Tab cycling within the trap.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldEnforceFocus: {
      control: 'boolean',
      description: 'Pull focus back inside whenever it escapes the trap.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldRestoreFocus: {
      control: 'boolean',
      description: 'Restore focus to the previously focused element when the trap deactivates.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof FocusTrap>

export const Default: Story = {
  args: {
    isEnabled: true,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
  },
  render: (args) => (
    <Flex flexDirection="column" gap={3} alignItems="flex-start">
      {/* Outside the trap: try to Tab or click here - with shouldEnforceFocus on,
          focus is pulled straight back inside the panel. */}
      <TextInput inputProps={{ placeholder: 'Outside the trap' }} />
      <FocusTrap {...args}>
        <Paper p={4} width="320px">
          <Flex flexDirection="column" gap={3}>
            <Typography variant="h5" m={0}>
              Focus trap
            </Typography>
            <Typography variant="body2" color="secondary" m={0}>
              Tab and Shift+Tab cycle through these fields without leaving the panel.
            </Typography>
            <TextInput fullWidth inputProps={{ placeholder: 'First name' }} />
            <TextInput fullWidth inputProps={{ placeholder: 'Last name' }} />
            <TextInput fullWidth inputProps={{ type: 'email', placeholder: 'Email' }} />
            <Button>Submit</Button>
          </Flex>
        </Paper>
      </FocusTrap>
    </Flex>
  ),
}
`,Bj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { formSizeTokens, formColorTokens, textColorTokens } from '../utils/test/storiesOptions'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { TextInput } from '../TextInput'
import { Flex } from '../Flex'
import { Form } from './Form'

const meta: Meta<typeof Form> = {
  title: 'Theme/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['size', 'color', 'textColor', 'disabled', 'fullWidth'] },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: formSizeTokens,
      description: 'Default control size for every field.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: formColorTokens,
      description: 'Default accent color for every field.',
      table: { category: 'Visual' },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description:
        "Default text color for every field's label/helper/input - resolves against \`theme.text\`.",
      table: { category: 'Visual' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables every field.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches every field to fill its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: { size: 'md', color: 'primary', fullWidth: true },
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Flex flexDirection="column" gap={4} maxWidth="420px">
        <FormControl>
          <Flex flexDirection="column" gap={1} alignItems="flex-start">
            <FormLabel>Name</FormLabel>
            <TextInput variant="outlined" placeholder="John Smith" />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex flexDirection="column" gap={1} alignItems="flex-start">
            <FormLabel>Email</FormLabel>
            <TextInput variant="outlined" placeholder="me@example.com" />
            <FormHelperText>We'll never share it.</FormHelperText>
          </Flex>
        </FormControl>
      </Flex>
    </Form>
  ),
}
`,Vj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { p, m } from '../utils/test/storiesArgs'
import { formSizeTokens, formColorTokens, textColorTokens } from '../utils/test/storiesOptions'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { TextInput } from '../TextInput'
import { Flex } from '../Flex'
import { FormControl } from './FormControl'

const meta: Meta<typeof FormControl> = {
  title: 'Theme/FormControl',
  component: FormControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'error',
        'disabled',
        'required',
        'size',
        'fullWidth',
        'color',
        'textColor',
        'p',
        'm',
      ],
    },
  },
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Marks the field invalid - trickles to the control and helper text.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the field - trickles to the control.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field required - trickles to the label indicator and control.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    size: {
      control: { type: 'select' },
      options: formSizeTokens,
      description: 'Control size - trickles to the control.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the field and control to fill the container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: formColorTokens,
      description: 'Accent color - trickles to the control.',
      table: { category: 'Visual' },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color for the label/helper/input - resolves against \`theme.text\`.',
      table: { category: 'Visual' },
    },
    p,
    m,
  },
}

export default meta
type Story = StoryObj<typeof FormControl>

export const Default: Story = {
  args: { required: true, fullWidth: true },
  render: (args) => (
    <FormControl {...args}>
      <Flex flexDirection="column" gap={1} alignItems="flex-start">
        <FormLabel>Email</FormLabel>
        <TextInput variant="outlined" placeholder="me@example.com" />
        <FormHelperText>We'll never share it.</FormHelperText>
      </Flex>
    </FormControl>
  ),
}

export const ErrorState: Story = {
  args: { error: true, required: true, fullWidth: true },
  render: (args) => (
    <FormControl {...args}>
      <Flex flexDirection="column" gap={1} alignItems="flex-start">
        <FormLabel>Email</FormLabel>
        <TextInput variant="outlined" value="not-an-email" onChange={() => {}} />
        <FormHelperText>Enter a valid e-mail address.</FormHelperText>
      </Flex>
    </FormControl>
  ),
}
`,Hj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { textColorTokens } from '../utils/test/storiesOptions'
import { FormControl } from '../FormControl'
import { FormHelperText } from './FormHelperText'

const meta: Meta<typeof FormHelperText> = {
  title: 'Theme/FormHelperText',
  component: FormHelperText,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['children', 'error', 'color'] },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Helper or error text.',
      table: { category: 'Content' },
    },
    error: {
      control: 'boolean',
      description:
        'Renders in the error color and announces via \`role="alert"\`. Falls back to the FormControl \`error\` value.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description:
        'Text color - resolves against \`theme.text\`. Inherits \`textColor\` from context when unset; ignored in the error state.',
      table: { category: 'Visual', defaultValue: { summary: 'secondary' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof FormHelperText>

export const Default: Story = {
  args: { children: "We'll never share it." },
}

export const ErrorState: Story = {
  args: { children: 'Enter a valid e-mail address.', error: true },
}

export const FromContext: Story = {
  render: () => (
    <FormControl id="email" error>
      <FormHelperText>Enter a valid e-mail address.</FormHelperText>
    </FormControl>
  ),
}
`,Uj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { textColorTokens } from '../utils/test/storiesOptions'
import { FormControl } from '../FormControl'
import { FormLabel } from './FormLabel'

const meta: Meta<typeof FormLabel> = {
  title: 'Theme/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['children', 'required', 'color'] },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text.',
      table: { category: 'Content' },
    },
    required: {
      control: 'boolean',
      description: 'Appends a \`*\` indicator. Falls back to the FormControl \`required\` value.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description:
        'Text color - resolves against \`theme.text\`. Inherits \`textColor\` from context when unset.',
      table: { category: 'Visual' },
    },
  },
}

export default meta
type Story = StoryObj<typeof FormLabel>

export const Default: Story = {
  args: { children: 'Email' },
}

export const Required: Story = {
  args: { children: 'Email', required: true },
}

export const FromContext: Story = {
  render: () => (
    <FormControl id="email" required>
      <FormLabel>Email</FormLabel>
    </FormControl>
  ),
}
`,Wj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { gap } from '../utils/test/storiesArgs'
import {
  gridAlignContentTokens,
  gridAlignItemsTokens,
  gridAutoFlowTokens,
  gridJustifyContentTokens,
  gridJustifyItemsTokens,
  spaceTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { View } from '../View'
import { Typography } from '../Typography'
import { Grid } from './Grid'

const Cell = ({ label }: { label: string }) => (
  <Flex p={2} bg="secondary" borderRadius="sm" alignItems="center" justifyContent="center">
    {label}
  </Flex>
)

const MDN_GRID_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout'
const RAW_CSS = \`Raw CSS string - grid layout values are structurally varied and can't be reduced to a fixed token set. See the [MDN Grid reference](\${MDN_GRID_URL}) for all valid values.\`

const meta: Meta<typeof Grid> = {
  title: 'Theme/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: \`A \\\`<div>\\\` with \\\`display: grid\\\` that extends **View**. Layout props (\\\`gridTemplateColumns\\\`, \\\`gridTemplateAreas\\\`, etc.) accept raw CSS strings - grid structures are too varied for a fixed token set. The \\\`gap\\\` prop is the exception: it resolves from \\\`theme.space\\\` like all spacing props.\\n\\n[MDN CSS Grid Layout reference](\${MDN_GRID_URL})\`,
      },
    },
    controls: {
      include: [
        'gridTemplateColumns',
        'gridTemplateRows',
        'gridTemplateAreas',
        'gridAutoFlow',
        'gridAutoColumns',
        'gridAutoRows',
        'gap',
        'columnGap',
        'rowGap',
        'justifyContent',
        'alignItems',
        'alignContent',
        'justifyItems',
        'p',
        'm',
      ],
    },
  },
  argTypes: {
    gridTemplateColumns: {
      control: 'text',
      description: \`Defines column track sizes. \${RAW_CSS}\\n\\n**Examples:** \\\`"repeat(3, 1fr)"\\\` · \\\`"200px 1fr"\\\` · \\\`"repeat(auto-fill, minmax(240px, 1fr))"\\\`\`,
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    gridTemplateRows: {
      control: 'text',
      description: \`Defines row track sizes. \${RAW_CSS}\\n\\n**Examples:** \\\`"60px auto 40px"\\\` · \\\`"repeat(3, 100px)"\\\`\`,
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    gridTemplateAreas: {
      control: 'text',
      description: \`Assigns named areas to grid cells using quoted row strings. \${RAW_CSS}\\n\\n**Example:** \\\`'"header header" "sidebar main"'\\\`\`,
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    gridAutoFlow: {
      control: { type: 'inline-radio' },
      options: gridAutoFlowTokens,
      description:
        'Controls the auto-placement algorithm direction. \`row\` fills each row before moving to the next; \`column\` fills each column first; \`dense\` backfills holes left by larger items.',
      table: { category: 'Layout', type: { summary: 'string' }, defaultValue: { summary: 'row' } },
    },
    gridAutoColumns: {
      control: 'text',
      description: \`Size applied to implicitly created columns (columns not defined in \\\`gridTemplateColumns\\\`). \${RAW_CSS}\\n\\n**Examples:** \\\`"100px"\\\` · \\\`"minmax(100px, auto)"\\\`\`,
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    gridAutoRows: {
      control: 'text',
      description: \`Size applied to implicitly created rows (rows not defined in \\\`gridTemplateRows\\\`). \${RAW_CSS}\\n\\n**Examples:** \\\`"80px"\\\` · \\\`"minmax(60px, auto)"\\\`\`,
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    gap: {
      ...gap,
      description:
        'Gap between all rows and columns - resolves from \`theme.space\`. Unlike the other grid props, this uses theme tokens (not a raw CSS string).',
    },
    columnGap: {
      control: { type: 'select' },
      options: spaceTokens,
      description:
        'Gap between columns - resolves from \`theme.space\`. Use when column and row gaps should differ; prefer \`gap\` when both axes match.',
      table: { category: 'Spacing', type: { summary: 'GapToken' }, defaultValue: { summary: '0' } },
    },
    rowGap: {
      control: { type: 'select' },
      options: spaceTokens,
      description:
        'Gap between rows - resolves from \`theme.space\`. Use when column and row gaps should differ; prefer \`gap\` when both axes match.',
      table: { category: 'Spacing', type: { summary: 'GapToken' }, defaultValue: { summary: '0' } },
    },
    justifyContent: {
      control: { type: 'select' },
      options: gridJustifyContentTokens,
      description: 'Aligns grid tracks along the inline (row) axis when there is extra space.',
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    alignItems: {
      control: { type: 'select' },
      options: gridAlignItemsTokens,
      description: 'Aligns grid items within their cell along the block (column) axis.',
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    alignContent: {
      control: { type: 'select' },
      options: gridAlignContentTokens,
      description: 'Aligns grid tracks along the block (column) axis when there is extra space.',
      table: { category: 'Layout', type: { summary: 'string' } },
    },
    justifyItems: {
      control: { type: 'select' },
      options: gridJustifyItemsTokens,
      description: 'Aligns grid items within their cell along the inline (row) axis.',
      table: { category: 'Layout', type: { summary: 'string' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
  },
  render: (args) => (
    <Grid {...args}>
      <Cell label="A" />
      <Cell label="B" />
      <Cell label="C" />
      <Cell label="D" />
    </Grid>
  ),
}

export const PlacementExample: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap={1}
      gridAutoRows="minmax(100px, auto)"
      maxWidth="940px"
    >
      <Grid
        gridColumn="1 / 3"
        gridRow="1"
        bg="backdrop"
        borderColor="primary"
        borderWidth="thin"
        borderStyle="solid"
        borderRadius="sm"
        p={2}
      >
        One
      </Grid>
      <Grid
        gridColumn="2 / 4"
        gridRow="1 / 3"
        bg="backdrop"
        borderColor="primary"
        borderWidth="thin"
        borderStyle="solid"
        borderRadius="sm"
        p={2}
      >
        Two
      </Grid>
      <Grid
        gridColumn="1"
        gridRow="2 / 5"
        bg="backdrop"
        borderColor="primary"
        borderWidth="thin"
        borderStyle="solid"
        borderRadius="sm"
        p={2}
      >
        Three
      </Grid>
      <Grid
        gridColumn="3"
        gridRow="3"
        bg="backdrop"
        borderColor="primary"
        borderWidth="thin"
        borderStyle="solid"
        borderRadius="sm"
        p={2}
      >
        Four
      </Grid>
      <Grid
        gridColumn="2"
        gridRow="4"
        bg="backdrop"
        borderColor="primary"
        borderWidth="thin"
        borderStyle="solid"
        borderRadius="sm"
        p={2}
      >
        Five
      </Grid>
      <Grid
        gridColumn="3"
        gridRow="4"
        bg="backdrop"
        borderColor="primary"
        borderWidth="thin"
        borderStyle="solid"
        borderRadius="sm"
        p={2}
      >
        Six
      </Grid>
    </Grid>
  ),
}

export const ColumnRowGap: Story = {
  args: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: 4,
    rowGap: 1,
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} label={String(i + 1)} />
      ))}
    </Grid>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3} p={2}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} label={String(i + 1)} />
      ))}
    </Grid>
  ),
}

export const AutoFill: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap={2} p={2}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i} label={String(i + 1)} />
      ))}
    </Grid>
  ),
}

export const NamedAreas: Story = {
  render: () => (
    <Grid
      gridTemplateAreas='"header header" "sidebar content" "footer footer"'
      gridTemplateColumns="180px 1fr"
      gridTemplateRows="auto 1fr auto"
      gap={2}
      p={2}
      height="300px"
    >
      <View bg="primary" p={2} borderRadius="sm" style={{ gridArea: 'header' }}>
        header
      </View>
      <View bg="secondary" p={2} borderRadius="sm" style={{ gridArea: 'sidebar' }}>
        sidebar
      </View>
      <View bg="secondary" p={2} borderRadius="sm" style={{ gridArea: 'content' }}>
        content
      </View>
      <View bg="primary" p={2} borderRadius="sm" style={{ gridArea: 'footer' }}>
        footer
      </View>
    </Grid>
  ),
}

export const GapScale: Story = {
  render: () => (
    <Grid gridTemplateColumns="1fr" gap={0}>
      {([0, 0.5, 1, 2, 3, 4] as const).map((g) => (
        <View key={g} mb={3}>
          <Typography variant="caption" as="div" color="secondary" mb={0.5}>
            gap={\`{\${g}}\`}
          </Typography>
          <Grid gridTemplateColumns="1fr 1fr 1fr" gap={g}>
            <Cell label="A" />
            <Cell label="B" />
            <Cell label="C" />
          </Grid>
        </View>
      ))}
    </Grid>
  ),
}

export const AutoRows: Story = {
  render: () => (
    <Grid gridTemplateColumns="1fr" gap={0}>
      <Typography variant="caption" as="div" color="secondary" mb={1}>
        Without gridAutoRows - row height follows content
      </Typography>
      <Grid gridTemplateColumns="repeat(4, 1fr)" gap={2} mb={4}>
        <Cell label="short" />
        <View bg="secondary" borderRadius="sm" p={2}>
          tall content that grows the row
        </View>
        <Cell label="short" />
        <Cell label="short" />
      </Grid>

      <Typography variant="caption" as="div" color="secondary" mb={1}>
        gridAutoRows="80px" - all rows fixed height
      </Typography>
      <Grid gridTemplateColumns="repeat(4, 1fr)" gridAutoRows="80px" gap={2}>
        <Cell label="1" />
        <Cell label="2" />
        <Cell label="3" />
        <Cell label="4" />
        <Cell label="5" />
        <Cell label="6" />
        <Cell label="7" />
        <Cell label="8" />
      </Grid>
    </Grid>
  ),
}

export const AutoFlow: Story = {
  render: () => (
    <Grid gridTemplateColumns="1fr" gap={0}>
      <Typography variant="caption" as="div" color="secondary" mb={1}>
        gridAutoFlow="row" (default) - items fill row by row
      </Typography>
      <Grid gridTemplateColumns="repeat(3, 1fr)" gridAutoFlow="row" gap={2} mb={4}>
        {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
          <Cell key={l} label={l} />
        ))}
      </Grid>

      <Typography variant="caption" as="div" color="secondary" mb={1}>
        gridAutoFlow="column" - items fill column by column
      </Typography>
      <Grid gridTemplateRows="repeat(2, 60px)" gridAutoFlow="column" gap={2}>
        {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
          <Cell key={l} label={l} />
        ))}
      </Grid>
    </Grid>
  ),
}

export const SpanningItems: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      <Grid gridColumn="1 / -1" bg="primary" p={2} borderRadius="sm" justifyContent="center">
        gridColumn="1 / -1" - full width
      </Grid>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Grid gridColumn="1 / 3" bg="secondary" p={2} borderRadius="sm" justifyContent="center">
        gridColumn="1 / 3" - spans 2
      </Grid>
      <Cell label="5" />
      <Cell label="6" />
      <Grid
        gridRow="3 / 5"
        gridColumn="3"
        bg="primary"
        p={2}
        borderRadius="sm"
        justifyContent="center"
      >
        gridRow="3/5"
      </Grid>
      <Cell label="7" />
    </Grid>
  ),
}

export const AsymmetricGap: Story = {
  render: () => (
    <Grid gridTemplateColumns="1fr" gap={0}>
      <Typography variant="caption" as="div" color="secondary" mb={1}>
        columnGap={'{4}'} (32px) · rowGap={'{1}'} (8px)
      </Typography>
      <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap={4} rowGap={1} mb={4}>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i} label={String(i + 1)} />
        ))}
      </Grid>

      <Typography variant="caption" as="div" color="secondary" mb={1}>
        columnGap={'{1}'} · rowGap={'{4}'}
      </Typography>
      <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap={1} rowGap={4}>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i} label={String(i + 1)} />
        ))}
      </Grid>
    </Grid>
  ),
}

export const GridAreaProp: Story = {
  render: () => (
    <Grid
      gridTemplateAreas='"header header header" "sidebar main main" "footer footer footer"'
      gridTemplateColumns="140px 1fr 1fr"
      gridTemplateRows="48px 1fr 40px"
      gap={2}
      p={2}
      height="280px"
    >
      <Grid gridArea="header" bg="primary" p={2} borderRadius="sm" alignItems="center">
        gridArea="header"
      </Grid>
      <Grid gridArea="sidebar" bg="secondary" p={2} borderRadius="sm" alignItems="center">
        gridArea="sidebar"
      </Grid>
      <Grid gridArea="main" bg="secondary" p={2} borderRadius="sm" alignItems="center">
        gridArea="main"
      </Grid>
      <Grid gridArea="footer" bg="primary" p={2} borderRadius="sm" alignItems="center">
        gridArea="footer"
      </Grid>
    </Grid>
  ),
}
`,Gj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { textColorTokens } from '../utils/test/storiesOptions'
import { Icon } from './Icon'
import { icons } from './icons'

const iconNames = Object.keys(icons)

const meta: Meta<typeof Icon> = {
  title: 'Theme/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['name', 'color', 'size'],
    },
  },
  args: {
    name: 'hub',
    color: 'primary',
    size: '3rem',
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: iconNames,
      description: 'Registry key of the icon to render.',
      table: { category: 'Content' },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Icon color - resolves from \`theme.text\` and fills the SVG via \`currentColor\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'text',
      description: 'Sets both width and height - any valid CSS length.',
      table: { category: 'Layout', defaultValue: { summary: '1.5rem' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Icon name="hub" color="primary" size="3rem" />
      <Icon name="hub" color="secondary" size="3rem" />
      <Icon name="hub" color="initial" size="3rem" />
    </div>
  ),
}

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', maxWidth: '480px' }}>
      {iconNames.map((name) => (
        <Icon key={name} name={name as keyof typeof icons} color="primary" size="2rem" />
      ))}
    </div>
  ),
}
`,Kj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { borderRadius, height, m, p, width } from '../utils/test/storiesArgs'
import { objectFitTokens } from '../utils/test/storiesOptions'
import { Image } from './Image'

const DEMO_IMG = '/soroush.svg'

const meta: Meta<typeof Image> = {
  title: 'Theme/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'src',
        'srcSet',
        'alt',
        'fallback',
        'width',
        'height',
        'objectFit',
        'borderRadius',
        'm',
        'p',
      ],
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Primary image URL.',
      table: { category: 'Content' },
    },
    srcSet: {
      control: 'text',
      description: 'Responsive image URLs - used as primary source when \`src\` is absent.',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: 'Alt text - required for accessibility.',
      table: { category: 'Content' },
    },
    fallback: {
      control: 'text',
      description: 'Fallback URL tried when primary source fails. \`onError\` fires when both fail.',
      table: { category: 'Content' },
    },
    width,
    height,
    objectFit: {
      control: { type: 'select' },
      options: objectFitTokens,
      description: 'CSS object-fit - controls how the image fills its container.',
      table: { category: 'Layout' },
    },
    borderRadius,
    m,
    p,
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: DEMO_IMG,
    alt: 'Soroush logo',
    width: '200px',
    height: '200px',
    objectFit: 'contain',
  },
}

export const Cover: Story = {
  args: {
    src: DEMO_IMG,
    alt: 'Cover',
    width: '300px',
    height: '200px',
    objectFit: 'cover',
  },
}

export const WithFallback: Story = {
  args: {
    src: 'broken.jpg',
    fallback: DEMO_IMG,
    alt: 'With fallback',
    width: '200px',
    height: '200px',
    objectFit: 'contain',
  },
}

export const ObjectFitVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {objectFitTokens.map((fit) => (
        <div key={fit} style={{ textAlign: 'center' }}>
          <Image src={DEMO_IMG} alt={fit} width="150px" height="120px" objectFit={fit} />
          <p style={{ fontSize: '12px', margin: '4px 0 0' }}>{fit}</p>
        </div>
      ))}
    </div>
  ),
}
`,qj=`import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { m } from '../utils/test/storiesArgs'
import {
  linearProgressColorTokens,
  linearProgressEasingTokens,
  linearProgressVariantTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { LinearProgress } from './LinearProgress'

const meta: Meta<typeof LinearProgress> = {
  title: 'Theme/LinearProgress',
  component: LinearProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'color',
        'thickness',
        'value',
        'buffer',
        'valueBuffer',
        'min',
        'max',
        'spinning',
        'easing',
        'showTrack',
        'round',
        'm',
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: linearProgressVariantTokens,
      description: 'Visual variant - looping animation, value-driven bar, or reversed loop.',
      table: { category: 'Visual', defaultValue: { summary: 'indeterminate' } },
    },
    color: {
      control: { type: 'select' },
      options: linearProgressColorTokens,
      description:
        'Bar color - resolves to \`theme.palette[color].main\`; \`"inherit"\` uses \`currentColor\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    thickness: {
      control: { type: 'number' },
      description: 'Bar height in px (number) or raw CSS unit (string).',
      table: { category: 'Visual', defaultValue: { summary: '4' } },
    },
    value: {
      control: { type: 'number' },
      description: 'Progress value for the \`"determinate"\` variant (clamped between min and max).',
      table: { category: 'Progress' },
    },
    buffer: {
      control: 'boolean',
      description:
        'Renders a buffer bar driven by \`valueBuffer\` behind a \`"determinate"\` bar, with a dotted leading edge.',
      table: { category: 'Progress', defaultValue: { summary: 'false' } },
    },
    valueBuffer: {
      control: { type: 'number' },
      description: 'Buffer value when \`buffer\` is set (clamped between min and max).',
      table: { category: 'Progress' },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value for the \`"determinate"\` variant.',
      table: { category: 'Progress', defaultValue: { summary: '0' } },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value for the \`"determinate"\` variant.',
      table: { category: 'Progress', defaultValue: { summary: '100' } },
    },
    spinning: {
      control: 'boolean',
      description:
        'Sends the value-length segment travelling along a \`"determinate"\` track, wrapping past the end back to the beginning.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    easing: {
      control: { type: 'inline-radio' },
      options: linearProgressEasingTokens,
      description: 'Timing function for the value transition and the \`spinning\` travel.',
      table: { category: 'Visual', defaultValue: { summary: 'linear' } },
    },
    showTrack: {
      control: 'boolean',
      description: 'Renders the faint track behind the bars (dotted edge when \`buffer\` is set).',
      table: { category: 'Visual', defaultValue: { summary: 'true' } },
    },
    round: {
      control: 'boolean',
      description: "Rounds the bar's corners into a pill shape.",
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof LinearProgress>

export const Default: Story = {
  args: {
    variant: 'indeterminate',
    color: 'primary',
  },
}

export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 70,
    color: 'primary',
  },
}

export const Buffer: Story = {
  args: {
    variant: 'determinate',
    buffer: true,
    value: 40,
    valueBuffer: 70,
    color: 'primary',
  },
}

export const Query: Story = {
  args: {
    variant: 'query',
    color: 'primary',
  },
}

export const SpinningDeterminate: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {([25, 50, 75] as const).map((value) => (
        <Flex key={value} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {value}%
          </Typography>
          <LinearProgress variant="determinate" value={value} spinning />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const).map((color) => (
        <Flex key={color} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {color}
          </Typography>
          <LinearProgress variant="determinate" value={65} color={color} />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Thickness: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {([2, 4, 8, 12] as const).map((thickness) => (
        <Flex key={thickness} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {thickness}px
          </Typography>
          <LinearProgress variant="determinate" value={65} thickness={thickness} />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Easing: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'] as const).map((easing) => (
        <Flex key={easing} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {easing}
          </Typography>
          <LinearProgress variant="determinate" value={65} spinning easing={easing} />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Rounded: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {([4, 8, 12] as const).map((thickness) => (
        <Flex key={thickness} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {thickness}px
          </Typography>
          <LinearProgress variant="determinate" value={65} thickness={thickness} round />
        </Flex>
      ))}
    </Flex>
  ),
}

export const WithoutTrack: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      <Flex flexDirection="row" gap={2} alignItems="center">
        <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
          with track
        </Typography>
        <LinearProgress variant="determinate" value={65} />
      </Flex>
      <Flex flexDirection="row" gap={2} alignItems="center">
        <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
          without
        </Typography>
        <LinearProgress variant="determinate" value={65} showTrack={false} />
      </Flex>
    </Flex>
  ),
}

const useAnimatedProgress = (start: number, step: number, intervalMs: number) => {
  const [progress, setProgress] = useState(start)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => (value >= 100 ? start : value + step))
    }, intervalMs)
    return () => clearInterval(timer)
  }, [start, step, intervalMs])
  return progress
}

const AnimatedDeterminate = () => {
  const progress = useAnimatedProgress(10, 10, 800)
  return <LinearProgress variant="determinate" value={progress} aria-label="Export data" />
}

/** Live determinate bar - \`value\` updates on a timer and the bar transitions to it. */
export const DeterminateAnimated: Story = {
  render: () => <AnimatedDeterminate />,
}

const AnimatedBuffer = () => {
  const progress = useAnimatedProgress(10, 10, 800)
  const buffer = Math.min(progress + 20, 100)
  return (
    <LinearProgress
      variant="determinate"
      buffer
      value={progress}
      valueBuffer={buffer}
      aria-label="Loading data"
    />
  )
}

/** Live buffer mode - \`valueBuffer\` stays ahead of \`value\` as both advance. */
export const BufferAnimated: Story = {
  render: () => <AnimatedBuffer />,
}

const ProgressWithLabel = () => {
  const progress = useAnimatedProgress(20, 10, 800)
  return (
    <Flex flexDirection="column" gap={1}>
      <Typography variant="body2" color="secondary" m={0}>
        Uploading photos...
      </Typography>
      <Flex flexDirection="row" alignItems="center" gap={2}>
        <LinearProgress variant="determinate" value={progress} aria-label="Uploading photos" />
        <Typography variant="caption" color="secondary" m={0} flexShrink={0}>
          {\`\${Math.round(progress)}%\`}
        </Typography>
      </Flex>
    </Flex>
  )
}

/** Progress value displayed alongside the bar. */
export const WithLabel: Story = {
  render: () => <ProgressWithLabel />,
}

const ELEVATOR_FLOORS = ['Ground floor', 'First floor', 'Second floor', 'Third floor'] as const

const ElevatorStatus = () => {
  const [floor, setFloor] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setFloor((current) => (current + 1) % ELEVATOR_FLOORS.length)
    }, 1200)
    return () => clearInterval(timer)
  }, [])
  const value = (floor / (ELEVATOR_FLOORS.length - 1)) * 100
  return (
    <Flex flexDirection="column" gap={1}>
      <Typography variant="body2" color="secondary" m={0}>
        Elevator status: {ELEVATOR_FLOORS[floor]}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        aria-label="Elevator status"
        aria-valuetext={ELEVATOR_FLOORS[floor]}
      />
    </Flex>
  )
}

/**
 * By default assistive technology reads the progress value as a percentage.
 * Use \`aria-valuetext\` when the value does not represent a percentage.
 */
export const CustomValueText: Story = {
  render: () => <ElevatorStatus />,
}

export const CustomRange: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(
        [
          { value: 3, min: 0, max: 10, label: '3 of 10' },
          { value: 120, min: 0, max: 200, label: '120 of 200' },
        ] as const
      ).map(({ value, min, max, label }) => (
        <Flex key={label} flexDirection="row" gap={2} alignItems="center">
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {label}
          </Typography>
          <LinearProgress variant="determinate" value={value} min={min} max={max} />
        </Flex>
      ))}
    </Flex>
  ),
}
`,Jj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { m, p } from '../utils/test/storiesArgs'
import {
  linkUnderlineTokens,
  linkTargetTokens,
  linkRelTokens,
  textColorTokens,
  typographyVariantTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Theme/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['children', 'href', 'underline', 'variant', 'color', 'target', 'rel', 'm', 'p'],
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Link text content.',
      table: { category: 'Content' },
    },
    href: {
      control: 'text',
      description: 'URL the link points to.',
      table: { category: 'Content' },
    },
    target: {
      control: { type: 'select' },
      options: linkTargetTokens,
      description:
        'Specifies where to open the linked URL. Setting \`"_blank"\` auto-injects \`rel="noopener noreferrer"\` unless \`rel\` is already provided.',
      table: { category: 'Content', defaultValue: { summary: '_self' } },
    },
    rel: {
      control: { type: 'select' },
      options: linkRelTokens,
      description:
        'Relationship between the document and the linked resource. Only values valid for \`<a>\` are listed; space-separate multiple values manually.',
      table: { category: 'Content' },
    },
    underline: {
      control: { type: 'inline-radio' },
      options: linkUnderlineTokens,
      description:
        'Controls \`text-decoration\`. \`"hover"\` shows the underline only on pointer hover.',
      table: { category: 'Visual', defaultValue: { summary: 'always' } },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Semantic text color - resolves from \`theme.text\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    variant: {
      control: { type: 'select' },
      options: typographyVariantTokens,
      description: 'Typographic scale. Inherits surrounding text size by default (\`"inherit"\`).',
      table: { category: 'Typography', defaultValue: { summary: 'inherit' } },
    },
    m,
    p,
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Visit the design system docs',
  },
}

export const Underline: Story = {
  render: () => (
    <Flex>
      {linkUnderlineTokens.map((u) => (
        <Flex key={u} flexDirection="row" alignItems="center" mb={2}>
          <Typography variant="caption" color="secondary" width="4rem" flexShrink={0} m={0}>
            {u}
          </Typography>
          <Link href="#" underline={u}>
            {u === 'hover' ? 'Hover to see underline' : \`underline="\${u}"\`}
          </Link>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: (props) => (
    <Flex>
      {textColorTokens.map((c) => (
        <Flex key={c} flexDirection="row" alignItems="center" mb={1}>
          <Typography variant="caption" width="6rem" flexShrink={0} m={0} color="secondary">
            {c}
          </Typography>
          <Link href="#" {...props} color={c}>
            {c}
          </Link>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Variants: Story = {
  render: () => (
    <Flex>
      {typographyVariantTokens.map((v) => (
        <Flex key={v} flexDirection="row" alignItems="center" mb={1}>
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {v}
          </Typography>
          <Link href="#" variant={v} m={0}>
            {v} link
          </Link>
        </Flex>
      ))}
    </Flex>
  ),
}

export const InlineProse: Story = {
  render: () => (
    <Typography variant="body1" maxWidth="480px">
      The design system is built with <Link href="#">Emotion</Link> and{' '}
      <Link href="#">styled-system</Link>. All components resolve color, spacing, and typography
      from theme tokens - see the{' '}
      <Link href="#" underline="hover" color="secondary">
        design-system docs
      </Link>{' '}
      for details.
    </Typography>
  ),
}
`,Yj=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  asTokens,
  buttonColorTokens,
  textColorTokens,
  textInputSizeTokens,
} from '../utils/test/storiesOptions'
import { Paper } from '../Paper'
import { MenuItem } from './MenuItem'

const meta: Meta<typeof MenuItem> = {
  title: 'Theme/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'value',
        'children',
        'disabled',
        'selected',
        'highlighted',
        'multiple',
        'color',
        'textColor',
        'size',
        'dense',
        'disableGutters',
        'divider',
        'autoFocus',
        'as',
      ],
    },
  },
  args: {
    value: 'web',
    children: 'Web',
    color: 'primary',
    size: 'md',
  },
  argTypes: {
    value: {
      control: 'text',
      description: "The value this option represents - reported to Select's onChange.",
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'The option label.',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the option.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    selected: {
      control: 'boolean',
      description: 'Marks the option as selected. Injected by Select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    highlighted: {
      control: 'boolean',
      description: 'Marks the option as keyboard-highlighted. Injected by Select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Reserves a leading checkmark slot. Injected by Select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Accent color - resolves to \`theme.palette[color]\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Base text color of the row - resolves against \`theme.text\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Density - resolves against \`theme.sizes\`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    dense: {
      control: 'boolean',
      description: 'Compact vertical padding, independent of \`size\`.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    disableGutters: {
      control: 'boolean',
      description: 'Remove the left and right padding.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    divider: {
      control: 'boolean',
      description: 'Add a 1px bottom border to separate the row.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Focus the row on first mount (and when it flips false → true).',
      table: { category: 'Focus', defaultValue: { summary: 'false' } },
    },
    as: {
      control: { type: 'select' },
      options: asTokens,
      description: 'The element used for the root node.',
      table: { category: 'Layout', defaultValue: { summary: 'li' } },
    },
  },
  decorators: [
    (Story) => (
      <Paper elevation={8} p={0} borderRadius="sm" style={{ width: 220 }}>
        <ul style={{ margin: 0, padding: '0.25rem 0', listStyle: 'none' }}>
          <Story />
        </ul>
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {}

export const Selected: Story = {
  args: { selected: true },
}

export const States: Story = {
  render: () => (
    <>
      <MenuItem value="a">Default</MenuItem>
      <MenuItem value="b" highlighted>
        Highlighted
      </MenuItem>
      <MenuItem value="c" selected>
        Selected
      </MenuItem>
      <MenuItem value="d" disabled>
        Disabled
      </MenuItem>
    </>
  ),
}

export const MultipleWithCheckmark: Story = {
  render: () => (
    <>
      <MenuItem value="a" multiple selected>
        Selected
      </MenuItem>
      <MenuItem value="b" multiple>
        Unselected
      </MenuItem>
    </>
  ),
}

export const DividersAndDense: Story = {
  render: () => (
    <>
      <MenuItem value="a" divider>
        Profile
      </MenuItem>
      <MenuItem value="b" divider>
        Settings
      </MenuItem>
      <MenuItem value="c" dense>
        Compact row
      </MenuItem>
      <MenuItem value="d" dense>
        Another compact row
      </MenuItem>
    </>
  ),
}
`,Xj=`import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { modalScrollTokens } from '../utils/test/storiesOptions'
import { Button } from '../Button'
import { Paper } from '../Paper'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { TextInput } from '../TextInput'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Theme/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'scroll',
        'hasBackdrop',
        'shouldUsePortal',
        'shouldKeepMounted',
        'shouldLockScroll',
        'shouldAutoFocus',
        'shouldTrapFocus',
        'shouldEnforceFocus',
        'shouldRestoreFocus',
      ],
    },
  },
  argTypes: {
    scroll: {
      control: { type: 'inline-radio' },
      options: modalScrollTokens,
      description:
        'Whether long content scrolls within the surface (paper) or the whole root (body).',
      table: { category: 'Layout', defaultValue: { summary: 'paper' } },
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'Render the dimmed backdrop behind the content.',
      table: { category: 'Visual', defaultValue: { summary: 'true' } },
    },
    shouldUsePortal: {
      control: 'boolean',
      description: 'Portal the modal into the document body.',
      table: { category: 'Visual', defaultValue: { summary: 'true' } },
    },
    shouldKeepMounted: {
      control: 'boolean',
      description: 'Keep the children mounted while the modal is closed.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldLockScroll: {
      control: 'boolean',
      description: 'Lock body scroll while the modal is open.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldAutoFocus: {
      control: 'boolean',
      description: 'Move focus into the modal on open.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'Trap Tab focus within the modal.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldEnforceFocus: {
      control: 'boolean',
      description: 'Pull focus back into the modal whenever it escapes.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldRestoreFocus: {
      control: 'boolean',
      description: 'Restore focus to the trigger on close.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>
type ModalArgs = Partial<ComponentProps<typeof Modal>>

const DefaultDemo = (args: ModalArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Paper role="dialog" aria-modal="true" aria-label="Example dialog" p={4} width="320px">
          <Flex flexDirection="column" gap={3}>
            <Typography variant="h5" m={0}>
              Modal title
            </Typography>
            <Typography variant="body2" color="secondary" m={0}>
              Press Escape, click the backdrop, or use the button to close.
            </Typography>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Flex>
        </Paper>
      </Modal>
    </>
  )
}

export const Default: Story = {
  args: {
    scroll: 'paper',
    hasBackdrop: true,
    shouldUsePortal: true,
    shouldKeepMounted: false,
    shouldLockScroll: true,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
  },
  render: (args) => <DefaultDemo {...args} />,
}

const NestedDemo = (args: ModalArgs) => {
  const [isOuterOpen, setIsOuterOpen] = useState(false)
  const [isInnerOpen, setIsInnerOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOuterOpen(true)}>Open modal</Button>
      <Modal {...args} isOpen={isInnerOpen} onClose={() => setIsInnerOpen(false)}>
        <Paper role="dialog" aria-modal="true" aria-label="Nested dialog" p={4} width="300px">
          <Flex flexDirection="column" gap={3}>
            <Typography variant="h5" m={0}>
              Nested modal
            </Typography>
            <Typography variant="body2" color="secondary" m={0}>
              Layered above the outer modal, with its own backdrop and focus trap.
            </Typography>
            <Button onClick={() => setIsInnerOpen(false)}>Close</Button>
          </Flex>
        </Paper>
      </Modal>
      <Modal {...args} isOpen={isOuterOpen} onClose={() => setIsOuterOpen(false)}>
        <Paper
          role="dialog"
          aria-modal="true"
          aria-label="Outer dialog"
          p={4}
          width="360px"
          borderRadius="lg"
        >
          <Flex flexDirection="column" gap={3}>
            <Typography variant="h5" m={0}>
              Outer modal
            </Typography>
            <Typography variant="body2" color="secondary" m={0}>
              Open a second modal on top. The manager stacks it above and Escape closes the top one
              first.
            </Typography>
            <Button onClick={() => setIsInnerOpen(true)}>Open nested modal</Button>
            <Button onClick={() => setIsOuterOpen(false)}>Close</Button>
          </Flex>
        </Paper>
      </Modal>
    </>
  )
}

export const Nested: Story = {
  args: {
    scroll: 'paper',
    hasBackdrop: true,
    shouldUsePortal: true,
    shouldKeepMounted: false,
    shouldLockScroll: true,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
  },
  render: (args) => <NestedDemo {...args} />,
}

const ScrollPaperDemo = (args: ModalArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  const backgroundLines = Array.from({ length: 30 }, (_, i) => \`Background line \${i + 1}\`)
  const paragraphs = Array.from({ length: 20 }, (_, i) => \`Paragraph \${i + 1}\`)
  return (
    <>
      <Flex flexDirection="column" gap={2}>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        {/* Tall filler so the page scrolls; opening the modal locks body scroll. */}
        {backgroundLines.map((line) => (
          <Typography key={line} variant="body2" color="secondary" m={0}>
            {line} - background scroll is locked while the modal is open.
          </Typography>
        ))}
      </Flex>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Paper
          role="dialog"
          aria-modal="true"
          aria-label="Paper-scroll dialog"
          p={4}
          width="700px"
          maxWidth="80vW"
          maxHeight="70vh"
          overflow="auto"
        >
          <Flex flexDirection="column" gap={3}>
            <Typography variant="h5" m={0}>
              Paper-scroll modal
            </Typography>
            {paragraphs.map((paragraph) => (
              <Typography key={paragraph} variant="body2" color="secondary" m={0}>
                {paragraph} - content scrolls within the surface while the page stays put.
              </Typography>
            ))}
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Flex>
        </Paper>
      </Modal>
    </>
  )
}

export const ScrollPaper: Story = {
  args: {
    scroll: 'paper',
    hasBackdrop: true,
    shouldUsePortal: true,
    shouldKeepMounted: false,
    shouldLockScroll: true,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
  },
  render: (args) => <ScrollPaperDemo {...args} />,
}

const ScrollBodyDemo = (args: ModalArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  const paragraphs = Array.from({ length: 40 }, (_, i) => \`Paragraph \${i + 1}\`)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* No height cap: the surface grows past the viewport and the whole root scrolls. */}
        <Paper
          role="dialog"
          aria-modal="true"
          aria-label="Body-scroll dialog"
          p={4}
          m={4}
          width="600px"
          maxWidth="80vW"
        >
          <Flex flexDirection="column" gap={3}>
            <Typography variant="h5" m={0}>
              Body-scroll modal
            </Typography>
            {paragraphs.map((paragraph) => (
              <Typography key={paragraph} variant="body2" color="secondary" m={0}>
                {paragraph} - the surface and backdrop scroll together within the root.
              </Typography>
            ))}
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Flex>
        </Paper>
      </Modal>
    </>
  )
}

export const ScrollBody: Story = {
  args: {
    scroll: 'body',
    hasBackdrop: true,
    shouldUsePortal: true,
    shouldKeepMounted: false,
    shouldLockScroll: true,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
  },
  render: (args) => <ScrollBodyDemo {...args} />,
}

const FormDemo = (args: ModalArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open form</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Paper role="dialog" aria-modal="true" aria-label="Sign in" p={4} width="360px">
          <Flex
            as="form"
            flexDirection="column"
            gap={3}
            onSubmit={(event) => {
              event.preventDefault()
              setIsOpen(false)
            }}
          >
            <Typography variant="h5" m={0}>
              Sign in
            </Typography>
            <TextInput fullWidth autoFocus inputProps={{ placeholder: 'Email' }} />
            <TextInput fullWidth inputProps={{ type: 'password', placeholder: 'Password' }} />
            <Flex gap={2} justifyContent="flex-end">
              <Button type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Flex>
          </Flex>
        </Paper>
      </Modal>
    </>
  )
}

export const Form: Story = {
  args: {
    scroll: 'paper',
    hasBackdrop: true,
    shouldUsePortal: true,
    shouldKeepMounted: false,
    shouldLockScroll: true,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
  },
  render: (args) => <FormDemo {...args} />,
}
`,Zj=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { m, p, width, minWidth, maxWidth } from '../utils/test/storiesArgs'
import {
  backgroundTokens,
  textInputColorTokens,
  textInputVariantTokens,
  textInputSizeTokens,
  textColorTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { NativeSelect, type NativeSelectProps } from './NativeSelect'

const platformOptions = [
  { label: 'Web', value: 'web' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
]

const rowsOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
]

const meta: Meta<typeof NativeSelect> = {
  title: 'Theme/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'color',
        'textColor',
        'bg',
        'size',
        'disabled',
        'error',
        'required',
        'fullWidth',
        'placeholder',
        'iconName',
        'p',
        'm',
        'width',
        'minWidth',
        'maxWidth',
      ],
    },
  },
  args: {
    options: platformOptions,
    placeholder: 'Pick a platform',
    variant: 'outlined',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: textInputVariantTokens,
      description:
        '\`outlined\`/\`default\` - full border box · \`underline\` - bottom border only · \`text\` - no border.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    color: {
      control: { type: 'select' },
      options: textInputColorTokens,
      description: 'Focus/active border color - resolves to \`theme.palette[color]\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color of the selected value - resolves against \`theme.text\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    bg: {
      control: { type: 'select' },
      options: backgroundTokens,
      description: 'Background color - resolves against \`theme.background\`.',
      table: { category: 'Visual', defaultValue: { summary: 'terminal' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Controls padding and font size - resolves against \`theme.sizes\`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'Marks the field as invalid - applies error border color.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the native select as required.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the root to fill its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Empty-state label shown while nothing is selected.',
      table: { category: 'Content' },
    },
    iconName: {
      control: 'text',
      description: 'Dropdown affordance icon from the Icon registry.',
      table: { category: 'Visual', defaultValue: { summary: 'expand_more' } },
    },
    p,
    m,
    width,
    minWidth,
    maxWidth,
  },
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['outlined', 'default', 'underline', 'text'] as const).map((variant) => (
        <NativeSelect
          key={variant}
          variant={variant}
          options={platformOptions}
          placeholder={variant}
        />
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex gap={3} alignItems="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <NativeSelect
          key={size}
          size={size}
          variant="outlined"
          options={platformOptions}
          placeholder={size}
        />
      ))}
    </Flex>
  ),
}

export const ErrorState: Story = {
  args: { error: true },
}

function ControlledNativeSelect(props: Readonly<Partial<NativeSelectProps>>) {
  const [rowsPerPage, setRowsPerPage] = useState<string | number>(25)
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography variant="caption" color="secondary">
        Rows per page: {rowsPerPage}
      </Typography>
      <NativeSelect
        variant="outlined"
        options={rowsOptions}
        value={rowsPerPage}
        onChange={setRowsPerPage}
        {...props}
      />
    </Flex>
  )
}

export const Controlled: Story = {
  render: () => <ControlledNativeSelect />,
}
`,Qj=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  paginationColor,
  paginationVariant,
  paginationShape,
  paginationSize,
  shouldShowFirstButton,
  shouldShowLastButton,
} from '../utils/test/storiesArgs'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Theme/Pagination/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'count',
        'defaultPage',
        'siblingCount',
        'boundaryCount',
        'color',
        'variant',
        'shape',
        'size',
        'disabled',
        'shouldShowFirstButton',
        'shouldShowLastButton',
        'shouldHidePrevButton',
        'shouldHideNextButton',
      ],
    },
  },
  args: {
    count: 10,
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 0 },
      description: 'Total number of pages.',
      table: { category: 'Content' },
    },
    defaultPage: {
      control: { type: 'number', min: 1 },
      description: 'Uncontrolled initial page (1-based).',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    siblingCount: {
      control: { type: 'number', min: 0 },
      description: 'Pages always visible either side of the current page.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    boundaryCount: {
      control: { type: 'number', min: 0 },
      description: 'Pages always visible at the start and end.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    color: paginationColor,
    variant: paginationVariant,
    shape: paginationShape,
    size: paginationSize,
    disabled: {
      control: 'boolean',
      description: 'Disables every item.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldShowFirstButton,
    shouldShowLastButton,
    shouldHidePrevButton: {
      control: 'boolean',
      description: 'Hides the previous-page button.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldHideNextButton: {
      control: 'boolean',
      description: 'Hides the next-page button.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}

export const Outlined: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      <Pagination count={10} variant="outlined" />
      <Pagination count={10} variant="outlined" color="secondary" />
      <Pagination count={10} variant="outlined" disabled />
    </Flex>
  ),
}

export const Rounded: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Pagination key={size} count={10} size={size} />
      ))}
    </Flex>
  ),
}

export const Buttons: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      <Pagination count={10} shouldShowFirstButton shouldShowLastButton />
      <Pagination count={10} shouldHidePrevButton shouldHideNextButton />
    </Flex>
  ),
}

export const Ranges: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination count={11} defaultPage={6} />
      <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
      <Pagination count={11} defaultPage={6} boundaryCount={2} />
    </Flex>
  ),
}

function ControlledPagination() {
  const [page, setPage] = useState(1)
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography variant="caption" color="secondary">
        Page: {page}
      </Typography>
      <Pagination count={10} page={page} onChange={setPage} />
    </Flex>
  )
}

export const Controlled: Story = {
  render: () => <ControlledPagination />,
}
`,$j=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  paginationColor,
  paginationVariant,
  paginationShape,
  paginationSize,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { Flex } from '@soroush.tech/design-system/Flex'
import { PaginationItem } from './PaginationItem'

const meta: Meta<typeof PaginationItem> = {
  title: 'Theme/Pagination/PaginationItem',
  component: PaginationItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['type', 'page', 'isSelected', 'color', 'variant', 'shape', 'size', 'disabled'],
    },
  },
  args: {
    type: 'page',
    page: 1,
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['page', 'first', 'previous', 'next', 'last', 'start-ellipsis', 'end-ellipsis'],
      description: 'What the item renders - page number, nav control, or ellipsis.',
      table: { category: 'Content', defaultValue: { summary: 'page' } },
    },
    page: {
      control: { type: 'number', min: 1 },
      description: 'The page number/content for \`type="page"\`.',
      table: { category: 'Content' },
    },
    isSelected: {
      control: 'boolean',
      description: 'Active styling for the current page - also sets \`aria-current="page"\`.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    color: paginationColor,
    variant: paginationVariant,
    shape: paginationShape,
    size: paginationSize,
    disabled: {
      control: 'boolean',
      description: 'Disables the item.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof PaginationItem>

export const Default: Story = {}

export const AllTypes: Story = {
  render: () => (
    <Flex gap={2} alignItems="center">
      <PaginationItem type="first" />
      <PaginationItem type="previous" />
      <PaginationItem page={1} />
      <PaginationItem page={2} isSelected />
      <PaginationItem type="start-ellipsis" />
      <PaginationItem page={9} />
      <PaginationItem type="next" />
      <PaginationItem type="last" />
    </Flex>
  ),
}
`,eM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { bg, cursor, height, m, opacity, p, width } from '../utils/test/storiesArgs'
import { borderRadiiTokens } from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Paper } from './Paper'

const meta: Meta<typeof Paper> = {
  title: 'Theme/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'children',
        'elevation',
        'bg',
        'borderRadius',
        'aspectRatio',
        'transition',
        'opacity',
        'cursor',
        'm',
        'p',
        'width',
        'height',
      ],
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content rendered inside the surface.',
      table: { category: 'Content' },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth - 0 (flat) to 24 (highest). Resolves to theme.shadows[n].',
      table: { category: 'Visual', defaultValue: { summary: '1' } },
    },
    bg,
    borderRadius: {
      control: { type: 'inline-radio' },
      options: borderRadiiTokens,
      description: 'Border radius - resolves from theme.radii.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    aspectRatio: {
      control: 'text',
      description: 'CSS aspect-ratio for fixed-ratio surfaces (e.g. "16/9", "1").',
      table: { category: 'Layout' },
    },
    transition: {
      control: 'text',
      description: 'CSS transition for surface animations (e.g. "box-shadow 0.3s ease").',
      table: { category: 'Visual' },
    },
    opacity,
    cursor,
    m,
    p,
    width,
    height,
  },
}

export default meta
type Story = StoryObj<typeof Paper>

export const Default: Story = {
  args: {
    elevation: 1,
    p: 3,
    width: '320px',
    children: 'A surface with default elevation, background, and border radius.',
  },
}

export const Elevations: Story = {
  render: () => (
    <Flex flexDirection="row" flexWrap="wrap" gap={3}>
      {([0, 1, 2, 4, 8, 16, 24] as const).map((n) => (
        <Paper key={n} elevation={n} p={3} width="120px">
          <Typography variant="caption" color="secondary" m={0}>
            elevation
          </Typography>
          <Typography variant="body2" m={0}>
            {n}
          </Typography>
        </Paper>
      ))}
    </Flex>
  ),
}

export const BackgroundTokens: Story = {
  render: () => (
    <Flex flexDirection="row" flexWrap="wrap" gap={3}>
      {(['paper', 'primary', 'secondary', 'modal'] as const).map((bg) => (
        <Paper key={bg} bg={bg} elevation={2} p={3} width="140px">
          <Typography variant="caption" color="secondary" m={0}>
            bg
          </Typography>
          <Typography variant="body2" m={0}>
            {bg}
          </Typography>
        </Paper>
      ))}
    </Flex>
  ),
}

export const AspectRatio: Story = {
  render: () => (
    <Flex flexDirection="row" flexWrap="wrap" gap={3}>
      {(['1', '4/3', '16/9'] as const).map((ratio) => (
        <Paper key={ratio} elevation={2} aspectRatio={ratio} width="160px">
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Typography variant="caption" color="secondary" m={0}>
              {ratio}
            </Typography>
          </Flex>
        </Paper>
      ))}
    </Flex>
  ),
}

export const Composed: Story = {
  render: () => (
    <Paper elevation={3} p={4} width="320px">
      <Flex flexDirection="column" gap={2}>
        <Typography variant="h5" m={0}>
          Card Title
        </Typography>
        <Typography variant="body2" color="secondary" m={0}>
          Compose Flex or Grid inside Paper for layout. Paper intentionally has no flex or grid
          props.
        </Typography>
      </Flex>
    </Paper>
  ),
}
`,tM=`import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { View } from '../View'
import { Popover, type PopoverProps, type PopoverOrigin } from './Popover'

/** Story-only args: the object origins are split into select boxes for easy tweaking. */
interface PopoverStoryArgs extends PopoverProps {
  anchorOriginVertical: PopoverOrigin['vertical']
  anchorOriginHorizontal: PopoverOrigin['horizontal']
  transformOriginVertical: PopoverOrigin['vertical']
  transformOriginHorizontal: PopoverOrigin['horizontal']
}

function PopoverDemo(props: Readonly<Partial<PopoverProps>>) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  return (
    <>
      <Button onClick={(event) => setAnchor(event.currentTarget)}>Open popover</Button>
      {/* Spread first so the demo's own open/anchorEl/onClose always win over args. */}
      <Popover {...props} open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <View p={3} style={{ maxWidth: 240 }}>
          <Typography variant="body2">
            Portaled content, positioned relative to the button and closed on Escape or an outside
            click.
          </Typography>
        </View>
      </Popover>
    </>
  )
}

/** Composes the split origin args back into the object props Popover expects. */
function renderDemo({
  anchorOriginVertical,
  anchorOriginHorizontal,
  transformOriginVertical,
  transformOriginHorizontal,
  ...args
}: PopoverStoryArgs) {
  return (
    <PopoverDemo
      {...args}
      anchorOrigin={{ vertical: anchorOriginVertical, horizontal: anchorOriginHorizontal }}
      transformOrigin={{ vertical: transformOriginVertical, horizontal: transformOriginHorizontal }}
    />
  )
}

// Centers the trigger so a popover on any side stays inside the canvas.
const centeredDecorator = (Story: ComponentType) => (
  <View
    style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Story />
  </View>
)

const verticalOptions: PopoverOrigin['vertical'][] = ['top', 'center', 'bottom']
const horizontalOptions: PopoverOrigin['horizontal'][] = ['left', 'center', 'right']

const meta: Meta<PopoverStoryArgs> = {
  title: 'Theme/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'anchorReference',
        'anchorOriginVertical',
        'anchorOriginHorizontal',
        'transformOriginVertical',
        'transformOriginHorizontal',
        'marginThreshold',
        'elevation',
        'hasBackdrop',
        'disableScrollLock',
        'disableAriaHidden',
        'shouldAutoFocus',
        'shouldTrapFocus',
        'shouldEnforceFocus',
        'shouldRestoreFocus',
        'shouldKeepMounted',
        'layer',
      ],
    },
  },
  args: {
    anchorReference: 'anchorEl',
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    elevation: 8,
    marginThreshold: 2,
    hasBackdrop: false,
    disableScrollLock: false,
    disableAriaHidden: false,
    shouldAutoFocus: true,
    shouldTrapFocus: true,
    shouldEnforceFocus: true,
    shouldRestoreFocus: true,
    shouldKeepMounted: false,
    layer: 'modal',
  },
  argTypes: {
    // ── Content / structural (managed by the demo, documented only) ──
    open: {
      control: false,
      description: 'If true, the popover is shown.',
      table: { category: 'Content' },
    },
    children: {
      control: false,
      description: 'The content of the popover.',
      table: { category: 'Content' },
    },
    anchorEl: {
      control: false,
      description: 'Element (or getter) the popover is positioned against.',
      table: { category: 'Layout' },
    },
    anchorPosition: {
      control: false,
      description: "Client coordinates used when \`anchorReference\` is \`'anchorPosition'\`.",
      table: { category: 'Layout' },
    },
    anchorOrigin: {
      control: false,
      description: 'The point on the anchor the popover attaches to. Set via the split selects.',
      table: { category: 'Layout' },
    },
    transformOrigin: {
      control: false,
      description: 'The point on the popover that meets the anchor. Set via the split selects.',
      table: { category: 'Layout' },
    },
    onClose: {
      control: false,
      description: 'Fired on Escape or a click outside the surface.',
      table: { category: 'Behavior' },
    },
    container: {
      control: false,
      description: 'Portal target passed to the underlying Modal.',
      table: { category: 'Behavior' },
    },
    action: {
      control: false,
      description: 'Imperative handle exposing \`updatePosition()\`.',
      table: { category: 'Behavior' },
    },
    slotProps: {
      control: false,
      description: 'Props for the paper slot (the surface) - e.g. \`bg\`, \`p\`, \`style\`.',
      table: { category: 'Visual' },
    },
    // ── Positioning ──
    anchorReference: {
      control: { type: 'inline-radio' },
      options: ['anchorEl', 'anchorPosition', 'none'],
      description: 'Which anchor to position against.',
      table: { category: 'Layout', defaultValue: { summary: 'anchorEl' } },
    },
    anchorOriginVertical: {
      control: { type: 'select' },
      options: verticalOptions,
      description: 'Vertical point on the anchor the popover attaches to.',
      table: { category: 'Layout', defaultValue: { summary: 'bottom' } },
    },
    anchorOriginHorizontal: {
      control: { type: 'select' },
      options: horizontalOptions,
      description: 'Horizontal point on the anchor the popover attaches to.',
      table: { category: 'Layout', defaultValue: { summary: 'left' } },
    },
    transformOriginVertical: {
      control: { type: 'select' },
      options: verticalOptions,
      description: 'Vertical point on the popover that meets the anchor.',
      table: { category: 'Layout', defaultValue: { summary: 'top' } },
    },
    transformOriginHorizontal: {
      control: { type: 'select' },
      options: horizontalOptions,
      description: 'Horizontal point on the popover that meets the anchor.',
      table: { category: 'Layout', defaultValue: { summary: 'left' } },
    },
    marginThreshold: {
      control: { type: 'select' },
      options: [0, 0.5, 1, 1.5, 2, 3, 4],
      description:
        'Minimum gap from the viewport edge as a spacing token (\`theme.space\`, e.g. \`2\` → 16px).',
      table: { category: 'Layout', defaultValue: { summary: '2' } },
    },
    // ── Visual ──
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth of the surface - resolves against \`theme.shadows\`.',
      table: { category: 'Visual', defaultValue: { summary: '8' } },
    },
    // ── Behavior ──
    hasBackdrop: {
      control: 'boolean',
      description: 'Render a dimmed backdrop instead of the invisible click-away layer.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    disableScrollLock: {
      control: 'boolean',
      description: 'Disable body scroll-lock; the popover then re-positions on scroll.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    disableAriaHidden: {
      control: 'boolean',
      description: 'Skip \`aria-hidden\` on background content (for non-modal popovers).',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldKeepMounted: {
      control: 'boolean',
      description: 'Keep the content mounted while closed.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    layer: {
      control: { type: 'select' },
      options: ['appBar', 'drawer', 'modal'],
      description: 'Stacking layer from \`theme.zOrder\`.',
      table: { category: 'Behavior', defaultValue: { summary: 'modal' } },
    },
    // ── Focus ──
    shouldAutoFocus: {
      control: 'boolean',
      description: 'Move focus into the popover on open.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'Trap Tab focus within the popover.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldEnforceFocus: {
      control: 'boolean',
      description: 'Pull focus back whenever it escapes.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldRestoreFocus: {
      control: 'boolean',
      description: 'Restore focus to the trigger on close.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
  },
  render: renderDemo,
}

export default meta
type Story = StoryObj<PopoverStoryArgs>

export const Default: Story = {}

export const WithBackdrop: Story = {
  args: { hasBackdrop: true },
}

// ── Placement examples: the popover opens on each side of the anchor ──

/** Below the anchor (default). */
export const Bottom: Story = {
  decorators: [centeredDecorator],
  args: {
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
  },
}

/** Above the anchor. */
export const Top: Story = {
  decorators: [centeredDecorator],
  args: {
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'bottom',
    transformOriginHorizontal: 'left',
  },
}

/** To the right of the anchor. */
export const Right: Story = {
  decorators: [centeredDecorator],
  args: {
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'right',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
  },
}

/** To the left of the anchor. */
export const Left: Story = {
  decorators: [centeredDecorator],
  args: {
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'right',
  },
}
`,nM=`import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { View } from '../View'
import { Paper } from '../Paper'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Portal } from './Portal'

// \`target\` is a story-only arg (Portal's real \`container\` prop is a node/getter, not a
// control). It drives where the demo mounts the portaled content.
type PortalStoryArgs = ComponentProps<typeof Portal> & { target: 'body' | 'container' }

const meta: Meta<PortalStoryArgs> = {
  title: 'Theme/Portal',
  component: Portal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { include: ['target'] },
  },
  argTypes: {
    target: {
      control: { type: 'inline-radio' },
      options: ['body', 'container'],
      description: 'Where the Portal mounts its children - the document body or a custom element.',
      table: { category: 'Behavior', defaultValue: { summary: 'body' } },
    },
  },
}

export default meta
type Story = StoryObj<PortalStoryArgs>

const PortalDemo = ({ target }: PortalStoryArgs) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  return (
    <Flex flexDirection="column" gap={3} width="360px">
      <Typography variant="body2" color="secondary" m={0}>
        Switch the target control to move the portaled banner between the document body and the
        bordered box below.
      </Typography>
      <View
        ref={setContainer}
        p={3}
        minHeight="64px"
        borderWidth="thin"
        borderStyle="solid"
        borderColor="primary"
        borderRadius="md"
      >
        <Typography variant="caption" color="secondary" m={0}>
          Custom container
        </Typography>
      </View>
      {/* For the container target, wait for the ref to attach before portaling. */}
      {(target === 'body' || container) && (
        <Portal container={target === 'container' ? container : undefined}>
          <Paper
            p={3}
            mt={2}
            style={
              target === 'body'
                ? { position: 'fixed', top: 16, left: 16, right: 16, zIndex: 1 }
                : undefined
            }
          >
            <Typography color="info" variant="body2" m={0}>
              Portaled to {target === 'body' ? 'document.body' : 'the custom container'}
            </Typography>
          </Paper>
        </Portal>
      )}
    </Flex>
  )
}

export const Default: Story = {
  args: { target: 'container' },
  render: (args) => <PortalDemo {...args} />,
}
`,rM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  buttonColorTokens,
  pressableFeedbackTokens,
} from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Icon } from '@soroush.tech/design-system/Icon'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Pressable } from './Pressable'

const meta: Meta<typeof Pressable> = {
  title: 'Theme/Pressable',
  component: Pressable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'as',
        'feedback',
        'color',
        'activeOpacity',
        'disabled',
        'href',
        'p',
        'borderRadius',
      ],
    },
  },
  args: {
    children: 'Press me',
  },
  argTypes: {
    as: {
      control: { type: 'inline-radio' },
      options: ['div', 'button', 'span'],
      description:
        'Element to render. \`div\` (default) and any other tag get button semantics via a ' +
        'role, tab stop, and Enter/Space handling; \`button\` is native.',
      table: { category: 'Behavior', defaultValue: { summary: 'div' } },
    },
    feedback: {
      control: { type: 'inline-radio' },
      options: pressableFeedbackTokens,
      description:
        'Feedback shown while held - \`none\` leaves the content untouched, \`opacity\` dims it, ' +
        '\`highlight\` tints the surface behind it.',
      table: { category: 'Behavior', defaultValue: { summary: 'none' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Palette the \`highlight\` tint derives from - resolves against \`theme.palette\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    activeOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Opacity held content fades to under \`feedback="opacity"\`.',
      table: { category: 'Behavior', defaultValue: { summary: '0.7' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the surface - suppresses press feedback and the pointer cursor.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    href: {
      control: 'text',
      description: 'Renders an \`a\` element instead of the default \`div\` when set.',
      table: { category: 'Behavior' },
    },
    p: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      description: 'Padding - resolves from \`theme.space\`. Zero by default, like every other box.',
      table: { category: 'Spacing', type: { summary: 'space' }, defaultValue: { summary: '0' } },
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Border radius - resolves from \`theme.radii\`. Clips the \`highlight\` tint.',
      table: { category: 'Visual', type: { summary: 'sm | md | lg' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Pressable>

export const Default: Story = {}

export const Opacity: Story = {
  args: { feedback: 'opacity', children: 'Hold to dim' },
}

export const Highlight: Story = {
  args: { feedback: 'highlight', children: 'Hold to tint', p: 2, borderRadius: 'md' },
}

/** Wrapping arbitrary content: the surface adds semantics, not layout. */
export const WrappingContent: Story = {
  render: () => (
    <Pressable feedback="highlight" p={2} borderRadius="md" width="16rem">
      <Flex flexDirection="row" alignItems="center" gap={2} width="100%">
        <Icon name="folder" size="1.25rem" color="inherit" />
        <Typography as="span" variant="inherit" m={0}>
          Documents
        </Typography>
      </Flex>
    </Pressable>
  ),
}
`,iM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { bg, p, m, borderRadius } from '../utils/test/storiesArgs'
import { Typography } from '../Typography'
import { Quote } from './Quote'

const meta: Meta<typeof Quote> = {
  title: 'Theme/Quote',
  component: Quote,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['bg', 'p', 'm', 'borderRadius'] },
  },
  args: { bg: 'terminal', p: 3 },
  argTypes: { bg, p, m, borderRadius },
  render: (args) => (
    <Quote {...args}>
      <Typography variant="body1" color="secondary" m={0}>
        A View with a 2px primary left border - for terminal readouts and markdown blockquotes.
      </Typography>
    </Quote>
  ),
}

export default meta
type Story = StoryObj<typeof Quote>

export const Default: Story = {}

export const Rounded: Story = {
  args: { borderRadius: 'md' },
}
`,aM=`import { useState } from 'react'
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite'
import { m } from '../utils/test/storiesArgs'
import { radioColorTokens, radioSizeTokens } from '../utils/test/storiesOptions'
import { ColorSwatchRows, WithCheckedState, type ControlledArgs } from '../utils/test/storiesToggle'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Theme/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['checked', 'disabled', 'color', 'size', 'children', 'm'],
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state. Must be paired with \`onChange\`.',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: radioColorTokens,
      description:
        'Stroke/fill color. \`"default"\` resolves to \`theme.text.secondary\`; others to \`theme.palette[color].main\`.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: radioSizeTokens,
      description: 'Icon size.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    children: {
      control: 'text',
      description: 'Label text rendered next to the radio.',
      table: { category: 'Content' },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: { color: 'default', size: 'md' },
}

export const Checked: Story = {
  args: { checked: true, color: 'primary' },
  render: (args) => <Radio {...args} onChange={() => {}} />,
}

export const WithLabel: Story = {
  args: { children: 'Option A', color: 'primary' },
}

export const States: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      {(
        [
          { label: 'Unchecked', props: {} },
          { label: 'Checked', props: { checked: true, onChange: () => {} } },
          { label: 'Disabled unchecked', props: { disabled: true } },
          {
            label: 'Disabled checked',
            props: { disabled: true, checked: true, onChange: () => {} },
          },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} flexDirection="row" alignItems="center" gap={2}>
          <Typography variant="caption" color="secondary" width="10rem" flexShrink={0} m={0}>
            {label}
          </Typography>
          <Radio color="primary" {...props} />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: () => (
    <ColorSwatchRows
      controls={(color) => (
        <>
          <Radio color={color} />
          <Radio color={color} checked onChange={() => {}} />
        </>
      )}
    />
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Flex key={size} flexDirection="column" alignItems="center" gap={1}>
          <Radio size={size} color="primary" checked onChange={() => {}} />
          <Typography variant="caption" color="secondary" m={0}>
            {size}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      <Radio
        color="primary"
        icon={<span style={{ fontSize: '1.2em' }}>○</span>}
        checkedIcon={<span style={{ fontSize: '1.2em' }}>●</span>}
      >
        Custom icons (unchecked)
      </Radio>
      <Radio
        color="primary"
        checked
        onChange={() => {}}
        icon={<span style={{ fontSize: '1.2em' }}>○</span>}
        checkedIcon={<span style={{ fontSize: '1.2em' }}>●</span>}
      >
        Custom icons (checked)
      </Radio>
    </Flex>
  ),
}

interface GroupArgs {
  selected: string
  setSelected: (value: string) => void
}

// Owns the selected-value state in a decorator and injects it (plus its setter) via args.
const WithRadioGroupState: Decorator = (Story, ctx) => {
  const [selected, setSelected] = useState('b')
  return <Story args={{ ...ctx.args, selected, setSelected }} />
}

export const Group: StoryObj<GroupArgs> = {
  decorators: [WithRadioGroupState],
  render: ({ selected, setSelected }) => (
    <Flex flexDirection="column" gap={1}>
      {(['a', 'b', 'c'] as const).map((v) => (
        <Radio
          key={v}
          color="primary"
          name="demo"
          value={v}
          checked={selected === v}
          onChange={() => setSelected(v)}
        >
          Option {v.toUpperCase()}
        </Radio>
      ))}
      <Typography variant="caption" color="secondary" mt={1} mb={0}>
        Selected: {selected}
      </Typography>
    </Flex>
  ),
}

export const Controlled: StoryObj<ControlledArgs> = {
  decorators: [WithCheckedState],
  render: ({ checked, onChange }) => (
    <Flex flexDirection="column" gap={2}>
      <Radio color="primary" checked={checked} onChange={onChange}>
        {checked ? 'Selected' : 'Unselected'} - click to toggle
      </Radio>
      <Typography variant="caption" color="secondary" m={0}>
        State: {String(checked)}
      </Typography>
    </Flex>
  ),
}
`,oM=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { m, p, width, minWidth, maxWidth } from '../utils/test/storiesArgs'
import {
  backgroundTokens,
  borderRadiiTokens,
  selectColorTokens,
  selectVariantTokens,
  selectSizeTokens,
  textColorTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { MenuItem } from '../MenuItem'
import { Select, type SelectProps, type SelectValue } from './Select'

const platformItems = [
  <MenuItem key="web" value="web">
    Web
  </MenuItem>,
  <MenuItem key="android" value="android">
    Android
  </MenuItem>,
  <MenuItem key="ios" value="ios">
    iOS
  </MenuItem>,
  <MenuItem key="desktop" value="desktop" disabled>
    Desktop (soon)
  </MenuItem>,
]

const meta: Meta<typeof Select> = {
  title: 'Theme/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'native',
        'multiple',
        'autoWidth',
        'variant',
        'color',
        'textColor',
        'bg',
        'size',
        'borderRadius',
        'disabled',
        'error',
        'required',
        'fullWidth',
        'placeholder',
        'iconName',
        'p',
        'm',
        'width',
        'minWidth',
        'maxWidth',
      ],
    },
  },
  args: {
    children: platformItems,
    placeholder: 'Pick a platform',
    variant: 'outlined',
  },
  argTypes: {
    native: {
      control: 'boolean',
      description: 'Render a native \`<select>\` (single-select) instead of the custom listbox.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow selecting several options. Ignored on the native path.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    autoWidth: {
      control: 'boolean',
      description:
        "Size the trigger to the current selection. When \`false\` (default) it reserves the widest option's width, avoiding layout shift on selection.",
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    variant: {
      control: { type: 'select' },
      options: selectVariantTokens,
      description:
        '\`outlined\`/\`default\` - full border box · \`underline\` - bottom border only · \`text\` - no border.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    color: {
      control: { type: 'select' },
      options: selectColorTokens,
      description: 'Focus/active border color - resolves to \`theme.palette[color]\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color of the trigger value - resolves against \`theme.text\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    bg: {
      control: { type: 'select' },
      options: backgroundTokens,
      description: 'Background color - resolves against \`theme.background\`.',
      table: { category: 'Visual', defaultValue: { summary: 'terminal' } },
    },
    size: {
      control: { type: 'select' },
      options: selectSizeTokens,
      description: 'Controls padding and font size - resolves against \`theme.sizes\`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    borderRadius: {
      control: { type: 'select' },
      options: borderRadiiTokens,
      description:
        'Corner radius - applies only to \`default\`/\`outlined\` variants. Resolves against \`theme.radii\`.',
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'Marks the field as invalid - applies the error border color.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the trigger to fill its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Empty-state label shown while nothing is selected.',
      table: { category: 'Content' },
    },
    iconName: {
      control: 'text',
      description: 'Dropdown affordance icon from the Icon registry.',
      table: { category: 'Visual', defaultValue: { summary: 'expand_more' } },
    },
    p,
    m,
    width,
    minWidth,
    maxWidth,
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const Native: Story = {
  args: { native: true },
}

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['outlined', 'default', 'underline', 'text'] as const).map((variant) => (
        <Select key={variant} variant={variant} placeholder={variant}>
          {platformItems}
        </Select>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex gap={3} alignItems="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} size={size} variant="outlined" placeholder={size}>
          {platformItems}
        </Select>
      ))}
    </Flex>
  ),
}

export const ErrorState: Story = {
  args: { error: true },
}

export const WithDividers: Story = {
  args: {
    placeholder: 'Pick a platform',
    children: [
      <MenuItem key="web" value="web" divider>
        Web
      </MenuItem>,
      <MenuItem key="android" value="android" divider>
        Android
      </MenuItem>,
      <MenuItem key="ios" value="ios">
        iOS
      </MenuItem>,
    ],
  },
}

function ControlledSelect(props: Readonly<Partial<SelectProps>>) {
  const [value, setValue] = useState<SelectValue>('web')
  return (
    <Flex flexDirection="column" gap={2} style={{ maxWidth: 240 }}>
      <Typography variant="caption" color="secondary">
        Selected: {String(value)}
      </Typography>
      <Select variant="outlined" value={value} onChange={setValue} {...props}>
        {platformItems}
      </Select>
    </Flex>
  )
}

export const Controlled: Story = {
  render: () => <ControlledSelect />,
}

function MultiSelect() {
  const [value, setValue] = useState<SelectValue>(['web', 'ios'])
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography variant="caption" color="secondary">
        Selected: {Array.isArray(value) ? value.join(', ') || 'none' : value}
      </Typography>
      <Select
        multiple
        variant="outlined"
        placeholder="Pick platforms"
        value={value}
        onChange={setValue}
      >
        {platformItems}
      </Select>
    </Flex>
  )
}

export const Multiple: Story = {
  render: () => <MultiSelect />,
}
`,sM=`import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { bg } from '@soroush.tech/design-system/utils/test/storiesArgs'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Sidebar } from './Sidebar'
import { SidebarItem } from '../SidebarItem'

const meta: Meta<typeof Sidebar> = {
  title: 'Theme/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'isOpen',
        'anchor',
        'variant',
        'expandedWidth',
        'collapsedWidth',
        'hasPanel',
        'panelWidth',
        'bg',
        'aria-label',
      ],
    },
  },
  args: {
    isOpen: false,
    anchor: 'left',
    'aria-label': 'Editor panels',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        'Whether item labels are shown. Controlled by the consumer (e.g. an app-bar menu button).',
      table: { category: 'Layout' },
    },
    anchor: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Screen edge the rail hugs - labels render away from it.',
      table: { category: 'Layout' },
    },
    variant: {
      control: 'radio',
      options: ['text', 'outlined', 'plain'],
      description: "Default variant for every item - an item's own \`variant\` wins.",
      table: { category: 'Visual', defaultValue: { summary: 'text' } },
    },
    expandedWidth: {
      control: 'text',
      description: 'Rail width while open.',
      table: { category: 'Layout' },
    },
    collapsedWidth: {
      control: 'text',
      description: 'Rail width while collapsed (icons only).',
      table: { category: 'Layout' },
    },
    hasPanel: {
      control: 'boolean',
      description:
        "Render a second column holding the selected item's \`children\`. Off by default, where children render inline in the item row instead.",
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    panelWidth: {
      control: 'text',
      description: 'Width of the panel column. Only meaningful with \`hasPanel\`.',
      table: { category: 'Layout', defaultValue: { summary: '18rem' } },
    },
    panelProps: {
      control: false,
      description:
        'Props for the panel column - any \`Flex\` prop, plus \`as\`. Overrides \`panelWidth\` and the derived \`aria-label\`.',
      table: { category: 'Layout' },
    },
    bg,
    'aria-label': {
      control: 'text',
      description: 'Accessible name of the navigation landmark.',
      table: { category: 'Content' },
    },
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarItem icon="folder" label="Directory" isSelected />
      <SidebarItem icon="history" label="Gist history" />
      <SidebarItem icon="edit_note" label="Drafts" />
      <SidebarItem icon="terminal" label="Terminal console" />
      <Typography variant="caption" color="secondary" p={2} mt="auto">
        v1.1.0
      </Typography>
    </Sidebar>
  ),
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {}

export const Open: Story = {
  args: { isOpen: true },
}

// A right-anchored rail: open labels render to the left of their icons and
// content pins to the right edge.
export const RightAnchored: Story = {
  args: { anchor: 'right', isOpen: true },
}

export const Tinted: Story = {
  args: { isOpen: true, bg: 'paper' },
}

type SidebarArgs = Partial<ComponentProps<typeof Sidebar>>

const PANELS = [
  { id: 'directory', icon: 'folder', label: 'Directory', lines: ['README.md', 'notes.md'] },
  { id: 'gists', icon: 'history', label: 'Gist history', lines: ['snippet.ts', 'scratch.md'] },
  { id: 'drafts', icon: 'edit_note', label: 'Drafts', lines: ['Untitled', 'Release post'] },
] as const

// Selection is the consumer's, as everywhere else in this component - the rail
// only decides where the selected item's children are rendered.
const PanelDemo = (args: SidebarArgs) => {
  const [selected, setSelected] = useState<string | null>('directory')

  return (
    <Sidebar
      {...args}
      aria-label={args['aria-label'] ?? 'Editor panels'}
      isOpen={args.isOpen ?? false}
      hasPanel
    >
      {PANELS.map(({ id, icon, label, lines }) => (
        <SidebarItem
          key={id}
          icon={icon}
          label={label}
          isSelected={selected === id}
          onSelect={() => setSelected(selected === id ? null : id)}
        >
          <Flex flexDirection="column" gap={1} p={2}>
            <Typography variant="subtitle2" m={0}>
              {label}
            </Typography>
            {lines.map((line) => (
              <Typography key={line} variant="body2" color="secondary" m={0}>
                {line}
              </Typography>
            ))}
          </Flex>
        </SidebarItem>
      ))}
    </Sidebar>
  )
}

/**
 * With \`hasPanel\`, the selected item's children render in a second column
 * instead of inside its row. Click an item to switch panels, or click the
 * selected one again to close it - with nothing selected the column disappears
 * rather than leaving an empty gap.
 */
export const WithPanel: Story = {
  args: { isOpen: false, hasPanel: true },
  render: (args) => <PanelDemo {...args} />,
}

// The panel is independent of \`isOpen\`, so an icons-only rail can sit beside an
// open panel - and a right-anchored rail keeps the panel on its inner side.
export const PanelOpenRail: Story = {
  ...WithPanel,
  args: { isOpen: true, hasPanel: true },
}

export const PanelRightAnchored: Story = {
  ...WithPanel,
  args: { isOpen: true, hasPanel: true, anchor: 'right' },
}

// \`panelProps\` restyles or re-tags the column - here an \`<aside>\` on its own
// surface, wider than the default, separated from the rail by a rule.
export const PanelStyled: Story = {
  ...WithPanel,
  args: {
    isOpen: true,
    hasPanel: true,
    bg: 'grid',
    panelProps: { as: 'aside', bg: 'paper', width: '22rem', borderLeft: 'thin' },
  },
}
`,cM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { icons } from '../../Icon/icons'
import { Sidebar } from '../Sidebar'
import { SidebarItem } from './SidebarItem'

const iconNames = Object.keys(icons)

const meta: Meta<typeof SidebarItem> = {
  title: 'Theme/Sidebar/SidebarItem',
  component: SidebarItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['icon', 'label', 'variant', 'isSelected', 'disabled'] },
  },
  args: {
    icon: 'folder',
    label: 'Directory',
    variant: 'text',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
      description: 'Icon shown in both the collapsed and open states.',
      table: { category: 'Content' },
    },
    label: {
      control: 'text',
      description: 'Accessible name; also the default visible content while open.',
      table: { category: 'Content' },
    },
    variant: {
      control: 'radio',
      options: ['text', 'outlined', 'plain'],
      description:
        'Borderless (\`text\`), bordered (\`outlined\`), or \`plain\` - no fill or hover feedback.',
      table: { category: 'Visual' },
    },
    isSelected: {
      control: 'boolean',
      description: 'Active state - drives \`aria-pressed\` and the selected fill.',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the item.',
      table: { category: 'State' },
    },
  },
  // Items live inside a Sidebar - it provides the open/anchor context.
  render: (args) => (
    <Sidebar aria-label="Panels" isOpen>
      <SidebarItem {...args} />
    </Sidebar>
  ),
}

export default meta
type Story = StoryObj<typeof SidebarItem>

export const Default: Story = {}

export const Selected: Story = {
  args: { isSelected: true, icon: 'terminal', label: 'Terminal console' },
}

export const Outlined: Story = {
  args: { variant: 'outlined', icon: 'history', label: 'Gist history' },
}

// Custom children replace the label text while open; the label stays the
// accessible name.
export const WithChildren: Story = {
  args: { icon: 'edit_note', label: 'Drafts' },
  render: (args) => (
    <Sidebar aria-label="Panels" isOpen>
      <SidebarItem {...args}>
        <span>Drafts (3)</span>
      </SidebarItem>
    </Sidebar>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, icon: 'history', label: 'Gist history' },
}
`,lM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { m, width, height, borderRadius } from '../utils/test/storiesArgs'
import { skeletonVariantTokens, skeletonAnimationTokens } from '../utils/test/storiesOptions'
import { Avatar } from '../Avatar'
import { Card } from '../Card'
import { Flex } from '../Flex'
import { Grid } from '../Grid'
import { Image } from '../Image'
import { Paper } from '../Paper'
import { Typography } from '../Typography'
import { View } from '../View'
import { Skeleton, type SkeletonProps } from './Skeleton'
const MEDIA_SIZES = '(min-width: 640px) min(30vw, 400px), 100vw'

// Story-local stand-in for the app's imagetools \`?as=picture\` import - the package
// has no image pipeline, so the "loaded" card uses the public site logo.
const portrait = { sources: {} as Record<string, string>, img: { src: '/soroush.svg' } }

const meta: Meta<typeof Skeleton> = {
  title: 'Theme/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    variant: 'text',
    animation: 'pulse',
  },
  parameters: {
    layout: 'padded',
    controls: {
      include: ['variant', 'borderRadius', 'animation', 'width', 'height', 'children', 'm'],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: skeletonVariantTokens,
      description: 'Shape of the placeholder.',
      table: { category: 'Layout', defaultValue: { summary: 'text' } },
    },
    animation: {
      control: { type: 'select' },
      options: skeletonAnimationTokens,
      description: 'Loading animation - \`false\` disables it.',
      table: { category: 'Behavior', defaultValue: { summary: 'pulse' } },
    },
    children: {
      control: 'text',
      description: 'Content to infer width and height from - rendered invisibly.',
      table: { category: 'Content' },
    },
    borderRadius,
    width,
    height,
    m,
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: { width: 240 },
}

export const Variants: Story = {
  render: ({ animation }) => (
    <Flex flexDirection="row" gap={4} alignItems="center">
      {skeletonVariantTokens.map((v) => (
        <Flex key={v} flexDirection="column" gap={1} alignItems="center">
          <Skeleton
            variant={v}
            width={64}
            height={v === 'text' ? undefined : 64}
            animation={animation}
          />
          <Typography variant="caption" color="secondary" m={0}>
            {v}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const Animations: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {skeletonAnimationTokens.map((a) => (
        <Flex key={String(a)} flexDirection="column" gap={1}>
          <Typography variant="caption" color="secondary" m={0}>
            {a === false ? 'false (none)' : a}
          </Typography>
          <Skeleton
            variant="rectangular"
            borderRadius="md"
            width="100%"
            height={24}
            animation={a}
          />
        </Flex>
      ))}
    </Flex>
  ),
}

// Different-sized skeletons share one viewport-anchored wave - the shimmer stays in sync.
export const WaveInSync: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      <Skeleton variant="rectangular" borderRadius="md" width="90%" height={20} animation="wave" />
      <Skeleton variant="rectangular" borderRadius="md" width="40%" height={20} animation="wave" />
      <Skeleton variant="rectangular" borderRadius="md" width="65%" height={20} animation="wave" />
    </Flex>
  ),
}

export const InferredFromChildren: Story = {
  render: ({ animation }) => (
    <Skeleton animation={animation}>
      <Typography variant="h3" m={0}>
        Loading title
      </Typography>
    </Skeleton>
  ),
}

export const MediaCard: Story = {
  render: ({ animation }) => (
    <Flex flexDirection="row" gap={2} alignItems="center">
      <Skeleton variant="circular" width={40} height={40} animation={animation} />
      <Flex flexDirection="column" gap={1} flex={1}>
        <Skeleton variant="text" width="60%" animation={animation} />
        <Skeleton variant="text" width="40%" animation={animation} />
      </Flex>
    </Flex>
  ),
}

// Paper surface with an author row, cover image, and body lines. \`animation\` is threaded
// into every skeleton so the Storybook control drives the whole card at once.
const PostCardSkeleton = ({ animation }: Pick<SkeletonProps, 'animation'>) => (
  <Paper flexDirection="column" gap={2} p={3} width="100%">
    <Flex flexDirection="row" gap={2} alignItems="center">
      <Skeleton variant="circular" width={44} height={44} animation={animation} />
      <Flex flexDirection="column" gap={1} flex={1}>
        <Skeleton variant="text" width="55%" animation={animation} />
        <Skeleton variant="text" width="35%" animation={animation} />
      </Flex>
    </Flex>
    <Skeleton
      variant="rectangular"
      borderRadius="md"
      width="100%"
      height={400}
      animation={animation}
    />
    <Flex flexDirection="column" gap={1}>
      <Skeleton variant="text" width="90%" animation={animation} />
      <Skeleton variant="text" width="80%" animation={animation} />
    </Flex>
  </Paper>
)

// The real, loaded card built from our design system - same layout the skeleton stands in for.
const RealPostCard = () => (
  <Card variant="paper" flexDirection="column" gap={2} p={3} width="100%">
    <Flex flexDirection="row" gap={2} alignItems="center">
      <Avatar size="md" bg="secondary">
        MS
      </Avatar>
      <Flex flexDirection="column" gap={0}>
        <Typography variant="subtitle2" m={0}>
          Masoud Soroush
        </Typography>
        <Typography variant="caption" color="secondary" m={1}>
          @soroush
        </Typography>
      </Flex>
    </Flex>
    <View borderRadius="md" overflow="hidden" width="100%" height={400}>
      <picture>
        {Object.entries(portrait.sources).map(([format, srcSet]) => (
          <source key={format} srcSet={srcSet} type={\`image/\${format}\`} sizes={MEDIA_SIZES} />
        ))}
        <Image
          src={portrait.img.src}
          sizes={MEDIA_SIZES}
          alt="Portrait of Masoud Soroush, Principal Software Engineer"
          width="100%"

          objectFit="cover"
          borderRadius="md"
        />
      </picture>
    </View>
    <Typography variant="body2" color="secondary" m={0}>
      Building a design system from the ground up tokens, primitives, and the craft behind
      consistent, accessible components.
    </Typography>
  </Card>
)

// The skeleton next to the real design-system card it stands in for.
export const PostCard: Story = {
  render: ({ animation }) => (
    <Flex flexDirection="row" gap={4} alignItems="flex-start" flexWrap="wrap">
      <Flex flexDirection="column" gap={1} width={360}>
        <Typography variant="overline" color="secondary" m={0}>
          Loading
        </Typography>
        <PostCardSkeleton animation={animation} />
      </Flex>
      <Flex flexDirection="column" gap={1} width={360}>
        <Typography variant="overline" color="secondary" m={0}>
          Loaded
        </Typography>
        <RealPostCard />
      </Flex>
    </Flex>
  ),
}

// A feed of post-card skeletons on a 6:3 grid (2fr 1fr) - two cards per row.
export const PostCardGrid: Story = {
  render: ({ animation }) => (
    <Grid gridTemplateColumns="2fr 1fr" gap={3}>
      {Array.from({ length: 4 }, (_, i) => (
        <PostCardSkeleton key={i} animation={animation} />
      ))}
    </Grid>
  ),
}
`,uM=`import { useState, type ChangeEvent } from 'react'
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite'
import { m } from '../utils/test/storiesArgs'
import {
  backgroundTokens,
  switchColorTokens,
  switchEdgeTokens,
  switchSizeTokens,
  switchVariantTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Switch } from './Switch'
import { Paper } from '../Paper'

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="0.6em"
    height="0.6em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="0.6em"
    height="0.6em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const meta: Meta<typeof Switch> = {
  title: 'Theme/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'checked',
        'disabled',
        'color',
        'bg',
        'size',
        'variant',
        'marked',
        'edge',
        'children',
        'm',
      ],
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state.',
      table: { category: 'Visual' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: switchColorTokens,
      description:
        'Track and thumb color when checked. Resolves to \`theme.palette[color].dark\` for the track and \`theme.palette[color].main\` for the thumb.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    bg: {
      control: { type: 'select' },
      options: backgroundTokens,
      description:
        'Track background color in the unchecked state. Uses \`theme.background\` tokens. Defaults to \`theme.background.primary\` when not set.',
      table: { category: 'Visual' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: switchSizeTokens,
      description: 'Track and thumb size. Applies to both \`"outside"\` and \`"inside"\` variants.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: switchVariantTokens,
      description:
        '\`"outside"\` - thumb overflows the track vertically (MUI-style). \`"inside"\` - thumb is contained within the track (iOS-style). The \`size\` prop works for both.',
      table: { category: 'Visual', defaultValue: { summary: 'outside' } },
    },
    marked: {
      control: 'boolean',
      description:
        'Shows ✓/✕ indicators. For \`"outside"\`, SVG icons appear inside the thumb. For \`"inside"\`, marks appear as CSS pseudo-elements in the track.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    edge: {
      control: { type: 'inline-radio' },
      options: switchEdgeTokens,
      description:
        'Applies a negative margin to counteract root padding on the given side. Useful when the switch sits at the edge of a layout.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Label text rendered next to the switch.',
      table: { category: 'Content' },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: { color: 'default', size: 'md', variant: 'outside', 'aria-label': 'Toggle' },
}

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      {switchColorTokens.map((color) => (
        <Flex key={color} flexDirection="row" alignItems="center" gap={3}>
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {color}
          </Typography>
          <Switch color={color} aria-label={\`\${color} off\`} />
          <Switch color={color} checked onChange={() => {}} aria-label={\`\${color} on\`} />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['outside', 'inside'] as const).map((variant) => (
        <Flex key={variant} flexDirection="row" gap={4} alignItems="center">
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} m={0}>
            {variant}
          </Typography>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Flex key={size} flexDirection="column" alignItems="center" gap={1}>
              <Switch
                variant={variant}
                size={size}
                color="primary"
                checked
                onChange={() => {}}
                aria-label={\`\${variant} \${size}\`}
              />
              <Typography variant="caption" color="secondary" m={0}>
                {size}
              </Typography>
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2}>
      {(
        [
          { label: 'Disabled off', props: { disabled: true } },
          { label: 'Disabled on', props: { disabled: true, checked: true, onChange: () => {} } },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} flexDirection="row" alignItems="center" gap={2}>
          <Typography variant="caption" color="secondary" width="8rem" flexShrink={0} m={0}>
            {label}
          </Typography>
          <Switch color="primary" {...props} aria-label={label} />
        </Flex>
      ))}
    </Flex>
  ),
}

interface ControlledArgs {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

// Owns the checked state in a decorator and injects checked + onChange via args.
const WithSwitchState: Decorator = (Story, ctx) => {
  const [checked, setChecked] = useState(false)
  return (
    <Story
      args={{
        ...ctx.args,
        checked,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
      }}
    />
  )
}

export const Controlled: StoryObj<ControlledArgs> = {
  decorators: [WithSwitchState],
  render: ({ checked, onChange }) => (
    <Flex flexDirection="column" gap={2}>
      <Switch color="primary" checked={checked} onChange={onChange}>
        {checked ? 'On' : 'Off'} - click to toggle
      </Switch>
      <Typography variant="caption" color="secondary" m={0}>
        State: {String(checked)}
      </Typography>
    </Flex>
  ),
}

export const WithLabel: Story = {
  args: { children: 'Enable dark mode', color: 'primary' },
}

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['outside', 'inside'] as const).map((variant) => (
        <Flex key={variant} flexDirection="row" alignItems="center" gap={3}>
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} m={0}>
            {variant}
          </Typography>
          <Switch variant={variant} color="primary" aria-label={\`\${variant} off\`} />
          <Switch
            variant={variant}
            color="primary"
            checked
            onChange={() => {}}
            aria-label={\`\${variant} on\`}
          />
        </Flex>
      ))}
    </Flex>
  ),
}

export const Marked: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3}>
      {(['outside', 'inside'] as const).map((variant) => (
        <Flex key={variant} flexDirection="row" alignItems="center" gap={3}>
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} m={0}>
            {variant}
          </Typography>
          <Switch variant={variant} marked color="primary" aria-label={\`\${variant} marked off\`} />
          <Switch
            variant={variant}
            marked
            color="primary"
            checked
            onChange={() => {}}
            aria-label={\`\${variant} marked on\`}
          />
        </Flex>
      ))}
    </Flex>
  ),
}

export const WithIcons: Story = {
  decorators: [WithSwitchState],
  render: ({ checked, onChange, ...props }) => (
    <Paper p={2}>
      <Flex flexDirection="column" gap={3}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Flex key={size} flexDirection="row" alignItems="center" gap={3}>
            <Typography variant="caption" color="secondary" width="3rem" flexShrink={0} m={0}>
              {size}
            </Typography>
            <Switch
              size={size}
              variant="outside"
              color="primary"
              {...props}
              checked={checked}
              onChange={onChange}
              icon={<MoonIcon />}
              checkedIcon={<SunIcon />}
              aria-label={\`outside \${size} theme toggle\`}
            />
            <Switch
              variant="inside"
              size={size}
              color="primary"
              {...props}
              checked={checked}
              onChange={onChange}
              icon={<MoonIcon />}
              checkedIcon={<SunIcon />}
              aria-label={\`inside \${size} theme toggle\`}
            />
          </Flex>
        ))}
      </Flex>
    </Paper>
  ),
}
`,dM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  m,
  p,
  bg,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  display,
  border,
  borderWidth,
  borderStyle,
  borderColor,
  borderRadius,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import {
  tableSizeTokens,
  tableCellPaddingTokens,
  buttonColorTokens,
} from '@soroush.tech/design-system/utils/test/storiesOptions'
import { TableContainer } from '../TableContainer'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableFooter } from '../TableFooter'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableSortLabel } from '../TableSortLabel'
import { TableControl } from '../TableControl'
import { useTablePagination } from '../hooks/useTablePagination'
import { useTableSelection } from '../hooks/useTableSelection'
import { useTableSort, type TableSortMap } from '../hooks/useTableSort'
import { TablePagination } from '../TablePagination'
import { Checkbox } from '@soroush.tech/design-system/Checkbox'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Table, type TableProps } from './Table'

const deployments = [
  { service: 'web', region: 'fra1', status: 'healthy', latency: 42 },
  { service: 'api', region: 'fra1', status: 'healthy', latency: 87 },
  { service: 'worker', region: 'iad1', status: 'degraded', latency: 213 },
  { service: 'cron', region: 'iad1', status: 'healthy', latency: 55 },
  { service: 'edge', region: 'sin1', status: 'healthy', latency: 12 },
  { service: 'db-proxy', region: 'fra1', status: 'healthy', latency: 31 },
  { service: 'queue', region: 'sfo1', status: 'degraded', latency: 158 },
  { service: 'auth', region: 'fra1', status: 'healthy', latency: 64 },
  { service: 'cdn', region: 'global', status: 'healthy', latency: 8 },
  { service: 'search', region: 'iad1', status: 'healthy', latency: 96 },
  { service: 'mailer', region: 'sfo1', status: 'healthy', latency: 120 },
  { service: 'metrics', region: 'sin1', status: 'degraded', latency: 176 },
]

// Sortable Service/Region/Status/Latency header cells - shared by the tables below
// (SelectableTable prepends a checkbox cell before these).
function ServiceHeadCells({ sort }: Readonly<{ sort: TableSortMap<'service' | 'latency'> }>) {
  return (
    <>
      <TableCell sortDirection={sort.service.isActive ? sort.service.direction : undefined}>
        <TableSortLabel {...sort.service}>Service</TableSortLabel>
      </TableCell>
      <TableCell>Region</TableCell>
      <TableCell>Status</TableCell>
      <TableCell
        align="right"
        sortDirection={sort.latency.isActive ? sort.latency.direction : undefined}
      >
        <TableSortLabel {...sort.latency}>Latency (ms)</TableSortLabel>
      </TableCell>
    </>
  )
}

/** Sortable deployments table - extra children (e.g. a TableFooter) render after the body. */
function DeploymentsTable({ children, ...tableProps }: Readonly<TableProps>) {
  const sort = useTableSort(['service', 'latency'])

  return (
    <Table {...tableProps}>
      <TableHead>
        <TableRow>
          <ServiceHeadCells sort={sort} />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableControl data={deployments} sort={sort}>
          {(row) => (
            <TableRow key={row.service} isHoverable>
              <TableCell>{row.service}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
            </TableRow>
          )}
        </TableControl>
      </TableBody>
      {children}
    </Table>
  )
}

const meta: Meta<typeof Table> = {
  title: 'Theme/Table/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        // component
        'size',
        'cellPadding',
        'hasStickyHeader',
        'shouldHideSortIcon',
        'hasEllipsis',
        'align',
        // color
        'color',
        'bg',
        // space
        'p',
        'm',
        // layout
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'display',
        // border
        'border',
        'borderWidth',
        'borderStyle',
        'borderColor',
        'borderRadius',
      ],
    },
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['left', 'right', 'center', 'justify'],
      description:
        'Default text alignment for every cell - cells with \`align="inherit"\` follow it.',
      table: { category: 'Layout' },
    },
    size: {
      control: { type: 'select' },
      options: tableSizeTokens,
      description: 'Cell density - broadcast to descendant \`TableCell\`s via \`TableContext\`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    cellPadding: {
      control: { type: 'select' },
      options: tableCellPaddingTokens,
      description: 'Cell padding mode - \`none\` zeroes cell padding.',
      table: { category: 'Layout', defaultValue: { summary: 'normal' } },
    },
    hasStickyHeader: {
      control: 'boolean',
      description:
        'Makes header cells stick to the top of a scrolling \`TableContainer\` with a bounded height.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldHideSortIcon: {
      control: 'boolean',
      description:
        'Hides inactive sort icons (revealed on hover/focus) - broadcast to \`TableSortLabel\`s via \`TableContext\`. Set \`false\` to keep them always visible (dimmed).',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    hasEllipsis: {
      control: 'boolean',
      description:
        'Truncates overflowing cell text with an ellipsis - broadcast to \`TableCell\`s via \`TableContext\`. Cells need a constrained width for the truncation to kick in.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description:
        "Palette color for descendant rows' hover/selected shading - broadcast to \`TableRow\`s via \`TableContext\`; a row's own \`color\` wins.",
      table: { category: 'Visual' },
    },
    bg,
    p,
    m,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    display,
    border,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
  },
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: (args) => <DeploymentsTable {...args} />,
}

export const Composed: Story = {
  render: (args) => (
    <TableContainer maxHeight="320px" borderColor="light" borderWidth="thin" borderStyle="solid">
      <DeploymentsTable hasStickyHeader {...args}>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total services</TableCell>
            <TableCell align="right">{deployments.length}</TableCell>
          </TableRow>
        </TableFooter>
      </DeploymentsTable>
    </TableContainer>
  ),
}

export const Dense: Story = {
  render: () => <DeploymentsTable size="sm" bg="paper" />,
}

/**
 * Row selection - \`useTableSelection\` keeps the selection keyed by row identity,
 * so it survives page flips and re-sorting; select-all/indeterminate run
 * against the whole dataset, not the visible page.
 */
function SelectableTable() {
  const selection = useTableSelection(deployments.map((row) => row.service))
  const pagination = useTablePagination({ defaultRowsPerPage: 5 })
  const sort = useTableSort(['service', 'latency'])

  return (
    <Table size="sm" shouldHideSortIcon={false}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              size="sm"
              color="primary"
              {...selection.all}
              aria-label="Select all deployments"
            />
          </TableCell>
          <ServiceHeadCells sort={sort} />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableControl data={deployments} sort={sort} pagination={pagination}>
          {(row) => (
            <TableRow key={row.service} isHoverable isSelected={selection.isSelected(row.service)}>
              <TableCell>
                <Checkbox
                  size="sm"
                  color="primary"
                  {...selection.row(row.service)}
                  aria-label={\`Select \${row.service}\`}
                />
              </TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
            </TableRow>
          )}
        </TableControl>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography variant="caption" color="secondary" as="span">
              {selection.selected.length} of {deployments.length} selected
            </Typography>
          </TableCell>
          <TablePagination
            count={deployments.length}
            {...pagination}
            rowsPerPageOptions={[5, 10]}
            colSpan={3}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const RowSelection: Story = {
  render: () => <SelectableTable />,
}
`,fM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  p,
  m,
  border,
  borderWidth,
  borderStyle,
  borderColor,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { textColorTokens } from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableBody } from './TableBody'

const deployments = [
  { service: 'web', region: 'fra1', latency: 42 },
  { service: 'api', region: 'fra1', latency: 87 },
  { service: 'worker', region: 'iad1', latency: 213 },
]

const meta: Meta<typeof TableBody> = {
  title: 'Theme/Table/TableBody',
  component: TableBody,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['color', 'bg', 'borderColor', 'p', 'm', 'border', 'borderWidth', 'borderStyle'],
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color - resolves against \`theme.text\`.',
      table: { category: 'Visual' },
    },
    bg,
    borderColor,
    p,
    m,
    border,
    borderWidth,
    borderStyle,
  },
}

export default meta
type Story = StoryObj<typeof TableBody>

export const Default: Story = {
  render: (args) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Service</TableCell>
          <TableCell>Region</TableCell>
          <TableCell align="right">Latency (ms)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody {...args}>
        {deployments.map((row) => (
          <TableRow key={row.service} isHoverable>
            <TableCell>{row.service}</TableCell>
            <TableCell>{row.region}</TableCell>
            <TableCell align="right">{row.latency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
`,pM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  p,
  m,
  border,
  borderWidth,
  borderStyle,
  borderColor,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import {
  tableCellVariantTokens,
  tableCellAlignTokens,
  tableSizeTokens,
  tableCellPaddingTokens,
  textColorTokens,
  fontFamilyTokens,
  fontSizeIndices,
  fontWeightTokens,
  lineHeightTokens,
  letterSpacingTokens,
} from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableRow } from '../TableRow'
import { TableCell } from './TableCell'

const meta: Meta<typeof TableCell> = {
  title: 'Theme/Table/TableCell',
  component: TableCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        // component
        'variant',
        'align',
        'size',
        'cellPadding',
        'sortDirection',
        'hasEllipsis',
        'scope',
        // color
        'color',
        'bg',
        'borderColor',
        // typography
        'fontFamily',
        'fontSize',
        'fontWeight',
        'lineHeight',
        'letterSpacing',
        // space
        'p',
        'm',
        // border
        'border',
        'borderWidth',
        'borderStyle',
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: tableCellVariantTokens,
      description:
        'Cell type - inherited from the enclosing section (\`TableHead\`/\`TableBody\`/\`TableFooter\`), overridable per cell. \`head\` renders \`<th scope="col">\`.',
      table: { category: 'Behavior' },
    },
    align: {
      control: { type: 'select' },
      options: tableCellAlignTokens,
      description: 'Text alignment of the cell content. Numbers should be right-aligned.',
      table: { category: 'Layout', defaultValue: { summary: 'inherit' } },
    },
    size: {
      control: { type: 'select' },
      options: tableSizeTokens,
      description: 'Cell density - inherited from the \`Table\`, overridable per cell.',
      table: { category: 'Layout' },
    },
    cellPadding: {
      control: { type: 'select' },
      options: tableCellPaddingTokens,
      description: 'Padding mode - inherited from the \`Table\`. \`none\` zeroes padding.',
      table: { category: 'Layout' },
    },
    sortDirection: {
      control: { type: 'select' },
      options: ['asc', 'desc'],
      description: 'Sets \`aria-sort\` on the cell - pair with \`TableSortLabel\` for the control.',
      table: { category: 'Behavior' },
    },
    hasEllipsis: {
      control: 'boolean',
      description:
        "Truncates overflowing text with an ellipsis - inherits the \`Table\`'s \`hasEllipsis\`. Needs a constrained width (e.g. \`maxWidth\`) to kick in.",
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    scope: {
      control: 'text',
      description:
        'Native scope attribute - defaults to \`col\` on header cells for screen-reader navigation.',
      table: { category: 'Behavior' },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color - resolves against \`theme.text\`.',
      table: { category: 'Visual' },
    },
    bg,
    borderColor,
    fontFamily: {
      control: { type: 'select' },
      options: fontFamilyTokens,
      description: 'Font family - resolves against \`theme.fonts\`.',
      table: { category: 'Typography' },
    },
    fontSize: {
      control: { type: 'select' },
      options: fontSizeIndices,
      description: 'Font size index - resolves against \`theme.fontSizes\`.',
      table: { category: 'Typography' },
    },
    fontWeight: {
      control: { type: 'select' },
      options: fontWeightTokens,
      description: 'Font weight - resolves against \`theme.fontWeights\`.',
      table: { category: 'Typography' },
    },
    lineHeight: {
      control: { type: 'select' },
      options: lineHeightTokens,
      description: 'Line height - resolves against \`theme.lineHeights\`.',
      table: { category: 'Typography' },
    },
    letterSpacing: {
      control: { type: 'select' },
      options: letterSpacingTokens,
      description: 'Letter spacing - resolves against \`theme.letterSpacings\`.',
      table: { category: 'Typography' },
    },
    p,
    m,
    border,
    borderWidth,
    borderStyle,
  },
}

export default meta
type Story = StoryObj<typeof TableCell>

const deployments = [
  { service: 'web', region: 'fra1', latency: 42 },
  { service: 'api', region: 'fra1', latency: 87 },
  { service: 'worker', region: 'iad1', latency: 213 },
]

// Controls apply to every cell - head and body - so the effect is visible table-wide.
export const Default: Story = {
  render: (args) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell {...args}>Service</TableCell>
          <TableCell {...args}>Region</TableCell>
          <TableCell align="right" {...args}>
            Latency (ms)
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((row) => (
          <TableRow key={row.service}>
            <TableCell {...args}>{row.service}</TableCell>
            <TableCell {...args}>{row.region}</TableCell>
            <TableCell align="right" {...args}>
              {row.latency}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Densities: Story = {
  render: () => (
    <Table>
      <TableBody>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <TableRow key={size}>
            <TableCell size={size}>{size} density</TableCell>
            <TableCell size={size} align="right">
              42
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
`,mM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  opacity,
  cursor,
  p,
  m,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  display,
  position,
  border,
  borderWidth,
  borderStyle,
  borderColor,
  borderRadius,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableContainer } from './TableContainer'

const columns = Array.from({ length: 12 }, (_, i) => \`Metric \${i + 1}\`)

const meta: Meta<typeof TableContainer> = {
  title: 'Theme/Table/TableContainer',
  component: TableContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        // visual
        'bg',
        'opacity',
        'cursor',
        // space
        'p',
        'm',
        // layout
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'display',
        'position',
        // border
        'border',
        'borderWidth',
        'borderStyle',
        'borderColor',
        'borderRadius',
      ],
    },
  },
  argTypes: {
    bg,
    opacity,
    cursor,
    p,
    m,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    display,
    position,
    border,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
  },
}

export default meta
type Story = StoryObj<typeof TableContainer>

export const WideTableScrolls: Story = {
  args: { maxWidth: '480px' },
  render: (args) => (
    <TableContainer {...args}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} style={{ whiteSpace: 'nowrap' }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} align="right">
                {column.length}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
`,hM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableFooter } from '../TableFooter'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableSortLabel } from '../TableSortLabel'
import { TablePagination } from '../TablePagination'
import { useTableSort, type TableSortMap } from '../hooks/useTableSort'
import { useTablePagination } from '../hooks/useTablePagination'
import { TableControl } from './TableControl'

interface Service {
  name: string
  region: string
  latency: number
}

const REGIONS = ['fra1', 'iad1', 'sfo1', 'sin1'] as const

const services: Service[] = Array.from({ length: 23 }, (_, i) => ({
  name: \`service-\${String(i + 1).padStart(2, '0')}\`,
  region: REGIONS[i % REGIONS.length],
  latency: 8 + ((i * 13) % 220),
}))

const meta: Meta<typeof TableControl<Service>> = {
  title: 'Theme/Table/TableControl',
  component: TableControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['data'],
    },
  },
  args: {
    data: services,
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'The full dataset - \`TableControl\` derives the visible rows from it.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof TableControl<Service>>

// Sortable Service/Region/Latency header - shared by both stories below.
function ServiceSortHead({ sort }: Readonly<{ sort: TableSortMap<'name' | 'latency'> }>) {
  return (
    <TableHead>
      <TableRow>
        <TableCell sortDirection={sort.name.isActive ? sort.name.direction : undefined}>
          <TableSortLabel {...sort.name}>Service</TableSortLabel>
        </TableCell>
        <TableCell>Region</TableCell>
        <TableCell
          align="right"
          sortDirection={sort.latency.isActive ? sort.latency.direction : undefined}
        >
          <TableSortLabel {...sort.latency}>Latency (ms)</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

function SortedAndPaginated({ data }: Readonly<{ data: Service[] }>) {
  const sort = useTableSort(['name', 'latency'])
  const pagination = useTablePagination({ defaultRowsPerPage: 5 })

  return (
    <Table size="sm" shouldHideSortIcon={false}>
      <ServiceSortHead sort={sort} />
      <TableBody>
        <TableControl data={data} sort={sort} pagination={pagination}>
          {(row) => (
            <TableRow key={row.name} isHoverable>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
            </TableRow>
          )}
        </TableControl>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={data.length}
            {...pagination}
            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const Default: Story = {
  render: (args) => <SortedAndPaginated data={[...args.data]} />,
}

function SortOnly({ data }: Readonly<{ data: Service[] }>) {
  const sort = useTableSort(['name', 'latency'])
  return (
    <Table size="sm" shouldHideSortIcon={false}>
      <ServiceSortHead sort={sort} />
      <TableBody>
        <TableControl data={data.slice(0, 6)} sort={sort}>
          {(row) => (
            <TableRow key={row.name} isHoverable>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
            </TableRow>
          )}
        </TableControl>
      </TableBody>
    </Table>
  )
}

export const SortOnlyTable: Story = {
  render: (args) => <SortOnly data={[...args.data]} />,
}
`,gM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  p,
  m,
  border,
  borderWidth,
  borderStyle,
  borderColor,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { textColorTokens } from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableFooter } from './TableFooter'

const deployments = [
  { service: 'web', region: 'fra1', latency: 42 },
  { service: 'api', region: 'fra1', latency: 87 },
  { service: 'worker', region: 'iad1', latency: 213 },
]

const meta: Meta<typeof TableFooter> = {
  title: 'Theme/Table/TableFooter',
  component: TableFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['color', 'bg', 'borderColor', 'p', 'm', 'border', 'borderWidth', 'borderStyle'],
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color - resolves against \`theme.text\`.',
      table: { category: 'Visual' },
    },
    bg,
    borderColor,
    p,
    m,
    border,
    borderWidth,
    borderStyle,
  },
}

export default meta
type Story = StoryObj<typeof TableFooter>

export const Default: Story = {
  render: (args) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Service</TableCell>
          <TableCell>Region</TableCell>
          <TableCell align="right">Latency (ms)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((row) => (
          <TableRow key={row.service} isHoverable>
            <TableCell>{row.service}</TableCell>
            <TableCell>{row.region}</TableCell>
            <TableCell align="right">{row.latency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter {...args}>
        <TableRow>
          <TableCell colSpan={2}>Total services</TableCell>
          <TableCell align="right">{deployments.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
`,_M=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  p,
  m,
  border,
  borderWidth,
  borderStyle,
  borderColor,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { textColorTokens } from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Table } from '../Table'
import { TableBody } from '../TableBody'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableHead } from './TableHead'

const deployments = [
  { service: 'web', region: 'fra1', latency: 42 },
  { service: 'api', region: 'fra1', latency: 87 },
  { service: 'worker', region: 'iad1', latency: 213 },
]

const meta: Meta<typeof TableHead> = {
  title: 'Theme/Table/TableHead',
  component: TableHead,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['color', 'bg', 'borderColor', 'p', 'm', 'border', 'borderWidth', 'borderStyle'],
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color - resolves against \`theme.text\`.',
      table: { category: 'Visual' },
    },
    bg,
    borderColor,
    p,
    m,
    border,
    borderWidth,
    borderStyle,
  },
}

export default meta
type Story = StoryObj<typeof TableHead>

export const Default: Story = {
  render: (args) => (
    <Table>
      <TableHead {...args}>
        <TableRow>
          <TableCell>Service</TableCell>
          <TableCell>Region</TableCell>
          <TableCell align="right">Latency (ms)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((row) => (
          <TableRow key={row.service} isHoverable>
            <TableCell>{row.service}</TableCell>
            <TableCell>{row.region}</TableCell>
            <TableCell align="right">{row.latency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
`,vM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  p,
  m,
  paginationCount,
  shouldShowFirstButton,
  shouldShowLastButton,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import {
  tableSizeTokens,
  tableCellPaddingTokens,
  textColorTokens,
} from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableFooter } from '../TableFooter'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableControl } from '../TableControl'
import { useTablePagination } from '../hooks/useTablePagination'
import { TablePagination } from './TablePagination'

const meta: Meta<typeof TablePagination> = {
  title: 'Theme/Table/TablePagination',
  component: TablePagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        // component
        'count',
        'page',
        'rowsPerPage',
        'rowsPerPageOptions',
        'disabled',
        'shouldShowFirstButton',
        'shouldShowLastButton',
        'rowsPerPageLabel',
        'colSpan',
        // inherited TableCell styling
        'size',
        'cellPadding',
        'color',
        'bg',
        'p',
        'm',
      ],
    },
  },
  args: {
    count: 100,
    page: 2,
    rowsPerPage: 10,
  },
  argTypes: {
    count: paginationCount,
    page: {
      control: { type: 'number', min: 0 },
      description: 'Zero-based current page (controlled).',
      table: { category: 'Behavior' },
    },
    rowsPerPage: {
      control: { type: 'number', min: -1 },
      description: 'Rows per page; \`-1\` shows all rows (controlled).',
      table: { category: 'Behavior' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all controls.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldShowFirstButton,
    shouldShowLastButton,
    rowsPerPageLabel: {
      control: 'text',
      description: 'Label for the rows-per-page selector.',
      table: { category: 'Content', defaultValue: { summary: 'Rows per page:' } },
    },
    rowsPerPageOptions: {
      control: 'object',
      description:
        'Selector options - numbers or \`{ label, value }\`; fewer than two hides the selector.',
      table: { category: 'Content', defaultValue: { summary: '[10, 25, 50, 100]' } },
    },
    colSpan: {
      control: { type: 'number', min: 1 },
      description: 'Spans the footer row.',
      table: { category: 'Layout', defaultValue: { summary: '1000' } },
    },
    size: {
      control: { type: 'select' },
      options: tableSizeTokens,
      description: 'Cell density - inherited from the \`Table\`, overridable here.',
      table: { category: 'Layout' },
    },
    cellPadding: {
      control: { type: 'select' },
      options: tableCellPaddingTokens,
      description: 'Padding mode - inherited from the \`Table\`. \`none\` zeroes padding.',
      table: { category: 'Layout' },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color - resolves against \`theme.text\`.',
      table: { category: 'Visual' },
    },
    bg,
    p,
    m,
  },
}

export default meta
type Story = StoryObj<typeof TablePagination>

const REGIONS = ['fra1', 'iad1', 'sfo1', 'sin1'] as const
const STATUSES = ['healthy', 'healthy', 'healthy', 'degraded'] as const

const services = Array.from({ length: 57 }, (_, i) => ({
  name: \`service-\${String(i + 1).padStart(2, '0')}\`,
  region: REGIONS[i % REGIONS.length],
  status: STATUSES[(i * 7) % STATUSES.length],
  latency: 8 + ((i * 13) % 220),
}))

const sliceForPage = (page: number, rowsPerPage: number) =>
  rowsPerPage === -1 ? services : services.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

const serviceRows = (rows: typeof services) =>
  rows.map((row) => (
    <TableRow key={row.name} isHoverable>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.region}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell align="right">{row.latency}</TableCell>
    </TableRow>
  ))

const headRow = (
  <TableRow>
    <TableCell>Service</TableCell>
    <TableCell>Region</TableCell>
    <TableCell>Status</TableCell>
    <TableCell align="right">Latency (ms)</TableCell>
  </TableRow>
)

// The body slices the 57-row dataset by the page/rowsPerPage controls, so
// paging through the args shows real data changing.
export const Default: Story = {
  args: { count: services.length },
  render: (args) => (
    <Table size="sm">
      <TableHead>{headRow}</TableHead>
      <TableBody>{serviceRows(sliceForPage(args.page, args.rowsPerPage))}</TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination {...args} />
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

function PaginatedTable() {
  const pagination = useTablePagination({ defaultRowsPerPage: 10 })

  return (
    <Table size="sm">
      <TableHead>{headRow}</TableHead>
      <TableBody>
        <TableControl data={services} pagination={pagination}>
          {(row) => (
            <TableRow key={row.name} isHoverable>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
            </TableRow>
          )}
        </TableControl>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={services.length}
            {...pagination}
            shouldShowFirstButton
            shouldShowLastButton
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const InAFullTable: Story = {
  render: () => <PaginatedTable />,
}
`,yM=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  paginationCount,
  shouldShowFirstButton,
  shouldShowLastButton,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { TablePaginationActions } from './TablePaginationActions'

const meta: Meta<typeof TablePaginationActions> = {
  title: 'Theme/Table/TablePaginationActions',
  component: TablePaginationActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'count',
        'page',
        'rowsPerPage',
        'disabled',
        'shouldShowFirstButton',
        'shouldShowLastButton',
        'size',
      ],
    },
  },
  args: {
    count: 100,
    page: 2,
    rowsPerPage: 10,
    getItemAriaLabel: (type) => \`Go to \${type} page\`,
    onPageChange: () => {},
  },
  argTypes: {
    count: paginationCount,
    page: {
      control: { type: 'number', min: 0 },
      description: 'Zero-based current page.',
      table: { category: 'Behavior' },
    },
    rowsPerPage: {
      control: { type: 'number', min: -1 },
      description: 'Rows per page - used to derive the last page.',
      table: { category: 'Behavior' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all buttons.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldShowFirstButton,
    shouldShowLastButton,
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button density - resolves against \`theme.sizes\`.',
      table: { category: 'Layout', defaultValue: { summary: 'sm' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof TablePaginationActions>

export const Default: Story = {}

function InteractiveActions() {
  const [page, setPage] = useState(0)
  return (
    <Flex flexDirection="column" gap={2} alignItems="center">
      <Typography variant="caption" color="secondary">
        Page {page + 1} of 10
      </Typography>
      <TablePaginationActions
        count={100}
        page={page}
        rowsPerPage={10}
        onPageChange={setPage}
        getItemAriaLabel={(type) => \`Go to \${type} page\`}
        shouldShowFirstButton
        shouldShowLastButton
      />
    </Flex>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveActions />,
}
`,bM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  bg,
  p,
  m,
  border,
  borderWidth,
  borderStyle,
  borderColor,
} from '@soroush.tech/design-system/utils/test/storiesArgs'
import { buttonColorTokens } from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableCell } from '../TableCell'
import { TableRow } from './TableRow'

const deployments = [
  { service: 'web', region: 'fra1', latency: 42 },
  { service: 'api', region: 'fra1', latency: 87 },
  { service: 'worker', region: 'iad1', latency: 213 },
]

const meta: Meta<typeof TableRow> = {
  title: 'Theme/Table/TableRow',
  component: TableRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'isHoverable',
        'isSelected',
        'color',
        'bg',
        'borderColor',
        'p',
        'm',
        'border',
        'borderWidth',
        'borderStyle',
      ],
    },
  },
  argTypes: {
    isHoverable: {
      control: 'boolean',
      description: 'Shades the row on hover with \`theme.palette[color].light\`.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    isSelected: {
      control: 'boolean',
      description: 'Fills the row with \`theme.palette[color].dark\` + contrast text.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description:
        'Palette color for the hover/selected shading - resolves against \`theme.palette\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    bg,
    borderColor,
    p,
    m,
    border,
    borderWidth,
    borderStyle,
  },
}

export default meta
type Story = StoryObj<typeof TableRow>

// Controls apply to every body row so the effect is visible across the table.
export const Default: Story = {
  args: { isHoverable: true },
  render: (args) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Service</TableCell>
          <TableCell>Region</TableCell>
          <TableCell align="right">Latency (ms)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((row) => (
          <TableRow key={row.service} {...args}>
            <TableCell>{row.service}</TableCell>
            <TableCell>{row.region}</TableCell>
            <TableCell align="right">{row.latency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const States: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>State</TableCell>
          <TableCell>Service</TableCell>
          <TableCell align="right">Latency (ms)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>default</TableCell>
          <TableCell>web</TableCell>
          <TableCell align="right">42</TableCell>
        </TableRow>
        <TableRow isHoverable>
          <TableCell>isHoverable</TableCell>
          <TableCell>api</TableCell>
          <TableCell align="right">87</TableCell>
        </TableRow>
        <TableRow isSelected>
          <TableCell>isSelected</TableCell>
          <TableCell>worker</TableCell>
          <TableCell align="right">213</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
`,xM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { p, m } from '@soroush.tech/design-system/utils/test/storiesArgs'
import { Table } from '../Table'
import { TableHead } from '../TableHead'
import { TableBody } from '../TableBody'
import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'
import { TableControl } from '../TableControl'
import { useTableSort } from '../hooks/useTableSort'
import { TableSortLabel } from './TableSortLabel'

const meta: Meta<typeof TableSortLabel> = {
  title: 'Theme/Table/TableSortLabel',
  component: TableSortLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['children', 'isActive', 'direction', 'shouldHideSortIcon', 'iconName', 'p', 'm'],
    },
  },
  args: {
    children: 'Name',
    isActive: true,
    direction: 'asc',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label contents - the arrow is appended automatically.',
      table: { category: 'Content' },
    },
    isActive: {
      control: 'boolean',
      description: 'Active styling for the currently-sorted column.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    direction: {
      control: { type: 'select' },
      options: ['asc', 'desc'],
      description: 'Current sort direction - rotates the arrow.',
      table: { category: 'Behavior', defaultValue: { summary: 'asc' } },
    },
    shouldHideSortIcon: {
      control: 'boolean',
      description:
        'Hides the inactive sort icon, revealing it on hover/focus. Set \`false\` to keep it always visible (dimmed). Inherited from the enclosing \`Table\` via \`TableContext\`.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    iconName: {
      control: 'text',
      description: 'Sort arrow icon from the Icon registry.',
      table: { category: 'Visual', defaultValue: { summary: 'arrow_upward' } },
    },
    p,
    m,
  },
}

export default meta
type Story = StoryObj<typeof TableSortLabel>

// Controls apply to every sort label so the effect is visible across the header.
export const Default: Story = {
  render: ({ children, ...args }) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel {...args}>{children}</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel {...args}>Region</TableSortLabel>
          </TableCell>
          <TableCell align="right">
            <TableSortLabel {...args}>Latency (ms)</TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name} isHoverable>
            <TableCell>{row.name}</TableCell>
            <TableCell>fra1</TableCell>
            <TableCell align="right">{row.latency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

const rows = [
  { name: 'web', latency: 42 },
  { name: 'api', latency: 87 },
  { name: 'worker', latency: 213 },
]

function SortableTable() {
  const sort = useTableSort(['name', 'latency'])

  return (
    <Table shouldHideSortIcon={false}>
      <TableHead>
        <TableRow>
          <TableCell sortDirection={sort.name.isActive ? sort.name.direction : undefined}>
            <TableSortLabel {...sort.name}>Service</TableSortLabel>
          </TableCell>
          <TableCell
            align="right"
            sortDirection={sort.latency.isActive ? sort.latency.direction : undefined}
          >
            <TableSortLabel {...sort.latency}>Latency (ms)</TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableControl data={rows} sort={sort}>
          {(row) => (
            <TableRow key={row.name} isHoverable>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.latency}</TableCell>
            </TableRow>
          )}
        </TableControl>
      </TableBody>
    </Table>
  )
}

export const SortableColumns: Story = {
  render: () => <SortableTable />,
}
`,SM=`import { useState, type ChangeEvent } from 'react'
import type { Meta, StoryObj, Decorator } from '@storybook/react-vite'
import { m, p, width, minWidth, maxWidth } from '../utils/test/storiesArgs'
import {
  textInputColorTokens,
  textInputVariantTokens,
  textInputSizeTokens,
  textColorTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { TextInput } from './TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Theme/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'color',
        'textColor',
        'disabled',
        'error',
        'readOnly',
        'required',
        'fullWidth',
        'multiline',
        'resize',
        'type',
        'size',
        'inputSize',
        'autoComplete',
        'placeholder',
        'rows',
        'minRows',
        'maxRows',
        'inputProps',
        'p',
        'm',
        'width',
        'minWidth',
        'maxWidth',
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: textInputVariantTokens,
      description:
        '\`outlined\`/\`default\` - full border box · \`underline\` - bottom border only · \`text\` - no border.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    color: {
      control: { type: 'select' },
      options: textInputColorTokens,
      description:
        'Border color token. \`palette[color].main\` on focus · \`palette[color].light\` when disabled.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Text color of the typed value - resolves against \`theme.text\`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input. Border switches to \`palette[color].light\`.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'Marks the field as invalid - border becomes \`palette.error.main\`.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Prevents changing the value while keeping the field interactive.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required for form submission.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the root to fill its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    multiline: {
      control: 'boolean',
      description:
        'Renders a \`<textarea>\`. Combine with \`resize\` for auto-growing or \`rows\` for a fixed height.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    resize: {
      control: 'boolean',
      description: 'Auto-grows the textarea as content increases. Requires \`multiline\`.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type. Non-text types disable \`multiline\` and \`resize\`.',
      table: { category: 'Behavior', defaultValue: { summary: 'text' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Controls padding and font size.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    placeholder: {
      control: 'text',
      description: 'Short hint displayed before the user enters a value.',
      table: { category: 'Content' },
    },
    rows: {
      control: 'number',
      description: 'Fixes the textarea height. Also enables multiline when > 1.',
      table: { category: 'Behavior' },
    },
    minRows: {
      control: 'number',
      description: 'Minimum rows for the auto-grow textarea. Requires \`resize\`.',
      table: { category: 'Behavior' },
    },
    maxRows: {
      control: 'number',
      description:
        'Maximum rows before the auto-grow textarea starts scrolling. Requires \`resize\`.',
      table: { category: 'Behavior' },
    },
    inputSize: {
      control: 'number',
      description:
        'Native HTML \`size\` attribute - visible width in character widths. Has no effect with \`multiline\` or \`resize\`.',
      table: { category: 'Behavior' },
    },
    autoComplete: {
      control: 'text',
      description: 'Hints the browser for autofill. Accepts any valid HTML \`autocomplete\` value.',
      table: { category: 'Content' },
    },
    inputProps: {
      control: 'object',
      description:
        'Extra props spread onto the native element - e.g. \`aria-label\`, \`cols\`, \`data-*\`. Top-level props take priority.',
      table: { category: 'Behavior' },
    },
    p,
    m,
    width,
    minWidth,
    maxWidth,
  },
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    placeholder: 'Enter a value...',
    resize: false,
  },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2} maxWidth="360px">
      {(
        [
          { label: 'Default', props: { placeholder: 'Default' } },
          { label: 'Disabled', props: { placeholder: 'Disabled', disabled: true } },
          {
            label: 'Disabled + value',
            props: { value: 'Cannot edit', disabled: true, onChange: () => {} },
          },
          { label: 'Error', props: { placeholder: 'Invalid field', error: true } },
          {
            label: 'Error + value',
            props: { value: 'bad@', error: true, onChange: () => {} },
          },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} flexDirection="row" alignItems="center" gap={3}>
          <Typography variant="caption" color="secondary" width="8rem" flexShrink={0} m={0}>
            {label}
          </Typography>
          <TextInput color="primary" fullWidth {...props} />
        </Flex>
      ))}
    </Flex>
  ),
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} maxWidth="560px">
      <Flex flexDirection="row" gap={2} mb={1}>
        {(['Normal', 'Disabled', 'Error'] as const).map((h) => (
          <Typography key={h} variant="caption" color="secondary" flex={1} m={0}>
            {h}
          </Typography>
        ))}
      </Flex>
      {(['outlined', 'underline', 'text'] as const).map((variant) => (
        <Flex key={variant} flexDirection="column" gap={1}>
          <Typography variant="caption" color="secondary" m={0}>
            {variant}
          </Typography>
          <Flex flexDirection="row" gap={2} alignItems="center">
            <TextInput variant={variant} color="primary" placeholder="Normal" fullWidth />
            <TextInput
              variant={variant}
              color="primary"
              placeholder="Disabled"
              disabled
              fullWidth
            />
            <TextInput variant={variant} color="primary" placeholder="Error" error fullWidth />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
}

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} maxWidth="560px">
      <Flex flexDirection="row" gap={2} mb={1}>
        {(['Default (click)', 'Disabled', 'Error'] as const).map((h) => (
          <Typography key={h} variant="caption" color="secondary" flex={1} m={0}>
            {h}
          </Typography>
        ))}
      </Flex>
      {(['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const).map((color) => (
        <Flex key={color} flexDirection="column" gap={1}>
          <Typography variant="caption" color="secondary" m={0}>
            {color}
          </Typography>
          <Flex flexDirection="row" gap={2}>
            <TextInput variant="outlined" color={color} placeholder="Click to focus" fullWidth />
            <TextInput variant="outlined" color={color} placeholder="Disabled" disabled fullWidth />
            <TextInput variant="outlined" color={color} placeholder="Error" error fullWidth />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
}

// ─── Multiline ────────────────────────────────────────────────────────────────

export const MultilineAutoGrow: Story = {
  name: 'Multiline - Auto-grow',
  render: () => (
    <Flex flexDirection="column" gap={1} maxWidth="480px">
      <Typography variant="caption" color="secondary" m={0}>
        Grows with content - no fixed height
      </Typography>
      <TextInput
        multiline
        resize
        fullWidth
        placeholder="Start typing... the field expands as you write."
      />
    </Flex>
  ),
}

export const MultilineFixedRows: Story = {
  name: 'Multiline - Fixed rows',
  render: () => (
    <Flex flexDirection="column" gap={1} maxWidth="480px">
      <Typography variant="caption" color="secondary" m={0}>
        Fixed to 4 rows - scrolls when content overflows
      </Typography>
      <TextInput rows={4} fullWidth placeholder="Write something..." />
    </Flex>
  ),
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: (args) => (
    <Flex width="100%" maxWidth="480px">
      <TextInput {...args} fullWidth placeholder="Full-width input..." />
    </Flex>
  ),
}

export const Types: Story = {
  render: () => (
    <Flex flexDirection="column" gap={2} maxWidth="360px">
      {(
        [
          { type: 'text', placeholder: 'Text' },
          { type: 'email', placeholder: 'email@example.com' },
          { type: 'password', placeholder: 'Password' },
          { type: 'number', placeholder: '0' },
          { type: 'search', placeholder: 'Search...' },
          { type: 'url', placeholder: 'https://' },
        ] as const
      ).map(({ type, placeholder }) => (
        <Flex key={type} flexDirection="row" alignItems="center" gap={3}>
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} m={0}>
            {type}
          </Typography>
          <TextInput type={type} placeholder={placeholder} fullWidth />
        </Flex>
      ))}
    </Flex>
  ),
}

interface ControlledArgs {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

// Owns the input value state in a decorator and injects value + onChange via args.
const WithValueState: Decorator = (Story, ctx) => {
  const [value, setValue] = useState('')
  return (
    <Story
      args={{
        ...ctx.args,
        value,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setValue(e.target.value),
      }}
    />
  )
}

export const Controlled: StoryObj<ControlledArgs> = {
  decorators: [WithValueState],
  render: ({ value, onChange }) => (
    <Flex flexDirection="column" gap={2} maxWidth="360px">
      <TextInput fullWidth value={value} onChange={onChange} placeholder="Type something..." />
      <Typography variant="caption" color="secondary" m={0}>
        Value: {value || '(empty)'}
      </Typography>
    </Flex>
  ),
}
`,CM=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  buttonColorTokens,
  tableSizeTokens,
} from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Icon } from '@soroush.tech/design-system/Icon'
import { ToggleButton } from './ToggleButton'

const meta: Meta<typeof ToggleButton> = {
  title: 'Theme/ToggleButton/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['value', 'isSelected', 'color', 'size', 'fullWidth', 'disabled', 'loading'],
    },
  },
  args: {
    value: 'check',
    children: 'Check',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The value associated with the button inside a \`ToggleButtonGroup\`.',
      table: { category: 'Content' },
    },
    isSelected: {
      control: 'boolean',
      description:
        'Active state - inferred from the group value when omitted. Drives \`aria-pressed\`.',
      table: { category: 'Behavior' },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description:
        'Active-state color - resolves against \`theme.palette\`. Inherited from the group.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'select' },
      options: tableSizeTokens,
      description:
        'Padding and font size - resolves against \`theme.sizes\`. Inherited from the group.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the button to fill its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button. Inherited from the group.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading indicator and disables the button - e.g. while a toggle saves.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {}

function StandaloneToggle() {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <ToggleButton
      value="check"
      isSelected={isSelected}
      onChange={() => setIsSelected((prev) => !prev)}
      aria-label="check"
    >
      <Icon name="check" size="1em" color="inherit" />
    </ToggleButton>
  )
}

export const Standalone: Story = {
  render: () => <StandaloneToggle />,
}
`,wM=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  buttonColorTokens,
  tableSizeTokens,
} from '@soroush.tech/design-system/utils/test/storiesOptions'
import { Flex } from '@soroush.tech/design-system/Flex'
import { ToggleButton } from '../ToggleButton'
import { ToggleButtonGroup, type ToggleButtonGroupProps } from './ToggleButtonGroup'
import { type ToggleButtonValue } from '../ToggleButtonGroupContext'

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Theme/ToggleButton/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['isExclusive', 'color', 'size', 'orientation', 'disabled', 'fullWidth'],
    },
  },
  argTypes: {
    isExclusive: {
      control: 'boolean',
      description: 'Only one child value can be selected at a time.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Selected-state color for all children - resolves against \`theme.palette\`.',
      table: { category: 'Visual' },
    },
    size: {
      control: { type: 'select' },
      options: tableSizeTokens,
      description: 'Density for all children - resolves against \`theme.sizes\`.',
      table: { category: 'Layout' },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout flow direction.',
      table: { category: 'Layout', defaultValue: { summary: 'horizontal' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all children.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Group fills its container; children share the width.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButtonGroup>

function ExclusiveGroup(props: Readonly<Partial<ToggleButtonGroupProps>>) {
  const [platform, setPlatform] = useState<ToggleButtonValue | ToggleButtonValue[] | null>('web')
  return (
    <ToggleButtonGroup
      isExclusive
      value={platform}
      onChange={setPlatform}
      color="primary"
      aria-label="Platform"
      {...props}
    >
      <ToggleButton value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
  )
}

function MultipleGroup(props: Readonly<Partial<ToggleButtonGroupProps>>) {
  const [formats, setFormats] = useState<ToggleButtonValue | ToggleButtonValue[] | null>(['bold'])
  return (
    <ToggleButtonGroup
      value={formats}
      onChange={setFormats}
      color="secondary"
      aria-label="Text formatting"
      {...props}
    >
      <ToggleButton value="bold">Bold</ToggleButton>
      <ToggleButton value="italic">Italic</ToggleButton>
      <ToggleButton value="underline">Underline</ToggleButton>
    </ToggleButtonGroup>
  )
}

export const ExclusiveSelection: Story = {
  render: (args) => <ExclusiveGroup {...args} />,
}

export const MultipleSelection: Story = {
  render: (args) => <MultipleGroup {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} alignItems="flex-start">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ExclusiveGroup key={size} size={size} />
      ))}
    </Flex>
  ),
}

export const Vertical: Story = {
  render: () => <ExclusiveGroup orientation="vertical" />,
}

export const FullWidth: Story = {
  render: () => <ExclusiveGroup fullWidth />,
}

export const Disabled: Story = {
  render: () => <ExclusiveGroup disabled />,
}
`,TM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { bg, m, opacity, p } from '../utils/test/storiesArgs'
import {
  alignTokens,
  asTokens,
  fontFamilyTokens,
  fontSizeIndices,
  fontStyleTokens,
  fontWeightTokens,
  letterSpacingTokens,
  lineHeightTokens,
  textColorTokens,
  typographyVariantTokens,
} from '../utils/test/storiesOptions'
import { Flex } from '../Flex'
import { View } from '../View'
import { Typography } from './Typography'

const meta: Meta<typeof Typography> = {
  title: 'Theme/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      // Only show the Typography-specific and key styled-system props.
      // Without this, Storybook lists every HTMLAttributes<HTMLElement> field.
      include: [
        'children',
        'variant',
        'align',
        'gutterBottom',
        'noWrap',
        'as',
        'color',
        'bg',
        'opacity',
        'm',
        'p',
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'lineHeight',
        'letterSpacing',
      ],
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content rendered inside the element.',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'select' },
      options: typographyVariantTokens,
      description: 'Sets typographic scale and maps to a semantic HTML element via variantMapping.',
      table: { category: 'Typography', defaultValue: { summary: 'body1' } },
    },
    align: {
      control: { type: 'inline-radio' },
      options: alignTokens,
      description: 'CSS text-align.',
      table: { category: 'Layout' },
    },
    gutterBottom: {
      control: 'boolean',
      description: 'Adds margin-bottom: 0.5em beneath the element.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    noWrap: {
      control: 'boolean',
      description: 'Clips overflow text with an ellipsis (white-space: nowrap).',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    as: {
      control: { type: 'select' },
      options: asTokens,
      description: 'Overrides the HTML element chosen by variant.',
      table: { category: 'Layout' },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Semantic text color - resolves from theme.text.',
      table: { category: 'Visual' },
    },
    bg,
    opacity,
    m,
    p,
    fontFamily: {
      control: { type: 'inline-radio' },
      options: fontFamilyTokens,
      description: 'Theme font token (theme.fonts).',
      table: { category: 'Typography' },
    },
    fontSize: {
      control: { type: 'select' },
      options: fontSizeIndices,
      description:
        'theme.fontSizes index - 0=12px · 1=14px · 2=16px · 3=20px · 4=24px · 5=32px · 6=48px',
      table: { category: 'Typography' },
    },
    fontWeight: {
      control: { type: 'select' },
      options: fontWeightTokens,
      description: 'Theme font-weight keyword (theme.fontWeights).',
      table: { category: 'Typography' },
    },
    fontStyle: {
      control: { type: 'inline-radio' },
      options: fontStyleTokens,
      description: 'CSS font-style.',
      table: { category: 'Typography' },
    },
    lineHeight: {
      control: { type: 'select' },
      options: lineHeightTokens,
      description:
        'theme.lineHeights key - none=1 · tight=1.2 · snug=1.35 · base=1.5 · relaxed=1.625 · loose=2',
      table: { category: 'Typography' },
    },
    letterSpacing: {
      control: { type: 'select' },
      options: letterSpacingTokens,
      description: 'theme.letterSpacings key.',
      table: { category: 'Typography' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'Great products are built through clarity, consistency, and attention to detail.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <Flex>
      {(
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'caption',
          'overline',
          'button',
        ] as const
      ).map((v) => (
        <Flex key={v} flexDirection="row" alignItems="center" mb={1}>
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {v}
          </Typography>
          <Typography variant={v} m={0}>
            The quick brown fox
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

const ALIGN_TEXT: Record<string, string> = {
  left: 'The quick brown fox jumps over the lazy dog.',
  center: 'The quick brown fox jumps over the lazy dog.',
  right: 'The quick brown fox jumps over the lazy dog.',
  justify:
    'Justify only stretches lines that wrap - the last line stays left. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.',
}

export const Alignment: Story = {
  render: () => (
    <Flex width="360px">
      {(['left', 'center', 'right', 'justify'] as const).map((align) => (
        <View key={align} mb={3}>
          <Typography variant="caption" color="secondary" mb={0.5} m={0}>
            {align}
          </Typography>
          <Typography variant="body1" align={align} m={0}>
            {ALIGN_TEXT[align]}
          </Typography>
        </View>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: () => (
    <Flex p={3}>
      {(
        [
          'inherit',
          'initial',
          'primary',
          'secondary',
          'disabled',
          'error',
          'success',
          'info',
          'warning',
        ] as const
      ).map((c) => (
        <Flex key={c} flexDirection="row" alignItems="center" mb={1}>
          <Typography variant="caption" color="secondary" width="6rem" flexShrink={0} m={0}>
            {c}
          </Typography>
          <Typography variant="body1" color={c} m={0}>
            The quick brown fox
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const LetterSpacing: Story = {
  render: () => (
    <Flex>
      {(['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'] as const).map((ls) => (
        <Flex key={ls} flexDirection="row" alignItems="baseline" mb={1}>
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} m={0}>
            {ls}
          </Typography>
          <Typography variant="body1" letterSpacing={ls} m={0}>
            The quick brown fox
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const LineHeights: Story = {
  render: () => (
    <Flex>
      {(['none', 'tight', 'snug', 'base', 'relaxed', 'loose'] as const).map((lh) => (
        <Flex key={lh} flexDirection="row" alignItems="flex-start" mb={2}>
          <Typography variant="caption" color="secondary" width="5rem" flexShrink={0} mt={0} mb={0}>
            {lh}
          </Typography>
          <Typography variant="body2" lineHeight={lh} m={0} maxWidth="320px">
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

export const NoWrap: Story = {
  render: () => (
    <View width="240px" border="1px dashed" borderColor="light" p={1.5}>
      <Typography variant="body1" noWrap m={0}>
        This very long text will be truncated with an ellipsis when it overflows its container.
      </Typography>
      <Typography variant="caption" color="secondary" mt={1} mb={0}>
        ↑ noWrap (240px container)
      </Typography>
    </View>
  ),
}

export const GutterBottom: Story = {
  render: () => (
    <View border="1px dashed" borderColor="light" p={1.5} maxWidth="480px">
      <Typography variant="h4" gutterBottom>
        Heading with gutterBottom
      </Typography>
      <Typography variant="body1" m={0}>
        This paragraph follows directly after the heading. The gutter (0.5em) creates breathing room
        between them without extra margin props.
      </Typography>
    </View>
  ),
}

export const Composed: Story = {
  render: () => (
    <Flex as="article" maxWidth="480px">
      <Typography variant="overline" color="secondary" m={0}>
        Design system
      </Typography>
      <Typography variant="h2" gutterBottom mt={0}>
        Typography component
      </Typography>
      <Typography variant="subtitle1" color="secondary" m={0}>
        A flexible text primitive with variant, alignment, truncation, and full styled-system
        support.
      </Typography>
      <Typography variant="body2" mt={2} mb={0}>
        Variants map to semantic HTML elements via{' '}
        <Typography as="code" variant="inherit">
          variantMapping
        </Typography>
        . Pass{' '}
        <Typography as="code" variant="inherit">
          as
        </Typography>{' '}
        to override the element while keeping variant styles.
      </Typography>
      <Typography variant="caption" color="secondary" mt={1} mb={0}>
        Last updated: 2026
      </Typography>
    </Flex>
  ),
}
`,EM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { View } from './View'
import {
  aspectRatio,
  bg,
  border,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  cursor,
  display,
  height,
  m,
  opacity,
  order,
  p,
  position,
  width,
} from '../utils/test/storiesArgs'

const meta: Meta<typeof View> = {
  title: 'Theme/View',
  component: View,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The base layout primitive. Renders as \`<div>\`. All styled-system prop groups are supported: space, layout, color, typography, flexbox, border, and position.',
      },
    },
    controls: {
      include: [
        'bg',
        'opacity',
        'p',
        'm',
        'width',
        'height',
        'display',
        'border',
        'borderWidth',
        'borderStyle',
        'borderColor',
        'borderRadius',
        'position',
        'cursor',
        'aspectRatio',
        'order',
      ],
    },
  },
  argTypes: {
    bg,
    opacity,
    p,
    m,
    width,
    height,
    display,
    border,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
    position,
    cursor,
    aspectRatio,
    order,
  },
  args: {
    children: 'View content',
  },
}

export default meta
type Story = StoryObj<typeof View>

export const Default: Story = {}

export const WithSpacingAndBackground: Story = {
  args: {
    p: 3,
    bg: 'secondary',
    borderRadius: 'md',
    children: 'Padded container with background',
  },
}

export const Positioned: Story = {
  args: {
    position: 'relative',
    height: '150px',
    bg: 'secondary',
    borderRadius: 'sm',
  },
  render: (args) => (
    <View {...args}>
      <View position="absolute" top="20px" left="20px" p={2} bg="primary" borderRadius="sm">
        Absolute child
      </View>
    </View>
  ),
}
`,DM=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonVariant } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { createTheme, baseTheme } from './themes'
import { ThemeProvider } from './ThemeProvider'

// Living documentation for theme-level component customization
// (\`theme.components\`): defaultProps, styleOverrides, and theme-contributed
// variants - locked by Chromatic so the customization contract can't silently break.

const customized = createTheme(baseTheme, {
  components: {
    Button: {
      defaultProps: { size: 'sm', shape: 'rounded' },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          letterSpacing: theme.letterSpacings.wide,
          ...(ownerState.variant === 'contained' && { textTransform: 'none' }),
        }),
      },
      variants: [
        {
          props: { variant: 'dashed' as ButtonVariant },
          style: ({ theme }) => ({
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            border: \`\${theme.borderWidths.thin} dashed \${theme.border.primary}\`,
          }),
        },
      ],
    },
  },
})

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/Customization',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
}

export default meta
type Story = StoryObj<typeof ThemeProvider>

export const ThemeComponents: Story = {
  render: () => (
    <ThemeProvider theme={customized}>
      <Flex flexDirection="column" gap={3} p={2}>
        <Flex flexDirection="column" gap={1}>
          <Typography variant="overline" color="secondary" m={0}>
            defaultProps - sm + rounded without touching call sites
          </Typography>
          <Flex flexDirection="row" gap={2}>
            <Button>Customized default</Button>
            <Button size="lg" shape="pill">
              Explicit props still win
            </Button>
          </Flex>
        </Flex>

        <Flex flexDirection="column" gap={1}>
          <Typography variant="overline" color="secondary" m={0}>
            styleOverrides - contained loses its uppercase via ownerState
          </Typography>
          <Flex flexDirection="row" gap={2}>
            <Button variant="contained">No Uppercase Here</Button>
            <Button variant="outlined">OUTLINED KEEPS IT</Button>
          </Flex>
        </Flex>

        <Flex flexDirection="column" gap={1}>
          <Typography variant="overline" color="secondary" m={0}>
            variants - a theme-contributed "dashed" value
          </Typography>
          <ButtonGroup>
            <Button variant={'dashed' as ButtonVariant}>Draft</Button>
            <Button variant={'dashed' as ButtonVariant}>Autosave</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </ThemeProvider>
  ),
}
`,OM=e=>[...jS(e).stories.keys()],kM=Object.assign({"../../packages/design-system/src/AppBar/AppBar.stories.tsx":hC,"../../packages/design-system/src/Avatar/Avatar.stories.tsx":AC,"../../packages/design-system/src/Backdrop/Backdrop.stories.tsx":VC,"../../packages/design-system/src/Button/Button.stories.tsx":GC,"../../packages/design-system/src/ButtonGroup/ButtonGroup.stories.tsx":sw,"../../packages/design-system/src/Card/Card.stories.tsx":gw,"../../packages/design-system/src/Checkbox/Checkbox.stories.tsx":Aw,"../../packages/design-system/src/CircularProgress/CircularProgress.stories.tsx":Uw,"../../packages/design-system/src/Drawer/Drawer.stories.tsx":nT,"../../packages/design-system/src/Flex/Flex.stories.tsx":oT,"../../packages/design-system/src/FocusTrap/FocusTrap.stories.tsx":pT,"../../packages/design-system/src/Form/Form.stories.tsx":gT,"../../packages/design-system/src/FormControl/FormControl.stories.tsx":yT,"../../packages/design-system/src/FormHelperText/FormHelperText.stories.tsx":CT,"../../packages/design-system/src/FormLabel/FormLabel.stories.tsx":OT,"../../packages/design-system/src/Grid/Grid.stories.tsx":NT,"../../packages/design-system/src/Icon/Icon.stories.tsx":YT,"../../packages/design-system/src/Image/Image.stories.tsx":tE,"../../packages/design-system/src/LinearProgress/LinearProgress.stories.tsx":cE,"../../packages/design-system/src/Link/Link.stories.tsx":jE,"../../packages/design-system/src/MenuItem/MenuItem.stories.tsx":RE,"../../packages/design-system/src/Modal/Modal.stories.tsx":GE,"../../packages/design-system/src/NativeSelect/NativeSelect.stories.tsx":rD,"../../packages/design-system/src/Pagination/Pagination.stories.tsx":pD,"../../packages/design-system/src/Pagination/PaginationItem/PaginationItem.stories.tsx":CD,"../../packages/design-system/src/Paper/Paper.stories.tsx":DD,"../../packages/design-system/src/Popover/Popover.stories.tsx":PD,"../../packages/design-system/src/Portal/Portal.stories.tsx":qD,"../../packages/design-system/src/Pressable/Pressable.stories.tsx":ZD,"../../packages/design-system/src/Quote/Quote.stories.tsx":rO,"../../packages/design-system/src/Radio/Radio.stories.tsx":sO,"../../packages/design-system/src/Select/Select.stories.tsx":vO,"../../packages/design-system/src/Sidebar/Sidebar/Sidebar.stories.tsx":jO,"../../packages/design-system/src/Sidebar/SidebarItem/SidebarItem.stories.tsx":UO,"../../packages/design-system/src/Skeleton/Skeleton.stories.tsx":XO,"../../packages/design-system/src/Switch/Switch.stories.tsx":uk,"../../packages/design-system/src/Table/Table/Table.stories.tsx":wk,"../../packages/design-system/src/Table/TableBody/TableBody.stories.tsx":Pk,"../../packages/design-system/src/Table/TableCell/TableCell.stories.tsx":Rk,"../../packages/design-system/src/Table/TableContainer/TableContainer.stories.tsx":Uk,"../../packages/design-system/src/Table/TableControl/TableControl.stories.tsx":qk,"../../packages/design-system/src/Table/TableFooter/TableFooter.stories.tsx":tA,"../../packages/design-system/src/Table/TableHead/TableHead.stories.tsx":aA,"../../packages/design-system/src/Table/TablePagination/TablePagination.stories.tsx":lA,"../../packages/design-system/src/Table/TablePaginationActions/TablePaginationActions.stories.tsx":bA,"../../packages/design-system/src/Table/TableRow/TableRow.stories.tsx":TA,"../../packages/design-system/src/Table/TableSortLabel/TableSortLabel.stories.tsx":AA,"../../packages/design-system/src/TextInput/TextInput.stories.tsx":IA,"../../packages/design-system/src/ToggleButton/ToggleButton/ToggleButton.stories.tsx":qA,"../../packages/design-system/src/ToggleButton/ToggleButtonGroup/ToggleButtonGroup.stories.tsx":QA,"../../packages/design-system/src/Typography/Typography.stories.tsx":cj,"../../packages/design-system/src/View/View.stories.tsx":bj,"../../packages/design-system/src/theme/Customization.stories.tsx":Tj}),AM=Object.assign({"../../packages/design-system/src/AppBar/AppBar.stories.tsx":kj,"../../packages/design-system/src/Avatar/Avatar.stories.tsx":Aj,"../../packages/design-system/src/Backdrop/Backdrop.stories.tsx":jj,"../../packages/design-system/src/Button/Button.stories.tsx":Mj,"../../packages/design-system/src/ButtonGroup/ButtonGroup.stories.tsx":Nj,"../../packages/design-system/src/Card/Card.stories.tsx":Pj,"../../packages/design-system/src/Checkbox/Checkbox.stories.tsx":Fj,"../../packages/design-system/src/CircularProgress/CircularProgress.stories.tsx":Ij,"../../packages/design-system/src/Drawer/Drawer.stories.tsx":Lj,"../../packages/design-system/src/Flex/Flex.stories.tsx":Rj,"../../packages/design-system/src/FocusTrap/FocusTrap.stories.tsx":zj,"../../packages/design-system/src/Form/Form.stories.tsx":Bj,"../../packages/design-system/src/FormControl/FormControl.stories.tsx":Vj,"../../packages/design-system/src/FormHelperText/FormHelperText.stories.tsx":Hj,"../../packages/design-system/src/FormLabel/FormLabel.stories.tsx":Uj,"../../packages/design-system/src/Grid/Grid.stories.tsx":Wj,"../../packages/design-system/src/Icon/Icon.stories.tsx":Gj,"../../packages/design-system/src/Image/Image.stories.tsx":Kj,"../../packages/design-system/src/LinearProgress/LinearProgress.stories.tsx":qj,"../../packages/design-system/src/Link/Link.stories.tsx":Jj,"../../packages/design-system/src/MenuItem/MenuItem.stories.tsx":Yj,"../../packages/design-system/src/Modal/Modal.stories.tsx":Xj,"../../packages/design-system/src/NativeSelect/NativeSelect.stories.tsx":Zj,"../../packages/design-system/src/Pagination/Pagination.stories.tsx":Qj,"../../packages/design-system/src/Pagination/PaginationItem/PaginationItem.stories.tsx":$j,"../../packages/design-system/src/Paper/Paper.stories.tsx":eM,"../../packages/design-system/src/Popover/Popover.stories.tsx":tM,"../../packages/design-system/src/Portal/Portal.stories.tsx":nM,"../../packages/design-system/src/Pressable/Pressable.stories.tsx":rM,"../../packages/design-system/src/Quote/Quote.stories.tsx":iM,"../../packages/design-system/src/Radio/Radio.stories.tsx":aM,"../../packages/design-system/src/Select/Select.stories.tsx":oM,"../../packages/design-system/src/Sidebar/Sidebar/Sidebar.stories.tsx":sM,"../../packages/design-system/src/Sidebar/SidebarItem/SidebarItem.stories.tsx":cM,"../../packages/design-system/src/Skeleton/Skeleton.stories.tsx":lM,"../../packages/design-system/src/Switch/Switch.stories.tsx":uM,"../../packages/design-system/src/Table/Table/Table.stories.tsx":dM,"../../packages/design-system/src/Table/TableBody/TableBody.stories.tsx":fM,"../../packages/design-system/src/Table/TableCell/TableCell.stories.tsx":pM,"../../packages/design-system/src/Table/TableContainer/TableContainer.stories.tsx":mM,"../../packages/design-system/src/Table/TableControl/TableControl.stories.tsx":hM,"../../packages/design-system/src/Table/TableFooter/TableFooter.stories.tsx":gM,"../../packages/design-system/src/Table/TableHead/TableHead.stories.tsx":_M,"../../packages/design-system/src/Table/TablePagination/TablePagination.stories.tsx":vM,"../../packages/design-system/src/Table/TablePaginationActions/TablePaginationActions.stories.tsx":yM,"../../packages/design-system/src/Table/TableRow/TableRow.stories.tsx":bM,"../../packages/design-system/src/Table/TableSortLabel/TableSortLabel.stories.tsx":xM,"../../packages/design-system/src/TextInput/TextInput.stories.tsx":SM,"../../packages/design-system/src/ToggleButton/ToggleButton/ToggleButton.stories.tsx":CM,"../../packages/design-system/src/ToggleButton/ToggleButtonGroup/ToggleButtonGroup.stories.tsx":wM,"../../packages/design-system/src/Typography/Typography.stories.tsx":TM,"../../packages/design-system/src/View/View.stories.tsx":EM,"../../packages/design-system/src/theme/Customization.stories.tsx":DM}),jM=(e,t)=>e[t]?.name??t.replaceAll(/([a-z0-9])([A-Z])/g,`$1 $2`),MM=new Map;for(let[e,t]of Object.entries(kM)){let n=e.split(`/`).pop().replace(`.stories.tsx`,``),r=AM[e];MM.set(n,OM(r).map(e=>({path:`${n}/${e}`,title:jM(t,e),stories:t,source:r,storyName:e})))}var NM=e=>MM.get(e)??[],PM=new Map([...MM.values()].flat().map(e=>[e.path,e])),FM={"@soroush.tech/design-system":`^${oe.version}`},IM=oe.peerDependencies.react,LM=()=>ye(()=>import(`../chunks/chunk-DrZSmk0t.js`).then(e=>e.demoScope),__vite__mapDeps([11,1,2,3,4,5,6,7,8,12,13]));function RM({of:e,title:t,description:n}){let r=PM.get(e);if(!r)throw Error(`Unknown demo "${e}" - no such story in the design system`);return(0,Q.jsx)(BS,{stories:r.stories,source:r.source,storyName:r.storyName,title:t??r.title,description:n,scope:LM,versions:FM,reactVersion:IM})}function zM({of:e}){let t=NM(e);if(t.length===0)throw Error(`No stories for component "${e}" - add ${e}.stories.tsx beside it`);return t.map(e=>(0,Q.jsx)(RM,{of:e.path},e.path))}function BM(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||HM(`Readme`,!0),r||HM(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`AppBar`}),`
`,(0,Q.jsx)(n,{of:`AppBar`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`AppBar`})]})}function VM(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(BM,{...e})}):BM(e)}function HM(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function UM(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||GM(`Readme`,!0),r||GM(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Avatar`}),`
`,(0,Q.jsx)(n,{of:`Avatar`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Avatar`})]})}function WM(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(UM,{...e})}):UM(e)}function GM(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function KM(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||JM(`Readme`,!0),r||JM(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Backdrop`}),`
`,(0,Q.jsx)(n,{of:`Backdrop`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Backdrop`})]})}function qM(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(KM,{...e})}):KM(e)}function JM(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function YM(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||ZM(`Readme`,!0),r||ZM(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Button`}),`
`,(0,Q.jsx)(n,{of:`Button`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Button`})]})}function XM(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(YM,{...e})}):YM(e)}function ZM(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function QM(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||eN(`Readme`,!0),r||eN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`ButtonGroup`}),`
`,(0,Q.jsx)(n,{of:`ButtonGroup`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`ButtonGroup`})]})}function $M(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(QM,{...e})}):QM(e)}function eN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function tN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||rN(`Readme`,!0),r||rN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Card`}),`
`,(0,Q.jsx)(n,{of:`Card`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Card`})]})}function nN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(tN,{...e})}):tN(e)}function rN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function iN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||oN(`Readme`,!0),r||oN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Checkbox`}),`
`,(0,Q.jsx)(n,{of:`Checkbox`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Checkbox`})]})}function aN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(iN,{...e})}):iN(e)}function oN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function sN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||lN(`Readme`,!0),r||lN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`CircularProgress`}),`
`,(0,Q.jsx)(n,{of:`CircularProgress`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`CircularProgress`})]})}function cN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(sN,{...e})}):sN(e)}function lN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function uN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||fN(`Readme`,!0),r||fN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Drawer`}),`
`,(0,Q.jsx)(n,{of:`Drawer`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Drawer`})]})}function dN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(uN,{...e})}):uN(e)}function fN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function pN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||hN(`Readme`,!0),r||hN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Flex`}),`
`,(0,Q.jsx)(n,{of:`Flex`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Flex`})]})}function mN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(pN,{...e})}):pN(e)}function hN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function gN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||vN(`Readme`,!0),r||vN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`FocusTrap`}),`
`,(0,Q.jsx)(n,{of:`FocusTrap`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`FocusTrap`})]})}function _N(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(gN,{...e})}):gN(e)}function vN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function yN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||xN(`Readme`,!0),r||xN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Form`}),`
`,(0,Q.jsx)(n,{of:`Form`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Form`})]})}function bN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(yN,{...e})}):yN(e)}function xN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function SN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||wN(`Readme`,!0),r||wN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`FormControl`}),`
`,(0,Q.jsx)(n,{of:`FormControl`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`FormControl`})]})}function CN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(SN,{...e})}):SN(e)}function wN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function TN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||DN(`Readme`,!0),r||DN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`FormHelperText`}),`
`,(0,Q.jsx)(n,{of:`FormHelperText`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`FormHelperText`})]})}function EN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(TN,{...e})}):TN(e)}function DN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function ON(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||AN(`Readme`,!0),r||AN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`FormLabel`}),`
`,(0,Q.jsx)(n,{of:`FormLabel`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`FormLabel`})]})}function kN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(ON,{...e})}):ON(e)}function AN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function jN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||NN(`Readme`,!0),r||NN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Grid`}),`
`,(0,Q.jsx)(n,{of:`Grid`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Grid`})]})}function MN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(jN,{...e})}):jN(e)}function NN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function PN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||IN(`Readme`,!0),r||IN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Icon`}),`
`,(0,Q.jsx)(n,{of:`Icon`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Icon`})]})}function FN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(PN,{...e})}):PN(e)}function IN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function LN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||zN(`Readme`,!0),r||zN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Image`}),`
`,(0,Q.jsx)(n,{of:`Image`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Image`})]})}function RN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(LN,{...e})}):LN(e)}function zN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function BN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||HN(`Readme`,!0),r||HN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`LinearProgress`}),`
`,(0,Q.jsx)(n,{of:`LinearProgress`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`LinearProgress`})]})}function VN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(BN,{...e})}):BN(e)}function HN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function UN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||GN(`Readme`,!0),r||GN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Link`}),`
`,(0,Q.jsx)(n,{of:`Link`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Link`})]})}function WN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(UN,{...e})}):UN(e)}function GN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function KN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||JN(`Readme`,!0),r||JN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`MenuItem`}),`
`,(0,Q.jsx)(n,{of:`MenuItem`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`MenuItem`})]})}function qN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(KN,{...e})}):KN(e)}function JN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function YN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||ZN(`Readme`,!0),r||ZN(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Modal`}),`
`,(0,Q.jsx)(n,{of:`Modal`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Modal`})]})}function XN(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(YN,{...e})}):YN(e)}function ZN(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function QN(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||eP(`Readme`,!0),r||eP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`NativeSelect`}),`
`,(0,Q.jsx)(n,{of:`NativeSelect`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`NativeSelect`})]})}function $N(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(QN,{...e})}):QN(e)}function eP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function tP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||rP(`Readme`,!0),r||rP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Pagination`}),`
`,(0,Q.jsx)(n,{of:`Pagination`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Pagination`})]})}function nP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(tP,{...e})}):tP(e)}function rP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function iP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||oP(`Readme`,!0),r||oP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Paper`}),`
`,(0,Q.jsx)(n,{of:`Paper`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Paper`})]})}function aP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(iP,{...e})}):iP(e)}function oP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function sP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||lP(`Readme`,!0),r||lP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Popover`}),`
`,(0,Q.jsx)(n,{of:`Popover`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Popover`})]})}function cP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(sP,{...e})}):sP(e)}function lP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function uP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||fP(`Readme`,!0),r||fP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Portal`}),`
`,(0,Q.jsx)(n,{of:`Portal`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Portal`})]})}function dP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(uP,{...e})}):uP(e)}function fP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function pP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||hP(`Readme`,!0),r||hP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Pressable`}),`
`,(0,Q.jsx)(n,{of:`Pressable`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Pressable`})]})}function mP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(pP,{...e})}):pP(e)}function hP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function gP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||vP(`Readme`,!0),r||vP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Quote`}),`
`,(0,Q.jsx)(n,{of:`Quote`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Quote`})]})}function _P(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(gP,{...e})}):gP(e)}function vP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function yP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||xP(`Readme`,!0),r||xP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Radio`}),`
`,(0,Q.jsx)(n,{of:`Radio`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Radio`})]})}function bP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(yP,{...e})}):yP(e)}function xP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function SP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||wP(`Readme`,!0),r||wP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Select`}),`
`,(0,Q.jsx)(n,{of:`Select`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Select`})]})}function CP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(SP,{...e})}):SP(e)}function wP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function TP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||DP(`Readme`,!0),r||DP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Skeleton`}),`
`,(0,Q.jsx)(n,{of:`Skeleton`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Skeleton`})]})}function EP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(TP,{...e})}):TP(e)}function DP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function OP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||AP(`Readme`,!0),r||AP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Switch`}),`
`,(0,Q.jsx)(n,{of:`Switch`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Switch`})]})}function kP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(OP,{...e})}):OP(e)}function AP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function jP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||NP(`Readme`,!0),r||NP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`TextInput`}),`
`,(0,Q.jsx)(n,{of:`TextInput`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`TextInput`})]})}function MP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(jP,{...e})}):jP(e)}function NP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function PP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||IP(`Readme`,!0),r||IP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Typography`}),`
`,(0,Q.jsx)(n,{of:`Typography`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Typography`})]})}function FP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(PP,{...e})}):PP(e)}function IP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function LP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||zP(`Readme`,!0),r||zP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`View`}),`
`,(0,Q.jsx)(n,{of:`View`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`View`})]})}function RP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(LP,{...e})}):LP(e)}function zP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function BP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||HP(`Readme`,!0),r||HP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Sidebar`}),`
`,(0,Q.jsx)(n,{of:`Sidebar`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Sidebar`})]})}function VP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(BP,{...e})}):BP(e)}function HP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function UP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||GP(`Readme`,!0),r||GP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`Table`}),`
`,(0,Q.jsx)(n,{of:`Table`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`Table`})]})}function WP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(UP,{...e})}):UP(e)}function GP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function KP(e){let t={h1:`h1`,h2:`h2`,...N(),...e.components},{Readme:n,StoryDemos:r}=t;return n||JP(`Readme`,!0),r||JP(`StoryDemos`,!0),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.h1,{children:`ToggleButton`}),`
`,(0,Q.jsx)(n,{of:`ToggleButton`,part:`intro`}),`
`,(0,Q.jsx)(t.h2,{children:`Examples`}),`
`,(0,Q.jsx)(r,{of:`ToggleButton`})]})}function qP(e={}){let{wrapper:t}={...N(),...e.components};return t?(0,Q.jsx)(t,{...e,children:(0,Q.jsx)(KP,{...e})}):KP(e)}function JP(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var YP=Object.assign({"../../packages/design-system/src/AppBar/AppBar.mdx":VM,"../../packages/design-system/src/Avatar/Avatar.mdx":WM,"../../packages/design-system/src/Backdrop/Backdrop.mdx":qM,"../../packages/design-system/src/Button/Button.mdx":XM,"../../packages/design-system/src/ButtonGroup/ButtonGroup.mdx":$M,"../../packages/design-system/src/Card/Card.mdx":nN,"../../packages/design-system/src/Checkbox/Checkbox.mdx":aN,"../../packages/design-system/src/CircularProgress/CircularProgress.mdx":cN,"../../packages/design-system/src/Drawer/Drawer.mdx":dN,"../../packages/design-system/src/Flex/Flex.mdx":mN,"../../packages/design-system/src/FocusTrap/FocusTrap.mdx":_N,"../../packages/design-system/src/Form/Form.mdx":bN,"../../packages/design-system/src/FormControl/FormControl.mdx":CN,"../../packages/design-system/src/FormHelperText/FormHelperText.mdx":EN,"../../packages/design-system/src/FormLabel/FormLabel.mdx":kN,"../../packages/design-system/src/Grid/Grid.mdx":MN,"../../packages/design-system/src/Icon/Icon.mdx":FN,"../../packages/design-system/src/Image/Image.mdx":RN,"../../packages/design-system/src/LinearProgress/LinearProgress.mdx":VN,"../../packages/design-system/src/Link/Link.mdx":WN,"../../packages/design-system/src/MenuItem/MenuItem.mdx":qN,"../../packages/design-system/src/Modal/Modal.mdx":XN,"../../packages/design-system/src/NativeSelect/NativeSelect.mdx":$N,"../../packages/design-system/src/Pagination/Pagination.mdx":nP,"../../packages/design-system/src/Paper/Paper.mdx":aP,"../../packages/design-system/src/Popover/Popover.mdx":cP,"../../packages/design-system/src/Portal/Portal.mdx":dP,"../../packages/design-system/src/Pressable/Pressable.mdx":mP,"../../packages/design-system/src/Quote/Quote.mdx":_P,"../../packages/design-system/src/Radio/Radio.mdx":bP,"../../packages/design-system/src/Select/Select.mdx":CP,"../../packages/design-system/src/Skeleton/Skeleton.mdx":EP,"../../packages/design-system/src/Switch/Switch.mdx":kP,"../../packages/design-system/src/TextInput/TextInput.mdx":MP,"../../packages/design-system/src/Typography/Typography.mdx":FP,"../../packages/design-system/src/View/View.mdx":RP}),XP=Object.assign({"../../packages/design-system/src/Sidebar/Sidebar/Sidebar.mdx":VP,"../../packages/design-system/src/Table/Table/Table.mdx":WP,"../../packages/design-system/src/ToggleButton/ToggleButton/ToggleButton.mdx":qP}),ZP=new Map(Object.entries({...YP,...XP}).map(([e,t])=>[p(e.split(`/`).pop().replace(/\.mdx$/,``)),t])),QP=e=>{let t=ZP.get(e);if(!t)throw Error(`No MDX page for component slug "${e}" - add <Name>.mdx beside its README`);return t},$P=t({default:()=>tF}),eF={StoryDemo:RM,StoryDemos:zM};function tF(){let{routeParams:e}=be(),t=e.name,n=s.get(t);return(0,Q.jsxs)(re,{sidebar:(0,Q.jsx)(R,{}),children:[(0,Q.jsx)(o,{components:eF,children:(0,q.createElement)(QP(t))}),(0,Q.jsx)(I,{variant:`body1`,mt:4,children:(0,Q.jsxs)(ae,{href:g(`design-system`,`/api/${t}/`),color:`primary`,children:[n?.name??`Component`,` API reference`]})})]})}var nF=t({default:()=>rF}),rF=e=>s.get(e.routeParams.name)?.name??`Component`,iF={hasServerOnlyHook:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},isClientRuntimeLoaded:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:!0}},onBeforeRenderEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},dataEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:{server:!0}}},guardEnv:{type:`computed`,definedAtData:null,valueSerialized:{type:`js-serialized`,value:null}},onRenderClient:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+onRenderClient.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:ue}},Page:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/components/@name/+Page.tsx`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:$P}},hydrationCanBeAborted:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/renderer/+config.ts`,fileExportPathToShowToUser:[`default`,`hydrationCanBeAborted`]},valueSerialized:{type:`js-serialized`,value:!0}},title:{type:`standard`,definedAtData:{filePathToShowToUser:`/src/pages/design-system/components/@name/+title.ts`,fileExportPathToShowToUser:[]},valueSerialized:{type:`plus-file`,exportValues:nF}},Loading:{type:`standard`,definedAtData:{filePathToShowToUser:`vike-react/__internal/integration/Loading`,fileExportPathToShowToUser:[]},valueSerialized:{type:`pointer-import`,value:le}}};export{iF as configValuesSerialized};