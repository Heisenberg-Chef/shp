<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// 导出
export default {
  name: '',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped></style>
