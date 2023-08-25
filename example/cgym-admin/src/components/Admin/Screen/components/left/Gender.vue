<template>
  <div class="gender-box center">
    <div class="gender-box-body">
      <div class="gender-img">
        <div class="gender-img-man center">
          <img src="../../../../../images/screen/7.png">
        </div>
        <div class="gender-img-woman center">
          <img src="../../../../../images/screen/9.png">
        </div>
      </div>
      <div class="gender-ratio">
        <div class="gender-ratio-data">
          <span>男士58%</span>
          <span>女士42%</span>
        </div>
        <div class="gender-ratio-bar" ref="charts">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {ref, onMounted} from 'vue'

const charts = ref()

onMounted(() => {
  const myEcharts = echarts.init(charts.value)
  myEcharts.setOption({
    xAxis: {
      min: 0,
      max: 100,
      show: false
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#8b51fd',
          borderRadius: 20,
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        },
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.gender-box {
  width: 100%;
  height: 100%;

  .gender-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .gender-img {
      width: 100%;
      height: 55%;
      display: flex;
      justify-content: center;

      .gender-img-man {
        width: 35%;
        margin-right: 10px;
        background: url("@/images/screen/6.png") no-repeat;
        background-size: cover;

        img {
          width: 40px;
        }
      }

      .gender-img-woman {
        width: 35%;
        margin-left: 10px;
        background: url("@/images/screen/8.png");

        img {
          width: 40px;
        }
      }
    }

    .gender-ratio {
      margin-top: 10px;
      color: white;
      padding: 0 10%;
      display: flex;
      flex-direction: column;

      .gender-ratio-data {
        display: flex;
        justify-content: space-between;
      }

      .gender-ratio-bar {
        margin-top: 10px;
        height: 50px;
      }
    }
  }
}
</style>