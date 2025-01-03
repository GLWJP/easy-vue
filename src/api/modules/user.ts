import request from '@/api'
import type { ApiResponse } from '../interface'

export interface UserInfoOptions {
  isLogin: boolean
}

export interface UserInfo {
  id: string
  name: string
  avatar: string
}

export const getUserInfoApi = (options: UserInfoOptions): Promise<ApiResponse<UserInfo>> => {
  // 模拟数据，实际开发中应该从服务端获取用户信息
  // return new Promise<ApiResponse<UserInfo>>((resolve) => {
  //   setTimeout(() => {
  //     const res: ApiResponse<UserInfo> = {
  //       data: <UserInfo>{
  //         id: '123456',
  //         name: '张三',
  //         avatar: 'https://www.example.com/avatar.jpg',
  //       },
  //       id: '',
  //       code: 200,
  //       msg: '',
  //     }
  //     resolve(res)
  //   }, 500) // 模拟网络延迟
  // })
  return request.get<UserInfo>('/user/info', options, { cancelBefore: true })
}
