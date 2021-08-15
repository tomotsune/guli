<template>
  <div style="margin-top: 40px">
    <div class="articles-area">
      <el-card style="text-align: left">
        <div v-for="article in articleRes.articleList" :key="article.id">
          <div style="float:left;width:85%;height: 150px;">
            <router-link class="article-link" :to="`/jotter/${article.id}`">
              <span style="font-size: 20px">
                <strong>{{article.title}}</strong>
              </span>
            </router-link>
            <el-divider content-position="left">{{article.gmtCreate}}</el-divider>
            <router-link class="article-link" :to="`/jotter/${article.id}`">
              <p>{{article.summary}}</p>
            </router-link>
          </div>
          <el-image
              style="margin:18px 0 0 30px;width:100px;height: 100px"
              :src="article.cover"
              fit="cover"></el-image>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
    <el-pagination
        v-model:current-page="currentPage"
        onUpdate:currentPage
        :page-size="pageSize"
        :total="articleRes.total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup>
import {listArticle} from '../../hooks/useArticle.ts'
import {ref} from '@vue/reactivity'
const currentPage =ref(1)
const pageSize = ref(4)
const articleRes = listArticle(currentPage.value,pageSize.value,{})

</script>

<style scoped>
.articles-area {
  width: 990px;
  height: 750px;
  margin-left: auto;
  margin-right: auto;
}
.article-link {
  text-decoration: none;
  color: #606266;
}
.article-link:hover {
  color: #409EFF;
}
</style>