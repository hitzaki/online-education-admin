import request from '@/utils/request'

const api_name = '/link'  // 定义的全局变量，方便调用时引入此url

export default {
  // 短链接列表
  pageList(searchObj) {
    return request({
      url: `${api_name}/api/short-link/v1/page`,   // 这是模板字符串写法
      method: 'post',  // 后端有responseBody，使用json格式传递，普通传递与json传递的写法不同（框架封装的原因）
      // json传递： data: searchObj  。  普通写法：  params: searchObj
      data: searchObj
    })
  },
  // 生成短链接
  create(upData) {
    return request({
      url: `${api_name}/api/short-link/v1/create`,
      method: `post`,
      data: upData
    })
  },
  // 访问短链接
  rout(link) {
    return request({
      url: `${api_name}/${link}`,
      method: `get`
    })
  },
  // 改变短链接状态
  disable(id) {
    return request({
      url: `${api_name}/api/short-link/v1/disable/${id}`,
      method: `get`
    })
  },
}
