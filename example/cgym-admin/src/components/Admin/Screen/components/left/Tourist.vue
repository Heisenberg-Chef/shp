<template>
  <div class="tourist-box center">
    <div class="tourist-box-body">
      <div class="charts-waterball" ref="echart">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

// 挂载的ref
const echart = ref()
onMounted(() => {
  const myCharts = echarts.init(echart.value)
  myCharts.setOption({
    // 系列
    series: {
      type: 'liquidFill',
      data: [0.56],
      shape: 'arrow',
      radius: '80%',
      color: ['#8b51fd'],
      outline: {
        show: false
      },
      label: {
        position: ['50%', '50%'],
        formatter: 'CGYM',
        fontSize: 20,
        color: '#D94854'
      }
    },
  })
})
</script>

<style scoped lang="scss">
.tourist-box {
  width: 100%;
  height: 100%;

  .tourist-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .charts-waterball {
      width: 100%;
      height: 100%;
    }
  }
}
</style>