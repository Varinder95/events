<template>
    <div class="counter-area pt-75 pb-30" :style="{ backgroundImage: `url(/img/bg/university-counter.png)`}">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6" v-for="item in counterList" :key="item.id">
                    <div class="university-counter-wrapper text-center mb-40">
                        <div class="counter-img">
                            <img :src="item.counterImage" alt="img not found">
                        </div>
                        <div class="university-couner-text">
                            <span class="counter">{{ item.counterTitle }}</span>
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'counterThree',
    data() {
        return {
            counterList: [{
                    id: 1,
                    counterImage: '/img/icon/counter-5.png',
                    counterTitle: '68,806',
                    description: 'Students Enrolled',
                },
                {
                    id: 2,
                    counterImage: '/img/icon/counter-6.png',
                    counterTitle: '5,740',
                    description: 'Class Completed',
                },
                {
                    id: 3,
                    counterImage: '/img/icon/counter-7.png',
                    counterTitle: '470',
                    description: 'Skilled Instructors',
                },
                {
                    id: 4,
                    counterImage: '/img/icon/counter-8.png',
                    counterTitle: '6,5486',
                    description: 'Technical Courses',
                }
            ],
        }
    }
}
</script>