<template>
   <div class="brand-area theme-bg pt-90 pb-120">
      <div class="container">
         <div class="row">
            <div class="col-xl-12">
               <div class="brand-wrapper text-center">
                  <div class="brand-wrapper text-center">
                     <div class="swiper-container brand-active">
                        <div class="swiper-wrapper">
                           <client-only>
                              <swiper :modules="modules" :slides-per-view="1" :loop="true" :space-between="30"
                                 :autoplay="{ delay: 3500, disableOnInteraction: false }" :breakpoints="{
                                    320: {
                                       slidesPerView: 1,
                                       spaceBetween: 20
                                    },
                                    480: {
                                       slidesPerView: 2,
                                       spaceBetween: 30
                                    },
                                    640: {
                                       slidesPerView: 3,
                                       spaceBetween: 40
                                    },
                                    991: {
                                       slidesPerView: 4,
                                       spaceBetween: 40
                                    },
                                    1200: {
                                       slidesPerView: 5,
                                       spaceBetween: 40
                                    },
                                    1400: {
                                       slidesPerView: 6,
                                       spaceBetween: 40
                                    }
                                 }">
                                 <swiper-slide v-for="item in brandImageList" :key="item.brandImage">
                                    <div class="singel-brand">
                                       <img :src="item.brandImage" alt="image not found">
                                    </div>
                                 </swiper-slide>
                              </swiper>
                           </client-only>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

// import swiper module styles
import 'swiper/css'
// more module style...

export default {
   name: 'brand',
   data() {
      return {
         brandImageList: [{
            id: '1',
            brandImage: '/img/brand/brand-01.png'
         },
         {
            id: '2',
            brandImage: '/img/brand/brand-02.png'
         },
         {
            id: '3',
            brandImage: '/img/brand/brand-03.png'
         },
         {
            id: '4',
            brandImage: '/img/brand/brand-04.png'
         },
         {
            id: '5',
            brandImage: '/img/brand/brand-05.png'
         },
         {
            id: '6',
            brandImage: '/img/brand/brand-06.png'
         },
         ],
      }
   },
   components: {
      Swiper,
      SwiperSlide
   },
   setup() {
      return {
         modules: [Autoplay],
      }
   }
}
</script>


