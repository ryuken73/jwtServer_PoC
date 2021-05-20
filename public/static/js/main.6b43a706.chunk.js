(this.webpackJsonplogin=this.webpackJsonplogin||[]).push([[0],{100:function(e,t,a){},131:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),s=a.n(c),i=(a(100),a(31)),o=a(10),l=a(36),u=a.n(l),j=a(58),d=a(18),b=a(53),p=a(13),x=a(17),h=a.n(x),O=a(2);function f(e){console.log("AuthRoute re-render: ",e);var t=e.children,a=e.tokenValid,n=void 0!==a&&a,c=e.setTokenValid,s=void 0===c?function(){}:c,i=Object(j.a)(e,["children","tokenValid","setTokenValid"]);return r.a.useEffect((function(){h.a.get("/decodeToken").then((function(e){e.data&&s(!0)})).catch((function(e){console.log(e),s(!1)}))}),[s]),Object(O.jsx)(p.b,Object(d.a)(Object(d.a)({},i),{},{render:function(e){var a=e.location;return n?t:Object(O.jsx)(p.a,{to:{pathname:"/pages/login",state:{from:a}}})}}))}var m=r.a.memo(f);var v=a(189),g=a(179),k=a(174),w=a(182),y=a(177),T=a(185),S=a(172),I=a(180),C=a(183),A=a(176),D=a(79),E=a.n(D),N=a(82),F=a(169),P=a(173),V=a(187),z=Object(F.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}}));function R(e){var t=z(),a=e.open,n=e.setOpen,r=e.message;return Object(O.jsx)(V.a,{className:t.backdrop,open:a,onClick:function(){n(!1)},children:Object(O.jsx)(C.a,{children:r})})}function q(){return Object(O.jsxs)(N.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(O.jsx)(S.a,{color:"inherit",href:"https://material-ui.com/",children:"Your Website"})," ",(new Date).getFullYear(),"."]})}var B=Object(F.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),M=function(e){console.log("injectTokenQueryParamenter:",e),h.a.defaults.params=Object(d.a)(Object(d.a)({},h.a.defaults.params),{},{accessToken:e})};function W(e){var t=e.setTokenValid,a=e.showAlert,n=e.useAccessTokenIn,c=Object(p.g)(),s=B(),i=r.a.useState(""),l=Object(o.a)(i,2),u=l[0],j=l[1],d=r.a.useState(""),b=Object(o.a)(d,2),x=b[0],f=b[1],m=r.a.useState(10),D=Object(o.a)(m,2),F=D[0],V=D[1],z=r.a.useState(60),W=Object(o.a)(z,2),U=W[0],J=W[1],L=r.a.useState(!1),Y=Object(o.a)(L,2),H=Y[0],K=Y[1],Q="body",G={query:M,cookie:function(){},header:function(){}},X=function(e){console.log("submit:",u,x),K(!0),setTimeout((function(){h.a.post("/login",{username:u,password:x,expAccess:F,expRefresh:U,returnAccessTokenBy:Q}).then((function(e){console.log(e.data);var r=e.data,s=r.authenticated,i=r.errMsg;if(!0===s){var o=function(e){return e.data.accessToken}(e);return(0,G[n])(o),t(!0),c.push("/pages/private/portal"),K(!1),void a({severity:"success",message:"login success!"})}K(!1),a({severity:"error",message:i})})).catch((function(e){console.error(e),K(!1)}))}),1e3)};return Object(O.jsxs)(P.a,{component:"main",maxWidth:"xs",children:[Object(O.jsx)(k.a,{}),H&&Object(O.jsx)(R,{open:H,message:"Check Authenticated.."}),Object(O.jsxs)("div",{className:s.paper,children:[Object(O.jsx)(v.a,{className:s.avatar,children:Object(O.jsx)(E.a,{})}),Object(O.jsx)(N.a,{component:"h1",variant:"h5",children:"Sign in"}),Object(O.jsxs)("div",{className:s.div,noValidate:!0,children:[Object(O.jsx)(w.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,value:u,onChange:function(e){return j(e.target.value)}}),Object(O.jsx)(w.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:x,onChange:function(e){return f(e.target.value)},onKeyDown:function(e){13===e.keyCode&&X()}}),Object(O.jsx)(y.a,{control:Object(O.jsx)(T.a,{value:"remember",color:"primary"}),label:"Remember me"}),Object(O.jsx)(g.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:s.submit,onClick:X,children:"Sign In"}),Object(O.jsxs)(I.a,{container:!0,children:[Object(O.jsx)(I.a,{item:!0,xs:!0,children:Object(O.jsx)(S.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(O.jsx)(I.a,{item:!0,children:Object(O.jsx)(S.a,{href:"#",variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]}),Object(O.jsx)(A.a,{width:"90%",children:Object(O.jsxs)(C.a,{p:"10px",fontSize:"12px",mt:"10px",children:[Object(O.jsxs)(C.a,{display:"flex",alignItems:"center",width:"100%",children:[Object(O.jsx)(C.a,{width:"100%",children:"Access Token Expires in(sec)"}),Object(O.jsx)(C.a,{width:"100%",children:Object(O.jsx)(w.a,{variant:"outlined",size:"small",margin:"dense",value:F,onChange:function(e){console.log(e.target.value),""!==e.target.value?isNaN(parseInt(e.target.value))||V(parseInt(e.target.value)):V(0)}})})]}),Object(O.jsxs)(C.a,{display:"flex",alignItems:"center",width:"100%",children:[Object(O.jsx)(C.a,{width:"100%",children:"Refresh Token Expires in(sec)"}),Object(O.jsx)(C.a,{width:"100%",children:Object(O.jsx)(w.a,{variant:"outlined",size:"small",margin:"dense",value:U,onChange:function(e){console.log(e.target.value),""!==e.target.value?isNaN(parseInt(e.target.value))||J(parseInt(e.target.value)):J(0)}})})]})]})}),Object(O.jsx)(C.a,{mt:8,children:Object(O.jsx)(q,{})})]})}var U=r.a.memo(W),J=a(80);function L(){var e=u.a.mark(k),t=r.a.useState(100),a=Object(o.a)(t,2),n=a[0],c=a[1],s=r.a.useState("stopped"),i=Object(o.a)(s,2),l=(i[0],i[1]),j=r.a.useState("No Result"),d=Object(o.a)(j,2),p=d[0],x=d[1],f=r.a.useState("No Result"),m=Object(o.a)(f,2),v=m[0];m[1];function k(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(!(a<t)){e.next=7;break}return e.next=4,a;case 4:a+=1,e.next=1;break;case 7:case"end":return e.stop()}}),e)}var y=function(e){return h.a.get("/public/echo/".concat(e))},T=r.a.useCallback(Object(b.a)(u.a.mark((function e(){var t,a,r,c,s,i,o,j,d,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=k(n),a=Date.now(),l("public-start"),r=!0,c=!1,e.prev=5,i=Object(J.a)(t);case 7:return e.next=9,i.next();case 9:return o=e.sent,r=o.done,e.next=13,o.value;case 13:if(j=e.sent,r){e.next=21;break}return d=j,e.next=18,y(d);case 18:r=!0,e.next=7;break;case 21:e.next=27;break;case 23:e.prev=23,e.t0=e.catch(5),c=!0,s=e.t0;case 27:if(e.prev=27,e.prev=28,r||null==i.return){e.next=32;break}return e.next=32,i.return();case 32:if(e.prev=32,!c){e.next=35;break}throw s;case 35:return e.finish(32);case 36:return e.finish(27);case 37:b=Date.now()-a,x(b),l("stopped");case 40:case"end":return e.stop()}}),e,null,[[5,23,27,37],[28,,32,36]])}))),[]);return Object(O.jsxs)(C.a,{display:"flex",flexDirection:"column",m:"15px",children:[Object(O.jsx)(C.a,{children:Object(O.jsx)(w.a,{variant:"outlined",label:"request count",margin:"dense",size:"small",value:n,onChange:function(e){c(e.target.value)}})}),Object(O.jsxs)(C.a,{display:"flex",alignItems:"center",m:"5px",children:[Object(O.jsx)(C.a,{width:"60px",children:"Public"}),Object(O.jsx)(g.a,{variant:"contained",size:"small",color:"primary",onClick:T,children:"Start"}),Object(O.jsxs)(C.a,{width:"auto",ml:"10px",children:["Result: ",p]})]}),Object(O.jsxs)(C.a,{display:"flex",alignItems:"center",m:"5px",children:[Object(O.jsx)(C.a,{width:"60px",children:"Private"}),Object(O.jsx)(g.a,{variant:"contained",size:"small",color:"primary",children:"Start"}),Object(O.jsxs)(C.a,{width:"auto",ml:"10px",children:["Result: ",v]})]})]})}var Y=r.a.memo(L),H=a(181);function K(e){e.history;var t=Object(p.h)().resource,a=r.a.useState(!0),n=Object(o.a)(a,2),c=n[0],s=n[1],l=r.a.useState({}),u=Object(o.a)(l,2),j=u[0],d=u[1],b=r.a.useState({}),x=Object(o.a)(b,2),f=x[0],m=x[1],v=r.a.useState("calculating..."),g=Object(o.a)(v,2),k=g[0],w=g[1],y=r.a.useState("calculating..."),T=Object(o.a)(y,2),S=T[0],I=T[1];return r.a.useEffect((function(){var e;return h.a.get("/private").then((function(t){console.log(t);var a=t.data,n=a.refreshTokenDecoded,r=a.accessTokenDecoded,c=n.accessToken;n.accessToken=c.substr(1,10)+"..."+c.substr(c.length-5);var i=r.exp,o=n.exp;d(r),m(n),s(!1),e=setInterval((function(){var e=parseInt((1e3*i-Date.now())/1e3).toFixed(0);w(e<=0?"expired":e)}),1e3),setInterval((function(){var e=parseInt((1e3*o-Date.now())/1e3).toFixed(0);I(e<=0?"expired":e)}),1e3)})).catch((function(e){s(!1),console.log(e)})),function(){console.log("dismount Protected"),clearInterval(e)}}),[t]),Object(O.jsx)(C.a,{display:"flex",flexDirection:"column",m:"auto",mt:"80px",width:"40%",children:!1===c&&Object(O.jsxs)(r.a.Fragment,{children:[Object(O.jsxs)(C.a,{display:"flex",mb:"10px",children:[Object(O.jsxs)(C.a,{display:"flex",flexDirection:"column",width:"50%",m:"5px",children:[Object(O.jsxs)(C.a,{color:"expired"===k&&"red",mb:"5px",children:["Access Token: remains [",k,"]"]}),Object(O.jsx)(A.a,{elevation:3,children:Object.entries(j).map((function(e){var t=Object(o.a)(e,2),a=t[0],n=t[1];return Object(O.jsxs)(C.a,{p:"5px",display:"flex",children:[Object(O.jsxs)(C.a,{children:[a," :"]}),Object(O.jsx)(C.a,{children:n})]})}))})]}),Object(O.jsxs)(C.a,{display:"flex",flexDirection:"column",width:"50%",m:"5px",children:[Object(O.jsxs)(C.a,{color:"expired"===S&&"red",mb:"5px",children:["Refresh Token: remains [",S,"]"]}),Object(O.jsx)(A.a,{elevation:3,children:Object.entries(f).map((function(e){var t=Object(o.a)(e,2),a=t[0],n=t[1];return Object(O.jsxs)(C.a,{p:"5px",display:"flex",children:[Object(O.jsxs)(C.a,{children:[a," :"]}),Object(O.jsx)(C.a,{children:n})]})}))})]})]}),Object(O.jsx)(H.a,{}),Object(O.jsxs)(C.a,{fontSize:"30px",mt:"10px",children:[t," page"]}),Object(O.jsxs)(C.a,{children:[Object(O.jsx)(C.a,{children:Object(O.jsx)(i.b,{to:"/pages/private/portal",children:"Portal"})}),Object(O.jsx)(C.a,{children:Object(O.jsx)(i.b,{to:"/pages/private/mail",children:"Mail"})}),Object(O.jsx)(C.a,{children:Object(O.jsx)(i.b,{to:"/pages/private/userInfo",children:"UserInfo"})}),Object(O.jsx)(C.a,{children:Object(O.jsx)(i.b,{to:"/pages/private/benchmark",children:"Benchmark"})})]}),"benchmark"===t&&Object(O.jsx)(Y,{})]})})}var Q=r.a.memo(K),G=a(186),X=a(184);function Z(e){return Object(O.jsx)(X.a,Object(d.a)({elevation:6,variant:"filled"},e))}var $=Object(F.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function _(e){var t=$(),a=e.openAlert,n=e.setOpenAlert,r=e.severity,c=void 0===r?"info":r,s=e.alertMessage,i=void 0===s?"":s,o=function(e,t){"clickaway"!==t&&n(!1)};return Object(O.jsx)("div",{className:t.root,children:Object(O.jsx)(G.a,{open:a,autoHideDuration:3e3,onClose:o,children:Object(O.jsx)(Z,{severity:c,onClose:o,children:i})})})}function ee(e){console.log("App re-render:",e);var t=Object(p.g)(),a=r.a.useState(!0),n=Object(o.a)(a,2),c=n[0],s=n[1],i=r.a.useState(!1),l=Object(o.a)(i,2),x=l[0],f=l[1],v=r.a.useState(!1),g=Object(o.a)(v,2),k=g[0],w=g[1],y=r.a.useState(""),T=Object(o.a)(y,2),S=T[0],I=T[1],C=r.a.useState("info"),A=Object(o.a)(C,2),D=A[0],E=A[1],N=r.a.useState("query"),F=Object(o.a)(N,2),P=F[0];F[1];r.a.useEffect((function(){h.a.defaults.params=Object(d.a)(Object(d.a)({},h.a.defaults.params),{},{useAccessTokenIn:P})}),[P]),r.a.useEffect((function(){var e=function(e){var a=e.axios,n=e.errStatusCode,r=e.redirectUrl;a.interceptors.response.use((function(e){return e}),function(){var e=Object(b.a)(u.a.mark((function e(c){var s,i,o,l,b,p,x,h,O;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(c.response),c.response.status!==n.refreshTokenExpires){e.next=4;break}return t.push(r),e.abrupt("return",Promise.reject(c));case 4:if(c.response.status!==n.accessTokenExpires){e.next=17;break}return e.next=7,a.post("/refreshToken",{returnAccessTokenBy:"body"});case 7:if(s=e.sent,i=s.data,o=i.success,l=i.accessToken,!o){e.next=17;break}return a.defaults.params=Object(d.a)(Object(d.a)({},a.defaults.params),{},{accessToken:l}),b=c.config,p=b.params,x=Object(j.a)(b,["params"]),h=Object(d.a)({params:Object(d.a)(Object(d.a)({},p),{},{accessToken:l})},x),e.next=15,a.request(h);case 15:return O=e.sent,e.abrupt("return",O);case 17:return e.abrupt("return",Promise.reject(c));case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}({axios:h.a,errStatusCode:{refreshTokenExpires:401,accessTokenExpires:499},redirectUrl:"/pages/login"});return h.a.get("/decodeToken").then((function(e){e.data&&setTimeout((function(){f(!0),s(!1)}),500)})).catch((function(e){setTimeout((function(){V({severity:"error",message:e.message}),f(!1),s(!1)}),500)})),function(){!function(e){h.a.interceptors.response.eject(e)}(e)}}),[]);var V=function(e){var t=e.message,a=e.severity;I(t),E(a),w(!0)};return Object(O.jsxs)("div",{children:[c?Object(O.jsx)(R,{open:c,message:"Check Authenticated.."}):Object(O.jsxs)(p.d,{children:[Object(O.jsx)(p.b,{exact:!0,path:"/",children:Object(O.jsx)(U,{showAlert:V,setTokenValid:f,useAccessTokenIn:P})}),Object(O.jsx)(p.b,{exact:!0,path:"/pages/login",children:Object(O.jsx)(U,{showAlert:V,setTokenValid:f,useAccessTokenIn:P})}),Object(O.jsx)(m,{tokenValid:x,setTokenValid:f,showAlert:V,path:"/pages/private/:resource",children:Object(O.jsx)(Q,{})})]}),Object(O.jsx)(_,{openAlert:k,setOpenAlert:w,alertMessage:S,severity:D})]})}function te(){return Object(O.jsx)(i.a,{children:Object(O.jsx)(ee,{})})}var ae=r.a.memo(te),ne=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,190)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(ae,{})}),document.getElementById("root")),ne()}},[[131,1,2]]]);
//# sourceMappingURL=main.6b43a706.chunk.js.map