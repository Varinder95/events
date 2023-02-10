<template>
   <!-- event-area-start -->
      <div class="event-ara pt-120 pb-90">
         <div class="container">
            <div class="row">
               <div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30">
                  <div class="section-title mb-20 text-center">
                     <h2>Upcoming <span class="down-mark-line">Events</span></h2>
                  </div>
               </div>
            </div>
            <div v-if="loaded" class="row">
               <div class="col-xl-8 col-lg-7">
                  <div class="single-item mb-30" v-for="data in getData.slice(0,4)" :key="data.id">
                     <div class="event_date f-left">
                        <div class="event_date_inner">
                           <h4>{{ data.startDate }}</h4>
                           <span>{{ data.endDate }}</span>
                        </div>
                     </div>
                     <div class="event_info">
                        <h3>
                           <NuxtLink :to="`/event-details/${data.id}`">{{ data.Name }}</NuxtLink>
                        </h3>
                        <div class="event-detalis d-flex align-items-center">
                           <div class="event-time mr-30 d-flex align-items-center">
                              <i class="flaticon-clock-1"></i>
                              <span>{{ data.Time }}</span>
                           </div>
                           <div class="event-location d-flex align-items-centere">
                              <i class="flaticon-pin"></i>
                              <span>{{ data.Location }}</span>
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
                        </div>
                     </div>
                     <div class="get-ticket-btn">
                        <NuxtLink class="get-btn" :to="`/event-details/${data.id}`">Show Details</NuxtLink>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-lg-5 col-md-8">
                  <div class="sidebar-widget-wrapper">
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
            <div v-else class="row">
               <h4 class="text-black">No Events Yet</h4>
            </div>
         </div>
      </div>
      <!-- event-area-end -->

</template>
<script>

import axios from 'axios';

export default {
   name: "UpcomingEventsDash",
   components: {},
    data() {
      return {
        getData:'',
        loaded: false,
      }
    },
    mounted() {
        this.getApprovedEvent()
    },
    methods: {
      async getApprovedEvent() {
        await axios.get('http://194.195.118.102:4000/events/getAllFiltered', {
            params: { approvalStatus : "Approved"}
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

<style scoped>
</style>
