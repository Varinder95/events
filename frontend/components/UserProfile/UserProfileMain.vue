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
                Biography: ''
            },
            updateData: {
                FName: '',
                LName: '',
                DOB: '',
                Gender: '',
                PrefferedSport: '',
                prefferedLocation: '',
                Biography: ''
            },
            loggedIn: false,
            eventData: '',
            dataLoaded: false,
            loaded: false,
            eventDataReceived: false,
            showEditDetails: false,
            showEditPass: false

        }
    },
    mounted() {
        if (localStorage.loggedIn) {
            this.UserData = JSON.parse(localStorage.UserData);
            this.loggedIn = localStorage.loggedIn;
        }
        this.getUserDetails()
        this.getEventData()
    },
    methods: {
        async getUserDetails() {
            console.log(this.UserData)
            await axios.get('http://127.0.0.1:4000/users/current', {
                params: { Id: this.UserData.id }
            }).then((res) => {
                console.log(res.data)   
                this.UserData = res.data
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
            this.loaded = true
        },
        async getEventData() {
        await axios.get('http://127.0.0.1:4000/events/getAllByUser', {
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
        handleEditDetails() {
            this.updateData.FName = this.UserData.FName
            this.updateData.LName = this.UserData.LName
            this.updateData.Gender = this.UserData.Gender
            this.updateData.DOB = this.UserData.DOB
            this.updateData.PrefferedSport = this.UserData.PrefferedSport
            this.updateData.prefferedLocation = this.UserData.prefferedLocation
            this.updateData.Biography = this.UserData.Biography
            return this.showEditDetails = !this.showEditDetails
        },
        handleEditPass() {
            return this.showEditPass = !this.showEditPass
        },
        async userUpdate() {
            await axios.post('http://127.0.0.1:4000/users/updateUser', {
                params: { Id: this.UserData.id , query: this.updateData }
            }).then((response) => {
                    console.log(response)
                    this.$router.go()
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    this.detailsError = true;
                    this.errorMessage = error.response.data.message
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    this.detailsError = true
                    this.errorMessage = error.request
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    this.detailsError = true
                    this.errorMessage = error.message
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
        
        <!-- course-detailes-area-start -->
        <div class="course-detalies-area pt-120 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <div class="course-detelies-wrapper">
                            <div class="course-details-action w-100 mb-30">
                                <div class="w-100">
                                    <h3 class="text-capitalize">{{UserData.FName}} {{UserData.LName}}</h3>
                                    <p class="mt-10"><span class="font-weight-bold">Preffered Sports :</span> {{UserData.PrefferedSport}}</p>
                                    <p class="mt-10"><span class="font-weight-bold">Preffered Loction :</span> {{UserData.prefferedLocation}}</p>
                                </div>
                                <div class="course-details-action">
                                    <div class="course-follow">
                                        <a @click="handleEditDetails" class="d-block link-text w-100 mt-10">Edit profile</a>
                                        <a @click="handleEditPass" class="d-block link-text w-100 mt-10">Change password</a>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="course-detiles-meta">
                                <div class="total-course">
                                    <span>Total Events Hosted</span>
                                    <label class="mt-10">{{eventData.length}}</label>
                                </div>
                                <div class="course-details-action">
                                    <div class="course-follow">
                                        <a href="/add-event" class="edu-follow-btn">Host Event</a>
                                    </div>
                                </div>
                            </div>
                            <div class="course-bio-text pt-45 pb-20">
                                <h3>Biography</h3>
                                <p v-if="UserData.Biography===''">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p v-else>{{UserData.Biography}}</p>
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
                                                    <p class="font-weight-bold">Event Start date : <span class="font-weight-normal">{{ getDateFormat(data.startDate) }}</span></p>
                                                    <p class="font-weight-bold">Event End date : <span class="font-weight-normal">{{ getDateFormat(data.endDate) }}</span></p>
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
                                                    <div v-if="data.approvalStatus==='Approved'" class="alert alert-success" role="alert">
                                                        Your event submission is approved.
                                                    </div>
                                                    <div v-else class="alert alert-warning" role="alert">
                                                        Your event submission is currently under review. We will notify you of any change in status through email.
                                                    </div>
                                                </div>
                                                <div class="d-flex row justify-content-between">
                                                    <div class="d-inline-flex col-md-6 mt-10 justify-content-start ">
                                                        <h3 class="w-full">Approval Status : <span v-if="data.approvalStatus==='Approved'" class="text-success font-weight-normal"> {{ data.approvalStatus}}</span><span v-else class="text-warning font-weight-normal"> {{ data.approvalStatus}}</span></h3>
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
        <!-- event-detailes-area-end -->

        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->
        

        <!-- edit-area-start -->
        <div :class="`${showEditDetails ? 'signup-area open position-absolute' : 'signup-area'}`">
            <div class="sign-up-wrapper">
                <form class="signup-form-wrapper w-100" @submit.prevent="userUpdate">
                    <label>Name</label>
                    <div class="signup-input-wrapper">
                        <input required v-model="updateData.FName" type="text" placeholder="First Name">
                        <input required v-model="updateData.LName" type="text" placeholder="Last Name">
                    </div>
                    <div class="signup-wrapper">
                        <label>Date of birth</label>
                        <label for="DOB">Date of Birth</label>
                        <input required v-model="updateData.DOB" type="Date" name="DOB">
                    </div>
                    <div class="signup-wrapper">
                        <label>Gender</label>
                        <select v-model="updateData.Gender" class="form-select" required>
                            <option value="" disabled selected>Gender *</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="signup-wrapper">
                        <label>Preffered Sport</label>
                        <select v-model="updateData.PrefferedSport" class="form-select" required>
                            <option value="" disabled selected>Preffered Sports *</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Football">Football</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Hockey">Hockey</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="signup-wrapper">
                        <label>State</label>
                        <select v-model="updateData.prefferedLocation" class="form-select" required>
                            <option value="" disabled selected>Preffered State *</option>
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
                    </div>
                    <div class="signup-wrapper mb-20">
                        <label>Biography</label>
                        <textarea v-model="updateData.Biography" class="form-textarea" rows="3" placeholder="Biography"></textarea>
                    </div>
                    <div v-if="detailsError" class="my-20 text-center">
                        <p class="text-md text-danger">{{errorMessage}}</p>
                    </div>
                    <div class="sing-buttom mb-20">
                        <button class="sing-btn w-100">Save Details</button>
                    </div>
                </form>
            </div>
        </div>
        <div :class="`${showEditDetails ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`" @click="handleEditDetails">
        </div>
        <!-- edit-area-end -->
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
.link-text {
    color:#2467ec;
}
.link-text:hover {
    text-decoration: underline;
    cursor: pointer;
}
.form-select {
    width: 100%;
    height: 55px;
    background: #f5f5f5;
    border: 0;
    border-radius: 4px;
    margin-bottom: 30px;
    display: flex;
    padding: 10px 20px;
    outline: none;
    color: #575757;
    font-size: 16px;
}
.form-textarea {
    width: 100%;
    background: #f5f5f5;
    border: 0;
    border-radius: 4px;
    margin-bottom: 30px;
    display: flex;
    padding: 10px 20px;
    outline: none;
    color: #575757;
    font-size: 16px;
}
</style>
