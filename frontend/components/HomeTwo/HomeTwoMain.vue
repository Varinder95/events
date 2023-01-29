<script>
import HeroSectionTwo from "./HeroSectionTwo.vue";
import CounterSection from "./CounterSection.vue";
import AboutSection from "./AboutSection.vue";
import PartnerSection from "./PartnerSection.vue";
import FeatureSection from "../Home/FeatureSection.vue";
import TeacherSection from "./TeacherSection.vue";
import ZoomSection from "./ZoomSection.vue";
import SkillSection from "./SkillSection.vue";
import FooterOne from "../Common/FooterOne.vue";
import BlogSection from "./BlogSection.vue";
import TopCategories from "./TopCategories.vue";
import CourseSectionTwo from "./CourseSectionTwo.vue";
import HeaderTwo from "../Common/HeaderTwo.vue";


export default {
    name: "app",
    scrollToTop: true,
    components: {
        HeroSectionTwo,
        CounterSection,
        AboutSection,
        PartnerSection,
        FeatureSection,
        TeacherSection,
        ZoomSection,
        SkillSection,
        FooterOne,
        BlogSection,
        TopCategories,
        CourseSectionTwo,
        HeaderTwo
    }
};
</script>

<template>
    <div>
        <!-- header-area-start -->
        <HeaderTwo />
        <!-- header-area-end -->

        <!-- hero-area-start -->
        <HeroSectionTwo />
        <!-- hero-area-end -->

        <!-- counter-area-start -->
        <CounterSection />
        <!-- counter-area-end -->

        <!-- about-area-start -->
        <AboutSection />
        <!-- about-area-end -->

        <!-- categories-area-start -->
        <TopCategories />
        <!-- categories-area-end -->

        <!-- course-area-end -->
        <CourseSectionTwo />
        <!-- course-area-end -->

        <!-- partner-area-start -->
        <PartnerSection />
        <!-- partner-area-end -->

        <!-- feture-area-start -->
        <FeatureSection space_minus="features-area margin-top pt-45 pb-15" />
        <!-- feture-area-end -->

        <!-- teacher-area-start -->
        <TeacherSection />
        <!-- teacher-area-end -->

        <!-- zoom-area-start -->
        <ZoomSection />
        <!-- zoom-area-end -->

        <!-- skill-area-start -->
        <SkillSection />
        <!-- skill-area-end -->

        <!-- blog-area-end -->
        <BlogSection />
        <!-- blog-area-end -->


        <!-- footer-area-start -->
        <FooterOne />
        <!-- footer-area-end -->

    </div>

</template>

<style scoped>
</style>
