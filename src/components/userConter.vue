<template>
  <div class="user">
    <h1><div class="log" v-show="!exitShow" @click="log()">登录</div>我的购物车 <div class="exit" v-show="exitShow" @click="exit()">登出</div></h1>
    <div class="myCar" v-show="carShow">
      <div v-for="item in arr">
        <img :src="item.thumbnail">
        <span class="shopTitle">{{item.goods_name}}</span>
        <span class="shopPrice">￥{{item.goods_price * item.num}}</span>
        <p class="shopNum">
          <button @click="item.num<2 ? item.num=1:item.num--;add()">-</button>
          {{item.num}}
          <button @click="item.num++;add()">+</button>
        </p>
        <div class="del" @click="del(item)">删除本商品</div>
      </div>
      <div class="clo">
        <p>总计：<span class="total">{{allPrice}}</span></p>
        <button>去结算</button>
      </div>
    </div>
    <div class="sky" v-show="!carShow">
      <h2>您的购物车空空如也！！！</h2>
      <router-link to="/find">走,去逛逛</router-link>
    </div>
    <tabBar></tabBar>
  </div>
</template>
<script>
  import tabBar from "./tabBar"
  import axios from "axios"
  export default{
    name:"user",
    data(){
      return {
        arr:[],
        exitShow:"",
        carShow:"",
        num:1,
        allPrice:0,
      }
    },
    components:{
      tabBar
    },
    created(){
      //本地存储中找一下用户id名，判断是否在登录状态
      //如果登录状态，去服务器上获取购物车数据
      //如果未登录状态，到本地存储中获取购物车数据
      let selfId=sessionStorage.getItem("selfId");
      console.log(selfId);
      if(selfId){
        this.exitShow=true;
        axios.get("http://localhost:6500/foodest/"+selfId).then((res)=>{
          this.arr=res.data.shopArr;
          if(this.arr.length==0){
            this.carShow=false;
          }else{
            this.carShow=true;
            this.add();
          }
        });
      }else {
        this.arr=JSON.parse(sessionStorage.getItem("car"));
        if(this.arr.length==0){
          this.carShow=false;
        }else{
          this.carShow=true;
          this.add();
        }
      }
    },
    methods:{
      del(obj){
        //获取用户id名，查看此时是否为登录状态
        let selfId = sessionStorage.getItem("selfId");
        //从数组中删除这个商品对象
        this.arr.splice(this.arr.indexOf(obj),1);
        //如果在登录状态，重新往服务器上发送最新的数据
        if(selfId){
          axios.put("http://localhost:6500/foodest/" + selfId, {
            shopArr: this.arr
          }).then((res) => {
            this.arr=res.data.shopArr;
          }).catch(() => {
            this.arr=[];
          })
        }else {  //如果是未登录状态，本地重新存储这个商品信息数组
          sessionStorage.setItem("car",JSON.stringify(this.arr))
        }
        //如果列表都删除完了，把this.carShow变为false，让列表这个div隐藏掉
        if(this.arr.length==0){
          this.carShow=false;
        }
        //重新计算总价
        this.add();
      },
      add(){
        let aa=0;
        //循环商品列表每一项，
        for (let i in this.arr) {
          aa += this.arr[i].num * this.arr[i].goods_price;
        }
        this.allPrice = aa;
      },
      log(){
        //跳转到登录页面
        this.$router.push("/enter")
      },
      exit(){
        //发起登出请求，成功以后跳转到首页，并在本地临时存储中删除用户的id名
        axios.post("http://localhost:6500/foodest/logout").then(()=>{
          this.$router.push("/recommend");
          sessionStorage.removeItem("selfId");
        })
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .user{
    width: 100%;
  }
  .user h1{
    width: 100%;
    height:60px;
    position: relative;
    line-height: 60px;
    text-align: center;
    background: #fff;
    color: #000;
    border-bottom: 1px solid #000;
  }
  .user h1 .exit{
    display: inline-block;
    width: 18%;
    height:80%;
    line-height: 48px;
    text-align: center;
    position: absolute;
    top:10%;
    right:5%;
    border: 1px solid #000;
    font-size: 20px;
    background: #ff0;
  }
  .user h1 .log{
    display: inline-block;
    width: 18%;
    height:80%;
    line-height: 48px;
    text-align: center;
    position: absolute;
    top:10%;
    left:5%;
    border: 1px solid #000;
    font-size: 20px;
    background: #ff0;
  }
  .user .myCar{
    width: 100%;
  }
  .user .myCar div{
    width: 100%;
    height:200px;
    border-bottom: 1px solid #000;
    margin-bottom: 5px;
    position: relative;
  }
  .user .myCar div img{
    width: 30%;
    height:160px;
  }
  .user .myCar div .shopTitle{
    position:absolute;
    top:23%;
    left:38%;
  }
  .user .myCar div .shopPrice{
    position:absolute;
    top:50%;
    left:38%;
  }
  .user .myCar div .shopNum{
    position:absolute;
    top:70%;
    left:36%;
  }
  .user .myCar div .shopNum button{
    width: 20px;
    height:20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .user .myCar div .del{
    position: absolute;
    bottom: 0;
    right: 0;
    color: #f00;
    width: 30%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #000;
  }
  .user .myCar .clo{
    width: 100%;
    height:40px;
    line-height: 40px;
    font-size: 18px;
    border: 1px solid #000;
    position: relative;
  }
  .user .myCar .clo span{
    color: #f00;
  }
  .user .myCar .clo button{
    position: absolute;
    right: 0;
    top:5px;
    width: 25%;
    height:30px;
    line-height: 30px;
    color: red;
  }
  .user .sky{
    width: 100%;
    height:400px;
    text-align: center;
  }
  .user .sky h2{
    color: #f00;
    margin-top: 150px;
  }
  .user .sky a{
    display: inline-block;
    width: 22%;
    height:20px;
    line-height: 20px;
    color: #00f;
    margin-top: 50px;
  }
</style>
