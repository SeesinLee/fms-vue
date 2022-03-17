<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div style="height: 300px" ref="faultType"></div>
        </el-card>
      </el-col>
       <el-col :span="8">
         <el-card>
           <div style="height: 300px" ref="faultClass"></div>
         </el-card>
      </el-col>
       <el-col :span="8">
         <el-card>
           <div style="height: 300px" ref="faultStatus"></div>
         </el-card>
      </el-col>
      <el-col :span="24">
        <div>&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="height: 320px" ref="faultsSum"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="height: 320px" ref="faultsAverage"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dashboardService from '../../service/dashboardService.js'
import { showLoading, hideLoading } from '../../utils/loading.js'
export default {
  data () {
    return {
    }
  },
  mounted () {
    showLoading()
    dashboardService.faultSum().then((response) => {
      echarts.init(this.$refs.faultsSum).setOption({
        title: {
          text: '年度故障统计'
        },
        tooltip: {},
        legend: {
          data: ['故障数(个)']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {},
        series: [
          {
            name: '故障数(个)',
            type: 'line',
            data: Array.from(response.data.data.sum)
          }
        ]
      })
      echarts.init(this.$refs.faultsAverage).setOption({
        title: {
          text: '每月故障持续时间平均数'
        },
        tooltip: {},
        legend: {
          data: ['平均数(分钟)']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {},
        series: [
          {
            name: '平均数(分钟)',
            type: 'bar',
            data: response.data.data.duration
          }
        ]
      })
      echarts.init(this.$refs.faultType).setOption({
        title: {
          text: '故障类型',
          x: 'right'
        },
        tooltip: {},
        aria: {
          show: true
        },
        series: [
          {
            name: '故障类型',
            type: 'pie',
            data: response.data.data.type
          }
        ]
      })
      echarts.init(this.$refs.faultClass).setOption({
        title: {
          text: '故障级别',
          x: 'center'
        },
        tooltip: {},
        aria: {
          show: true
        },
        series: [
          {
            name: '故障级别',
            type: 'pie',
            data: response.data.data.class
            // color: ['rgb(238, 102, 102)', 'rgb(250, 200, 88)', 'rgb(145, 204, 117)', 'rgb(115, 192, 222)', 'rgb(84, 112, 198)']
          }
        ]
      })
      echarts.init(this.$refs.faultStatus).setOption({
        title: {
          text: '故障状态',
          x: 'center'
        },
        tooltip: {},
        aria: {
          show: true
        },
        series: [
          {
            name: '故障状态',
            type: 'pie',
            data: response.data.data.status
            // color: ['rgb(250, 200, 88)', 'rgb(145, 204, 117)', 'rgb(238, 102, 102)']
          }
        ]
      })
      hideLoading()
    }).catch((err) => {
      if (err.response.data.code === 401) {
        this.$router.replace({ name: 'login' })
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg + '请重新登陆!')
        })
        localStorage.clear()
        hideLoading()
      }
      hideLoading()
    })
    hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 20px;
}
</style>
