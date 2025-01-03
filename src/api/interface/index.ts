export interface Result {
  id: string
  code: number
  msg: string
}

export interface ApiResponse<T> extends Result {
  data: T
}

// 分页参数
export interface PaginationOptions {
  page: number
  pageSize: number
  total: number
}

// 分页响应数据
export interface ResPage<T> extends PaginationOptions {
  list: T[]
}

// 分页请求参数
export interface ReqPage {
  page: number
  pageSize: number
}
