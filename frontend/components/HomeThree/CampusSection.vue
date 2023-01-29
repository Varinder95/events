<template>
    <div class="campus-area fix pt-120 pb-70">
        <div class="container">
            <div class="campus-wrapper position-relative">
                <div class="campus-shape-sticker">
                    <div class="shape-light">
                        <img src="/img/shape/shape-light.png" alt="image not found">
                    </div>
                    <div class="campus-shape-content">
                        <h5>Education is the<span> Platform that makes</span>possible to everyone</h5>
                    </div>
                </div>
                <div class="campus-shape-1">
                    <img src="/img/shape/campus-shape-2.png" alt="shape">
                </div>
                <div class="campus-shape-2">
                    <img src="/img/shape/student-shape-05.png" alt="shape">
                </div>
                <div class="row align-items-center">
                    <div class="col-xl-5 col-lg-6">
                        <div class="compus-content mb-30">
                            <div class="section-title mb-30">
                                <h2>Students Enjoy Their
                                    Lives at<span class="down-mark-line-2">Eduman</span> Campus</h2>
                            </div>
                            <p>Helping employees gain skills and providing career development often take a back seat
                                to business priorities but workplace better right now. Seventy percent of workers
                                think that. </p>
                            <ul>
                                <li v-for="item in campusService" :key="item.id"><i class="far fa-check"></i> {{ item.campusServiceTitle }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6 offset-xl-1 col-lg-6">
                        <div class="campus-img-wrapper position-relative">
                            <div class="campus-shape-3">
                                <img src="/img/shape/campus-shape-1.png" alt="image not found">
                            </div>
                            <div class="campus-img-1">
                                <img src="/img/campus/campus-img-1.png" alt="image not found">
                            </div>
                            <div class="campus-img-2">
                                <img src="/img/campus/campus-img-2.png" alt="image not found">
                            </div>
                            <div class="campus-img-3">
                                <img src="/img/campus/campus-img-3.png" alt="image not found">
                            </div>
                            <div class="campus-img-4">
                                <img src="/img/campus/campus-img-4.png" alt="image not found">
                            </div>
                            <div class="campus-img-5">
                                <img src="/img/campus/campus-img-5.png" alt="image not found">
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
    name: 'campus',
    data() {
        return {
            campusService: [{
                id: 1,
                campusServiceTitle: 'Free for physically handcraft',
            },
            {
                id: 2,
                campusServiceTitle: 'Easy to enroll courses',
            },
            {
                id: 3,
                campusServiceTitle: 'Access more then 100K online courses',
            },
            {
                id: 4,
                campusServiceTitle: 'Upskill your organization',
            }
            ],
        }
    }
}
</script>