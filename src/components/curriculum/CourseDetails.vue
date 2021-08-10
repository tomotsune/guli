<template>
  <section class="container">
    <!--面包屑-->
    <section class="path-wrap txtOf hLh30">
      <a href="#" class="c-999 fsize14">首页</a>
      \
      <a href="#" class="c-999 fsize14">{{ course.subjectLevelOne }}</a>
      \
      <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
    </section>
    <!--图片区-->
    <article class="c-v-pic-wrap" style="height: 357px;">
      <section class="p-h-video-box" id="videoPlay">
        <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
      </section>
    </article>
    <!--右上数据展示区-->
    <aside class="c-attr-wrap">
      <section class="ml20 mr15">
        <h2 class="hLh30 txtOf mt15">
          <span class="c-fff fsize24">{{ course.title }}</span>
        </h2>
        <section class="c-attr-jg">
          <span class="c-fff">价格：</span>
          <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
        </section>
        <section class="c-attr-mt c-attr-undis">
          <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
        </section>
        <section class="c-attr-mt of">
                      <span class="ml10 vam">
                          <em class="icon18 scIcon"></em>
                          <a class="c-fff vam" title="收藏" href="#">收藏</a>
                      </span>
        </section>
        <section class="c-attr-mt">
          <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
        </section>
      </section>
    </aside>
    <!--上层中部数据展示区-->
    <aside class="thr-attr-box">
      <ol class="thr-attr-ol clearfix">
        <li>
          <p>&nbsp;</p>
          <aside>
            <span class="c-fff f-fM">购买数</span>
            <br>
            <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
          </aside>
        </li>
        <li>
          <p>&nbsp;</p>
          <aside>
            <span class="c-fff f-fM">课时数</span>
            <br>
            <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
          </aside>
        </li>
        <li>
          <p>&nbsp;</p>
          <aside>
            <span class="c-fff f-fM">浏览数</span>
            <br>
            <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
          </aside>
        </li>
      </ol>
    </aside>
    <div class="clear"></div>
    <!--下层展示区 -->
    <div class="mt20 c-infor-box">
      <!--左下展示区-->
      <article class="fl col-7">
        <section class="mr30">
          <div class="i-box">
            <!--详情标题 -->
            <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
              <a name="c-i" class="current" title="课程详情">课程详情</a>
            </section>
            <!--左下展示区-->
            <article class="ml10 mr10 pt20">
              <!--课程介绍-->
              <div>
                <h6 class="c-i-content c-infor-title">
                  <span>课程介绍</span>
                </h6>
                <div class="course-txt-body-wrap">
                  <section class="course-txt-body">
                    <p v-html="course.description"></p>
                  </section>
                </div>
              </div>
              <!--课程大纲-->
              <div class="mt50">
                <h6 class="c-g-content c-infor-title">
                  <span>课程大纲</span>
                </h6>
                <el-tree
                    :data="outline"
                    :props="{children: 'collection',label: 'title'}"
                    :node-key="outline.id"
                    accordion
                    @node-click="videoPlay">
                  <template #default="{ node, data }">
                    <span class="custom-tree-node">
                      <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>
                      <span>{{ node.label }}</span>
                      <span class="fr" v-show="node.level===2&&data.isFree===true">
                        <i class="free-icon vam mr10">免费试听</i>
                      </span>
                    </span>
                  </template>
                </el-tree>
              </div>
            </article>
          </div>
        </section>
      </article>
      <!--右下讲师信息区-->
      <aside class="fl col-3">
        <div class="i-box">
          <section class="c-infor-tabTitle c-tab-title">
            <a title href="javascript:void(0)">主讲讲师</a>
          </section>
          <section class="stud-act-list">
            <ul style="height: auto;">
              <li>
                <div class="u-face">
                  <a :href="'/teacher/'+course.teacherId" target="_blank">
                    <img :src="course.teacherAvatar" width="50" height="50" alt>
                  </a>
                </div>
                <section class="hLh30 txtOf">
                  <router-link class="c-333 fsize16 fl" :to="`/faculty/${course.teacherId}`" target="_blank">
                    {{ course.teacherName }}
                  </router-link>
                </section>
                <section class="hLh20 txtOf">
                  <span class="c-999">{{ course.teacherIntro }}</span>
                </section>
              </li>
            </ul>
          </section>
        </div>
      </aside>
      <div class="clear"></div>
      <div class="mt50 commentHtml">
        <div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" src="https://files.catbox.moe/tdottg.png">
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字"
                                id="commentContent"></textarea>
                    </fieldset>
                    <p class="of mt5 tar pl10 pr10">
                  <span class="fl ">
                    <tt class="c-red commentContentmeg" style="display: none;"></tt>
                  </span>
                      <input type="button" @click="saveComment(comment)" value="回复" class="lh-reply-btn">
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment,index) in commentRes.commentList" :key="comment.id">
                  <aside class="noter-pic">
                    <img width="50" height="50" class="picImg"
                         :src="comment.memberAvatar">
                  </aside>
                  <div class="of">
                <span class="fl">
                  <span class="fsize12 c-blue">{{ comment.memberNickname }}</span>
                  <span class="fsize12 c-999 ml5">评论：</span></span>
                  </div>
                  <div class="noter-txt mt5">
                    <p>{{ comment.content }}</p>
                  </div>
                  <div class="of mt5">
                <span class="fr"><font class="fsize12 c-999ml5">{{ comment.gmtCreate }}</font>
                </span>
                  </div>
                </li>
              </ul>
            </section>
          </section>
          <div class="paging">
            <el-pagination
                v-model:current-page="currentPage"
                onUpdate:currentPage
                :page-size="pageSize"
                :total="commentRes.total"
                style="padding: 30px 0; text-align: center;"
                layout="total, prev, pager, next, jumper"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <el-dialog
      v-model="dialogVisible"
      width="70%"
      destroy-on-close>
    <ali-player-v3 ref="AliplayerV3" :options="options"/>
  </el-dialog>
</template>

<script setup>
import {getCourse} from '../../hooks/useCourse.ts'
import {useRoute} from 'vue-router'
import {listOutline} from '../../hooks/useChapter.ts'
import {auth} from '../../hooks/useVideo.ts'
import {reactive, ref} from '@vue/reactivity'
import {AliPlayerV3} from 'vue-aliplayer-v3'
import {listComment, listCommentAsync, saveComment} from '../../hooks/useComment.ts'
import {watch} from 'vue'

const route = useRoute()
const course = getCourse(route.params.id)
const outline = listOutline(route.params.id)
const dialogVisible = ref(false)
const options = reactive({})
const currentPage = ref(1)
const pageSize = ref(3)
const commentRes = listComment(currentPage.value, pageSize.value, {courseId: route.params.id})
const comment = reactive({courseId: route.params.id})
const videoPlay = async (video, node) => {
  if (node.level === 1) return
  options.playauth = await auth(video.videoSourceId)
  console.log(options.playauth)
  options.encryptType = '1'
  options.width = '100%'
  options.height = '500px'
  options.vid = video.videoSourceId
  dialogVisible.value = true
}
watch(currentPage, async () => {
  const newData = await listCommentAsync(currentPage.value, pageSize.value, {courseId: route.params.id})
  commentRes.commentList = newData.commentList
  commentRes.total = newData.total
})
</script>