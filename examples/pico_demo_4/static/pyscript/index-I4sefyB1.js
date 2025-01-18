import{codePointSize as t,codePointAt as e,EditorSelection as i,CharCategory as n,Prec as o,Facet as s,combineConfig as l,StateField as r,StateEffect as a,MapMode as c,RangeValue as h,RangeSet as p,fromCodePoint as f,Annotation as d,Text as u,Transaction as m}from"./codemirror_state-B_EsJ6is.js";import{E as g,k as v,D as b,s as w,g as y,V as x,l as C,a as I,W as O}from"./codemirror_view-xQ5tHbp7.js";import{s as k,i as D}from"./codemirror_language-Cuqp-gGG.js";class T{constructor(t,e,i,n){this.state=t,this.pos=e,this.explicit=i,this.view=n,this.abortListeners=[],this.abortOnDocChange=!1}tokenBefore(t){let e=k(this.state).resolveInner(this.pos,-1);for(;e&&t.indexOf(e.name)<0;)e=e.parent;return e?{from:e.from,to:this.pos,text:this.state.sliceDoc(e.from,this.pos),type:e.type}:null}matchBefore(t){let e=this.state.doc.lineAt(this.pos),i=Math.max(e.from,this.pos-250),n=e.text.slice(i-e.from,this.pos-e.from),o=n.search(P(t,!1));return o<0?null:{from:i+o,to:this.pos,text:n.slice(o)}}get aborted(){return null==this.abortListeners}addEventListener(t,e,i){"abort"==t&&this.abortListeners&&(this.abortListeners.push(e),i&&i.onDocChange&&(this.abortOnDocChange=!0))}}function S(t){let e=Object.keys(t).join(""),i=/\w/.test(e);return i&&(e=e.replace(/\w/g,"")),`[${i?"\\w":""}${e.replace(/[^\w\s]/g,"\\$&")}]`}function A(t){let e=t.map((t=>"string"==typeof t?{label:t}:t)),[i,n]=e.every((t=>/^\w+$/.test(t.label)))?[/\w*$/,/\w+$/]:function(t){let e=Object.create(null),i=Object.create(null);for(let{label:n}of t){e[n[0]]=!0;for(let t=1;t<n.length;t++)i[n[t]]=!0}let n=S(e)+S(i)+"*$";return[new RegExp("^"+n),new RegExp(n)]}(e);return t=>{let o=t.matchBefore(n);return o||t.explicit?{from:o?o.from:t.pos,options:e,validFor:i}:null}}function L(t,e){return i=>{for(let e=k(i.state).resolveInner(i.pos,-1);e;e=e.parent){if(t.indexOf(e.name)>-1)return null;if(e.type.isTop)break}return e(i)}}class R{constructor(t,e,i,n){this.completion=t,this.source=e,this.match=i,this.score=n}}function E(t){return t.selection.main.from}function P(t,e){var i;let{source:n}=t,o=e&&"^"!=n[0],s="$"!=n[n.length-1];return o||s?new RegExp(`${o?"^":""}(?:${n})${s?"$":""}`,null!==(i=t.flags)&&void 0!==i?i:t.ignoreCase?"i":""):t}const M=d.define();const B=new WeakMap;function F(t){if(!Array.isArray(t))return t;let e=B.get(t);return e||B.set(t,e=A(t)),e}const j=a.define(),$=a.define();class N{constructor(i){this.pattern=i,this.chars=[],this.folded=[],this.any=[],this.precise=[],this.byWord=[],this.score=0,this.matched=[];for(let n=0;n<i.length;){let o=e(i,n),s=t(o);this.chars.push(o);let l=i.slice(n,n+s),r=l.toUpperCase();this.folded.push(e(r==l?l.toLowerCase():r,0)),n+=s}this.astral=i.length!=this.chars.length}ret(t,e){return this.score=t,this.matched=e,this}match(i){if(0==this.pattern.length)return this.ret(-100,[]);if(i.length<this.pattern.length)return null;let{chars:n,folded:o,any:s,precise:l,byWord:r}=this;if(1==n.length){let s=e(i,0),l=t(s),r=l==i.length?0:-100;if(s==n[0]);else{if(s!=o[0])return null;r+=-200}return this.ret(r,[0,l])}let a=i.indexOf(this.pattern);if(0==a)return this.ret(i.length==this.pattern.length?0:-100,[0,this.pattern.length]);let c=n.length,h=0;if(a<0){for(let l=0,r=Math.min(i.length,200);l<r&&h<c;){let r=e(i,l);r!=n[h]&&r!=o[h]||(s[h++]=l),l+=t(r)}if(h<c)return null}let p=0,d=0,u=!1,m=0,g=-1,v=-1,b=/[a-z]/.test(i),w=!0;for(let s=0,h=Math.min(i.length,200),y=0;s<h&&d<c;){let h=e(i,s);a<0&&(p<c&&h==n[p]&&(l[p++]=s),m<c&&(h==n[m]||h==o[m]?(0==m&&(g=s),v=s+1,m++):m=0));let x,C=h<255?h>=48&&h<=57||h>=97&&h<=122?2:h>=65&&h<=90?1:0:(x=f(h))!=x.toLowerCase()?1:x!=x.toUpperCase()?2:0;(!s||1==C&&b||0==y&&0!=C)&&(n[d]==h||o[d]==h&&(u=!0)?r[d++]=s:r.length&&(w=!1)),y=C,s+=t(h)}return d==c&&0==r[0]&&w?this.result((u?-200:0)-100,r,i):m==c&&0==g?this.ret(-200-i.length+(v==i.length?0:-100),[0,v]):a>-1?this.ret(-700-i.length,[a,a+this.pattern.length]):m==c?this.ret(-900-i.length,[g,v]):d==c?this.result((u?-200:0)-100-700+(w?0:-1100),r,i):2==n.length?null:this.result((s[0]?-700:0)-200-1100,s,i)}result(i,n,o){let s=[],l=0;for(let i of n){let n=i+(this.astral?t(e(o,i)):1);l&&s[l-1]==i?s[l-1]=n:(s[l++]=i,s[l++]=n)}return this.ret(i-o.length,s)}}class U{constructor(t){this.pattern=t,this.matched=[],this.score=0,this.folded=t.toLowerCase()}match(t){if(t.length<this.pattern.length)return null;let e=t.slice(0,this.pattern.length),i=e==this.pattern?0:e.toLowerCase()==this.folded?-200:null;return null==i?null:(this.matched=[0,e.length],this.score=i+(t.length==this.pattern.length?0:-100),this)}}const W=s.define({combine:t=>l(t,{activateOnTyping:!0,activateOnCompletion:()=>!1,activateOnTypingDelay:100,selectOnOpen:!0,override:null,closeOnBlur:!0,maxRenderedOptions:100,defaultKeymap:!0,tooltipClass:()=>"",optionClass:()=>"",aboveCursor:!1,icons:!0,addToOptions:[],positionInfo:H,filterStrict:!1,compareCompletions:(t,e)=>t.label.localeCompare(e.label),interactionDelay:75,updateSyncTime:100},{defaultKeymap:(t,e)=>t&&e,closeOnBlur:(t,e)=>t&&e,icons:(t,e)=>t&&e,tooltipClass:(t,e)=>i=>q(t(i),e(i)),optionClass:(t,e)=>i=>q(t(i),e(i)),addToOptions:(t,e)=>t.concat(e),filterStrict:(t,e)=>t||e})});function q(t,e){return t?e?t+" "+e:t:e}function H(t,e,i,n,o,s){let l,r,a=t.textDirection==b.RTL,c=a,h=!1,p="top",f=e.left-o.left,d=o.right-e.right,u=n.right-n.left,m=n.bottom-n.top;if(c&&f<Math.min(u,d)?c=!1:!c&&d<Math.min(u,f)&&(c=!0),u<=(c?f:d))l=Math.max(o.top,Math.min(i.top,o.bottom-m))-e.top,r=Math.min(400,c?f:d);else{h=!0,r=Math.min(400,(a?e.right:o.right-e.left)-30);let t=o.bottom-e.bottom;t>=m||t>e.top?l=i.bottom-e.top:(p="bottom",l=e.bottom-i.top)}return{style:`${p}: ${l/((e.bottom-e.top)/s.offsetHeight)}px; max-width: ${r/((e.right-e.left)/s.offsetWidth)}px`,class:"cm-completionInfo-"+(h?a?"left-narrow":"right-narrow":c?"left":"right")}}function V(t,e,i){if(t<=i)return{from:0,to:t};if(e<0&&(e=0),e<=t>>1){let t=Math.floor(e/i);return{from:t*i,to:(t+1)*i}}let n=Math.floor((t-e)/i);return{from:t-(n+1)*i,to:t-n*i}}class z{constructor(t,e,i){this.view=t,this.stateField=e,this.applyCompletion=i,this.info=null,this.infoDestroy=null,this.placeInfoReq={read:()=>this.measureInfo(),write:t=>this.placeInfo(t),key:this},this.space=null,this.currentClass="";let n=t.state.field(e),{options:o,selected:s}=n.open,l=t.state.facet(W);this.optionContent=function(t){let e=t.addToOptions.slice();return t.icons&&e.push({render(t){let e=document.createElement("div");return e.classList.add("cm-completionIcon"),t.type&&e.classList.add(...t.type.split(/\s+/g).map((t=>"cm-completionIcon-"+t))),e.setAttribute("aria-hidden","true"),e},position:20}),e.push({render(t,e,i,n){let o=document.createElement("span");o.className="cm-completionLabel";let s=t.displayLabel||t.label,l=0;for(let t=0;t<n.length;){let e=n[t++],i=n[t++];e>l&&o.appendChild(document.createTextNode(s.slice(l,e)));let r=o.appendChild(document.createElement("span"));r.appendChild(document.createTextNode(s.slice(e,i))),r.className="cm-completionMatchedText",l=i}return l<s.length&&o.appendChild(document.createTextNode(s.slice(l))),o},position:50},{render(t){if(!t.detail)return null;let e=document.createElement("span");return e.className="cm-completionDetail",e.textContent=t.detail,e},position:80}),e.sort(((t,e)=>t.position-e.position)).map((t=>t.render))}(l),this.optionClass=l.optionClass,this.tooltipClass=l.tooltipClass,this.range=V(o.length,s,l.maxRenderedOptions),this.dom=document.createElement("div"),this.dom.className="cm-tooltip-autocomplete",this.updateTooltipClass(t.state),this.dom.addEventListener("mousedown",(i=>{let{options:n}=t.state.field(e).open;for(let e,o=i.target;o&&o!=this.dom;o=o.parentNode)if("LI"==o.nodeName&&(e=/-(\d+)$/.exec(o.id))&&+e[1]<n.length)return this.applyCompletion(t,n[+e[1]]),void i.preventDefault()})),this.dom.addEventListener("focusout",(e=>{let i=t.state.field(this.stateField,!1);i&&i.tooltip&&t.state.facet(W).closeOnBlur&&e.relatedTarget!=t.contentDOM&&t.dispatch({effects:$.of(null)})})),this.showOptions(o,n.id)}mount(){this.updateSel()}showOptions(t,e){this.list&&this.list.remove(),this.list=this.dom.appendChild(this.createListBox(t,e,this.range)),this.list.addEventListener("scroll",(()=>{this.info&&this.view.requestMeasure(this.placeInfoReq)}))}update(t){var e;let i=t.state.field(this.stateField),n=t.startState.field(this.stateField);if(this.updateTooltipClass(t.state),i!=n){let{options:o,selected:s,disabled:l}=i.open;n.open&&n.open.options==o||(this.range=V(o.length,s,t.state.facet(W).maxRenderedOptions),this.showOptions(o,i.id)),this.updateSel(),l!=(null===(e=n.open)||void 0===e?void 0:e.disabled)&&this.dom.classList.toggle("cm-tooltip-autocomplete-disabled",!!l)}}updateTooltipClass(t){let e=this.tooltipClass(t);if(e!=this.currentClass){for(let t of this.currentClass.split(" "))t&&this.dom.classList.remove(t);for(let t of e.split(" "))t&&this.dom.classList.add(t);this.currentClass=e}}positioned(t){this.space=t,this.info&&this.view.requestMeasure(this.placeInfoReq)}updateSel(){let t=this.view.state.field(this.stateField),e=t.open;if((e.selected>-1&&e.selected<this.range.from||e.selected>=this.range.to)&&(this.range=V(e.options.length,e.selected,this.view.state.facet(W).maxRenderedOptions),this.showOptions(e.options,t.id)),this.updateSelectedOption(e.selected)){this.destroyInfo();let{completion:i}=e.options[e.selected],{info:n}=i;if(!n)return;let o="string"==typeof n?document.createTextNode(n):n(i);if(!o)return;"then"in o?o.then((e=>{e&&this.view.state.field(this.stateField,!1)==t&&this.addInfoPane(e,i)})).catch((t=>C(this.view.state,t,"completion info"))):this.addInfoPane(o,i)}}addInfoPane(t,e){this.destroyInfo();let i=this.info=document.createElement("div");if(i.className="cm-tooltip cm-completionInfo",null!=t.nodeType)i.appendChild(t),this.infoDestroy=null;else{let{dom:e,destroy:n}=t;i.appendChild(e),this.infoDestroy=n||null}this.dom.appendChild(i),this.view.requestMeasure(this.placeInfoReq)}updateSelectedOption(t){let e=null;for(let i=this.list.firstChild,n=this.range.from;i;i=i.nextSibling,n++)"LI"==i.nodeName&&i.id?n==t?i.hasAttribute("aria-selected")||(i.setAttribute("aria-selected","true"),e=i):i.hasAttribute("aria-selected")&&i.removeAttribute("aria-selected"):n--;return e&&function(t,e){let i=t.getBoundingClientRect(),n=e.getBoundingClientRect(),o=i.height/t.offsetHeight;n.top<i.top?t.scrollTop-=(i.top-n.top)/o:n.bottom>i.bottom&&(t.scrollTop+=(n.bottom-i.bottom)/o)}(this.list,e),e}measureInfo(){let t=this.dom.querySelector("[aria-selected]");if(!t||!this.info)return null;let e=this.dom.getBoundingClientRect(),i=this.info.getBoundingClientRect(),n=t.getBoundingClientRect(),o=this.space;if(!o){let t=this.dom.ownerDocument.defaultView||window;o={left:0,top:0,right:t.innerWidth,bottom:t.innerHeight}}return n.top>Math.min(o.bottom,e.bottom)-10||n.bottom<Math.max(o.top,e.top)+10?null:this.view.state.facet(W).positionInfo(this.view,e,n,i,o,this.dom)}placeInfo(t){this.info&&(t?(t.style&&(this.info.style.cssText=t.style),this.info.className="cm-tooltip cm-completionInfo "+(t.class||"")):this.info.style.cssText="top: -1e6px")}createListBox(t,e,i){const n=document.createElement("ul");n.id=e,n.setAttribute("role","listbox"),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-label",this.view.state.phrase("Completions"));let o=null;for(let s=i.from;s<i.to;s++){let{completion:l,match:r}=t[s],{section:a}=l;if(a){let t="string"==typeof a?a:a.name;if(t!=o&&(s>i.from||0==i.from))if(o=t,"string"!=typeof a&&a.header)n.appendChild(a.header(a));else{n.appendChild(document.createElement("completion-section")).textContent=t}}const c=n.appendChild(document.createElement("li"));c.id=e+"-"+s,c.setAttribute("role","option");let h=this.optionClass(l);h&&(c.className=h);for(let t of this.optionContent){let e=t(l,this.view.state,this.view,r);e&&c.appendChild(e)}}return i.from&&n.classList.add("cm-completionListIncompleteTop"),i.to<t.length&&n.classList.add("cm-completionListIncompleteBottom"),n}destroyInfo(){this.info&&(this.infoDestroy&&this.infoDestroy(),this.info.remove(),this.info=null)}destroy(){this.destroyInfo()}}function K(t,e){return i=>new z(i,t,e)}function Q(t){return 100*(t.boost||0)+(t.apply?10:0)+(t.info?5:0)+(t.type?1:0)}class _{constructor(t,e,i,n,o,s){this.options=t,this.attrs=e,this.tooltip=i,this.timestamp=n,this.selected=o,this.disabled=s}setSelected(t,e){return t==this.selected||t>=this.options.length?this:new _(this.options,J(e,t),this.tooltip,this.timestamp,t,this.disabled)}static build(t,e,i,n,o,s){if(n&&!s&&t.some((t=>t.isPending)))return n.setDisabled();let l=function(t,e){let i=[],n=null,o=t=>{i.push(t);let{section:e}=t.completion;if(e){n||(n=[]);let t="string"==typeof e?e:e.name;n.some((e=>e.name==t))||n.push("string"==typeof e?{name:t}:e)}},s=e.facet(W);for(let n of t)if(n.hasResult()){let t=n.result.getMatch;if(!1===n.result.filter)for(let e of n.result.options)o(new R(e,n.source,t?t(e):[],1e9-i.length));else{let i,l=e.sliceDoc(n.from,n.to),r=s.filterStrict?new U(l):new N(l);for(let e of n.result.options)if(i=r.match(e.label)){let s=e.displayLabel?t?t(e,i.matched):[]:i.matched;o(new R(e,n.source,s,i.score+(e.boost||0)))}}}if(n){let t=Object.create(null),e=0,o=(t,e)=>{var i,n;return(null!==(i=t.rank)&&void 0!==i?i:1e9)-(null!==(n=e.rank)&&void 0!==n?n:1e9)||(t.name<e.name?-1:1)};for(let i of n.sort(o))e-=1e5,t[i.name]=e;for(let e of i){let{section:i}=e.completion;i&&(e.score+=t["string"==typeof i?i:i.name])}}let l=[],r=null,a=s.compareCompletions;for(let t of i.sort(((t,e)=>e.score-t.score||a(t.completion,e.completion)))){let e=t.completion;!r||r.label!=e.label||r.detail!=e.detail||null!=r.type&&null!=e.type&&r.type!=e.type||r.apply!=e.apply||r.boost!=e.boost?l.push(t):Q(t.completion)>Q(r)&&(l[l.length-1]=t),r=t.completion}return l}(t,e);if(!l.length)return n&&t.some((t=>t.isPending))?n.setDisabled():null;let r=e.facet(W).selectOnOpen?0:-1;if(n&&n.selected!=r&&-1!=n.selected){let t=n.options[n.selected].completion;for(let e=0;e<l.length;e++)if(l[e].completion==t){r=e;break}}return new _(l,J(i,r),{pos:t.reduce(((t,e)=>e.hasResult()?Math.min(t,e.from):t),1e8),create:rt,above:o.aboveCursor},n?n.timestamp:Date.now(),r,!1)}map(t){return new _(this.options,this.attrs,Object.assign(Object.assign({},this.tooltip),{pos:t.mapPos(this.tooltip.pos)}),this.timestamp,this.selected,this.disabled)}setDisabled(){return new _(this.options,this.attrs,this.tooltip,this.timestamp,this.selected,!0)}}class X{constructor(t,e,i){this.active=t,this.id=e,this.open=i}static start(){return new X(Z,"cm-ac-"+Math.floor(2e6*Math.random()).toString(36),null)}update(t){let{state:e}=t,i=e.facet(W),n=(i.override||e.languageDataAt("autocomplete",E(e)).map(F)).map((e=>(this.active.find((t=>t.source==e))||new et(e,this.active.some((t=>0!=t.state))?1:0)).update(t,i)));n.length==this.active.length&&n.every(((t,e)=>t==this.active[e]))&&(n=this.active);let o=this.open,s=t.effects.some((t=>t.is(nt)));o&&t.docChanged&&(o=o.map(t.changes)),t.selection||n.some((e=>e.hasResult()&&t.changes.touchesRange(e.from,e.to)))||!function(t,e){if(t==e)return!0;for(let i=0,n=0;;){for(;i<t.length&&!t[i].hasResult();)i++;for(;n<e.length&&!e[n].hasResult();)n++;let o=i==t.length,s=n==e.length;if(o||s)return o==s;if(t[i++].result!=e[n++].result)return!1}}(n,this.active)||s?o=_.build(n,e,this.id,o,i,s):o&&o.disabled&&!n.some((t=>t.isPending))&&(o=null),!o&&n.every((t=>!t.isPending))&&n.some((t=>t.hasResult()))&&(n=n.map((t=>t.hasResult()?new et(t.source,0):t)));for(let e of t.effects)e.is(ot)&&(o=o&&o.setSelected(e.value,this.id));return n==this.active&&o==this.open?this:new X(n,this.id,o)}get tooltip(){return this.open?this.open.tooltip:null}get attrs(){return this.open?this.open.attrs:this.active.length?Y:G}}const Y={"aria-autocomplete":"list"},G={};function J(t,e){let i={"aria-autocomplete":"list","aria-haspopup":"listbox","aria-controls":t};return e>-1&&(i["aria-activedescendant"]=t+"-"+e),i}const Z=[];function tt(t,e){if(t.isUserEvent("input.complete")){let i=t.annotation(M);if(i&&e.activateOnCompletion(i))return 12}let i=t.isUserEvent("input.type");return i&&e.activateOnTyping?5:i?1:t.isUserEvent("delete.backward")?2:t.selection?8:t.docChanged?16:0}class et{constructor(t,e,i=!1){this.source=t,this.state=e,this.explicit=i}hasResult(){return!1}get isPending(){return 1==this.state}update(t,e){let i=tt(t,e),n=this;(8&i||16&i&&this.touches(t))&&(n=new et(n.source,0)),4&i&&0==n.state&&(n=new et(this.source,1)),n=n.updateFor(t,i);for(let e of t.effects)if(e.is(j))n=new et(n.source,1,e.value);else if(e.is($))n=new et(n.source,0);else if(e.is(nt))for(let t of e.value)t.source==n.source&&(n=t);return n}updateFor(t,e){return this.map(t.changes)}map(t){return this}touches(t){return t.changes.touchesRange(E(t.state))}}class it extends et{constructor(t,e,i,n,o,s){super(t,3,e),this.limit=i,this.result=n,this.from=o,this.to=s}hasResult(){return!0}updateFor(t,e){var i;if(!(3&e))return this.map(t.changes);let n=this.result;n.map&&!t.changes.empty&&(n=n.map(n,t.changes));let o=t.changes.mapPos(this.from),s=t.changes.mapPos(this.to,1),l=E(t.state);if(l>s||!n||2&e&&(E(t.startState)==this.from||l<this.limit))return new et(this.source,4&e?1:0);let r=t.changes.mapPos(this.limit);return function(t,e,i,n){if(!t)return!1;let o=e.sliceDoc(i,n);return"function"==typeof t?t(o,i,n,e):P(t,!0).test(o)}(n.validFor,t.state,o,s)?new it(this.source,this.explicit,r,n,o,s):n.update&&(n=n.update(n,o,s,new T(t.state,l,!1)))?new it(this.source,this.explicit,r,n,n.from,null!==(i=n.to)&&void 0!==i?i:E(t.state)):new et(this.source,1,this.explicit)}map(t){if(t.empty)return this;return(this.result.map?this.result.map(this.result,t):this.result)?new it(this.source,this.explicit,t.mapPos(this.limit),this.result,t.mapPos(this.from),t.mapPos(this.to,1)):new et(this.source,0)}touches(t){return t.changes.touchesRange(this.from,this.to)}}const nt=a.define({map:(t,e)=>t.map((t=>t.map(e)))}),ot=a.define(),st=r.define({create:()=>X.start(),update:(t,e)=>t.update(e),provide:t=>[w.from(t,(t=>t.tooltip)),g.contentAttributes.from(t,(t=>t.attrs))]});function lt(t,e){const n=e.completion.apply||e.completion.label;let o=t.state.field(st).active.find((t=>t.source==e.source));return o instanceof it&&("string"==typeof n?t.dispatch(Object.assign(Object.assign({},function(t,e,n,o){let{main:s}=t.selection,l=n-s.from,r=o-s.from;return Object.assign(Object.assign({},t.changeByRange((a=>{if(a!=s&&n!=o&&t.sliceDoc(a.from+l,a.from+r)!=t.sliceDoc(n,o))return{range:a};let c=t.toText(e);return{changes:{from:a.from+l,to:o==s.from?a.to:a.from+r,insert:c},range:i.cursor(a.from+l+c.length)}}))),{scrollIntoView:!0,userEvent:"input.complete"})}(t.state,n,o.from,o.to)),{annotations:M.of(e.completion)})):n(t,e.completion,o.from,o.to),!0)}const rt=K(st,lt);function at(t,e="option"){return i=>{let n=i.state.field(st,!1);if(!n||!n.open||n.open.disabled||Date.now()-n.open.timestamp<i.state.facet(W).interactionDelay)return!1;let o,s=1;"page"==e&&(o=y(i,n.open.tooltip))&&(s=Math.max(2,Math.floor(o.dom.offsetHeight/o.dom.querySelector("li").offsetHeight)-1));let{length:l}=n.open.options,r=n.open.selected>-1?n.open.selected+s*(t?1:-1):t?0:l-1;return r<0?r="page"==e?0:l-1:r>=l&&(r="page"==e?l-1:0),i.dispatch({effects:ot.of(r)}),!0}}const ct=t=>!!t.state.field(st,!1)&&(t.dispatch({effects:j.of(!0)}),!0);class ht{constructor(t,e){this.active=t,this.context=e,this.time=Date.now(),this.updates=[],this.done=void 0}}const pt=x.fromClass(class{constructor(t){this.view=t,this.debounceUpdate=-1,this.running=[],this.debounceAccept=-1,this.pendingStart=!1,this.composing=0;for(let e of t.state.field(st).active)e.isPending&&this.startQuery(e)}update(t){let e=t.state.field(st),i=t.state.facet(W);if(!t.selectionSet&&!t.docChanged&&t.startState.field(st)==e)return;let n=t.transactions.some((t=>{let e=tt(t,i);return 8&e||(t.selection||t.docChanged)&&!(3&e)}));for(let e=0;e<this.running.length;e++){let i=this.running[e];if(n||i.context.abortOnDocChange&&t.docChanged||i.updates.length+t.transactions.length>50&&Date.now()-i.time>1e3){for(let t of i.context.abortListeners)try{t()}catch(t){C(this.view.state,t)}i.context.abortListeners=null,this.running.splice(e--,1)}else i.updates.push(...t.transactions)}this.debounceUpdate>-1&&clearTimeout(this.debounceUpdate),t.transactions.some((t=>t.effects.some((t=>t.is(j)))))&&(this.pendingStart=!0);let o=this.pendingStart?50:i.activateOnTypingDelay;if(this.debounceUpdate=e.active.some((t=>t.isPending&&!this.running.some((e=>e.active.source==t.source))))?setTimeout((()=>this.startUpdate()),o):-1,0!=this.composing)for(let e of t.transactions)e.isUserEvent("input.type")?this.composing=2:2==this.composing&&e.selection&&(this.composing=3)}startUpdate(){this.debounceUpdate=-1,this.pendingStart=!1;let{state:t}=this.view,e=t.field(st);for(let t of e.active)t.isPending&&!this.running.some((e=>e.active.source==t.source))&&this.startQuery(t);this.running.length&&e.open&&e.open.disabled&&(this.debounceAccept=setTimeout((()=>this.accept()),this.view.state.facet(W).updateSyncTime))}startQuery(t){let{state:e}=this.view,i=E(e),n=new T(e,i,t.explicit,this.view),o=new ht(t,n);this.running.push(o),Promise.resolve(t.source(n)).then((t=>{o.context.aborted||(o.done=t||null,this.scheduleAccept())}),(t=>{this.view.dispatch({effects:$.of(null)}),C(this.view.state,t)}))}scheduleAccept(){this.running.every((t=>void 0!==t.done))?this.accept():this.debounceAccept<0&&(this.debounceAccept=setTimeout((()=>this.accept()),this.view.state.facet(W).updateSyncTime))}accept(){var t;this.debounceAccept>-1&&clearTimeout(this.debounceAccept),this.debounceAccept=-1;let e=[],i=this.view.state.facet(W),n=this.view.state.field(st);for(let o=0;o<this.running.length;o++){let s=this.running[o];if(void 0===s.done)continue;if(this.running.splice(o--,1),s.done){let n=E(s.updates.length?s.updates[0].startState:this.view.state),o=Math.min(n,s.done.from+(s.active.explicit?0:1)),l=new it(s.active.source,s.active.explicit,o,s.done,s.done.from,null!==(t=s.done.to)&&void 0!==t?t:n);for(let t of s.updates)l=l.update(t,i);if(l.hasResult()){e.push(l);continue}}let l=n.active.find((t=>t.source==s.active.source));if(l&&l.isPending)if(null==s.done){let t=new et(s.active.source,0);for(let e of s.updates)t=t.update(e,i);t.isPending||e.push(t)}else this.startQuery(l)}(e.length||n.open&&n.open.disabled)&&this.view.dispatch({effects:nt.of(e)})}},{eventHandlers:{blur(t){let e=this.view.state.field(st,!1);if(e&&e.tooltip&&this.view.state.facet(W).closeOnBlur){let i=e.open&&y(this.view,e.open.tooltip);i&&i.dom.contains(t.relatedTarget)||setTimeout((()=>this.view.dispatch({effects:$.of(null)})),10)}},compositionstart(){this.composing=1},compositionend(){3==this.composing&&setTimeout((()=>this.view.dispatch({effects:j.of(!1)})),20),this.composing=0}}}),ft="object"==typeof navigator&&/Win/.test(navigator.platform),dt=o.highest(g.domEventHandlers({keydown(t,e){let i=e.state.field(st,!1);if(!i||!i.open||i.open.disabled||i.open.selected<0||t.key.length>1||t.ctrlKey&&(!ft||!t.altKey)||t.metaKey)return!1;let n=i.open.options[i.open.selected],o=i.active.find((t=>t.source==n.source)),s=n.completion.commitCharacters||o.result.commitCharacters;return s&&s.indexOf(t.key)>-1&&lt(e,n),!1}})),ut=g.baseTheme({".cm-tooltip.cm-tooltip-autocomplete":{"& > ul":{fontFamily:"monospace",whiteSpace:"nowrap",overflow:"hidden auto",maxWidth_fallback:"700px",maxWidth:"min(700px, 95vw)",minWidth:"250px",maxHeight:"10em",height:"100%",listStyle:"none",margin:0,padding:0,"& > li, & > completion-section":{padding:"1px 3px",lineHeight:1.2},"& > li":{overflowX:"hidden",textOverflow:"ellipsis",cursor:"pointer"},"& > completion-section":{display:"list-item",borderBottom:"1px solid silver",paddingLeft:"0.5em",opacity:.7}}},"&light .cm-tooltip-autocomplete ul li[aria-selected]":{background:"#17c",color:"white"},"&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]":{background:"#777"},"&dark .cm-tooltip-autocomplete ul li[aria-selected]":{background:"#347",color:"white"},"&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]":{background:"#444"},".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after":{content:'"···"',opacity:.5,display:"block",textAlign:"center"},".cm-tooltip.cm-completionInfo":{position:"absolute",padding:"3px 9px",width:"max-content",maxWidth:"400px",boxSizing:"border-box",whiteSpace:"pre-line"},".cm-completionInfo.cm-completionInfo-left":{right:"100%"},".cm-completionInfo.cm-completionInfo-right":{left:"100%"},".cm-completionInfo.cm-completionInfo-left-narrow":{right:"30px"},".cm-completionInfo.cm-completionInfo-right-narrow":{left:"30px"},"&light .cm-snippetField":{backgroundColor:"#00000022"},"&dark .cm-snippetField":{backgroundColor:"#ffffff22"},".cm-snippetFieldPosition":{verticalAlign:"text-top",width:0,height:"1.15em",display:"inline-block",margin:"0 -0.7px -.7em",borderLeft:"1.4px dotted #888"},".cm-completionMatchedText":{textDecoration:"underline"},".cm-completionDetail":{marginLeft:"0.5em",fontStyle:"italic"},".cm-completionIcon":{fontSize:"90%",width:".8em",display:"inline-block",textAlign:"center",paddingRight:".6em",opacity:"0.6",boxSizing:"content-box"},".cm-completionIcon-function, .cm-completionIcon-method":{"&:after":{content:"'ƒ'"}},".cm-completionIcon-class":{"&:after":{content:"'○'"}},".cm-completionIcon-interface":{"&:after":{content:"'◌'"}},".cm-completionIcon-variable":{"&:after":{content:"'𝑥'"}},".cm-completionIcon-constant":{"&:after":{content:"'𝐶'"}},".cm-completionIcon-type":{"&:after":{content:"'𝑡'"}},".cm-completionIcon-enum":{"&:after":{content:"'∪'"}},".cm-completionIcon-property":{"&:after":{content:"'□'"}},".cm-completionIcon-keyword":{"&:after":{content:"'🔑︎'"}},".cm-completionIcon-namespace":{"&:after":{content:"'▢'"}},".cm-completionIcon-text":{"&:after":{content:"'abc'",fontSize:"50%",verticalAlign:"middle"}}});class mt{constructor(t,e,i,n){this.field=t,this.line=e,this.from=i,this.to=n}}class gt{constructor(t,e,i){this.field=t,this.from=e,this.to=i}map(t){let e=t.mapPos(this.from,-1,c.TrackDel),i=t.mapPos(this.to,1,c.TrackDel);return null==e||null==i?null:new gt(this.field,e,i)}}class vt{constructor(t,e){this.lines=t,this.fieldPositions=e}instantiate(t,e){let i=[],n=[e],o=t.doc.lineAt(e),s=/^\s*/.exec(o.text)[0];for(let o of this.lines){if(i.length){let i=s,l=/^\t*/.exec(o)[0].length;for(let e=0;e<l;e++)i+=t.facet(D);n.push(e+i.length-l),o=i+o.slice(l)}i.push(o),e+=o.length+1}let l=this.fieldPositions.map((t=>new gt(t.field,n[t.line]+t.from,n[t.line]+t.to)));return{text:i,ranges:l}}static parse(t){let e,i=[],n=[],o=[];for(let s of t.split(/\r\n?|\n/)){for(;e=/[#$]\{(?:(\d+)(?::([^}]*))?|((?:\\[{}]|[^}])*))\}/.exec(s);){let t=e[1]?+e[1]:null,l=e[2]||e[3]||"",r=-1,a=l.replace(/\\[{}]/g,(t=>t[1]));for(let e=0;e<i.length;e++)(null!=t?i[e].seq==t:a&&i[e].name==a)&&(r=e);if(r<0){let e=0;for(;e<i.length&&(null==t||null!=i[e].seq&&i[e].seq<t);)e++;i.splice(e,0,{seq:t,name:a}),r=e;for(let t of o)t.field>=r&&t.field++}o.push(new mt(r,n.length,e.index,e.index+a.length)),s=s.slice(0,e.index)+l+s.slice(e.index+e[0].length)}s=s.replace(/\\([{}])/g,((t,e,i)=>{for(let t of o)t.line==n.length&&t.from>i&&(t.from--,t.to--);return e})),n.push(s)}return new vt(n,o)}}let bt=I.widget({widget:new class extends O{toDOM(){let t=document.createElement("span");return t.className="cm-snippetFieldPosition",t}ignoreEvent(){return!1}}}),wt=I.mark({class:"cm-snippetField"});class yt{constructor(t,e){this.ranges=t,this.active=e,this.deco=I.set(t.map((t=>(t.from==t.to?bt:wt).range(t.from,t.to))))}map(t){let e=[];for(let i of this.ranges){let n=i.map(t);if(!n)return null;e.push(n)}return new yt(e,this.active)}selectionInsideField(t){return t.ranges.every((t=>this.ranges.some((e=>e.field==this.active&&e.from<=t.from&&e.to>=t.to))))}}const xt=a.define({map:(t,e)=>t&&t.map(e)}),Ct=a.define(),It=r.define({create:()=>null,update(t,e){for(let i of e.effects){if(i.is(xt))return i.value;if(i.is(Ct)&&t)return new yt(t.ranges,i.value)}return t&&e.docChanged&&(t=t.map(e.changes)),t&&e.selection&&!t.selectionInsideField(e.selection)&&(t=null),t},provide:t=>g.decorations.from(t,(t=>t?t.deco:I.none))});function Ot(t,e){return i.create(t.filter((t=>t.field==e)).map((t=>i.range(t.from,t.to))))}function kt(t){let e=vt.parse(t);return(t,i,n,o)=>{let{text:s,ranges:l}=e.instantiate(t.state,n),r={changes:{from:n,to:o,insert:u.of(s)},scrollIntoView:!0,annotations:i?[M.of(i),m.userEvent.of("input.complete")]:void 0};if(l.length&&(r.selection=Ot(l,0)),l.some((t=>t.field>0))){let e=new yt(l,0),i=r.effects=[xt.of(e)];void 0===t.state.field(It,!1)&&i.push(a.appendConfig.of([It,At,Rt,ut]))}t.dispatch(t.state.update(r))}}function Dt(t){return({state:e,dispatch:i})=>{let n=e.field(It,!1);if(!n||t<0&&0==n.active)return!1;let o=n.active+t,s=t>0&&!n.ranges.some((e=>e.field==o+t));return i(e.update({selection:Ot(n.ranges,o),effects:xt.of(s?null:new yt(n.ranges,o)),scrollIntoView:!0})),!0}}const Tt=[{key:"Tab",run:Dt(1),shift:Dt(-1)},{key:"Escape",run:({state:t,dispatch:e})=>!!t.field(It,!1)&&(e(t.update({effects:xt.of(null)})),!0)}],St=s.define({combine:t=>t.length?t[0]:Tt}),At=o.highest(v.compute([St],(t=>t.facet(St))));function Lt(t,e){return Object.assign(Object.assign({},e),{apply:kt(t)})}const Rt=g.domEventHandlers({mousedown(t,e){let i,n=e.state.field(It,!1);if(!n||null==(i=e.posAtCoords({x:t.clientX,y:t.clientY})))return!1;let o=n.ranges.find((t=>t.from<=i&&t.to>=i));return!(!o||o.field==n.active)&&(e.dispatch({selection:Ot(n.ranges,o.field),effects:xt.of(n.ranges.some((t=>t.field>o.field))?new yt(n.ranges,o.field):null),scrollIntoView:!0}),!0)}}),Et={brackets:["(","[","{","'",'"'],before:")]}:;>",stringPrefixes:[]},Pt=a.define({map(t,e){let i=e.mapPos(t,-1,c.TrackAfter);return null==i?void 0:i}}),Mt=new class extends h{};Mt.startSide=1,Mt.endSide=-1;const Bt=r.define({create:()=>p.empty,update(t,e){if(t=t.map(e.changes),e.selection){let i=e.state.doc.lineAt(e.selection.main.head);t=t.update({filter:t=>t>=i.from&&t<=i.to})}for(let i of e.effects)i.is(Pt)&&(t=t.update({add:[Mt.range(i.value,i.value+1)]}));return t}});function Ft(){return[Wt,Bt]}const jt="()[]{}<>";function $t(t){for(let e=0;e<8;e+=2)if(jt.charCodeAt(e)==t)return jt.charAt(e+1);return f(t<128?t:t+1)}function Nt(t,e){return t.languageDataAt("closeBrackets",e)[0]||Et}const Ut="object"==typeof navigator&&/Android\b/.test(navigator.userAgent),Wt=g.inputHandler.of(((i,n,o,s)=>{if((Ut?i.composing:i.compositionStarted)||i.state.readOnly)return!1;let l=i.state.selection.main;if(s.length>2||2==s.length&&1==t(e(s,0))||n!=l.from||o!=l.to)return!1;let r=function(t,i){let n=Nt(t,t.selection.main.head),o=n.brackets||Et.brackets;for(let s of o){let l=$t(e(s,0));if(i==s)return l==s?Qt(t,s,o.indexOf(s+s+s)>-1,n):zt(t,s,l,n.before||Et.before);if(i==l&&Ht(t,t.selection.main.from))return Kt(t,s,l)}return null}(i.state,s);return!!r&&(i.dispatch(r),!0)})),qt=[{key:"Backspace",run:({state:n,dispatch:o})=>{if(n.readOnly)return!1;let s=Nt(n,n.selection.main.head).brackets||Et.brackets,l=null,r=n.changeByRange((o=>{if(o.empty){let l=function(i,n){let o=i.sliceString(n-2,n);return t(e(o,0))==o.length?o:o.slice(1)}(n.doc,o.head);for(let t of s)if(t==l&&Vt(n.doc,o.head)==$t(e(t,0)))return{changes:{from:o.head-t.length,to:o.head+t.length},range:i.cursor(o.head-t.length)}}return{range:l=o}}));return l||o(n.update(r,{scrollIntoView:!0,userEvent:"delete.backward"})),!l}}];function Ht(t,e){let i=!1;return t.field(Bt).between(0,t.doc.length,(t=>{t==e&&(i=!0)})),i}function Vt(i,n){let o=i.sliceString(n,n+2);return o.slice(0,t(e(o,0)))}function zt(t,e,n,o){let s=null,l=t.changeByRange((l=>{if(!l.empty)return{changes:[{insert:e,from:l.from},{insert:n,from:l.to}],effects:Pt.of(l.to+e.length),range:i.range(l.anchor+e.length,l.head+e.length)};let r=Vt(t.doc,l.head);return!r||/\s/.test(r)||o.indexOf(r)>-1?{changes:{insert:e+n,from:l.head},effects:Pt.of(l.head+e.length),range:i.cursor(l.head+e.length)}:{range:s=l}}));return s?null:t.update(l,{scrollIntoView:!0,userEvent:"input.type"})}function Kt(t,e,n){let o=null,s=t.changeByRange((e=>e.empty&&Vt(t.doc,e.head)==n?{changes:{from:e.head,to:e.head+n.length,insert:n},range:i.cursor(e.head+n.length)}:o={range:e}));return o?null:t.update(s,{scrollIntoView:!0,userEvent:"input.type"})}function Qt(t,e,o,s){let l=s.stringPrefixes||Et.stringPrefixes,r=null,a=t.changeByRange((s=>{if(!s.empty)return{changes:[{insert:e,from:s.from},{insert:e,from:s.to}],effects:Pt.of(s.to+e.length),range:i.range(s.anchor+e.length,s.head+e.length)};let a,c=s.head,h=Vt(t.doc,c);if(h==e){if(_t(t,c))return{changes:{insert:e+e,from:c},effects:Pt.of(c+e.length),range:i.cursor(c+e.length)};if(Ht(t,c)){let n=o&&t.sliceDoc(c,c+3*e.length)==e+e+e?e+e+e:e;return{changes:{from:c,to:c+n.length,insert:n},range:i.cursor(c+n.length)}}}else{if(o&&t.sliceDoc(c-2*e.length,c)==e+e&&(a=Xt(t,c-2*e.length,l))>-1&&_t(t,a))return{changes:{insert:e+e+e+e,from:c},effects:Pt.of(c+e.length),range:i.cursor(c+e.length)};if(t.charCategorizer(c)(h)!=n.Word&&Xt(t,c,l)>-1&&!function(t,e,i,n){let o=k(t).resolveInner(e,-1),s=n.reduce(((t,e)=>Math.max(t,e.length)),0);for(let l=0;l<5;l++){let l=t.sliceDoc(o.from,Math.min(o.to,o.from+i.length+s)),r=l.indexOf(i);if(!r||r>-1&&n.indexOf(l.slice(0,r))>-1){let e=o.firstChild;for(;e&&e.from==o.from&&e.to-e.from>i.length+r;){if(t.sliceDoc(e.to-i.length,e.to)==i)return!1;e=e.firstChild}return!0}let a=o.to==e&&o.parent;if(!a)break;o=a}return!1}(t,c,e,l))return{changes:{insert:e+e,from:c},effects:Pt.of(c+e.length),range:i.cursor(c+e.length)}}return{range:r=s}}));return r?null:t.update(a,{scrollIntoView:!0,userEvent:"input.type"})}function _t(t,e){let i=k(t).resolveInner(e+1);return i.parent&&i.from==e}function Xt(t,e,i){let o=t.charCategorizer(e);if(o(t.sliceDoc(e-1,e))!=n.Word)return e;for(let s of i){let i=e-s.length;if(t.sliceDoc(i,e)==s&&o(t.sliceDoc(i-1,i))!=n.Word)return i}return-1}function Yt(t={}){return[dt,st,W.of(t),pt,Jt,ut]}const Gt=[{key:"Ctrl-Space",run:ct},{mac:"Alt-`",run:ct},{key:"Escape",run:t=>{let e=t.state.field(st,!1);return!(!e||!e.active.some((t=>0!=t.state)))&&(t.dispatch({effects:$.of(null)}),!0)}},{key:"ArrowDown",run:at(!0)},{key:"ArrowUp",run:at(!1)},{key:"PageDown",run:at(!0,"page")},{key:"PageUp",run:at(!1,"page")},{key:"Enter",run:t=>{let e=t.state.field(st,!1);return!(t.state.readOnly||!e||!e.open||e.open.selected<0||e.open.disabled||Date.now()-e.open.timestamp<t.state.facet(W).interactionDelay)&&lt(t,e.open.options[e.open.selected])}}],Jt=o.highest(v.computeN([W],(t=>t.facet(W).defaultKeymap?[Gt]:[])));export{Ft as a,Yt as b,A as c,qt as d,Gt as e,L as i,Lt as s};
//# sourceMappingURL=index-I4sefyB1.js.map
