<template>
  <div class="enter">
    <p class="headerP">
      登录
      <router-link to="/recommend" class="el-icon-close"></router-link>
    </p>
    <h1>
      Foodest
    </h1>
    <div class="enterDiv">
      <el-input type="text" placeholder="输入手机号" icon=""></el-input>
    </div>
  </div>
</template>
<script>

</script>
<style>
  .enter{
    text-align: center;
    background-color: rgba(0,0,0,0.5);
  }
  .enter .headerP{
    height: 50px;
    line-height: 50px;
    color: white;
    font-size: 22px;
    position: relative;
  }
  .enter .headerP a{
    position: absolute;
    right: 4%;
    top:13px;
    color: white;
  }
  .enter h1{
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: white;
  }
</style>
