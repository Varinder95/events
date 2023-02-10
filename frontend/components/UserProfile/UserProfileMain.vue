<script>
import FooterOne from "../Common/FooterOne.vue";
import Pagination from "../Common/Pagination.vue";
import HeaderFour from "../Common/HeaderFour.vue";
import axios from 'axios';

export default {
    name: "UserProfileMain",
    components: {
        FooterOne,
        Pagination,
        HeaderFour
    },
    data() {
        return {
            UserData: {
                id: '',
                FName: '',
                LName: '',
                Email: '',
                password: '',
                DOB: '',
                Gender: '',
                PrefferedSport: '',
                prefferedLocation: '',
            },
            loggedIn: false,
            eventData: '',
            dataLoaded: false,
            loaded: false,
            eventDataReceived: false,

        }
    },
    mounted() {
        if (localStorage.loggedIn) {
            this.UserData = JSON.parse(localStorage.UserData);
            this.loggedIn = localStorage.loggedIn;
        }
        this.loaded = true
        this.getEventData()
    },
    methods: {
        async getEventData() {
        await axios.get('http://194.195.118.102:4000/events/getAllByUser', {
            params: { userId: this.UserData.id }
        }).then((res) => {
            console.log(res)   
            this.eventData = res.data
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
        if((this.eventData).length !== 0) {
            this.eventDataReceived = true
        }
        this.dataLoaded = true
        },
        dashEventClick() {
        }

    }
};
</script>

<template>
    <div v-if="loaded">
        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->
        
        <!-- course-detailes-area-start -->
        <div class="course-detalies-area pt-120 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-xl-3 col-lg-3">
                        <div class="course-instructors-img mb-30">
                            <img src="/img/course/course-instructors.png" alt="nstructors-img">
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-9">
                        <div class="course-detelies-wrapper">
                            <div class="course-detiles-tittle mb-30">
                                <h3 class="text-capitalize">{{UserData.FName}} {{UserData.LName}}</h3>
                                <p class="mt-10"><span class="font-weight-bold">Preffered Sports :</span> {{UserData.PrefferedSport}}</p>
                                <p class="mt-10"><span class="font-weight-bold">Preffered Loction :</span> {{UserData.prefferedLocation}}</p>
                            </div>
                            <div class="course-detiles-meta">
                                <div class="total-course">
                                    <span>Total Events Hosted</span>
                                    <label class="mt-10">0</label>
                                </div>
                                <div class="course-details-action">
                                    <div class="course-follow">
                                        <a href="/add-event" class="edu-follow-btn">Host Event</a>
                                    </div>
                                </div>
                            </div>
                            <div class="course-bio-text pt-45 pb-20">
                                <h3>Biography</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <div class="my-coeventAddedurse-info w-100 border-bottom border-secondary">
                                <h3>My Events</h3>
                            </div>
                            <div class="row pb-30">
                                <div v-if="dataLoaded">
                                    <div v-if="eventDataReceived">
                                        <div class="col-lg-12 mt-10" v-for="data in eventData" :key="data.id">
                                           <div class="single-item mb-30">
                                              <div class="col-lg-6 f-left">
                                                 <div class="event_date_inner">
                                                    <h4> 
                                                        <NuxtLink :to="`/course-details/${data.id}`">{{ data.Name }}</NuxtLink>
                                                     </h4>
                                                    <p class="font-weight-bold">Event Start date : <span class="font-weight-normal">{{ data.startDate }}</span></p>
                                                    <p class="font-weight-bold">Event End date : <span class="font-weight-normal">{{ data.endDate }}</span></p>
                                                 </div>
                                              </div>
                                              <div class="event_info">
                                                 <h3>{{ data.Sport }}
                                                 </h3>
                                                 <div class="event-detalis d-flex align-items-center">
                                                    <div class="event-time mr-30 d-flex align-items-center">
                                                       <p class="font-weight-bold mt-15">Entry fees : </p>
                                                       <span>{{ data.entryFee }}</span>
                                                    </div>
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
                                                        <p class="font-weight-bold mt-15">Organiser : </p>
                                                    </div>
                                                    <div class="adence-info">
                                                       <span>{{ data.Organiser1Name }}</span>
                                                    </div>
                                                 </div>
                                              </div>
                                              <div class="get-ticket-btn w-100">
                                                <div class="m-4 w-full">
                                                    <div class="alert alert-warning" role="alert">
                                                        Your event submission is currently under review. We will notify you of any change in status through email.
                                                    </div>
                                                </div>
                                                <div class="d-flex row justify-content-between">
                                                    <div class="d-inline-flex col-md-6 mt-10 justify-content-start ">
                                                        <h3 class="w-full">Approval Status : <span class="text-warning font-weight-normal"> {{ data.approvalStatus}}</span></h3>
                                                    </div>
                                                    <div class="d-inline-flex col-md-6 justify-content-end">
                                                        <div class="d-none d-md-block" data-v-3ba90ccc="">
                                                            <NuxtLink class="user-btn-sign-up edu-btn" :to="`/event-details/${data.id}`" data-v-3ba90ccc="">View Details</NuxtLink>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
                                           </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="col-xl-6 col-lg-6 col-md-6 mt-20">
                                            <div class="academic-box mb-30">
                                                <h4 class="font-weight-bold">You don't have any events</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="d-flex justify-content-center mt-20 mb-20">
                                    <div class="spinner-grow text-warning" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- course-detailes-area-end -->

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
</style>
