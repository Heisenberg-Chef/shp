import SvgIcon from "../components/SvgIcon/index.vue"
const globalComponents = {SvgIcon}

export default {
    install(app) {
        Object.keys(globalComponents).forEach(key => {
            app.component(key, globalComponents[key])
        })
    }
}