<script>
import EventDetailsMain from '~~/components/EventDetails/EventDetailsMain.vue';

export default {
    name: "app",
    components: {
        EventDetailsMain
    },
    data() {
        return {
            id: this.$route.params.id,
        }
    }
};
</script>
<template>
    <EventDetailsMain :eventId="id"/>
</template>
<style scoped>

</style>