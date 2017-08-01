<template>
  <div class="special">
    <slider v-bind:arr="speArr"></slider>
    <div class="shopDiv">
      <ul>
        <li v-for="item in shopArr">
          <p class="def">
            <img src="" alt="">
            <span class="sift">{{item.authorName}}</span>
            <span class="time">{{item.collectionNum}}</span>
          </p>
          <a href=""><img class="bgImg" :src="item.coverImg" alt=""></a>
          <h4>{{item.title}}</h4>
          <p class="intr">{{item.summary}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import slider from "./slider"
  export default{
    name:"special",
    data(){
      return{
        speArr:[],
        shopArr:[]
      }
    },
    components:{
      slider
    },
    created(){
      axios.get("http://127.0.0.1:8000/static/speslider.json").then((res)=>{
        this.speArr=res.data.data;
      }).catch((err)=>{
        console.log(err);
      });
      axios.get("http://127.0.0.1:8000/static/spelistinit.json").then((res)=>{
        this.shopArr=res.data.data;
      }).catch((err)=>{
        console.log(err);
      });
    }
  }
</script>
<style>
  .shopDiv{
    width: 100%;
    background-color: #ccc;
  }
  .shopDiv ul li{
    width: 100%;
    height:380px;
    background-color: white;
    margin-top: 10px;
    position: relative;
  }
  .shopDiv ul li .def{
    height:50px;
    line-height: 50px;
  }
  .shopDiv ul li .def .sift{
    margin-left: 15%;
  }
  .shopDiv ul li .def .time{
    position: absolute;
    right:5%;
    color: #ccc;
  }
  .shopDiv ul li .bgImg{
    width: 100%;
    height:275px;
  }
  .shopDiv ul li h4{
    position: absolute;
    left: 3%;
    bottom:18%;
    color: #fff;
  }
  .shopDiv ul li .intr{
    margin-left: 3%;
    margin-top: 5px;
    font-size: 12px;
    color: #666;
  }
</style>
