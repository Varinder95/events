

<template>
    <div>

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- course-area-end -->
        <PageTitle pageTitle="Instructor" pageSubTitle="Instructor" />
        <!-- course-area-end -->

        <!-- instructor-area-start -->
        <section class="member-area pt-125 pb-90">
            <div class="container">
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-6" v-for="item in instructorProfiless" :key="item.id">
                        <div class="member-main-wrapper mb-30">
                            <div class="member-body text-center">
                                <div class="member-item">
                                    <div class="member-thumb">
                                        <NuxtLink :to="`/instructor-profile/${item.id}`"><img
                                                :src="item.instructorImage" alt="member-img"></NuxtLink>
                                    </div>
                                    <div class="member-content">
                                        <h4>
                                            <NuxtLink :to="`/instructor-profile/${item.id}`">{{ item.instructorTitle }}
                                            </NuxtLink>
                                        </h4>
                                        <span>{{ item.instructorDesignation }}</span>
                                    </div>
                                    <div class="member-social">
                                        <ul>
                                            <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fab fa-vimeo-v"></i></a></li>
                                            <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="member-meta">
                                <div class="member-reating">
                                    <i class="fas fa-star"></i>
                                    <span>{{ item.instructorRating }}</span>
                                </div>
                                <div class="member-course">
                                    <i class="flaticon-computer"></i>
                                    <NuxtLink to="/course"><span>{{ item.instructorCourse }}</span></NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- instructor-area-end -->

        <!-- education-area-start -->
        <FooterOne />
        <!-- education-area-end -->

    </div>

</template>

<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";
import instructorProfilesMixin from "~~/mixins/instructorProfilesMixin";

export default {
    name: "app",
    mixins: [instructorProfilesMixin],
    components: {
        FooterOne,
        PageTitle,
        HeaderFour
    }
};
</script>

<style scoped>
</style>
