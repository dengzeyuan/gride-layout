<template>
  <div class="container">
    <Header class="header"/>
    <div class='container-home'>
      <Left class="aside"/>
      <div class = 'view'>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Left from "../components/Left.vue";
export default {
  components: {
    Header,
    Left
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100vh;
  .header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    flex-shrink: 0;
    padding: 0 20px;
  }
  .container-home {
    display: flex;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    .aside {
      width: 200px;
      background-color: #dddddd;
      color: #333;
      box-sizing: border-box;
      flex-shrink: 0;
      overflow: auto;
    }
    .view {
      background-color: #e9eef3;
      color: #333;
      box-sizing: border-box;
      flex: 1;
      flex-basis: auto;
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>


