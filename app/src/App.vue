<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>我是项目根组件</h1>
    <Header></Header>
  </div>
</template>

<script>
import Header from "@/components/Header"

// 导出
export default {
  name: '',
  components: {
    Header: Header,
  }
}
</script>

<style></style>
