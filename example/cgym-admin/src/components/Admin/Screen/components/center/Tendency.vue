<template>
  <div class="tendency-box center">
    <div class="tendency-box-body">
      <div class="charts-tendency" ref="echart">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'

// 挂载的ref
const echart = ref()
onMounted(() => {
  const myCharts = echarts.init(echart.value)
  const colors = ['#8b51fd', 'white'];
  const option = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      textStyle: {
        color: 'white'
      },
    },
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                  'Precipitation  ' +
                  params.value +
                  (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },
        // prettier-ignore
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '上周流量趋势',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [
          10, 30, 50, 80, 120, 120, 150
        ]
      }
    ]
  };
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.tendency-box {
  width: 100%;
  height: 100%;

  .tendency-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .charts-tendency {
      width: 100%;
      height: 100%;
    }
  }
}
</style>