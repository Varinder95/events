<template>
    <div>

        <!-- header-area-start -->
        <HeaderFour />
        <!-- header-area-end -->

        <!-- breadcrumbs-area-start -->
        <PageTitle pageTitle="Events awaiting approval" pageSubTitle="Pending Events" />
        <!-- breadcrumbs-area-end -->

        <!-- events-area-start -->
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
                                      <th class="product-subtotal">Approval Status</th>
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
                                      <td class="product-price"><span class="amount">{{ getDateFormat(data.startDate) }}</span></td>
                                      <td class="product-price"><span class="amount">{{ getDateFormat(data.endDate) }}</span></td>
                                      <td class="product-name">
                                        <span> {{ data.approvalStatus }} </span>
                                      </td>
                                      <td class="product-quantity">
                                          <NuxtLink class="edu-border-btn" :to="`/event-details/${data.id}`">Show Details</NuxtLink>
                                      </td>
                                  </tr>
                              </tbody>
                            </table>
                            <div class="mt-10">
                              <paginate
                                v-model="page"
                                :page-count="pageCount"
                                :page-range="3"
                                :margin-pages="2"
                                :click-handler="clickCallback"
                                :prev-text="'Prev'"
                                :next-text="'Next'"
                                :container-class="'pagination justify-content-center'"
                                :page-class="'page-item'"
                              >
                              </paginate>
                            </div>
                          </div>
                            
                        </div>
                      </div>
                  </div>
            </div>
        </div>
        <!-- events-area-end -->

        <!-- footer-area-start -->
        <FooterOne />
        <!-- footer-area-end -->

    </div>

</template>
<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import HeaderFour from "../Common/HeaderFour.vue";
import VuejsPaginateNext from "../Common/Pagination.vue";
import axios from 'axios';

export default {
    name: "PendingEvents",
    components: {
        FooterOne,
        PageTitle,
        HeaderFour,
        paginate: VuejsPaginateNext,
    },
    data() {
      return {
        getData:'',
        loaded: false,
        Loading: true,
        eventDataReceived: false,
        pageCount: '',
        page: 1,
        size: 10

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
      clickCallback: function () {
        this.getEventData()
      },
      ChangeNoRows() {
        this.perPage = this.NoOfRows
      },
      async getEventData() {
        await axios.get('http://127.0.0.1:4000/events/getAllPending', {
          params : {
            page : this.page,
            size : this.size
          }
        }).then((res) => {
            console.log(res.data)   
            this.getData = res.data.docs
            this.pageCount = res.data.totalPages
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
      getDateFormat(dateValue) {
         var dateObj = new Date(dateValue)
         var formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth()+1)).slice(-2)}/${dateObj.getFullYear()}`
         return formattedDate
      }
    },
    computed: {
    }
};
</script>

<style scoped>
</style>