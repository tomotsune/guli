<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="teacherRes.teacherList.length===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="teacherRes.teacherList.length>0">
            <ul class="of">
              <li v-for="teacher in teacherRes.teacherList" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.teacherId" :title="teacher.name">
                      <img :src="teacher.avatar" :alt="teacher.name" width="142" height="142">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.teacherId" :title="teacher.name" class="fsize18 c-666">{{
                        teacher.name
                      }}</a>
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
        </div>
        <!--        分页-->
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
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>

</template>
<script lang="ts" setup>
import listTeacher from '../../hooks/useTeacher.ts'
import {ref, watch} from 'vue'
import http from '../../http'
import {ElMessage} from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(4)
const teacherRes = listTeacher(1, pageSize.value, {})// 查第一页, 每页显示8条

watch(currentPage, async () => {
  const res = await http.post(`/eduservice/teacher/list/${currentPage.value}/${pageSize.value}`, {})
  if (res.data.code === 20000) {
    teacherRes.teacherList = res.data.data.rows
  } else {
    ElMessage.error(res.data.msg)
  }
})
</script>