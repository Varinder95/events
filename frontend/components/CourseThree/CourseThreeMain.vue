<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import Pagination from "../Common/Pagination.vue";
import CourseBar from "../Course/CourseBar.vue";
import ShopSidebar from "../Shop/ShopSidebar.vue";
import courseItemsMixin from "../../mixins/courseItemsMixin";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    mixins: [courseItemsMixin],
    components: {
        FooterOne,
        PageTitle,
        CourseBar,
        Pagination,
        ShopSidebar,
        HeaderFour
    }
};
</script>


<template>
    <div>

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- PageTitle-area-start -->
        <PageTitle pageTitle="Courses 03" pageSubTitle="Courses 03" />
        <!-- PageTitle-area-end -->

        <!-- course-bar-area-start -->
        <CourseBar />
        <!-- course-bar-area-end -->

        <!-- course-area-start -->
        <section class="course-content-area pb-90">
            <div class="container">
                <div class="row mb-10">
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-8">
                        <ShopSidebar />
                    </div>

                    <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-12">
                        <div class="row">
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6" v-for="item in courseItemss.slice(0, 8)"
                                :key="item.id">
                                <div class="eduman-course-main-wrapper mb-30">
                                    <div class="eduman-course-thumb w-img">
                                        <NuxtLink :to="`/course-details/${item.id}`"><img :src="item.courseImage"
                                                alt="course-img"></NuxtLink>
                                    </div>
                                    <div class="course-cart">
                                        <div class="course-info-wrapper">
                                            <div class="cart-info-body">
                                                <span :class="item.badgeClass">
                                                    <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                                                </span>
                                                <NuxtLink :to="`/course-details/${item.id}`">
                                                    <h3>{{ item.title }}</h3>
                                                </NuxtLink>
                                                <div class="cart-lavel">
                                                    <h5>{{ item.level }} <span>{{ item.beginer }}</span></h5>
                                                    <p>{{ item.description }}</p>
                                                </div>
                                                <div class="info-cart-text">
                                                    <ul>
                                                        <li v-for="itemTwo in item.infoList"
                                                            :key="itemTwo.infoListTitle"><i class="far fa-check"></i>{{
                                                                    itemTwo.infoListTitle
                                                            }}</li>
                                                    </ul>
                                                </div>
                                                <div class="course-action">
                                                    <NuxtLink :to="`/course-details/${item.id}`"
                                                        class="view-details-btn">{{ item.viewBtn }}</NuxtLink>
                                                    <button class="wishlist-btn"><i :class="item.wishIcon"></i></button>
                                                    <NuxtLink :to="`/course-details/${item.id}`" class="c-share-btn"><i
                                                            :class="item.shareIcon"></i></NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="eduman-course-wraper">
                                        <div class="eduman-course-heading">
                                            <NuxtLink :class="item.badgeClass" to="/course">{{ item.badge }}</NuxtLink>
                                            <span class="couse-star"><i class="fas fa-star"></i>4.9 (25)</span>
                                        </div>
                                        <div class="eduman-course-text">
                                            <h3>
                                                <NuxtLink :to="`/course-details/${item.id}`">{{ item.courseTitle }}
                                                </NuxtLink>
                                            </h3>
                                        </div>
                                        <div class="eduman-course-meta">
                                            <div class="eduman-course-price">
                                                <span class="price-now">{{ item.price }}</span>
                                                <del class="price-old">{{ item.priceOld }}</del>
                                            </div>
                                            <div class="eduman-course-tutor">
                                                <NuxtLink to="/instructor"><img :src="item.instructorImage"
                                                        alt="tutor-img"></NuxtLink>
                                                <NuxtLink to="/instructor"><span>{{ item.instructor }}</span></NuxtLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="eduman-course-footer">
                                        <div class="course-lessson-svg">
                                            <i v-html="item.lessonIcon"></i>
                                            <span class="ms-2">{{ item.lesson }}</span>
                                        </div>
                                        <div class="course-deteals-btn">
                                            <NuxtLink :to="`/course-details/${item.id}`"><span class="me-2">{{
                                                    item.viewBtn
                                            }}</span><i class="far fa-arrow-right"></i></NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
        <!-- course-area-end -->

        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->

    </div>

</template>

<style scoped>
</style>