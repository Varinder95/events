<template>
    <section class="slider-area hero-height position-relative fix" :style="{ backgroundImage: `url(/img/slider/Image.jpg)`}">
         <img class="shape-3 d-none d-xxl-block" src="/img/shape/shape-03.png" alt="image not found" />
         <div class="container">
            <div class="row">
               <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="hero-text pt-95">
                     <h5>Discover your journey</h5>
                     <h2>Discover <span class="down-mark-line">4500+</span> Events
                        from top Organisers
                        Around the World</h2>
                     <p>Host your own Events to the next level.</p>
                     <div class="hero-btn">
                        <NuxtLink class="edu-btn" to="/event">View all events</NuxtLink>
                     </div>
                  </div>
               </div>
               <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="hero-right position-relative">
                     <img data-depth="0.2" class="shape shape-1" src="/img/shape/shape-01.png" alt="shape">
                     <img data-depth="0.2" class="shape-2" src="/img/shape/shape-02.png" alt="shape">
                     <img class="shape-6" src="/img/shape/slider-shape-6.png" alt="shape">
                     <div class="shape-4">
                        <img src="/img/shape/shape-04.png" alt="shape">
                        <h5 class="hero-shape-text">Top Rated
                           Organisers</h5>
                     </div>
                     <div class="shape-5">
                        <div class="course-card">
                           <img src="/img/shape/slider-card-1.png" alt="image not found">
                           <img src="/img/shape/slider-card-2.png" alt="image not found">
                           <img src="/img/shape/slider-card-3.png" alt="image not found">
                           <img src="/img/shape/slider-card-4.png" alt="image not found">
                           <span><i class="far fa-plus"></i></span>
                        </div>
                        <h5>More than <span>500+</span> events
                           completed around the world</h5>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
</template>