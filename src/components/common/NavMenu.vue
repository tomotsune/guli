<template>
    <el-menu
        :default-active="currentPath"
        router
        mode="horizontal"
        background-color="white"
        text-color="#222"
        active-text-color="#3BB149"
        style="min-width: 1300px;">

      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Your Mind Palace</span>
      <a href="#" title="谷粒学院" style="position: absolute; right: 5%">
        <img src="../../assets/img/logo.png" alt="谷粒学院">
      </a>
    </el-menu>
</template>
<script setup lang="ts">
import {ref,reactive} from '@vue/reactivity'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()
const keywords = ref('')
const navList = reactive([
  {name: '/index', navItem: '首页'},
  {name: '/curriculum', navItem: '课程'},
  {name: '/faculty', navItem: '名师'},
  {name: '/jotter', navItem: '文章'},
  {name: '/login', navItem: '管理中心'}
])
const change = (path) => {
  router.replace({path: path})
}
// const currentPath = computed(() => {
//   const x = route.path.indexOf('/', 1)
//   if (x !== -1) {
//     return this.$route.path.substring(0, x)
//   } else {
//     return this.$route.path
//   }
// })
</script>

<style scoped>
a {
  text-decoration: none;
}

span {
  pointer-events: none;
}
</style>