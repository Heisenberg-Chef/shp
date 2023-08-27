<template>
  <div class="little-btn">
    <button>{{ value }}</button>
  </div>
</template>

<script setup>
defineProps({
  value: String
})
</script>

<style scoped lang="scss">
.little-btn {
  button {
    color: white;
    background-color: #8b51fd;
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: #5f2dcb;
    }
  }
}
</style>