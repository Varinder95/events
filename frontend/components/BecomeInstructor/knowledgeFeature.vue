<template>
    <div class="features-area fix pt-110 pb-85">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center mb-50">
                        <h2>Spread Your <span class="down-mark-line-2">Knowledge</span></h2>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12" v-for="item in featureList" :key="item.id">
                    <div class="features-box text-center mb-30">
                        <div class="features-svg">
                            <img :src="item.featureImage" alt="image not found">
                        </div>
                        <div class="features-text">
                            <h4>{{ item.featureTitle }}</h4>
                            <p>{{ item.featureDesc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'knowledge',
    data() {
        return {
            featureList: [{
                    id: 1,
                    featureImage: '/img/icon/knowledge.png',
                    featureTitle: 'Expand Yourself',
                    featureDesc: 'Expand your professional network, build your expertise, and earn money on each paid enrollment and find the university',
                },
                {
                    id: 2,
                    featureImage: '/img/icon/teacher.png',
                    featureTitle: 'Share Knowledge',
                    featureDesc: 'Publish the course you want, in the way you want, and always have of control your own content. If you are passionate',
                },
                {
                    id: 3,
                    featureImage: '/img/icon/save-money.png',
                    featureTitle: 'Earn Money',
                    featureDesc: 'Earn money from Law is a career-oriented course after your 12th or graduation. We have jotted some of the instructors.',
                }
            ],
        }
    }
}
</script>