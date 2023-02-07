<script>
import PendingEvent from '~~/components/PendingEvent.vue';

export default {
  name: "pending",
  components: {
    PendingEvent,
  },
  data() {
    return {
      loaded: false,
    }
  },
  beforeMount() {
      if(!process.client) return;
      const loggedIn = localStorage.getItem("loggedIn");
      if(!loggedIn){
          this.$router.replace('/')
      }
      else{
        if(JSON.parse(localStorage.UserData).Status === "Admin") {
          this.loaded = true
        }
        else {
          this.$router.replace('/dashboard')
        }
      }
  }
};
</script>
<template>
    <div v-if="loaded">
      <PendingEvent />
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