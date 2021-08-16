<!--我们需要把导航栏放在其它页面的父页面中-->
<!-- 作为父页面使用-->
<!--这里和 App.vue 一样，写入了一个 <router-view/>，也就是子页面（组件）显示的地方-->
<template>
  <nav-menu class="nav-menu"></nav-menu>
  <router-view/>
  <about id="about"/>
</template>

<script setup lang="ts">
import NavMenu from 'comps/common/NavMenu.vue'
import About from 'comps/common/About.vue'
</script>

<style scoped>
.nav-menu {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
}
</style>