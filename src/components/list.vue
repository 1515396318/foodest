<template>
  <div class="list">
    <ul >
      <li v-for="item in shopArr">
        <router-link to="/content">
          <img :src="item.coverImg"  @click="saveId(item.contentId)" alt="">
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
      saveId(Id){
        sessionStorage.setItem("useId",Id)
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
