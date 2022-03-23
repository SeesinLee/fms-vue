<template>
  <el-card class="list">
    <div class="header" slot="header">
      <span>故障列表</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
            <el-button v-if="userPower == '运维'" icon="el-icon-plus" type="success" plain @click="handleCreate">添加故障</el-button>
            <el-button v-if="userPower != '运维'" icon="el-icon-plus" type="success" plain disabled>添加故障</el-button>
        </el-col>
        <el-col :span="6" :offset="10">
          <el-input
          v-model="search"
          size="mini"
          placeholder="输入故障简述进行搜索"/>
        </el-col>
      </el-row>
    <el-table
    stripe
    border
    class="list-table"
    :data="fualtList.filter(data => !search || data.faultSketch.toLowerCase().includes(search.toLowerCase()))">
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="故障简述"
      prop="faultSketch">
      <template slot-scope="scope">
      <el-button type="text" @click="handleEdit(scope.row)" >{{scope.row.faultSketch}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="故障等级">
      <template slot-scope="scope">
            <div v-if="scope.row.faultLevel=='非常严重'">
            <el-tag type="danger">{{scope.row.faultLevel}}</el-tag>
            </div>
            <div v-if="scope.row.faultLevel=='严重'">
              <el-tag type="warning">{{scope.row.faultLevel}}</el-tag>
            </div>
            <div v-if="scope.row.faultLevel=='中等'">
              <el-tag type="primary">{{scope.row.faultLevel}}</el-tag>
            </div>
            <div v-if="scope.row.faultLevel=='一般'">
              <el-tag type="info">{{scope.row.faultLevel}}</el-tag>
            </div>
            <div v-if="scope.row.faultLevel=='无影响'">
              <el-tag type="success">{{scope.row.faultLevel}}</el-tag>
            </div>
          </template>
    </el-table-column>
    <el-table-column
      label="故障类型"
      prop="faultType">
    </el-table-column>
    <el-table-column
      label="持续时间"
      prop="actualTime">
    </el-table-column>
    <el-table-column
      label="故障状态">
      <template slot-scope="scope">
            <div v-if="scope.row.status=='处理中'">
            <el-tag type="warning" effect="dark">{{scope.row.status}}</el-tag>
            </div>
            <div v-if="scope.row.status=='已恢复'">
              <el-tag type="info" effect="dark">{{scope.row.status}}</el-tag>
            </div>
            <div v-if="scope.row.status=='待确认'">
              <el-tag type="danger" effect="dark">{{scope.row.status}}</el-tag>
            </div>
          </template>
    </el-table-column>
    <el-table-column
      label="创建者"
      prop="creator">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="createdAt">
    </el-table-column>
    <el-table-column
      align="right">
      <!--eslint-disable-next-line -->
      <!-- <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入故障简述搜索"/>
      </template> -->
      <template slot-scope="scope">
        <el-button
        v-if="userPower == '运维'"
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
          v-if="userPower != '运维'"
          size="mini"
          disabled>编辑</el-button>
          <span>&nbsp;&nbsp;</span>
          <el-popconfirm
          v-if="userPower == '运维'"
            @confirm = "handleDelete(scope.row)"
            icon="el-icon-info"
            icon-color="red"
           title="确定删除吗？">
          <el-button slot="reference" size="mini" type="danger">删除</el-button>
        </el-popconfirm>
        <el-popconfirm
          v-if="userPower != '运维'"
            icon="el-icon-info"
            icon-color="red"
           title="确定删除吗？">
          <el-button slot="reference" size="mini" type="danger" disabled>删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="page">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="this.page"
        :current-page="pageNow"
        @current-change="handlePage">
        </el-pagination>
      </div>
  </el-card>
</template>

<script>
import listService from '../../service/listService.js'
import { mapMutations } from 'vuex'
import { showLoading, hideLoading } from '../../utils/loading.js'
import service from '../../utils/request.js'
import qs from 'qs'
export default {
  data () {
    return {
      fualtList: [
        {
          id: '',
          faultSketch: '',
          faultLevel: '',
          faultType: '',
          influence: '',
          actualTime: '',
          status: '',
          creator: '',
          createdAt: ''
        }
      ],
      listData: {
        id: ''
      },
      userPower: '',
      pageNow: '',
      page: 0,
      search: ''
    }
  },
  methods: {
    ...mapMutations('userModule', ['SET_LISTID']),
    handleCreate () {
      this.$router.push({ name: 'createList' })
    },
    handleEdit (row) {
      if (row.id) {
        this.SET_LISTID(row.id)
        this.$router.push({ name: 'editList' })
      }
      this.$router.push({ name: 'editList' })
    },
    handleDelete (row) {
      this.listData.id = row.id
      listService.deleteFaultList(this.listData).then((response) => {
        this.$notify({
          title: '数据验证成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        listService.getFaultLists().then((response) => {
          var a = response.data
          this.fualtList = a.data.data
        })
      }).catch((err) => {
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
    },
    handlePage (current) {
      showLoading()
      this.pageNow = current
      var a = {
        pageNum: current
      }
      var b = qs.stringify(a, { indices: false })
      service.post('/list/showList?' + b).then((response) => {
        this.fualtList = response.data.data.data
      })
      hideLoading()
    },
    pageChange (pageNow) {
      this.pageNow = pageNow
      var a = {
        pageNum: pageNow
      }
      var b = qs.stringify(a, { indices: false })
      service.post('/list/showList?' + b).then((response) => {
        this.fualtList = response.data.data.data
      })
    }
  },
  beforeUpdate () {
    localStorage.setItem('pagination', this.pageNow)
  },
  created: [
    function () {
      showLoading()
      this.pageNow = Number(localStorage.getItem('pagination')) || 1
      this.pageChange(this.pageNow)
      this.userPower = JSON.parse(localStorage.getItem('ginessential_user_info')).data.group
      listService.getFaultLists().then((response) => {
        var a = response.data
        this.fualtList = a.data.data
        this.page = a.data.total
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
    }
  ]
}
</script>

<style lang="scss" scoped>
.list {
  .header {
    font-family: "微软雅黑";
    color: dimgray;
    font-size: 25px;
  }
  margin-top: 20px;
  .list-table {
    width: 100%;
    font-size: 12px;
    margin-top: 10px;
  }
}
.page {
  margin-top: 20px;
}
.el-button {
  word-break: break-all;
  white-space: normal;
}
</style>
