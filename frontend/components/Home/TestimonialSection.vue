<template>
   <div :class="testimonial_spacing ? testimonial_spacing : 'testimonial-area pb-120'">
      <div class="container">
         <div class="row">
            <div class="col-lg-6 offset-lg-3">
               <div class="section-title text-center mb-55">
                  <h2>What Students<br>
                     Think and Say About <span class="down-mark-line">Eduman</span></h2>
               </div>
            </div>
         </div>
         <div class="swiper-container testimonial-active">
            <div class="swiper-wrapper">
               <client-only>
                  <swiper :modules="modules" :slides-per-view="1" :loop="true" :space-between="30"
                     :autoplay="{ delay: 3500, disableOnInteraction: false }" :breakpoints="{
                        320: {
                           slidesPerView: 1,
                           spaceBetween: 20,
                        },
                        480: {
                           slidesPerView: 1,
                           spaceBetween: 30,
                        },
                        640: {
                           slidesPerView: 1,
                           spaceBetween: 40,
                        },
                        991: {
                           slidesPerView: 2,
                           spaceBetween: 40,
                        },
                        1200: {
                           slidesPerView: 3,
                           spaceBetween: 40,
                        },
                        1400: {
                           slidesPerView: 3,
                        },
                     }">
                     <swiper-slide v-for="item in testimonialItem" :key="item.id">
                        <div class="testimonial-items position-relative">
                           <div class="testimonial-header">
                              <div class="testimonial-img">
                                 <img :src="item.testImage" alt="image not found">
                              </div>
                              <div class="testimonial-title">
                                 <h4>{{ item.name }}</h4>
                                 <span>{{ item.designation }}</span>
                              </div>
                           </div>
                           <div class="testimoni-quotes">
                              <img :src="item.qoute" alt="image not found">
                           </div>
                           <div class="testimonial-body">
                              <h3>{{ item.great }}</h3>
                              <p>{{ item.feedback }}</p>
                           </div>
                           <div class="testimonial-icon">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                           </div>
                        </div>
                     </swiper-slide>
                  </swiper>
               </client-only>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Autoplay } from 'swiper'
import 'swiper/css'

export default {
   name: 'testimonial',
   props: {
      testimonial_spacing: String
   },
   data() {
      return {
         testimonialItem: [{
            id: '1',
            testImage: '/img/testimonial/Image.png',
            name: 'David Johnson',
            designation: 'Student',
            qoute: '/img/testimonial/quotes.png',
            great: 'Great Course !',
            feedback: 'Thanks to our marketplace model, our content keeps pace with market changes. You’ll find courses on the latest technologies and business practice and more!',
         },
         {
            id: '2',
            testImage: '/img/testimonial/testimonial-02.png',
            name: 'Brandon Tylor',
            designation: 'Student',
            qoute: '/img/testimonial/quotes.png',
            great: 'Best Experience !',
            feedback: 'In every software-as-a-service solution, user billing and payments are key aspects in the sale of services rendered. Let’s learn about Stripe the metal mates.',
         },
         {
            id: '3',
            testImage: '/img/testimonial/testimonial.png',
            name: 'Richard Joseph',
            designation: 'Student',
            qoute: '/img/testimonial/quotes.png',
            great: 'Helpful Instructors !',
            feedback: 'There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links.',
         }
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