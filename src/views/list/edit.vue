<template>
  <div class="main">
    <el-card>
          <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="title-1">概述</div>
    </template>
        <el-row :gutter="20">
          <el-form :model="faultList" label-width="100px" v-if="userPower == '运维'">
          <el-col :span="8" :offset="8">
            <el-form-item label="故障简述" prop="faultSketch">
            <el-input v-model="faultList.faultSketch"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障等级" prop="faultLevel">
              <el-select v-model="faultList.faultLevel" filterable placeholder="请选择">
              <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障类型" prop="faultType">
            <el-select v-model="faultList.faultType" filterable placeholder="请选择">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障状态" prop="status">
            <el-select v-model="faultList.status" filterable placeholder="请选择">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10" :offset="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;故障时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-date-picker
            v-model="time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="24">
          <div>&nbsp;</div>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障影响" prop="influence">
            <el-input type="textarea" :rows="6" v-model="faultList.influence"></el-input>
            </el-form-item>
        </el-col>
        </el-form>
        <el-form :model="faultList" label-width="100px" v-if="userPower != '运维'">
          <el-col :span="8" :offset="8">
            <el-form-item label="故障简述" prop="faultSketch">
            <el-input v-model="faultList.faultSketch" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障等级" prop="faultLevel">
              <el-select v-model="faultList.faultLevel" filterable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障类型" prop="faultType">
            <el-select v-model="faultList.faultType" filterable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障状态" prop="status">
            <el-select v-model="faultList.status" filterable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10" :offset="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;故障时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-date-picker
            v-model="time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']" disabled>
          </el-date-picker>
        </el-col>
        <el-col :span="24">
          <div>&nbsp;</div>
        </el-col>
        <el-col :span="8" :offset="8">
            <el-form-item label="故障影响" prop="influence">
            <el-input type="textarea" :rows="6" v-model="faultList.influence" disabled></el-input>
            </el-form-item>
        </el-col>
        </el-form>
        </el-row>
      </el-collapse-item>
      <el-collapse-item name="2">
      <template slot="title">
          <div class="title-1">故障原因</div>
      </template>
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
        <el-input
        v-if="userPower == '运维'"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="faultList.cause">
        </el-input>
        <el-input
        v-if="userPower != '运维'"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="faultList.cause" disabled>
        </el-input>
        </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div class="title-1">解决方案</div>
    </template>
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
        <el-input
        v-if="userPower == '运维'"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="faultList.solution">
        </el-input>
        <el-input
        v-if="userPower != '运维'"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="faultList.solution" disabled>
        </el-input>
        </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="bottom">
    <el-button type="info" @click="handleCancel">取消</el-button>
    <el-button v-if="userPower == '运维'" @click="handleCommit" type="success">保存</el-button>
    <el-button v-if="userPower != '运维'" @click="handleCommit" type="success" disabled>保存</el-button>
    </div>
    </el-card>
  </div>
</template>

<script>
import listEditData from '../../utils/listEditData.js'
import listService from '../../service/listService.js'
export default {
  data () {
    return {
      activeNames: ['1', '2', '3'],
      textarea: '',
      faultList: {
        faultSketch: '',
        faultLevel: '',
        faultType: '',
        influence: '',
        duration: '',
        creator: '',
        status: '',
        cause: '',
        solution: '',
        startAt: '',
        endAt: '',
        actualTime: ''
      },
      time: [],
      preData: {
        id: ''
      },
      level: [
        {
          value: '',
          label: ''
        }
      ],
      type: [
        {
          value: '',
          label: ''
        }
      ],
      userPower: '',
      status: [
        {
          value: '',
          label: ''
        }
      ]
    }
  },
  methods: {
    handleCommit () {
      var c = this.time.reduce(function (a, b) {
        return (b - a) / (60000)
      })
      // var hour = Math.floor(c / 60)
      // var minute = Math.round(c % 60)
      this.faultList.duration = Math.round(c)
      this.faultList.actualTime = Math.floor(c / 60) + '小时' + Math.round(c % 60) + '分钟'
      this.faultList.startAt = this.time[0]
      this.faultList.endAt = this.time[1]
      this.faultList.creator = (JSON.parse(localStorage.getItem('ginessential_user_info'))).data.username
      listService.createFaultList(this.faultList).then((response) => {
        this.$notify({
          title: '数据验证成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
      }).catch((err) => {
        console.log('err:', err.response.data.msg)
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
      this.$router.push({ name: 'list' })
    },
    handleCancel () {
      this.$router.push({ name: 'list' })
    }
  },
  created: [
    function () {
      this.userPower = JSON.parse(localStorage.getItem('ginessential_user_info')).data.group
      this.level = listEditData.level
      this.type = listEditData.type
      this.status = listEditData.status
      const a = localStorage.getItem('ginessential_user_listId')
      if (a) {
        this.preData.id = JSON.parse(a)
        listService.editeFaultList(this.preData).then((response) => {
          this.faultList = response.data.data.data
          this.time = [new Date(response.data.data.data.startAt), new Date(response.data.data.data.endAt)]
        })
      }
    }
  ],
  destroyed: [
    function () {
      localStorage.removeItem('ginessential_user_listId')
    }
  ]
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 20px;
  .title-1 {
    font-family: "微软雅黑";
    color: dimgray;
    font-size: 20px;
  }
  .bottom {
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
