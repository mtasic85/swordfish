var M=class{params={};path;handlers=[];constructor(o,d={}){this.path=o,Object.keys(d).forEach(u=>{this[u]=d[u]}),d.templates&&(this.programmaticTemplates=!0)}templates=[];templateTargetId="";programmaticTemplates=!1;handlersDone=!1;cancelHandlers},I=M;function k(l){return l.replace(/(^\/+|\/+$)/g,"").split("/")}function W(l,o){let d=/(?:\?([^#]*))?(#.*)?$/,u=l.match(d),p={},P;if(u&&u[1]){let c=u[1].split("&");for(let f=0;f<c.length;f++){let _=c[f].split("=");p[decodeURIComponent(_[0])]=decodeURIComponent(_.slice(1).join("="))}}let T=k(l.replace(d,"")),w=k(o||""),E=Math.max(T.length,w.length);for(let c=0;c<E;c++)if(w[c]&&w[c].charAt(0)===":"){let f=w[c].replace(/(^:|[+*?]+$)/g,""),_=(w[c].match(/[+*?]+$/)||{}).toString()[0],R=~_.indexOf("+"),b=~_.indexOf("*"),m=T[c]||"";if(!m&&!b&&(_.indexOf("?")<0||R)){P=!1;break}if(p[f]=decodeURIComponent(m),R||b){p[f]=T.slice(c).map(decodeURIComponent).join("/");break}}else if(w[c]!==T[c]){P=!1;break}return P===!1?!1:p}function x(l,...o){if(window.PineconeRouterMiddlewares)for(let d in window.PineconeRouterMiddlewares){let u=window.PineconeRouterMiddlewares[d];if(u[l]==null)return;if(u[l](...o)=="stop")return"stop"}}function D(l){document.dispatchEvent(new CustomEvent("fetch-error",{detail:l}))}function S(l){let o=l.reactive({version:"5.0.0",name:"pinecone-router",settings:{hash:!1,basePath:"/",templateTargetId:null,interceptLinks:!0},notfound:new I("notfound"),routes:[],context:{route:"",path:"",params:{},query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(e){return m(e),"stop"},navigate(e){m(e)}},add(e,n){if(this.routes.find(r=>r.path==e)!=null)throw new Error("Pinecone Router: route already exist");return this.routes.push(new I(e,n))-1},remove(e){this.routes=this.routes.filter(n=>n.path!=e)},loadStart:new Event("pinecone-start"),loadEnd:new Event("pinecone-end")});window.PineconeRouter=o;var d={},u={};let p=new Set,P=(e,n,r)=>{if(p.has(n))return;p.add(n);let t=e.content.cloneNode(!0).firstElementChild;t&&(l.addScopeToNode(t,{},e),l.mutateDom(()=>{r!=null?r.appendChild(t):e.after(t),l.initTree(t)}),e._x_PineconeRouter_CurrentTemplate=t,e._x_PineconeRouter_undoTemplate=()=>{t.remove(),delete e._x_PineconeRouter_CurrentTemplate},l.nextTick(()=>p.delete(n)))};function T(e){e._x_PineconeRouter_undoTemplate&&(e._x_PineconeRouter_undoTemplate(),delete e._x_PineconeRouter_undoTemplate)}function w(e,n,r,t){if(e._x_PineconeRouter_CurrentTemplate)return e._x_PineconeRouter_CurrentTemplate;e.content.firstElementChild?(P(e,n,t),f()):r&&(r.every(i=>u[i])?(r.length>1&&(e.innerHTML="<templates-wrapper>"),r.forEach(i=>{e.innerHTML+=u[i]}),r.length>1&&(e.innerHTML="</templates-wrapper>"),P(e,n,t),f()):E(e,r).then(()=>P(e,n,t)).finally(()=>f()))}let E=(e,n,r=!1,t=!1)=>{let i=n.map(a=>d[a]?d[a]:u[a]?new Promise(s=>{s(u[a])}):(d[a]=fetch(a).then(s=>s.ok?s.text():(D(s.statusText),null)).then(s=>s==null?(u[a]=null,d[a]=null,null):(u[a]=s,d[a]=null,s)),d[a]));return Promise.all(i).then(a=>{let s=a.filter(h=>h!==null).join("");return n.length>1&&!r?e.innerHTML="<templates-wrapper>"+s+"</templates-wrapper>":e.innerHTML=s,e.innerHTML})},c=()=>{document.dispatchEvent(o.loadStart)},f=()=>{document.dispatchEvent(o.loadEnd)},_=e=>!o.settings.hash&&o.settings.basePath!="/"?o.settings.basePath+e:e,R=e=>o.routes.findIndex(n=>n.path==e);l.directive("route",(e,{expression:n,modifiers:r},{effect:t,cleanup:i})=>{let a=n;if(x("onBeforeRouteProcessed",e,a),a.indexOf("#")>-1)throw new Error("Pinecone Router: A route's path may not have a hash character.");let s=L(r,"target",null)??window.PineconeRouter.settings.templateTargetId,h=document.getElementById(s);if(s&&!h)throw new Error("Pinecone Router: Can't find an element with the suplied target ID: "+s);let g=null;a!="notfound"&&(a=_(a),g=o.add(a));let y=o.routes[g]??o.notfound;e._x_PineconeRouter_route=a,e.content.firstElementChild!=null&&l.nextTick(()=>{t(()=>{y.handlersDone&&o.context.route==a?w(e,n,null,h):T(e)})}),i(()=>{e._x_PineconeRouter_undoTemplate&&e._x_PineconeRouter_undoTemplate(),o.remove(a),delete e._x_PineconeRouter_route}),x("onAfterRouteProcessed",e,a)}),l.directive("handler",(e,{expression:n},{evaluate:r,cleanup:t})=>{if(!e._x_PineconeRouter_route)throw new Error("Pinecone Router: x-handler must be set on the same element as x-route.");let i;!(n.startsWith("[")&&n.endsWith("]"))&&!(n.startsWith("Array(")&&n.endsWith(")"))&&(n=`[${n}]`);let a=r(n);if(typeof a=="object")i=a;else throw new Error(`Pinecone Router: Invalid handler type: ${typeof a}.`);for(let g=0;g<i.length;g++)i[g]=i[g].bind(l.$data(e));let s=e._x_PineconeRouter_route,h=s=="notfound"?o.notfound:o.routes[R(s)];h.handlers=i,t(()=>{h.handlers=[],h.handlersDone=!0,h.cancelHandlers=!1})}),l.directive("template",(e,{modifiers:n,expression:r},{Alpine:t,effect:i,evaluate:a,cleanup:s})=>{if(!e._x_PineconeRouter_route)throw new Error("Pinecone Router: x-template must be used on the same element as x-route.");if(e.content.firstElementChild!=null)throw new Error("Pinecone Router: x-template cannot be used alongside an inline template (template element should not have a child).");!(r.startsWith("[")&&r.endsWith("]"))&&!(r.startsWith("Array(")&&r.endsWith(")"))&&(r=`['${r}']`);let h=a(r),g;if(typeof h=="object")g=h;else throw new Error(`Pinecone Router: Invalid handler type: ${typeof h}.`);let y=L(n,"target",null)??window.PineconeRouter.settings.templateTargetId,v=document.getElementById(y);if(y&&!v)throw new Error("Pinecone Router: Can't find an element with the suplied target ID: "+y);n.includes("preload")&&E(e,g,!1,!0);let C=e._x_PineconeRouter_route,H=C=="notfound"?o.notfound:o.routes[R(C)];H.templates=g,t.nextTick(()=>{i(()=>{H.handlersDone&&o.context.route==H.path?w(e,r,g,v):T(e)})}),s(()=>{e._x_PineconeRouter_undoTemplate&&e._x_PineconeRouter_undoTemplate()})}),l.$router=o.context,l.magic("router",()=>o.context),document.addEventListener("alpine:initialized",()=>{x("init"),o.settings.hash==!1?m(location.pathname,!1,!0):m(location.hash.substring(1),!1,!0)}),window.addEventListener("popstate",()=>{o.settings.hash?window.location.hash!=""&&m(window.location.hash.substring(1),!0):m(window.location.pathname,!0)}),b();function b(){function e(n){if(!n||!n.getAttribute)return;let r=n.getAttribute("href"),t=n.getAttribute("target");if(!(!r||!r.match(/^\//g)||t&&!t.match(/^_?self$/i)))return typeof r!="string"&&r.url&&(r=r.url),r}window.document.body.addEventListener("click",function(n){if(n.ctrlKey||n.metaKey||n.altKey||n.shiftKey||n.button||n.defaultPrevented)return;let r=o.routes[R(o.context.route)]??o.notfound;r.handlersDone||(r.cancelHandlers=!0,f());let t=n.target;do if(t.localName==="a"&&t.getAttribute("href")){if(window.PineconeRouter.settings.interceptLinks==!1&&!t.hasAttribute("x-link")||t.hasAttribute("data-native")||t.hasAttribute("native"))return;let i=e(t);i&&(m(i),n.stopImmediatePropagation&&n.stopImmediatePropagation(),n.stopPropagation&&n.stopPropagation(),n.preventDefault());break}while(t=t.parentNode)})}async function m(e,n=!1,r=!1){e||(e="/"),o.context.path=e,o.settings.hash||(o.settings.basePath!="/"&&!e.startsWith(o.settings.basePath)&&(e=o.settings.basePath+e),e==o.settings.basePath&&!e.endsWith("/")&&(e+="/"));let t=o.routes.find(a=>{let s=W(e,a.path);return a.params=s!=!1?s:{},s!=!1})??o.notfound;t.handlersDone=!t.handlers.length,(t.handlers.length||t.templates)&&c();let i=$(t.path,e,t.params);if(o.context=i,x("onBeforeHandlersExecuted",t,e,r)=="stop"){f();return}if(!n){let a="";if(o.settings.hash?(a="#",a+=window.location.search+e):a=e+window.location.search+window.location.hash,!r)history.pushState({path:a},"",a);else if(o.settings.hash&&e=="/")return o.context=i,m("/",!1,!1)}if(t&&t.handlers.length){if(t.cancelHandlers=!1,!await j(t.handlers,i)){f();return}t.handlersDone=!0,t.templates||f()}if(t.templates.length&&t.programmaticTemplates){let a=t.templateTargetId?document.getElementById(t.templateTargetId):document.getElementById(o.settings.templateTargetId);E(a,t.templates,t.programmaticTemplates).then(()=>{f()})}x("onHandlersExecuted",t,e,r)}function $(e,n,r){return{route:e,path:n,params:r,query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(t){return m(t),"stop"},navigate(t){m(t)}}}function L(e,n,r){if(e.indexOf(n)===-1)return r;let t=e[e.indexOf(n)+1];if(!t)return r;if(n==="target"){let i=t.match(/([a-z0-9_-]+)/);if(i)return i[1]}return t}async function j(e,n){for(let r=0;r<e.length;r++)if(typeof e[r]=="function"){let t=o.routes[R(n.route)]??o.notfound;if(t.cancelHandlers)return t.cancelHandlers=!1,!1;let i;if(e[r].constructor.name==="AsyncFunction"?i=await e[r](n):i=e[r](n),i=="stop")return!1}return!0}}var q=S;export{q as default};
//# sourceMappingURL=router.esm.js.map