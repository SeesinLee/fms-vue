<template>
<el-empty description="未找到该页面">
<el-button type="text" @click="handelRetrun">返回首页</el-button>
</el-empty>
</template>

<script>
export default {
  methods: {
    handelRetrun () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
