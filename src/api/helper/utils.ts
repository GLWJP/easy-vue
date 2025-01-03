import { ElMessage } from 'element-plus'
import { AxiosError } from 'axios'
import type { CtmInternalAxiosRequestConfig } from "../index.ts";

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export function handleResponseStatus(status: number) {
  switch (status) {
    case 400:
      ElMessage.error('请求失败！请您稍后重试')
      break
    case 401:
      ElMessage.error('登录失效！请您重新登录')
      redirectToLogin()
      break
    case 403:
      ElMessage.error('当前账号无权限访问！')
      break
    case 404:
      ElMessage.error('你所访问的资源不存在！')
      break
    case 405:
      ElMessage.error('请求方式错误！请您稍后重试')
      break
    case 408:
      ElMessage.error('请求超时！请您稍后重试')
      break
    case 500:
      ElMessage.error('服务异常！')
      break
    case 502:
      ElMessage.error('网关错误！')
      break
    case 503:
      ElMessage.error('服务不可用！')
      break
    case 504:
      ElMessage.error('网关超时！')
      break
    default:
      ElMessage.error('请求失败！')
  }
}

/**
 * @description: 处理网络请求错误
 * @param error
 */
export function handleNetworkError(error: AxiosError): void {
  if (error.message.indexOf('timeout') !== -1) {
    ElMessage.error('请求超时！请您稍后重试')
    return
  }
  if (error.message.indexOf('Network Error') !== -1) {
    ElMessage.error('网络错误！请您稍后重试')
    return
  }
}

/**
 * @description: 跳转到登录页面
 * @return void
 */
export function redirectToLogin() {
  // TODO: 跳转到登录页面
}

/**
 * @description: 添加请求鉴权头部
 * @return CtmInternalAxiosRequestConfig
 * @param config
 */
export function addAuthHeader(config: CtmInternalAxiosRequestConfig): CtmInternalAxiosRequestConfig {
  // TODO: 设置鉴权头部
  return config
}
