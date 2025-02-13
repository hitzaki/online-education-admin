import request from '@/utils/request'

export function login(data) {
  data.account = data.username
  return request({
    url: '/adminAuth/adminLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/adminAuth/adminExtendInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/adminAuth/adminLogout',
    method: 'post'
  })
}
