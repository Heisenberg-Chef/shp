<template>
  <div class="screen">
    <div class="srceen-box">
      <div class="screen-top">
        <div class="screen-top-left">
          <img src="../../../images/screen/5.png">
          <RouterLink to="/home">
            <span>返回首页</span>
          </RouterLink>
        </div>
        <div class="screen-top-center center">
          <h2>CGYM数据可视化平台</h2>
        </div>
        <div class="screen-top-right">
          <img src="../../../images/screen/4.png">
          <span class="screen-refresh">刷新数据</span>
          <span class="screen-time">{{ nowTime }}</span>
        </div>
      </div>
      <div class="screen-body">
        <div class="screen-body-left">
          <Tourist class="tourist"/>
          <Gender class="gender"/>
          <Age class="age"/>
        </div>
        <div class="screen-body-center">
          <Map class="map"/>
          <Tendency class="tendency"/>
        </div>
        <div class="screen-body-right">
          <Sort class="sort"/>
          <Contrast class="contarst"/>
          <Statistic class="statistic"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import Tourist from "@/components/Admin/Screen/components/left/Tourist.vue";
import Gender from "@/components/Admin/Screen/components/left/Gender.vue";
import Age from "@/components/Admin/Screen/components/left/Age.vue";
import Map from '@/components/Admin/Screen/components/center/Map.vue'
import Tendency from '@/components/Admin/Screen/components/center/Tendency.vue'
import Sort from '@/components/Admin/Screen/components/right/Sort.vue'
import Contrast from '@/components/Admin/Screen/components/right/Contrast.vue'
import Statistic from '@/components/Admin/Screen/components/right/Statistic.vue'
import {onMounted, ref, onBeforeMount} from "vue";

// 计时器
let nowTime = ref()
let timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    const timeStamp = Date.now()
    nowTime.value = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onBeforeMount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #565262;
  justify-content: center;

  .srceen-box {
    width: 80vw;
    height: 100vh;

    .screen-top {
      display: flex;
      width: 100%;
      height: 55px;

      .screen-top-left {
        width: 20vw;
        display: flex;
        position: relative;
        justify-content: flex-end;
        background: url("src/images/screen/2.png") no-repeat;

        img {
          height: 35px;
        }

        span {
          position: absolute;
          right: 28px;
          top: 8px;
          font-size: 15px;
          color: white;
        }
      }

      .screen-top-center {
        width: 40vw;
        background: url("src/images/screen/1.png") no-repeat;
        background-size: cover;

        h2 {
          color: white;
        }
      }

      .screen-top-right {
        width: 20vw;
        position: relative;
        background: url("src/images/screen/3.png") no-repeat;

        img {
          height: 35px;
        }

        span {
          font-size: 15px;
          color: white;
          position: absolute;
          top: 8px;
        }

        .screen-refresh {
          left: 28px;
          cursor: pointer;
        }

        .screen-time {
          right: 15px;
        }
      }
    }

    .screen-body {
      display: flex;
      flex-direction: row;
      margin-top: 15px;

      .screen-body-left {
        display: flex;
        flex: 1;
        height: calc(100vh - 70px);
        flex-direction: column;

        .tourist {
          flex: 1;
        }

        .gender {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .screen-body-center {
        display: flex;
        height: calc(100vh - 70px);
        flex-direction: column;
        flex: 1.5;

        .map {
          flex: 2;
        }

        .tendency {
          flex: 1
        }
      }

      .screen-body-right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .sort {
          flex: 1;
        }

        .contarst {
          flex: 1;
        }

        .statistic {
          flex: 1;
        }
      }
    }
  }
}
</style>