import request from '@/utils/request'

const api_name = '/admin'  // 定义的全局变量，方便调用时引入此url

export default {
	//商品列表
    pageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/findPage/${page}/${limit}`,   // 这是模板字符串写法
            method: 'post',  // 后端有responseBody，使用json格式传递，普通传递与json传递的写法不同（框架封装的原因）
            // json传递： data: searchObj  。  普通写法：  params: searchObj
            data: searchObj   
        })
    }
}