<template>
    <div class="blog-area pt-110 pb-90">
        <div class="container">
            <div class="row">
                <div class="col-xl-12 text-center">
                    <div class="section-title mb-50">
                        <h2>Read Our <span class="down-mark-line-2">Latest</span> Tech News</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-6" v-for="item in blogItemss.slice(0,3)" :key="item.id">
                    <div class="blog-wrapper position-relative mb-30">
                        <div class="blog-thumb ">
                            <NuxtLink :to="`/blog-details/${item.id}`"><img :src="item.blogImage" alt="blog-img"></NuxtLink>
                        </div>
                        <NuxtLink class="blog-tag" to="/blog"><i class="fal fa-folder-open"></i>{{ item.blogTag }}</NuxtLink>
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
                                <NuxtLink :to="`/blog-details/${item.id}`"><h3>{{ item.blogTitle }}</h3></NuxtLink>
                                <NuxtLink class="blog-btn" :to="`/blog-details/${item.id}`">{{ item.blogBtn }}</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import blogItemsMixin from "../../mixins/blogItemsMixin";

export default {
    name: 'blog',
    mixins:[blogItemsMixin],
}
</script>