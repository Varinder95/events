<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
    name: "app",
    components: {
        FooterOne,
        PageTitle,
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
        <PageTitle pageTitle="My Wishlist" pageSubTitle="My Wishlist" />
        <!-- course-area-end -->

        <!-- wishlist-area-start -->
        <div class="cart-area pt-100 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="#">
                            <div class="table-content table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="product-thumbnail">Images</th>
                                            <th class="cart-product-name">Product</th>
                                            <th class="product-price">Unit Price</th>
                                            <th class="product-quantity">Add to cart</th>
                                            <th class="product-subtotal">Total</th>
                                            <th class="product-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="product-thumbnail">
                                                <NuxtLink to="/shop"><img src="/img/products/product-thumb-05.png"
                                                        alt="img not found"></NuxtLink>
                                            </td>
                                            <td class="product-name">
                                                <NuxtLink to="/shop">Best Inspirational</NuxtLink>
                                            </td>
                                            <td class="product-price"><span class="amount">$20.00</span></td>
                                            <td class="product-quantity">
                                                <NuxtLink class="edu-border-btn" to="/cart">Add to Cart</NuxtLink>
                                            </td>
                                            <td class="product-subtotal"><span class="amount">$20.00</span></td>
                                            <td class="product-remove"><a href="#"><i class="fa fa-times"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td class="product-thumbnail">
                                                <NuxtLink to="/shop"><img src="/img/products/product-thumb-11.png"
                                                        alt="img not found"></NuxtLink>
                                            </td>
                                            <td class="product-name">
                                                <NuxtLink to="/shop">Wealth & Happiness</NuxtLink>
                                            </td>
                                            <td class="product-price"><span class="amount">$24.00</span></td>
                                            <td class="product-quantity">
                                                <NuxtLink class="edu-border-btn" to="/cart">Add to Cart</NuxtLink>
                                            </td>
                                            <td class="product-subtotal"><span class="amount">$24.00</span></td>
                                            <td class="product-remove"><a href="#"><i class="fa fa-times"></i></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- wishlist-area-end -->

        <!-- footer-area-start -->
        <FooterOne />
        <!-- footer-area-end -->

    </div>

</template>

<style scoped>
</style>