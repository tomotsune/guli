<template>
  <div ref="indexChart" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup>
import {ref} from '@vue/reactivity'
import {onMounted} from 'vue'
import * as echarts from 'echarts'
import {lineChartOptions} from '../hooks/useLineChart.ts'

const indexChart = ref()
onMounted(async () => {
  /* 初始化 */
  let lineChart = echarts.init(indexChart.value)
  /* 获取7天前的日期, 下面用8是因为当天的信息要到第二天被计算 */
  const time = (new Date).getTime() - 8 * 24 * 60 * 60 * 1000
  const begin = new Date(time)
  /* lineChartOptions 配置项，推荐放在外部引入。 */
  lineChart.setOption(await lineChartOptions(begin.toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)))
  // window.onresize = function () {
  //   //自适应大小, 不用的话不会自适应大小。
  //   lineChart.resize()
  // }
})
</script>

<style scoped>

</style>