<script>
import FooterOne from "~~/components/Common/FooterOne.vue";
import productItemsMixin from "../../mixins/productItemsMixin";
import RelatedSlider from "~~/components/ShopDetails/RelatedSlider.vue";
import HeaderFour from "~~/components/Common/HeaderFour.vue";

export default {
   name: "app",
   mixins: [productItemsMixin],
   components: {
      FooterOne,
      RelatedSlider,
      HeaderFour
   },
   data() {
      return {
         value: 1,

         id: this.$route.params.id,
         productItems: {},
      }
   },
   methods: {
      handleIncreaseValue(value) {
         if (value === 'valueOne') {
            this.value++
         }
      },
      handleDecreaseValue(value) {
         if (value === 'valueOne' && this.value > 0) {
            this.value--
         }
      },

      getproductItems(productItemsId) {
         this.productItems = this.productItemss.find((item) => item.id == productItemsId);
      },
   },
   created() {
      this.getproductItems(this.id);
   },
};
</script>

<template>
   <div>

      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- hero-area-start -->
      <div class="hero-arera course-item-height" :style="{ backgroundImage: `url(/img/slider/course-slider.jpg)` }">
         <div class="container">
            <div class="row">
               <div class="col-xl-12">
                  <div class="hero-course-1-text">
                     <h2>{{ productItems.productTitle }}</h2>
                  </div>
                  <div class="course-title-breadcrumb">
                     <nav>
                        <ol class="breadcrumb">
                           <li class="breadcrumb-item">
                              <NuxtLink to="/">Home</NuxtLink>
                           </li>
                           <li class="breadcrumb-item"><span>{{ productItems.productTitle }}</span></li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- hero-area-end -->

      <!-- shop-details_area-start -->
      <div class="shop-details_area pt-120 pb-15">
         <div class="container custome-container">
            <div class="row ">
               <div class="col-lg-4 col-md-12">
                  <div class="product-details-img mb-30">
                     <img :src="productItems.productImage" alt="product img">
                  </div>
               </div>
               <div class="col-lg-6 col-md-12">
                  <div class="product-side-info mb-30">
                     <h4 class="product-name mb-10">{{ productItems.productTitle }}</h4>
                     <span class="product-price">{{ productItems.productPrice }}</span>
                     <p>Matent maecenas nec massa viverra aci ute litora aliquam habitant proin commodo bibendum rutru
                        habitant est magnis quisque aliquet congue vesti bulum suscipi erose tellus odio elite purus
                        feugiat prim libero
                        senes nisie gravia</p>
                     <div class="product-quantity-cart mb-25">
                        <div class="product-quantity-form">
                           <form action="#">
                              <button class="cart-minus" type="button" @click="handleDecreaseValue('valueOne')"><i
                                    class="far fa-minus"></i></button>
                              <input class="cart-input" type="text" v-model="value">
                              <button class="cart-plus" type="button" @click="handleIncreaseValue('valueOne')"><i
                                    class="far fa-plus"></i></button>
                           </form>
                        </div>
                        <NuxtLink to="/cart" class="edu-btn">Add to Cart</NuxtLink>
                     </div>
                     <NuxtLink to="/wishlist" class="edu-border-btn">Add to Wishlist</NuxtLink>
                     <div class="product__details__tag tagcloud mt-25 mb-10"><span>Tags : </span>
                        <NuxtLink to="/shop">App</NuxtLink>
                        <NuxtLink to="/shop">Tips</NuxtLink>
                        <NuxtLink to="/shop">Design</NuxtLink>
                        <NuxtLink to="/shop">Science</NuxtLink>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- shop-details_area-end -->

      <!-- product_info-faq-area-start -->
      <div class="product_info-faq-area pb-95">
         <div class="container">
            <nav class="product-details-nav">
               <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a class="nav-item nav-link show active" id="nav-general-tab" data-bs-toggle="tab" href="#nav-general"
                     role="tab" aria-selected="true">Description</a>
                  <a class="nav-item nav-link" id="nav-seller-tab" data-bs-toggle="tab" href="#nav-seller" role="tab"
                     aria-selected="false">Reviews</a>
               </div>
            </nav>
            <div class="tab-content product-details-content" id="nav-tabContent">
               <div class="tab-pane fade active show" id="nav-general" role="tabpanel">
                  <div class="tabs-wrapper mt-35">
                     <div class="product__details-des">
                        <p>Very clean and organized with easy to follow tutorials, Exercises, and solutions. This course
                           does start from the
                           beginning with very little knowledge and gives a great overview of common tools used for data
                           science and progresses
                           into more complex concepts and ideas. This course is amazing..! I started this course as a
                           beginner and learnt a lot. Instructors
                           are great. Query handling
                           can be improved.Overall very happy with the course.</p>
                     </div>
                  </div>
               </div>
               <div class="tab-pane fade" id="nav-seller" role="tabpanel">
                  <div class="tabs-wrapper mt-35">
                     <div class="course-review-item mb-30">
                        <div class="course-reviews-img">
                           <a href="#"><img src="/img/course/course-reviews-1.png" alt="image not found"></a>
                        </div>
                        <div class="course-review-list">
                           <h5><a href="#">Sotapdi Kunda</a></h5>
                           <div class="course-start-icon">
                              <i :class="productItems.productRating1"></i>
                              <i :class="productItems.productRating2"></i>
                              <i :class="productItems.productRating3"></i>
                              <i :class="productItems.productRating4"></i>
                              <i :class="productItems.productRating5"></i>
                              <span>55 min ago</span>
                           </div>
                           <p>Very clean and organized with easy to follow tutorials, Exercises, and
                              solutions.This course does start from the beginning with very little knowledge and
                              gives a great overview of common tools used for data science and progresses into
                              more complex concepts and ideas.</p>
                        </div>
                     </div>
                     <div class="course-review-item mb-30">
                        <div class="course-reviews-img">
                           <a href="#"><img src="/img/course/course-reviews-2.png" alt="image not found"></a>
                        </div>
                        <div class="course-review-list">
                           <h5><a href="#">Samantha</a></h5>
                           <div class="course-start-icon">
                              <i :class="productItems.productRating1"></i>
                              <i :class="productItems.productRating2"></i>
                              <i :class="productItems.productRating3"></i>
                              <i :class="productItems.productRating4"></i>
                              <i :class="productItems.productRating5"></i>
                              <span>45 min ago</span>
                           </div>
                           <p>The course is good at explaining very basic intuition of the concepts. It
                              will get you scratching the surface so to say. where this course is unique is the
                              implementation methods are so well defined Thank you to the team !.</p>
                        </div>
                     </div>
                     <div class="course-review-item mb-30">
                        <div class="course-reviews-img">
                           <a href="#"><img src="/img/course/course-reviews-3.png" alt="image not found"></a>
                        </div>
                        <div class="course-review-list">
                           <h5><a href="#">Michell Mariya</a></h5>
                           <div class="course-start-icon">
                              <i :class="productItems.productRating1"></i>
                              <i :class="productItems.productRating2"></i>
                              <i :class="productItems.productRating3"></i>
                              <i :class="productItems.productRating4"></i>
                              <i :class="productItems.productRating5"></i>
                              <span>30 min ago</span>
                           </div>
                           <p>This course is amazing..!
                              I started this course as a beginner and learnt a lot. Instructors are great.
                              Query handling can be improved.Overall very happy with the course.</p>
                        </div>
                     </div>
                     <div class="product__details-comment ">
                        <div class="comment-title mb-20">
                           <h3>Add a review</h3>
                           <p>Your email address will not be published. Required fields are marked *</p>
                        </div>
                        <div class="comment-rating mb-20">
                           <span>Overall ratings</span>
                           <ul>
                              <li><a href="#"><i :class="productItems.productRating1"></i></a></li>
                              <li><a href="#"><i :class="productItems.productRating2"></i></a></li>
                              <li><a href="#"><i :class="productItems.productRating3"></i></a></li>
                              <li><a href="#"><i :class="productItems.productRating4"></i></a></li>
                              <li><a href="#"><i :class="productItems.productRating5"></i></a></li>
                           </ul>
                        </div>
                        <div class="comment-input-box mb-15">
                           <form action="#">
                              <div class="row">
                                 <div class="col-xxl-12">
                                    <textarea placeholder="Your review"
                                       class="comment-input comment-textarea mb-20"></textarea>
                                 </div>
                                 <div class="col-xxl-6">
                                    <div class="comment-input mb-20">
                                       <input type="text" placeholder="Your Name">
                                    </div>
                                 </div>
                                 <div class="col-xxl-6">
                                    <div class="comment-input mb-20">
                                       <input type="email" placeholder="Your Email">
                                    </div>
                                 </div>
                                 <div class="col-xxl-12">
                                    <div class="comment-submit">
                                       <button type="submit" class="edu-btn">Submit</button>
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- product_info-faq-area-end -->

      <!-- related-product-area-start -->
      <RelatedSlider />
      <!-- related-product-area-end -->

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->

   </div>

</template>

<style scoped>
</style>
