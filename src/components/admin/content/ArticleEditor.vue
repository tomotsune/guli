<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard'}">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/content/book'}">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/content/article'}">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-input
          v-model="article.title"
          style="margin: 10px 0px;font-size: 18px;"
          placeholder="请输入标题"></el-input>
    </el-row>
    <el-row style="height: calc(100vh - 140px);">
      <v-md-editor
          v-model="article.content"
          style="height: 100%;"
          @save="dialogVisible = true"
          fontSize="16px">
        <!--        <button type="button" class="op-icon el-icon-document" :title="'摘要/封面'" slot="left-toolbar-after"
                        @click="dialogVisible = true"></button>-->
      </v-md-editor>
      <el-dialog
          v-model="dialogVisible"
          width="30%">
        <el-divider content-position="left">摘要</el-divider>
        <el-input
            type="textarea"
            v-model="article.articleAbstract"
            rows="6"
            maxlength="255"
            show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="article.cover" autocomplete="off" placeholder="图片 URL"></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-row>
  </div>
</template>

<script setup>
import {getArticle, saveArticle} from '../../../hooks/useArticle.ts'
import {useRoute} from 'vue-router'
import {ref} from '@vue/reactivity'
import {ElMessageBox} from 'element-plus'

const route = useRoute()
const article = getArticle(route.params.id)
const dialogVisible = ref(false)
const save = async () => {
  dialogVisible.value = false
  await saveArticle(article)
}
</script>