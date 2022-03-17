import request from '@/utils/request'

// 删除用户所在组
const adminDelete = ({ username, group }) => request.post('/groupMember/delete', { username, group })

// 给用户添加组
const adminCreate = ({ username, group }) => request.post('/groupMember/create', { username, group })

// 修改用户所在组
const adminEdit = ({ username, group }) => request.post('/groupMember/update', { username, group })

// 获取所有分组
const groups = () => request.get('/group/show')

// 获取所有分组细节
const groupDetails = () => request.get('/group/showDetails')

// 修改分组名
const groupUpdate = ({ oldName, newName }) => request.post('/group/update', { oldName, newName })

// 创建分组
const groupCreate = ({ groupName }) => request.post('/group/create', { groupName })

// 删除分组
const groupDelete = ({ groupName }) => request.post('/group/delete', { groupName })

export default {
  adminDelete,
  adminCreate,
  groups,
  adminEdit,
  groupDetails,
  groupUpdate,
  groupCreate,
  groupDelete
}
