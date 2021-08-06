<template>
  {{ userInfo }}
</template>

<script setup>
import useInfo from './hooks/useInfo.ts'

const userInfo = useInfo()
</script>

<style scoped>
</style>