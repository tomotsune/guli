<template id="aCoursesList">
  <section class="container">
    <header class="comm-title">
      <h2 class="tac">
        <span class="c-333">热门课程</span>
      </h2>
    </header>
    <article class="comm-course-list">
      <ul class="of" id="bna">
        <li v-for="course in courseRes.courseList" :key="course.id">
          <div class="cc-l-wrap">
            <section class="course-img">
              <img
                  :src="course.cover"
                  class="img-responsive"
                  :alt="course.title"
              >
              <div class="cc-mask">
                <router-link :to="`/curriculum/${course.id}`" title="开始学习" class="comm-btn c-btn-1">开始学习</router-link>
              </div>
            </section>
            <h3 class="hLh30 txtOf mt10">
              <router-link :to="`/curriculum/${course.id}`" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</router-link>
            </h3>
            <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="course.price === 0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
              <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.buyCount }}人学习</i>
                        |
                        <i class="c-999 f-fA">9634评论</i>
                      </span>
            </section>
          </div>
        </li>
      </ul>
      <div class="clear"></div>
    </article>
    <section class="tac pt20">
      <router-link to="/curriculum" title="全部课程" class="comm-btn c-btn-2">全部课程</router-link>
    </section>
  </section>
</template>

<script setup>

import {listCourse} from '../../hooks/useCourse.ts'

const courseRes = listCourse(1, 4, {})

</script>
