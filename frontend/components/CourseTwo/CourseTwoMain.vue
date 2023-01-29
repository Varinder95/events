<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import Pagination from "../Common/Pagination.vue";
import CourseBar from "../Course/CourseBar.vue";
import ShopSidebar from "../Shop/ShopSidebar.vue";
import courseItemsMixin from "../../mixins/courseItemsMixin";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
   name: "app",
   mixins: [courseItemsMixin],
   components: {
      FooterOne,
      PageTitle,
      CourseBar,
      Pagination,
      ShopSidebar,
      HeaderFour
   }
};
</script>


<template>
   <div>
      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- PageTitle-area-start -->
      <PageTitle pageTitle="Courses 02" pageSubTitle="Courses 02" />
      <!-- PageTitle-area-end -->

      <!-- course-bar-area-start -->
      <CourseBar />
      <!-- course-bar-area-end -->

      <!-- course-area-start -->
      <section class="course-content-area pb-90">
         <div class="container">
            <div class="row mb-10">
               <div class="col-xl-3 col-lg-4 col-md-8">
                  <ShopSidebar />
               </div>
               <div class="col-xl-9 col-lg-8 col-md-12">
                  <div class="row pb-25">
                     <div class="col-xl-4 col-lg-6 col-md-6" v-for="item in courseItemss" :key="item.id">
                        <div class="protfolio-course-2-wrapper mb-30">
                           <div class="student-course-img">
                              <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage"
                                    alt="course-img"></NuxtLink>
                           </div>
                           <div class="course-cart">
                              <div class="course-info-wrapper">
                                 <div class="cart-info-body">
                                    <span :class="item.badgeClass">
                                       <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                                    </span>
                                    <NuxtLink :to="`/course-details/${item.id}`">
                                       <h3>{{ item.title }}</h3>
                                    </NuxtLink>
                                    <div class="cart-lavel">
                                       <h5>{{ item.level }} <span>{{ item.beginer }}</span></h5>
                                       <p>{{ item.description }}</p>
                                    </div>
                                    <div class="info-cart-text">
                                       <ul>
                                          <li v-for="itemTwo in item.infoList" :key="itemTwo.infoListTitle"><i
                                                class="far fa-check"></i>{{ itemTwo.infoListTitle }}</li>
                                       </ul>
                                    </div>
                                    <div class="course-action">
                                       <NuxtLink :to="`/course-details/${item.id}`" class="view-details-btn">
                                          {{ item.viewBtn }}</NuxtLink>
                                       <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                       <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i
                                             :class="item.shareIcon"></i></NuxtLink>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="portfolio-course-2-content">
                              <div class="portfolio-course-wrapper">
                                 <div class="portfolio-price">
                                    <span>{{ item.price }}</span>
                                    <del>{{ item.priceOld }}</del>
                                 </div>
                                 <div class="portfolio-course-2">
                                    <h3>
                                       <NuxtLink :to="`/course-details/${item.id}`">{{ item.courseTitle }}</NuxtLink>
                                    </h3>
                                 </div>
                                 <div class="course-icon">
                                    <i :class="item.productRating1"></i>
                                    <i :class="item.productRating2"></i>
                                    <i :class="item.productRating3"></i>
                                    <i :class="item.productRating4"></i>
                                    <i :class="item.productRating5"></i>
                                    <span>{{ item.rating }}</span>
                                 </div>
                              </div>
                           </div>
                           <div class="course-2-footer">
                              <div class="coursee-clock">
                                 <i class="flaticon-clock"></i><span>{{ item.clock }}</span>
                              </div>
                              <div class="course-creadit">
                                 <i class="flaticon-menu-1"></i><span>{{ item.credit }}</span>
                              </div>
                              <div class="course-network">
                                 <i class="fal fa-signal mr-10"></i><span>{{ item.network }}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Pagination />
               </div>
            </div>
         </div>
      </section>
      <!-- course-area-end -->

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->
   </div>

</template>

<style scoped>
</style>