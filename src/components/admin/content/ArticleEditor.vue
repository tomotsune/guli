<template>
  <v-md-editor v-model="text" height="400px" @save="save"></v-md-editor>
</template>

<script setup>
import {ref} from '@vue/reactivity'

const text = ref('# 标题')
const save = (text, html) => {
  console.log(text)
  console.log(html)
}
</script>

<style scoped>
</style>