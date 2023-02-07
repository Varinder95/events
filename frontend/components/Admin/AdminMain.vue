<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";
import AdminTiles from "../Admin/AdminTiles.vue";

export default {
    name: "AdminMain",
    components: {
        FooterOne,
        PageTitle,
        HeaderFour,
        AdminTiles
    },
    data() {
        return {
            loaded: false,
        }
    },
    beforeMount() {
        if (localStorage.loggedIn) {
            this.loaded = localStorage.loggedIn;
        }
    }
};
</script>

<template>
    <div v-if="loaded">

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- PageTitle-area-end -->
        <PageTitle pageTitle="Admin Dashboard" pageSubTitle="Admin" />
        <!-- PageTitle-area-end -->

        <!-- event-area-start -->
        <div class="event-ara pt-120 pb-90">
            <div class="container">
                <AdminTiles />
            </div>
        </div>
        <!-- event-area-end -->

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