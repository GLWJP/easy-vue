// 自定义参数
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse, type InternalAxiosRequestConfig,
} from "axios";
import type { ApiResponse } from "./interface";
import { addAuthHeader, handleNetworkError, handleResponseStatus } from "./helper/utils.ts";
import { ElMessage } from "element-plus";
import { ControllerAbortHandler } from "@/api/helper/abort.ts";

// 全局 axios 配置
const axiosConfig = {
  // 请求基础路径 如 /api
  baseURL: import.meta.env.VITE_APP_API_URL,
  // 设置超时时间
  timeout: 30000,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

// 自定义请求配置
export interface CtmInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  cancelBefore?: boolean;
}

const abortHandler = new ControllerAbortHandler();

/**
 * 请求处理器
 * @param config 请求配置
 * @returns 请求处理器实例
 */
class RequestHandler {
  service: AxiosInstance

  /**
   * 构造函数: 初始化请求实例
   * @param config
   */
  public constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config)

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: CtmInternalAxiosRequestConfig) => {
        // 默认重复请求是不取消的，可以取消请求设置 cancelBefore: true
        if (config.cancelBefore === true) {
          // 取消重复请求
          abortHandler.addRequest(config)
        }

        // 添加请求鉴权头部
        config = addAuthHeader(config)

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 2xx 范围内的状态码都会触发该函数。
        const { data, config } = response

        // 移除重复请求限制
        abortHandler.removeRequest(config)

        // 全局错误信息拦截 判定规则为
        if (data.code && data.code !== 0) {
          ElMessage.error(data.msg || '请求失败')
          return Promise.reject(data)
        }

        // 成功请求
        return data
      },
      async (error: AxiosError) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        const { response } = error

        // 网络错误处理
        if (error && error.message) {
          handleNetworkError(error);
        }

        // 根据服务器响应的错误状态码，做不同的处理
        if (response && response.status) {
          handleResponseStatus(response.status);
        }

        return Promise.reject(error)
      },
    )
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ApiResponse<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object | string, _object = {}): Promise<ApiResponse<T>> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ApiResponse<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: object, _object = {}): Promise<ApiResponse<T>> {
    return this.service.delete(url, { params, ..._object })
  }

  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

export default new RequestHandler(axiosConfig)
