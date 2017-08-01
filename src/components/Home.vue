<template>
  <div class="home">
    <!--头部，二级路由-->
    <div class="allTop">
      <ul>
        <li><router-link to="/recommend">推荐</router-link></li>
        <li><router-link to="/discovery">探店</router-link></li>
        <li><router-link to="/menu">菜谱</router-link></li>
        <li><router-link to="/appraisal">测评</router-link></li>
        <li><router-link to="/special">专题</router-link></li>
        <li><router-link to="/search"><i class="el-icon-search"></i></router-link></li>
      </ul>
    </div>
    <router-view></router-view>
    <!--底部-->
    <tabBar></tabBar>
  </div>
</template>
<script>
  import tabBar from "./tabBar"
  import axios from "axios"
  export default{
    name:"home",
    components:{
      tabBar
    }
  }
</script>
<style>
  .allTop{
    width: 100%;
    height:51px;
    background: white;
    color: black;
  }
  .allTop ul{
    height:51px;
    line-height: 51px;
    text-align: center;
    display: flex;
    justify-content: space-around;
  }
  .allTop ul li{
    height:51px;
    line-height: 51px;
  }
  .allTop ul li a{
    color: #000;
  }
  .router-link-active{
    text-decoration: underline;
  }
</style>
