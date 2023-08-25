<template>
  <div class="sort-box center">
    <div class="sort-box-body">
      <div class="charts-sort" ref="echart">
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
  const option = {
    title: {
      name: '数据排序'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      max: 150
    },
    grid: {
      left: 40,
      right: 10,
      top: 20,
      bottom: 10
    },
    series: [
      {
        type: 'bar',
        data: [20, 60, 40, 80, 90, 60, 120],
        label: {
          show: true,
          position: 'insideTop'
        },
        itemStyle: {
          color: '#8b51fd',
          borderRadius: [5, 5, 0, 0]
        }
      },
      {
        type: 'line',
        data: [20, 60, 40, 80, 90, 60, 120],
        smooth: true
      },
    ]
  }
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.sort-box {
  width: 100%;
  height: 100%;

  .sort-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .charts-sort {
      width: 100%;
      height: 100%;
    }
  }
}
</style>