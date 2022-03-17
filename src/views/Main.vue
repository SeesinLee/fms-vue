<template>
  <el-container style="height: 100vh">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'

export default {
  name: 'Main',
  components: { CommonAside, CommonHeader }
}
</script>

<style lang="scss" scoped>
.el-header {
  background: rgb(248, 248, 248);
}
.el-main {
  padding-top: 0%;
  background-color: rgb(223, 226, 226);
}
</style>
