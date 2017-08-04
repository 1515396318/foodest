<template>
  <div class="tabBar">
    <ul>
      <li><router-link to="/recommend"><p><i class="el-icon-user"></i></p><p>首页</p></router-link></li>
      <li><router-link to="/video"><p><i class="el-icon-user"></i></p><p>视频</p></router-link></li>
      <li><router-link to="/find"><p><i class="el-icon-user"></i></p><p>发现</p></router-link></li>
      <li><router-link to="/enter"><p><i class="el-icon-user"></i></p><p>个人中心</p></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tabBar{
    width: 100%;
    height:40px;
    background: white;
  }
  .tabBar ul{
    width: 100%;
    height:40px;
    color: #ddd;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: rgba(255,255,255,1);
    display: flex;
    justify-content: space-around;
  }
  .tabBar ul li{
    text-align: center;
  }
  .tabBar ul li a{
    color: gray;
  }
  .router-link-active p{
    color: #000;
  }
</style>
