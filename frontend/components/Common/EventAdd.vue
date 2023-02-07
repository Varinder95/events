<template>
    <div class="container">
        <!-- event-area-start -->
        <div class="sign-up-wrapper">
            <div class="signup-box text-center ">
                <div class="signup-text">
                    <h3>Host Event</h3>
                </div>
                <div class="signup-message">
                    <img src="/img/sing-up/sign-up-message.png" alt="image not found">
                </div>
                <div class="signup-thumb">
                    <img src="/img/sing-up/sign-up.png" alt="image not found">
                </div>
            </div>
            <form class="signup-form-wrapper" @submit.prevent="addEvent">
                <div class="mt-10 mb-20">
                    <h3>Event details</h3>
                </div>
                <div class="signup-input-wrapper">
                    <input v-model="EventData.Name" type="text" placeholder="Event Name">
                </div>
                <div class="signup-wrapper">
                    <select v-model="EventData.Sport" class="form-select">
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
                    <select v-model="EventData.Category" class="form-select">
                        <option value="" disabled selected>Category *</option>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="signup-wrapper">
                    <label for="fromDate">From *</label>
                    <input v-model="EventData.startDate" type="Date" name="fromDate">
                </div>
                <div class="signup-wrapper">
                    <label for="toDate">To *</label>
                    <input v-model="EventData.endDate" type="Date" name="toDate">
                </div>
                <div class="signup-wrapper">
                    <label for="time">Time of Event *</label>
                    <input v-model="EventData.Time" type="time" class="form-select" name="time" placeholder="Event Time">
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Description" class="form-textarea" rows="3" placeholder="Event Description"></textarea>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Prize1" class="form-textarea" rows="1" placeholder="First Prize (optional)"></textarea>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Prize2" class="form-textarea" rows="1" placeholder="Second Prize (optional)"></textarea>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Prize3" class="form-textarea" rows="1" placeholder="Third Prize (optional)"></textarea>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.consolationPrize" class="form-textarea" rows="1" placeholder="Consolation Prize (optional)"></textarea>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Address" class="form-textarea" rows="2" placeholder="Event Address"></textarea>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Landmark" class="form-textarea" rows="1" placeholder="Nearby Landmark"></textarea>
                </div>
                <div class="signup-wrapper">
                    <select v-model="EventData.Location" class="form-select">
                        <option value="" disabled selected>Select State *</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="UP">UP</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Maharashtra">Maharashtra</option>
                    </select>
                </div>
                <div class="signup-input-wrapper mb-20">
                    <textarea v-model="EventData.Rules" class="form-textarea" rows="3" placeholder="Event Rules and Regulations"></textarea>
                </div>
                <div class="signup-input-wrapper">
                    <input v-model="EventData.entryFee" type="text" placeholder="Event Entry Fees">
                </div>
                <div class="mt-10 mb-10">
                    <h3>Organiser details</h3>
                </div>
                <div class="signup-input-wrapper">
                    <input v-model="EventData.Organiser1Name" type="text" placeholder="First Organiser Name">
                </div>
                <div class="signup-input-wrapper">
                    <input v-model="EventData.Organiser1Phone" type="text" placeholder="First Organiser Number">
                </div>
                <div class="signup-input-wrapper">
                    <input v-model="EventData.Organiser2Name" type="text" placeholder="Second Organiser Name">
                </div>
                <div class="signup-input-wrapper">
                    <input v-model="EventData.Organiser2Phone" type="text" placeholder="Second Organiser Number">
                </div>
                <div v-if="EventError" class="my-20 text-center">
                    <p class="text-md text-danger">{{errorMessage}}</p>
                </div>
                <div v-if="EventSuccess" class="m-4 w-full">
                    <div class="alert alert-success" role="alert">
                        Your event is submitted succesfully. We will notify you of any change in status through email.<br>
                        <span class="mt-4 d-block"><NuxtLink class="text-primary link-hover" :to="`/event-details/${addEventId}`">View Details</NuxtLink></span>
                    </div>
                </div>
                <div class="sing-buttom mb-20">
                    <button type="submit" class="sing-btn w-100">Host Event</button>
                </div>
            </form>
        </div>
        <!-- event-area-start -->
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "EventModal",
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
                Prize1: '',
                Prize2: '',
                Prize3: '',
                consolationPrize: '',
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
                createdByLName: ''
            },
            EventError: false,
            EventSuccess: false,
            errorMessage: '',
            addEventId: '',
        }
    },
    methods: {
        async addEvent() {
            const data = JSON.parse(localStorage.UserData)
            this.EventData.createdById = data.id;
            this.EventData.createdByFName = data.FName;
            this.EventData.createdByLName = data.LName;
            axios.post('http://127.0.0.1:4000/events/createEvent', this.EventData)
                .then((response) => {
                    console.log(response)
                    this.addEventId = response.data.id
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
        handleAddEvent() {
            return this.showAddEvent = !this.showAddEvent
        },
    },
    beforeMount() {
        if (localStorage.loggedIn) {
        this.loggedIn = localStorage.loggedIn;
        }
    }
}
</script>
<style scoped>
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
.link-hover:hover {
    text-decoration: underline;
}
</style>