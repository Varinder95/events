import{_ as v,r as u,o as g,c as b,a as o,b as s,t as r,w as a,m as f,h as w,v as I,n as e,j as x,e as y,d as c}from"./entry-5a75029a.mjs";import{F as R}from"./FooterOne-c0d6d65d.mjs";import{p as T,R as k}from"./RelatedSlider-e9549712.mjs";import{H as V}from"./HeaderFour-2a46882e.mjs";import"./swiper-slide-a88336df.mjs";const O={name:"app",mixins:[T],components:{FooterOne:R,RelatedSlider:k,HeaderFour:V},data(){return{value:1,id:this.$route.params.id,productItems:{}}},methods:{handleIncreaseValue(l){l==="valueOne"&&this.value++},handleDecreaseValue(l){l==="valueOne"&&this.value>0&&this.value--},getproductItems(l){this.productItems=this.productItemss.find(i=>i.id==l)}},created(){this.getproductItems(this.id)}},S={class:"container"},q={class:"row"},C={class:"col-xl-12"},F={class:"hero-course-1-text"},z={class:"course-title-breadcrumb"},D={class:"breadcrumb"},N={class:"breadcrumb-item"},H=c("Home"),M={class:"breadcrumb-item"},A={class:"shop-details_area pt-120 pb-15"},E={class:"container custome-container"},Y={class:"row"},B={class:"col-lg-4 col-md-12"},j={class:"product-details-img mb-30"},Q=["src"],K={class:"col-lg-6 col-md-12"},L={class:"product-side-info mb-30"},P={class:"product-name mb-10"},U={class:"product-price"},W=s("p",null,"Matent maecenas nec massa viverra aci ute litora aliquam habitant proin commodo bibendum rutru habitant est magnis quisque aliquet congue vesti bulum suscipi erose tellus odio elite purus feugiat prim libero senes nisie gravia",-1),G={class:"product-quantity-cart mb-25"},J={class:"product-quantity-form"},X={action:"#"},Z=s("i",{class:"far fa-minus"},null,-1),$=[Z],ss=s("i",{class:"far fa-plus"},null,-1),ts=[ss],es=c("Add to Cart"),os=c("Add to Wishlist"),is={class:"product__details__tag tagcloud mt-25 mb-10"},ns=s("span",null,"Tags : ",-1),as=c("App"),cs=c("Tips"),ls=c("Design"),rs=c("Science"),ds={class:"product_info-faq-area pb-95"},us={class:"container"},_s=s("nav",{class:"product-details-nav"},[s("div",{class:"nav nav-tabs",id:"nav-tab",role:"tablist"},[s("a",{class:"nav-item nav-link show active",id:"nav-general-tab","data-bs-toggle":"tab",href:"#nav-general",role:"tab","aria-selected":"true"},"Description"),s("a",{class:"nav-item nav-link",id:"nav-seller-tab","data-bs-toggle":"tab",href:"#nav-seller",role:"tab","aria-selected":"false"},"Reviews")])],-1),ms={class:"tab-content product-details-content",id:"nav-tabContent"},ps=s("div",{class:"tab-pane fade active show",id:"nav-general",role:"tabpanel"},[s("div",{class:"tabs-wrapper mt-35"},[s("div",{class:"product__details-des"},[s("p",null,"Very clean and organized with easy to follow tutorials, Exercises, and solutions. This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more complex concepts and ideas. This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great. Query handling can be improved.Overall very happy with the course.")])])],-1),hs={class:"tab-pane fade",id:"nav-seller",role:"tabpanel"},vs={class:"tabs-wrapper mt-35"},gs={class:"course-review-item mb-30"},bs=s("div",{class:"course-reviews-img"},[s("a",{href:"#"},[s("img",{src:"/img/course/course-reviews-1.png",alt:"image not found"})])],-1),fs={class:"course-review-list"},ws=s("h5",null,[s("a",{href:"#"},"Sotapdi Kunda")],-1),Is={class:"course-start-icon"},xs=s("span",null,"55 min ago",-1),ys=s("p",null,"Very clean and organized with easy to follow tutorials, Exercises, and solutions.This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more complex concepts and ideas.",-1),Rs={class:"course-review-item mb-30"},Ts=s("div",{class:"course-reviews-img"},[s("a",{href:"#"},[s("img",{src:"/img/course/course-reviews-2.png",alt:"image not found"})])],-1),ks={class:"course-review-list"},Vs=s("h5",null,[s("a",{href:"#"},"Samantha")],-1),Os={class:"course-start-icon"},Ss=s("span",null,"45 min ago",-1),qs=s("p",null,"The course is good at explaining very basic intuition of the concepts. It will get you scratching the surface so to say. where this course is unique is the implementation methods are so well defined Thank you to the team !.",-1),Cs={class:"course-review-item mb-30"},Fs=s("div",{class:"course-reviews-img"},[s("a",{href:"#"},[s("img",{src:"/img/course/course-reviews-3.png",alt:"image not found"})])],-1),zs={class:"course-review-list"},Ds=s("h5",null,[s("a",{href:"#"},"Michell Mariya")],-1),Ns={class:"course-start-icon"},Hs=s("span",null,"30 min ago",-1),Ms=s("p",null,"This course is amazing..! I started this course as a beginner and learnt a lot. Instructors are great. Query handling can be improved.Overall very happy with the course.",-1),As={class:"product__details-comment"},Es=s("div",{class:"comment-title mb-20"},[s("h3",null,"Add a review"),s("p",null,"Your email address will not be published. Required fields are marked *")],-1),Ys={class:"comment-rating mb-20"},Bs=s("span",null,"Overall ratings",-1),js={href:"#"},Qs={href:"#"},Ks={href:"#"},Ls={href:"#"},Ps={href:"#"},Us=x('<div class="comment-input-box mb-15"><form action="#"><div class="row"><div class="col-xxl-12"><textarea placeholder="Your review" class="comment-input comment-textarea mb-20"></textarea></div><div class="col-xxl-6"><div class="comment-input mb-20"><input type="text" placeholder="Your Name"></div></div><div class="col-xxl-6"><div class="comment-input mb-20"><input type="email" placeholder="Your Email"></div></div><div class="col-xxl-12"><div class="comment-submit"><button type="submit" class="edu-btn">Submit</button></div></div></div></form></div>',1);function Ws(l,i,Gs,Js,t,_){const m=u("HeaderFour"),n=y,p=u("RelatedSlider"),h=u("FooterOne");return g(),b("div",null,[o(m),s("div",{class:"hero-arera course-item-height",style:f({backgroundImage:"url(/img/slider/course-slider.jpg)"})},[s("div",S,[s("div",q,[s("div",C,[s("div",F,[s("h2",null,r(t.productItems.productTitle),1)]),s("div",z,[s("nav",null,[s("ol",D,[s("li",N,[o(n,{to:"/"},{default:a(()=>[H]),_:1})]),s("li",M,[s("span",null,r(t.productItems.productTitle),1)])])])])])])])],4),s("div",A,[s("div",E,[s("div",Y,[s("div",B,[s("div",j,[s("img",{src:t.productItems.productImage,alt:"product img"},null,8,Q)])]),s("div",K,[s("div",L,[s("h4",P,r(t.productItems.productTitle),1),s("span",U,r(t.productItems.productPrice),1),W,s("div",G,[s("div",J,[s("form",X,[s("button",{class:"cart-minus",type:"button",onClick:i[0]||(i[0]=d=>_.handleDecreaseValue("valueOne"))},$),w(s("input",{class:"cart-input",type:"text","onUpdate:modelValue":i[1]||(i[1]=d=>t.value=d)},null,512),[[I,t.value]]),s("button",{class:"cart-plus",type:"button",onClick:i[2]||(i[2]=d=>_.handleIncreaseValue("valueOne"))},ts)])]),o(n,{to:"/cart",class:"edu-btn"},{default:a(()=>[es]),_:1})]),o(n,{to:"/wishlist",class:"edu-border-btn"},{default:a(()=>[os]),_:1}),s("div",is,[ns,o(n,{to:"/shop"},{default:a(()=>[as]),_:1}),o(n,{to:"/shop"},{default:a(()=>[cs]),_:1}),o(n,{to:"/shop"},{default:a(()=>[ls]),_:1}),o(n,{to:"/shop"},{default:a(()=>[rs]),_:1})])])])])])]),s("div",ds,[s("div",us,[_s,s("div",ms,[ps,s("div",hs,[s("div",vs,[s("div",gs,[bs,s("div",fs,[ws,s("div",Is,[s("i",{class:e(t.productItems.productRating1)},null,2),s("i",{class:e(t.productItems.productRating2)},null,2),s("i",{class:e(t.productItems.productRating3)},null,2),s("i",{class:e(t.productItems.productRating4)},null,2),s("i",{class:e(t.productItems.productRating5)},null,2),xs]),ys])]),s("div",Rs,[Ts,s("div",ks,[Vs,s("div",Os,[s("i",{class:e(t.productItems.productRating1)},null,2),s("i",{class:e(t.productItems.productRating2)},null,2),s("i",{class:e(t.productItems.productRating3)},null,2),s("i",{class:e(t.productItems.productRating4)},null,2),s("i",{class:e(t.productItems.productRating5)},null,2),Ss]),qs])]),s("div",Cs,[Fs,s("div",zs,[Ds,s("div",Ns,[s("i",{class:e(t.productItems.productRating1)},null,2),s("i",{class:e(t.productItems.productRating2)},null,2),s("i",{class:e(t.productItems.productRating3)},null,2),s("i",{class:e(t.productItems.productRating4)},null,2),s("i",{class:e(t.productItems.productRating5)},null,2),Hs]),Ms])]),s("div",As,[Es,s("div",Ys,[Bs,s("ul",null,[s("li",null,[s("a",js,[s("i",{class:e(t.productItems.productRating1)},null,2)])]),s("li",null,[s("a",Qs,[s("i",{class:e(t.productItems.productRating2)},null,2)])]),s("li",null,[s("a",Ks,[s("i",{class:e(t.productItems.productRating3)},null,2)])]),s("li",null,[s("a",Ls,[s("i",{class:e(t.productItems.productRating4)},null,2)])]),s("li",null,[s("a",Ps,[s("i",{class:e(t.productItems.productRating5)},null,2)])])])]),Us])])])])])]),o(p),o(h)])}var et=v(O,[["render",Ws]]);export{et as default};
