<template>
  <div class="content">
    <i class="el-icon-arrow-left ret" @click="ret"></i>
    <div class="video" v-if="videoShow">
      <video :src="obj.videoUrl" controls :poster="obj.coverImg"></video>
    </div>
    <div class="bgImg" v-if="!videoShow">
      <img :src="obj.coverImg" alt="">
    </div>
    <h2>{{obj.title}}</h2>
  </div>
</template>
<script>
  import axios from "axios"
  export default{
  name:"content",
  data(){
    return{
      obj:{},
      videoShow:false,
    }
  },
  methods:{
    ret(){
      this.$router.go(-1)
    }
  },
  created(){
    axios.get("http://127.0.0.1:8000/static/"+sessionStorage.getItem("useId")+".json").then((res)=>{
      this.obj=res.data.data;
      if(this.obj.videoUrl!=null){
        this.videoShow=true;
      }
      console.log(this.obj.newsContent)
    })
  },
  mounted(){
    let that=this;
  }
}
</script>
<style>
  .ret{
    position: absolute;
    top:20px;
    left:3%;
    z-index: 999;
    color: #000;
    width: 20px;
    height:35px;
  }
  .video{
    width: 100%;
  }
  .video video{
    width: 100%;
  }
  .video video img{
    width: 100%;
  }
  .bgImg{
    width: 100%;
  }
  .bgImg img{
    width: 100%;
  }
  .content h2{
    text-align: center;
    font-size: 16px;
    margin-top: 30px;
  }
</style>
