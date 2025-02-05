import request from '@/utils/request'

const api_name = '/message'  // 定义的全局变量，方便调用时引入此url

export default {
  // 生成短链接
  send(data) {
    return request({
      url: `${api_name}/mail`,
      method: `post`,
      data: data
    })
  }
}
