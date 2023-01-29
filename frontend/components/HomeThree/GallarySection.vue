<template>
    <div class="gallery-area">
        <div class="swiper-containers">
            <div class="swiper-wrappers gallery-inner">
                <div class="swiper-slides gallery-single w-img" v-for="item in gallarys" :key="item.id">
                    <img :src="item.gallaryImage" alt="image not found">
                    <div class="gallery-link">
                        <a href="#" class="gallery-insta"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'gallary',
    data() {
        return {
            gallarys: [{
                    id: 1,
                    gallaryImage: '/img/gallery/gallary_img-1.jpg',
                },
                {
                    id: 2,
                    gallaryImage: '/img/gallery/gallary_img-2.jpg',
                },
                {
                    id: 3,
                    gallaryImage: '/img/gallery/gallary_img-3.jpg',
                },
                {
                    id: 4,
                    gallaryImage: '/img/gallery/gallary_img-4.jpg',
                },
                {
                    id: 5,
                    gallaryImage: '/img/gallery/gallary_img-5.jpg',
                }
            ],
        }
    }
}
</script>