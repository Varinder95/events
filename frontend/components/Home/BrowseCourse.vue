<template>
    <div class="browser-course-area">
         <div class="container">
            <div class="row">
               <div class="col-xl-6 col-lg-6 col-md-12 mb-30" v-for="item in browseCourse" :key="item.browseTitle">
                  <div class="browser-course-wrapper course-height">
                     <div class="browser-course-bg">
                        <img :src="item.browseImage" alt="image not found">
                     </div>
                     <div class="browser-course-content">
                        <span>{{ item.browseDesc }}</span>
                        <div class="browser-course-tittle">
                           <NuxtLink :to="item.browseUrl">{{ item.browseTitle }}</NuxtLink>
                        </div>
                        <div class="browser-btn">
                           <NuxtLink class="course-btn" :to="item.browseBtnUrl">{{ item.browseBtn }}</NuxtLink>
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
    name: 'browseCourse',
    data() {
        return {
            browseCourse: [{
                    browseImage: '/img/browser-course/browser-course-01.jpg',
                    browseDesc: 'Start from today',
                    browseTitle: 'Become an instructor and spread your knowledge',
                    browseUrl: '/instructor',
                    browseBtn: 'View details',
                    browseBtnUrl: '/become-instructor',
                },
                {
                    browseImage: '/img/browser-course/browser-course-02.jpg',
                    browseDesc: 'Discover your gain',
                    browseTitle: 'Keep your skilled centers of excellence competitive',
                    browseUrl: '/course-details',
                    browseBtn: 'Browse courses',
                    browseBtnUrl: '/course',
                }
            ],
        }
    }
}
</script>