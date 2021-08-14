<template>
  <el-menu
      class="el-menu-admin"
      router
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <div style="height: 80px;"></div>
    <el-submenu v-for="(menu,i) in adminMenus" :index="i" style="text-align: left">
      <template #title style="font-size: 17px;">
        <i :class="menu.icon"></i>
        {{ menu.name }}
      </template>
      <el-menu-item v-for="child in menu.children" :key="child.path" :index="child.path">
        <i :class="child.icon"></i>
        {{ child.name }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script setup>
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const adminMenus = computed(() => store.state.adminMenus)
/*const currentPath = store.state.adminMenus[0].children[0].path*/
console.log(store.state.adminMenus[0].children[0].path)
</script>
<style scoped>
.el-menu-admin {
  border-radius: 5px;
  height: 100%;
}
</style>