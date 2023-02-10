<script>
import axios from "axios";

export default {
    name: "app",
    data() {
      return {
        getData:'',
        loaded: false,
      }
    },
    mounted() {
        this.getFeaturedEvent()
    },
    methods: {
      async getFeaturedEvent() {
        await axios.get('http://194.195.118.102:4000/events/getAllFiltered', {
            params: { Featured : "Yes"}
        }).then((res) => {
            console.log(res)   
            this.getData = res.data
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
         if((this.getData).length !== 0) {
               this.loaded = true
         }
      },
   } 
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
                           <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">View All </button>
                           <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Indoor Sports </button>
                           <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Outdoor Sports </button>
                           <button class="nav-link" id="nav-contact-tabB" data-bs-toggle="tab" data-bs-target="#nav-contactB" type="button" role="tab" aria-controls="nav-contactB" aria-selected="false">Other </button>
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
            <div class="course-main-items">
               <div class="tab-content" id="nav-tabContent">
                  <div v-if="loaded" class="tab-pane fade show active">
                     <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6" v-for="data in getData" :key="data.id">
                           <div class="eduman-course-main-wrapper mb-30">
                                 <div class="eduman-course-thumb w-img">
                                       <NuxtLink :to="`/event-details/${data.id}`"><img src="/img/course/course-01.jpg" alt="course-img"></NuxtLink>
                                 </div>
                                 <div class="course-cart">
                                    <div class="course-info-wrapper">
                                       <div class="cart-info-body">
                                          <span class="category-color category-color-1"><NuxtLink to="/event">{{data.Category}}</NuxtLink></span>
                                          <NuxtLink :to="`/event-details/${data.id}`"><h3>{{data.Name}}</h3></NuxtLink>
                                          <div class="cart-lavel">
                                                <h5>Sport - <span>{{data.Sport}}</span></h5>
                                                <p>{{data.Description }}</p>
                                          </div>
                                          <div class="info-cart-text">
                                                <ul>
                                                   <li><i class="fa-sharp fa-solid fa-calendar-days"></i><span class="fw-bold">Start Date :</span> {{data.startDate}}</li>
                                                   <li><i class="fa-sharp fa-solid fa-calendar-days"></i><span class="fw-bold">End Date :</span> {{data.endDate}}</li>
                                                   <li><i class="fa-solid fa-clock"></i><span class="fw-bold">Time :</span> {{data.Time}}</li>
                                                </ul>
                                          </div>
                                          <div class="course-action">
                                                <NuxtLink :to="`/event-details/${data.id}`" class="view-details-btn">View Details</NuxtLink>
                                                <NuxtLink class="c-share-btn"><i class="flaticon-previous"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-wraper">
                                    <div class="eduman-course-heading">
                                       <NuxtLink class="category-color category-color-1" to="/event">{{data.Sport}}</NuxtLink>
                                    </div>
                                    <div class="eduman-course-text">
                                       <h3><NuxtLink :to="`/event-details/${data.id}`">{{data.Name}}</NuxtLink></h3>
                                    </div>
                                    <div class="eduman-course-meta mt-10">
                                       <div class="eduman-course-price row">
                                          <h4 class="fw-bold col-md-6">Entry Fees : </h4><span class="price-now col-md-6">{{data.entryFee}}/-</span>
                                       </div>
                                       <div class="eduman-course-tutor">
                                          <NuxtLink to="#"><span class="text-capitalize">{{data.createdByFName}}</span> <span class="text-capitalize">{{data.createdByLName}}</span></NuxtLink>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="eduman-course-footer">
                                    <div class="course-deteals-btn">
                                       <NuxtLink :to="`/event-details/${data.id}`"><span class="me-2">View Details</span><i class="far fa-arrow-right"></i></NuxtLink>
                                    </div>
                                 </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div v-else class="flex container">
                     <div class="row">
                        <h4>No Featured events yet</h4>
                     </div>
                  </div>
               </div>
            </div>
        </div>
    </section>
</template>