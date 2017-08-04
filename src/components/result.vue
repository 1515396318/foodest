<template>
  <div class="result">
    <h1>123456</h1>
  </div>
</template>
<script>
  export default{
    created(){
      console.log(sessionStorage.getItem("key"))
    }
  }
</script>
<style>

</style>
