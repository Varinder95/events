<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";
import ExpiredEvents from "./ExpiredEvents.vue";

export default {
   name: "app",
   components: {
      FooterOne,
      PageTitle,
      HeaderFour,
      ExpiredEvents
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
      <HeaderFour />
      <!-- header-area-end -->
      
      <!-- PageTitle-area-end -->
      <PageTitle pageTitle="Expired Events" pageSubTitle="Expired Events" />
      <!-- PageTitle-area-end -->

      <!-- event-area-start -->
      <ExpiredEvents />
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
