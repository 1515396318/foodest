<template>
  <div class="result">
    <i class="el-icon-arrow-left ex"></i>
    <p class="titleP">{{Title}}</p>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        Title:""
      }
    },
    created(){
      this.Title=sessionStorage.getItem("key")
    }
  }
</script>
<style>
  .result{
    width:100%;
  }
  .result .ex{
    position: absolute;
    top:15px;
    left: 3%;
  }
  .result .titleP{
    height:50px;
    line-height: 50px;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #ccc;
    font-weight: 500;
    font-size: 20px;
  }
</style>
