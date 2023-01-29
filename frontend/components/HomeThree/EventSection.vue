<template>
    <div class="event-area pt-110 pb-90">
        <div class="event-shape-wrapper position-relative">
            <div class="event-shape">
                <img src="/img/shape/feedback-img.png" alt="image not found">
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-12">
                    <div class="pb-15">
                        <div class="section-title mb-45">
                            <h2>Current <span class="down-mark-line-2">Events</span></h2>
                        </div>
                        <div class="current-event-box mb-15" v-for="item in eventlItem" :key="item.id">
                            <div class="current-event-date d-flex position-relative">
                                <div class="event-date-wrapper">
                                    <span class="event-date">{{ item.eventDate }}</span>
                                    <span class="event-month">{{ item.eventMonth }}</span>
                                </div>
                                <div class="event-tour">
                                    <div class="event-box-text">
                                        <h3>
                                            <NuxtLink to="/event-details">{{ item.eventName }}</NuxtLink>
                                        </h3>
                                        <span><i class="fal fa-clock"></i>{{ item.eventTime }}</span>
                                        <span><i class="flaticon-place"></i>{{ item.eventLocation }}</span>
                                    </div>
                                    <NuxtLink to="/event-details" class="event-arrow"><i class="fal fa-arrow-right"></i>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-12">
                    <div class="feedback-wrapper">
                        <div class="section-title mb-45">
                            <h2>Student's Feedback</h2>
                        </div>
                        <div class="swiper-container feedback-active">
                            <div class="swiper-wrapper">
                                <client-only>
                                    <swiper :modules="modules" :slides-per-view="1" :loop="true" :space-between="30"
                                        :autoplay="{ delay: 3500, disableOnInteraction: false }">
                                        <swiper-slide v-for="item in testimonialItem" :key="item.id">
                                            <div class="feedback-content mb-30">
                                                <div class="feedback-items position-relative">
                                                    <div class="feedback-header">
                                                        <div class="feedback-img">
                                                            <img :src="item.testimonialImage" alt="image not found">
                                                        </div>
                                                        <div class="feedback-title">
                                                            <h4>{{ item.feedbackAuthor }}</h4>
                                                            <span>{{ item.feedbackType }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="feedback-icon">
                                                        <i class="flaticon-quotes"></i>
                                                    </div>
                                                    <div class="feedback-body">
                                                        <h3>{{ item.feedbackQuote }}</h3>
                                                        <p>{{ item.feedback }}</p>
                                                    </div>
                                                    <div class="testimonial-icon">
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </swiper-slide>
                                    </swiper>
                                </client-only>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Autoplay } from 'swiper'
import 'swiper/css'

export default {
    name: 'testimonial',
    data() {
        return {
            eventlItem: [{
                id: '4',
                eventDate: '29',
                eventMonth: 'Jan 23',
                eventName: 'Education Autumn Tour',
                eventTime: '12:30 AM',
                eventLocation: 'Zeoyan Stadium, London',
            },
            {
                id: '5',
                eventDate: '20',
                eventMonth: 'May 23',
                eventName: 'Education Summer Tour',
                eventTime: '10:30 AM',
                eventLocation: 'Zeoyan Stadium, London',
            },
            {
                id: '6',
                eventDate: '25',
                eventMonth: 'Jul 23',
                eventName: 'Education Spring Tour',
                eventTime: '09:30 AM',
                eventLocation: 'Zeoyan Stadium, London',
            }],
            testimonialItem: [{
                id: '1',
                testimonialImage: '/img/testimonial/Image.png',
                feedbackAuthor: 'David Johnson',
                feedbackType: 'Student',
                feedbackQuote: 'Great Course !',
                feedback: 'Thanks to our marketplace model, our content keeps pace with market changes. You’ll find courses on the latest technologies and business practice and more!',
            },
            {
                id: '2',
                testimonialImage: '/img/testimonial/testimonial-02.png',
                feedbackAuthor: 'Brandon Tylor',
                feedbackType: 'Student',
                feedbackQuote: 'Best Experience !',
                feedback: 'In every software-as-a-service solution, user billing and payments are key aspects in the sale of services rendered. Let’s learn about Stripe the metal mates.',
            },
            {
                id: '3',
                testimonialImage: '/img/testimonial/testimonial.png',
                feedbackAuthor: 'Richard Joseph',
                feedbackType: 'Student',
                feedbackQuote: 'Helpful Instructors !',
                feedback: 'There are so many websites out there that have not considered the overall usability of their visually impaired users. When it comes to designing better links.',
            }
            ],
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        return {
            modules: [Autoplay],
        }
    }
}
</script>