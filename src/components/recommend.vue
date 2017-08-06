<template>
  <div class="recommend">
    <slider v-bind:arr="sliderArr"></slider>
    <p class="firstP"><span>热门专栏</span></p>
    <div class="slideBar">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide class="slideLine">
          <a href="">
            <img src="http://image.foodest.tv/foodestContent/image/00473bb5c6494f6f8764dbf66478748b.jpg" alt="">
            <p>太阳猫美食</p>
          </a>
        </swiper-slide>
        <swiper-slide class="slideLine">
          <a href="">
            <img src="http://image.foodest.tv/foodestContent/image/00473bb5c6494f6f8764dbf66478748b.jpg" alt="">
            <p>太阳猫美食</p>
          </a>
        </swiper-slide>
        <swiper-slide class="slideLine">
          <a href="">
            <img src="http://image.foodest.tv/foodestContent/image/00473bb5c6494f6f8764dbf66478748b.jpg" alt="">
            <p>太阳猫美食</p>
          </a>
        </swiper-slide>
        <swiper-slide class="slideLine">
          <a href="">
            <img src="http://image.foodest.tv/foodestContent/image/00473bb5c6494f6f8764dbf66478748b.jpg" alt="">
            <p>太阳猫美食</p>
          </a>
        </swiper-slide>
        <swiper-slide class="slideLine">
          <a href="">
            <img src="http://image.foodest.tv/foodestContent/image/00473bb5c6494f6f8764dbf66478748b.jpg" alt="">
            <p>太阳猫美食</p>
          </a>
        </swiper-slide>
      </swiper>
    </div>
    <div class="newest">
      <span class="box"></span>
      <span class="font">最近更新</span>
    </div>
    <div class="shopDiv">
      <list v-bind:shopArr="recShop"></list>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import slider from "./slider"
  import list from "./list"
  import axios from "axios"
  import qs from "qs"
  export default{
    name:"recommend",
    data(){
        return {
          sliderArr:[],
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
          recShop:[]
        }
    },
    components:{
      slider,
      list
    },
    created(){
      axios.get("http://127.0.0.1:8000/static/recslider.json").then((res)=>{
        this.sliderArr=res.data.data;
      });
      axios.get("http://127.0.0.1:8000/static/reclistone.json").then( (res) =>{
        this.recShop=res.data.data;
      })
    },
    mounted(){
      let sw=true;
      let that=this;
      window.addEventListener('scroll',function(){
        //document.body.scrollTop  滚动条高度
        //window.innerHeight 窗口高度
        //document.body.offsetHeight  文档高度
        // 判断是否滚动到底部
        if((document.body.scrollTop + window.innerHeight) >= (document.body.offsetHeight)) {
//        第一次到底部的滚动条高度
          let oneBase=1380;
//        最开始为0；
          let num=0;
//        第一次到底部
          if(document.body.scrollTop==(oneBase+(num*1530))){
            if(sw){
              sw=false;
              axios.get("http://127.0.0.1:8000/static/reclist"+num+".json").then((res)=>{
                that.recShop=that.recShop.concat(res.data.data);
                sw=true;
                num++;
              })
            }
          }
        }
      })
    }
  }
</script>
<style>
  .firstP{
    width: 100%;
    height:50px;
    background-color: white;
    position: relative;
  }
  .firstP span{
    width: 90px;
    height:32px;
    line-height: 36px;
    text-align: center;
    background-color: #ffc50a;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .slideBar{
    width: 100%;
    overflow-x: scroll;
  }
  .slideLine{
    height: 145px;
    margin-right: 3%;
    margin-top: 3%;
    color: #000;
    position: relative;
    left: -35%;
    text-align: center;
  }
  .slideLine a{
    width: 20%;
    height:100%;
    margin-right: 20px;
    color: #000;
  }
  .slideLine a img{
    width: 100%;
    border-radius: 50%;
  }
  .newest{
    width: 100%;
    height:40px;
    line-height: 40px;
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
  }
  .shopDiv{
    width: 94%;
    margin-left: 3%;
  }
</style>
