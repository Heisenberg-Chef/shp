<template>
  <div class="map-box" ref="map">
    map
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import chinaJson from './china.json'

const map = ref()
echarts.registerMap('china', chinaJson)

onMounted(() => {
  const myCharts = echarts.init(map.value)
  const option = {
    title: {
      text: '地图',
      textStyle: {
        color: 'white',
      },
      left: 'center'
    },
    geo: [
      {
        map: 'china',
        roam: true, // 可通过鼠标缩放和移动
        top: 0,
        bottom: 0,
        left: 50,
        right: 50,
        label: {
          show: false
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#8b55f8' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          opacity: 0.8
        },
        // 高亮状态
        emphasis: {
          label: {
            show: true,
            color: 'white',
            fontSize: 30,
          },

        }
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [111.670801, 40.818311],
              [112.982279, 28.19409],
            ],
            lineStyle: {
              width: 2,
              color: 'white',
              curveness: 0.3,
            },
          }
        ],
        effect: {
          show: true,
          symbol: 'pin',
          color: '#8b51fd',
          symbolSize: 10,
        },
        markPoint: [
          [111.670801, 40.818311],
          [112.982279, 28.19409],
        ],
        roam: true,
        focusNodeAdjacency: true,
        hoverAnimation: true,
      },
    ],
  }
  myCharts.setOption(option)
})
</script>

<style scoped>

</style>