import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// svg插件
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export default defineConfig(({mode}) => {

    // 获取各种环境变量
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve("./src") // 相对路径别名配置
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // 导入
                    additionalData: '@import "./src/style/global/var.scss";',
                }
            }
        },
        // 代理跨域
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
