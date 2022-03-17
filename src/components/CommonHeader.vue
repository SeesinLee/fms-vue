<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        type="info"
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread" >
  <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{path: item.path}">{{item.label}}</el-breadcrumb-item>
  </el-breadcrumb>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
  <div class="search">
    <el-input size="mini" class="input" v-model="name"  placeholder="Search for something...(Press Enter to jump page)" @keyup.enter.native="handle">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
    </div>
    <div class="r-content">
      <el-dropdown
        szie="mini"
        @command="handleCommand"
      >
      <el-row :gutter="20">
        <el-col :span="13">
          <h3 class="name">{{userInfo.data.username}}</h3>
          </el-col>
          <el-col :span="8">
          <img
            :src="userImg"
            class="user"
          ></el-col>
          </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-close"
            command="logout"
          >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import userService from '@/service/userService'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      userImg: require('../assets/images/user.png'),
      tLists: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'home'
        }
      ],
      name: ''
    }
  },
  computed:
    mapState({
      userInfo: (state) => state.userModule.userInfo,
      tags: state => state.tab.tablesList
    }),
  methods: {
    handleMenu () {
      this.$store.commit('collagseMenu')
    },
    ...mapMutations('userModule', ['SET_TOKEN', 'SET_USERINFO']),
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      } else {
        this.userinfo()
      }
    },
    logout () {
      userService.logout().then(() => {
        // 清除token,清除用户信息
        this.$router.replace({ name: 'login' })
        this.SET_TOKEN('')
        this.SET_USERINFO('')
        localStorage.clear()
      })
    },
    userinfo () {
      this.$router.replace({ name: 'user' })
    },
    handle () {
      this.$router.push({ name: this.name })
      this.name = ''
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    margin-top: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .name {
    color: rgb(88, 88, 94);
    font-family: "SimSuncss";
    font-style: normal;
    font-weight: 500;
  }
}
.input ::v-deep {
  .el-input__inner {
    font-size: 15px;
    background-color: rgb(248, 248, 248);
    width: 500px;
    border: 0;
    border-radius: 0px;
  }
}
</style>
