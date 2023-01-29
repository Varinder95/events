<template>
  <!-- related_product-start -->
  <div class="related_product pb-65">
    <div class="container custome-container">
      <div class="section-title mb-55">
        <h2>Related Product</h2>
      </div>
      <div class="swiper-container r-product-active">
        <div class="swiper-wrapper">
          <client-only>
            <swiper :modules="modules" :slides-per-view="1" :loop="true" :space-between="10"
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
                  slidesPerView: 2,
                  spaceBetween: 40
                },
                991: {
                  slidesPerView: 3,
                  spaceBetween: 40
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 40
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 40
                }
              }">
              <swiper-slide v-for="item in productItemss.slice(0, 7)" :key="item.id">
                <div class="product-items text-center">
                  <div class="product-img">
                    <NuxtLink :to="`/shop-details/${item.id}`"><img :src="item.productImage" alt="product-img">
                    </NuxtLink>
                    <div class="shop-quick-view">
                      <ul>
                        <li>
                          <NuxtLink to="/cart"><i class="fal fa-cart-arrow-down"></i></NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/wishlist"><i class="fal fa-heart"></i></NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/cart"><i class="fal fa-eye"></i></NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="product-content">
                    <h4>
                      <NuxtLink :to="`/shop-details/${item.id}`">{{ item.productTitle }}</NuxtLink>
                    </h4>
                    <span>{{ item.productPrice }}</span>
                    <del :class="item.productOldPriceClass">{{ item.productOldPrice }}</del>
                    <div class="course-icon">
                      <i :class="item.productRating1"></i>
                      <i :class="item.productRating2"></i>
                      <i :class="item.productRating3"></i>
                      <i :class="item.productRating4"></i>
                      <i :class="item.productRating5"></i>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div>
    </div>
  </div>
  <!-- related_product-end -->
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Autoplay } from 'swiper'

// import swiper module styles
import 'swiper/css'
import productItemsMixin from '~~/mixins/productItemsMixin'

export default {
  name: 'relatedProduct',
  mixins: [productItemsMixin],
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

