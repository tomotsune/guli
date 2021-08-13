<template>
  <el-card class="admin-header">
    <router-link to="/index">
      <img src="../../assets/img/logo.png" alt="" width="200" style="float: left;margin-top: -15px;">
    </router-link>
<!--    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">白  卷</span>-->
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script setup>


</script>

<style scoped>
.admin-header {
  height: 80px;
  opacity: 0.85;
  line-height: 40px;
  min-width: 900px;
}
.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
</style>