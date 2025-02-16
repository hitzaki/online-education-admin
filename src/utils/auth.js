import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  setGToken(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


  let token = ''; // 私有变量，外部无法直接访问

  // 设置 token 的函数
export  function setGToken(newToken) {
    token = newToken;
  }

  // 获取 token 的函数
export  function getGToken() {
    return token;
  }

