<template>
    <div :class="student_Space ? student_Space : 'student-choose-area fix pt-120 pb-110'">
      <div class="container">
         <div class="row">
            <div class="col-xl-5 col-lg-5">
               <div class="student-wrapper">
                  <div class="section-title mb-30">
                     <h2>Why People <span class="down-mark-line">Choose</span> Us for Hosting Life Changing events.</h2>
                  </div>
                  <div class="sitdent-choose-content">
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                  </div>
                  <div class="student-choose-list">
                     <ul>
                        <li v-for="item in studentChoose" :key="item.chooseTitle"><i class="fas fa-check-circle"></i> {{ item.chooseTitle }}</li>
                     </ul>
                  </div>
                  <div class="student-btn">
                     <NuxtLink class="edu-sec-btn" to="/about">More about us</NuxtLink>
                  </div>
               </div>
            </div>
            <div class="col-xl-2 col-lg-2">
               <div class="student-wrapper position-relative">
                  <div class="shap-01"></div>
               </div>
            </div>
            <div class="col-xl-5 col-lg-5">
               <div class="student-choose-wrapper position-relative">
                  <div class="shap-02">
                  </div>
                  <div class="shap-03">
                     <img src="/img/shape/student-shape-03.png" alt="image not found">
                  </div>
                  <div class="shap-04">
                     <img src="/img/shape/student-shape-04.png" alt="image not found">
                  </div>
                  <div class="shap-05">
                     <img src="/img/shape/student-shape-05.png" alt="image not found">
                  </div>
                  <div class="shap-06">
                     <img src="/img/shape/student-shape-06.png" alt="image not found">
                  </div>
                  <div class="shap-07">
                     <img src="/img/shape/student-shape-07.png" alt="image not found">
                  </div>
                  <div class="student-choose-thumb">
                     <img src="/img/student-choose/student.png" alt="image not found">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
    name: 'student',
    props:{
        student_Space: String
    },
    data() {
        return {
            studentChoose: [{
                    chooseTitle: 'Lorem ipsum dolor sit amet',
                },
                {
                    chooseTitle: 'Lorem ipsum dolor sit amet',
                },
                {
                    chooseTitle: 'Lorem ipsum dolor sit amet',
                }
            ],
        }
    }
}
</script>