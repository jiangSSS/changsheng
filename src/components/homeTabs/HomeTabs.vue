<template>
  <div class="homeTabs">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/workBench">工作台</el-menu-item>
    </el-menu>
    <!-- <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1" @click="toHome">首页</el-menu-item>
      <el-menu-item index="2" @click="towork">工作台</el-menu-item>
    </el-menu> -->
  </div>
</template>
<script>
export default {
  name: "HomeTabs",
  data() {
    return {
      activeIndex: "/home"
    };
  },
  created() {
    let path = this.$route.path;
    this.activeIndex = path;
  },
  methods: {
    toHome() {
      this.$router.push({ name: "Home" });
    },
    towork() {
      this.$router.push({ name: "WorkBench" });
    }
  }
};
</script>
<style lang="less">
  .homeTabs{
    margin: 0 auto;
    text-align: center;
  }
</style>
