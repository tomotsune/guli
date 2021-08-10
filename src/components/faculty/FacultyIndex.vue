<template class="container">
  <header class="comm-title all-teacher-title">
    <h2 class="fl tac">
      <span class="c-333">{{ title }}</span>
    </h2>
    <section class="c-tab-title">
      <router-link id="subjectAll" title="全部" to="/faculty">全部</router-link>
    </section>
  </header>
  <router-view/>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {computed} from 'vue'

const route = useRoute()

const title = computed(() => route.path.endsWith('teacher') ? '全部讲师' : '讲师介绍')
</script>