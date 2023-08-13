import { reqCategoryList } from "@/api";

// home 模块的小仓库
const state = {};
const mutations = {

};
const actions = {
    // 通过API里面的忌口函数调用，向服务器发送请求，获取服务器的数据。
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}