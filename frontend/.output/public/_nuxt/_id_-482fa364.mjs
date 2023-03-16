import{_ as v,r as d,o as h,c as u,a as t,b as s,t as e,w as n,m as p,j as c,e as g,d as r}from"./entry-5a75029a.mjs";import{z as f}from"./zoomClassMixin-853870ec.mjs";import{F as w}from"./FooterOne-c0d6d65d.mjs";import{H as b}from"./HeaderFour-2a46882e.mjs";const z={name:"App",mixins:[f],data(){return{id:this.$route.params.id,zoomClass:{}}},methods:{getzoomClass(o){this.zoomClass=this.zoomClasss.find(a=>a.id==o)}},created(){this.getzoomClass(this.id)},components:{FooterOne:w,HeaderFour:b}},H={class:"container"},y={class:"row"},A={class:"col-xl-12"},C={class:"hero-course-1-text"},x={class:"course-title-breadcrumb"},R={class:"breadcrumb"},S={class:"breadcrumb-item"},k=r("Home"),T={class:"breadcrumb-item"},F={class:"zoom-class-detalis-area pt-120 pb-85"},P={class:"container"},D={class:"row"},L={class:"col-xl-8 col-lg-7"},j={class:"zoom-main-thumb w-img mb-30"},E=["src"],N={class:"zoom-main-content"},O={class:"content-main-heading"},V=s("a",{class:"category-color category-color-3",href:"#"},"Business",-1),B={class:"d-none"},M=c('<div class="contents-widget"><h4>Introduction</h4><p>There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links and sending better emails, Slava Shestopalov has a few tips on how to improve your website\u2019s experience while accessibility in mind.</p></div><div class="contents-widget"><h4>Objective:</h4><div class="objective-list"><ul><li>Exercise</li><li>Case Study</li><li>Role Play/ Simulation</li><li>Lecture Discussion and </li><li>Sharing/ Participatory</li></ul></div></div><div class="contents-widget mb-30"><h4>Contents of Class:</h4><ul><li>HR Audit: Concept</li><li>Objectives &amp; Purpose of Audit</li><li>Principles of Effective HR Auditing</li><li>Principles of Effective HR Auditing</li><li>Knowledge, Skills &amp; Attitude of an HR Auditor</li><li>Tasks of an HR Auditor</li><li>Types of HR Audit</li><li>HR Audit Tools</li><li>Steps/ Stages of HR Audit</li><li>Techniques of Auditing</li><li>Method of HR Audit</li><li>Documents for HR Audit</li><li>HR Audit Check List</li><li>Specific Task during HR Audit</li><li>HR Audit Report Preparation</li></ul></div>',3),I={class:"col-xl-4 col-lg-5"},J={class:"sidebar-widget-wrapper"},q={class:"sidebar-widget mb-30"},K={class:"sidebar-widget-details"},W=c('<div class="zoom-widget-tittle"><h4>Details</h4></div><div class="zoom-widget-list"><ul><li><div class="widget-detalis"><i class="flaticon-avatar"></i><span>Hosted by</span></div><div class="widget-list"><span>Junior Lucy</span></div></li><li><div class="widget-detalis"><i class="flaticon-calendar"></i><span>Date</span></div><div class="widget-list"><span>10 Jan 2022</span></div></li><li><div class="widget-detalis"><i class="flaticon-clock"></i><span>Schedule</span></div><div class="widget-list"><span>10 AM - 12 PM</span></div></li><li><div class="widget-detalis"><i class="flaticon-video-marketing"></i><span>Length</span></div><div class="widget-list"><span>2h 10m</span></div></li><li><div class="widget-detalis"><i class="flaticon-menu-2"></i><span>Category</span></div><div class="widget-list"><span>Data Science</span></div></li><li><div class="widget-detalis"><i class="flaticon-earth-grid-select-language-button"></i><span>Laguage</span></div><div class="widget-list"><span>English</span></div></li><li><div class="widget-detalis"><i class="flaticon-bookmark-white"></i><span>Hosted by</span></div><div class="widget-list"><span>Via Zoom</span></div></li></ul></div>',2),Z={class:"zoom-btn"},$=s("i",{class:"flaticon-video-camera"},null,-1),G=r("Join this class");function Q(o,a,U,X,i,Y){const m=d("HeaderFour"),l=g,_=d("FooterOne");return h(),u("div",null,[t(m),s("div",{class:"hero-arera course-item-height",style:p({backgroundImage:"url(/img/slider/course-slider.jpg)"})},[s("div",H,[s("div",y,[s("div",A,[s("div",C,[s("h2",null,e(i.zoomClass.zoomTitle),1)]),s("div",x,[s("nav",null,[s("ol",R,[s("li",S,[t(l,{to:"/"},{default:n(()=>[k]),_:1})]),s("li",T,[s("span",null,e(i.zoomClass.zoomTitle),1)])])])])])])])],4),s("div",F,[s("div",P,[s("div",D,[s("div",L,[s("div",j,[s("img",{src:i.zoomClass.zoomImage,alt:"zoom-tumb"},null,8,E)]),s("div",N,[s("div",O,[V,s("h2",B,e(i.zoomClass.zoomTitle),1)]),M])]),s("div",I,[s("div",J,[s("div",q,[s("div",K,[W,s("div",Z,[t(l,{class:"event-btn",to:"/zoom-class-details"},{default:n(()=>[$,G]),_:1})])])])])])])])]),t(_)])}var os=v(z,[["render",Q]]);export{os as default};
