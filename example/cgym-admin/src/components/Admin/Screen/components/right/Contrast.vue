<template>
  <div class="contrast-box center">
    <div class="contrast-box-body">
      <div class="charts-contrast" ref="echart">
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
      name: '散点图'
    },
    xAxis: {
      show: false,
      type: 'category'
    },
    yAxis: {
      show: false,
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
        type: 'scatter',
        data: [20, 60, 40, 80, 90, 60, 120],
        symbol: 'arrow',
        label: {
          show: true,
          position: 'top',
          color: 'white',
          fontSize: 8
        },
        itemStyle: {
          color: '#8b51fd',
          borderRadius: [5, 5, 0, 0]
        }
      },
    ]
  }
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.contrast-box {
  width: 100%;
  height: 100%;

  .contrast-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .charts-contrast {
      width: 100%;
      height: 100%;
    }
  }
}
</style>