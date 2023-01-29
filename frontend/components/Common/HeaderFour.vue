<template>
    <div>
        <!-- header-area-start  -->
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
                            <div class="col-xl-4 col-lg-4">
                                <div class="header-top-login d-flex f-right">
                                    <div class="header-social">
                                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                                        <a href="#"><i class="fab fa-twitter"></i></a>
                                        <a href="#"><i class="fab fa-vimeo-v"></i></a>
                                        <a href="#"><i class="fab fa-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div :class="`${isSticky ? 'header-area sticky-header sticky' : 'header-area sticky-header'}`">
                <div class="container-fluid">
                    <div class="header-main-wrapper">
                        <div class="row align-items-center">
                            <div class="col-xl-7 col-lg-7 col-md-5 col-sm-9 col-9">
                                <div class="header-left d-flex align-items-center">
                                    <div class="header-logo">
                                        <NuxtLink to="/"><img src="/img/logo/logo-black.png" alt="logo"></NuxtLink>
                                    </div>
                                    <div class="category-menu d-none d-xxl-block">
                                        <div class="Category-click">
                                            <figure class="cattext"><svg class="icons" id="menu_1_" data-name="menu (1)"
                                                    xmlns="http://www.w3.org/2000/svg" width="18.087" height="18.087"
                                                    viewBox="0 0 18.087 18.087">
                                                    <path id="Path_25" data-name="Path 25"
                                                        d="M3.768,0H.754A.754.754,0,0,0,0,.754V3.768a.754.754,0,0,0,.754.754H3.768a.754.754,0,0,0,.754-.754V.754A.754.754,0,0,0,3.768,0Z"
                                                        fill="#141517"></path>
                                                    <path id="Path_26" data-name="Path 26"
                                                        d="M3.768,9H.754A.754.754,0,0,0,0,9.754v3.015a.754.754,0,0,0,.754.754H3.768a.754.754,0,0,0,.754-.754V9.754A.754.754,0,0,0,3.768,9Z"
                                                        transform="translate(0 -2.217)" fill="#141517"></path>
                                                    <path id="Path_27" data-name="Path 27"
                                                        d="M3.768,18H.754A.754.754,0,0,0,0,18.754v3.015a.754.754,0,0,0,.754.754H3.768a.754.754,0,0,0,.754-.754V18.754A.754.754,0,0,0,3.768,18Z"
                                                        transform="translate(0 -4.434)" fill="#141517"></path>
                                                    <path id="Path_28" data-name="Path 28"
                                                        d="M12.768,0H9.754A.754.754,0,0,0,9,.754V3.768a.754.754,0,0,0,.754.754h3.015a.754.754,0,0,0,.754-.754V.754A.754.754,0,0,0,12.768,0Z"
                                                        transform="translate(-2.217)" fill="#141517"></path>
                                                    <path id="Path_29" data-name="Path 29"
                                                        d="M12.768,9H9.754A.754.754,0,0,0,9,9.754v3.015a.754.754,0,0,0,.754.754h3.015a.754.754,0,0,0,.754-.754V9.754A.754.754,0,0,0,12.768,9Z"
                                                        transform="translate(-2.217 -2.217)" fill="#141517"></path>
                                                    <path id="Path_30" data-name="Path 30"
                                                        d="M12.768,18H9.754A.754.754,0,0,0,9,18.754v3.015a.754.754,0,0,0,.754.754h3.015a.754.754,0,0,0,.754-.754V18.754A.754.754,0,0,0,12.768,18Z"
                                                        transform="translate(-2.217 -4.434)" fill="#141517"></path>
                                                    <path id="Path_31" data-name="Path 31"
                                                        d="M21.768,0H18.754A.754.754,0,0,0,18,.754V3.768a.754.754,0,0,0,.754.754h3.015a.754.754,0,0,0,.754-.754V.754A.754.754,0,0,0,21.768,0Z"
                                                        transform="translate(-4.434)" fill="#141517"></path>
                                                    <path id="Path_32" data-name="Path 32"
                                                        d="M21.768,9H18.754A.754.754,0,0,0,18,9.754v3.015a.754.754,0,0,0,.754.754h3.015a.754.754,0,0,0,.754-.754V9.754A.754.754,0,0,0,21.768,9Z"
                                                        transform="translate(-4.434 -2.217)" fill="#141517"></path>
                                                    <path id="Path_33" data-name="Path 33"
                                                        d="M21.768,18H18.754a.754.754,0,0,0-.754.754v3.015a.754.754,0,0,0,.754.754h3.015a.754.754,0,0,0,.754-.754V18.754A.754.754,0,0,0,21.768,18Z"
                                                        transform="translate(-4.434 -4.434)" fill="#141517"></path>
                                                </svg> <span class="text">Category</span></figure>
                                            <div class="dropdown-category">
                                                <nav>
                                                    <ul>
                                                        <li class="item-has-children">
                                                            <NuxtLink to="/course">Development</NuxtLink>
                                                            <ul class="category-submenu">
                                                                <li>
                                                                    <NuxtLink to="/course">All Development</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Mobile App</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Web Development</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Development tools</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Database</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Programming language
                                                                    </NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="item-has-children">
                                                            <NuxtLink to="/course">Art & Design</NuxtLink>
                                                            <ul class="category-submenu">
                                                                <li>
                                                                    <NuxtLink to="/course">Web Design</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Graphic Design</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Design tools</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">All Art</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Marketing</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="item-has-children">
                                                            <NuxtLink to="/course">Business</NuxtLink>
                                                            <ul class="category-submenu">
                                                                <li>
                                                                    <NuxtLink to="/course">All Business</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Communications</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Finance</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Management</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Sales</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="item-has-children">
                                                            <NuxtLink to="/course">Life Style</NuxtLink>
                                                            <ul class="category-submenu">
                                                                <li>
                                                                    <NuxtLink to="/course">Life Style</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Mental Health</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Dieting</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">All Art</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Nutrition</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="item-has-children">
                                                            <NuxtLink to="/course">Health & Fitness</NuxtLink>
                                                            <ul class="category-submenu">
                                                                <li>
                                                                    <NuxtLink to="/course">All Health & Fitness
                                                                    </NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Beauty & Makeup</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Food & Beverages</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/course">Good Food</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course">Data Science</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course">Marketing</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course">Photography</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="main-menu d-none d-xl-block">
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
                                                    <NuxtLink>Events</NuxtLink>
                                                    <ul class="sub-menu">
                                                        <li>
                                                            <NuxtLink to="/event">Upcoming Event</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink>Expired Events
                                                            </NuxtLink>
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
                                    <div class="header-search d-none d-xxl-block mr-30">
                                        <form action="#">
                                            <div class="search-icon p-relative">
                                                <input type="text" placeholder="Search courses...">
                                                <button type="submit"><i class="fas fa-search"></i></button>
                                            </div>
                                        </form>
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
                                        <div class="d-none d-md-block">
                                            <a class="user-btn-sign-up edu-btn" href="javascript:void(0)"
                                                @click="handleAddEvent">Host Event</a>
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
                                    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
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
                                            <NuxtLink>Expired Events
                                            </NuxtLink>
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
                            <form action="#" class="filter-search-input">
                                <input type="text" placeholder="Search keyword">
                                <button><i class="fal fa-search"></i></button>
                            </form>
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
                            <div class="user-btn-content mb-20 mt-20">
                                <a class="user-btn-sign-in" href="javascript:void(0)"
                                    @click="handleAddEvent">Host Event</a>
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
        <div :class="`${showSignIn ? 'signin-area open position-absolute' : 'signin-area'}`">
            <div class="signin-area-wrapper">
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
                        <input v-model="SignInEmail" type="text" placeholder="Email or Username">
                    </div>
                    <div class="signup-wrapper">
                        <input v-model="SignInPass" type="password" placeholder="Password">
                    </div>
                    <div class="signup-action">
                        <div class="course-sidebar-list">
                            <input class="signup-checkbo" type="checkbox" id="sing-in">
                            <label class="sign-check" for="sing-in"><span>Remember me</span></label>
                        </div>
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
                    <div class="sign-social text-center">
                        <span>Or Sign- in with</span>
                    </div>
                    <div class="sign-social-icon">
                        <div class="sign-facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9.034" height="18.531"
                                viewBox="0 0 9.034 18.531">
                                <path id="Path_212" data-name="Path 212"
                                    d="M183.106,757.2v-1.622c0-.811.116-1.274,1.39-1.274h1.621v-3.127h-2.664c-3.243,0-4.285,1.506-4.285,4.169v1.969h-2.085v3.127h1.969v9.265h4.054v-9.265h2.664l.347-3.243Z"
                                    transform="translate(-177.083 -751.176)" fill="#2467ec" />
                            </svg>
                            <a href="#">Facebook</a>
                        </div>
                        <div class="sign-gmail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.692" height="16.273"
                                viewBox="0 0 21.692 16.273">
                                <g id="gmail" transform="translate(0 -63.953)">
                                    <path id="Path_8685" data-name="Path 8685"
                                        d="M1.479,169.418H4.93v-8.381l-2.26-3.946L0,157.339v10.6a1.479,1.479,0,0,0,1.479,1.479Z"
                                        transform="translate(0 -89.192)" fill="#0085f7" />
                                    <path id="Path_8686" data-name="Path 8686"
                                        d="M395.636,169.418h3.451a1.479,1.479,0,0,0,1.479-1.479v-10.6l-2.666-.248-2.264,3.946v8.381Z"
                                        transform="translate(-378.874 -89.192)" fill="#00a94b" />
                                    <path id="Path_8687" data-name="Path 8687"
                                        d="M349.816,65.436,347.789,69.3l2.027,2.541,4.93-3.7V66.176A2.219,2.219,0,0,0,351.2,64.4Z"
                                        transform="translate(-333.054)" fill="#ffbc00" />
                                    <path id="Path_8688" data-name="Path 8688"
                                        d="M72.7,105.365l-1.932-4.08L72.7,98.956l5.916,4.437,5.916-4.437v6.409L78.619,109.8Z"
                                        transform="translate(-67.773 -33.52)" fill="#ff4131" fill-rule="evenodd" />
                                    <path id="Path_8689" data-name="Path 8689"
                                        d="M0,66.176v1.972l4.93,3.7V65.436L3.55,64.4A2.219,2.219,0,0,0,0,66.176Z"
                                        transform="translate(0)" fill="#e51c19" />
                                </g>
                            </svg>
                            <a href="#">Google</a>
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
                        <input v-model="SignUpData.FName" type="text" placeholder="First Name">
                        <input v-model="SignUpData.LName" type="text" placeholder="Last Name">
                    </div>
                    <div class="signup-wrapper">
                        <label for="DOB">Date of Birth</label>
                        <input v-model="DOB" type="Date" name="DOB">
                    </div>
                    <div class="signup-wrapper">
                        <select v-model="SignUpData.Gender" class="form-select">
                            <option value="" disabled selected>Gender *</option>
                            <option value="Male">M</option>
                            <option value="Female">F</option>
                        </select>
                    </div>
                    <div class="signup-wrapper">
                        <input v-model="SignUpData.Email" type="text" placeholder="Email">
                    </div>
                    <div class="signup-wrapper">
                        <input v-model="SignUpData.password" type="password" placeholder="Password">
                    </div>
                    <div class="signup-wrapper">
                        <select v-model="SignUpData.PrefferedSport" class="form-select">
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
                        <select v-model="SignUpData.PrefferedLocation" class="form-select">
                            <option value="" disabled selected>Preffered State *</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Haryana">Haryana</option>
                            <option value="UP">UP</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Maharashtra">Maharashtra</option>
                        </select>
                    </div>
                    <div class="signup-action">
                        <div class="course-sidebar-list">
                            <input class="signup-checkbo" type="checkbox" id="sing-up">
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
                        <button class="sing-btn w-100">Register now</button>
                    </div>
                    <div class="acount-login text-center">
                        <span>Already have an account? <a href="#" @click="handleSignIn">Log in</a></span>
                    </div>
                    <div class="sign-social text-center">
                        <span>Or Sign- in with</span>
                    </div>
                    <div class="sign-social-icon">
                        <div class="sign-facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9.034" height="18.531"
                                viewBox="0 0 9.034 18.531">
                                <path id="Path_2121121" data-name="Path 212"
                                    d="M183.106,757.2v-1.622c0-.811.116-1.274,1.39-1.274h1.621v-3.127h-2.664c-3.243,0-4.285,1.506-4.285,4.169v1.969h-2.085v3.127h1.969v9.265h4.054v-9.265h2.664l.347-3.243Z"
                                    transform="translate(-177.083 -751.176)" fill="#2467ec" />
                            </svg>
                            <a href="#">Facebook</a>
                        </div>
                        <div class="sign-gmail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.692" height="16.273"
                                viewBox="0 0 21.692 16.273">
                                <g id="gmail-01" transform="translate(0 -63.953)">
                                    <path id="Path_868365" data-name="Path 863185"
                                        d="M1.479,169.418H4.93v-8.381l-2.26-3.946L0,157.339v10.6a1.479,1.479,0,0,0,1.479,1.479Z"
                                        transform="translate(0 -89.192)" fill="#0085f7" />
                                    <path id="Path_863286" data-name="Path 8683106"
                                        d="M395.636,169.418h3.451a1.479,1.479,0,0,0,1.479-1.479v-10.6l-2.666-.248-2.264,3.946v8.381Z"
                                        transform="translate(-378.874 -89.192)" fill="#00a94b" />
                                    <path id="Path_8322687" data-name="Path 831687"
                                        d="M349.816,65.436,347.789,69.3l2.027,2.541,4.93-3.7V66.176A2.219,2.219,0,0,0,351.2,64.4Z"
                                        transform="translate(-333.054)" fill="#ffbc00" />
                                    <path id="Path_863088" data-name="Path 868038"
                                        d="M72.7,105.365l-1.932-4.08L72.7,98.956l5.916,4.437,5.916-4.437v6.409L78.619,109.8Z"
                                        transform="translate(-67.773 -33.52)" fill="#ff4131" fill-rule="evenodd" />
                                    <path id="Path_8682519" data-name="Path 868921"
                                        d="M0,66.176v1.972l4.93,3.7V65.436L3.55,64.4A2.219,2.219,0,0,0,0,66.176Z"
                                        transform="translate(0)" fill="#e51c19" />
                                </g>
                            </svg>
                            <a href="#">Google</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div :class="`${showSignUp ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`" @click="handleSignUp">
        </div>
        <!-- signup-area-start -->

        <!-- event-area-start -->
        <div :class="`${showAddEvent ? 'signup-area open position-absolute' : 'signup-area'}`">
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
                    <div class="sing-buttom mb-20">
                        <button type="submit" class="sing-btn w-100">Host Event</button>
                    </div>
                </form>
            </div>
        </div>
        <div :class="`${showAddEvent ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`" @click="handleAddEvent">
        </div>
        <!-- event-area-start -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "app",
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
            },
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
            EventError: false,
            loggedIn: false,
            SignInEmailError: false,
            SignUpEmailError: false,
            showAddEvent: false,
            showSignIn: false,
            showSignUp: false,
            showCart: false,
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
        handleCart() {
            return this.showCart = !this.showCart
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
        async addEvent() {
            const data = JSON.parse(localStorage.UserData)
            this.EventData.createdById = data.id;
            this.EventData.createdByFName = data.FName;
            this.EventData.createdByLName = data.LName;
            axios.post('http://127.0.0.1:4000/events/createEvent', this.EventData)
                .then((response) => {
                    console.log(response)
                    localStorage.setItem('addEventData', JSON.stringify(this.EventData))
                    this.$router.go()
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
        validateEmail(data) {
            console.log(data)
            const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data)
            return result
        },
        handleLogOut() {
            window.localStorage.clear()
            this.$router.replace('/')
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleSticky)
    },
    beforeMount() {
        if (localStorage.loggedIn) {
        this.loggedIn = localStorage.loggedIn;
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
</style>
