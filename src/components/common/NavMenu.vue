<template>
  <div>
    <el-menu
        :default-active="currentPath"
        router
        mode="horizontal"
        background-color="white"
        text-color="#222"
        active-text-color="red"
        style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">White Jotter - Your Mind Palace</span>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {computed, ref} from '@vue/reactivity'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()
const keywords = ref('')
const navList = ref([
  {name: '/index', navItem: '首页'},
  {name: '/jotter', navItem: '笔记本'},
  {name: '/library', navItem: '图书馆'},
  {name: '/admin', navItem: '个人中心'}
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