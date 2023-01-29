<template>
    <div class="patner-area pt-110 pb-170">
        <div class="container">
            <div class="row">
                <div class="col-xl-5 col-lg-4 col-md-4">
                    <div class="partner-box mb-30">
                        <div class="partner-thumb d-none d-sm-block">
                            <img src="/img/bg/partner.png" alt="partner-png">
                        </div>
                        <div class="section-title mb-30">
                            <h2>Our
                                <span class="down-mark-line-2">Global</span>Honorable Partners
                            </h2>
                        </div>
                        <div class="Partner-content">
                            <p>Global partners has been Publish the course you want, in the way you want always have
                                of control.</p>
                            <div class="partner-text">
                                <p> <span>9,500</span>+businesses & students
                                    around the world</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-7 col-lg-8 col-md-8">
                    <div class="partner-wrapper">
                        <div class="singel-partner" v-for="item in partnerList" :key="item.partnerImage">
                            <img :src="item.partnerImage" alt="image not found">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'partner',
    data() {
        return {
            partnerList: [{
                    partnerImage: '/img/brand/partner-01.png',
                },
                {
                    partnerImage: '/img/brand/partner-02.png',
                },
                {
                    partnerImage: '/img/brand/partner-03.png',
                },
                {
                    partnerImage: '/img/brand/partner-04.png',
                },
                {
                    partnerImage: '/img/brand/partner-05.png',
                },
                {
                    partnerImage: '/img/brand/partner-06.png',
                },
                {
                    partnerImage: '/img/brand/partner-07.png',
                },
                {
                    partnerImage: '/img/brand/partner-08.png',
                },
                {
                    partnerImage: '/img/brand/partner-09.png',
                },
                {
                    partnerImage: '/img/brand/partner-10.png',
                }
            ],
        }
    }
}
</script>