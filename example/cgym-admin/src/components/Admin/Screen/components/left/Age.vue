<template>
  <div class="age-box center">
    <div class="age-box-body">
      <div class="charts-pie" ref="echart">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'

const echart = ref()
onMounted(() => {
  const myCharts = echarts.init(echart.value)
  const option = {
    tooltop: {
      trigger: 'item'
    },
    legend: {
      top: '20%',
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: 'white'
      }
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '80%'],
        left: -70,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'white'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 100, name: '18-25岁'},
          {value: 25, name: '25-35岁'},
          {value: 20, name: '35-45岁'},
          {value: 5, name: '45-60岁'},
        ]
      },
    ]
  }
  myCharts.setOption(option)
})

</script>

<style scoped lang="scss">
.age-box {
  width: 100%;
  height: 100%;

  .age-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .charts-pie {
      width: 100%;
      height: 100%;
    }
  }
}
</style>