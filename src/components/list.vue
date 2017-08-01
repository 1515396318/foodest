<template>
  <div class="list">
    <ul >
      <li v-for="item in shopArr">
        <router-link to="" @click="saveId">
          <img :src="item.coverImg" alt="">
          <span>{{item.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name:"list",
    props:["shopArr"],
    methods:{
      saveId(){
        sessionStorage.setItem("useId",this.item.contentId)
      }
    }
  }
</script>
<style>
  .list ul li{
    width: 100%;
    height:255px;
  }
  .list ul li img{
    width: 100%;
    height:100%;
  }
  .list ul li span{
    display: inline-block;
    position: relative;
    top:-48px;
    left: 15px;
    font-size: 16px;
    color: #fff;
    overflow: hidden;
  }
</style>
