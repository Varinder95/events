<script>
import SearchEventMain from '~~/components/FindEvent/SearchEventMain.vue';

export default {
    name: "app",
    components: {
        SearchEventMain
    },
    data() {
        return {
            query: this.$route.query.find,
            location: this.$route.query.location,
            date: this.$route.query.date
        }
    },
    mounted(){
    }
};
</script>
<template>
    <SearchEventMain :findQuery="query" :filterLocation="location" :filterDate="date"/>
</template>
<style scoped>

</style>