<script setup lang="ts">
import { ElButton } from 'element-plus';
import { Plus } from "@element-plus/icons-vue"
import { Edit } from "@element-plus/icons-vue"

</script>

<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="small" :icon="Edit">修改按钮</el-button>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="sizes, prev, pager, next"
      :total="1000"
    />
    </div>
    <br>
    <svg>
      <use xlink:href="#icon-share"></use>
    </svg>

</template>

<style scoped></style>
