<template>
    <div :class="space_minus ? space_minus : 'features-area pt-45 pb-15'" :style="{ backgroundImage: `url(${featureBg})`}">
         <div class="container">
            <div class="row">
               <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in FeatureList" :key="item.title">
                  <div class="features-wrapper d-flex align-items-center mb-30">
                     <div class="features-icon">
                        <i :class="item.featureIcon"></i>
                     </div>
                     <div class="features-content">
                        <h3>{{ item.featureTitle }}</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
export default {
    name: 'feature',
    props:{
        space_minus: String
    },
    data() {
        return {
            featureBg: '/img/fact/fact.png',
            FeatureList: [{
                    featureTitle: 'Enjoy events with people of same taste',
                    featureIcon: 'flaticon-online-course',
                },
                {
                    featureTitle: 'Get goodies if you do well',
                    featureIcon: 'flaticon-certificate',
                },
                {
                    featureTitle: 'Search all events and choose what you like',
                    featureIcon: 'flaticon-laptop',
                }
            ],
        }
    }
}
</script>
