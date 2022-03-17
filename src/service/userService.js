import request from '@/utils/request'

// 获取用户信息
const info = () => request.get('/info')

// 用户登陆
const login = ({ username, password }) => request.post('/login', { username, password })

// 用户登出
const logout = () => request.post('/logout')

// 刷新用户所在组
const adminRefresh = () => request.get('/groupMember/show')

export default {
  info,
  login,
  logout,
  adminRefresh
}
