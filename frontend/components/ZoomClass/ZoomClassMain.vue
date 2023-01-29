<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import zoomClassMixin from "../../mixins/zoomClassMixin";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    mixins: [zoomClassMixin],
    components: {
        FooterOne,
        PageTitle,
        HeaderFour
    }
};
</script>

<template>
    <div>

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- PageTitle-area-end -->
        <PageTitle pageTitle="Zoom Live Class" pageSubTitle="Zoom Live Class" />
        <!-- PageTitle-area-end -->

        <!-- zoom-area-start -->
        <section class="zoom-class-area pt-120 pb-90">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12">
                        <div class="zoom-class-main-wrapper mb-30" v-for="item in zoomClasss" :key="item.id">
                            <div class="zoom-class-thumb w-img">
                                <img :src="item.zoomImage" alt="zoom-thumb">
                            </div>
                            <div class="zoom-class-item">
                                <div class="zooom-class-tittle">
                                    <h3>
                                        <NuxtLink :to="`/zoom-class-details/${item.id}`">{{ item.zoomTitle }}</NuxtLink>
                                    </h3>
                                </div>
                                <div class="xzoom-class-detalis">
                                    <div class="class-list-date d-flex align-items-center">
                                        <i class="flaticon-calendar"></i><span>{{ item.zoomDate }}</span>
                                    </div>
                                    <div class="class-list-length d-flex align-items-center">
                                        <i class="flaticon-video-marketing"></i><span>{{ item.zoomLength }}</span>
                                    </div>
                                    <div class="class-list-time d-flex align-items-center">
                                        <i class="flaticon-wall-clock"></i><span>{{ item.zoomSchedule }}</span>
                                    </div>
                                    <div class="class-metting">
                                        <span>Meeting ID:<a href="#">{{ item.zoomMeeting }}</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-8">
                        <div class="sidebar-widget-wrapper">
                            <div class="sidebar-widget mb-30">
                                <div class="sidebar-widget-details">
                                    <div class="zoom-widget-tittle">
                                        <h4>Details</h4>
                                    </div>
                                    <div class="zoom-widget-list">
                                        <ul>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-avatar"></i>
                                                    <span>Hosted by</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>Junior Lucy</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-calendar"></i>
                                                    <span>Date</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>10 Jan 2022</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-clock"></i>
                                                    <span>Schedule</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>10 AM - 12 PM</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-video-marketing"></i>
                                                    <span>Length</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>2h 10m</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-menu-2"></i>
                                                    <span>Category</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>Data Science</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-earth-grid-select-language-button"></i>
                                                    <span>Laguage</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>English</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="widget-detalis">
                                                    <i class="flaticon-bookmark-white"></i>
                                                    <span>Hosted by</span>
                                                </div>
                                                <div class="widget-list">
                                                    <span>Via Zoom</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="zoom-btn">
                                        <NuxtLink class="event-btn" to="/zoom-class-details"><i
                                                class="flaticon-video-camera"></i>Join this class</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- zoom-area-end -->

        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->

    </div>

</template>

<style scoped>
</style>
