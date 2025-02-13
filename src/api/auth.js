import request from '@/utils/request'

const api_name = '/adminAuth' // 定义的全局变量，方便调用时引入此url

export default {
  // 管理员列表
  adminPage(searchObj) {
    console.log(searchObj)
    return request({
      url: `${api_name}/adminPage`,
      method: 'post',
      data: searchObj
    })
  }
}
