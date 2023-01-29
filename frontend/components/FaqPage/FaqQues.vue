<template>
   <div class="faq-topic-area pb-50">
      <div class="container">
         <div class="faq-tabs-area mt-50">
            <div class="row">
               <div class="col-xl-12">
                  <div class="faq-nav-tab">
                     <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                           <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                              type="button" role="tab" aria-controls="home" aria-selected="true">Student</button>
                        </li>
                        <li class="nav-item" role="presentation">
                           <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                              type="button" role="tab" aria-controls="profile" aria-selected="false">Instructor</button>
                        </li>
                     </ul>
                  </div>
                  <div class="faq-nav-content">
                     <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                           <div class="faq-area pt-30 pb-30">
                              <div class="row">
                                 <div class="col-xl-12">
                                    <div class="faq-tittle-info text-center pt-55 mb-50">
                                       <h3>Frequently Asked Questions</h3>
                                    </div>
                                 </div>
                                 <div class="col-xl-4 col-lg-6" v-for="item in studentFaq" :key="item.id">
                                    <div class="faq-wrapper mb-30">
                                       <div class="faq-question-item">
                                          <div class="faq-queastion-text">
                                             <NuxtLink to="/faq-details">{{ item.studentFaqTitle }}</NuxtLink>
                                          </div>
                                          <div class="faqicon-arrow">
                                             <NuxtLink to="/faq-details"><i class="far fa-chevron-right"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                           <div class="faq-area pt-30 pb-30">
                              <div class="row">
                                 <div class="col-xl-12">
                                    <div class="faq-tittle-info text-center pt-55 mb-50">
                                       <h3>Frequently Asked Questions</h3>
                                    </div>
                                 </div>
                                 <div class="col-xl-4 col-lg-6" v-for="item in teacherFaq" :key="item.id">
                                    <div class="faq-wrapper mb-30">
                                       <div class="faq-question-item">
                                          <div class="faq-queastion-text">
                                             <NuxtLink to="/faq-details">{{ item.teacherFaqTitle }}</NuxtLink>
                                          </div>
                                          <div class="faqicon-arrow">
                                             <NuxtLink to="/faq-details"><i class="far fa-chevron-right"></i></NuxtLink>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
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
   name: 'faq',
   data() {
      return {
         studentFaq: [{
            id: 1,
            studentFaqTitle: 'Life time access for course',
         },
         {
            id: 2,
            studentFaqTitle: 'How to find missing course',
         },
         {
            id: 3,
            studentFaqTitle: 'How to download course certificate',
         },
         {
            id: 4,
            studentFaqTitle: 'Life time access for course',
         },
         {
            id: 5,
            studentFaqTitle: 'How to refund a course',
         },
         {
            id: 6,
            studentFaqTitle: 'Payment method on Eduman',
         },
         {
            id: 7,
            studentFaqTitle: 'How to start course on Mobile',
         },
         {
            id: 8,
            studentFaqTitle: 'How to gift course to friend',
         },
         {
            id: 9,
            studentFaqTitle: 'How edit your profile',
         }
         ],
         teacherFaq: [{
            id: 10,
            teacherFaqTitle: 'How to find missing course',
         },
         {
            id: 12,
            teacherFaqTitle: 'How to download course certificate',
         },
         {
            id: 13,
            teacherFaqTitle: 'Life time access for course',
         },
         {
            id: 14,
            teacherFaqTitle: 'Life time access for course',
         },
         {
            id: 15,
            teacherFaqTitle: 'How to refund a course',
         },
         {
            id: 16,
            teacherFaqTitle: 'Payment method on Eduman',
         },
         {
            id: 17,
            teacherFaqTitle: 'How to start course on Mobile',
         },
         {
            id: 18,
            teacherFaqTitle: 'How to gift course to friend',
         },
         {
            id: 19,
            teacherFaqTitle: 'How edit your profile',
         }
         ],
      }
   }
}
</script>