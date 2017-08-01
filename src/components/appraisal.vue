<template>
  <div class="sal">
    <slider v-bind:arr="sliderArr"></slider>
    <div class="newest">
      <span class="box"></span>
      <span class="font">热门评测标签</span>
    </div>
    <p class="listP">
      <span v-for="obj in labelArr"><a href="">{{obj.title}}</a></span>
    </p>
    <div class="shopDiv">
      <list v-bind:shopArr="salShop"></list>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import slider from "./slider"
  import list from "./list"
  export default{
    name:"sal",
    data(){
      return{
        sliderArr:[],
        labelArr:[],
        salShop:[]
      }
    },
    components:{
      slider,
      list
    },
    created(){
      axios.get("http://127.0.0.1:8000/static/salslider.json").then((res)=>{
        this.sliderArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/sallab.json").then((res)=>{
        this.labelArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/sallistinit.json").then((res)=>{
        this.salShop=res.data.data;
      });
    },
  }
</script>
<style>
  .newest{
    width: 100%;
    height:50px;
    line-height: 50px;
    background-color: #fff;
    font-weight: 700;
  }
  .newest .box{
    display: inline-block;
    width: 5px;
    height:20px;
    background: #000;
    position: relative;
    left: 3%;
    top: 5px;
  }
  .newest .font{
    position: relative;
    left:4%;
  }
  .listP{
    height:40px;
    margin-left: 3%;
  }
  .listP span{
    display: inline-block;
    width: 13%;
    height:25px;
    line-height: 25px;
    text-align: center;
    margin-top: 15px;
    margin-right: 5px;
    border: 1px solid ;
  }
  .listP span a{
    color: #000;
  }
  .shopDiv{
    width: 94%;
    margin-left: 3%;
  }
</style>
