import request from '@/utils/request'

const api_name = '/book'  // 定义的全局变量，方便调用时引入此url

export default {
	//商品列表
    pageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/findPage/${page}/${limit}`,   // 这是模板字符串写法
            method: 'post',  // 后端有responseBody，使用json格式传递，普通传递与json传递的写法不同（框架封装的原因）
            // json传递： data: searchObj  。  普通写法：  params: searchObj
            data: searchObj   
        })
    },
    removeById(id) { // 删除商品
        return request({
          url: `${api_name}/delete/${id}`,
          method: `delete`
        })
      },
    // 新增商品
    save(book) {
        return request({
        url: `${api_name}/save`,
        method: `post`,
        data: book
        })
    },
    saveRecord(book) { // 新增记录
      return request({
      url: `${api_name}/addRecord`,
      method: `post`,
      data: book
      })
  },
    // 修改商品的数据回显
    getById(id) {
        return request({
            url: `${api_name}/get/${id}`,
            method: `get`
        })
    },
    updateById(book) {
        return request({
          url: `${api_name}/update`,
          method: `put`,
          data: book
        })
    },
    batchRemove(idList) {
        return request({
          url: `${api_name}/batchRemove`,
          method: `delete`,
          data: idList
        })
    },
    //所有商品
    list() {
        return request({
          url: `${api_name}/findAll`,
          method: `get`
        })
    }
}