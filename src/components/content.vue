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
    <p class="userNews">
      <img :src="obj.authorCoverImg" alt="">
      <span>{{obj.authorName}}</span>
    </p>
    <div class="refDiv">

    </div>
    <div class="labDiv">
      <span v-for="item in labArr">{{item}}</span>
    </div>
    <div class="comment">
      <div class="newest">
        <span class="box"></span>
        <span class="font">评论区</span>
      </div>
      <div class="com">
        <span>暂时没有数据哦</span>
      </div>
    </div>
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
      labArr:[]
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
      let conDiv=document.getElementsByClassName("refDiv")[0];
      conDiv.innerHTML=this.obj.newsContent;
      this.labArr=this.obj.label.split(",");
      console.log(typeof this.labArr)
    })
  },
  mounted(){

  }
}
</script>
<style>
  .ret{
    position: absolute;
    top:15px;
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
  .content .refDiv{
    margin-left: 3%;
    margin-top: 10px;
  }
  .content .userNews{
    width: 100%;
    height:60px;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    display: flex;
    justify-content: center;
  }
  .content .userNews img{
    width: 40px;
    height:40px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .content .userNews span{
    margin-left: 15px;
  }
  .content .labDiv{
    width: 100%;
  }
  .content .labDiv span{
    display: inline-block;
    width: auto;
    height:30px;
    padding: 0 10px;
    line-height: 30px;
    text-align: center;
    border: 1px solid gray;
    border-radius: 5px;
    margin-left: 3%;
    font-size: 12px;
    font-weight: 400;
  }
  .comment .newest{
    width: 100%;
    height:50px;
    line-height: 50px;
    background-color: #fff;
    font-weight: 700;
  }
  .comment .newest .box{
    display: inline-block;
    width: 5px;
    height:20px;
    background: #000;
    position: relative;
    left: 3%;
    top: 5px;
  }
  .comment .newest .font{
    position: relative;
    left:4%;
  }
  .comment .com{
    width: 100%;
    text-align: center;
  }
  .comment .com span{
    color: #ccc;
    margin-top: 100px;
  }
</style>
