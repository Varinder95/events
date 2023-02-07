<script>
import AdminMain from '~~/components/Admin/AdminMain.vue';

export default {
  name: "admin",
  components: {
    AdminMain,
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
      <AdminMain />
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