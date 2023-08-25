<template>
  <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="option"/>
</template>

<script setup>
import {loadFull} from "tsparticles"

const particlesInit = async (engine) => {
  await loadFull(engine)
}
const option = {
  background: {
    color: {
      value: '#211f1f'
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { // 开启鼠标点击的效果
        enable: true,
        mode: 'push'
      },
      onHover: { // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: { // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      grab: {
        distance: 200,
        duration: 0.4
      },
      attract: { // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5
      }
    }
  },
  particles: {
    color: {
      value: '#8b51fd' // 粒子点的颜色
    },
    links: {
      color: '#8b51fd', // 线条颜色
      distance: 150,//线条距离
      enable: true,
      opacity: 0.4, // 不透明度
      width: 1.2 // 线条宽度
    },
    collisions: {
      enable: true
    },
    move: {
      attract: {enable: false, rotateX: 600, rotateY: 1200},
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 0.5, // 移动速度
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 100//粒子数
    },
    opacity: {//粒子透明度
      value: 0.7
    },
    shape: {//粒子样式
      type: 'circle'
    },
    size: {//粒子大小
      random: true,
      value: 5
    }
  },
  detectRetina: true
}
</script>

<style scoped>

</style>