<template>
  <div class="menu">
    <slider v-bind:arr="sliderArr"></slider>
    <div class="newest">
      <span class="box"></span>
      <span class="font">热门菜谱</span>
      <span class="all">全部分类</span>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in menuArr"   class="slider">
        <a href="">
          <img :src="item.imgUrl" alt="">
          <span>{{item.title}}</span>
        </a>
      </swiper-slide>
    </swiper>
    <div class="listDiv">
      <p class="pagP">
        <span @click="heat">按热度</span>
        <span @click="time">按时间</span>
      </p>
      <div class="menuList">
        <p class="listP" v-if="labShow">
          <span v-for="obj in labelArr"><a href="">{{obj.title}}</a></span>
        </p>
        <div class="shopDiv" v-for="item in shopArr">
          <img class="bgImg" :src="item.coverImg" alt="">
          <h3>{{item.title}}</h3>
          <p class="timeP">{{item.collectionNum}}</p>
          <img class="useImg" :src="item.authorCoverImg" alt="">
          <p class="useName">{{item.authorName}}</p>
          <p class="like">{{item.collectionNum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import slider from "./slider"
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    name:"menu",
    components:{
      slider
    },
    data(){
      return{
        sliderArr:[],
        menuArr:[],
        swiperOption: {
          notNextTick: false,
          pagination: '.swiper-pagination',
          slidesPerView: 4,
          centeredSlides: true,
          paginationClickable: true,
          onSlideChangeEnd: swiper => {
            this.page = swiper.realIndex+1;
            this.index = swiper.realIndex;
          }
        },
        labShow:true,
        labelArr:[],
        shopArr:[]
      }
    },
    methods:{
      heat(){
        this.labShow=true;
        axios.get("http://127.0.0.1:8000/static/menuheatinit.json").then((res)=>{
          this.shopArr=res.data.data;
        });
      },
      time(){
        this.labShow=false;
        axios.get("http://127.0.0.1:8000/static/menutimeinit.json").then((res)=>{
          this.shopArr=res.data.data;
        });
      }
    },
    created(){
      axios.get("http://127.0.0.1:8000/static/menuslider.json").then((res)=>{
        this.sliderArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/hotmenu.json").then((res)=>{
        this.menuArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/menulab.json").then((res)=>{
        this.labelArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/menuheatinit.json").then((res)=>{
        this.shopArr=res.data.data;
      });
    },
    mounted(){
      let that=this;
      let sw=true;
      window.addEventListener("scroll",function () {
        let heatOne=2039;
        let timeOne=1972;
        let num=0;
        if(document.body.scrollTop+window.innerHeight>=document.body.offsetHeight){
          if(document.body.scrollTop==(heatOne+(num*2172))){
            if(sw){
              sw=false;
              axios.get("http://127.0.0.1:8000/static/menuheat"+num+".json").then((res)=>{
                that.shopArr=that.shopArr.concat(res.data.data);
                num++;
                sw=true;
              })
            }
          }else if(document.body.scrollTop==(timeOne+(num*2172))){
            if(sw){
              sw=false;
              axios.get("http://127.0.0.1:8000/static/menutime"+num+".json").then((res)=>{
                that.shopArr=that.shopArr.concat(res.data.data);
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
    font-weight: 700;
  }
  .newest .all{
    float: right;
    margin-right: 4%;
  }
  .slider{
    height: 85px;
    margin-right: 3%;
    color: #000;
    background-color: red;
  }
  .slider a{
    width: 20%;
    height:100%;
    margin-right: 20px;
  }
  .slider a img{
    width: 100%;
  }
  .pagP{
    width: 100%;
    height:51px;
    border-bottom: 1px solid gray;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    /*background-color: red;*/
  }
  .pagP span{
    display: inline-block;
    width: 30%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 500;
  }
  .menuList{
    width: 100%;
    background-color: #ccc;
  }
  .menuList .sp{
    height:50px;
  }
  .listP{
    height:42px;
    padding: 3%;
    background-color: white;
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
  .menuList .shopDiv{
    height:352px;
    position: relative;
    background-color: white;
    margin-bottom: 10px;
  }
  .menuList .shopDiv .bgImg{
    width: 94%;
    margin-top: 15px;
    margin-left: 3%;
  }
  .menuList .shopDiv h3{
    margin-top: 15px;
    margin-left: 3%;
  }
  .menuList .shopDiv .timeP{
    margin-top: 10px;
    margin-left: 3%;
    font-size: 13px;
  }
  .menuList .shopDiv .useImg{
    width: 40px;
    height:40px;
    position: absolute;
    left:4%;
    bottom: 25%;
    border-radius: 50%;
  }
  .menuList .shopDiv .useName{
    position: absolute;
    left: 17%;
    bottom: 27%;
    color: #fff;
  }
  .menuList .shopDiv .like{
    position: absolute;
    right: 5%;
    bottom: 27%;
    color: #fff;
  }
</style>
