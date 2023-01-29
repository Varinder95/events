<template>
    <section class="membership-area pt-110">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-6">
                    <div class="section-title text-center mb-40">
                        <h2>Membership Plan</h2>
                        <p>Whether you're looking for smart course , start your next journey with course of
                        famous instructors -- we have a plan for you.</p>
                    </div>
                    <div class="pricing-tab mb-60">
                        <ul class="nav nav-tabs justify-content-center" id="priceTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="monthly-tab" data-bs-toggle="tab"
                                data-bs-target="#monthly" type="button" role="tab" aria-controls="monthly"
                                aria-selected="true">monthly</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="yearly-tab" data-bs-toggle="tab" data-bs-target="#yearly"
                                type="button" role="tab" aria-controls="yearly" aria-selected="false">yearly</button>
                        </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content" id="priceTabContent"
                    style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
                    <div class="tab-pane fade active show" id="monthly" role="tabpanel" aria-labelledby="monthly-tab">
                        <div class="row">
                            <div class="col-xl-3 col-lg-6 col-md-6" v-for="item in monthlyMember" :key="item.id">
                                <div class="membership-box mb-30">
                                    <div class="membership-info">
                                        <h4>{{ item.size }}</h4>
                                        <div class="membership-price">
                                            <span>{{ item.price }}</span>
                                            <p>{{ item.priceDesc }}</p>
                                        </div>
                                        <div class="membership-list">
                                            <ul>
                                                <li v-for="itemTwo in item.MonthFeatures" :key="itemTwo.MonthFeature">
                                                <i class="far fa-check"></i> {{ itemTwo.MonthFeature }}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a :class="item.btnClass" href="#">{{ item.btn }}</a>

                                    <div :class="item.popularPlanClass">
                                        <span>Popular plan</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="yearly" role="tabpanel" aria-labelledby="yearly-tab">
                        <div class="row">
                            <div class="col-xl-3 col-lg-6 col-md-6" v-for="item in yearlyMember" :key="item.id">
                                <div class="membership-box mb-30">
                                    <div class="membership-info">
                                        <h4>{{ item.size }}</h4>
                                        <div class="membership-price">
                                            <span>{{ item.price }}</span>
                                            <p>{{ item.priceDesc }}</p>
                                        </div>
                                        <div class="membership-list">
                                            <ul>
                                                <li v-for="itemTwo in item.yearFeatures" :key="itemTwo.yearFeature">
                                                <i class="far fa-check"></i> {{ itemTwo.yearFeature }}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a :class="item.btnClass" href="#">{{ item.btn }}</a>

                                    <div :class="item.popularPlanClass">
                                        <span>Popular plan</span>
                                    </div>
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
export default {
    name: 'membership',
    data() {
        return {
            monthlyMember: [{
                    id: 1,
                    size: 'Basic',
                    price: 'Free',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn',
                    popularPlanClass : 'Popular-plan d-none',
                    MonthFeatures: [{
                        MonthFeature: 'Up to 2 Devices'
                    },
                    {
                        MonthFeature: 'Handle Basic Option'
                    },
                    {
                        MonthFeature: 'Individual Course'
                    },
                    {
                        MonthFeature: 'Free for starters'
                    }]
                },
                {
                    id: 2,
                    size: 'Basic',
                    price: '9.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn',
                    popularPlanClass : 'Popular-plan d-none',
                    MonthFeatures: [{
                        MonthFeature: 'Up to 5 Devices'
                    },
                    {
                        MonthFeature: 'Handle Basic Option'
                    },
                    {
                        MonthFeature: 'Individual Course'
                    },
                    {
                        MonthFeature: '3 Times Access'
                    }]
                },
                {
                    id: 3,
                    size: 'Basic',
                    price: '14.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn-active',
                    popularPlanClass : 'Popular-plan',
                    MonthFeatures: [{
                        MonthFeature: 'Up to 10 Devices'
                    },
                    {
                        MonthFeature: 'Handle Basic Option'
                    },
                    {
                        MonthFeature: 'Individual Course'
                    },
                    {
                        MonthFeature: 'Full Time Access'
                    },
                    {
                        MonthFeature: 'Monthly Backup'
                    }]
                },
                {
                    id: 4,
                    size: 'Basic',
                    price: '19.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn',
                    popularPlanClass : 'Popular-plan d-none',
                    MonthFeatures: [{
                        MonthFeature: 'Unlimited Devices'
                    },
                    {
                        MonthFeature: 'Handle Basic Option'
                    },
                    {
                        MonthFeature: 'Individual Course'
                    },
                    {
                        MonthFeature: 'Instant Profile Option'
                    },
                    {
                        MonthFeature: 'Full Time Access'
                    },
                    {
                        MonthFeature: 'Anytime Backup'
                    }]
                }
            ],
            yearlyMember: [{
                    id: 5,
                    size: 'Basic',
                    price: '9.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn',
                    popularPlanClass : 'Popular-plan d-none',
                    yearFeatures: [{
                        yearFeature: 'Up to 2 Devices'
                    },
                    {
                        yearFeature: 'Handle Basic Option'
                    },
                    {
                        yearFeature: 'Individual Course'
                    },
                    {
                        yearFeature: 'Free for starters'
                    }]
                },
                {
                    id: 6,
                    size: 'Basic',
                    price: '19.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn',
                    popularPlanClass : 'Popular-plan d-none',
                    yearFeatures: [{
                        yearFeature: 'Up to 5 Devices'
                    },
                    {
                        yearFeature: 'Handle Basic Option'
                    },
                    {
                        yearFeature: 'Individual Course'
                    },
                    {
                        yearFeature: '3 Times Access'
                    }]
                },
                {
                    id: 7,
                    size: 'Basic',
                    price: '29.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn-active',
                    popularPlanClass : 'Popular-plan',
                    yearFeatures: [{
                        yearFeature: 'Up to 10 Devices'
                    },
                    {
                        yearFeature: 'Handle Basic Option'
                    },
                    {
                        yearFeature: 'Individual Course'
                    },
                    {
                        yearFeature: 'Full Time Access'
                    },
                    {
                        yearFeature: 'Monthly Backup'
                    }]
                },
                {
                    id: 8,
                    size: 'Basic',
                    price: '69.00',
                    priceDesc: 'Free for starters',
                    btn: 'Choose plan',
                    btnClass : 'membership-btn',
                    popularPlanClass : 'Popular-plan d-none',
                    yearFeatures: [{
                        yearFeature: 'Unlimited Devices'
                    },
                    {
                        yearFeature: 'Handle Basic Option'
                    },
                    {
                        yearFeature: 'Individual Course'
                    },
                    {
                        yearFeature: 'Instant Profile Option'
                    },
                    {
                        yearFeature: 'Full Time Access'
                    },
                    {
                        yearFeature: 'Anytime Backup'
                    }]
                }
            ],
        }
        
    }
}
</script>