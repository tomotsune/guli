<template>
  {{ userInfo }}
  <el-button @click="$store.commit('logout')">退出登录</el-button>
</template>

<script setup>
import useInfo from './hooks/useInfo.ts'
const userInfo = useInfo()

</script>

<style scoped>
</style>