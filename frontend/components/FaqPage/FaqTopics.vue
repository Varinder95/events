<template>
    <div class="edu-topic-area pb-90">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="faq-topic-title text-center mb-45">
                        <h3>FAQ Help Topic</h3>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6" v-for="item in topicList" :key="item.id">
                    <div class="topic-wrapper text-center mb-30">
                        <div class="topic-items">
                            <div class="topic-svg">
                                <img :src="item.topicImage" alt="img not found">
                            </div>
                            <div class="topic-content">
                                <h4>
                                    <NuxtLink to="/faq-page">{{ item.topicTitle }}</NuxtLink>
                                </h4>
                                <p>{{ item.topicDesc }}</p>
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
    name: 'topics',
    data() {
        return {
            topicList: [{
                id: 1,
                topicImage: '/img/icon/topic-1.png',
                topicTitle: 'Mobile & Tab',
                topicDesc: 'Control and browse courses on mobile and tab device',
            },
            {
                id: 2,
                topicImage: '/img/icon/topic-2.png',
                topicTitle: 'Account / Profile',
                topicDesc: 'Manage your account and profile easily smoothly',
            },
            {
                id: 3,
                topicImage: '/img/icon/topic-3.png',
                topicTitle: 'Troubleshooting',
                topicDesc: 'If you experiencing the technical browsing issue',
            },
            {
                id: 4,
                topicImage: '/img/icon/topic-4.png',
                topicTitle: 'Getting Started',
                topicDesc: 'Learn how Eduman works and how to start learning.',
            },
            {
                id: 5,
                topicImage: '/img/icon/topic-5.png',
                topicTitle: 'Course Tracking',
                topicDesc: 'Track your course and manage easily at anywhere',
            },
            {
                id: 6,
                topicImage: '/img/icon/topic-6.png',
                topicTitle: 'Purchase Course',
                topicDesc: 'You will be knowing our purchase policy for course',
            },
            {
                id: 7,
                topicImage: '/img/icon/topic-7.png',
                topicTitle: 'Refund Method',
                topicDesc: 'Manage your course refund policy easily smoothly',
            },
            {
                id: 8,
                topicImage: '/img/icon/topic-8.png',
                topicTitle: 'Admission',
                topicDesc: 'Read how to get admission to your favorite course',
            }
            ]
        }
    }
}
</script>