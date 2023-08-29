import SvgIcon from "./SvgIcon/index.vue"

const allGlobalComponent = { SvgIcon };
// 对外暴露插件对象
export default {
    // 必须叫做install方法
    install(app) {
        // 注册项目全部的组件
        Object.keys(allGlobalComponent).forEach(key => {
            // 注册为全局组件 - k v 一致
            app.component(key, allGlobalComponent[key]);
        })
    }
}