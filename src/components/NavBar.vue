<template>
  <div class="navbar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      :router = "true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="" @click="handleClick">登录</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {ref} from 'vue'
const route = useRoute()

const handleClick = () => {
    window.location = "http://127.0.0.1:8080"
}
</script>

<style scoped lang="scss">
.navbar{
    position: sticky;
    top: 0px;
}

.right{
    position: fixed;
    top:0;
    right: 20px;
    widows:100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
}
</style>