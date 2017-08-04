<template>
  <div class="find">
    <h1>商品列表</h1>
    <div class="listDiv">
      <div class="findDiv" v-for="obj in shopArr">
        <img :src="obj.thumbnail" alt="">
        <h3 class="shopTitle">{{obj.goods_name}}</h3>
        <p class="ref">{{obj.selling_point}}</p>
        <s>￥{{obj.market_price}}</s>
        <p class="newPrice">现价:￥{{obj.goods_price}}</p>
        <div class="carBtn" @click="add(obj)">
          加入购物车
        </div>
      </div>
    </div>
    <div class="goCar">
      <router-link to="/userConter">前往我的购物车</router-link>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import tabBar from "./tabBar"
  export default{
    name:"find",
    data(){
      return {
        shopArr:[],  //用来展示商品列表
        shopIdArr:[]  //商品信息存储数组，用来购物车存储商品信息
      }
    },
    components:{
      tabBar
    },
    created(){
      //发送请求，拉去商品列表数据，成功以后把数据赋值给shopArr数组
      axios.get("http://127.0.0.1:8000/static/shoplist.json").then((res)=>{
        this.shopArr=res.data.data.goods_list;
      });
    },
    methods:{
      add(obj){ //点击加入购物车事件  参数obj为当前添加的商品
        //本地临时存储找一下有没有用户id名
        let selfId = sessionStorage.getItem("selfId");
        //给商品添加一个数量属性num
        obj.num=1;
        obj.price=obj.goods_price;
        //如果用户id名存在，说明是在登录状态，此时就要把商品信息存储到服务器上
        //否则说明用户没登陆，就要存在本地临时存储中
        if(selfId) {
          //先发送请求 获取用户在服务器上的购物车列表
          //判断购物车中有无商品，如果没有直接发送请求添加到服务器上
          //如果购物车中有商品，在进一步判断列表中有没有此次要添加的商品，有就不添加，没有就添加
          axios.get("http://localhost:6500/foodest/" + selfId).then((res) => {
            let addArr=[];
            if (res.data.shopArr.length == 0) {
              addArr.push(obj);
            }else {
              addArr=res.data.shopArr;
              addArr.push(obj);
            }
            axios.put("http://localhost:6500/foodest/" + selfId, {
              shopArr: addArr
            }).then(() => {
              addArr=[];
            }).catch(() => {
              addArr=[];
            })
          });
        }
        if(!selfId){
          //先看看本地有没有购物车列表，没有就让新数组直接添加商品，
          //如果有的话在原数组基础上添加新的商品
          let carArr=[];
          let saveArr=JSON.parse(sessionStorage.getItem("car"));
          if(saveArr==null){
            carArr.push(obj);
          }else{
            carArr=saveArr;
            carArr.push(obj);
          }
          sessionStorage.setItem("car",JSON.stringify(carArr))
        }
      }
    }
  }
</script>
<style>
  .find{
    /*width: 100%;*/
    /*background: #ccc;*/
    /*position: absolute;*/
  }
  .find h1{
    width: 100%;
    height:40px;
    line-height: 40px;
    text-align: center;
    color: #000;
    background: #fff;
    border-bottom: 1px solid #000;
  }
  .find .listDiv{
    width: 100%;
    position: relative;
  }
  .find .listDiv .findDiv{
    width: 100%;
    height:200px;
    background: #fff;
    position: relative;
    left:-3%;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
  }
  .find .listDiv .findDiv img{
    width: 30%;
    height: 160px;
    margin-left: 3%;
    margin-top: 8%;
  }
  .find .listDiv .findDiv .shopTitle{
    position:absolute;
    top:18%;
    left:38%;
  }
  .find .listDiv .findDiv .ref{
    position:absolute;
    top:47%;
    left:38%;
  }
  .find .listDiv .findDiv s{
    position:absolute;
    top:65%;
    left:38%;
  }
  .find .listDiv .findDiv .newPrice{
    position:absolute;
    bottom: 5%;
    left:38%;
    font-size: 20px;
    color: red;
  }
  .find .listDiv .findDiv .carBtn{
    position:absolute;
    bottom: 20%;
    right:0;
    width: 23%;
    height:30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #000;
    background: red;
    color: #fff;
  }
  .find .goCar{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f00;
    position: fixed;
    bottom: 0;
  }
  .find .goCar a{
    color: #fff;
  }
</style>
