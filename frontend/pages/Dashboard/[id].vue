<template>
    <div>
        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- PageTitle-area-end -->
        <div class="hero-arera course-item-height" :style="{ backgroundImage: `url(/img/slider/course-slider.jpg)` }">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="hero-course-1-text">
                            <h2>Instructor</h2>
                        </div>
                        <div class="course-title-breadcrumb">
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <NuxtLink to="/">Home</NuxtLink>
                                    </li>
                                    <li class="breadcrumb-item"><span>Instructor</span></li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ instructorProfiles.instructorTitle }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- PageTitle-area-end -->

        <!-- course-detailes-area-start -->
        <div class="course-detalies-area pt-120 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-xl-3 col-lg-3">
                        <div class="course-instructors-img mb-30">
                            <img :src="instructorProfiles.instructorImage" alt="instructors-img">
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-9">
                        <div class="course-detelies-wrapper">
                            <div class="course-detiles-tittle mb-30">
                                <h3>{{ instructorProfiles.instructorTitle }}</h3>
                                <span>{{ instructorProfiles.instructorDesignation }}</span>
                            </div>
                            <div class="course-detiles-meta">
                                <div class="total-course">
                                    <span>Total Courses</span>
                                    <label>{{ instructorProfiles.instructorCourse }}</label>
                                </div>
                                <div class="student course">
                                    <span>Students</span>
                                    <label>5,230</label>
                                </div>
                                <div class="review-course">
                                    <span>Review</span>
                                    <div class="review-course-inner d-flex">
                                        <ul>
                                            <li><a href="#"><i class="fas fa-star"></i></a></li>
                                        </ul>
                                        <p>{{ instructorProfiles.instructorRating }}</p>
                                    </div>
                                </div>
                                <div class="course-details-action">
                                    <div class="course-follow">
                                        <a href="javascript:void(0)" class="edu-follow-btn">Follow</a>
                                    </div>
                                    <div class="course-share">
                                        <a href="#" class="share-btn"><i class="far fa-share-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="course-bio-text pt-45 pb-20">
                                <h3>Biography</h3>
                                <p>David Allberto is a Software Developer and Instructor having enjoyed his courses to
                                    date. He
                                    is the creator of Codexpand, a place of learning and growth to help people move into
                                    and be
                                    successful within the Helping Industry. One of Graham's key driving forces is to
                                    remove the
                                    barriers to the Helping Industry by producing high quality, accredited courses at
                                    affordable
                                    prices.</p>
                            </div>
                            <div class="my-course-info">
                                <h3>My Courses</h3>
                            </div>
                            <div class="row pb-30">
                                <div class="col-xl-6 col-lg-6 col-md-6" v-for="item in academicCourseItemss.slice(0, 4)"
                                    :key="item.id">
                                    <div class="academic-box mb-30">
                                        <div class="academic-thumb">
                                            <img :src="item.courseImage" alt="course-img">
                                        </div>
                                        <div class="academic-content">
                                            <div class="academic-content-header">
                                                <NuxtLink to="/course-details">
                                                    <h3>{{ item.title }}</h3>
                                                </NuxtLink>
                                            </div>
                                            <div class="academic-body">
                                                <div class="academic-tutor d-flex align-items-center">
                                                    <NuxtLink to="/instructor-profile"><img :src="item.instructorImage"
                                                            alt="tutor-img"></NuxtLink>
                                                    <NuxtLink to="/instructor-profile"><span>{{ item.instructor
                                                    }}</span>
                                                    </NuxtLink>
                                                </div>
                                                <p>{{ item.description }}</p>
                                            </div>
                                            <div class="academic-footer">
                                                <div class="coursee-clock">
                                                    <i class="flaticon-clock"></i><span>{{ item.year }}</span>
                                                </div>
                                                <div class="course-creadit">
                                                    <i class="flaticon-menu-1"></i><span>{{ item.credit }}</span>
                                                </div>
                                                <NuxtLink class="edo-course-sec-btn" to="/course-details">{{ item.btn }}
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- course-detailes-area-end -->


        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->
    </div>

</template>


<script>
import FooterOne from '~~/components/Common/FooterOne.vue';
import courseItemsMixin from '~~/mixins/courseItemsMixin';
import Pagination from '~~/components/Common/Pagination.vue';
import HeaderFour from '~~/components/Common/HeaderFour.vue';
import instructorProfilesMixin from '~~/mixins/instructorProfilesMixin';

export default {
    name: "App",
    mixins: [
        instructorProfilesMixin,
        courseItemsMixin
    ],
    data() {
        return {
            id: this.$route.params.id,
            instructorProfiles: {},
        };
    },
    methods: {
        getinstructorProfiles(instructorProfilesId) {
            this.instructorProfiles = this.instructorProfiless.find((item) => item.id == instructorProfilesId);
        },
    },
    created() {
        this.getinstructorProfiles(this.id);
    },
    components: { FooterOne, Pagination, HeaderFour }
};
</script>


