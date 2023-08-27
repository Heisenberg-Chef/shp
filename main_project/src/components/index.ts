import SvgIcon from "@/components/SvgIcon"


const allGlobalComponent = {SvgIcon};
// 对外暴露插件对象
export default {
    // 必须叫做install方法
    install(app) {
        // 注册项目全部的组件
        Object.keys(allGlobalComponent).forEach(key=>{
            // 注册为全局组件
            app.components(key,allGlobalComponent[key]);
        })
    }
}