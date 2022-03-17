<template>
  <div
    class="main"
    :style="main"
  >
    <el-row :gutter="20">
      <el-col :span="9">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              slot="header"
              class="header"
            ><span>登陆</span></div>
            <el-form
              :model="user"
              status-icon
              :rules="rules"
              ref="user"
              label-width="100px"
              class="UserRuleForm"
            >
              <el-form-item
                label="账号"
                prop="username"
              >
                <el-input
                  type="text"
                  v-model="user.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
              >
                <el-input
                  type="password"
                  v-model="user.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击登陆"
                  placement="bottom"
                >
                  <el-button
                    type="primary"
                    @click="login"
                  >登陆</el-button>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-card>
          <div
            slot="bottom"
            class="slogin"
          ><span>fms@seesinlee(343935441@qq.com)</span></div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import userService from '@/service/userService'
import { mapMutations } from 'vuex'
import { showLoading, hideLoading } from '../../utils/loading.js'

export default {
  name: 'login',
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      },
      main: {
        // backgroundImage: 'url(' + require('../../assets/images/user.png') + ')',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center'
      }
    }
  },

  methods: {
    ...mapMutations('userModule', ['SET_TOKEN', 'SET_USERINFO', 'SET_USERGROUP']),
    login () {
      // 请求
      showLoading()
      userService.login(this.user).then((res) => {
        // 保存token
        this.SET_TOKEN(res.data.data.token)
        userService.info().then((response) => {
        // 保存用户信息
          this.SET_USERINFO(response.data.data)
          // 跳转页面
          this.$router.replace({ name: 'home' })
          hideLoading()
          this.$notify.success({
            title: '数据验证成功',
            showClose: false,
            message: this.$createElement('i', { style: 'color: teal' }, res.data.msg)
          })
        }).catch((err) => {
          hideLoading()
          console.log('err:', err.response.data.msg)
          this.$notify.error({
            title: '数据验证错误',
            showClose: false,
            message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
          })
        })
      }).catch((err) => {
        hideLoading()
        console.log('err:', err.response.data.msg)
        this.$notify.error({
          title: '数据验证错误',
          showClose: false,
          message: this.$createElement('i', { style: 'color: teal' }, err.response.data.msg)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-card {
  margin-top: 200px;
  border-radius: 30px;
  width: 450px;
}
.el-form {
  margin-top: 50px;
  margin-right: 50px;
}
.slogin {
  color: rgb(192, 196, 196);
  margin-left: 90px;
}
.header {
  font-family: "SimHei";
  font-weight: 600;
  font-size: 25px;
  color: rgb(71, 71, 71);
}
</style>
