<template>
    <div class="hero-arera course-item-height" :style="{ backgroundImage: `url(/img/slider/course-slider.jpg)`}">
         <div class="container">
            <div class="row">
               <div class="col-xl-12">
                  <div class="hero-course-1-text">
                     <h2>{{pageTitle}}</h2>
                  </div>
                  <div class="course-title-breadcrumb">
                     <nav>
                        <ol class="breadcrumb">
                           <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
                           <li class="breadcrumb-item"><span>{{pageSubTitle}}</span></li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
export default {
    name:'PageTitle',
    props:{
        pageTitle:String,
        pageSubTitle:String,
    }
}
</script>