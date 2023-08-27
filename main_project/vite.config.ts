import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// svg插件
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [
    vue(),
    createSvgIconsPlugin(
      {
        // 指定icon缓存地址
        iconDirs: [path.resolve(process.cwd(),"src/assert/icons")],
        // 指定命名规则
        symbolId: 'icon-[dir]-[name]'
      }
    )
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径使用别名来配置，使用 @ 代替 src。
    }
  }
})
