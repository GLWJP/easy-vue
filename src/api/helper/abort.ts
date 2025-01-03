import qs from "qs";
import type { CtmInternalAxiosRequestConfig } from "@/api";

// 声明一个 Map 用于存储请求标识及其取消控制器
const abortControllerMap = new Map<string, AbortController>();

// 序列化参数，确保对象属性按字母顺序排列
const serialize = (obj: Record<string, unknown>) => {
  return qs.stringify(obj, {
    arrayFormat: "repeat",
    sort: (a, b) => a.localeCompare(b)
  });
};

// 生成请求的唯一标识符
export const getRequestKey = (config: CtmInternalAxiosRequestConfig) => {
  return [
    config.method,
    config.url,
    serialize(config.data),
    serialize(config.params)
  ].join("&");
};

/**
 * @description: 控制器取消处理器
 */
export class ControllerAbortHandler {
  /**
   * @description: 添加当前请求到 abortControllerMap 中，并进行去重检查
   * @param {CtmInternalAxiosRequestConfig} config - 请求配置
   * @return void
   */
  addRequest(config: CtmInternalAxiosRequestConfig) {
    this.removeRequest(config); // 在添加新请求之前，先移除已有的相同请求
    const key = getRequestKey(config);
    const controller = new AbortController();
    config.signal = controller.signal; // 将 signal 传递给 axios 请求
    abortControllerMap.set(key, controller);
  }

  /**
   * @description: 移除指定请求的 cancel 控制器
   * @param {CtmInternalAxiosRequestConfig} config - 请求配置
   * @return void
   */
  removeRequest(config: CtmInternalAxiosRequestConfig) {
    const key = getRequestKey(config);
    const controller = abortControllerMap.get(key);
    if (controller) {
      controller.abort(); // 取消当前请求
      abortControllerMap.delete(key); // 从 Map 中移除该请求
    }
  }

  /**
   * @description: 清空所有尚未完成的请求
   * @return void
   */
  clearRequests() {
    abortControllerMap.forEach(controller => controller.abort());
    abortControllerMap.clear(); // 清空请求 Map
  }
}
