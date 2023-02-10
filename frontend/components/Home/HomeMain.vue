<script>
import HeroSectionVue from "./HeroSection.vue";
import CategoriesSectionVue from "./CategoriesSection.vue";
import CourseSection from "./CourseSection.vue"
import StudentSection from "./StudentSection.vue"
import FeatureSection from "./FeatureSection.vue"
import BrowseCourse from "./BrowseCourse.vue"
import TestimonialSection from "./TestimonialSection.vue"
import EducationSection from "./EducationSection.vue"
import BrandSection from "./BrandSection.vue"
import FooterOne from "../Common/FooterOne"
import Header from "../Common/Header.vue";
import UpcomingEventsDash from "../Event/UpcomingEventsDash.vue";

export default {
    name: "app",
    scrollToTop: true,
    components: {
        HeroSectionVue,
        CategoriesSectionVue,
        CourseSection,
        StudentSection,
        FeatureSection,
        BrowseCourse,
        TestimonialSection,
        EducationSection,
        BrandSection,
        FooterOne,
        Header,
        UpcomingEventsDash
    },
    data() {
        return {
            loaded: false,
        }
    },
    mounted() {
        this.loaded = true
    }
};
</script>

<template>
    <div v-if="loaded">
        <!-- header-area-start -->
        <Header />
        <!-- header-area-end -->

        <!-- hero-area-start -->
        <HeroSectionVue />
        <!-- hero-area-end -->

        <!-- Upcoming Events start-->
        <UpcomingEventsDash />
        <!-- Upcoming Events end-->

        <!-- categories-area-start -->
        <CategoriesSectionVue />
        <!-- categories-area-end -->

        <!-- course-area-end -->
        <CourseSection />
        <!-- course-area-end -->

        <!-- feature-area-start -->
        <FeatureSection />
        <!-- feature-area-end -->

        <!-- student-area-start -->
        <StudentSection />
        <!-- student-area-end -->

        <!-- testimonial-area-end -->
        <TestimonialSection />
        <!-- testimonial-area-end -->

        <!-- education-area-start -->
        <EducationSection />
        <!-- education-area-end -->

        <!-- education-area-end -->
        <FooterOne />
        <!-- education-area-end -->

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
</style>
