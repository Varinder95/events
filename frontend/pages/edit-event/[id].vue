<script>
import EditEvent from '~~/components/AddEvent/EditEvent.vue';

export default {
    name: "app",
    components: {
        EditEvent
    },
    data() {
        return {
            id: this.$route.params.id,
        }
    }
};
</script>
<template>
    <EditEvent :eventId="id"/>
</template>
<style scoped>

</style>