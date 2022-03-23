<template>
  <el-row
    :gutter="20"
    class="admin"
  >
    <el-col :span="18" class="admin-col">
      <el-card class="admin-card">
        <div slot="header" class="header"><span>用户群组管理</span>
        <el-button
              type="primary"
                size="mini"
                class="refresh"
                icon="el-icon-refresh"
                circle
                @click="handleRefresh"
              ></el-button></div>
              <div> <el-button type="success" icon="el-icon-plus" plain @click="handleTouchCreate">添加到分组</el-button>
              <el-dialog title="填加到分组" class="createGroup" :visible.sync="formVisible" center>
                <el-form :model="userGroup">
                <el-form-item label="姓名" :label-width="formLabelWidth">
               <el-input v-model="userGroup.username" autocomplete="off" class="inputName"></el-input>
                </el-form-item>
                <el-form-item label="分组名" :label-width="formLabelWidth">
                <el-input v-model="userGroup.group" autocomplete="off" class="inputGroup"></el-input>
             </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer">
             <el-button @click="formVisible = false">取 消</el-button>
           <el-button type="primary" @click="handleCreate">确 定</el-button>
          </div>
          </el-dialog>
          </div>
      <div class="table">
        <el-table
          :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            label="Name"
            prop="username"
          >
          </el-table-column>
          <el-table-column
            label="Group"
            prop="group"
          >
          </el-table-column>
          <el-table-column
            label="Role"
          >
          <template slot-scope="scope">
            <div v-if="scope.row.role==a">
            <el-tag>{{scope.row.role}}</el-tag>
            </div>
            <div v-if="scope.row.role!=a">
              <el-tag type="success">{{scope.row.role}}</el-tag>
            </div>
          </template>
          </el-table-column>
          <el-table-column align="right">
            <!--eslint-disable-next-line -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入name搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button
              type="info"
                size="mini"
                class="b-edit"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-dialog
            title="编辑用户所在组"
            :visible.sync="dialogVisible"
            width="30%"
            append-to-body
            >
            <el-row :gutter="20">
              <el-col :span="16" :offset="4">
            <span>用户：</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{dialogName}}</span>
            </el-col>
            <el-col :span="24"><span>&nbsp;</span></el-col>
            <el-col :span="14" :offset="4">
            <div>
              <span>选择分组：</span>
            <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in groupNames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            </div>
            </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleConfirmEdit">确 定</el-button>
            </span>
          </el-dialog>
              <span>&nbsp;&nbsp;</span>
            <el-popconfirm
            @confirm = "handleDelete(scope.row)"
           icon="el-icon-info"
            icon-color="red"
           title="确定删除吗？"
           class="b-delete">
          <el-button slot="reference" size="mini" type="danger">删除</el-button>
        </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="this.page">
        </el-pagination>
      </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import userService from '../../service/userService'
import groupService from '../../service/groupService'
import { showLoading, hideLoading } from '../../utils/loading.js'

export default {
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      a: '用户',
      tableData: [
        {
          group: '',
          username: '',
          role: ''
        }
      ],
      userGroup: {
        group: '',
        username: ''
      },
      groupNames: [
        {
          label: '',
          value: ''
        }
      ],
      page: 1,
      value: '',
      formLabelWidth: '80px',
      formVisible: false,
      dialogVisible: false,
      dialogName: '',
      search: ''
    }
  },
  methods: {
    handleRefresh () {
      showLoading()
      userService.adminRefresh().then((response) => {
        if (response) {
          this.tableData = response.data.data.groups
          hideLoading()
        }
        hideLoading()
      })
    },
    handleTouchCreate () {
      this.formVisible = true
    },
    handleCreate () {
      showLoading()
      groupService.adminCreate(this.userGroup).then((response) => {
        this.$notify({
          title: '数据验证成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        this.tableData.push(this.userGroup)
        hideLoading()
        this.formVisible = false
      }).catch((err) => {
        hideLoading()
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
        this.userGroup.group = ''
        this.userGroup.username = ''
      })
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.dialogName = row.username
      this.value = row.group
    },
    handleConfirmEdit () {
      showLoading()
      this.userGroup.username = this.dialogName
      this.userGroup.group = this.value
      groupService.adminEdit(this.userGroup).then((response) => {
        this.$notify({
          title: '数据修改成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        userService.adminRefresh().then((response) => {
          if (response) {
            hideLoading()
            this.tableData = response.data.data.groups
          }
        })
      }).catch((err) => {
        hideLoading()
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
      this.dialogVisible = false
    },
    handleDelete (row) {
      showLoading()
      groupService.adminDelete(row).then((response) => {
        this.$notify({
          title: '数据验证成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        userService.adminRefresh().then((res) => {
          if (res) {
            hideLoading()
            this.tableData = res.data.data.groups
          }
        })
      }).catch((err) => {
        hideLoading()
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
      this.visible = false
    }
  },
  created: [
    function () {
      showLoading()
      userService.adminRefresh().then((res) => {
        if (res) {
          this.tableData = res.data.data.groups
        }
        groupService.groups().then((response) => {
          hideLoading()
          this.groupNames = response.data.data.data
        })
      }).catch((err) => {
        hideLoading()
        if (err.response.data.code === 401) {
          this.$router.replace({ name: 'login' })
          this.$notify.error({
            title: '数据验证错误',
            showClose: false,
            message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg + '请重新登陆!')
          })
          localStorage.clear()
        }
      })
    }
  ]
}
</script>

<style lang="scss" scoped>
.admin {
  margin-top: 20px;
}
.refresh {
  float: right;
}
.header {
  font-family: "微软雅黑";
  color: dimgray;
  font-size: 25px;
}
.createGroup {
  width: 1000px;
  float: left;
  margin-left: 20%;
  .inputName {
    width: 300px;
  }
  .inputGroup {
    width: 300px;
  }
}
.page {
  margin-top: 20px;
}
</style>
