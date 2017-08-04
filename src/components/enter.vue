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
      <el-input v-model="userName" type="text" placeholder="输入手机号" icon="" class="userName"></el-input>
      <el-input v-model="userPass" type="password" placeholder="密码" icon="" class="userPass"></el-input>
      <p class="userBtn" @click="ent">立即登录</p>
      <p><router-link to="/enroll" class="enrollBtn">注册</router-link></p>
      <p class="forget"><router-link to="/forget">忘记密码</router-link></p>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  export default{
    data(){
      return{
        userName:sessionStorage.getItem("selfTel"),  //先去本地临时存储找一下看有没有用户手机号和密码
        userPass:sessionStorage.getItem("selfPass")
      }
    },
    beforeCreate(){
      //模板渲染之前，先去本地临时存储中找一下有没有用户id名
      //如果用户id名存在，就跳转到个人购物车页面
      let selfId=sessionStorage.getItem("selfId");
      if(selfId){
        this.$router.push("/userConter")
      }
    },
    methods:{
      ent(){  //点击登录事件
        //两个判断 用户手机号和密码是否为空
        if(this.userName==null){
          alert("请输入手机号");
          return;
        }
        if(this.userPass==null){
          alert("请输入密码");
          return;
        }
        //发送请求，用户成为登录状态
        axios.post("http://localhost:6500/foodest/login",{
          username:this.userName,
          password:this.userPass
        }).then((res)=>{
          //成功以后跳转到个人购物车页面，此时本地临时存储以下用户的id名
          this.$router.push("/userConter");
          sessionStorage.setItem("selfId",res.data.uid)
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
  }
</script>
<style>
  .enter{
    text-align: center;
    background: #ccc;
    width: 100%;
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
  .enterDiv{
    width: 100%;
  }
  .enterDiv .userName{
    width: 60%;
    margin-top: 40px;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
    background-color: rgba(0,0,0,1);
  }
  .enterDiv .userPass{
    width: 60%;
    margin-top: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
  }
  .enterDiv .userBtn{
    display: inline-block;
    margin-top: 30px;
    width: 60%;
    height:40px;
    line-height: 40px;
    background-color: #fff;
    color: #666;
  }
  .enterDiv .enrollBtn{
    display: inline-block;
    width: 60%;
    height:40px;
    line-height: 40px;
    background-color: #000;
    color: #fff;
    margin-top: 20px;
  }
  .enterDiv .forget{
    margin-top: 20px;
  }
  .enterDiv .forget a{
    color: #fff;
    text-decoration: underline;
  }
</style>
