//仓库
import Vuex from 'vuex';
import Vue from 'vue';
//安装插件
Vue.use(Vuex);

//引入小仓库
import home from './home';
import search from './search';
// import detail from './detail';
// import user from './user';
// import shopcart from './shopcart'
// import trade from './trade';


// 需要使用一次插件
Vue.use(Vuex);
// state:仓库存储数据的地方
const state = {};
// mutations:修改state的唯一手段
const mutations = {};
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const action = {};
// getters:计算属性，用于简化仓库数据，让组件获取数据更方便
const getters = {};

// 对外暴露store类的一个实例，每一个JS文件只能有一个默认暴露。
export default new Vuex.Store({
    // 大仓库所需要的组件全部注册到小仓库中
    modules: {
        home,
        search
    }
});