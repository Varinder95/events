<template>
    <section class="membership-area pt-110">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-6">
                    <div class="section-title text-center mb-40">
                        <h2>Administrator Actions</h2>
                    </div>
                    <div class="pricing-tab mb-60">
                        <ul class="nav nav-tabs justify-content-center" id="priceTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="events-tab" data-bs-toggle="tab"
                                data-bs-target="#events" type="button" role="tab" aria-controls="events"
                                aria-selected="true">Events</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                                type="button" role="tab" aria-controls="users" aria-selected="false">Users</button>
                        </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content" id="priceTabContent"
                    style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
                    <div class="tab-pane fade active show" id="events" role="tabpanel" aria-labelledby="events-tab">
                        <div class="row">
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <div class="admin-tile mb-30">
                                    <div class="membership-info">
                                        <h4>Pending</h4>
                                        <div class="membership-price">
                                            <span>{{ pendingCount }}</span>
                                            <p>Events awaiting </p>
                                        </div>
                                    </div>
                                    <a class="membership-btn" href="/pending">Show All</a>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <div class="admin-tile mb-30">
                                    <div class="membership-info">
                                        <h4>Featured</h4>
                                        <div class="membership-price">
                                            <span>{{ featuredCount }} / 6</span>
                                            <p>Set featured events (total 6) </p>
                                        </div>
                                    </div>
                                    <a class="membership-btn" href="/pending">Set Featured</a>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <div class="admin-tile mb-30">
                                    <div class="membership-info">
                                        <h4>Approved Events</h4>
                                        <div class="membership-price">
                                            <span>{{ totalCount }}</span>
                                            <p>All approved events </p>
                                        </div>
                                    </div>
                                    <a class="membership-btn" href="/approved">Show All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div class="admin-tile mb-30">
                                    <div class="membership-info">
                                        <h4>All Users</h4>
                                        <div class="membership-price">
                                            <span>{{ userCount }}</span>
                                            <p>All users</p>
                                        </div>
                                    </div>
                                    <a class="membership-btn" href="#">Show All</a>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div class="admin-tile mb-30">
                                    <div class="membership-info">
                                        <h4>Admin Users</h4>
                                        <div class="membership-price">
                                            <span>{{ adminCount }}</span>
                                            <p>All admin users</p>
                                        </div>
                                    </div>
                                    <a class="membership-btn" href="#">Show All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminTiles',
    data() {
        return {
            pendingCount: '',
            totalCount: '',
            featuredCount: '',
            userCount: '',
            adminCount: '',
        }
        
    },
    methods: {
        async getEventCount() {
            await axios.get('http://127.0.0.1:4000/events/getEventCount', {
               params: { approvalStatus : 'Approved'} 
            }).then((res) => {
                console.log(res.data.EventCount)  
                this.totalCount = res.data.EventCount
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
        },
        async getPendingCount() {
            await axios.get('http://127.0.0.1:4000/events/getEventCount', {
               params: { approvalStatus : 'Pending'} 
            }).then((res) => {
                console.log(res.data.EventCount)  
                this.pendingCount = res.data.EventCount
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
        },
        async getFeaturedCount() {
            await axios.get('http://127.0.0.1:4000/events/getEventCount', {
               params: { Featured : 'Yes'} 
            }).then((res) => {
                console.log(res.data.EventCount)  
                this.featuredCount = res.data.EventCount
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
        },
    },
    beforeMount() {
        this.getEventCount()
        this.getFeaturedCount()
        this.getPendingCount()

    }
}
</script>
<style scoped>
.admin-tile {
    background: #fff;
    border: 1px solid #edeef2;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(12,29,74,.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 40px;
    position: relative;
}
</style>