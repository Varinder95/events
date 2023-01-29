<template>
    <div class="features-area section-bg fix long-padding pt-110">
         <div class="container">
            <div class="row">
               <div class="col-12">
                  <div class="section-title text-center mb-60">
                     <h2>Special <br>
                        Event <span class="down-mark-line-2">Categories</span></h2>
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
    name: 'aboutFeature',
    data() {
        return {
            featureList: [{
                    id: 1,
                    featureImage: '/img/icon/knowledge.png',
                    featureTitle: 'Indoor Sports',
                    featureDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
                {
                    id: 2,
                    featureImage: '/img/icon/teacher.png',
                    featureTitle: 'Outdoor Sports',
                    featureDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
                {
                    id: 3,
                    featureImage: '/img/icon/save-money.png',
                    featureTitle: 'Group Sports',
                    featureDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                }
            ],
        }
    }
}
</script>