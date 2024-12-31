import {BuildOptions} from 'vite';
import {ImportMetaEnv} from "../src/vite-env";

/**
 * 创建 vite build 配置
 * @param envConfig
 * @return {BuildOptions}
 */
const createViteBuild = (envConfig: ImportMetaEnv): BuildOptions => {
    return {
        outDir: envConfig.VITE_OUT_DIR,
        // 禁用 gzip 压缩大小报告，可能会提高大型项目的构建性能
        reportCompressedSize: false,
        // 压缩
        minify: true,
        // 打包后文件超出大小 waring
        chunkSizeWarningLimit: 1024,
        rollupOptions: {
            output: {
                manualChunks: {
                    // 将 Element Plus 相关的模块拆分为一个文件
                    // 'element-plus': ['element-plus'],
                    // 'element-plus-icon': ['@element-plus/icons-vue']
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    }
}

export default createViteBuild;