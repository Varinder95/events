<script>
import FooterOne from "./Common/FooterOne.vue";
import PageTitle from "./Common/PageTitle.vue";
import HeaderFour from "./Common/HeaderFour.vue";
import axios from 'axios';

export default {
    name: "PendingEvent",
    components: {
        FooterOne,
        PageTitle,
        HeaderFour
    },
    data() {
      return {
        getData:'',
        NoOfRows: '',
        perPage: 10,
        currentPage: 1,
        loaded: false,
        Loading: true,
        eventDataReceived: false
      }
    },
    mounted() {
        if (localStorage.loggedIn) {
            this.loggedIn = localStorage.loggedIn;
        }
        this.loaded = true
        this.getEventData()
    },
    methods:{
      ChangeNoRows() {
        this.perPage = this.NoOfRows
      },
      async getEventData() {
        await axios.get('http://127.0.0.1:4000/events/getAllPending', {
        }).then((res) => {
            console.log(res)   
            this.getData = res.data
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
        if((this.getData).length !== 0) {
            this.eventDataReceived = true
        }
          this.Loading = false
        },
    },
    computed: {
      rows() {
        return this.getData.length
      }
    }
};
</script>

<template>
    <div>

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- course-area-start -->
        <PageTitle pageTitle="Events awaiting approval" pageSubTitle="Pending Events" />
        <!-- course-area-end -->

        <!-- wishlist-area-start -->
        <div class="cart-area pt-100 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-content table-responsive">
                          <!-- If there is one or more queries Loading -->
                          <div v-if="Loading">
                            Loading
                          </div>
                          <!-- Actual view -->
                          <div v-else>
                            <table class="table">
                              <thead>
                                  <tr>
                                      <th class="product-thumbnail">Event Name</th>
                                      <th class="cart-product-name">Created By</th>
                                      <th class="product-price">Sport</th>
                                      <th class="product-quantity">Start Date</th>
                                      <th class="product-subtotal">End Date</th>
                                      <th class="product-remove">Details</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="data in getData" :key="data.id">
                                      <td class="product-name">
                                          <NuxtLink :to="`/event-details/${data.id}`"> {{ data.Name }} </NuxtLink>
                                      </td>
                                      <td class="product-name">
                                        <span> {{ data.createdByFName }} </span>
                                      </td>
                                      <td class="product-subtotal"><span class="amount"> {{ data.Sport }} </span></td>
                                      <td class="product-price"><span class="amount">{{ data.startDate }}</span></td>
                                      <td class="product-price"><span class="amount">{{ data.endDate }}</span></td>
                                      <td class="product-quantity">
                                          <NuxtLink class="edu-border-btn" :to="`/event-details/${data.id}`">Show Details</NuxtLink>
                                      </td>
                                  </tr>
                              </tbody>
                            </table>
                          </div>
                            
                        </div>
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