<template>
  <div class="articles-area">
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
      <div>
        <span style="font-size: 20px"><strong>{{article.title}}</strong></span>
        <br>
        <el-avatar size="medium" :src="article.memberAvatar" style="margin: 0 auto;"/>
        <span style="font-size: 18px;color: #909399;margin-left: 5px;">{{article.memberNickname}}</span>
        <el-divider content-position="left">{{article.gmtCreate}}</el-divider>
        <div class="markdown-body">
<!--          <div v-html="article.articleContentHtml"></div>-->
          <v-md-preview :text="article.content"></v-md-preview>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {getArticle} from '../../hooks/useArticle.ts'
import {useRoute} from 'vue-router'
const route = useRoute()
const article = getArticle(route.params.id)
</script>
