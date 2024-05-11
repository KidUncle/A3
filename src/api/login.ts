import { request } from '@/utils/service'

interface IUserRequestData {
  username: string
  password: string
}

/** 登录，返回 token */
export function accountLogin(data: IUserRequestData) {
  return request({
    url: 'api/v1/users/login',
    method: 'post',
    data
  })
}
/** 获取用户详情 */
export function userInfoRequest() {
  return request({
    url: 'api/v1/users/info',
    method: 'post'
  })
}

// 验证码
export function testApi() {
  return request({
    url: '/api/v1/login/authcode',
    method: 'get'
  })
}
