<script>
import courseItemsMixin from "../../mixins/courseItemsMixin";

export default {
    name: "app",
    mixins:[courseItemsMixin],
};
</script>


<template>
    <section class="course-area p-relative pt-110 pb-90">
        <div class="course-shape-1">
            <img src="/img/shape/portfolio-shap-1.png" alt="shape">
        </div>
        <div class="course-shape-2">
            <img src="/img/shape/portfolio-shap-2.png" alt="shape">
        </div>
        <div class="course-shape-3">
            <img src="/img/shape/portfolio-shap-3.png" alt="shape">
        </div>
        <div class="container">
            <div class="row">
               <div class="col-xl-5 col-lg-5 f-left">
                  <div class="section-title mb-50">
                     <h2>Our<br>
                        Featured <span class="down-mark-line">Events</span></h2>
                  </div>
               </div>
               <div class="col-xl-7 col-lg-7">
                  <div class="portfolio-button mt-60">
                     <nav>
                        <div class="nav" id="nav-tab" role="tablist">
                           <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">View All <span class="port-red">[06]</span></button>
                           <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Indoor Sports <span class="port-red">[01]</span></button>
                           <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Outdoor Sports <span class="port-red">[03]</span></button>
                           <button class="nav-link" id="nav-contact-tabA" data-bs-toggle="tab" data-bs-target="#nav-contactA" type="button" role="tab" aria-controls="nav-contactA" aria-selected="false">Music <span class="port-red">[01]</span></button>
                           <button class="nav-link" id="nav-contact-tabB" data-bs-toggle="tab" data-bs-target="#nav-contactB" type="button" role="tab" aria-controls="nav-contactB" aria-selected="false">Other <span class="port-red">[01]</span></button>
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
            <div class="course-main-items">
               <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                     <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in courseItemss.slice(0,6)" :key="item.id">
                           <div class="eduman-course-main-wrapper mb-30">
                                 <div class="eduman-course-thumb w-img">
                                       <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage" alt="course-img"></NuxtLink>
                                 </div>
                                 <div class="course-cart">
                                    <div class="course-info-wrapper">
                                       <div class="cart-info-body">
                                          <span :class="item.badgeClass"><NuxtLink to="/course">{{item.badge}}</NuxtLink></span>
                                          <NuxtLink :to="`/course-details/${item.id}`"><h3>{{item.title}}</h3></NuxtLink>
                                          <div class="cart-lavel">
                                                <h5>{{item.level}} <span>{{item.beginer}}</span></h5>
                                                <p>{{item.description }}</p>
                                          </div>
                                          <div class="info-cart-text">
                                                <ul>
                                                   <li v-for="itemTwo in item.infoList" :key="itemTwo.infoListTitle"><i class="far fa-check"></i>{{itemTwo.infoListTitle}}</li>
                                                </ul>
                                          </div>
                                          <div class="course-action">
                                                <NuxtLink :to="`/course-details/${item.id}`" class="view-details-btn">{{item.viewBtn}}</NuxtLink>
                                                <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                                <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i :class="item.shareIcon"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-wraper">
                                    <div class="eduman-course-heading">
                                       <NuxtLink :class="item.badgeClass" to="/course">{{item.badge}}</NuxtLink>
                                       <span class="couse-star"><i class="fas fa-star"></i>4.9 (25)</span>
                                    </div>
                                    <div class="eduman-course-text">
                                       <h3><NuxtLink :to="`/course-details/${item.id}`">{{item.courseTitle}}</NuxtLink></h3>
                                    </div>
                                    <div class="eduman-course-meta">
                                       <div class="eduman-course-price">
                                          <span class="price-now">{{item.price}}</span>
                                          <del class="price-old">{{item.priceOld}}</del>
                                       </div>
                                       <div class="eduman-course-tutor">
                                          <NuxtLink to="/instructor"><img :src="item.instructorImage" alt="tutor-img"></NuxtLink>
                                          <NuxtLink to="/instructor"><span>{{item.instructor}}</span></NuxtLink>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-footer">
                                    <div class="course-lessson-svg">
                                       <i v-html="item.lessonIcon"></i>
                                       <span class="ms-2">{{item.lesson}}</span>
                                    </div>
                                    <div class="course-deteals-btn">
                                       <NuxtLink :to="`/course-details/${item.id}`"><span class="me-2">{{item.viewBtn}}</span><i class="far fa-arrow-right"></i></NuxtLink>
                                    </div>
                                 </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                     <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in courseItemss.slice(0,1)" :key="item.id">
                           <div class="eduman-course-main-wrapper mb-30">
                                 <div class="eduman-course-thumb w-img">
                                       <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage" alt="course-img"></NuxtLink>
                                 </div>
                                 <div class="course-cart">
                                    <div class="course-info-wrapper">
                                       <div class="cart-info-body">
                                          <span :class="item.badgeClass"><NuxtLink to="/course">{{item.badge}}</NuxtLink></span>
                                          <NuxtLink :to="`/course-details/${item.id}`"><h3>{{item.title}}</h3></NuxtLink>
                                          <div class="cart-lavel">
                                                <h5>{{item.level}} <span>{{item.beginer}}</span></h5>
                                                <p>{{item.description }}</p>
                                          </div>
                                          <div class="info-cart-text">
                                                <ul>
                                                   <li v-for="itemTwo in item.infoList" :key="itemTwo.infoListTitle"><i class="far fa-check"></i>{{itemTwo.infoListTitle}}</li>
                                                </ul>
                                          </div>
                                          <div class="course-action">
                                                <NuxtLink :to="`/course-details/${item.id}`" class="view-details-btn">{{item.viewBtn}}</NuxtLink>
                                                <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                                <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i :class="item.shareIcon"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-wraper">
                                    <div class="eduman-course-heading">
                                       <NuxtLink :class="item.badgeClass" to="/course">{{item.badge}}</NuxtLink>
                                       <span class="couse-star"><i class="fas fa-star"></i>4.9 (25)</span>
                                    </div>
                                    <div class="eduman-course-text">
                                       <h3><NuxtLink :to="`/course-details/${item.id}`">{{item.courseTitle}}</NuxtLink></h3>
                                    </div>
                                    <div class="eduman-course-meta">
                                       <div class="eduman-course-price">
                                          <span class="price-now">{{item.price}}</span>
                                          <del class="price-old">{{item.priceOld}}</del>
                                       </div>
                                       <div class="eduman-course-tutor">
                                          <NuxtLink to="/instructor"><img :src="item.instructorImage" alt="tutor-img"></NuxtLink>
                                          <NuxtLink to="/instructor"><span>{{item.instructor}}</span></NuxtLink>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-footer">
                                    <div class="course-lessson-svg">
                                       <i v-html="item.lessonIcon"></i>
                                       <span class="ms-2">{{item.lesson}}</span>
                                    </div>
                                    <div class="course-deteals-btn">
                                       <NuxtLink :to="`/course-details/${item.id}`"><span class="me-2">{{item.viewBtn}}</span><i class="far fa-arrow-right"></i></NuxtLink>
                                    </div>
                                 </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                     <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in courseItemss.slice(1,4)" :key="item.id">
                           <div class="eduman-course-main-wrapper mb-30">
                                 <div class="eduman-course-thumb w-img">
                                       <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage" alt="course-img"></NuxtLink>
                                 </div>
                                 <div class="course-cart">
                                    <div class="course-info-wrapper">
                                       <div class="cart-info-body">
                                          <span :class="item.badgeClass"><NuxtLink to="/course">{{item.badge}}</NuxtLink></span>
                                          <NuxtLink :to="`/course-details/${item.id}`"><h3>{{item.title}}</h3></NuxtLink>
                                          <div class="cart-lavel">
                                                <h5>{{item.level}} <span>{{item.beginer}}</span></h5>
                                                <p>{{item.description }}</p>
                                          </div>
                                          <div class="info-cart-text">
                                                <ul>
                                                   <li v-for="itemTwo in item.infoList" :key="itemTwo.infoListTitle"><i class="far fa-check"></i>{{itemTwo.infoListTitle}}</li>
                                                </ul>
                                          </div>
                                          <div class="course-action">
                                                <NuxtLink :to="`/course-details/${item.id}`" class="view-details-btn">{{item.viewBtn}}</NuxtLink>
                                                <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                                <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i :class="item.shareIcon"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-wraper">
                                    <div class="eduman-course-heading">
                                       <NuxtLink :class="item.badgeClass" to="/course">{{item.badge}}</NuxtLink>
                                       <span class="couse-star"><i class="fas fa-star"></i>4.9 (25)</span>
                                    </div>
                                    <div class="eduman-course-text">
                                       <h3><NuxtLink :to="`/course-details/${item.id}`">{{item.courseTitle}}</NuxtLink></h3>
                                    </div>
                                    <div class="eduman-course-meta">
                                       <div class="eduman-course-price">
                                          <span class="price-now">{{item.price}}</span>
                                          <del class="price-old">{{item.priceOld}}</del>
                                       </div>
                                       <div class="eduman-course-tutor">
                                          <NuxtLink to="/instructor-profile"><img :src="item.instructorImage" alt="tutor-img"></NuxtLink>
                                          <NuxtLink to="/instructor-profile"><span>{{item.instructor}}</span></NuxtLink>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-footer">
                                    <div class="course-lessson-svg">
                                       <i v-html="item.lessonIcon"></i>
                                       <span class="ms-2">{{item.lesson}}</span>
                                    </div>
                                    <div class="course-deteals-btn">
                                       <NuxtLink :to="`/course-details/${item.id}`"><span class="me-2">{{item.viewBtn}}</span><i class="far fa-arrow-right"></i></NuxtLink>
                                    </div>
                                 </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="tab-pane fade" id="nav-contactA" role="tabpanel" aria-labelledby="nav-contact-tabA">
                     <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in courseItemss.slice(4,5)" :key="item.id">
                           <div class="eduman-course-main-wrapper mb-30">
                                 <div class="eduman-course-thumb w-img">
                                       <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage" alt="course-img"></NuxtLink>
                                 </div>
                                 <div class="course-cart">
                                    <div class="course-info-wrapper">
                                       <div class="cart-info-body">
                                          <span :class="item.badgeClass"><NuxtLink to="/course">{{item.badge}}</NuxtLink></span>
                                          <NuxtLink :to="`/course-details/${item.id}`"><h3>{{item.title}}</h3></NuxtLink>
                                          <div class="cart-lavel">
                                                <h5>{{item.level}} <span>{{item.beginer}}</span></h5>
                                                <p>{{item.description }}</p>
                                          </div>
                                          <div class="info-cart-text">
                                                <ul>
                                                   <li v-for="itemTwo in item.infoList" :key="itemTwo.infoListTitle"><i class="far fa-check"></i>{{itemTwo.infoListTitle}}</li>
                                                </ul>
                                          </div>
                                          <div class="course-action">
                                                <NuxtLink :to="`/course-details/${item.id}`" class="view-details-btn">{{item.viewBtn}}</NuxtLink>
                                                <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                                <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i :class="item.shareIcon"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-wraper">
                                    <div class="eduman-course-heading">
                                       <NuxtLink :class="item.badgeClass" to="/course">{{item.badge}}</NuxtLink>
                                       <span class="couse-star"><i class="fas fa-star"></i>4.9 (25)</span>
                                    </div>
                                    <div class="eduman-course-text">
                                       <h3><NuxtLink :to="`/course-details/${item.id}`">{{item.courseTitle}}</NuxtLink></h3>
                                    </div>
                                    <div class="eduman-course-meta">
                                       <div class="eduman-course-price">
                                          <span class="price-now">{{item.price}}</span>
                                          <del class="price-old">{{item.priceOld}}</del>
                                       </div>
                                       <div class="eduman-course-tutor">
                                          <NuxtLink to="/instructor"><img :src="item.instructorImage" alt="tutor-img"></NuxtLink>
                                          <NuxtLink to="/instructor"><span>{{item.instructor}}</span></NuxtLink>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-footer">
                                    <div class="course-lessson-svg">
                                       <i v-html="item.lessonIcon"></i>
                                       <span class="ms-2">{{item.lesson}}</span>
                                    </div>
                                    <div class="course-deteals-btn">
                                       <NuxtLink :to="`/course-details/${item.id}`"><span class="me-2">{{item.viewBtn}}</span><i class="far fa-arrow-right"></i></NuxtLink>
                                    </div>
                                 </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="tab-pane fade" id="nav-contactB" role="tabpanel" aria-labelledby="nav-contact-tabB">
                     <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in courseItemss.slice(5,6)" :key="item.id">
                           <div class="eduman-course-main-wrapper mb-30">
                                 <div class="eduman-course-thumb w-img">
                                       <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage" alt="course-img"></NuxtLink>
                                 </div>
                                 <div class="course-cart">
                                    <div class="course-info-wrapper">
                                       <div class="cart-info-body">
                                          <span :class="item.badgeClass"><NuxtLink to="/course">{{item.badge}}</NuxtLink></span>
                                          <NuxtLink :to="`/course-details/${item.id}`"><h3>{{item.title}}</h3></NuxtLink>
                                          <div class="cart-lavel">
                                                <h5>{{item.level}} <span>{{item.beginer}}</span></h5>
                                                <p>{{item.description }}</p>
                                          </div>
                                          <div class="info-cart-text">
                                                <ul>
                                                   <li v-for="itemTwo in item.infoList" :key="itemTwo.infoListTitle"><i class="far fa-check"></i>{{itemTwo.infoListTitle}}</li>
                                                </ul>
                                          </div>
                                          <div class="course-action">
                                                <NuxtLink :to="`/course-details/${item.id}`" class="view-details-btn">{{item.viewBtn}}</NuxtLink>
                                                <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                                <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i :class="item.shareIcon"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-wraper">
                                    <div class="eduman-course-heading">
                                       <NuxtLink :class="item.badgeClass" to="/course">{{item.badge}}</NuxtLink>
                                       <span class="couse-star"><i class="fas fa-star"></i>4.9 (25)</span>
                                    </div>
                                    <div class="eduman-course-text">
                                       <h3><NuxtLink :to="`/course-details/${item.id}`">{{item.courseTitle}}</NuxtLink></h3>
                                    </div>
                                    <div class="eduman-course-meta">
                                       <div class="eduman-course-price">
                                          <span class="price-now">{{item.price}}</span>
                                          <del class="price-old">{{item.priceOld}}</del>
                                       </div>
                                       <div class="eduman-course-tutor">
                                          <NuxtLink to="/instructor"><img :src="item.instructorImage" alt="tutor-img"></NuxtLink>
                                          <NuxtLink to="/instructor"><span>{{item.instructor}}</span></NuxtLink>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-footer">
                                    <div class="course-lessson-svg">
                                       <i v-html="item.lessonIcon"></i>
                                       <span class="ms-2">{{item.lesson}}</span>
                                    </div>
                                    <div class="course-deteals-btn">
                                       <NuxtLink :to="`/course-details/${item.id}`"><span class="me-2">{{item.viewBtn}}</span><i class="far fa-arrow-right"></i></NuxtLink>
                                    </div>
                                 </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
    </section>
</template>