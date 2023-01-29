<template>
    <div class="university-card">
        <div class="container">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="university-main-wraper d-flex align-items-center">
                        <div class="university-course-box">
                            <div class="university-card-text">
                                <p>Discover yourself</p>
                                <h3>Earn Your Degree from <span>Eduman</span></h3>
                                <NuxtLink class="edu-six-btn" to="/course">View courses</NuxtLink>
                            </div>
                        </div>
                        <div class="university-card-wrapper" v-for="item in universityCard" :key="item.universityCardTitle">
                            <div class="university-card-icon">
                                <img :src="item.universityCardImage" alt="img not found">
                            </div>
                            <div class="university-card-content">
                                <h3>{{ item.universityCardTitle }}</h3>
                                <p>{{ item.universityCardDesc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'university-card',
    data() {
        return {
            universityCard: [{
                    universityCardImage: '/img/icon/card-icon-1.png',
                    universityCardTitle: 'Undergraduate',
                    universityCardDesc: 'Higher education is designed for career professionals seeking',
                },
                {
                    universityCardImage: '/img/icon/card-icon-2.png',
                    universityCardTitle: 'Postgraduate',
                    universityCardDesc: 'Higher education is designed for career professionals seeking',
                },
                {
                    universityCardImage: '/img/icon/card-icon-3.png',
                    universityCardTitle: 'Research Fellow',
                    universityCardDesc: 'Higher education is designed for career professionals seeking',
                }
            ],
        }
    }
}
</script>