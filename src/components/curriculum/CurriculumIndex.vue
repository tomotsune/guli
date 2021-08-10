<template>
  <div id="aCoursesList" class="bg-fa of">
    <header class="comm-title">
      <h2 class="fl tac">
        <span class="c-333">{{title}}</span>
      </h2>
    </header>
    <router-view/>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {computed} from 'vue'

const route = useRoute()

const title = computed(() => route.path.endsWith('course') ? '全部课程' : '课程介绍')
</script>