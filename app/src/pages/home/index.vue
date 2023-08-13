<template>
    <div>
        <typenav></typenav>
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like />
        <Floor></Floor>
        <Floor></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from "@/pages/home/listContainer"
import TodayRecommend from "@/pages/home/TodayRecommend"
import Rank from "@/pages/home/Rank"
import Like from "@/pages/home/Like"
import Floor from "@/pages/home/Floor/Floor.vue"
import Brand from "@/pages/home/Brand"

import { mapState } from "vuex";
export default {
    name: 'Home',
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed: {
        ...mapState("count")
    }
}

</script>

<style scoped></style>
