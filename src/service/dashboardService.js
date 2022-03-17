import request from '@/utils/request'

// 获取故障统计数值

const faultSum = () => request.get('/dashboard/sum')

export default {
  faultSum
}
