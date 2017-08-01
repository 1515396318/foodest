<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in arr" :key="item.id">
        <img :src=item.cover alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    name:"slider",
    data(){
      return{
        swiperOption: {
          autoplay: 3000,
          pagination : '.swiper-pagination',
          loop : true//环路
        }
      }
    },
    props:['arr']
  }
</script>
<style>
  .swiper{
    width: 100%;
    height:248px;
  }
  .swiper img{
    width: 100%;
  }
</style>
