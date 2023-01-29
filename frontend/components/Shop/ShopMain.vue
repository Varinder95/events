<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import ShopSidebar from "./ShopSidebar.vue";
import productItemsMixin from "../../mixins/productItemsMixin";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    mixins: [productItemsMixin],
    components: {
        FooterOne,
        PageTitle,
        ShopSidebar,
        HeaderFour
    }
};
</script>

<template>
    <div>
        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- course-area-start -->
        <PageTitle pageTitle="Shop" pageSubTitle="Shop" />
        <!-- course-area-end -->

        <!-- shop-area-start -->
        <section class="shop-area pt-120 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-8">
                        <ShopSidebar />
                    </div>
                    <div class="col-xl-9 col-lg-8">
                        <div class="products-wrapper">
                            <div class="product-items text-center" v-for="item in productItemss" :key="item.id">
                                <div class="product-img">
                                    <NuxtLink :to="`/shop-details/${item.id}`"><img :src="item.productImage"
                                            alt="product-img"></NuxtLink>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- shop-area-end -->

        <!-- footer-area-start -->
        <FooterOne />
        <!-- footer-area-end -->

    </div>

</template>

<style scoped>
</style>