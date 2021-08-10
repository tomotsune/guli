<template id="aCoursesList" class="bg-fa of">
  <!--讲师介绍-->
  <div class="t-infor-wrap">
    <!-- 讲师基本信息 -->
    <section class="fl t-infor-box c-desc-content">
      <div class="mt20 ml20">
        <section class="t-infor-pic">
          <img :src="teacher.avatar" :alt="teacher.name">
        </section>
        <h3 class="hLh30">
                    <span class="fsize24 c-333">{{ teacher.name }}
                        &nbsp;
                        {{ teacher.level === 1 ? '高级讲师' : '首席讲师' }}
                    </span>
        </h3>
        <section class="mt10">
          <span class="t-tag-bg">{{ teacher.intro }}</span>
        </section>
        <section class="t-infor-txt">
          <p class="mt20">{{ teacher.career }}</p>
        </section>
        <div class="clear"></div>
      </div>
    </section>
    <div class="clear"></div>
  </div>
  <!--讲师课程-->
  <section class="mt30">
    <!--标题栏-->
    <header class="comm-title all-teacher-title c-course-content">
      <h2 class="fl tac">
        <span class="c-333">主讲课程</span>
      </h2>
      <section class="c-tab-title">
        <a href="javascript: void(0)">&nbsp;</a>
      </section>
    </header>
    <!--无数据提示-->
    <section class="no-data-wrap" v-if="courseRes.courseList.length===0">
      <em class="icon30 no-data-ico">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
    </section>
    <!--课程列表-->
    <article class="comm-course-list" v-if="courseRes.courseList.length>0">
      <ul class="of">
        <li v-for="course in courseRes.courseList" v-bind:key="course.courseId">
          <div class="cc-l-wrap">
            <section class="course-img">
              <img :src="course.cover" class="img-responsive">
              <div class="cc-mask">
                <router-link :to="`/course/${course.id}`" title="开始学习" class="comm-btn c-btn-1">开始学习</router-link>
              </div>
            </section>
            <h3 class="hLh30 txtOf mt10">
              <router-link :to="`/course/${course.id}`"
                           :title="course.name"
                           class="course-title fsize18 c-333">{{ course.name }}
              </router-link>
            </h3>
          </div>
        </li>
      </ul>
      <div class="clear"></div>
    </article>
  </section>
  <!-- /讲师介绍 结束 -->
</template>
<script setup>
import {getTeacher} from '../../hooks/useTeacher.ts'
import {useRoute} from 'vue-router'
import {listCourse} from '../../hooks/useCourse.ts'

const route = useRoute()
const teacher = getTeacher(route.params.id)
const courseRes = listCourse(1, 8, {teacherId: route.params.id})
</script>