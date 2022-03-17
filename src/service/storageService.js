// 本地缓存服务

const PREFIX = 'ginessential_'

// user模块的常量
const USER_PREFIX = `${PREFIX}user_`
const USER_TOKEN = `${USER_PREFIX}token`
const USER_INFO = `${USER_PREFIX}info`
const USER_ADMIN = `${USER_PREFIX}joinGroup`
const GROUP_NAMES = `${USER_PREFIX}groups`
const GROUP_DETAILS = `${USER_PREFIX}groupDetails`
const LIST_ID = `${USER_PREFIX}listId`

// 存储

const set = (key, data) => { localStorage.setItem(key, data) }

// 读取

const get = (key) => localStorage.getItem(key)

export default {
  set, get, USER_INFO, USER_TOKEN, USER_ADMIN, GROUP_NAMES, GROUP_DETAILS, LIST_ID
}
