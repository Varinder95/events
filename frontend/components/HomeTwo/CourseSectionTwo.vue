<script>
import courseItemsMixin from "../../mixins/courseItemsMixin";

export default {
  name: "app",
  mixins: [courseItemsMixin],
};
</script>

<template>
  <div class="student-course-area pt-110 pb-90">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-lg-5">
          <div class="section-title mb-55">
            <h2>
              Pick Your <br />
              <span class="down-mark-line-2">Professional</span> Course
            </h2>
          </div>
        </div>
        <div class="col-xl-8 col-lg-7">
          <div class="portfolio-button mt-65">
            <nav>
              <div class="nav" id="nav-tab" role="tablist">
                <button
                  class="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  View All <span class="port-red">[06]</span>
                </button>
                <button
                  class="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Data Science <span class="port-red">[01]</span>
                </button>
                <button
                  class="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Development <span class="port-red">[03]</span>
                </button>
                <button
                  class="nav-link"
                  id="nav-contact-tabA"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contactA"
                  type="button"
                  role="tab"
                  aria-controls="nav-contactA"
                  aria-selected="false"
                >
                  Business <span class="port-red">[01]</span>
                </button>
                <button
                  class="nav-link"
                  id="nav-contact-tabB"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contactB"
                  type="button"
                  role="tab"
                  aria-controls="nav-contactB"
                  aria-selected="false"
                >
                  Life Styles <span class="port-red">[01]</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="course-main-items">
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div class="row">
              <div
                class="col-xl-3 col-lg-4 col-md-6"
                v-for="item in courseItemss.slice(0, 8)"
                :key="item.id"
              >
                <div class="course-wrapper-2 mb-30">
                  <div class="student-course-img">
                    <img :src="item.courseImage" alt="courde-img" />
                  </div>
                  <div class="course-cart">
                    <div class="course-info-wrapper">
                      <div class="cart-info-body">
                        <span :class="item.badgeClass">
                          <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                        </span>
                        <NuxtLink :to="`/course-details/${item.id}`">
                          <h3>{{ item.title }}</h3>
                        </NuxtLink>
                        <div class="cart-lavel">
                          <h5>
                            {{ item.level }} <span>{{ item.beginer }}</span>
                          </h5>
                          <p>{{ item.description }}</p>
                        </div>
                        <div class="info-cart-text">
                          <ul>
                            <li
                              v-for="itemTwo in item.infoList"
                              :key="itemTwo.infoListTitle"
                            >
                              <i class="far fa-check"></i
                              >{{ itemTwo.infoListTitle }}
                            </li>
                          </ul>
                        </div>
                        <div class="course-action">
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="view-details-btn"
                            >{{ item.viewBtn }}</NuxtLink
                          >
                          <button class="wishlist-btn">
                            <i :class="item.wishIcon"></i>
                          </button>
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="c-share-btn"
                            ><i :class="item.shareIcon"></i
                          ></NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="student-course-footer">
                    <div class="student-course-linkter">
                      <div class="course-lessons">
                        <i v-html="item.lessonIcon"></i>
                        <span class="ms-2">{{ item.lesson }}</span>
                      </div>
                      <div class="portfolio-price">
                        <span>{{ item.price }}</span>
                        <del>{{ item.priceOld }}</del>
                      </div>
                    </div>
                    <div class="student-course-text">
                      <h3>
                        <NuxtLink :to="`/course-details/${item.id}`">{{
                          item.courseTitle
                        }}</NuxtLink>
                      </h3>
                    </div>
                    <div class="portfolio-user">
                      <div class="user-icon">
                        <NuxtLink to="/instructor"
                          ><i class="fas fa-user"></i
                          >{{ item.instructor }}</NuxtLink
                        >
                      </div>
                      <div class="course-icon">
                        <i :class="item.productRating1"></i>
                        <i :class="item.productRating2"></i>
                        <i :class="item.productRating3"></i>
                        <i :class="item.productRating4"></i>
                        <i :class="item.productRating5"></i>
                        <span>{{ item.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div class="row">
              <div
                class="col-xl-3 col-lg-4 col-md-6"
                v-for="item in courseItemss.slice(0, 4)"
                :key="item.id"
              >
                <div class="course-wrapper-2 mb-30">
                  <div class="student-course-img">
                    <img :src="item.courseImage" alt="courde-img" />
                  </div>
                  <div class="course-cart">
                    <div class="course-info-wrapper">
                      <div class="cart-info-body">
                        <span :class="item.badgeClass">
                          <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                        </span>
                        <NuxtLink :to="`/course-details/${item.id}`">
                          <h3>{{ item.title }}</h3>
                        </NuxtLink>
                        <div class="cart-lavel">
                          <h5>
                            {{ item.level }} <span>{{ item.beginer }}</span>
                          </h5>
                          <p>{{ item.description }}</p>
                        </div>
                        <div class="info-cart-text">
                          <ul>
                            <li
                              v-for="itemTwo in item.infoList"
                              :key="itemTwo.infoListTitle"
                            >
                              <i class="far fa-check"></i
                              >{{ itemTwo.infoListTitle }}
                            </li>
                          </ul>
                        </div>
                        <div class="course-action">
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="view-details-btn"
                            >{{ item.viewBtn }}</NuxtLink
                          >
                          <button class="wishlist-btn">
                            <i :class="item.wishIcon"></i>
                          </button>
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="c-share-btn"
                            ><i :class="item.shareIcon"></i
                          ></NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="student-course-footer">
                    <div class="student-course-linkter">
                      <div class="course-lessons">
                        <i v-html="item.lessonIcon"></i>
                        <span class="ms-2">{{ item.lesson }}</span>
                      </div>
                      <div class="portfolio-price">
                        <span>{{ item.price }}</span>
                        <del>{{ item.priceOld }}</del>
                      </div>
                    </div>
                    <div class="student-course-text">
                      <h3>
                        <NuxtLink :to="`/course-details/${item.id}`">{{
                          item.courseTitle
                        }}</NuxtLink>
                      </h3>
                    </div>
                    <div class="portfolio-user">
                      <div class="user-icon">
                        <NuxtLink to="/instructor"
                          ><i class="fas fa-user"></i
                          >{{ item.instructor }}</NuxtLink
                        >
                      </div>
                      <div class="course-icon">
                        <i :class="item.productRating1"></i>
                        <i :class="item.productRating2"></i>
                        <i :class="item.productRating3"></i>
                        <i :class="item.productRating4"></i>
                        <i :class="item.productRating5"></i>
                        <span>{{ item.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <div class="row">
              <div
                class="col-xl-3 col-lg-4 col-md-6"
                v-for="item in courseItemss.slice(4, 7)"
                :key="item.id"
              >
                <div class="course-wrapper-2 mb-30">
                  <div class="student-course-img">
                    <img :src="item.courseImage" alt="courde-img" />
                  </div>
                  <div class="course-cart">
                    <div class="course-info-wrapper">
                      <div class="cart-info-body">
                        <span :class="item.badgeClass">
                          <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                        </span>
                        <NuxtLink :to="`/course-details/${item.id}`">
                          <h3>{{ item.title }}</h3>
                        </NuxtLink>
                        <div class="cart-lavel">
                          <h5>
                            {{ item.level }} <span>{{ item.beginer }}</span>
                          </h5>
                          <p>{{ item.description }}</p>
                        </div>
                        <div class="info-cart-text">
                          <ul>
                            <li
                              v-for="itemTwo in item.infoList"
                              :key="itemTwo.infoListTitle"
                            >
                              <i class="far fa-check"></i
                              >{{ itemTwo.infoListTitle }}
                            </li>
                          </ul>
                        </div>
                        <div class="course-action">
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="view-details-btn"
                            >{{ item.viewBtn }}</NuxtLink
                          >
                          <button class="wishlist-btn">
                            <i :class="item.wishIcon"></i>
                          </button>
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="c-share-btn"
                            ><i :class="item.shareIcon"></i
                          ></NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="student-course-footer">
                    <div class="student-course-linkter">
                      <div class="course-lessons">
                        <i v-html="item.lessonIcon"></i>
                        <span class="ms-2">{{ item.lesson }}</span>
                      </div>
                      <div class="portfolio-price">
                        <span>{{ item.price }}</span>
                        <del>{{ item.priceOld }}</del>
                      </div>
                    </div>
                    <div class="student-course-text">
                      <h3>
                        <NuxtLink :to="`/course-details/${item.id}`">{{
                          item.courseTitle
                        }}</NuxtLink>
                      </h3>
                    </div>
                    <div class="portfolio-user">
                      <div class="user-icon">
                        <NuxtLink to="/instructor"
                          ><i class="fas fa-user"></i
                          >{{ item.instructor }}</NuxtLink
                        >
                      </div>
                      <div class="course-icon">
                        <i :class="item.productRating1"></i>
                        <i :class="item.productRating2"></i>
                        <i :class="item.productRating3"></i>
                        <i :class="item.productRating4"></i>
                        <i :class="item.productRating5"></i>
                        <span>{{ item.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contactA"
            role="tabpanel"
            aria-labelledby="nav-contact-tabA"
          >
            <div class="row">
              <div
                class="col-xl-3 col-lg-4 col-md-6"
                v-for="item in courseItemss.slice(5, 8)"
                :key="item.id"
              >
                <div class="course-wrapper-2 mb-30">
                  <div class="student-course-img">
                    <img :src="item.courseImage" alt="courde-img" />
                  </div>
                  <div class="course-cart">
                    <div class="course-info-wrapper">
                      <div class="cart-info-body">
                        <span :class="item.badgeClass">
                          <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                        </span>
                        <NuxtLink :to="`/course-details/${item.id}`">
                          <h3>{{ item.title }}</h3>
                        </NuxtLink>
                        <div class="cart-lavel">
                          <h5>
                            {{ item.level }} <span>{{ item.beginer }}</span>
                          </h5>
                          <p>{{ item.description }}</p>
                        </div>
                        <div class="info-cart-text">
                          <ul>
                            <li
                              v-for="itemTwo in item.infoList"
                              :key="itemTwo.infoListTitle"
                            >
                              <i class="far fa-check"></i
                              >{{ itemTwo.infoListTitle }}
                            </li>
                          </ul>
                        </div>
                        <div class="course-action">
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="view-details-btn"
                            >{{ item.viewBtn }}</NuxtLink
                          >
                          <button class="wishlist-btn">
                            <i :class="item.wishIcon"></i>
                          </button>
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="c-share-btn"
                            ><i :class="item.shareIcon"></i
                          ></NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="student-course-footer">
                    <div class="student-course-linkter">
                      <div class="course-lessons">
                        <i v-html="item.lessonIcon"></i>
                        <span class="ms-2">{{ item.lesson }}</span>
                      </div>
                      <div class="portfolio-price">
                        <span>{{ item.price }}</span>
                        <del>{{ item.priceOld }}</del>
                      </div>
                    </div>
                    <div class="student-course-text">
                      <h3>
                        <NuxtLink :to="`/course-details/${item.id}`">{{
                          item.courseTitle
                        }}</NuxtLink>
                      </h3>
                    </div>
                    <div class="portfolio-user">
                      <div class="user-icon">
                        <NuxtLink to="/instructor"
                          ><i class="fas fa-user"></i
                          >{{ item.instructor }}</NuxtLink
                        >
                      </div>
                      <div class="course-icon">
                        <i :class="item.productRating1"></i>
                        <i :class="item.productRating2"></i>
                        <i :class="item.productRating3"></i>
                        <i :class="item.productRating4"></i>
                        <i :class="item.productRating5"></i>
                        <span>{{ item.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contactB"
            role="tabpanel"
            aria-labelledby="nav-contact-tabB"
          >
            <div class="row">
              <div
                class="col-xl-3 col-lg-4 col-md-6"
                v-for="item in courseItemss.slice(7, 8)"
                :key="item.id"
              >
                <div class="course-wrapper-2 mb-30">
                  <div class="student-course-img">
                    <img :src="item.courseImage" alt="courde-img" />
                  </div>
                  <div class="course-cart">
                    <div class="course-info-wrapper">
                      <div class="cart-info-body">
                        <span :class="item.badgeClass">
                          <NuxtLink to="/course">{{ item.badge }}</NuxtLink>
                        </span>
                        <NuxtLink :to="`/course-details/${item.id}`">
                          <h3>{{ item.title }}</h3>
                        </NuxtLink>
                        <div class="cart-lavel">
                          <h5>
                            {{ item.level }} <span>{{ item.beginer }}</span>
                          </h5>
                          <p>{{ item.description }}</p>
                        </div>
                        <div class="info-cart-text">
                          <ul>
                            <li
                              v-for="itemTwo in item.infoList"
                              :key="itemTwo.infoListTitle"
                            >
                              <i class="far fa-check"></i
                              >{{ itemTwo.infoListTitle }}
                            </li>
                          </ul>
                        </div>
                        <div class="course-action">
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="view-details-btn"
                            >{{ item.viewBtn }}</NuxtLink
                          >
                          <button class="wishlist-btn">
                            <i :class="item.wishIcon"></i>
                          </button>
                          <NuxtLink
                            :to="`/course-details/${item.id}`"
                            class="c-share-btn"
                            ><i :class="item.shareIcon"></i
                          ></NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="student-course-footer">
                    <div class="student-course-linkter">
                      <div class="course-lessons">
                        <i v-html="item.lessonIcon"></i>
                        <span class="ms-2">{{ item.lesson }}</span>
                      </div>
                      <div class="portfolio-price">
                        <span>{{ item.price }}</span>
                        <del>{{ item.priceOld }}</del>
                      </div>
                    </div>
                    <div class="student-course-text">
                      <h3>
                        <NuxtLink :to="`/course-details/${item.id}`">{{
                          item.courseTitle
                        }}</NuxtLink>
                      </h3>
                    </div>
                    <div class="portfolio-user">
                      <div class="user-icon">
                        <NuxtLink to="/instructor"
                          ><i class="fas fa-user"></i
                          >{{ item.instructor }}</NuxtLink
                        >
                      </div>
                      <div class="course-icon">
                        <i :class="item.productRating1"></i>
                        <i :class="item.productRating2"></i>
                        <i :class="item.productRating3"></i>
                        <i :class="item.productRating4"></i>
                        <i :class="item.productRating5"></i>
                        <span>{{ item.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xl-3">
          <div class="portfolio-brn mt-20 text-center">
            <NuxtLink class="edu-sec-btn" to="/course"
              >View all courses</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
