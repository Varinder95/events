<template>
    <div v-if="loaded">
       <!-- header-area-start -->
       <HeaderFour />
       <!-- header-area-end -->
 
       <!-- PageTitle-area-end -->
       <PageTitle pageTitle="Edit Event" pageSubTitle="Edit Event" />
            <div class="container">
                <!-- event-area-start -->
                <div class="sign-up-wrapper">
                    <div class="signup-box text-center ">
                        <div class="signup-text">
                            <h3>Edit Event</h3>
                        </div>
                        <div class="signup-message">
                            <img src="/img/sing-up/sign-up-message.png" alt="image not found">
                        </div>
                        <div class="signup-thumb">
                            <img src="/img/sing-up/sign-up.png" alt="image not found">
                        </div>
                    </div>
                    <form class="signup-form-wrapper" @submit.prevent="editEvent">
                        <div class="mt-10 mb-20">
                            <h3>Event details</h3>
                        </div>
                        <div class="signup-wrapper">
                            <label>Event Name*</label>
                            <input required v-model="EventData.Name" type="text" class="form-field" placeholder="Event Name">
                        </div>
                        <div class="signup-wrapper">
                            <label>Sport*</label>
                            <select v-model="EventData.Sport" class="form-field" required>
                                <option value="" disabled selected>Select Sport *</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Football">Football</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Hockey">Hockey</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="signup-wrapper">
                            <label>Category*</label>
                            <select v-model="EventData.Category" class="form-field" required>
                                <option value="" disabled selected>Category *</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="signup-wrapper">
                            <label for="fromDate">From *</label>
                            <input required v-model="EventData.startDate" type="Date" name="fromDate">
                        </div>
                        <div class="signup-wrapper">
                            <label for="toDate">To *</label>
                            <input required v-model="EventData.endDate" type="Date" name="toDate">
                        </div>
                        <div class="signup-wrapper">
                            <label for="time">Time of Event *</label>
                            <input required v-model="EventData.Time" type="time" class="form-field" name="time" placeholder="Event Time">
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Event Description*</label>
                            <textarea v-model="EventData.Description" class="form-textarea" rows="3" placeholder="Event Description"></textarea>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>First Prize*</label>
                            <textarea v-model="EventData.Prize1" class="form-textarea" rows="1" placeholder="First Prize (optional)"></textarea>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Second Prize*</label>
                            <textarea v-model="EventData.Prize2" class="form-textarea" rows="1" placeholder="Second Prize (optional)"></textarea>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Third Prize*</label>
                            <textarea v-model="EventData.Prize3" class="form-textarea" rows="1" placeholder="Third Prize (optional)"></textarea>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Consolation Prize*</label>
                            <textarea v-model="EventData.consolationPrize" class="form-textarea" rows="1" placeholder="Consolation Prize (optional)"></textarea>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Event Address*</label>
                            <textarea v-model="EventData.Address" class="form-textarea" rows="2" placeholder="Event Address"></textarea>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Nearest Landmark*</label>
                            <textarea v-model="EventData.Landmark" class="form-textarea" rows="1" placeholder="Nearby Landmark"></textarea>
                        </div>
                        <div class="signup-wrapper">
                            <label>State*</label>
                            <select v-model="EventData.Location" class="form-field">
                                <option value="" disabled selected>Select State *</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Haryana">Haryana</option>
                                <option value="UP">UP</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Maharashtra">Maharashtra</option>
                            </select>
                        </div>
                        <div class="signup-wrapper mb-20">
                            <label>Event Rules*</label>
                            <textarea v-model="EventData.Rules" class="form-textarea" rows="3" placeholder="Event Rules and Regulations"></textarea>
                        </div>
                        <div class="signup-wrapper">
                            <label>Event Entry Fees*</label>
                            <input required v-model="EventData.entryFee" type="number" class="form-field" placeholder="Event Entry Fees">
                        </div>
                        <div class="mt-10 mb-10">
                            <h3>Organiser details</h3>
                        </div>
                        <div class="signup-wrapper">
                            <label>First Event Organiser*</label>
                            <input required v-model="EventData.Organiser1Name" type="text" class="form-field" placeholder="First Organiser Name">
                        </div>
                        <div class="signup-wrapper">
                            <label>First Organiser Phone*</label>
                            <input required v-model="EventData.Organiser1Phone" type="tel" pattern="[6789][0-9]{9}" placeholder="First Organiser Number">
                        </div>
                        <div class="signup-wrapper">
                            <label>Second Event Organiser*</label>
                            <input required v-model="EventData.Organiser2Name" type="text" class="form-field" placeholder="Second Organiser Name">
                        </div>
                        <div class="signup-wrapper">
                            <label>Second Organiser Phone*</label>
                            <input required v-model="EventData.Organiser2Phone" type="tel" pattern="[6789][0-9]{9}" placeholder="Second Organiser Number">
                        </div>
                        <div v-if="EventError" class="my-20 text-center">
                            <p class="text-md text-danger">{{errorMessage}}</p>
                        </div>
                        <div v-if="EventSuccess" class="m-4 w-full">
                            <div class="alert alert-success" role="alert">
                                Your event is editted succesfully. We will notify you of any change in status through email.<br>
                                <span class="mt-4 d-block"><NuxtLink class="text-primary link-hover" :to="`/event-details/${eventId}`">View Details</NuxtLink></span>
                            </div>
                        </div>
                        <div class="sing-buttom mb-20">
                            <button type="submit" class="sing-btn w-100">Save Event</button>
                        </div>
                    </form>
                </div>
                <!-- event-area-start -->
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
<script>
import axios from 'axios';
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "EditEvent",
    props: {
        eventId: {
            type: String,
            default: ''
        },
    },
   components: {
      FooterOne,
      PageTitle,
      HeaderFour
   },
    data() {
        return {
            EventData: {
                Name: '',
                Sport: '',
                Category: '',
                startDate: '',
                endDate: '',
                Description: '',
                createdById: '',
                createdByFName: '',
                createdByLName: '',
                Address: '',
                Landmark: '',
                Prize1: null,
                Prize2: null,
                Prize3: null,
                consolationPrize: null,
                Time: '',
                Location: '',
                Rules: '',
                entryFee: '',
                Organiser1Name: '',
                Organiser1Phone: '',
                Organiser2Name: '',
                Organiser2Phone: '',
                createdById: '',
                createdByFName: '',
                createdByLName: '',
                approvalStatus: 'Pending',
                Featured: 'No',
            },
            EventError: false,
            EventSuccess: false,
            errorMessage: '',
            addEventId: '',
            isAdmin: '',
            loaded: false
        }
    },
    methods: {
        async getEventDetails() {
            await axios.get('http://127.0.0.1:4000/events/getEventById', {
                params: { Id: this.eventId }
            }).then((res) => {
                console.log(res)   
                this.EventData.Name = res.data.Name
                this.EventData.Sport = res.data.Sport
                this.EventData.Category = res.data.Category
                this.EventData.startDate = res.data.startDate
                this.EventData.endDate = res.data.endDate
                this.EventData.Description = res.data.Description
                this.EventData.createdById = res.data.createdById
                this.EventData.createdByFName = res.data.createdByFName
                this.EventData.createdByLName = res.data.createdByLName
                this.EventData.Address = res.data.Address
                this.EventData.Landmark = res.data.Landmark
                this.EventData.Prize1 = res.data.Prize1
                this.EventData.Prize2 = res.data.Prize2
                this.EventData.Prize3 = res.data.Prize3
                this.EventData.consolationPrize = res.data.consolationPrize
                this.EventData.Time = res.data.Time
                this.EventData.Location = res.data.Location
                this.EventData.Rules = res.data.Rules
                this.EventData.entryFee = res.data.entryFee
                this.EventData.Organiser1Name = res.data.Organiser1Name
                this.EventData.Organiser1Phone = res.data.Organiser1Phone
                this.EventData.Organiser2Name = res.data.Organiser2Name
                this.EventData.Organiser2Phone = res.data.Organiser2Phone
                this.EventData.createdById = res.data.createdById
                this.EventData.createdByFName = res.data.createdByFName
                this.EventData.createdByLName = res.data.createdByLName
                this.loaded = true
                if(JSON.parse(localStorage.UserData).id !== this.EventData.createdById){
                    if(this.isAdmin === false){
                        this.$router.replace('/dashboard')
                    }
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
        async editEvent() {
            await axios.post('http://127.0.0.1:4000/events/updateEvent', {
                params: { Id: this.eventId , query: this.EventData }
            }).then((response) => {
                    console.log(response)
                    this.EventSuccess = true
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    this.EventError = true;
                    this.errorMessage = error.response.data.message
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    this.EventError = true
                    this.errorMessage = error.request
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    this.EventError = true
                    this.errorMessage = error.message
                }
            });
        },
    },
    beforeMount() {
        if (localStorage.loggedIn) {
            this.loggedIn = localStorage.loggedIn;
            if(JSON.parse(localStorage.UserData).Status === "Admin") {
                this.isAdmin = true
            }
        }
        this.getEventDetails()
    },
}
</script>
<style scoped>
.form-field {
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
.link-hover:hover {
    text-decoration: underline;
}
</style>