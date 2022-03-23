<template>
  <el-row
    :gutter="20"
    class="admin"
  >
    <el-col :span="18" class="admin-col">
      <el-card class="admin-card">
        <div slot="header" class="header"><span>群组管理</span><el-button
              type="primary"
                size="mini"
                class="refresh"
                icon="el-icon-refresh"
                circle
                @click="handleRefresh"
              ></el-button>
              </div>
              <div>
              <el-button type="success" icon="el-icon-plus" plain @click="handleTouchCreate">新建分组</el-button>
              <el-dialog title="填加到分组" class="createGroup" :visible.sync="formVisible" center>
            <el-form :model="groupData">
            <el-form-item label="组名" prop="group" :label-width="formLabelWidth">
            <el-input v-model="groupData.groupName" autocomplete="off" class="inputGroup"></el-input>
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
          :data="tableData.filter(data => !search || data.group.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            label="Group"
            prop="group"
          >
          </el-table-column>
          <el-table-column
            label="Users"
            prop="username"
          >
          <template slot-scope="scope">
              <el-tag v-for="item in scope.row.username" :key="item">{{item}}</el-tag>
          </template>
          </el-table-column>
          <el-table-column align="right">
            <!--eslint-disable-next-line -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入group搜索"
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
            title="修改组名"
            :visible.sync="dialogVisible"
            width="30%"
            append-to-body
            class="edit"
            >
            <el-form
            label-position="left"
              :model="groupEdit"
              label-width="100px"
              class="editGroup"
            >
            <el-row :gutter="20">
              <el-col :span="20" :offset="4">
              <div class="oldGroupName">
                <span class="nameLable">旧组名：</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{oldName}}</span>
              </div>
              </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24"><span>&nbsp;</span></el-col>
              <el-col :span="14" :offset="4">
              <el-form-item
                label="新组名:"
                prop="newName">
                <el-input
                  type="text"
                  v-model="groupEdit.newName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              </el-col>
              </el-row>
               </el-form>
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
import groupService from '../../service/groupService'
import { showLoading, hideLoading } from '../../utils/loading.js'

export default {
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [
        {
          group: '',
          username: ''
        }
      ],
      groupData: {
        groupName: '',
        username: ''
      },
      userGroup: [],
      groupEdit: {
        oldName: '',
        newName: ''
      },
      page: 1,
      formLabelWidth: '80px',
      formVisible: false,
      dialogVisible: false,
      oldName: '',
      search: ''
    }
  },
  methods: {
    handleRefresh () {
      groupService.groupDetails().then((response) => {
        if (response) {
          this.tableData = response.data.data.data
        }
      })
    },
    handleTouchCreate () {
      this.formVisible = true
    },
    handleCreate () {
      groupService.groupCreate(this.groupData).then((response) => {
        this.$notify({
          title: '数据修改成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        groupService.groupDetails().then((response) => {
          if (response) {
            this.tableData = response.data.data.data
          }
        })
      }).catch((err) => {
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
      this.formVisible = false
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.oldName = row.group
    },
    handleConfirmEdit () {
      this.groupEdit.oldName = this.oldName
      groupService.groupUpdate(this.groupEdit).then((response) => {
        this.$notify({
          title: '数据修改成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        groupService.groupDetails().then((response) => {
          if (response) {
            this.tableData = response.data.data.data
          }
        })
      }).catch((err) => {
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
      this.dialogVisible = false
    },
    handleDelete (row) {
      this.userGroup.groupName = row.group
      groupService.groupDelete(this.userGroup).then((response) => {
        this.$notify({
          title: '数据验证成功',
          message: this.$createElement('i', { style: 'color: teal' }, response.data.msg)
        })
        groupService.groupDetails().then((response) => {
          if (response) {
            this.tableData = response.data.data.data
          }
        })
      }).catch((err) => {
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
      groupService.groupDetails().then((response) => {
        if (response) {
          this.tableData = response.data.data.data
          hideLoading()
        }
        hideLoading()
      }).catch((err) => {
        if (err.response.data.code === 401) {
          hideLoading()
          this.$router.replace({ name: 'login' })
          this.$notify.error({
            title: '数据验证错误',
            showClose: false,
            message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg + '请重新登陆!')
          })
          localStorage.clear()
        }
      })
      hideLoading()
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
