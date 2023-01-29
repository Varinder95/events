<template>
    <div class="banner-area faq position-relative">
        <div class="banner-img">
            <img src="/img/banner/banner.png" alt="image not found">
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="course-title-breadcrumb breadcrumb-top">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item white-color">
                                <NuxtLink to="/">Home</NuxtLink>
                            </li>
                            <li class="breadcrumb-item white-color">
                                <NuxtLink to="/faq-page">Help FAQ</NuxtLink>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="col-xl-8">
                    <div class="banner-tiitle-wrapper text-center">
                        <div class="banner-tittle">
                            <h2>Welcome to help and support center!<br>How may we help you?</h2>
                        </div>
                        <div class="banner-search-box">
                            <form action="#">
                                <div class="slider-faq-search">
                                    <input type="text" placeholder="Search courses...">
                                    <button type="submit"><i class="fal fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'faqBanner',
}
</script>