<template>
  <div class="foodSearch">
    <div class="seaTop">
      <input type="text" placeholder="请输入关键字搜索菜谱、店铺、用户名" v-model="keyWord"/>
      <i class="el-icon-search" @click="search()"></i>
      <router-link to="/recommend" class="roll">取消</router-link>
    </div>
    <p class="his">
      <span class="box"></span>
      <span class="font">历史纪录</span>
      <span class="del" @click="del">清除</span>
    </p>
    <ul>
      <li v-for="item in hisArr">{{item}}</li>
    </ul>
  </div>
</template>
<script>
  import axios from "axios"
  export default{
    name:"search",
    data(){
      return{
        labArr:[],
        keyWord:"",
        hisArr:[]
      }
    },
    created(){
      this.hisArr=JSON.parse(sessionStorage.getItem("keyArr"));
    },
    methods:{
      search(){
        if(!this.keyWord){
          alert("请输入关键字");
          return;
        }else{
          let a=[];
          if(JSON.parse(sessionStorage.getItem("keyArr"))==null){
            a=[];
          }else {
            a=JSON.parse(sessionStorage.getItem("keyArr"));
          }
          a.push(this.keyWord);
          sessionStorage.setItem("key",this.keyWord);
          sessionStorage.setItem("keyArr",JSON.stringify(a));
          this.hisArr=a;
          this.$router.push("/result/"+this.keyWord)
        }
      },
      del(){
        sessionStorage.removeItem("keyArr");
        this.hisArr=[];
      }
    }
  }
</script>
<style>
  .foodSearch{
    width: 100%;
  }
  .foodSearch .seaTop{
    width: 100%;
    height:50px;
    border-bottom: 1px solid #ccc;
    position: relative;
  }
  .foodSearch .seaTop input{
    width: 78%;
    height:30px;
    margin-top: 10px;
    margin-left: 5%;
    background: #ccc;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-left: 3px;
  }
  .foodSearch .seaTop i{
    position: absolute;
    left: 78%;
    top:18px;
    color: #000;
  }
  .foodSearch .seaTop .roll{
    color: #000;
    margin-left: 4%;
    line-height: 50px;
  }
  .foodSearch .his{
    margin-left: 5%;
    margin-top: 15px;
    height:30px;
    position: relative;
  }
  .foodSearch .his .box{
    display: inline-block;
    width: 5px;
    height:26px;
    background: #000;
    margin-top: 4px;
  }
  .foodSearch .his .font{
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top:14%;
    left:3%;
  }
  .foodSearch .his .del{
    position: absolute;
    right: 5%;
    top:15%;
  }
  .foodSearch ul{
    margin-left: 5%;
  }
  .foodSearch ul li{
    height:20px;
    line-height: 20px;
    margin-top: 10px;
  }
</style>
