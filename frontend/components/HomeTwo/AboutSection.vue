<template>
    <section class="about-area p-relative pt-90 pb-70">
        <div class="container">
            <img class="about-shape" src="/img/shape/education-shape-03.png" alt="shape">
            <div class="row">
                <div class="col-xl-6 col-lg-6">
                    <div class="about-img position-relative mb-50">
                        <div class="about-main-img">
                            <img src="/img/about/about-img-1.png" alt="about">
                        </div>
                        <img class="about-shape-1" src="/img/shape/education-shape-01.png" alt="about">
                        <img class="about-shape-2" src="/img/shape/education-shape-02.png" alt="about">
                        <img class="about-shape-3" src="/img/shape/education-shape-05.png" alt="about">
                    </div>
                </div>
                <div class="col-xl-5 col-lg-5">
                    <div class="about-content mb-50">
                        <div class="section-title mb-30">
                            <h2>Increase Your High <br>
                                Education Level with <span class="down-mark-line-2">Eduman</span>
                            </h2>
                        </div>
                        <div class="student-choose-list">
                            <p class=" mb-30">Helping employees gain skills and providing career development often
                                take a back seat
                                to business priorities but workplace. We offer fresh courses on emerging topics that
                                keep your level.</p>
                            <ul>
                                <li v-for="item in curriculumList" :key="item.curriculumTitle"><i class="fas fa-check-circle"></i><span>{{ item.curriculumTitle }}</span></li>
                            </ul>
                        </div>
                        <NuxtLink class="edu-btn" to="/course">Apply now</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    name: 'about',
    data() {
        return {
            curriculumList: [{
                    curriculumTitle: 'Course curriculum',
                },
                {
                    curriculumTitle: 'Easy to enroll courses',
                },
                {
                    curriculumTitle: 'Know the latest technology',
                }
            ],
        }
    }
}
</script>