<template>
  <el-menu
      default-active="1"
      style="width: 170px">
    <a href="#header-div">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <template #title>
          技术采用
        </template>
      </el-menu-item>
    </a>
    <a href="#update-card">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>
          最近更新
        </template>
      </el-menu-item>
    </a>
    <a href="#slogan">
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <template #title>
          下载源码
        </template>
      </el-menu-item>
    </a>
    <a href="#about">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>
          关于我们
        </template>
      </el-menu-item>
    </a>
  </el-menu>
</template>

<script setup>
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>