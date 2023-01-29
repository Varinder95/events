<script>
import MembershipPlan from "./MembershipPlan.vue";
import TestimonialSection from "../Home/TestimonialSection.vue";
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    components: {
        MembershipPlan,
        TestimonialSection,
        FooterOne,
        PageTitle,
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
        <PageTitle pageTitle="Membership Plan" pageSubTitle="Membership Plan" />
        <!-- PageTitle-area-end -->

        <!-- Membership-area-start -->
        <MembershipPlan />
        <!-- Membership-area-end -->

        <!-- Testimonial-area-start -->
        <TestimonialSection testimonial_spacing="testimonial-area pt-80 pb-120" />
        <!-- Testimonial-area-end -->

        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->

    </div>

</template>

<style scoped>
</style>
