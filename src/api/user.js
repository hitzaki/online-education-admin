import request from '@/utils/request'

export function login(data) {
  const newData = {
    account: data.username, // 将 username 更改为 account
    password: data.password // 保留 password 字段
  }
  console.log('111', newData)
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
