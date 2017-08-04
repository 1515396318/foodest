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
      <span class="del">清楚</span>
    </p>
    <ul>
      <li v-for="item in hisArr">{{item.key}}</li>
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
          sessionStorage.setItem("key",this.keyWord)
          let keyArr=JSON.parse(sessionStorage.getItem("keyArr"));
          if(!keyArr){
            sessionStorage.setItem("keyArr",this.keyWord)
          }else {
            console.log(keyArr,this.keyWord)
            keyArr.push(this.keyWord);
            sessionStorage.setItem("keyArr",JSON.stringify(keyArr))
          }
          this.$router.push({
            path: '/result/'+this.keyWord
          });
        }
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
</style>
