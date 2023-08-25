<template>
  <div class="logo center">
    <img src="../../../../src/images/sites/logo.png">
    <h3>{{ setting.title }}</h3>
  </div>
</template>

<script setup>
import setting from "@/utils/logo.ts"
</script>

<style scoped lang="scss">
.logo {
  height: 80px;
  display: flex;
  align-items: center;
  flex-direction: row;

  img {
    width: 60px;
    height: 60px;
  }

  h3 {
    font-family: 微软雅黑;
    margin-left: 10px;
    font-weight: 600;
    color: white;
    font-size: 24px;
  }
}
</style>