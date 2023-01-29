<script>
import FooterOne from "../Common/FooterOne.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    components: {
        FooterOne,
        HeaderFour
    }
};
</script>

<template>
    <div>
        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <div class="content-error-area pt-120 pb-120">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-8">
                        <div class="content-error-item text-center">
                            <div class="error-thumb">
                                <img src="/img/bg/error-thumb.png" alt="image not found">
                            </div>
                            <div class="section-title">
                                <h2 class="mb-20">Oops! That page can't be found.</h2>
                                <p>We couldn't find any results for your search. Use more generic words or double check
                                    your
                                    spelling.</p>
                            </div>
                            <div class="error-btn">
                                <NuxtLink to="/" class="edu-btn">Back to homepage</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- education-area-end -->
        <FooterOne />
        <!-- education-area-end -->
    </div>

</template>

<style scoped>
</style>
