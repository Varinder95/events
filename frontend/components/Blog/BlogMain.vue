<script>
import FooterOne from "../Common/FooterOne.vue";
import PageTitle from "../Common/PageTitle.vue";
import Pagination from "../Common/Pagination.vue";
import blogItemsMixin from "../../mixins/blogItemsMixin";
import BlogSidebar from "./BlogSidebar.vue";
import HeaderFour from "../Common/HeaderFour.vue";

export default {
   name: "app",
   mixins: [blogItemsMixin],
   components: {
      FooterOne,
      PageTitle,
      BlogSidebar,
      Pagination,
      HeaderFour
   }
};
</script>

<template>
   <div>

      <!-- header-area-start -->
      <HeaderFour />
      <!-- header-area-end -->

      <!-- pageTitle-area-end -->
      <PageTitle pageTitle="Blog" pageSubTitle="Blog" />
      <!-- pageTitle-area-end -->

      <!-- Blog-area-start -->
      <div class="blog-area pt-120 pb-90">
         <div class="container">
            <div class="row">
               <div class="col-xl-8 col-lg-12">
                  <div class="blog-main-wrapper mb-30" v-for="item in blogItemss.slice(0, 3)" :key="item.id">
                     <div class="row">
                        <div class="col-xl-12 col-lg-6 col-md-12">
                           <div class="blog-wrapper position-relative mb-30">
                              <div class="blog-thumb ">
                                 <NuxtLink :to="`/blog-details/${item.id}`"><img :src="item.blogImage" alt="blog-img">
                                 </NuxtLink>
                              </div>
                              <NuxtLink class="blog-tag" to="/blog"><i class="fal fa-folder-open"></i>{{ item.blogTag }}
                              </NuxtLink>
                              <div class="blog-content-wrapper">
                                 <div class="blog-meta">
                                    <div class="blog-date">
                                       <i class="flaticon-calendar"></i>
                                       <span>{{ item.blogDate }}</span>
                                    </div>
                                    <div class="blog-user">
                                       <i class="flaticon-avatar"></i>
                                       <span>{{ item.blogUser }}</span>
                                    </div>
                                 </div>
                                 <div class="blog-content">
                                    <NuxtLink :to="`/blog-details/${item.id}`">
                                       <h3>{{ item.blogTitle }}</h3>
                                    </NuxtLink>
                                    <p>{{ item.blogDesc }}</p>
                                    <NuxtLink class="blog-btn" :to="`/blog-details/${item.id}`">{{ item.blogBtn }}
                                    </NuxtLink>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-lg-8 col-md-8">
                  <BlogSidebar />
               </div>
            </div>
            <Pagination />
         </div>
      </div>
      <!-- Blog-area-end -->

      <!-- Footer-area-start -->
      <FooterOne />
      <!-- Footer-area-end -->
   </div>

</template>

<style scoped>
</style>
