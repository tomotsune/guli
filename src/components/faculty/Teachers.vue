<template id="aCoursesList" class="bg-fa of">
  <section class="c-sort-box unBr">
    <!-- 无数据提示-->
    <section class="no-data-wrap" v-if="teacherRes.teacherList.length===0">
      <em class="icon30 no-data-ico">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
    </section>
    <!-- 课程列表-->
    <article class="i-teacher-list" v-if="teacherRes.teacherList.length>0">
      <ul class="of">
        <li v-for="teacher in teacherRes.teacherList" :key="teacher.id">
          <section class="i-teach-wrap">
            <div class="i-teach-pic">
              <router-link :to="`/faculty/${teacher.id}`" :title="teacher.name">
                <img :src="teacher.avatar" :alt="teacher.name" width="142" height="142">
              </router-link>
            </div>
            <div class="mt10 hLh30 txtOf tac">
              <router-link :to="`/faculty/${teacher.id}`" :title="teacher.name" class="fsize18 c-666">{{
                  teacher.name
                }}
              </router-link>
            </div>
            <div class="hLh30 txtOf tac">
              <span class="fsize14 c-999">{{ teacher.career }}</span>
            </div>
            <div class="mt15 i-q-txt">
              <p class="c-999 f-fA">{{ teacher.intro }}</p>
            </div>
          </section>
        </li>
      </ul>
      <div class="clear"></div>
    </article>
    <!-- 公共分页-->
    <div class="paging">
      <el-pagination
          v-model:current-page="currentPage"
          onUpdate:currentPage
          :page-size="pageSize"
          :total="teacherRes.total"
          style="padding: 30px 0; text-align: center;"
          layout="total, prev, pager, next, jumper"
      />
    </div>
  </section>
</template>

<script setup>
import {listTeacher, listTeacherAsync} from 'hooks/useTeacher.ts'
import {ref, watch} from 'vue'
import http from '../../http'
import {ElMessage} from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(8)
const teacherRes = listTeacher(currentPage.value, pageSize.value, {})// 查第一页, 每页显示8条

watch(currentPage, async () => {
  const newData = await listTeacherAsync(currentPage.value, pageSize.value, {})
  teacherRes.teacherList = newData.teacherList
})
</script>

<style scoped>

</style>