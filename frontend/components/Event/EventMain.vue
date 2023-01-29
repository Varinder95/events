<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
   name: "app",
   components: {
      FooterOne,
      PageTitle,
      HeaderFour
   },
   data() {
      return {
         eventList: [{
            id: 1,
            eventDay: '10',
            eventMonth: 'Jan 2022',
            eventTime: '10:30 AM',
            eventTitle: 'Education Autumn Tour Conference',
            eventLocation: 'Zeoyan Stadium, London',
            eventAudience: '+55 Audience have joined',
            eventBtn: 'Get ticket',
         },
         {
            id: 2,
            eventDay: '18',
            eventMonth: 'Jan 2022',
            eventTime: '11:30 AM',
            eventTitle: 'General ideas of Land Management System',
            eventLocation: 'Zeoyan Stadium, London',
            eventAudience: '+59 Audience have joined',
            eventBtn: 'Get ticket',
         },
         {
            id: 3,
            eventDay: '22',
            eventMonth: 'Jan 2022',
            eventTime: '09:30 AM',
            eventTitle: 'Discussion on Data Science PowerPoint',
            eventLocation: 'Zeoyan Stadium, London',
            eventAudience: '+48 Audience have joined',
            eventBtn: 'Get ticket',
         },
         {
            id: 4,
            eventDay: '16',
            eventMonth: 'Jan 2022',
            eventTime: '08:30 AM',
            eventTitle: 'Foundations of Global Health',
            eventLocation: 'Zeoyan Stadium, London',
            eventAudience: '+45 Audience have joined',
            eventBtn: 'Get ticket',
         }
         ],
        loggedIn: false,
        loaded: false
      }
    },
    mounted() {
        if (localStorage.loggedIn) {
        this.loggedIn = localStorage.loggedIn;
        }
        this.loaded = true
    }
};
</script>

<template>
   <div v-if="loaded">

      <!-- header-area-start -->
      <HeaderFour :isLoggedIn="loggedIn" />
      <!-- header-area-end -->

      <!-- PageTitle-area-end -->
      <PageTitle pageTitle="Upcoming Event" pageSubTitle="Upcoming Event" />
      <!-- PageTitle-area-end -->

      <!-- event-area-start -->
      <div class="event-ara pt-120 pb-90">
         <div class="container">
            <div class="row">
               <div class="col-xl-8 col-lg-7">
                  <div class="single-item mb-30" v-for="item in eventList" :key="item.id">
                     <div class="event_date f-left">
                        <div class="event_date_inner">
                           <h4>{{ item.eventDay }}</h4>
                           <span>{{ item.eventMonth }}</span>
                        </div>
                     </div>
                     <div class="event_info">
                        <h3>
                           <NuxtLink to="/event-details">{{ item.eventTitle }}</NuxtLink>
                        </h3>
                        <div class="event-detalis d-flex align-items-center">
                           <div class="event-time mr-30 d-flex align-items-center">
                              <i class="flaticon-clock-1"></i>
                              <span>{{ item.eventTime }}</span>
                           </div>
                           <div class="event-location d-flex align-items-centere">
                              <i class="flaticon-pin"></i>
                              <span>{{ item.eventLocation }}</span>
                           </div>
                        </div>
                        <div class="event-aduence d-flex align-items-center">
                           <div class="aduence-thumb">
                              <img src="/img/event/event-01.png" alt="event-thumb">
                              <img src="/img/event/event-02.png" alt="event-thumb">
                              <img src="/img/event/event-03.png" alt="event-thumb">
                              <img src="/img/event/event-04.png" alt="event-thumb">
                              <img src="/img/event/event-05.png" alt="event-thumb">
                           </div>
                           <div class="adence-info">
                              <span>{{ item.eventAudience }}</span>
                           </div>
                        </div>
                     </div>
                     <div class="get-ticket-btn">
                        <a class="get-btn" href="#">{{ item.eventBtn }}</a>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-lg-5 col-md-8">
                  <div class="sidebar-widget-wrapper">
                     <div class="sidebar-widget mb-30">
                        <div class="event-wrapper">
                           <div class="event-select">
                              <select>
                                 <option value="volvo">All Events</option>
                                 <option value="saab">This Month</option>
                                 <option value="opel">Next Month</option>
                                 <option value="audi">This Year</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="side-bar-widget mb-30">
                        <div class="event-sidebar">
                           <div class="find-event">
                              <div class="find-event-info">
                                 <h4>Find Events</h4>
                              </div>
                              <div class="find-event-wrapper mb-25">
                                 <div class="find-event-input">
                                    <input type="date">
                                    <i class="flaticon-calendar"></i>
                                 </div>
                              </div>
                              <div class="find-event-wrapper mb-25">
                                 <div class="find-event-input">
                                    <input type="text" placeholder="Location">
                                    <i class="flaticon-pin-1"></i>
                                 </div>
                              </div>
                              <div class="find-event-wrapper mb-25">
                                 <div class="find-event-input">
                                    <input type="text" placeholder="Search keyword....">
                                    <i class="flaticon-search"></i>
                                 </div>
                              </div>
                           </div>
                           <div class="zoom-btn">
                              <NuxtLink to="/event" class="event-btn">Find Event</NuxtLink>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- event-area-end -->

      <!-- education-area-end -->
      <FooterOne />
      <!-- education-area-end -->

   </div>
   <div v-else class="d-flex min-vh-100 min-vw-100 justify-content-center">
       <div class="d-flex justify-content-center  align-items-center">
           <div class="spinner-grow text-warning" role="status">
               <span class="sr-only">Loading...</span>
           </div>
       </div>
   </div>

</template>

<style scoped>
</style>
