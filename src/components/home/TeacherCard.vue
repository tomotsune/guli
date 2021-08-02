<template>
  <section class="container">
    <header class="comm-title">
      <h2 class="tac">
        <span class="c-333">名师大咖</span>
      </h2>
    </header>
    <article class="i-teacher-list">
      <ul class="of">
        <li v-for="teacher in teacherList" :key="teacher.id">
          <section class="i-teach-wrap">
            <!--            头像-->
            <div class="i-teach-pic">
              <a href="/teacher/1" :title="teacher.name">
                <img :alt="teacher.name" :src="teacher.avatar">
              </a>
            </div>
            <!--            名字-->
            <div class="mt10 hLh30 txtOf tac">
              <a href="/teacher/1" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
            </div>
            <!--            资质-->
            <div class="hLh30 txtOf tac">
              <span class="fsize14 c-999">{{ teacher.career }}</span>
            </div>
            <!--            简介-->
            <div class="mt15 i-q-txt">
              <p class="c-999 f-fA">{{ teacher.intro }}</p>
            </div>
          </section>
        </li>
      </ul>
      <div class="clear"></div>
    </article>
    <section class="tac pt20">
      <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
    </section>
  </section>
</template>

<script setup>
import useTeacher from './hooks/useTeacher.ts'

const teacherList = useTeacher(4)
</script>

<style scoped>
</style>