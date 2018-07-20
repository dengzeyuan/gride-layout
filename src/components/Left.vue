<template>
  <!-- <el-container style="height: 500px; border: 1px solid #eee"> -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']" :default-active='activeIndex' router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>拖拽布局</template>
        <el-menu-item-group>
          <template slot="title">vue-gride-layout</template>
          <el-menu-item index="/index">vue-grid-layout</el-menu-item>
          <!-- <el-menu-item index="/second">选项2</el-menu-item> -->
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">模拟vue-drag-zone组件布局</template>
          <el-menu-item index="/commandrag">用于拖动区改变大小</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">普通决对定位拖拽</template>
          <el-menu-item index="/commanabsolute">absolute的drag</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">vuedragzone</template>
          <el-menu-item index="/vuedragzone">vuedragzone</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">dndgrid</template>
          <el-menu-item index="/dndgrid">可拖动和可调整的盒子布局</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
<!-- </el-container> -->
</template>
<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
//  .el-aside {
//   color: #333;
// }
</style>
