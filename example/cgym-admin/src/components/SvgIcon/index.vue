<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  iconName: String,
  width: {
    type: String,
    default: '25px'
  },
  height: {
    type: String,
    default: '25px'
  },
})
</script>

<template>
  <svg :style="{width, height}">
    <use :xlink:href="prefix + iconName"></use>
  </svg>
</template>

<style scoped lang="scss">

</style>