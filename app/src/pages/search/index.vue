<template>
    <div>
        <h1>我是搜索页</h1>
        <h3>params 参数 -- {{ $route.params.keyword }} === props:{{ keyword }}</h3><br>
        <h3>query 参数 -- {{ $route.query.k }} === props:{{ k }}</h3>
    </div>
</template>

<script>
export default {
    props: ['keyword', 'k']
}

</script>
    
<style scoped></style>
