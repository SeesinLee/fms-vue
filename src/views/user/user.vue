<template>
  <div class="main">
    <el-card>
      <div>
        <el-row :gutter="20">
          <el-col :span="4" :offset="1">
              <div class="userIcon"><img :src="userImg"></div>
          </el-col>
          <!-- <el-col :span="24"><div>&nbsp;</div></el-col> -->
          <el-col :span="12" :offset="4">
            <el-card>
              <el-form :label-position="labelPosition" label-width="80px" class="userInfo">
              <el-form-item label="用户名">
                <div class="name">{{userInfo.username}}</div>
              </el-form-item>
              <el-form-item label="群组">
                <div class="group">{{userInfo.group}}</div>
              </el-form-item>
              <el-form-item label="角色">
                <div class="role">{{userInfo.role}}</div>
              </el-form-item>
              <el-form-item label="登陆时间">
                <div class="loginTime">{{userInfo.login_time}}</div>
              </el-form-item>
            </el-form>
            </el-card>
          </el-col>
          <el-col :span="24"><div>&nbsp;</div></el-col>
          <el-col :span="12">
            <el-card class="password">
              <el-collapse accordion>
                <el-collapse-item title="修改密码">
          <el-form :label-position="labelPosition" label-width="80px" class="passwordForm" :model="passwordEdit" status-icon :rules="rules" ref="passwordEdit">
            <el-form-item label="原密码" class="old" prop="oldPassword">
              <el-input v-model="passwordEdit.oldPassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" class="new" prop="newPassword">
              <el-input v-model="passwordEdit.newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" class="confirm" prop="correctPassword">
              <el-input v-model="passwordEdit.correctPassword" type="password"></el-input>
            </el-form-item>
            <div class="button">
            <el-button type="info" @click="resetForm('passwordEdit')">取消</el-button>
            <el-button type="success" @click="submitForm('passwordEdit')">确定</el-button>
            </div>
          </el-form>
          </el-collapse-item>
          </el-collapse>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import userService from '../../service/userService.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordEdit.correctPassword !== '') {
          this.$refs.passwordEdit.validateField('correctPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordEdit.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        correctPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      userImg: require('../../assets/images/user.png'),
      labelPosition: 'left',
      passwordEdit: {
        oldPassword: '',
        correctPassword: '',
        newPassword: '',
        username: ''
      },
      userInfo: {
        username: '',
        group: '',
        role: '',
        login_time: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var u = JSON.parse(localStorage.getItem('ginessential_user_info'))
          this.passwordEdit.username = u.data.username
          userService.password(this.passwordEdit).then((response) => {
            this.$notify.success({
              title: '数据验证成功',
              showClose: false,
              message: this.$createElement('i', { style: 'color: teal' }, response.data.msg + ',请重新登陆!')
            })
            this.$router.replace({ name: 'login' })
            localStorage.clear()
          }).catch((err) => {
            if (err.response.data.code === 401) {
              this.$router.replace({ name: 'login' })
              this.$notify.error({
                title: '数据验证错误',
                showClose: false,
                message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg + '请重新登陆!')
              })
              localStorage.clear()
            }
            this.$notify.error({
              title: '数据验证错误',
              showClose: false,
              message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg + '请重新登陆!')
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created: [
    function () {
      var u = JSON.parse(localStorage.getItem('ginessential_user_info'))
      this.userInfo = u.data
    }
  ]
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 20px;
  width: 80%;
  .userIcon {
    img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      margin-right: 40px;
    }
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .userInfo {
    margin-top: 40px;
    width: 500px;
    margin-bottom: 40px;
    margin-left: 30px;
    .name {
      font-size: 30px;
    }
    .group {
      font-family: "STHeiti ";
      font-size: 20px;
      color: rgb(109, 109, 109);
    }
    .role {
      font-family: "STHeiti ";
      font-size: 20px;
      color: rgb(45, 86, 124);
    }
  }
  .password {
    .passwordForm {
      margin-left: 30px;
      .old {
        margin-top: 40px;
        width: 80%;
      }
      .new {
        width: 80%;
      }
      .confirm {
        width: 80%;
      }
      .button {
        margin-left: 330px;
      }
    }
  }
}
</style>
