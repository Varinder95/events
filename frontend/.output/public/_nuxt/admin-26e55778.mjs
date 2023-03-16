import{a as d,F as y}from"./FooterOne-c0d6d65d.mjs";import{_,o as i,c as l,b as e,t as n,p as A,l as $,r,a}from"./entry-5a75029a.mjs";import{P as x}from"./PageTitle-fd4a499a.mjs";import{H as w}from"./HeaderFour-2a46882e.mjs";const S={name:"AdminTiles",data(){return{pendingCount:"",totalCount:"",featuredCount:"",userCount:"",adminCount:""}},methods:{async getEventCount(){await d.get("http://143.42.142.151:4000/events/getEventCount",{params:{approvalStatus:"Approved"}}).then(s=>{console.log(s.data.EventCount),this.totalCount=s.data.EventCount}).catch(s=>{s.response?(console.log(s.response.data),console.log(s.response.status),console.log(s.response.headers)):s.request?console.log(s.request):console.log("Error",s.message)})},async getPendingCount(){await d.get("http://143.42.142.151:4000/events/getEventCount",{params:{approvalStatus:"Pending"}}).then(s=>{console.log(s.data.EventCount),this.pendingCount=s.data.EventCount}).catch(s=>{s.response?(console.log(s.response.data),console.log(s.response.status),console.log(s.response.headers)):s.request?console.log(s.request):console.log("Error",s.message)})},async getFeaturedCount(){await d.get("http://143.42.142.151:4000/events/getEventCount",{params:{Featured:"Yes"}}).then(s=>{console.log(s.data.EventCount),this.featuredCount=s.data.EventCount}).catch(s=>{s.response?(console.log(s.response.data),console.log(s.response.status),console.log(s.response.headers)):s.request?console.log(s.request):console.log("Error",s.message)})}},beforeMount(){this.getEventCount(),this.getFeaturedCount(),this.getPendingCount()}},t=s=>(A("data-v-4f02f683"),s=s(),$(),s),E={class:"membership-area pt-110"},F={class:"container"},I={class:"row justify-content-center"},T=t(()=>e("div",{class:"col-xl-6 col-lg-6"},[e("div",{class:"section-title text-center mb-40"},[e("h2",null,"Administrator Actions")]),e("div",{class:"pricing-tab mb-60"},[e("ul",{class:"nav nav-tabs justify-content-center",id:"priceTab",role:"tablist"},[e("li",{class:"nav-item",role:"presentation"},[e("button",{class:"nav-link active",id:"events-tab","data-bs-toggle":"tab","data-bs-target":"#events",type:"button",role:"tab","aria-controls":"events","aria-selected":"true"},"Events")]),e("li",{class:"nav-item",role:"presentation"},[e("button",{class:"nav-link",id:"users-tab","data-bs-toggle":"tab","data-bs-target":"#users",type:"button",role:"tab","aria-controls":"users","aria-selected":"false"},"Users")])])])],-1)),k={class:"tab-content",id:"priceTabContent",style:{visibility:"visible","animation-delay":"0.5s","animation-name":"fadeInUp"}},P={class:"tab-pane fade active show",id:"events",role:"tabpanel","aria-labelledby":"events-tab"},j={class:"row"},q={class:"col-xl-4 col-lg-6 col-md-6"},M={class:"admin-tile mb-30"},U={class:"membership-info"},H=t(()=>e("h4",null,"Pending",-1)),O={class:"membership-price"},B=t(()=>e("p",null,"Events awaiting ",-1)),D=t(()=>e("a",{class:"membership-btn",href:"/pending"},"Show All",-1)),N={class:"col-xl-4 col-lg-6 col-md-6"},L={class:"admin-tile mb-30"},V={class:"membership-info"},J=t(()=>e("h4",null,"Featured",-1)),Y={class:"membership-price"},z=t(()=>e("p",null,"Set featured events (total 6) ",-1)),G=t(()=>e("a",{class:"membership-btn",href:"/pending"},"Set Featured",-1)),K={class:"col-xl-4 col-lg-6 col-md-6"},Q={class:"admin-tile mb-30"},R={class:"membership-info"},W=t(()=>e("h4",null,"Approved Events",-1)),X={class:"membership-price"},Z=t(()=>e("p",null,"All approved events ",-1)),ee=t(()=>e("a",{class:"membership-btn",href:"/approved"},"Show All",-1)),se={class:"tab-pane fade",id:"users",role:"tabpanel","aria-labelledby":"users-tab"},te={class:"row"},oe={class:"col-xl-6 col-lg-6 col-md-6"},ne={class:"admin-tile mb-30"},ae={class:"membership-info"},ie=t(()=>e("h4",null,"All Users",-1)),le={class:"membership-price"},ce=t(()=>e("p",null,"All users",-1)),de=t(()=>e("a",{class:"membership-btn",href:"#"},"Show All",-1)),re={class:"col-xl-6 col-lg-6 col-md-6"},_e={class:"admin-tile mb-30"},pe={class:"membership-info"},he=t(()=>e("h4",null,"Admin Users",-1)),ue={class:"membership-price"},me=t(()=>e("p",null,"All admin users",-1)),ve=t(()=>e("a",{class:"membership-btn",href:"#"},"Show All",-1));function ge(s,p,h,u,o,m){return i(),l("section",E,[e("div",F,[e("div",I,[T,e("div",k,[e("div",P,[e("div",j,[e("div",q,[e("div",M,[e("div",U,[H,e("div",O,[e("span",null,n(o.pendingCount),1),B])]),D])]),e("div",N,[e("div",L,[e("div",V,[J,e("div",Y,[e("span",null,n(o.featuredCount)+" / 6",1),z])]),G])]),e("div",K,[e("div",Q,[e("div",R,[W,e("div",X,[e("span",null,n(o.totalCount),1),Z])]),ee])])])]),e("div",se,[e("div",te,[e("div",oe,[e("div",ne,[e("div",ae,[ie,e("div",le,[e("span",null,n(o.userCount),1),ce])]),de])]),e("div",re,[e("div",_e,[e("div",pe,[he,e("div",ue,[e("span",null,n(o.adminCount),1),me])]),ve])])])])])])])])}var v=_(S,[["render",ge],["__scopeId","data-v-4f02f683"]]);const be={name:"AdminMain",components:{FooterOne:y,PageTitle:x,HeaderFour:w,AdminTiles:v},data(){return{loaded:!1}},beforeMount(){localStorage.loggedIn&&(this.loaded=localStorage.loggedIn)}},fe={key:0},Ce={class:"event-ara pt-120 pb-90"},ye={class:"container"},Ae={key:1,class:"d-flex min-vh-100 min-vw-100 justify-content-center"},$e=e("div",{class:"d-flex justify-content-center align-items-center"},[e("div",{class:"spinner-grow text-warning",role:"status"},[e("span",{class:"sr-only"},"Loading...")])],-1),xe=[$e];function we(s,p,h,u,o,m){const c=r("HeaderFour"),b=r("PageTitle"),f=v,C=r("FooterOne");return o.loaded?(i(),l("div",fe,[a(c),a(b,{pageTitle:"Admin Dashboard",pageSubTitle:"Admin"}),e("div",Ce,[e("div",ye,[a(f)])]),a(C)])):(i(),l("div",Ae,xe))}var g=_(be,[["render",we]]);const Se={name:"admin",components:{AdminMain:g},data(){return{loaded:!1}},mounted(){localStorage.getItem("loggedIn")?JSON.parse(localStorage.UserData).Status==="Admin"?this.loaded=!0:this.$router.replace("/dashboard"):this.$router.replace("/")}},Ee={key:0},Fe={key:1,class:"d-flex min-vh-100 min-vw-100 justify-content-center"},Ie=e("div",{class:"d-flex justify-content-center align-items-center"},[e("div",{class:"spinner-grow text-warning",role:"status"},[e("span",{class:"sr-only"},"Loading...")])],-1),Te=[Ie];function ke(s,p,h,u,o,m){const c=g;return o.loaded?(i(),l("div",Ee,[a(c)])):(i(),l("div",Fe,Te))}var Ue=_(Se,[["render",ke]]);export{Ue as default};