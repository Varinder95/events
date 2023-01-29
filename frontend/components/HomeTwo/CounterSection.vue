<template>
    <div class="counter-area pt-120">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-6 col-md-6" v-for="item in counterList" :key="item.counterTitle">
                    <div class="counter-wrapper text-center mb-30">
                        <div class="counter-icon">
                            <img :src="item.counterImage" alt="shape">
                            <div class="count-number">
                                <span class="counter">{{ item.counterTitle }}</span>
                                <p>{{ item.counterDesc }}</p>
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
    name: 'counter',
    data() {
        return {
            counterList: [{
                    counterTitle: '68,806',
                    counterDesc: 'Students Enrolled',
                    counterImage: '/img/icon/counter-1.png',
                },
                {
                    counterTitle: '5,740',
                    counterDesc: 'Class Completed',
                    counterImage: '/img/icon/counter-2.png',
                },
                {
                    counterTitle: '470',
                    counterDesc: 'Skilled Instructors',
                    counterImage: '/img/icon/counter-3.png',
                },
                {
                    counterTitle: '6,548',
                    counterDesc: 'Premium Courses',
                    counterImage: '/img/icon/counter-4.png',
                }
            ],
        }
    }
}
</script>