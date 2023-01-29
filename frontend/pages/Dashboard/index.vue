<script>
import UserProfileMain from '~~/components/UserProfile/UserProfileMain.vue';

export default {
  name: "UserProfile",
  components: {
    UserProfileMain
  },
  mounted() {
      if(!process.client) return;
      const loggedIn = localStorage.getItem("loggedIn");
      if(!loggedIn){
          this.$router.replace('/')
      }
  }
};
</script>
<template>
  <UserProfileMain />
</template>
<style scoped>
</style>