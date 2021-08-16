<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-link href="#/admin/content/editor" :underline="false" target="_blank" class="add-link">
      <el-button type="success">写文章</el-button>
    </el-link>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
          :data="articleRes.articleList"
          stripe
          style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="摘要:">
                <span>{{ props.row.summary }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="题目（展开查看摘要）" fit></el-table-column>
        <el-table-column prop="gmtCreate" label="发布日期" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button
                @click.native.prevent="$router.push(`/jotter/${scope.row.id}`)"
                type="text"
                size="small">
              查看
            </el-button>
            <el-button
                @click.native.prevent="$router.push({path:`/admin/content/editor`,query:{id:scope.row.id}})"
                type="text"
                size="small">
              编辑
            </el-button>
            <el-button
                @click.native.prevent="deleteArticle(scope.row.id)"
                type="text"
                size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="currentPage"
          onUpdate:currentPage
          :page-size="pageSize"
          :total="articleRes.total"
          style="padding: 30px 0; text-align: center;"
          layout="total, prev, pager, next, jumper"
      />
    </el-card>
  </div>
</template>

<script setup>
import {listArticle, listArticleAsync, removeArticle} from 'hooks/useArticle.ts'
import {ref} from '@vue/reactivity'
import {computed, watch} from 'vue'

const pageSize = ref(4)
const currentPage = ref(1)
const articleRes = listArticle(currentPage.value, pageSize.value, {})

const updateArticleList = async () => {
  const res = await listArticleAsync(currentPage.value, pageSize.value, {})
  articleRes.articleList = res.articleList
  articleRes.total = res.total
}
const deleteArticle = async (articleId) => {
  await removeArticle(articleId)
  await updateArticleList()
}
watch(currentPage, async () => {
  await updateArticleList()
})

</script>

<style scoped>
.add-link {
  margin: 18px 0 15px 10px;
  float: left;
}
</style>