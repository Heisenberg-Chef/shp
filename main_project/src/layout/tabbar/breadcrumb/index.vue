<template>
  <el-icon class="icon" @click="changeIcon">
    <!-- 通过是否折叠判断图标是 EXPAND 还是 FOLD -->
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 分割图片是一个向右侧的箭头 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑中的信息由route.path种已经记载了 -->
    <template v-for="item in route.matched" :key="item.path">
      <el-breadcrumb-item v-show="item.meta.title" :to="item.path" class="breadcrumb-item">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- elm 定义好的 -->
        <span class="title">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'

// route里面的matched属性，可以做面包屑功能(里面已经将所有的面包屑路径收集好了)
const route = useRoute()
const layoutSettingStore = useLayoutSettingStore()
// 控制菜单的折叠还是展开
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss">
.icon {
  margin-right: 10px;
}

.breadcrumb-item {
  margin-top: 3px;

  .title {
    margin: 0px 5px;
    vertical-align: top;
  }
}
</style>
