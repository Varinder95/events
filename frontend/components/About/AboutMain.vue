<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import StudentSection from "../Home/StudentSection.vue";
import AboutFeatureSection from "./AboutFeatureSection.vue";
import VideoSection from "./VideoSection.vue";
import AboutCounter from "./AboutCounter.vue";
import KnowUsSection from "./KnowUsSection.vue";
import InstructorToday from "../BecomeInstructor/InstructorToday.vue";
import AffiliateSection from "./AffiliateSection.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    components: {
        FooterOne,
        PageTitle,
        StudentSection,
        AboutFeatureSection,
        VideoSection,
        AboutCounter,
        KnowUsSection,
        InstructorToday,
        AffiliateSection,
        HeaderFour
    },
    data() {
        return {
        loggedIn: false,
        loaded: false
        }
    },
    mounted() {
        if (localStorage.loggedIn) {
        this.loggedIn = localStorage.loggedIn;
        }
        this.loaded = true
    }
};
</script>

<template>
    <div v-if="loaded">

        <!-- header-area-start -->
        <HeaderFour :isLoggedIn="loggedIn" />
        <!-- header-area-end -->

        <!-- PageTitle-area-end -->
        <PageTitle pageTitle="About" pageSubTitle="About" />
        <!-- PageTitle-area-end -->

        <!-- student-area-start -->
        <StudentSection student_Space="student-choose-area fix pt-110 pb-90" />
        <!-- student-area-end -->

        <!-- feature-area-start -->
        <AboutFeatureSection />
        <!-- feature-area-end -->

        <!-- Video-area-start -->
        <VideoSection />
        <!-- Video-area-end -->

        <!-- Counter-area-start -->
        <AboutCounter />
        <!-- Counter-area-end -->

        <!-- KnowUs-area-start -->
        <KnowUsSection />
        <!-- KnowUs-area-end -->

        <!-- InstructorToday-area-start -->
        <InstructorToday />
        <!-- InstructorToday-area-end -->

        <!-- AffiliateSection-area-start -->
        <AffiliateSection />
        <!-- AffiliateSection-area-end -->

        <!-- education-area-start -->
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