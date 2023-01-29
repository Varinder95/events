<template>
    <div class="affiliates-area pt-120 pb-120">
         <div class="container">
            <div class="row">
               <div class="col-xl-12">
                  <div class="affiliates-wrapper">
                     <div class="singel-affiliates-img" v-for="item in affiliateList" :key="item.id">
                        <img :src="item.affiliateImage" alt="affiliates-img">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
export default {
    name: 'affiliate',
    data() {
        return {
            affiliateList: [{
                    id: 1,
                    affiliateImage: '/img/brand/partner-01.png',
                },
                {
                    id: 2,
                    affiliateImage: '/img/brand/partner-02.png',
                },
                {
                    id: 3,
                    affiliateImage: '/img/brand/partner-03.png',
                },
                {
                    id: 4,
                    affiliateImage: '/img/brand/partner-04.png',
                },
                {
                    id: 5,
                    affiliateImage: '/img/brand/partner-05.png',
                },
                {
                    id: 6,
                    affiliateImage: '/img/brand/partner-06.png',
                },
                {
                    id: 7,
                    affiliateImage: '/img/brand/partner-07.png',
                },
                {
                    id: 8,
                    affiliateImage: '/img/brand/partner-08.png',
                },
                {
                    id: 9,
                    affiliateImage: '/img/brand/partner-09.png',
                },
                {
                    id: 10,
                    affiliateImage: '/img/brand/partner-10.png',
                }
                
            ],
        }
    }
}
</script>