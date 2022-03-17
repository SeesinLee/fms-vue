import request from '@/utils/request'

// 获取故障列表信息
const getFaultLists = () => request.post('/list/showList')

// 编辑故障列表
const editeFaultList = ({ id }) => request.post('/list/show', { id })

// 添加故障列表
const createFaultList = ({ id, faultSketch, faultLevel, faultType, influence, duration, status, creator, cause, solution, startAt, endAt, actualTime }) => request.post('/list/show', { id, faultSketch, faultLevel, faultType, influence, duration, status, creator, cause, solution, startAt, endAt, actualTime })

// 删除故障记录
const deleteFaultList = ({ id }) => request.post('/list/delete', { id })

export default {
  getFaultLists,
  editeFaultList,
  createFaultList,
  deleteFaultList
}
