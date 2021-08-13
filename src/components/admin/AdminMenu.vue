<template>
  <div>
    <el-menu
        v-for="(menu,i) in adminMenus"
        :default-active="'/admin/users'"
        class="el-menu-admin"
        router
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <div style="height: 80px;"></div>
      <!--index 没有用但是必需字段且为 string -->
      <el-submenu :index="i + ''" style="text-align: left">
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
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const adminMenus = computed(() => store.state.adminMenus)

</script>
