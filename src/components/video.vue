<template>
  <div class="video">
    <div class="vidHeader">视频</div>
    <slider v-bind:arr="sliderArr"></slider>
    <div class="newest">
      <span class="box"></span>
      <span class="font">最近更新</span>
    </div>
    <div class="lab">
      <span v-for="item in labArr">{{item.title}}</span>
    </div>
    <div class="newest">
      <span class="box"></span>
      <span class="font">最近更新</span>
    </div>
    <div class="listDiv">
      <list v-bind:shopArr="vidList"></list>
    </div>
    <tabBar></tabBar>
  </div>
</template>
<script>
  import axios from "axios"
  import tabBar from "./tabBar"
  import slider from "./slider"
  import list from "./list"
  export default{
    name:"video",
    data(){
        return {
          sliderArr:[],
          labArr:[],
          vidList:[]
        }
    },
    components:{
      slider,
      tabBar,
      list
    },
    created(){
      axios.get("http://127.0.0.1:8000/static/vidslider.json").then((res)=>{
        this.sliderArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/vidlab.json").then((res)=>{
        this.labArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/vidlistinit.json").then((res)=>{
        this.vidList=res.data.data;
      });
    }
  }
</script>
<style>
  .vidHeader{
    width: 100%;
    height:50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
  .newest{
    width: 100%;
    height:45px;
    line-height: 45px;
    background-color: #fff;
  }
  .newest .box{
    display: inline-block;
    width: 5px;
    height:20px;
    background: #000;
    position: relative;
    left: 3%;
    top: 3px;
  }
  .newest .font{
    position: relative;
    left:4%;
    font-weight: 700;
  }
  .lab{
    margin-left: 3%;
  }
  .lab span{
    display: inline-block;
    width: 12%;
    height:25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid gray;
    border-radius: 3px;
    margin-top: 5px;
    margin-right: 5px;
    font-size: 12px;
  }
  .listDiv{
    width: 94%;
    margin-left: 3%;
  }
</style>
