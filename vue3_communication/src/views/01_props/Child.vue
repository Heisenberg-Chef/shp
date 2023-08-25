<template>
  <div class="son">
       <h1>我是子组件:曹植</h1>
       <!-- <p>{{props.info}}</p>
       <p>{{props.money}}</p> -->
      <!--props可以省略前面的名字--->
       <p>{{info}}</p>
       <p>{{money}}</p>
       <button @click="updateProps">修改props数据</button>
  </div>
</template>

<script setup lang="ts">
//需要使用到defineProps方法去接受父组件传递过来的数据
//defineProps是Vue3提供方法,不需要引入直接使用
let props = defineProps(['info','money']); //数组|对象写法都可以
//按钮点击的回调
const updateProps = ()=>{
  // props.money+=10;  props:只读的
  console.log(props.info)
}

import { ref, onMounted } from 'vue';

const altPressed = ref(false);
const aPressed = ref(false);

// 设置监听器，在页面加载后监听键盘按下事件
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (event) => {
  if (event.key === 'Alt') {
    altPressed.value = true;
  } else if (event.key === 'b' && altPressed.value) {
    aPressed.value = true;
    // 执行触发功能的操作
    executeFunction();
  }
};

const executeFunction = () => {
  // 在这里执行你希望触发的功能
  console.log('Alt + B pressed! Function triggered.');
};
</script>

<!-- <script>
export default {
  props: ["info","money"]
}
</script> -->

<style scoped>
.son{
  width: 400px;
  height: 200px;
  background: hotpink;
}
</style>