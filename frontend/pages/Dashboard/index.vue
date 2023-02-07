<script>
import UserProfileMain from '~~/components/UserProfile/UserProfileMain.vue';

export default {
  name: "UserProfile",
  components: {
    UserProfileMain
  },
  data() {
    return {
      loaded: false,

    }
  },
  mounted() {
      if(!process.client) return;
      const loggedIn = localStorage.getItem("loggedIn");
      if(!loggedIn){
          this.$router.replace('/')
      }
      else{
        this.loaded = true
      }
  }
};
</script>
<template>
  <div v-if="loaded">
    <UserProfileMain />
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