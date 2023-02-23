<template>
    <!-- event-area-start -->
       <div class="event-ara pt-120 pb-90">
          <div class="container">
             <div class="row">
                <div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-12 col-sm justify-content-center mb-30">
                   <div class="section-title mb-20 text-center">
                      <h2>Expired <span class="down-mark-line">Events</span></h2>
                   </div>
                </div>
             </div>
             <div v-if="loaded" class="row">
                <div class="col-xl-8 col-lg-7">
                   <div class="single-item mb-30" v-for="data in getData" :key="data.id">
                      <div class="event_date f-left">
                         <div class="event_date_inner">
                            <h4>{{ getDateFormat(data.startDate) }}</h4>
                            <span>{{ getDateFormat(data.endDate) }}</span>
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
                                     <input v-model="searchDate" type="date">
                                     <i class="flaticon-calendar"></i>
                                  </div>
                               </div>
                               <div class="find-event-wrapper mb-25">
                                  <div class="find-event-input">
                                     <select v-model="searchLocation" class="find-event-select">
                                        <option value="" disabled selected>Select State *</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                     </select>
                                     <i class="flaticon-pin-1"></i>
                                  </div>
                               </div>
                               <div class="find-event-wrapper mb-25">
                                  <div class="find-event-input">
                                     <input v-model="searchQuery" type="text" placeholder="Search keyword....">
                                     <i class="flaticon-search"></i>
                                  </div>
                               </div>
                            </div>
                            <div class="zoom-btn">
                               <NuxtLink :to="`/search/?find=${searchQuery}&location=${searchLocation}&date=${searchDate}`" class="event-btn">Find Event</NuxtLink>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div v-else class="row">
                <h4 class="text-black">No Expired Events</h4>
             </div>
          </div>
       </div>
       <!-- event-area-end -->
 
 </template>
 <script>
 
 import axios from 'axios';
 
 export default {
    name: "ExpiredEvents",
    components: {},
     data() {
       return {
         searchQuery: '',
         searchDate: '',
         searchLocation: '',
         getData:'',
         loaded: false,
       }
     },
     mounted() {
         this.getExpirededEvent()
     },
     methods: {
       async getExpirededEvent() {
          var dataQuery = {
             $and: [
                { approvalStatus : "Approved"},
                { endDate: {$lt: new Date()}}
             ]
          }
         await axios.get('http://127.0.0.1:4000/events/getAllFiltered', {
             params: dataQuery
         }).then((res) => {
             console.log(res)   
             this.getData = res.data.docs
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
       getDateFormat(dateValue) {
          var dateObj = new Date(dateValue)
          var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth()+1)).slice(-2)}/${dateObj.getFullYear()}`
          return formattedDate
       }
    } 
 };
 </script>
 
 <style scoped>
 .find-event-select {
    background: #fff;
    border: 0;
    border-radius: 4px;
    height: 55px;
    outline: none;
    padding: 0 20px;
 }
 </style>
 