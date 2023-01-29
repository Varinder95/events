<template>
    <div class="hero-area hero-height d-flex align-items-center position-relative">
        <img class="hero-shape-5" src="/img/shape/shape-02.png" alt="shape">
        <img class="hero-shape-1" src="/img/shape/shape-03.png" alt="shape">
        <img class="hero-shape-6" src="/img/shape/shape-01.png" alt="shape">
        <img class="hero-shape-7" src="/img/shape/shape-10.png" alt="shape">
        <div class="hero-shap-5 d-none d-xxl-block">
            <div class="hero-card">
                <img src="/img/shape/slider-card-1.png" alt="image not found">
                <img src="/img/shape/slider-card-2.png" alt="image not found">
                <img src="/img/shape/slider-card-3.png" alt="image not found">
                <img src="/img/shape/slider-card-4.png" alt="image not found">
                <span><i class="far fa-plus"></i></span>
            </div>
            <h5>More than <span>21,500+</span> students
                enrolled around the world
            </h5>
        </div>
        <div class="container">
            <div class="hero-2-content-wrpapper position-relative">
                <div class="hero-shape-3 d-none d-xl-block">
                    <img src="/img/shape/shape-04.png" alt="image not found">
                    <h5 class="slider-shap-text">Top Rated
                        Instructors</h5>
                </div>
                <div class="hero-shape-2 d-none d-xl-block">
                    <img src="/img/shape/shape-09.png" alt="shape">
                </div>
                <div class="hero-shape-4 d-none d-lg-block">
                    <img src="/img/shape/shape-8.png" alt="shape">
                </div>
                <div class="hero-thumb-01 d-none d-xl-block">
                    <img src="/img/slider/hero-01.png" alt="shape">
                </div>
                <div class="hero-thumb-02 d-none d-lg-block">
                    <img src="/img/slider/hero-02.png" alt="shape">
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-8 col-md-10">
                        <div class="slider-content-wrapper">
                            <div class="hero-tittle-info text-center mb-45">
                                <h2>Build Your Own Online<br>
                                    Platform <span class="down-mark-line-2">Eduman</span></h2>
                            </div>
                            <div class="slider-search ">
                                <form action="#">
                                    <div class="slider-search-icon position-relative">
                                        <input type="text" placeholder="Search courses...">
                                        <button type="submit"><i class="far fa-search"></i></button>
                                    </div>
                                </form>
                            </div>
                            <div class="slider-course-content text-center">
                                <ul>
                                    <li v-for="item in heroService" :key="item.heroServiceTitle"><i class="fas fa-check-circle"></i><span>{{ item.heroServiceTitle }}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'heroTwo',
    data() {
        return {
            heroService: [{
                    heroServiceTitle: 'Free for physically handcraft',
                },
                {
                    heroServiceTitle: 'Course certificate',
                },
                {
                    heroServiceTitle: 'Easy to enroll courses',
                }
            ],
        }
    }
}
</script>