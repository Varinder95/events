<template>
    <div>
        <header>
            <div class="header-top-area d-none d-lg-block">
                <div class="container-fluid">
                    <div class="header-top-inner">
                        <div class="row align-items-center">
                            <div class="col-xl-8 col-lg-8">
                                <div class="header-top-icon">
                                    <a href="tel:(555)674890556"><i class="fas fa-phone"></i>(555) 674 890 556</a>
                                    <a href="mailto:info@example.com"><i
                                            class="fal fa-envelope"></i>info@example.com</a>
                                    <i class="fal fa-map-marker-alt"></i><span>3rd Avenue, San Francisco</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div :class="`${isSticky ? 'header-area header-transparent sticky-header sticky' : 'header-area header-transparent sticky-header'}`">
                <div class="container-fluid">
                    <div class="header-main-wrapper">
                        <div class="row align-items-center">
                            <div class="col-xl-7 col-lg-7 col-md-5 col-sm-9 col-9">
                                <div class="header-left d-flex align-items-center">
                                    <div class="header-logo">
                                        <NuxtLink to="/"><img src="/img/logo/logo-black.png" alt="logo"></NuxtLink>
                                    </div>
                                    <div class="main-menu menu-margin d-none d-xl-block">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li>
                                                    <NuxtLink to="/">Home</NuxtLink>
                                                </li>
                                                <li v-if="loggedIn">
                                                    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
                                                </li>
                                                <li>
                                                    <NuxtLink to="/about">About</NuxtLink>
                                                </li>
                                                <li class="menu-item-has-children">
                                                    <NuxtLink href="javascript:void(0)">Events</NuxtLink>
                                                    <ul class="sub-menu">
                                                        <li>
                                                            <NuxtLink to="/event">Upcoming Event</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/expired">Expired Events</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <NuxtLink to="/contact">Contact</NuxtLink>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-7 col-sm-3 col-3">
                                <div class="header-right d-flex align-items-center justify-content-end">
                                    <div class="header-search w-50 d-none d-xl-block mr-30">
                                        <div>
                                            <div class="search-icon p-relative">
                                                <input class="mr-10 w-75" v-model="searchQuery" required type="text" placeholder="Search courses...">
                                                <NuxtLink :to="`/search/?find=${searchQuery}`"><i class="fas fa-search"></i></NuxtLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="loggedIn" class="d-inline-flex justify-content-center align-items-center">
                                        <div class="user-btn-inner p-relative d-none d-md-block">
                                            <div class="user-btn-wrapper">
                                                <div class="user-btn-content ">
                                                    <a class="user-btn-sign-in" href="javascript:void(0)"
                                                        @click="handleLogOut">Log Out</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="isAdmin" class="d-none d-md-block">
                                            <a class="user-btn-sign-up edu-btn" href="/admin">Admin</a>
                                        </div>
                                        <div v-else class="d-none d-md-block">
                                            <a class="user-btn-sign-up edu-btn" href="/add-event">Host Event</a>
                                        </div>
                                    </div>
                                    <div v-else class="d-inline-flex justify-content-center align-items-center">
                                        <div class="user-btn-inner p-relative d-none d-md-block">
                                            <div class="user-btn-wrapper">
                                                <div class="user-btn-content ">
                                                    <a class="user-btn-sign-in" href="javascript:void(0)"
                                                        @click="handleSignIn">Sign In</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-none d-md-block">
                                            <a class="user-btn-sign-up edu-btn" href="javascript:void(0)"
                                                @click="handleSignUp">Sign Up</a>
                                        </div>
                                    </div>
                                    <div class="menu-bar d-xl-none ml-20">
                                        <a class="side-toggle" href="javascript:void(0)" @click="handleSidebar">
                                            <div class="bar-icon">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- header-area-end -->

        <!-- Mobile Menu Start -->
        <div class="fix">
            <div :class="`${showSidebar ? 'side-info info-open' : 'side-info'}`">
                <div class="side-info-content">
                    <div class="offset-widget offset-logo mb-40">
                        <div class="row align-items-center">
                            <div class="col-9">
                                <NuxtLink to="/"><img src="/img/logo/logo-black.png" alt="Logo"></NuxtLink>
                            </div>
                            <div class="col-3 text-end">
                                <button class="side-info-close" @click="handleSidebarClose"><i
                                        class="fal fa-times"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="mobile-menu d-xl-none fix mb-30">
                        <div class="sidebar-menu mm-menu">
                            <ul>
                                <li>
                                    <NuxtLink to="/">Home</NuxtLink>
                                </li>
                                <li v-if="loggedIn">
                                    <NuxtLink to="/Dashboard">Dashboard</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/about">About</NuxtLink>
                                </li>
                                <li class="menu-item-has-children has-droupdown" :class="[menuOption.eventDropDown === true ? 'active' : '']">
                                    <a v-on:click="menuOption.eventDropDown = !menuOption.eventDropDown">Event</a>
                                    <ul class="sub-menu" :class="[menuOption.eventDropDown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/event">Upcoming Event</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/expired">Expired Events</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <NuxtLink to="/contact">Contact</NuxtLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="offset-widget offset_searchbar mb-30">
                        <div class="menu-search position-relative ">
                            <div class="filter-search-input">
                                <input class="mr-10" v-model="searchQuery" required type="text" placeholder="Search keyword">
                                <NuxtLink :to="`/search/?find=${searchQuery}`"><i class="fal fa-search"></i></NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="offset-widget offset_menu-top mb-20">
                        <div class="header-menu-top-icon mb-20">
                            <a href="tel:(555)674890556"><i class="fas fa-phone"></i>(555) 674 890 556</a>
                            <a href="mailto:info@example.com"><i class="fal fa-envelope"></i>info@example.com</a>
                            <i class="fal fa-map-marker-alt"></i><span>3rd Avenue, San Francisco</span>
                        </div>
                    </div>
                    <div class="offset-widget button mb-20">
                        <div v-if="loggedIn">
                            <div v-if="isAdmin" class="user-btn-content mb-20 mt-20">
                                <a class="user-btn-sign-in" href="/admin">Admin</a>
                            </div>
                            <div v-else class="user-btn-content mb-20 mt-20">
                                <a class="user-btn-sign-in" href="/add-event">Host Event</a>
                            </div>
                            <a href="javascript:void(0)" class="edu-four-btn" @click="handleLogOut">Log Out</a>
                        </div>
                        <div v-else>
                            <div class="user-btn-content mb-20 mt-20">
                                <a class="user-btn-sign-in" href="javascript:void(0)"
                                    @click="handleSignIn">Sign In</a>
                            </div>
                            <a href="javascript:void(0)" class="edu-four-btn" @click="handleSignUp">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="`${showSidebar ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`"
            @click="handleSidebarClose"></div>
        <!-- Mobile Menu End -->

        <!-- sigin-area start-->
        <div :class="`${showSignIn ? 'signin-area open position-fixed' : 'signin-area'}`">
            <div class="signin-area-wrapper position-relative overflow-scroll ">
                <div class="signup-box text-center">
                    <div class="signup-text">
                        <h3>Sign in</h3>
                    </div>
                    <div class="signup-thumb">
                        <img src="/img/sing-up/sign-up.png" alt="image not found">
                    </div>
                </div>
                <form class="signup-form-wrapper" @submit.prevent="userLogin">
                    <div class="signup-wrapper">
                        <input required v-model="SignInEmail" type="text" placeholder="Email or Username">
                    </div>
                    <div class="signup-wrapper">
                        <input required v-model="SignInPass" type="password" placeholder="Password">
                    </div>
                    <div v-if="SignInError" class="my-20 text-center">
                        <p class="text-md text-danger">{{errorMessage}}</p>
                    </div>
                    <div v-if="SignInEmailError" class="my-20 text-center">
                        <p class="text-md text-danger">Please Enter Valid Email</p>
                    </div>
                    <div class="sing-buttom mb-20">
                        <button type="submit" class="sing-btn w-100">Login</button>
                    </div>
                    <div class="registered wrapper">
                        <div class="not-register">
                            <span>Not registered?</span><span><a href="#" @click="handleSignUp">Sign up</a></span>
                        </div>
                        <div class="forget-password">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div :class="`${showSignIn ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`" @click="handleSignIn">
        </div>
        <!-- sigin-area end-->

        <!-- signup-area-start -->
        <div :class="`${showSignUp ? 'signup-area open position-absolute' : 'signup-area'}`">
            <div class="sign-up-wrapper">
                <div class="signup-box text-center ">
                    <div class="signup-text">
                        <h3>Sign up</h3>
                    </div>
                    <div class="signup-message">
                        <img src="/img/sing-up/sign-up-message.png" alt="image not found">
                    </div>
                    <div class="signup-thumb">
                        <img src="/img/sing-up/sign-up.png" alt="image not found">
                    </div>
                </div>
                <form class="signup-form-wrapper" @submit.prevent="userRegister">
                    <div class="signup-input-wrapper">
                        <input required v-model="SignUpData.FName" type="text" placeholder="First Name">
                        <input required v-model="SignUpData.LName" type="text" placeholder="Last Name">
                    </div>
                    <div class="signup-wrapper">
                        <label for="DOB">Date of Birth</label>
                        <input required v-model="SignUpData.DOB" type="Date" name="DOB">
                    </div>
                    <div class="signup-wrapper">
                        <label>Gender *</label>
                        <select v-model="SignUpData.Gender" class="form-select" required>
                            <option value="" disabled selected>Gender *</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="signup-wrapper">
                        <input required v-model="SignUpData.Email" type="text" placeholder="Email">
                    </div>
                    <div class="signup-wrapper">
                        <input required v-model="SignUpData.password" type="password" placeholder="Password">
                    </div>
                    <div class="signup-wrapper">
                        <label>Preffered Sport *</label>
                        <select v-model="SignUpData.PrefferedSport" class="form-select" required>
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
                        <label>Preffered State *</label>
                        <select v-model="SignUpData.prefferedLocation" class="form-select" required>
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
                    <div class="signup-action">
                        <div class="course-sidebar-list">
                            <input required class="signup-checkbo" type="checkbox" id="sing-up">
                            <label class="sign-check" for="sing-up"><span>Accept the terms and <a href="#">Privacy
                                        Policy</a></span></label>
                        </div>
                    </div>
                    <div v-if="SignUpError" class="my-20 text-center">
                        <p class="text-md text-danger">{{errorMessage}}</p>
                    </div>
                    <div v-if="SignUpEmailError" class="my-20 text-center">
                        <p class="text-md text-danger">Please Enter Valid Email</p>
                    </div>
                    <div class="sing-buttom mb-20">
                        <button type="submit" class="sing-btn w-100">Register now</button>
                    </div>
                    <div class="acount-login text-center">
                        <span>Already have an account? <a href="#" @click="handleSignIn">Log in</a></span>
                    </div>
                </form>
            </div>
        </div>
        <div :class="`${showSignUp ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`" @click="handleSignUp">
        </div>
        <!-- signup-area-start -->

        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "app",
    data() {
        return {
            SignUpData: {
                FName: '',
                LName: '',
                Email: '',
                password: '',
                DOB: '',
                Gender: '',
                PrefferedSport: '',
                prefferedLocation: '',
            },
            SignInEmail: '',
            SignInPass: '',
            errorMessage: '',
            SignInError: false,
            SignUpError: false,
            loggedIn: false,
            SignInEmailError: false,
            SignUpEmailError: false,
            showSignIn: false,
            showSignUp: false,
            hideReminder: false,
            valueFour: 1,
            valueFive: 1,
            valueSix: 1,
            isSticky: false,
            showSidebar: false,
            menuOption: {
                menuShow: false,
                homeDropdown: false,
                coursesDropdown: false,
                shopDropdown: false,
                pagesDropDown: false,
                instructorDropDown: false,
                faqDropDown: false,
                eventDropDown: false,
                blogDropdown: false,
            },
            isAdmin: false,
            searchQuery: ''
        }
    },
    methods: {
        handleSticky() {
            if (window.scrollY > 50) {
                this.isSticky = true;
            }
            else {
                this.isSticky = false;
            }
        },
        handleSidebar() {
            this.showSidebar = true;
        },
        handleSidebarClose() {
            this.showSidebar = false;
        },
        handleSignIn() {
            return this.showSignIn = !this.showSignIn
        },
        handleSignUp() {
            return this.showSignUp = !this.showSignUp
        },
        handleReminder() {
            return this.hideReminder = !this.hideReminder
        },
        handleIncreaseValue(value) {
            if (value === 'valueFour') {
                this.valueFour++
            }
            if (value === 'valueFive') {
                this.valueFive++
            }
            if (value === 'valueSix') {
                this.valueSix++
            }

        },
        handleDecreaseValue(value) {
            if (value === 'valueFour' && this.valueFour > 0) {
                this.valueFour--
            }
            if (value === 'valueFive' && this.valueFive > 0) {
                this.valueFive--
            }
            if (value === 'valueSix' && this.valueSix > 0) {
                this.valueSix--
            }
        },
        async userRegister () {
            if(this.validateEmail(this.SignUpData.Email)) {
                axios.post('http://127.0.0.1:4000/users/register', this.SignUpData)
                .then((response) => {
                    console.log(response)
                    localStorage.setItem('loggedIn', true)
                    localStorage.setItem('UserData', JSON.stringify(response.data))
                    this.$router.go('/dashboard')
                })
                .catch((error) => {
                    if (error.response) {
                        // Request made and server responded
                        this.SignUpError = true;
                        this.errorMessage = error.response.data.message
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                        this.SignUpError = true
                        this.errorMessage = error.request
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        this.SignUpError = true
                        this.errorMessage = error.message
                    }
                });
            }
            else {
                this.SignUpEmailError = true
            }
        },
        async userLogin () {
            if(this.validateEmail(this.SignInEmail)) {
                axios.post('http://127.0.0.1:4000/users/authenticate', {
                        Email: this.SignInEmail,
                        password: this.SignInPass
                    }).then((res) => {   
                    localStorage.setItem('loggedIn', true)
                    localStorage.setItem('UserData', JSON.stringify(res.data))
                    this.$router.go('/dashboard')
                })
                .catch((error) => {
                    if (error.response) {
                        // Request made and server responded
                        this.SignInError = true;
                        this.errorMessage = error.response.data.message
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                        this.SignInError = true
                        this.errorMessage = error.request
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        this.SignInError = true
                        this.errorMessage = error.message
                    }
                });
            }
            else {
                this.SignInEmailError = true
            }
        },
        validateEmail(data) {
            console.log(data)
            const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data)
            return result
        },
        handleLogOut() {
            window.localStorage.clear()
            this.$router.go()
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleSticky)
    },
    beforeMount() {
        if (localStorage.loggedIn) {
            this.loggedIn = localStorage.loggedIn;
            if(JSON.parse(localStorage.UserData).Status === "Admin") {
                this.isAdmin = true
            }
        }
    }
};
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
.menu-margin ul li {
    margin: 0 15px !important;
}
</style>
