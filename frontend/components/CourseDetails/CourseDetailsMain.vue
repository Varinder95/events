<script>
import FooterOne from "../Common/FooterOne.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    components: {
        FooterOne,
        HeaderFour
    },
    data() {
        return {
            showComments: false
        }
    },
    methods: {
        handleComments() {
            return this.showComments = !this.showComments
        }
    }
};
</script>

<template>
    <div>

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- hero-area-start -->
        <div class="hero-arera course-item-height" :style="{ backgroundImage: `url(/img/slider/course-slider.jpg)` }">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="hero-course-1-text">
                            <h2>Course Details</h2>
                        </div>
                        <div class="course-title-breadcrumb">
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <NuxtLink to="/">Home</NuxtLink>
                                    </li>
                                    <li class="breadcrumb-item"><span>Courses</span></li>
                                    <li class="breadcrumb-item active" aria-current="page">MySQL Database : Beginner SQL
                                        Database Design</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- hero-area-end -->

        <!-- course-details-area-start -->
        <section class="course-detalis-area pb-90">
            <div class="container">
                <div class="row">
                    <div class=" col-xxl-8 col-xl-8">
                        <div class="course-detalis-wrapper mb-30">
                            <div class="course-heading mb-20">
                                <h2>MySQL Database : Beginner SQL Database Design</h2>
                                <div class="course-star">
                                    <ul>
                                        <li><i class="fas fa-star"></i></li>
                                    </ul>
                                    <ul>
                                        <li><i class="fas fa-star"></i></li>
                                    </ul>
                                    <ul>
                                        <li><i class="fas fa-star"></i></li>
                                    </ul>
                                    <ul>
                                        <li><i class="fas fa-star"></i></li>
                                    </ul>
                                    <ul>
                                        <li><i class="fal fa-star"></i></li>
                                    </ul>
                                    <span>(254 reviews)</span>
                                </div>
                            </div>
                            <div class="course-detelis-meta">
                                <div class="course-meta-wrapper border-line-meta">
                                    <div class="course-meta-img">
                                        <NuxtLink to="/instructor"><img src="/img/course/course-meta.png"
                                                alt="course-meta"></NuxtLink>
                                    </div>
                                    <div class="course-meta-text">
                                        <span>Created by</span>
                                        <h6>
                                            <NuxtLink to="/instructor">David Allberto</NuxtLink>
                                        </h6>
                                    </div>
                                </div>
                                <div class="course-Enroll border-line-meta">
                                    <p>Total Enrolled</p>
                                    <span>5,420</span>
                                </div>
                                <div class="course-update border-line-meta">
                                    <p>Last Update</p>
                                    <span>01 January 2022 </span>
                                </div>
                                <div class="course-category">
                                    <p>01 January 2022 </p>
                                    <span>
                                        <NuxtLink to="/course">Data Science</NuxtLink>
                                    </span>
                                </div>
                            </div>
                            <div class="course-description pt-45 pb-30">
                                <div class="course-Description">
                                    <h4>Description</h4>
                                </div>
                                <p>This course has been designed by two professional Data Scientists so that we can
                                    share our knowledge and help you learn complex theory, algorithms, and coding
                                    libraries in a simple way. We will walk you step-by-step into the World of Machine
                                    Learning. With every tutorial, you will develop new skills and improve your
                                    understanding of this challenging yet lucrative sub-field of Data Science.</p>
                            </div>
                            <div class="course-learn-wrapper">
                                <div class="course-learn">
                                    <div class="course-leranm-tittle">
                                        <h4 class="mb-15">What you'll learn</h4>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-6">
                                            <div class="course-leran-text f-left">
                                                <ul>
                                                    <li>Handle advanced techniques like Dimensionality Reduction</li>
                                                    <li>Handle specific topics like Reinforcement Learning best</li>
                                                    <li>Know which Machine Learning model to choose for each type of
                                                        problem</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="course-leran-text">
                                                <ul>
                                                    <li>Reinforcement learning upper
                                                        confidence bound Thompson sampling</li>
                                                    <li>Model Selection & Boosting fold cross
                                                        validation parameter</li>
                                                    <li>Use Machine Learning for personal
                                                        purpose of machine</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="course-requirements pt-45">
                                <h4>Requirements</h4>
                                <div class="course-requirements-text">
                                    <ul>
                                        <li>• High School Mathematics Level</li>
                                        <li>• Basic Python Knowledge Required</li>
                                        <li>• Broadband Internet</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="course-curriculum pt-40 pb-50">
                                <div class="course-curriculam">
                                    <h4>Curriculum</h4>
                                </div>
                                <ul>
                                    <li>15 lectures • 2h 29m 12s total length</li>
                                </ul>
                                <div class="course-curriculam-accodion mt-30">
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <div class="accordion-body" id="headingOne">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne" aria-expanded="true"
                                                    aria-controls="collapseOne">
                                                    <span class="accordion-header">
                                                        <span class="accordion-tittle">
                                                            <span>Welcome to the Course & Overview</span>
                                                        </span>
                                                        <span class="accordion-tittle-inner">
                                                            <span>8 lectures • 47m</span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div id="collapseOne" class="accordion-collapse collapse show"
                                                aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>5:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>7:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>3:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>8:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <div class="accordion-header" id="headingTwo">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                    aria-expanded="true" aria-controls="collapseTwo">
                                                    <span class="accordion-header">
                                                        <span class="accordion-tittle">
                                                            <span>Python Application Engine</span>
                                                        </span>
                                                        <span class="accordion-tittle-inner">
                                                            <span>2 lectures • 12m</span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div id="collapseTwo" class="accordion-collapse collapse"
                                                aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Data Manipulation Tools</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>6:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>8:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingThree">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                    aria-expanded="true" aria-controls="collapseThree">
                                                    <span class="accordion-header">
                                                        <span class="accordion-tittle">
                                                            <span>Algorithm Comparison</span>
                                                        </span>
                                                        <span class="accordion-tittle-inner">
                                                            <span>3 lectures • 13m</span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h2>
                                            <div id="collapseThree" class="accordion-collapse collapse"
                                                aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>3:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>5:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>7:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingFour">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                    aria-expanded="true" aria-controls="collapseFour">
                                                    <span class="accordion-header">
                                                        <span class="accordion-tittle">
                                                            <span>Data Manipulation Tools</span>
                                                        </span>
                                                        <span class="accordion-tittle-inner">
                                                            <span>7 lectures • 35m</span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h2>
                                            <div id="collapseFour" class="accordion-collapse collapse"
                                                aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>2:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>4:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <div class="accordion-header" id="headingFive">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseFive"
                                                    aria-expanded="true" aria-controls="collapseFive">
                                                    <span class="accordion-header">
                                                        <span class="accordion-tittle">
                                                            <span>Sorting- the Bubble Sort Algorithm</span>
                                                        </span>
                                                        <span class="accordion-tittle-inner">
                                                            <span>10 lectures • 55m</span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div id="collapseFive" class="accordion-collapse collapse"
                                                aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>6:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
                                                        <div class="course-curriculum-info">
                                                            <i class="flaticon-youtube"></i>
                                                            <h4>Importing the libraries</h4>
                                                        </div>
                                                        <div class="course-curriculum-meta">
                                                            <span>8:30</span>
                                                            <span class="time"> <i class="flaticon-lock"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="course-instructors">
                                <h3>instructors</h3>
                                <div class="instructors-heading">
                                    <div class="instructors-img w-img">
                                        <NuxtLink to="/instructor"><img src="/img/course/course-instructors.png"
                                                alt="image not found"></NuxtLink>
                                    </div>
                                    <div class="instructors-body">
                                        <h5>
                                            <NuxtLink to="/instructor">David Allberto</NuxtLink>
                                        </h5>
                                        <span>Data Scientist, BDevs Ltd.</span>
                                        <div class="intructors-review">
                                            <i class="fas fa-star"></i>
                                            <span>4.7 (54 reviews)</span>
                                        </div>
                                        <div class="instructors-footer">
                                            <i class="fas fa-desktop"></i>
                                            <span>3 Coursess</span>
                                            <i class="far fa-user-friends"></i>
                                            <span>78,742 Students</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="intructors-content">
                                    <p>Professionally, I come from the Data Science consulting space with experience in
                                        finance, retail, transport and other industries. I was trained by the best
                                        analytics mentors at Deloitte Australia and since starting on Udemy I have
                                        passed on my knowledge to spread around the world</p>
                                </div>
                            </div>
                            <div class="student-feedback pt-45 ">
                                <h3>Student Feedback</h3>
                                <div class="row">
                                    <div class="col-xl-3">
                                        <div class="reating-point mb-30">
                                            <div class="rating-point-wrapper text-center">
                                                <h2>4.7</h2>
                                                <div class="rating-star">
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                </div>
                                                <span>5785 Rating</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-9">
                                        <div class="student-reating-bar">
                                            <div class="reating-bar-wrapper">
                                                <div class="rating-row mb-10">
                                                    <div class="rating-star">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar wow fadeInLeft" role="progressbar"
                                                            style="width: 98%;" aria-valuenow="25" aria-valuemin="0"
                                                            aria-valuemax="100" data-wow-duration="1s"
                                                            data-wow-delay="0.5s"></div>
                                                    </div>
                                                    <div class="progress-tittle">
                                                        <span>98%</span>
                                                    </div>
                                                </div>
                                                <div class="rating-row mb-10">
                                                    <div class="rating-star">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar wow fadeInLeft" role="progressbar"
                                                            style="width: 78%;" aria-valuenow="25" aria-valuemin="0"
                                                            aria-valuemax="100" data-wow-duration="1s"
                                                            data-wow-delay="0.5s"></div>
                                                    </div>
                                                    <div class="progress-tittle">
                                                        <span>78%</span>
                                                    </div>
                                                </div>
                                                <div class="rating-row mb-10">
                                                    <div class="rating-star">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar wow fadeInLeft" role="progressbar"
                                                            style="width: 55%;" aria-valuenow="25" aria-valuemin="0"
                                                            aria-valuemax="100" data-wow-duration="1s"
                                                            data-wow-delay="0.5s"></div>
                                                    </div>
                                                    <div class="progress-tittle">
                                                        <span>55%</span>
                                                    </div>
                                                </div>
                                                <div class="rating-row mb-10">
                                                    <div class="rating-star">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar wow fadeInLeft" role="progressbar"
                                                            style="width: 60%;" aria-valuenow="25" aria-valuemin="0"
                                                            aria-valuemax="100" data-wow-duration="1s"
                                                            data-wow-delay="0.5s"></div>
                                                    </div>
                                                    <div class="progress-tittle">
                                                        <span>60%</span>
                                                    </div>
                                                </div>
                                                <div class="rating-row mb-10">
                                                    <div class="rating-star">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                        <i class="fal fa-star"></i>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar wow fadeInLeft" role="progressbar"
                                                            style="width: 10%;" aria-valuenow="25" aria-valuemin="0"
                                                            aria-valuemax="100" data-wow-duration="1s"
                                                            data-wow-delay="0.5s"></div>
                                                    </div>
                                                    <div class="progress-tittle">
                                                        <span>10%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="course-detalis-reviews pt-15">
                                <div class="course-detalis-reviews-tittle">
                                    <h3>Reviews</h3>
                                </div>
                                <div class="course-review-item mb-30">
                                    <div class="course-reviews-img">
                                        <a href="#"><img src="/img/course/course-reviews-1.png"
                                                alt="image not found"></a>
                                    </div>
                                    <div class="course-review-list">
                                        <h5><a href="#">Sotapdi Kunda</a></h5>
                                        <div class="course-start-icon">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <span>55 min ago</span>
                                        </div>
                                        <p>Very clean and organized with easy to follow tutorials, Exercises, and
                                            solutions.
                                            This course does start from the beginning with very little knowledge and
                                            gives a
                                            great overview of common tools used for data science and progresses into
                                            more
                                            complex concepts and ideas.</p>
                                    </div>
                                </div>
                                <div class="course-review-item mb-30">
                                    <div class="course-reviews-img">
                                        <a href="#"><img src="/img/course/course-reviews-2.png"
                                                alt="image not found"></a>
                                    </div>
                                    <div class="course-review-list">
                                        <h5><a href="#">Samantha</a></h5>
                                        <div class="course-start-icon">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <span>45 min ago</span>
                                        </div>
                                        <p>The course is good at explaining very basic intuition of the concepts. It
                                            will get
                                            you scratching the surface so to say. where this course is unique is the
                                            implementation methods are so well defined Thank you to the team !.</p>
                                    </div>
                                </div>
                                <div class="course-review-item mb-30">
                                    <div class="course-reviews-img">
                                        <a href="#"><img src="/img/course/course-reviews-3.png"
                                                alt="image not found"></a>
                                    </div>
                                    <div class="course-review-list">
                                        <h5><a href="#">Michell Mariya</a></h5>
                                        <div class="course-start-icon">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <span>30 min ago</span>
                                        </div>
                                        <p>This course is amazing..!
                                            I started this course as a beginner and learnt a lot. Instructors are great.
                                            Query
                                            handling can be improved.Overall very happy with the course.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12">
                                <div class="course-review-btn">
                                    <a id="show-review-box" class="edu-btn" @click="handleComments"
                                        href="javascript:void(0)">Write a Review</a>
                                    <div id="review-box"
                                        :class="`${showComments ? 'review-comment mt-45 d-block' : 'review-comment mt-45'}`">
                                        <div class="comment-title mb-20">
                                            <p>Your email address will not be published. Required fields are marked *
                                            </p>
                                        </div>
                                        <div class="comment-rating mb-20">
                                            <span>Overall ratings</span>
                                            <ul>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fal fa-star"></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="comment-input-box mb-15">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-xxl-12">
                                                        <textarea placeholder="Your review"
                                                            class="comment-input comment-textarea mb-20"></textarea>
                                                    </div>
                                                    <div class="col-xxl-6">
                                                        <div class="comment-input mb-20">
                                                            <input type="text" placeholder="Your Name">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-6">
                                                        <div class="comment-input mb-20">
                                                            <input type="email" placeholder="Your Email">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-12">
                                                        <div class="comment-submit">
                                                            <button type="submit" class="edu-btn">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
                        <div class="course-video-widget">
                            <div class="course-widget-wrapper mb-30">
                                <div class="course-video-thumb w-img">
                                    <img src="/img/course/course-video.png" alt="image not found">
                                    <div class="sidber-video-btn">
                                        <span data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                            class="popup-video"><i class="fas fa-play"></i></span>
                                    </div>
                                </div>
                                <div class="course-video-price">
                                    <span>$147.00</span>
                                </div>
                                <div class="course-video-body">
                                    <ul>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-filter"></i>
                                                <span>Level</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>Beginners</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-computer"></i>
                                                <span>Lectures</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>8 Lectures</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-clock"></i>
                                                <span>Duration</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>1h 30m 12s</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-menu-2"></i>
                                                <span>Category</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>Data Science</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-global"></i>
                                                <span>Laguage</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>English</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-bookmark-white"></i>
                                                <span>Access</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>Full Lifetime</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-award"></i>
                                                <span>Certificate</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>Yes </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="course-vide-icon">
                                                <i class="flaticon-list"></i>
                                                <span>Recourse</span>
                                            </div>
                                            <div class="video-corse-info">
                                                <span>5 Downloadable Files </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="video-wishlist">
                                    <NuxtLink to="/cart" class="video-cart-btn"><i class="fal fa-shopping-cart"></i> Add
                                        to cart</NuxtLink>
                                    <NuxtLink to="/wishlist" class="video-wishlist-btn"><i class="far fa-heart"></i> Add
                                        to Wishlist</NuxtLink>
                                </div>
                                <div class="course-gift">
                                    <div class="course-apply-coupon">
                                        <a href="#">Apply Coupon</a>
                                    </div>
                                    <div class="course-gift-coupon">
                                        <a href="#">Gift Courses</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- course-details-area-end -->

        <!-- Footer-area-start -->
        <FooterOne />
        <!-- Footer-area-end -->

        <div class="features-video-modal">
            <div class="course-video-popup">
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <iframe src="https://www.youtube.com/embed/wNwrSz3HYqE"
                                    title="YouTube video player"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>