<template class="c-sort-box">
  <section class="c-s-dl">
    <dl>
      <dt>
        <span class="c-999 fsize14">课程类别</span>
      </dt>
      <dd class="c-s-dl-li">
        <ul class="clearfix">
          <li>
            <a title="全部" href="#" @click.prevent="clean">全部</a>
          </li>
          <li v-for="(subject,idx) in subjectTree" :key="subject.id">
            <a :title="subject.title" href="#" @click.prevent="search(subject.id,idx)">{{ subject.title }}</a>
          </li>
        </ul>
      </dd>
    </dl>
    <dl>
      <dt>
        <span class="c-999 fsize14"></span>
      </dt>
      <dd class="c-s-dl-li">
        <ul class="clearfix">
          <li v-for="subject in subjectList" :key="subject.id">
            <a :title="subject.title" href="#" @click.prevent="search(subject.id)">{{ subject.title }}</a>
          </li>
        </ul>
      </dd>
    </dl>
    <div class="clear"></div>
  </section>
  <div class="js-wrap">
    <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
    </section>
    <section class="fl">
      <ol class="js-tap clearfix">
        <li :class="{'current bg-orange':sort===1}">
          <a title="关注度" href="#" @click.prevent="sort=1">关注度</a>
        </li>
        <li :class="{'current bg-orange':sort===2}">
          <a title="关注度" href="#" @click.prevent="sort=2">购买量</a>
        </li>
        <li :class="{'current bg-orange':sort===3}">
          <a title="最新" href="#" @click.prevent="sort=3">最新</a>
        </li>
        <li :class="{'current bg-orange':sort===4}">
          <a title="价格" href="#" @click.prevent="sort=4">价格&nbsp;
            <span>↓</span>
          </a>
        </li>
      </ol>
    </section>
  </div>
  <!--  课程展示区-->
  <div class="mt40">
    <!-- /无数据提示 开始-->
    <section class="no-data-wrap" v-if="courseRes.courseList.length===0">
      <em class="icon30 no-data-ico">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
    </section>
    <!-- 课程列表-->
    <article class="comm-course-list" v-if="courseRes.courseList.length>0">
      <ul class="of" id="bna">
        <li v-for="course in courseRes.courseList" :key="course.id">
          <div class="cc-l-wrap">
            <!--图片-->
            <section class="course-img">
              <img :src="course.cover" class="img-responsive" alt="听力口语">
              <!--鼠标悬浮提示-->
              <div class="cc-mask">
                <router-link :to="`/curriculum/${course.id}`" title="开始学习" class="comm-btn c-btn-1">开始学习</router-link>
              </div>
            </section>
            <!--课题展示-->
            <h3 class="hLh30 txtOf mt10">
              <router-link :to="`/curriculum/${course.id}`" :title="course.name" class="course-title fsize18 c-333">
                {{ course.title }}
              </router-link>
            </h3>
            <!--相关信息-->
            <section class="mt10 hLh20 of">
              <span v-if="course.price === 0 ? '免费' : '' " class="fr jgTag bg-green">
                <i class="c-fff fsize12 f-fA">免费</i>
              </span>
              <span class="fl jgAttr c-ccc f-fA">
                <i class="c-999 f-fA">{{ course.viewCount }}人学习</i>
                |
                <i class="c-999 f-fA">9634评论</i>
              </span>
            </section>
          </div>
        </li>
      </ul>
      <div class="clear"></div>
    </article>
  </div>
  <!-- 公共分页-->
  <div class="paging">
    <el-pagination
        v-model:current-page="currentPage"
        onUpdate:currentPage
        :page-size="pageSize"
        :total="courseRes.total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
    />
  </div>
</template>
<script setup>
import listSubject from '../../hooks/useSubject.ts'
import {listCourse, listCourseAsync} from '../../hooks/useCourse.ts'
import {reactive} from '@vue/reactivity'
import {ref, watch} from 'vue'
import http from '../../http'
import {ElMessage} from 'element-plus'

const courseQuery = reactive({})
const currentPage = ref(1)
const pageSize = ref(8)
const subjectTree = listSubject()
const courseRes = listCourse(currentPage.value, pageSize.value, courseQuery)
const subjectList = reactive([])
const sort = ref(1)
const search = (subjectId, idx) => {
  courseQuery.subjectId = subjectId
  if (idx !== undefined)
    subjectList.splice(0, subjectList.length, ...subjectTree[idx].collection)
  updateCourseList()
}
const clean = () => {
  courseQuery.subjectId = ''
  subjectList.splice(0, subjectList.length)
  updateCourseList()
}

watch(currentPage, async () => {
  await updateCourseList()
})
watch(sort, async (to, from) => {
  courseQuery.viewCountSort = ''
  courseQuery.buyCountSort = ''
  courseQuery.gmtCreateSort = ''
  courseQuery.priceSort = ''
  if (to === 2)
    courseQuery.buyCountSort = 'selected'
  else if (to === 3)
    courseQuery.gmtCreateSort = 'selected'
  else if (to === 4)
    courseQuery.priceSort = 'selected'
  updateCourseList()
})

const updateCourseList = async () => {
  const newData = await listCourseAsync(currentPage.value, pageSize.value, courseQuery)
  courseRes.courseList = newData.courseList
  courseRes.total = newData.total
  // courseRes = {...newData} //丢失响应性
}
</script>