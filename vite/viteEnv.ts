import { ImportMetaEnv, type ServerProxy } from "../src/vite-env"

/**
 * 解析环境变量
 * @param env Record<string, string>
 * @returns ImportMetaEnv
 */
function parseEnv(env: Record<string, string>): ImportMetaEnv {
  // 解析 VITE_SERVER_PROXY
  let serverProxyValue: ServerProxy = {}
  const serverProxy = env.VITE_SERVER_PROXY
  if (serverProxy) {
    try {
      serverProxyValue = JSON.parse(serverProxy)
    } catch (e) {
      console.error(`Invalid VITE_SERVER_PROXY value: ${serverProxy}, error: ${e}`)
    }
  }

  return {
    VITE_APP_NAME: env.VITE_APP_NAME,
    VITE_ROUTER_MODE: env.VITE_ROUTER_MODE as "hash" | "history",
    VITE_NAMESPACE: env.VITE_NAMESPACE,

    // 开发环境变量，进行类型转换
    VITE_SERVER_PORT: parseInt(env.VITE_SERVER_PORT, 10),
    VITE_SERVER_OPEN: env.VITE_SERVER_OPEN === "true",
    VITE_SERVER_PROXY: serverProxyValue,

    // 其他环境变量
    VITE_OUT_DIR: env.VITE_OUT_DIR,
    VITE_BASE_URL: env.VITE_BASE_URL,
  }
}

export default parseEnv
