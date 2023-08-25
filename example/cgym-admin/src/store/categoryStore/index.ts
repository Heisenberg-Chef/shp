import {defineStore} from "pinia";
import {reqC1, reqC2, reqC3} from "@/api/product/attribute";

const useCategoryStore = defineStore('Category', {
    state: () => {
        return {
            categoryData1: [],
            categoryData2: [],
            categoryData3: [],
            c1Id: '',
            c2Id: '',
            c3Id: '',
        }
    },
    actions: {
        // 一级分类
        async getCategory1() {
            const res = await reqC1()
            if (res.code === 200) {
                this.categoryData1 = res.data
                return 'ok'
            } else {
                return Promise.reject(new Error('获取失败'))
            }
        },

        // 二级分类
        async getCategory2() {
            const res = await reqC2(this.c1Id)
            if (res.code === 200) {
                this.categoryData2 = res.data
                return 'ok'
            } else {
                return Promise.reject(new Error('获取失败'))
            }
        },

        // 三级分类
        async getCategory3() {
            const res = await reqC3(this.c2Id)
            if (res.code === 200) {
                this.categoryData3 = res.data
                return 'ok'
            } else {
                return Promise.reject(new Error('获取失败'))
            }
        },
    },
    getters: {}
})

export default useCategoryStore