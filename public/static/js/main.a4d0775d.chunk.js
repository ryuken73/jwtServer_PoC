(this.webpackJsonplogin=this.webpackJsonplogin||[]).push([[0],{100:function(e,t,a){},131:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),s=a.n(c),i=(a(100),a(32)),o=a(10),l=a(30),u=a.n(l),j=a(58),d=a(16),b=a(50),x=a(13),p=a(18),h=a.n(p),f=a(2);function O(e){console.log("AuthRoute re-render: ",e);var t=e.children,a=e.tokenValid,n=void 0!==a&&a,c=e.setTokenValid,s=void 0===c?function(){}:c,i=Object(j.a)(e,["children","tokenValid","setTokenValid"]);return r.a.useEffect((function(){h.a.get("/decodeToken").then((function(e){e.data&&s(!0)})).catch((function(e){console.log(e),s(!1)}))}),[s]),Object(f.jsx)(x.b,Object(d.a)(Object(d.a)({},i),{},{render:function(e){var a=e.location;return n?t:Object(f.jsx)(x.a,{to:{pathname:"/pages/login",state:{from:a}}})}}))}var m=r.a.memo(O);var v=a(189),g=a(179),k=a(174),w=a(182),y=a(177),T=a(185),S=a(172),I=a(180),C=a(183),A=a(176),D=a(80),E=a.n(D),F=a(82),N=a(169),P=a(173),V=a(187),z=Object(N.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}}));function R(e){var t=z(),a=e.open,n=e.setOpen,r=e.message;return Object(f.jsx)(V.a,{className:t.backdrop,open:a,onClick:function(){n(!1)},children:Object(f.jsx)(C.a,{children:r})})}function q(){return Object(f.jsxs)(F.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(f.jsx)(S.a,{color:"inherit",href:"https://material-ui.com/",children:"Your Website"})," ",(new Date).getFullYear(),"."]})}var B=Object(N.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),M=function(e){console.log("injectTokenQueryParamenter:",e),h.a.defaults.params=Object(d.a)(Object(d.a)({},h.a.defaults.params),{},{accessToken:e})};function W(e){var t=e.setTokenValid,a=e.showAlert,n=e.useAccessTokenIn,c=Object(x.g)(),s=B(),i=r.a.useState(""),l=Object(o.a)(i,2),u=l[0],j=l[1],d=r.a.useState(""),b=Object(o.a)(d,2),p=b[0],O=b[1],m=r.a.useState(10),D=Object(o.a)(m,2),N=D[0],V=D[1],z=r.a.useState(60),W=Object(o.a)(z,2),U=W[0],J=W[1],L=r.a.useState(!1),Y=Object(o.a)(L,2),H=Y[0],K=Y[1],Q="body",G={query:M,cookie:function(){},header:function(){}},X=function(e){console.log("submit:",u,p),K(!0),setTimeout((function(){h.a.post("/login",{username:u,password:p,expAccess:N,expRefresh:U,returnAccessTokenBy:Q}).then((function(e){console.log(e.data);var r=e.data,s=r.authenticated,i=r.errMsg;if(!0===s){var o=function(e){return e.data.accessToken}(e);return(0,G[n])(o),t(!0),c.push("/pages/private/portal"),K(!1),void a({severity:"success",message:"login success!"})}K(!1),a({severity:"error",message:i})})).catch((function(e){console.error(e),K(!1)}))}),1e3)};return Object(f.jsxs)(P.a,{component:"main",maxWidth:"xs",children:[Object(f.jsx)(k.a,{}),H&&Object(f.jsx)(R,{open:H,message:"Check Authenticated.."}),Object(f.jsxs)("div",{className:s.paper,children:[Object(f.jsx)(v.a,{className:s.avatar,children:Object(f.jsx)(E.a,{})}),Object(f.jsx)(F.a,{component:"h1",variant:"h5",children:"Sign in"}),Object(f.jsxs)("div",{className:s.div,noValidate:!0,children:[Object(f.jsx)(w.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,value:u,onChange:function(e){return j(e.target.value)}}),Object(f.jsx)(w.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:p,onChange:function(e){return O(e.target.value)},onKeyDown:function(e){13===e.keyCode&&X()}}),Object(f.jsx)(y.a,{control:Object(f.jsx)(T.a,{value:"remember",color:"primary"}),label:"Remember me"}),Object(f.jsx)(g.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:s.submit,onClick:X,children:"Sign In"}),Object(f.jsxs)(I.a,{container:!0,children:[Object(f.jsx)(I.a,{item:!0,xs:!0,children:Object(f.jsx)(S.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(f.jsx)(I.a,{item:!0,children:Object(f.jsx)(S.a,{href:"#",variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]}),Object(f.jsx)(A.a,{width:"90%",children:Object(f.jsxs)(C.a,{p:"10px",fontSize:"12px",mt:"10px",children:[Object(f.jsxs)(C.a,{display:"flex",alignItems:"center",width:"100%",children:[Object(f.jsx)(C.a,{width:"100%",children:"Access Token Expires in(sec)"}),Object(f.jsx)(C.a,{width:"100%",children:Object(f.jsx)(w.a,{variant:"outlined",size:"small",margin:"dense",value:N,onChange:function(e){console.log(e.target.value),""!==e.target.value?isNaN(parseInt(e.target.value))||V(parseInt(e.target.value)):V(0)}})})]}),Object(f.jsxs)(C.a,{display:"flex",alignItems:"center",width:"100%",children:[Object(f.jsx)(C.a,{width:"100%",children:"Refresh Token Expires in(sec)"}),Object(f.jsx)(C.a,{width:"100%",children:Object(f.jsx)(w.a,{variant:"outlined",size:"small",margin:"dense",value:U,onChange:function(e){console.log(e.target.value),""!==e.target.value?isNaN(parseInt(e.target.value))||J(parseInt(e.target.value)):J(0)}})})]})]})}),Object(f.jsx)(C.a,{mt:8,children:Object(f.jsx)(q,{})})]})}var U=r.a.memo(W),J=a(66);function L(){var e=u.a.mark(V),t=r.a.useState(100),a=Object(o.a)(t,2),n=a[0],c=a[1],s=r.a.useState("stopped"),i=Object(o.a)(s,2),l=i[0],j=i[1],x=r.a.useState(0),p=Object(o.a)(x,2),O=p[0],m=p[1],v=r.a.useState(0),k=Object(o.a)(v,2),y=k[0],T=k[1],S=r.a.useState(0),I=Object(o.a)(S,2),A=I[0],D=I[1],E=r.a.useState(0),F=Object(o.a)(E,2),N=F[0],P=F[1];function V(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(!(a<t)){e.next=7;break}return e.next=4,a;case 4:a+=1,e.next=1;break;case 7:case"end":return e.stop()}}),e)}var z=function(e){return h.a.get("/public/echo/".concat(e))},R=function(e){return h.a.get("/private/echo/".concat(e))},q=r.a.useCallback(Object(b.a)(u.a.mark((function e(){var t,a,r,c,s,i,o,l,d,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j("started"),t=V(n),a=Date.now(),m(0),D(0),r=!0,c=!1,e.prev=7,i=Object(J.a)(t);case 9:return e.next=11,i.next();case 11:return o=e.sent,r=o.done,e.next=15,o.value;case 15:if(l=e.sent,r){e.next=24;break}return d=l,e.next=20,z(d);case 20:D((function(e){return e+1}));case 21:r=!0,e.next=9;break;case 24:e.next=30;break;case 26:e.prev=26,e.t0=e.catch(7),c=!0,s=e.t0;case 30:if(e.prev=30,e.prev=31,r||null==i.return){e.next=35;break}return e.next=35,i.return();case 35:if(e.prev=35,!c){e.next=38;break}throw s;case 38:return e.finish(35);case 39:return e.finish(30);case 40:b=Date.now()-a,m(b),j("stopped");case 43:case"end":return e.stop()}}),e,null,[[7,26,30,40],[31,,35,39]])}))),[n]),B=r.a.useCallback(Object(b.a)(u.a.mark((function e(){var t,a,r,c,s,i,o,l,d,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j("started"),t=V(n),a=Date.now(),T(0),P(0),r=!0,c=!1,e.prev=7,i=Object(J.a)(t);case 9:return e.next=11,i.next();case 11:return o=e.sent,r=o.done,e.next=15,o.value;case 15:if(l=e.sent,r){e.next=24;break}return d=l,e.next=20,R(d);case 20:P((function(e){return e+1}));case 21:r=!0,e.next=9;break;case 24:e.next=30;break;case 26:e.prev=26,e.t0=e.catch(7),c=!0,s=e.t0;case 30:if(e.prev=30,e.prev=31,r||null==i.return){e.next=35;break}return e.next=35,i.return();case 35:if(e.prev=35,!c){e.next=38;break}throw s;case 38:return e.finish(35);case 39:return e.finish(30);case 40:b=Date.now()-a,T(b),j("stopped");case 43:case"end":return e.stop()}}),e,null,[[7,26,30,40],[31,,35,39]])}))),[n]),M=function(e){return Object(f.jsx)(g.a,Object(d.a)(Object(d.a)({disabled:"started"===l,variant:"contained",size:"small",color:"primary"},e),{},{children:e.children}))};return Object(f.jsxs)(C.a,{display:"flex",flexDirection:"column",m:"5px",children:[Object(f.jsx)(C.a,{children:Object(f.jsx)(w.a,{variant:"outlined",label:"request count",margin:"dense",size:"small",value:n,onChange:function(e){c(e.target.value)}})}),Object(f.jsxs)(C.a,{display:"flex",alignItems:"center",m:"5px",children:[Object(f.jsx)(C.a,{width:"100px",children:"Echo(Public)"}),Object(f.jsx)(M,{onClick:q,children:"Start"}),Object(f.jsxs)(C.a,{width:"auto",ml:"10px",children:["Result: ",(new Intl.NumberFormat).format(O)," msec   [",A,"]"]})]}),Object(f.jsxs)(C.a,{display:"flex",alignItems:"center",m:"5px",children:[Object(f.jsx)(C.a,{width:"100px",children:"Echo(Private)"}),Object(f.jsx)(M,{onClick:B,children:"Start"}),Object(f.jsxs)(C.a,{width:"auto",ml:"10px",children:["Result: ",(new Intl.NumberFormat).format(y)," msec   [",N,"]"]})]})]})}var Y=r.a.memo(L),H=a(181);function K(e){e.history;var t=Object(x.h)().resource,a=r.a.useState(!0),n=Object(o.a)(a,2),c=n[0],s=n[1],l=r.a.useState({}),u=Object(o.a)(l,2),j=u[0],d=u[1],b=r.a.useState({}),p=Object(o.a)(b,2),O=p[0],m=p[1],v=r.a.useState("calculating..."),g=Object(o.a)(v,2),k=g[0],w=g[1],y=r.a.useState("calculating..."),T=Object(o.a)(y,2),S=T[0],I=T[1];return r.a.useEffect((function(){var e;return h.a.get("/private").then((function(t){console.log(t);var a=t.data,n=a.refreshTokenDecoded,r=a.accessTokenDecoded,c=n.accessToken;n.accessToken=c.substr(1,10)+"..."+c.substr(c.length-5);var i=r.exp,o=n.exp;d(r),m(n),s(!1),e=setInterval((function(){var e=parseInt((1e3*i-Date.now())/1e3).toFixed(0);w(e<=0?"expired":e)}),1e3),setInterval((function(){var e=parseInt((1e3*o-Date.now())/1e3).toFixed(0);I(e<=0?"expired":e)}),1e3)})).catch((function(e){s(!1),console.log(e)})),function(){console.log("dismount Protected"),clearInterval(e)}}),[t]),Object(f.jsx)(C.a,{display:"flex",flexDirection:"column",m:"auto",mt:"80px",width:"40%",children:!1===c&&Object(f.jsxs)(r.a.Fragment,{children:[Object(f.jsxs)(C.a,{display:"flex",mb:"10px",children:[Object(f.jsxs)(C.a,{display:"flex",flexDirection:"column",width:"50%",m:"5px",children:[Object(f.jsxs)(C.a,{color:"expired"===k&&"red",mb:"5px",children:["Access Token: remains [",k,"]"]}),Object(f.jsx)(A.a,{elevation:3,children:Object.entries(j).map((function(e){var t=Object(o.a)(e,2),a=t[0],n=t[1];return Object(f.jsxs)(C.a,{p:"3px",display:"flex",children:[Object(f.jsxs)(C.a,{children:[a," :"]}),Object(f.jsx)(C.a,{children:n})]})}))})]}),Object(f.jsxs)(C.a,{display:"flex",flexDirection:"column",width:"50%",m:"5px",children:[Object(f.jsxs)(C.a,{color:"expired"===S&&"red",mb:"5px",children:["Refresh Token: remains [",S,"]"]}),Object(f.jsx)(A.a,{elevation:3,children:Object.entries(O).map((function(e){var t=Object(o.a)(e,2),a=t[0],n=t[1];return Object(f.jsxs)(C.a,{p:"3px",display:"flex",children:[Object(f.jsxs)(C.a,{children:[a," :"]}),Object(f.jsx)(C.a,{children:n})]})}))})]})]}),Object(f.jsx)(H.a,{}),Object(f.jsxs)(C.a,{fontSize:"30px",mt:"10px",children:[t," page"]}),Object(f.jsxs)(C.a,{display:"flex",children:[Object(f.jsx)(C.a,{m:"5px",children:Object(f.jsx)(i.b,{to:"/pages/private/portal",children:"Portal"})}),Object(f.jsx)(C.a,{m:"5px",children:Object(f.jsx)(i.b,{to:"/pages/private/mail",children:"Mail"})}),Object(f.jsx)(C.a,{m:"5px",children:Object(f.jsx)(i.b,{to:"/pages/private/userInfo",children:"UserInfo"})}),Object(f.jsx)(C.a,{m:"5px",children:Object(f.jsx)(i.b,{to:"/pages/private/benchmark",children:"Benchmark"})})]}),"benchmark"===t&&Object(f.jsx)(Y,{})]})})}var Q=r.a.memo(K),G=a(186),X=a(184);function Z(e){return Object(f.jsx)(X.a,Object(d.a)({elevation:6,variant:"filled"},e))}var $=Object(N.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function _(e){var t=$(),a=e.openAlert,n=e.setOpenAlert,r=e.severity,c=void 0===r?"info":r,s=e.alertMessage,i=void 0===s?"":s,o=function(e,t){"clickaway"!==t&&n(!1)};return Object(f.jsx)("div",{className:t.root,children:Object(f.jsx)(G.a,{open:a,autoHideDuration:3e3,onClose:o,children:Object(f.jsx)(Z,{severity:c,onClose:o,children:i})})})}function ee(e){console.log("App re-render:",e);var t=Object(x.g)(),a=r.a.useState(!0),n=Object(o.a)(a,2),c=n[0],s=n[1],i=r.a.useState(!1),l=Object(o.a)(i,2),p=l[0],O=l[1],v=r.a.useState(!1),g=Object(o.a)(v,2),k=g[0],w=g[1],y=r.a.useState(""),T=Object(o.a)(y,2),S=T[0],I=T[1],C=r.a.useState("info"),A=Object(o.a)(C,2),D=A[0],E=A[1],F=r.a.useState("query"),N=Object(o.a)(F,2),P=N[0];N[1];r.a.useEffect((function(){h.a.defaults.params=Object(d.a)(Object(d.a)({},h.a.defaults.params),{},{useAccessTokenIn:P})}),[P]),r.a.useEffect((function(){var e=function(e){var a=e.axios,n=e.errStatusCode,r=e.redirectUrl;a.interceptors.response.use((function(e){return console.log("### in intercepter:",e),e}),function(){var e=Object(b.a)(u.a.mark((function e(c){var s,i,o,l,b,x,p,h,f;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(c.response),c.response.status!==n.refreshTokenExpires){e.next=4;break}return t.push(r),e.abrupt("return",Promise.reject(c));case 4:if(c.response.status!==n.accessTokenExpires){e.next=17;break}return e.next=7,a.post("/refreshToken",{returnAccessTokenBy:"body"});case 7:if(s=e.sent,i=s.data,o=i.success,l=i.accessToken,!o){e.next=17;break}return a.defaults.params=Object(d.a)(Object(d.a)({},a.defaults.params),{},{accessToken:l}),b=c.config,x=b.params,p=Object(j.a)(b,["params"]),h=Object(d.a)({params:Object(d.a)(Object(d.a)({},x),{},{accessToken:l})},p),e.next=15,a.request(h);case 15:return f=e.sent,e.abrupt("return",f);case 17:return e.abrupt("return",Promise.reject(c));case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}({axios:h.a,errStatusCode:{refreshTokenExpires:401,accessTokenExpires:499},redirectUrl:"/pages/login"});return h.a.get("/decodeToken").then((function(e){var t=e.data.authenticated;console.log("#######:",e.data),!0===t?setTimeout((function(){console.log("##### setting token valid true"),O(!0),s(!1)}),500):setTimeout((function(){O(!1),s(!1)}),500)})).catch((function(e){setTimeout((function(){V({severity:"error",message:e.message}),O(!1),s(!1)}),500)})),function(){!function(e){h.a.interceptors.response.eject(e)}(e)}}),[]);var V=function(e){var t=e.message,a=e.severity;I(t),E(a),w(!0)};return Object(f.jsxs)("div",{children:[c?Object(f.jsx)(R,{open:c,message:"Check Authenticated.."}):Object(f.jsxs)(x.d,{children:[Object(f.jsx)(x.b,{exact:!0,path:"/",children:Object(f.jsx)(U,{showAlert:V,setTokenValid:O,useAccessTokenIn:P})}),Object(f.jsx)(x.b,{exact:!0,path:"/pages/login",children:Object(f.jsx)(U,{showAlert:V,setTokenValid:O,useAccessTokenIn:P})}),Object(f.jsx)(m,{tokenValid:p,setTokenValid:O,showAlert:V,path:"/pages/private/:resource",children:Object(f.jsx)(Q,{})})]}),Object(f.jsx)(_,{openAlert:k,setOpenAlert:w,alertMessage:S,severity:D})]})}function te(){return Object(f.jsx)(i.a,{children:Object(f.jsx)(ee,{})})}var ae=r.a.memo(te),ne=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,190)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};s.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(ae,{})}),document.getElementById("root")),ne()}},[[131,1,2]]]);
//# sourceMappingURL=main.a4d0775d.chunk.js.map