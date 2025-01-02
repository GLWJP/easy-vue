import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite"
import { fileURLToPath, URL } from "node:url"
import parseEnv from "./vite/viteEnv.ts"
import createViteBuild from "./vite/viteBuild.ts"
import createViteServe from "./vite/viteServe.ts"
import createVitePlugins from "./vite/vitePlugins.ts"

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取项目根目录 process 使用需要 pnpm install @types/node -D
  const root = process.cwd()

  // 解析环境变量
  const envRecord = loadEnv(mode, root + "/env")

  // 解析环境变量
  const envConfig = parseEnv(envRecord)

  // 源码目录
  const srcPath = fileURLToPath(new URL("./src", import.meta.url))

  // 静态资源目录
  const assetsPath = fileURLToPath(new URL("./src/assets", import.meta.url))

  // 视图目录
  const viewsPath = fileURLToPath(new URL("./src/views", import.meta.url))

  // 环境变量目录
  const envDir = fileURLToPath(new URL("./env", import.meta.url))

  return {
    // 部署应用的基本 URL
    base: envConfig.VITE_BASE_URL,
    // 插件
    plugins: createVitePlugins(),
    // 路径别名
    resolve: {
      alias: {
        "@": srcPath, // 设置别名，@ 表示 src 目录
        "@assets": assetsPath, // 设置别名，@ 表示 src 目录
        "@views": viewsPath, // 设置别名，@ 表示 src 目录
      },
    },
    // 环境变量目录
    envDir: envDir,
    // 构建配置
    build: createViteBuild(envConfig),
    // 开发服务器配置
    server: createViteServe(envConfig),
    // 样式预处理器配置
    css: {
      preprocessorOptions: {
        scss: {
          // 自定义命名空间、自定义主题
          additionalData: `
                        $global-namespace: '${envConfig.VITE_NAMESPACE}';
                        @forward 'element-plus/theme-chalk/src/mixins/config.scss' with ( 
                          $namespace: ${envConfig.VITE_NAMESPACE}
                        );
                        @use '@/styles/element/index.scss' as *;`.trim(),
        },
      },
    },
  }
})
