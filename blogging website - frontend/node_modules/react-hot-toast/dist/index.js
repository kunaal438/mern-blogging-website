"use client";
"use strict";var Y=Object.create;var E=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var G=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty;var ee=(e,t)=>{for(var o in t)E(e,o,{get:t[o],enumerable:!0})},j=(e,t,o,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of G(t))!Z.call(e,r)&&r!==o&&E(e,r,{get:()=>t[r],enumerable:!(s=q(t,r))||s.enumerable});return e};var W=(e,t,o)=>(o=e!=null?Y(K(e)):{},j(t||!e||!e.__esModule?E(o,"default",{value:e,enumerable:!0}):o,e)),te=e=>j(E({},"__esModule",{value:!0}),e);var Ve={};ee(Ve,{CheckmarkIcon:()=>F,ErrorIcon:()=>w,LoaderIcon:()=>M,ToastBar:()=>$,ToastIcon:()=>U,Toaster:()=>J,default:()=>_e,resolveValue:()=>u,toast:()=>n,useToaster:()=>V,useToasterStore:()=>_});module.exports=te(Ve);var oe=e=>typeof e=="function",u=(e,t)=>oe(e)?e(t):e;var Q=(()=>{let e=0;return()=>(++e).toString()})(),R=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();var k=require("react"),re=20;var v=new Map,se=1e3,X=e=>{if(v.has(e))return;let t=setTimeout(()=>{v.delete(e),l({type:4,toastId:e})},se);v.set(e,t)},ae=e=>{let t=v.get(e);t&&clearTimeout(t)},H=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,re)};case 1:return t.toast.id&&ae(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:o}=t;return e.toasts.find(a=>a.id===o.id)?H(e,{type:1,toast:o}):H(e,{type:0,toast:o});case 3:let{toastId:s}=t;return s?X(s):e.toasts.forEach(a=>{X(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===s||s===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+r}))}}},I=[],D={toasts:[],pausedAt:void 0},l=e=>{D=H(D,e),I.forEach(t=>{t(D)})},ie={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=(e={})=>{let[t,o]=(0,k.useState)(D);(0,k.useEffect)(()=>(I.push(o),()=>{let r=I.indexOf(o);r>-1&&I.splice(r,1)}),[t]);let s=t.toasts.map(r=>{var a,c;return{...e,...e[r.type],...r,duration:r.duration||((a=e[r.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||ie[r.type],style:{...e.style,...(c=e[r.type])==null?void 0:c.style,...r.style}}});return{...t,toasts:s}};var ce=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(o==null?void 0:o.id)||Q()}),S=e=>(t,o)=>{let s=ce(t,e,o);return l({type:2,toast:s}),s.id},n=(e,t)=>S("blank")(e,t);n.error=S("error");n.success=S("success");n.loading=S("loading");n.custom=S("custom");n.dismiss=e=>{l({type:3,toastId:e})};n.remove=e=>l({type:4,toastId:e});n.promise=(e,t,o)=>{let s=n.loading(t.loading,{...o,...o==null?void 0:o.loading});return e.then(r=>(n.success(u(t.success,r),{id:s,...o,...o==null?void 0:o.success}),r)).catch(r=>{n.error(u(t.error,r),{id:s,...o,...o==null?void 0:o.error})}),e};var A=require("react");var pe=(e,t)=>{l({type:1,toast:{id:e,height:t}})},de=()=>{l({type:5,time:Date.now()})},V=e=>{let{toasts:t,pausedAt:o}=_(e);(0,A.useEffect)(()=>{if(o)return;let a=Date.now(),c=t.map(i=>{if(i.duration===1/0)return;let d=(i.duration||0)+i.pauseDuration-(a-i.createdAt);if(d<0){i.visible&&n.dismiss(i.id);return}return setTimeout(()=>n.dismiss(i.id),d)});return()=>{c.forEach(i=>i&&clearTimeout(i))}},[t,o]);let s=(0,A.useCallback)(()=>{o&&l({type:6,time:Date.now()})},[o]),r=(0,A.useCallback)((a,c)=>{let{reverseOrder:i=!1,gutter:d=8,defaultPosition:p}=c||{},g=t.filter(m=>(m.position||p)===(a.position||p)&&m.height),z=g.findIndex(m=>m.id===a.id),O=g.filter((m,B)=>B<z&&m.visible).length;return g.filter(m=>m.visible).slice(...i?[O+1]:[0,O]).reduce((m,B)=>m+(B.height||0)+d,0)},[t]);return{toasts:t,handlers:{updateHeight:pe,startPause:de,endPause:s,calculateOffset:r}}};var T=W(require("react")),b=require("goober");var y=W(require("react")),x=require("goober");var h=require("goober"),me=h.keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ue=h.keyframes`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,le=h.keyframes`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,w=(0,h.styled)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${me} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ue} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${le} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;var C=require("goober"),Te=C.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=(0,C.styled)("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Te} 1s linear infinite;
`;var P=require("goober"),fe=P.keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ye=P.keyframes`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,F=(0,P.styled)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ye} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;var ge=(0,x.styled)("div")`
  position: absolute;
`,he=(0,x.styled)("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,xe=x.keyframes`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,be=(0,x.styled)("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${xe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:t,type:o,iconTheme:s}=e;return t!==void 0?typeof t=="string"?y.createElement(be,null,t):t:o==="blank"?null:y.createElement(he,null,y.createElement(M,{...s}),o!=="loading"&&y.createElement(ge,null,o==="error"?y.createElement(w,{...s}):y.createElement(F,{...s})))};var Se=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ae=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Pe="0%{opacity:0;} 100%{opacity:1;}",Oe="0%{opacity:1;} 100%{opacity:0;}",Ee=(0,b.styled)("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Re=(0,b.styled)("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ve=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=R()?[Pe,Oe]:[Se(s),Ae(s)];return{animation:t?`${(0,b.keyframes)(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${(0,b.keyframes)(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},$=T.memo(({toast:e,position:t,style:o,children:s})=>{let r=e.height?ve(e.position||t||"top-center",e.visible):{opacity:0},a=T.createElement(U,{toast:e}),c=T.createElement(Re,{...e.ariaProps},u(e.message,e));return T.createElement(Ee,{className:e.className,style:{...r,...o,...e.style}},typeof s=="function"?s({icon:a,message:c}):T.createElement(T.Fragment,null,a,c))});var N=require("goober"),f=W(require("react"));(0,N.setup)(f.createElement);var Ie=({id:e,className:t,style:o,onHeightUpdate:s,children:r})=>{let a=f.useCallback(c=>{if(c){let i=()=>{let d=c.getBoundingClientRect().height;s(e,d)};i(),new MutationObserver(i).observe(c,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return f.createElement("div",{ref:a,className:t,style:o},r)},De=(e,t)=>{let o=e.includes("top"),s=o?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:R()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...s,...r}},ke=N.css`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,L=16,J=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:s,children:r,containerStyle:a,containerClassName:c})=>{let{toasts:i,handlers:d}=V(o);return f.createElement("div",{style:{position:"fixed",zIndex:9999,top:L,left:L,right:L,bottom:L,pointerEvents:"none",...a},className:c,onMouseEnter:d.startPause,onMouseLeave:d.endPause},i.map(p=>{let g=p.position||t,z=d.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),O=De(g,z);return f.createElement(Ie,{id:p.id,key:p.id,onHeightUpdate:d.updateHeight,className:p.visible?ke:"",style:O},p.type==="custom"?u(p.message,p):r?r(p):f.createElement($,{toast:p,position:g}))}))};var _e=n;0&&(module.exports={CheckmarkIcon,ErrorIcon,LoaderIcon,ToastBar,ToastIcon,Toaster,resolveValue,toast,useToaster,useToasterStore});
//# sourceMappingURL=index.js.map