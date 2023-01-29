<template>
    <div class="skill-area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="skill-background-img skill-wrapper" :style="{ backgroundImage: `url(/img/bg/skill.jpg)`}">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-12">
                                <div class="skill-content">
                                    <span>Keep Your Skills</span>
                                    <h3>Transform Your life <br>
                                        Through Exclusive Education</h3>
                                    <NuxtLink to="/course" class="edu-four-btn">Browse all courses</NuxtLink>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12">
                                <div class="skill-thumb position-relative">
                                    <img src="/img/bg/skill-laptop.png" alt="image not found">
                                    <div class="course-price-start">
                                        Only <span class="course-price">$5</span>
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