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
    },
    data() {
        return {
            value: 1,
            valueTwo: 1,
            valueThree: 1,
        }
    },
    methods: {
        handleIncreaseValue(value) {
            if (value === 'valueOne') {
                this.value++
            }
            if (value === 'valueTwo') {
                this.valueTwo++
            }
            if (value === 'valueThree') {
                this.valueThree++
            }

        },
        handleDecreaseValue(value) {
            if (value === 'valueOne' && this.value > 0) {
                this.value--
            }
            if (value === 'valueTwo' && this.valueTwo > 0) {
                this.valueTwo--
            }
            if (value === 'valueThree' && this.valueThree > 0) {
                this.valueThree--
            }
        }
    },
};
</script>

<template>
    <div>
        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- PageTitle-area-start -->
        <PageTitle pageTitle="My Cart" pageSubTitle="My Cart" />
        <!-- PageTitle-area-end -->

        <!-- cart-area-start -->
        <section class="cart-area pt-100 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-content table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail">Images</th>
                                        <th class="cart-product-name">Product</th>
                                        <th class="product-price">Unit Price</th>
                                        <th class="product-quantity">Quantity</th>
                                        <th class="product-subtotal">Total</th>
                                        <th class="product-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="product-thumbnail">
                                            <NuxtLink to="/shop"><img src="/img/products/product-thumb-01.png"
                                                    alt="img not found"></NuxtLink>
                                        </td>
                                        <td class="product-name">
                                            <NuxtLink to="/shop">Turn Yourself</NuxtLink>
                                        </td>
                                        <td class="product-price"><span class="amount">$24.00</span></td>
                                        <td class="product-quantity text-center">
                                            <div class="product-quantity mt-10 mb-10">
                                                <div class="product-quantity-form">
                                                    <form action="#">
                                                        <button type="button" class="cart-minus"
                                                            @click="handleDecreaseValue('valueOne')"><i
                                                                class="far fa-minus"></i></button>
                                                        <input class="cart-input" type="text" v-model="value" />
                                                        <button type="button" class="cart-plus"
                                                            @click="handleIncreaseValue('valueOne')"><i
                                                                class="far fa-plus"></i></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="product-subtotal"><span class="amount">$24.00</span></td>
                                        <td class="product-remove"><a href="#"><i class="fa fa-times"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td class="product-thumbnail">
                                            <NuxtLink to="/shop"><img src="/img/products/product-thumb-02.png"
                                                    alt="img not found"></NuxtLink>
                                        </td>
                                        <td class="product-name">
                                            <NuxtLink to="/shop">Art of Not Giving</NuxtLink>
                                        </td>
                                        <td class="product-price"><span class="amount">$12.00</span></td>
                                        <td class="product-quantity text-center">
                                            <div class="product-quantity mt-10 mb-10">
                                                <div class="product-quantity-form">
                                                    <form action="#">
                                                        <button type="button" class="cart-minus"
                                                            @click="handleDecreaseValue('valueTwo')"><i
                                                                class="far fa-minus"></i></button>
                                                        <input class="cart-input" type="text" v-model="valueTwo" />
                                                        <button type="button" class="cart-plus"
                                                            @click="handleIncreaseValue('valueTwo')"><i
                                                                class="far fa-plus"></i></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="product-subtotal"><span class="amount">$12.00</span></td>
                                        <td class="product-remove"><a href="#"><i class="fa fa-times"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td class="product-thumbnail">
                                            <NuxtLink to="/shop"><img src="/img/products/product-thumb-03.png"
                                                    alt="img not found"></NuxtLink>
                                        </td>
                                        <td class="product-name">
                                            <NuxtLink to="/shop">Attract Women</NuxtLink>
                                        </td>
                                        <td class="product-price"><span class="amount">$42.00</span></td>
                                        <td class="product-quantity text-center">
                                            <div class="product-quantity mt-10 mb-10">
                                                <div class="product-quantity-form">
                                                    <form action="#">
                                                        <button type="button" class="cart-minus"
                                                            @click="handleDecreaseValue('valueThree')"><i
                                                                class="far fa-minus"></i></button>
                                                        <input class="cart-input" type="text" v-model="valueThree" />
                                                        <button type="button" class="cart-plus"
                                                            @click="handleIncreaseValue('valueThree')"><i
                                                                class="far fa-plus"></i></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="product-subtotal"><span class="amount">$42.00</span></td>
                                        <td class="product-remove"><a href="#"><i class="fa fa-times"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="coupon-all">
                                    <div class="coupon d-flex align-items-center">
                                        <input id="coupon_code" class="input-text" name="coupon_code" value=""
                                            placeholder="Coupon code" type="text">
                                        <button class="edu-btn" name="apply_coupon" type="submit">Apply
                                            coupon</button>
                                    </div>
                                    <div class="coupon2">
                                        <button class="edu-btn" name="update_cart" type="submit">Update cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 ml-auto">
                                <div class="cart-page-total">
                                    <h2>Cart totals</h2>
                                    <ul class="mb-20">
                                        <li>Subtotal <span>$78.00</span></li>
                                        <li>Total <span>$78.00</span></li>
                                    </ul>
                                    <NuxtLink class="edu-border-btn" to="/checkout">Proceed to checkout</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- cart-area-end -->

        <!-- footer-area-start -->
        <FooterOne />
        <!-- footer-area-end -->

    </div>

</template>

<style scoped>
</style>