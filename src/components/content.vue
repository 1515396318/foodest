<template>
  <div>
    <h3>{{this.$router.params.Id}}</h3>
  </div>
</template>
<script>
export default{
  create(){
    console.log(sessionStorage.getItem("useId"))
  }
}
</script>
<style>

</style>
