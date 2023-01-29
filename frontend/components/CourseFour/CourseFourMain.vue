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
   },
};
</script>

<template>
   <div>

      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- PageTitle-area-start -->
      <PageTitle pageTitle="Course 04" pageSubTitle="Course 04" />
      <!-- PageTitle-area-end -->

      <!-- course-bar-area-start -->
      <CourseBar />
      <!-- course-bar-area-end -->

      <!-- course-area-start -->
      <div class="course-content-area pb-90">
         <div class="container">
            <div class="row mb-10">
               <div class="col-xl-4 col-lg-4 col-md-8">
                  <ShopSidebar />
               </div>
               <div class="col-xl-8 col-lg-8 col-md-12">
                  <div class="row">
                     <div class="col-xl-6 col-lg-6 col-md-6" v-for="item in academicCourseItemss" :key="item.id">
                        <div class="academic-box mb-30">
                           <div class="academic-thumb">
                              <img :src="item.courseImage" alt="course-img" />
                           </div>
                           <div class="academic-content">
                              <div class="academic-content-header">
                                 <NuxtLink to="/course-details">
                                    <h3>{{ item.title }}</h3>
                                 </NuxtLink>
                              </div>
                              <div class="academic-body">
                                 <div class="academic-tutor d-flex align-items-center">
                                    <NuxtLink to="/instructor"><img :src="item.instructorImage" alt="tutor-img" />
                                    </NuxtLink>
                                    <NuxtLink to="/instructor"><span>{{ item.instructor }}</span></NuxtLink>
                                 </div>
                                 <p>{{ item.description }}</p>
                              </div>
                              <div class="academic-footer">
                                 <div class="coursee-clock">
                                    <i class="flaticon-clock"></i><span>{{ item.year }}</span>
                                 </div>
                                 <div class="course-creadit">
                                    <i class="flaticon-menu-1"></i><span>{{ item.credit }}</span>
                                 </div>
                                 <NuxtLink class="edo-course-sec-btn" to="/course-details">{{ item.btn }}
                                 </NuxtLink>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Pagination />
               </div>
            </div>
         </div>
      </div>
      <!-- course-area-end -->

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->
   </div>
</template>

<style scoped>
</style>
