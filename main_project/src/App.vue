<script setup lang="ts">
import { ElButton } from 'element-plus';
import { Plus } from "@element-plus/icons-vue"
import { Edit } from "@element-plus/icons-vue"
import { onMounted } from 'vue';
import request from '@/utils/requests.ts'
import { reqLogin } from '@/api/user/index'

onMounted(() => {

});

</script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
