<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#C1FFC1"
  >
    <h3>FMS</h3>
    <!-- <el-menu-item
      v-for="(v) in routeData"
      :key="v.path"
      @click="clickMenu(v)"
    >
      <i :class="'el-icon-' + v.icon"></i>
      <span slot="title">{{ v.label }}</span>
    </el-menu-item> -->
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu> -->
  </el-menu>

</template>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100vh;
}
</style>
<script>
export default {
  data () {
    return {
      menus: [
        {
          path: '',
          name: '',
          icon: '',
          label: '',
          url: ''
        }
      ]
    }
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    clickMenu (v) {
      this.$router.push({ name: v.name })
      this.$store.commit('selectMenu', v)
    }
  },
  computed: {
    noChildren () {
      return this.menus.filter((item) => !item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  },
  created: [
    function () {
      var a = JSON.parse(localStorage.getItem('ginessential_user_info'))
      this.menus = a.data.menu
    }
  ]
}
</script>
