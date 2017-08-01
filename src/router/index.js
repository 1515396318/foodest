import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import recommend from "@/components/recommend"
import discovery from "@/components/discovery"
import menu from "@/components/menu"
import appraisal from "@/components/appraisal"
import special from "@/components/special"
import video from "@/components/video"
import find from "@/components/find"
import userConter from "@/components/userConter"
import search from "@/components/search"
import content from "@/components/content"
import enroll from "@/components/enroll"
import enter from "@/components/enter"
import Element from "element-ui"

Vue.use(Element)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/recommend"
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path:"/recommend",
          component: recommend
        },
        {
          path:"/discovery",
          component: discovery
        },
        {
          path:"/menu",
          component: menu
        },
        {
          path:"/appraisal",
          component: appraisal
        },
        {
          path:"/special",
          component: special
        }
      ]
    },
    {
      path:"/video",
      component: video
    },
    {
      path:"/find",
      component: find
    },
    {
      path:"/userCenter",
      component: userConter
    },
    {
      path:"search",
      component: search
    },
    {
      path:"/content",
      name:"Content",
      component:content
    },
    {
      path:"/enroll",
      name:"enroll",
      component:enroll
    },
    {
      path:"/enter",
      name:"enter",
      component:enter
    }
  ]
})
