/// <reference types="vite/client" />

// https://cn.vite.dev/guide/env-and-mode#intellisense

export interface ImportMetaEnv {
    // 默认环境变量
    readonly VITE_APP_NAME: string;     // 系统名称
    readonly VITE_ROUTER_MODE: 'hash' | 'history';     // 路由模式
    readonly VITE_NAMESPACE: string;     // 命名空间

    // 开发环境变量
    readonly VITE_SERVER_PORT: number; // 服务器端口
    readonly VITE_SERVER_OPEN: boolean; // 是否自动打开浏览器
    readonly VITE_SERVER_PROXY: ServerProxy; // 代理配置

    // 其他环境变量
    readonly VITE_OUT_DIR: string; // 输出目录
    readonly VITE_BASE_URL: string; // 路由前缀
}

export interface ServerProxy {
    [path: string]: {
        target: string; // 目标地址
        changeOrigin: boolean; // 是否允许跨域
        ws: boolean; // 是否开启 websocket
    };
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}