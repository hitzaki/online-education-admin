import request from '@/utils/request'
import { getGToken } from '@/utils/auth'

const api_name = '/adminAuth' // 定义的全局变量，方便调用时引入此url

export default {
  // 管理员操作
  adminPage(searchObj) {
    console.log(searchObj)
    return request({
      url: `${api_name}/adminPage`,
      method: 'post',
      data: searchObj
    })
  },
  adminInsert(adminObj) {
    return request({
      url: `${api_name}/adminInsert`,
      method: 'post',
      data: adminObj
    })
  },
  adminBan(data) {
    return request({
      url: `${api_name}/adminBan`,
      method: 'post',
      data: data
    })
  },
  // 用户操作
  userPage(data) {
    return request({
      url: `${api_name}/userPage`,
      method: 'post',
      data: data
    })
  },
  userBan(data) {
    return request({
      url: `${api_name}/userBan`,
      method: 'post',
      data: data
    })
  },
  userUnban(data) {
    return request({
      url: `${api_name}/userUnban`,
      method: 'post',
      data: data
    })
  },
  // 用户角色操作
  userRolePage(data) {
    return request({
      url: `${api_name}/userRolePage`,
      method: 'post',
      data: data
    })
  },
  userRoleInsert(data) {
    return request({
      url: `${api_name}/userRoleInsert`,
      method: 'post',
      data: data
    })
  },
  userRoleDelete(data) {
    return request({
      url: `${api_name}/userRoleDelete`,
      method: 'post',
      data: data
    })
  },
  // 角色操作
  rolePage(data) {
    return request({
      url: `${api_name}/rolePage`,
      method: 'post',
      data: data
    })
  },
  roleDelete(data) {
    return request({
      url: `${api_name}/roleDelete`,
      method: 'post',
      data: data
    })
  },
  roleInsert(data) {
    return request({
      url: `${api_name}/roleInsert`,
      method: 'post',
      data: data
    })
  },
  // 角色权限操作
  rolePermissionPage(data) {
    return request({
      url: `${api_name}/rolePermissionPage`,
      method: 'post',
      data: data
    })
  },
  rolePermissionDelete(data) {
    return request({
      url: `${api_name}/rolePermissionDelete`,
      method: 'post',
      data: data
    })
  },
  rolePermissionInsert(data) {
    return request({
      url: `${api_name}/rolePermissionInsert`,
      method: 'post',
      data: data
    })
  },
  // 权限操作
  permissionPage(data) {
    return request({
      url: `${api_name}/permissionPage`,
      method: 'post',
      data: data
    })
  },
  permissionDelete(data) {
    return request({
      url: `${api_name}/permissionDelete`,
      method: 'post',
      data: data
    })
  },
  permissionInsert(data) {
    return request({
      url: `${api_name}/permissionInsert`,
      method: 'post',
      data: data
    })
  },
  // 业务员生成分享链接
  salesmanLink(data) {
    return request({
      url: `${api_name}/salesmanLink`,
      method: 'post',
      data: data
    })
  },
}
