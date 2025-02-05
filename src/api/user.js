import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/v1/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
