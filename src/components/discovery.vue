<template>
  <div class="dis">
    <slider v-bind:arr="sliderArr"></slider>
    <div class="newest">
      <span class="box"></span>
      <span class="font">热门探店标签</span>
    </div>
    <div class="tagBox">
      <span><router-link to="">茶歌</router-link></span>
      <span><router-link to="">正餐</router-link></span>
      <span><router-link to="">健康</router-link></span>
      <span><router-link to="">小吃</router-link></span>
    </div>
    <div class="newest">
      <span class="box"></span>
      <span class="font">精选探店</span>
    </div>
    <div class="shopDiv">
      <list v-bind:shopArr="disShop"></list>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import slider from "./slider"
  import list from "./list"
  export default{
    name:"discovery",
    data(){
      return{
        sliderArr:[],
        disShop:[]
      }
    },
    components:{
      slider,
      list
    },
    created(){
      axios.get("http://127.0.0.1:8000/static/disslider.json").then((res)=>{
        this.sliderArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/dislistinit.json").then((res)=>{
        this.disShop=res.data.data;
      })
    },
    mounted(){
      let that=this;
      let sw=true;
      window.addEventListener("scroll",function () {
        let oneBase=1263;
        let num=0;
        if((document.body.scrollTop + window.innerHeight) >= (document.body.offsetHeight)) {
          if(document.body.scrollTop==(oneBase+(num*1530))){
            if(sw){
              sw=false;
              axios.get("http://127.0.0.1:8000/static/dislist"+num+".json").then((res)=>{
                that.disShop=that.disShop.concat(res.data.data);
                num++;
                sw=true;
              })
            }
          }
        }
      })
    }
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
  .tagBox{
    width: 94%;
    height:30px;
    margin-left: 3%;
  }
  .tagBox span{
    display: inline-block;
    margin-right: 5px;
    width: 10%;
    height:25px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
    border:1px solid gray;
  }
  .tagBox span a{
    color: #000;
    text-decoration: none;
  }
  .shopDiv{
    width: 94%;
    margin-left: 3%;
  }
</style>
