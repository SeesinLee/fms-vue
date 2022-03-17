<template>
  <el-row
    :gutter="20"
    class="home"
  >
    <el-col :span="8">
      <el-card
        shadow="hover"
        class="a"
      >
        <div class="user"> <img :src="userImg">
          <div class="userInfo">
            <p class="name">{{userInfo.data.username}}</p>
            <p class="group">{{userInfo.data.group}}</p>
            <p class="role">{{userInfo.data.role}}</p>
          </div>
        </div>
        <div class="loginfo">
          <p>登陆时间:<span>{{userInfo.data.login_time}}</span></p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userImg: require('../../assets/images/user.png')
    }
  },
  computed:
    mapState({
      userInfo: (state) => state.userModule.userInfo
    })
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
.home {
  .a {
    margin-top: 20px;
  }
}
</style>
