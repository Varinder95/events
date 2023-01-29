<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import ContactFormSection from "./ContactFormSection.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    components: {
        FooterOne,
        PageTitle,
        ContactFormSection,
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

        <!-- PageTitle-area-start -->
        <PageTitle pageTitle="Contact" pageSubTitle="Contact" />
        <!-- PageTitle-area-end -->

        <!-- Contact-area-start -->
        <ContactFormSection />
        <!-- Contact-area-end -->

        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->
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