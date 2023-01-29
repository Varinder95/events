<template>
    <div class="counter-area pt-120 pb-75">
         <div class="container">
            <div class="row">
               <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6" v-for="item in counterList" :key="item.counterTitle">
                  <div class="counter-box text-center mb-40">
                    <div class="counter-icon">
                        <img :src="item.counterImage" alt="shape">
                        <div class="count-number">
                            <span class="counter">{{ item.counterTitle }}</span>
                            <p>{{ item.counterDesc }}</p>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>


<script>
export default {
    name: 'counter',
    data() {
        return {
            counterList: [{
                    counterTitle: '68,806',
                    counterDesc: 'Active Users',
                    counterImage: '/img/icon/counter-1.png',
                },
                {
                    counterTitle: '5,740',
                    counterDesc: 'Events Hosted',
                    counterImage: '/img/icon/counter-2.png',
                },
                {
                    counterTitle: '470',
                    counterDesc: 'Skilled Organisers',
                    counterImage: '/img/icon/counter-3.png',
                },
                {
                    counterTitle: '100',
                    counterDesc: 'Events Categories ',
                    counterImage: '/img/icon/counter-4.png',
                }
            ],
        }
    }
}
</script>