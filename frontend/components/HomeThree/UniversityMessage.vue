<template>
    <div class="university-message-area pt-110 pb-105">
        <div class="container">
            <div class="row">
                <div class="col-xl-4 col-lg-4">
                    <div class="section-title mb-30">
                        <h2>Welcome to <span class="down-mark-line-2">Eduman</span> University Education Online Platform
                        </h2>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4">
                    <div class="message-profile-text">
                        <span>Eduman helps you to develop essential education and your career of years
                            experiences.</span>
                        <p>Transform your life through education to make the most of each semester to choose the
                            best major. Prepare for grad school. Whatever it is, you can do it here. Explore our
                            digital viewbook. Your journey starts here.</p>
                    </div>
                    <div class="message-meta">
                        <NuxtLink to="/instructor-profile"><img src="/img/bg/message-meta.png" alt="meta-img">
                        </NuxtLink>
                        <div class="message-meta-link">
                            <NuxtLink to="/instructor-profile">
                                <h4>Daniel Abraham</h4>
                            </NuxtLink>
                            <p>Vice Chancellor, Eduman</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4">
                    <div class="message-sticker position-relative">
                        <img src="/img/bg/message-sticker.png" alt="img">
                        <div class="etablist-price">
                            <p> Established <span>1990</span> USA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'university-message',
}
</script>