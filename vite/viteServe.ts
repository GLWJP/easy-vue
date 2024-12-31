import {ProxyOptions, ServerOptions} from 'vite';
import {ImportMetaEnv, type ServerProxy} from "../src/vite-env";

/**
 * 创建 Vite 服务器配置
 * @param envConfig
 * @return {ServerOptions}
 */
const createViteServer = (envConfig: ImportMetaEnv): ServerOptions => {
    return {
        // 主机地址
        host: '0.0.0.0',
        // 启动端口，提供默认值 80
        port: envConfig.VITE_SERVER_PORT || 80,
        // 运行后是否打开浏览器
        open: envConfig.VITE_SERVER_OPEN || false,
        // 跨域
        cors: true,
        // 代理配置
        proxy: createProxy(envConfig.VITE_SERVER_PROXY),
    }
}

/**
 * 构建 proxy 配置
 * @param serverProxy
 */
function createProxy(serverProxy: ServerProxy = {}): Record<string, string | ProxyOptions> {
    const proxy: Record<string, string | ProxyOptions> = {};

    // 遍历代理配置
    Object.keys(serverProxy).forEach((key) => {
        const proxyItem = serverProxy[key];

        const httpsReg = /^https:\/\//;
        const isHttps = httpsReg.test(proxyItem.target);

        proxy[key] = {
            target: proxyItem.target,
            changeOrigin: proxyItem.changeOrigin !== undefined ? proxyItem.changeOrigin : true,  // 默认值为 true
            rewrite: path => path.replace(new RegExp(`^${key}`), ''), // 设置重写规则
            ws: proxyItem.ws || false,  // 是否启用 WebSocket
            ...(isHttps ? {secure: false} : {})
        };
    });

    return proxy;
}

export default createViteServer;
