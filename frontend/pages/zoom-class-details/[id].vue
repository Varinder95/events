<script>
import zoomClassMixin from '../../mixins/zoomClassMixin';
import FooterOne from '~~/components/Common/FooterOne.vue';
import HeaderFour from '~~/components/Common/HeaderFour.vue';

export default {
   name: "App",
   mixins: [zoomClassMixin],
   data() {
      return {
         id: this.$route.params.id,
         zoomClass: {},
      };
   },
   methods: {
      getzoomClass(zoomClassId) {
         this.zoomClass = this.zoomClasss.find((item) => item.id == zoomClassId);
      },
   },
   created() {
      this.getzoomClass(this.id);
   },
   components: { FooterOne, HeaderFour }
};
</script>

<template>
   <div>

      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- PageTitle-area-end -->
      <div class="hero-arera course-item-height" :style="{ backgroundImage: `url(/img/slider/course-slider.jpg)` }">
         <div class="container">
            <div class="row">
               <div class="col-xl-12">
                  <div class="hero-course-1-text">
                     <h2>{{ zoomClass.zoomTitle }}</h2>
                  </div>
                  <div class="course-title-breadcrumb">
                     <nav>
                        <ol class="breadcrumb">
                           <li class="breadcrumb-item">
                              <NuxtLink to="/">Home</NuxtLink>
                           </li>
                           <li class="breadcrumb-item"><span>{{ zoomClass.zoomTitle }}</span></li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- PageTitle-area-end -->

      <!-- zoom-details-area-start -->
      <div class="zoom-class-detalis-area pt-120 pb-85">
         <div class="container">
            <div class="row">
               <div class="col-xl-8 col-lg-7">
                  <div class="zoom-main-thumb w-img mb-30">
                     <img :src="zoomClass.zoomImage" alt="zoom-tumb">
                  </div>
                  <div class="zoom-main-content">
                     <div class="content-main-heading">
                        <a class="category-color category-color-3" href="#">Business</a>
                        <h2 class="d-none">{{ zoomClass.zoomTitle }}</h2>
                     </div>
                     <div class="contents-widget">
                        <h4>Introduction</h4>
                        <p>There are so many websites out there that have not considered the overall usability of their
                           visually impaired users. When it comes to designing better links and sending better emails,
                           Slava Shestopalov has a few tips on how to improve your website’s experience while
                           accessibility in mind.</p>
                     </div>
                     <div class="contents-widget">
                        <h4>Objective:</h4>
                        <div class="objective-list">
                           <ul>
                              <li>Exercise</li>
                              <li>Case Study</li>
                              <li>Role Play/ Simulation</li>
                              <li>Lecture Discussion and </li>
                              <li>Sharing/ Participatory</li>
                           </ul>
                        </div>
                     </div>
                     <div class="contents-widget mb-30">
                        <h4>Contents of Class:</h4>
                        <ul>
                           <li>HR Audit: Concept</li>
                           <li>Objectives & Purpose of Audit</li>
                           <li>Principles of Effective HR Auditing</li>
                           <li>Principles of Effective HR Auditing</li>
                           <li>Knowledge, Skills & Attitude of an HR Auditor</li>
                           <li>Tasks of an HR Auditor</li>
                           <li>Types of HR Audit</li>
                           <li>HR Audit Tools</li>
                           <li>Steps/ Stages of HR Audit</li>
                           <li>Techniques of Auditing</li>
                           <li>Method of HR Audit</li>
                           <li>Documents for HR Audit</li>
                           <li>HR Audit Check List</li>
                           <li>Specific Task during HR Audit</li>
                           <li>HR Audit Report Preparation</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-lg-5">
                  <div class="sidebar-widget-wrapper">
                     <div class="sidebar-widget mb-30">
                        <div class="sidebar-widget-details">
                           <div class="zoom-widget-tittle">
                              <h4>Details</h4>
                           </div>
                           <div class="zoom-widget-list">
                              <ul>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-avatar"></i>
                                       <span>Hosted by</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>Junior Lucy</span>
                                    </div>
                                 </li>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-calendar"></i>
                                       <span>Date</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>10 Jan 2022</span>
                                    </div>
                                 </li>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-clock"></i>
                                       <span>Schedule</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>10 AM - 12 PM</span>
                                    </div>
                                 </li>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-video-marketing"></i>
                                       <span>Length</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>2h 10m</span>
                                    </div>
                                 </li>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-menu-2"></i>
                                       <span>Category</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>Data Science</span>
                                    </div>
                                 </li>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-earth-grid-select-language-button"></i>
                                       <span>Laguage</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>English</span>
                                    </div>
                                 </li>
                                 <li>
                                    <div class="widget-detalis">
                                       <i class="flaticon-bookmark-white"></i>
                                       <span>Hosted by</span>
                                    </div>
                                    <div class="widget-list">
                                       <span>Via Zoom</span>
                                    </div>
                                 </li>
                              </ul>
                           </div>
                           <div class="zoom-btn">
                              <NuxtLink class="event-btn" to="/zoom-class-details"><i
                                    class="flaticon-video-camera"></i>Join this class</NuxtLink>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- zoom-details-area-end -->

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->
   </div>

</template>


