<script>
import axios from 'axios';
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
   name: "app",
   props: {
      eventId: {
         type: String,
         default: ''
      },
   },
   data() {
      return{
         loggedIn: false,
         eventData: '',
         loaded: false,
         selfUpload: false,
         isAdmin: false,
         isApproved: false,
         isFeatured: false,
         status: ''
      }
   },
   components: {
      FooterOne,
      PageTitle,
      HeaderFour
   },
   beforeMount() {
      this.getEventDetails()
      if (localStorage.loggedIn) {
         this.loggedIn = localStorage.loggedIn;
         if(JSON.parse(localStorage.UserData).Status === "Admin") {
             this.isAdmin = true
         }
      }
   },
   methods: {
      async getEventDetails() {
        await axios.get('http://127.0.0.1:4000/events/getEventById', {
            params: { Id: this.eventId }
        }).then((res) => {
            console.log(res)   
            this.eventData = res.data
            if(JSON.parse(localStorage.UserData).id === this.eventData.createdById){
               this.selfUpload = true
            }
            if(this.eventData.approvalStatus === "Approved") {
                this.isApproved = true
            }
            if(this.eventData.Featured === "Yes") {
                this.isFeatured = true
            }
            const currentDate = new Date()
            var eventStartDate = new Date(this.eventData.startDate)
            var eventEndDate = new Date(this.eventData.endDate)
            
            if(eventEndDate < currentDate) {
               this.status = "Expired"
            }
            else if(eventStartDate <= currentDate && currentDate < eventEndDate) {
               this.status = "In Progress"
            }
            else {
               this.status = "Upcoming Soon"
            }
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                this.errorMessage = error.response.data.message
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
        this.loaded = true
      },
      async approveEvent() {
        await axios.post('http://127.0.0.1:4000/events/updateEvent', {
            params: { Id: this.eventId , query: { approvalStatus : "Approved"} }
        }).then((res) => {
            console.log(res)
            this.$router.go()   
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                this.errorMessage = error.response.data.message
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
      },
      async disapproveEvent() {
        await axios.post('http://127.0.0.1:4000/events/updateEvent', {
            params: { Id: this.eventId , query: { approvalStatus : "Disapproved"} }
        }).then((res) => {
            console.log(res)
            this.removeFeatured()   
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                this.errorMessage = error.response.data.message
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
      },
      async removeFeatured() {
        await axios.post('http://127.0.0.1:4000/events/updateEvent', {
            params: { Id: this.eventId , query: { Featured : "No"} }
        }).then((res) => {
            console.log(res)  
            this.$router.go()   
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                this.errorMessage = error.response.data.message
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
      },
      async setFeatured() {
        await axios.post('http://127.0.0.1:4000/events/updateEvent', {
            params: { Id: this.eventId , query: { Featured : "Yes"} }
        }).then((res) => {
            console.log(res)  
            this.$router.go()   
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                this.errorMessage = error.response.data.message
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
      },
      getDateFormat(dateValue) {
         var dateObj = new Date(dateValue)
         var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth()+1)).slice(-2)}/${dateObj.getFullYear()}`
         return formattedDate
      }
   }
};
</script>

<template>
   <div v-if="loaded">
      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- PageTitle-area-end -->
      <PageTitle pageTitle="Event Details" pageSubTitle="Event Details" />
      <!-- PageTitle-area-end -->

      <div class="event-detalis-area pt-120 pb-90">
         <div class="container">
            <div class="row">
               <div class="col-xl-8 col-lg-12">
                  <div class="event-main-wrapper mb-30">
                     <div class="row course-detelis-meta mb-30">
                        <div class="course-meta-wrapper border-line-meta col">
                           <div class="course-meta-img">
                              <NuxtLink href="javascript:void(0)"><img src="/img/course/course-meta.png"
                                    alt="course-meta"></NuxtLink>
                           </div>
                           <div class="course-meta-text">
                              <span>Hosted by</span>
                              <h6>
                                 <NuxtLink  href="javascript:void(0)">{{ eventData.createdByFName }} {{ eventData.createdByLName }}</NuxtLink>
                              </h6>
                           </div>
                        </div>
                        <div class="course-Enroll border-line-meta col">
                           <p class="text-center">Sport</p>
                           <span class="text-center">{{ eventData.Sport }}</span>
                        </div>
                        <div class="course-update border-line-meta col">
                           <p class="text-center">State</p>
                           <span class="text-center">{{ eventData.Location }}</span>
                        </div>
                        <div class="course-category col">
                           <p class="text-center">Category</p>
                           <span class="text-center">{{eventData.Category}}</span>
                        </div>
                     </div>
                     <div class="event-contact-info">
                        <h2>{{eventData.Name}}</h2>
                     </div>
                     <div class="event-introduction">
                        <div class="introduction-info mb-40">
                           <h4>Description</h4>
                           <p>{{eventData.Description}}</p>
                        </div>
                     </div>
                     <div class="mb-40">
                        <div class="even-point-tittle">
                           <h4>Prizes</h4>
                        </div>
                        <div class="event-point-info">
                           <ul>
                              <li><span class="inr-font">First Prize : <span class="text-black">{{eventData.Prize1}}</span> </span></li>
                              <li><span class="inr-font">Second Prize : <span class="text-black">{{eventData.Prize2}}</span> </span></li>
                              <li><span class="inr-font">Third Prize : <span class="text-black">{{eventData.Prize3}}</span> </span></li>
                              <li><span class="inr-font">Consolation Prize : <span class="text-black">{{eventData.consolationPrize}}</span> </span></li>
                           </ul>
                        </div>
                     </div>
                     <div class="mb-40">
                        <div class="even-point-tittle">
                           <h4>Rules and Restrictions</h4>
                        </div>
                        <div class="event-point-info">
                           <p>{{eventData.Rules}}</p>
                        </div>
                     </div>
                     <div class="google-map-area event-map pt-45">
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25621.6685132309!2d-73.76450733964063!3d40.741031946556575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1646544624845!5m2!1sen!2sbd"></iframe>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-lg-8 col-md-8">
                  <div class="sidebar-widget-wrapper">
                     <div class="event-speaker-wrapper mb-30 theme-blue">
                        <div class="event-speaker-info">
                           <h4 class="text-white">Organisers</h4>
                        </div>
                        <div class="event-organiser-content mb-10 text-center">
                           <span><a href="#">{{eventData.Organiser1Name}}</a></span>
                           <p><a href="#">{{eventData.Organiser1Phone}}</a></p>
                        </div>
                        <div class="event-organiser-content text-center">
                           <span><a href="#">{{eventData.Organiser2Name}}</a></span>
                           <p><a href="#">{{eventData.Organiser2Phone}}</a></p>
                        </div>
                     </div>
                     <div class="event-information-wrapper mb-30">
                        <div class="event-price-info">
                           <div class="event-ticket-cost">
                              <span>Entry Fees:</span>
                           </div>
                           <div class="event-price">
                              <p class="inr-font mr-10">INR</p> 
                              <span>{{eventData.entryFee}}</span>
                           </div>
                        </div>
                        <div class="event-information-list">
                           <ul>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-bookmark-white"></i>
                                    <span>Sport</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{eventData.Sport}}</span>
                                 </div>
                              </li>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-calendar"></i>
                                    <span>Start Date</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{getDateFormat(eventData.startDate)}}</span>
                                 </div>
                              </li>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-calendar"></i>
                                    <span>End Date</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{getDateFormat(eventData.endDate)}}</span>
                                 </div>
                              </li>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-clock"></i>
                                    <span>Schedule</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{eventData.Time}}</span>
                                 </div>
                              </li>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-place"></i>
                                    <span>Location</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{eventData.Address}}</span>
                                 </div>
                              </li>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-menu-2"></i>
                                    <span>Category</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{eventData.Category}}</span>
                                 </div>
                              </li>
                              <li>
                                 <div class="information-list">
                                    <i class="flaticon-global"></i>
                                    <span>Landmark</span>
                                 </div>
                                 <div class="information-list">
                                    <span>{{eventData.Landmark}}</span>
                                 </div>
                              </li>
                           </ul>
                        </div>
                        <div v-if="status === 'Expired'">
                           <h4 class="text-danger border-top border-secondary pt-10 mt-10"><span class="text-black font-bold">Status : </span>{{status}} </h4>
                        </div>
                        <div v-else>
                           <h4 v-if="status === 'Upcoming Soon'" class="text-success text-center border-top border-bottom border-secondary pt-10 pb-10 mt-10"><span class="text-black font-bold">Status : </span>{{status}} </h4>
                           <h4 v-else class="text-warning border-top border-secondary pt-10 mt-10"><span class="text-black font-bold">Status : </span>{{status}} </h4>
                           <NuxtLink to="/contact" :class="`${isApproved ? 'event-btn border-top border-secondary mt-30' : 'd-none'}`">Join this Event</NuxtLink>
                        </div>
                     </div>

                     <div v-if="selfUpload" class="event-sponsor-wrapper mb-30">
                        <div class="sopnsor-tittle">
                           <h4>Approval Status </h4>
                           <h4 v-if="eventData.approvalStatus === 'Approved'" class="text-success border-top border-secondary pt-10 mt-10"> {{eventData.approvalStatus}} </h4>
                           <h4 v-else-if="eventData.approvalStatus === 'Disapproved'" class="text-danger border-top border-secondary pt-10 mt-10"> {{eventData.approvalStatus}} </h4>
                           <h4 v-else class="text-warning border-top border-secondary pt-10 mt-10"> {{eventData.approvalStatus}} </h4>
                        </div>
                        <div class="sponsor-thumb">
                           <div v-if="eventData.approvalStatus === 'Approved'" class="alert alert-success" role="alert">
                              Your event submission is approved and active.
                           </div>
                           <div v-else-if="eventData.approvalStatus === 'Disapproved'" class="alert alert-danger" role="alert">
                              Your event submission is Disapproved and inactive. Please contact us for more info.
                           </div>
                           <div v-else class="alert alert-warning" role="alert">
                               Your event submission is currently under review. We will notify you of any change in status through email.
                           </div>
                           <NuxtLink :to="`/edit-event/${eventId}`" class="btn btn-primary w-100" >Edit Event</NuxtLink>
                        </div>
                     </div>
                     <div v-if="isAdmin" class="event-sponsor-wrapper mb-30">
                        <div class="sopnsor-tittle">
                           <h4>Approval Status </h4>
                           <h4 v-if="eventData.approvalStatus === 'Approved'" class="text-success border-top border-secondary pt-10 mt-10"> {{eventData.approvalStatus}} </h4>
                           <h4 v-else-if="eventData.approvalStatus === 'Disapproved'" class="text-danger border-top border-secondary pt-10 mt-10"> {{eventData.approvalStatus}} </h4>
                           <h4 v-else class="text-warning border-top border-secondary pt-10 mt-10"> {{eventData.approvalStatus}} </h4>
                        </div>
                        <div class="sponsor-thumb">
                           <div class="w-100" v-if="!isApproved">
                              <button type="button" class="btn btn-success w-100" @click="approveEvent">Approve</button>
                           </div>
                           <div class="w-100" v-else>
                              <button v-if="isFeatured" type="button" class="btn btn-danger w-100" @click="removeFeatured">Remove from featured</button>
                              <button v-else type="button" class="btn btn-primary w-100" @click="setFeatured">Set as featured</button>
                           </div>
                           <button type="button" class="btn btn-danger w-100" @click="disapproveEvent">Disapprove</button>
                           <NuxtLink :to="`/edit-event/${eventId}`" class="btn btn-primary w-100" >Edit Event</NuxtLink>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->

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
.theme-blue {
   background-color:#2467ec;
   padding: 2em;
}
.event-organiser-content {
   background-color:#FFF;
   border-radius:3px;
   bottom:50px;
   left:50%;
   min-width:240px;
   padding:13px 20px 19px;
  }
  .event-organiser-content span {
   color:#141517;
   display:block;
   font-size:16px;
   font-weight:700;
   margin-bottom:5px
  }
  .event-organiser-content p {
   line-height:1;
   margin-bottom:0
  }
  .inr-font {
   font-size: 20px;
   font-weight: 700;
  }
</style>