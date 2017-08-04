<template>
  <div class="enroll">
    <i class="el-icon-arrow-left ret" @click="ret"></i>
    <p class="headerP">填写手机号</p>
    <input class="tel" type="text" v-model="useName" placeholder="输入手机号">
    <div class="passBox">
      <input class="pass" type="text" maxlength="6" v-model="useTel" placeholder="输入手机验证码" >
      <span class="ver">
        获取验证码
      </span>
    </div>
    <div class="btn" @click="enr">
      下一步
    </div>
    <div class="pact">
      <input id="checkbox" type="checkbox">
      <a href="">我已阅读并同意Foodest服务条款</a>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  export default{
    name:"enroll",
    data(){
      return{
        useName:"",
        useTel:""
      }
    },
    methods:{
      ret(){
        this.$router.go(-1);
      },
      enr(){  //注册点击事件
        let tel=/^[1][34578]\d{9}$/;  //正则判断是否为手机号码
        let checked=document.getElementById("checkbox");  //服务条款前面的选择框
        //四个判断 手机号码（是否为手机号）、密码是否为空   服务条款是否为空
        if(this.useName==null){
          alert("手机号不能为空");
          return;
        }
        if(!tel.test(this.useName)){
          alert("请输入正确的手机号");
          return;
        }
        if(this.useTel==null){
          alert("验证码不能为空");
          return;
        }
        if(!checked.checked){
          alert("请阅读服务条款");
          return;
        }
        //发送请求创建新用户
        axios.post("http://localhost:6500/foodest",{
          username:this.useName,
          password:this.useTel
        }).then(()=>{
          //成功以后跳转到登录页面，此时本地临时存储下用户手机号和密码
          this.$router.push("/enter");
          sessionStorage.setItem("selfTel",this.useName);
          sessionStorage.setItem("selfPass",this.useTel);
        })
      }
    }
  }
</script>
<style>
  .enroll{
    width: 100%;
    background: #ccc;
  }
  .enroll .ret{
    position: absolute;
    top:15px;
    left:3%;
    z-index: 999;
    color: #000;
    width: 20px;
    height:35px;
  }
  .enroll .headerP{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #000;
    font-size: 22px;
  }
  .enroll .tel{
    width: 60%;
    height:40px;
    margin-left: 20%;
    margin-top: 100px;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
    background: rgba(0,0,0,0);
    color: #fff;
  }
  .enroll .passBox{
    width: 100%;
    position: relative;
  }
  .enroll .passBox .pass{
    width: 60%;
    height:40px;
    margin-left: 20%;
    margin-top: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
    background: rgba(0,0,0,0);
    color: #fff;
  }
  .enroll .passBox .ver{
    display: inline-block;
    background: #000;
    color: #fff;
    width: 30%;
    height:36px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
    position: absolute;
    right: 20%;
    top:25%;
  }
  .enroll .btn{
    width: 60%;
    height:40px;
    line-height: 40px;
    text-align: center;
    margin-left: 20%;
    margin-top: 20px;
    border: 1px solid #fff;
    background: #fff;
  }
  .enroll .pact{
    width: 100%;
    height:50px;
    margin-top: 20px;
  }
  .enroll .pact input{
    width: 30px;
    height:30px;
    border: 1px solid #000;
    margin-top: 10px;
    margin-left: 20%;
  }
  .enroll .pact a{
    color: #fff;
    position: relative;
    top:-5px;
    font-size: 14px;
  }
</style>
