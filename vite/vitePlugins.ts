import { PluginOption } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

/**
 * 创建 Vite 插件配置数组
 * @returns 插件配置数组
 */
const createVitePlugins = (): (PluginOption | PluginOption[])[] => {
  return [
    // Vue 支持插件
    vue(),
    // 支持在 .vue 文件中使用 JSX/TSX  pnpm install -D @vitejs/plugin-vue-jsx
    vueJsx(),
    // 自动导入插件 pnpm install -D unplugin-auto-import
    autoImportPlugin(),
    // 组件自动注册插件 pnpm install -D unplugin-vue-components
    componentsPlugin(),
  ]
}

// 自动导入插件
const autoImportPlugin = () => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    // pnpm install vue-router pinia
    imports: ["vue", "vue-router", "pinia"], // 自动导入的依赖
    resolvers: [
      // 自动导入 ElementPlus 组件
      ElementPlusResolver({
        // pnpm install sass -D
        importStyle: "sass", // 指示element-plus使用预处理样式
      }),
    ],
    // 指定需要自动导入的目录
    dirs: [],
    // 指定自动导入的文件位置
    dts: "vite/autoImports/auto-imports.d.ts",
  })
}

// 组件自动注册插件
const componentsPlugin = () => {
  return Components({
    resolvers: [
      // 自动注册 ElementPlus 组件
      ElementPlusResolver({
        importStyle: "sass", // 指示element-plus使用预处理样式
      }),
    ],
    // 指定自动注册的文件位置
    dts: "vite/autoImports/auto-components.d.ts",
  })
}

export default createVitePlugins
