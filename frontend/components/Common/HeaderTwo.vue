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
            <div :class="`${isSticky ? 'header-area-2 sticky-header sticky' : 'header-area-2 sticky-header'}`">
                <div class="container-fluid">
                    <div class="header-main-wrapper">
                        <div class="row align-items-center">
                            <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                <div class="header-logo">
                                    <NuxtLink to="/"><img src="/img/logo/logo-black.png" alt="logo"></NuxtLink>
                                </div>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9">
                                <div class="header-main-right  d-flex justify-content-end">
                                    <div class="main-menu main-menu-side-change mr-30 d-none d-xl-block">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li class="menu-item-has-children">
                                                    <NuxtLink to="/">Home</NuxtLink>
                                                    <ul class="sub-menu">
                                                        <li>
                                                            <NuxtLink to="/">Home 1</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/homeTwo">Home 2</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/homeThree">Home 3</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu-item-has-children">
                                                    <NuxtLink to="/course">Course</NuxtLink>
                                                    <ul class="sub-menu">
                                                        <li>
                                                            <NuxtLink to="/course">Course 1</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course-2">Course 2</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course-3">Course 3</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course-4">Course 4</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/course-details">Course Details</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu-item-has-children">
                                                    <NuxtLink to="/shop">Shop</NuxtLink>
                                                    <ul class="sub-menu">
                                                        <li>
                                                            <NuxtLink to="/shop">Shop</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/shop-details">Shop Details</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/wishlist">Wishlist</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/cart">Cart</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/checkout">Checkout</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu-item-has-children"><a
                                                        href="javascript:void(0)">Pages</a>
                                                    <ul class="sub-menu">
                                                        <li>
                                                            <NuxtLink to="/about">About</NuxtLink>
                                                        </li>
                                                        <li class="menu-item-has-children">
                                                            <NuxtLink to="/instructor">instructor</NuxtLink>
                                                            <ul class="sub-menu">
                                                                <li>
                                                                    <NuxtLink to="/instructor">instructor</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/instructor-profile">Instructor
                                                                        Profile</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/become-instructor">Become Instructor
                                                                    </NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu-item-has-children">
                                                            <NuxtLink to="/zoom-class">Zoom Class</NuxtLink>
                                                            <ul class="sub-menu">
                                                                <li>
                                                                    <NuxtLink to="/zoom-class">Zoom Class</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/zoom-class-details">Zoom Class
                                                                        Details</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu-item-has-children">
                                                            <NuxtLink to="/blog">Blog</NuxtLink>
                                                            <ul class="sub-menu">
                                                                <li>
                                                                    <NuxtLink to="/blog">Blog</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/blog-details">Blog Details</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu-item-has-children">
                                                            <NuxtLink to="/event">Event</NuxtLink>
                                                            <ul class="sub-menu">
                                                                <li>
                                                                    <NuxtLink to="/event">Event</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/event-details">Event Details
                                                                    </NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/membership">Membership Plan</NuxtLink>
                                                        </li>
                                                        <li class="menu-item-has-children">
                                                            <NuxtLink to="/faq-page">FAQ Page</NuxtLink>
                                                            <ul class="sub-menu">
                                                                <li>
                                                                    <NuxtLink to="/faq-page">FAQ Page</NuxtLink>
                                                                </li>
                                                                <li>
                                                                    <NuxtLink to="/faq-details">FAQ Details</NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/contact">Contact</NuxtLink>
                                                        </li>
                                                        <li>
                                                            <NuxtLink to="/404-page">404 pages</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div class="header-btn">
                                        <div class="cart-wrapper mr-45">
                                            <a href="javascript:void(0)" class="cart-toggle-btn" @click="handleCart">
                                                <div class="header__cart-icon p-relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19.988"
                                                        height="19.988" viewBox="0 0 19.988 19.988">
                                                        <g id="trolley-cart" transform="translate(-1 -1)">
                                                            <path id="Path_36" data-name="Path 36"
                                                                d="M1.666,2.333H3.8L6.159,12.344a1.993,1.993,0,0,0,.171,3.98H17.656a.666.666,0,1,0,0-1.333H6.33a.666.666,0,0,1,0-1.333H17.578a1.992,1.992,0,0,0,1.945-1.541l1.412-6a2,2,0,0,0-1.946-2.456H5.486L4.98,1.514A.666.666,0,0,0,4.331,1H1.666a.666.666,0,0,0,0,1.333ZM18.989,5a.677.677,0,0,1,.649.819l-1.412,6a.662.662,0,0,1-.648.514H7.524L5.8,5Z"
                                                                transform="translate(0 0)" fill="#141517" />
                                                            <path id="Path_37" data-name="Path 37"
                                                                d="M20,27a2,2,0,1,0,2-2A2,2,0,0,0,20,27Zm2.665,0A.666.666,0,1,1,22,26.333.666.666,0,0,1,22.665,27Z"
                                                                transform="translate(-6.341 -8.01)" fill="#141517" />
                                                            <path id="Path_38" data-name="Path 38"
                                                                d="M9,27a2,2,0,1,0,2-2A2,2,0,0,0,9,27Zm2.665,0A.666.666,0,1,1,11,26.333.666.666,0,0,1,11.665,27Z"
                                                                transform="translate(-2.67 -8.01)" fill="#141517" />
                                                        </g>
                                                    </svg>
                                                    <span class="item-number">3</span>
                                                </div>
                                            </a>
                                        </div>
                                        <a href="javascript:void(0)" class="edu-four-btn d-none d-lg-block"
                                            @click="handleSignIn">Enroll now</a>
                                        <div class="menu-bar ml-20">
                                            <a class="side-toggle header-2" href="javascript:void(0)"
                                                @click="handleSidebar">
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
                                <li class="menu-item-has-children has-droupdown"
                                    v-bind:class="[menuOption.homeDropdown === true ? 'active' : '']">
                                    <a @click="menuOption.homeDropdown = !menuOption.homeDropdown">Home</a>
                                    <ul class="sub-menu" :class="[menuOption.homeDropdown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/">Home Style 1</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/homeTwo">Home Style 2</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/homeThree">Home Style 3</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.coursesDropdown === true ? 'active' : '',]">
                                    <a @click="menuOption.coursesDropdown = !menuOption.coursesDropdown">Course</a>
                                    <ul class="sub-menu"
                                        :class="[menuOption.coursesDropdown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/course">Courses Style 1</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/course-2">Course Style 2</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/course-3">Course Style 3</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/course-4">Course Style 4</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/course-details">Course Details</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.shopDropdown === true ? 'active' : '']">

                                    <a v-on:click="menuOption.shopDropdown = !menuOption.shopDropdown">Shop</a>
                                    <ul class="sub-menu" :class="[menuOption.shopDropdown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/shop">Shop</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/shop-details">Shop Details</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/wishlist">Wishlist</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/cart">Cart</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/checkout">Checkout</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.blogDropdown === true ? 'active' : '']">

                                    <a v-on:click="menuOption.blogDropdown = !menuOption.blogDropdown">Blog</a>
                                    <ul class="sub-menu" :class="[menuOption.blogDropdown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/blog">Blog</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/blog-details">Blog Details</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.instructorDropDown === true ? 'active' : '']">

                                    <a
                                        v-on:click="menuOption.instructorDropDown = !menuOption.instructorDropDown">Instructor</a>
                                    <ul class="sub-menu"
                                        :class="[menuOption.instructorDropDown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/instructor">Instructor</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/instructor-profile">Instructor Profile</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/become-instructor">Become Instructor</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.faqDropDown === true ? 'active' : '']">

                                    <a v-on:click="menuOption.faqDropDown = !menuOption.faqDropDown">FAQ Page</a>
                                    <ul class="sub-menu" :class="[menuOption.faqDropDown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/faq-page">FAQ Page</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/faq-details">FAQ Details</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.eventDropDown === true ? 'active' : '']">

                                    <a v-on:click="menuOption.eventDropDown = !menuOption.eventDropDown">Event</a>
                                    <ul class="sub-menu" :class="[menuOption.eventDropDown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/event">Event</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/event-details">Event Details</NuxtLink>
                                        </li>
                                    </ul>
                                </li>

                                <li class="menu-item-has-children has-droupdown"
                                    :class="[menuOption.pagesDropDown === true ? 'active' : '',]">

                                    <a @click="menuOption.pagesDropDown = !menuOption.pagesDropDown">Pages</a>
                                    <ul class="sub-menu" :class="[menuOption.pagesDropDown === true ? 'active' : '',]">
                                        <li>
                                            <NuxtLink to="/about">About</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/zoom-class">Zoom Class</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/zoom-class-details">Zoom Class Details</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/membership">Membership</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/404-page">Error Page</NuxtLink>
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <NuxtLink to="/contact" class="border-0">Contact</NuxtLink>
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
                        <a href="javascript:void(0)" class="edu-four-btn" @click="handleSignIn">Enroll now</a>
                    </div>
                </div>
            </div>
        </div>
        <div :class="`${showSidebar ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`"
            @click="handleSidebarClose"></div>
        <!-- Mobile Menu End -->

        <!-- cart mini area start -->
        <div class="cartmini__area">
            <div :class="`${showCart ? 'cartmini__wrapper opened' : 'cartmini__wrapper'}`">
                <div class="cartmini__title">
                    <h4>Shopping cart</h4>
                </div>
                <div class="cartmini__close">
                    <button type="button" class="cartmini__close-btn" @click="handleCart"><i
                            class="fal fa-times"></i></button>
                </div>
                <div class="cartmini__widget">
                    <div class="cartmini__inner">
                        <ul>
                            <li>
                                <div class="cartmini__thumb">
                                    <NuxtLink to="/cart"><img src="/img/products/product-thumb-01.png"
                                            alt="image not found"></NuxtLink>
                                </div>
                                <div class="cartmini__content">
                                    <h5>
                                        <NuxtLink to="/cart">Turn Yourself</NuxtLink>
                                    </h5>
                                    <div class="product-quantity mt-10 mb-10">
                                        <span class="cart-minus" @click="handleDecreaseValue('valueFour')">-</span>
                                        <input class="cart-input" type="text" v-model="valueFour" />
                                        <span class="cart-plus" @click="handleIncreaseValue('valueFour')">+</span>
                                    </div>
                                    <div class="product__sm-price-wrapper">
                                        <span class="product__sm-price">$24.00</span>
                                    </div>
                                </div>
                                <a href="#" class="cartmini__del"><i class="fal fa-times"></i></a>
                            </li>
                            <li>
                                <div class="cartmini__thumb">
                                    <NuxtLink to="/cart"><img src="/img/products/product-thumb-02.png"
                                            alt="image not found"></NuxtLink>
                                </div>
                                <div class="cartmini__content">
                                    <h5>
                                        <NuxtLink to="/cart">Art of Not Giving</NuxtLink>
                                    </h5>
                                    <div class="product-quantity mt-10 mb-10">
                                        <span class="cart-minus" @click="handleDecreaseValue('valueFive')">-</span>
                                        <input class="cart-input" type="text" v-model="valueFive" />
                                        <span class="cart-plus" @click="handleIncreaseValue('valueFive')">+</span>
                                    </div>
                                    <div class="product__sm-price-wrapper">
                                        <span class="product__sm-price">$12.00</span>
                                    </div>
                                </div>
                                <a href="#" class="cartmini__del"><i class="fal fa-times"></i></a>
                            </li>
                            <li>
                                <div class="cartmini__thumb">
                                    <NuxtLink to="/cart"><img src="/img/products/product-thumb-03.png"
                                            alt="image not found"></NuxtLink>
                                </div>
                                <div class="cartmini__content">
                                    <h5>
                                        <NuxtLink to="/cart">Attract Women</NuxtLink>
                                    </h5>
                                    <div class="product-quantity mt-10 mb-10">
                                        <span class="cart-minus" @click="handleDecreaseValue('valueSix')">-</span>
                                        <input class="cart-input" type="text" v-model="valueSix" />
                                        <span class="cart-plus" @click="handleIncreaseValue('valueSix')">+</span>
                                    </div>
                                    <div class="product__sm-price-wrapper">
                                        <span class="product__sm-price">$42.00</span>
                                    </div>
                                </div>
                                <a href="#" class="cartmini__del"><i class="fal fa-times"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="cartmini__checkout">
                        <div class="cartmini__checkout-title mb-30">
                            <h4>Subtotal:</h4>
                            <span>$78.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="`${showCart ? 'body-overlay opened' : 'body-overlay'}`" @click="handleCart"></div>
        <!-- cart mini area end -->

        <!-- sigin-area start-->
        <div :class="`${showSignIn ? 'signin-area open' : 'signin-area'}`">
            <div class="signin-area-wrapper">
                <div class="signup-box text-center">
                    <div class="signup-text">
                        <h3>Sign in</h3>
                    </div>
                    <div class="signup-thumb">
                        <img src="/img/sing-up/sign-up.png" alt="image not found">
                    </div>
                </div>
                <div class="signup-form-wrapper">
                    <div class="signup-wrapper">
                        <input type="text" placeholder="Email or Username">
                    </div>
                    <div class="signup-wrapper">
                        <input type="text" placeholder="Password">
                    </div>
                    <div class="signup-action">
                        <div class="course-sidebar-list">
                            <input class="signup-checkbo" type="checkbox" id="sing-in">
                            <label class="sign-check" for="sing-in"><span>Remember me</span></label>
                        </div>
                    </div>
                    <div class="sing-buttom mb-20">
                        <button class="sing-btn">Register now</button>
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
                </div>
            </div>
        </div>
        <div :class="`${showSignIn ? 'offcanvas-overlay overlay-signin' : 'offcanvas-overlay'}`" @click="handleSignIn">
        </div>
        <!-- sigin-area end-->

        <!-- signup-area-start -->
        <div :class="`${showSignUp ? 'signup-area open' : 'signup-area'}`">
            <div class="sign-up-wrapper">
                <div class="signup-box text-center">
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
                <div class="signup-form-wrapper">
                    <div class="signup-input-wrapper">
                        <input type="text" placeholder="First Name">
                        <input type="text" placeholder="First Name">
                    </div>
                    <div class="signup-wrapper">
                        <input type="text" placeholder="Email">
                    </div>
                    <div class="signup-wrapper">
                        <input type="text" placeholder="Username">
                    </div>
                    <div class="signup-wrapper">
                        <input type="text" placeholder="Password">
                    </div>
                    <div class="signup-action">
                        <div class="course-sidebar-list">
                            <input class="signup-checkbo" type="checkbox" id="sing-up">
                            <label class="sign-check" for="sing-up"><span>Accept the terms and <a href="#">Privacy
                                        Policy</a></span></label>
                        </div>
                    </div>
                    <div class="sing-buttom mb-20">
                        <button class="sing-btn">Register now</button>
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
                </div>
            </div>
        </div>
        <div :class="`${showSignUp ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'}`" @click="handleSignUp">
        </div>
        <!-- signup-area-start -->
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
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
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleSticky)
    },
};
</script>