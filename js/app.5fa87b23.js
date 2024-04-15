(function(){"use strict";var t={4752:function(t,e,r){r.r(e),r.d(e,{default:function(){return m}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container mt-4"},[e("div",{staticClass:"col-lg-6"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.editProduct.apply(null,arguments)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.newProduct.name,expression:"newProduct.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter a product name"},domProps:{value:t.newProduct.name},on:{input:function(e){e.target.composing||t.$set(t.newProduct,"name",e.target.value)}}}),e("br"),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newProduct.description,expression:"newProduct.description"}],staticClass:"form-control",attrs:{rows:"5",placeholder:"Enter product description"},domProps:{value:t.newProduct.description},on:{input:function(e){e.target.composing||t.$set(t.newProduct,"description",e.target.value)}}}),e("br"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newProduct.price,expression:"newProduct.price"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.newProduct.price},on:{input:function(e){e.target.composing||t.$set(t.newProduct,"price",e.target.value)}}}),e("button",{staticClass:"btn btn-warning mt-4"},[t._v("Edit Product")])])])])},n=[],s=(r(4114),r(2257)),o=r(8448),i=r(5462),c={data(){return{newProduct:{name:"",description:"",price:0}}},mixins:[o.T],async created(){try{const t=await s.A.get(`https://rutoll-assignment.onrender.com/api/get-product/${this.$route.params.id}`),e=t.data.product;this.newProduct={name:e.name,description:e.description,price:e.price}}catch(t){console.error("Error fetching product data:",t)}},methods:{async editProduct(){try{const e=JSON.parse(sessionStorage.getItem("authData")),r=e.token;try{const t=await s.A.put(`https://rutoll-assignment.onrender.com/api/edit-product/${this.$route.params.id}`,this.newProduct,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});console.log(t),i.A.set("productEdited","true"),this.$router.push(`/product/${this.$route.params.id}`)}catch(t){this.errorMessage("danger",t.response.data.error)}}catch(e){this.errorMessage("danger",e.message),console.error("Error updating product:",e)}}}},l=c,u=r(1656),d=(0,u.A)(l,a,n,!1,null,"65de1fca",null),m=d.exports},5001:function(t,e,r){var a=r(2856),n=function(){var t=this,e=t._self._c;return e("div",[e("NavBar"),e("router-view")],1)},s=[],o=function(){var t=this,e=t._self._c;return e("nav",{staticClass:"navbar navbar-expand-lg navbar-light",staticStyle:{"background-color":"#e3f2fd"}},[e("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[t._v("ProductApp")]),t._m(0),e("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarColor03"}},[e("ul",{staticClass:"navbar-nav mr-auto"},[e("li",{staticClass:"nav-item active"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[t._v("Home")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/create"}},[t._v("Create")])],1)]),e("div",[e("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isAuthenticated,expression:"!isAuthenticated"}],staticClass:"btn btn-outline-primary my-2 mx-2 my-sm-0",attrs:{type:"submit",to:"/login"}},[t._v(" Sign In ")]),e("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isAuthenticated,expression:"!isAuthenticated"}],staticClass:"btn btn-outline-primary my-2 my-sm-0",attrs:{type:"submit",to:"/auth"}},[t._v(" Sign Up ")]),t.isAuthenticated?e("button",{staticClass:"btn btn-outline-primary my-2 my-sm-0",attrs:{type:"submit"},on:{click:t.logout}},[t._v(" Log Out ")]):t._e()],1)])],1)},i=[function(){var t=this,e=t._self._c;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarColor03","aria-controls":"navbarColor03","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],c=(r(4114),r(8298)),l={name:"NavBar",mixins:[c.Q],methods:{logout(){sessionStorage.removeItem("authData"),this.$router.push("/"),location.reload()}}},u=l,d=r(1656),m=(0,d.A)(u,o,i,!1,null,"7067c029",null),p=m.exports,f={components:{NavBar:p}},v=f,h=(0,d.A)(v,n,s,!1,null,null,null),g=h.exports,b=r(1594),_=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container mt-5"},[t.email?e("h2",{staticClass:"text-center mb-2"},[t._v(" Welcome! You are logged in as "+t._s(t.email)+" ")]):t._e(),e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchItem,expression:"searchItem"}],staticClass:"form-control rounded",attrs:{type:"search",placeholder:"Search by product name","aria-label":"Search","aria-describedby":"search-addon"},domProps:{value:t.searchItem},on:{input:function(e){e.target.composing||(t.searchItem=e.target.value)}}})]),e("table",{staticClass:"table table-striped table-bordered table-hover mt-2"},[t._m(0),e("tbody",t._l(t.paginatedProducts,(function(r,a){return e("tr",{key:r.id,staticClass:"text-center"},[e("th",{attrs:{scope:"row"}},[t._v(t._s((t.currentPage-1)*t.pageSize+a+1))]),e("td",[t._v(t._s(r.name))]),e("td",[t._v(t._s(t.truncateDescription(r.description)))]),e("td",[t._v("$ "+t._s(r.price))]),e("RouterLink",{staticClass:"btn btn-secondary d-flex justify-content-center",attrs:{to:{name:"product",params:{id:r.id}}}},[t._v(" Details ")])],1)})),0)]),e("div",[e("ul",{staticClass:"pagination justify-content-center"},[e("li",{staticClass:"page-item",class:{disabled:1===t.currentPage}},[e("button",{staticClass:"page-link",on:{click:t.prevPage}},[t._v("«")])]),t._l(t.totalPages,(function(r){return e("li",{key:r,staticClass:"page-item"},[e("button",{staticClass:"page-link",on:{click:function(e){return t.goToPage(r)}}},[t._v(t._s(r))])])})),e("li",{staticClass:"page-item",class:{disabled:t.currentPage===t.totalPages}},[e("button",{staticClass:"page-link",on:{click:t.nextPage}},[t._v("»")])])],2)])])},y=[function(){var t=this,e=t._self._c;return e("thead",[e("tr",{staticClass:"text-center"},[e("th",{attrs:{scope:"col"}},[t._v("#")]),e("th",{attrs:{scope:"col"}},[t._v("Product Name")]),e("th",{attrs:{scope:"col"}},[t._v("Description")]),e("th",{attrs:{scope:"col"}},[t._v("Price")]),e("th",{attrs:{scope:"col"}},[t._v("More")])])])}],C=r(2257),w=r(8448),P={data(){return{products:[],email:"",searchItem:"",currentPage:1,pageSize:10}},mixins:[w.T],created(){const t=JSON.parse(sessionStorage.getItem("authData")),e=t.email;e&&(this.email=e)},computed:{filteredProducts(){if(this.searchItem){const t=this.searchItem.toLowerCase();return this.products.filter((e=>e.name.toLowerCase().includes(t)))}return this.products},paginatedProducts(){const t=(this.currentPage-1)*this.pageSize,e=t+this.pageSize;return this.filteredProducts.slice(t,e)},totalPages(){return Math.ceil(this.filteredProducts.length/this.pageSize)}},methods:{async getProducts(){try{const t=JSON.parse(sessionStorage.getItem("authData")),e=t.token,r=await C.A.get("https://rutoll-assignment.onrender.com/api/products",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});this.products=r.data.products}catch(t){this.errorMessage("danger",t.message),console.error("Error fetching products:",t)}},truncateDescription(t){const e=50;return t.length>e?t.slice(0,e)+"...":t},prevPage(){this.currentPage>1&&this.currentPage--},nextPage(){this.currentPage<this.totalPages&&this.currentPage++},goToPage(t){this.currentPage=t}},mounted(){document.title="Home",this.getProducts()}},x=P,k=(0,d.A)(x,_,y,!1,null,"8f45d3bc",null),S=k.exports,A=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container mt-5"},[e("form",{staticClass:"custom-form",on:{submit:function(e){return e.preventDefault(),t.submitLogin.apply(null,arguments)}}},[t._m(0),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"exampleInputEmail1"}},[t._v("Email address")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",attrs:{type:"email",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"exampleInputPassword1"}},[t._v("Password")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"form-control",attrs:{type:"password",id:"exampleInputPassword1",placeholder:"Password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})]),e("div",{staticClass:"form-group form-check"},[e("small",{staticClass:"form-text text-muted",attrs:{id:"emailHelp"}},[t._v("Not a member? "),e("router-link",{staticClass:"text-primary",attrs:{to:"/auth"}},[t._v("Sign up here")])],1)]),t._m(1)])])},E=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center"},[e("h1",[t._v("Login")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Submit")])])}],N={data(){return{form:{email:"",password:""}}},mounted(){document.title="Sign In",console.log("production")},mixins:[c.Q,w.T],methods:{async submitLogin(){try{const e=await C.A.post("https://rutoll-assignment.onrender.com/api/login",this.form);try{if(200===e.status){const{access_token:t,email:r}=e.data;sessionStorage.setItem("authData",JSON.stringify({token:t,email:r})),this.$router.push("/"),location.reload()}else this.authError("danger",e.data.error)}catch(t){console.log("err1",t),this.authError("danger",t)}}catch(t){this.authError("danger",t.response.data.error)}}}},I=N,$=(0,d.A)(I,A,E,!1,null,"d2f36aca",null),T=$.exports,O=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container mt-5"},[e("form",{staticClass:"custom-form",on:{submit:function(e){return e.preventDefault(),t.submitReg.apply(null,arguments)}}},[t._m(0),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"exampleInputEmail1"}},[t._v("Email address")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",attrs:{type:"email",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"exampleInputPassword1"}},[t._v("Password")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"form-control",attrs:{type:"password",id:"exampleInputPassword1",placeholder:"Password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})]),e("div",{staticClass:"form-group form-check"},[e("small",{staticClass:"form-text text-muted",attrs:{id:"emailHelp"}},[t._v("Already a member? "),e("router-link",{staticClass:"text-primary",attrs:{to:"/login"}},[t._v("Sign in here")])],1)]),t._m(1)])])},j=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center"},[e("h1",[t._v("Register")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Submit")])])}],D={data(){return{form:{email:"",password:""}}},mixins:[c.Q,w.T],mounted(){document.title="Sign Up"},methods:{async submitReg(){try{await C.A.post("https://rutoll-assignment.onrender.com/api/register",this.form,{headers:{"Content-Type":"application/json"}});this.$router.push("/login")}catch(t){this.errorMessage("danger",t.response.data.error)}}}},M=D,L=(0,d.A)(M,O,j,!1,null,"54edc4dd",null),H=L.exports,z=function(){var t=this;t._self._c;return t._m(0)},B=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"page-not-found"},[e("h1",{staticClass:"title"},[t._v("Page Not Found 404")])])}],F={name:"PageNotFound"},J=F,Q=(0,d.A)(J,z,B,!1,null,"4c2e5204",null),R=Q.exports;r(4752);a["default"].use(b.Ay);const q=[{path:"/",name:"home",component:S},{path:"/login",name:"login",component:T},{path:"/auth",name:"auth",component:H},{path:"/product/:id",name:"product",component:()=>r.e(566).then(r.bind(r,2566))},{path:"/create",name:"create",component:()=>r.e(206).then(r.bind(r,9206))},{path:"/edit/:id",name:"edit",component:()=>Promise.resolve().then(r.bind(r,4752)),meta:{requiresAuth:!0}},{path:"/404",component:R},{path:"*",redirect:"/404"}],U=new b.Ay({mode:"hash",base:"/rutoll-assignment/",routes:q});var Y=U,G=r(7278),W=r(7673),K=r(6658),V=r(6092);r(9313);a["default"].use(G.vGs),a["default"].use(W.YS),a["default"].use(K.Bf),a["default"].use(V.F),new a["default"]({router:Y,render:t=>t(g)}).$mount("#app")},8298:function(t,e,r){r.d(e,{Q:function(){return a}});const a={data(){return{isLoggedIn:!1}},computed:{isAuthenticated(){const t=JSON.parse(sessionStorage.getItem("authData"));return t&&""!==t.token}}}},8448:function(t,e,r){r.d(e,{T:function(){return a}});const a={methods:{errorMessage(t=null,e){this.$bvToast.toast(e,{title:"Error",variant:t,autoHideDelay:3e3,solid:!0})},authError(t=null,e){this.$bvToast.toast(e,{title:"Authentication Error",variant:t,autoHideDelay:5e3,solid:!0})},successMessage(t=null,e){this.$bvToast.toast(e,{title:"Success",variant:t,autoHideDelay:3e3,solid:!0})}}}}},e={};function r(a){var n=e[a];if(void 0!==n)return n.exports;var s=e[a]={exports:{}};return t[a].call(s.exports,s,s.exports,r),s.exports}r.m=t,function(){var t=[];r.O=function(e,a,n,s){if(!a){var o=1/0;for(u=0;u<t.length;u++){a=t[u][0],n=t[u][1],s=t[u][2];for(var i=!0,c=0;c<a.length;c++)(!1&s||o>=s)&&Object.keys(r.O).every((function(t){return r.O[t](a[c])}))?a.splice(c--,1):(i=!1,s<o&&(o=s));if(i){t.splice(u--,1);var l=n();void 0!==l&&(e=l)}}return e}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[a,n,s]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(e,a){return r.f[a](t,e),e}),[]))}}(),function(){r.u=function(t){return"js/"+t+"."+{206:"2f5514b4",566:"14449f84"}[t]+".js"}}(),function(){r.miniCssF=function(t){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="frontend:";r.l=function(a,n,s,o){if(t[a])t[a].push(n);else{var i,c;if(void 0!==s)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==e+s){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",e+s),i.src=a),t[a]=[n];var m=function(e,r){i.onerror=i.onload=null,clearTimeout(p);var n=t[a];if(delete t[a],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(t){return t(r)})),e)return e(r)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){r.p="/rutoll-assignment/"}(),function(){var t={524:0};r.f.j=function(e,a){var n=r.o(t,e)?t[e]:void 0;if(0!==n)if(n)a.push(n[2]);else{var s=new Promise((function(r,a){n=t[e]=[r,a]}));a.push(n[2]=s);var o=r.p+r.u(e),i=new Error,c=function(a){if(r.o(t,e)&&(n=t[e],0!==n&&(t[e]=void 0),n)){var s=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;i.message="Loading chunk "+e+" failed.\n("+s+": "+o+")",i.name="ChunkLoadError",i.type=s,i.request=o,n[1](i)}};r.l(o,c,"chunk-"+e,e)}},r.O.j=function(e){return 0===t[e]};var e=function(e,a){var n,s,o=a[0],i=a[1],c=a[2],l=0;if(o.some((function(e){return 0!==t[e]}))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(c)var u=c(r)}for(e&&e(a);l<o.length;l++)s=o[l],r.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return r.O(u)},a=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=r.O(void 0,[504],(function(){return r(5001)}));a=r.O(a)})();
//# sourceMappingURL=app.5fa87b23.js.map