<script>
import FooterOne from "../Common/FooterOne.vue";
import FaqBanner from "../FaqPage/FaqBanner.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
   name: "app",
   components: {
      FooterOne,
      FaqBanner,
      HeaderFour
   }
};
</script>

<template>
   <div>
      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- FaqBanner-area-start -->
      <FaqBanner />
      <!-- FaqBanner-area-end -->

      <section class="faq-detalis-area pt-120 pb-90">
         <div class="container">
            <div class="row">
               <div class="col-xl-9 col-lg-8">
                  <div class="faq-content-wrapper mb-25">
                     <div class="faq-detalis-info">
                        <h3>How to start course on Mobile</h3>
                        <p>There are so many websites out there that have not considered the overall usability of their
                           visually impaired users. When it comes to designing better links and sending better emails,
                           Slava Shestopalov has a few tips on how to improve your website’s experience while
                           accessibility in mind.</p>
                     </div>
                     <div class="faq-suppoert">
                        <h5>Incorrectly entered information</h5>
                        <p>There are so many websites out there that have not considered the overall usability of their
                           visually impaired users. When it comes to designing better links and sending better emails,
                        </p>
                        <ul>
                           <li>Handle advanced techniques like Dimensionality Reduction Did you encounter a purchasing
                              error which said to contact <NuxtLink to="/contact">Eduman Support?</NuxtLink>
                           </li>
                           <li>With a little CSS, we can adapt our web designs to be more accommodating for people with
                              dyslexia. In this article, we’ll explore those techniques by adding a dyslexia-friendly
                              mode to an existing design.</li>
                           <li>You can find <NuxtLink to="/contact"><span>Markdown in many places</span> </NuxtLink> on
                              the
                              Internet. This article covers different aspects of Markdown and how it interacts with
                              other technology.</li>
                           <li>Dialogs are everywhere in modern interface design (for good or for bad), and yet many of
                              them are not accessible to assistive technologies In this article.</li>
                           <li>Web app accessibility appears difficult because it seems that there is little information
                              on the subject available online. Let’s take a closer look at the <NuxtLink to="/contact">
                                 accessible use of framework features.</NuxtLink>
                           </li>
                        </ul>
                     </div>
                     <div class="payment-method-info">
                        <h5>Outdated saved payment method</h5>
                        <p>ake headlines, for example. A solid and comprehensible headline structure is not only good
                           for SEO but especially for people using screen readers. When they encounter a sound document
                           outline, constructed with headlines that structure a web page or app, <NuxtLink
                              to="/contact">screen reader users gain a quick overview</NuxtLink> of the web page they
                           are
                           on. Just like visually-abled users don’t read every word on a page but scan for interesting
                           things</p>
                     </div>
                  </div>
               </div>
               <div class="col-xl-3 col-lg-4 col-md-8">
                  <div class="side-bar-widget mb-30">
                     <div class="faq-sidebar-topc">
                        <h5>Related Topics</h5>
                        <div class="sidebar-topic-list">
                           <ul>
                              <li>
                                 <NuxtLink to="/faq-page">Account / Profile (45)</NuxtLink>
                              </li>
                              <li>
                                 <NuxtLink to="/faq-page">Mobile & Tab (12)</NuxtLink>
                              </li>
                              <li>
                                 <NuxtLink to="/faq-page">Troubleshooting (14)</NuxtLink>
                              </li>
                              <li>
                                 <NuxtLink to="/faq-page">Admission (5)</NuxtLink>
                              </li>
                              <li>
                                 <NuxtLink to="/faq-page">Purchase Course (7)</NuxtLink>
                              </li>
                              <li>
                                 <NuxtLink to="/faq-page">Course Tracking (9)</NuxtLink>
                              </li>
                              <li>
                                 <NuxtLink to="/faq-page">Refund Method (13)</NuxtLink>
                              </li>
                           </ul>
                           <NuxtLink class="contact-btn" to="/contact">Contact Us</NuxtLink>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->
   </div>

</template>

<style scoped>
</style>
