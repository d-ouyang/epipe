import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      meta: {
        title: '首页'
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("./views/Login.vue")
    },
    {
      path: "/project",
      name: 'project',
      component: () => import("./views/ProjectMg.vue")
    },
    {
      path: "/device",
      name: 'device',
      component: () => import("./views/DeviceMg.vue")
    },
    {
      path: "/hr",
      name: 'hr',
      component: () => import("./views/HumanRes.vue")
    },
    {
      path: "/mr",
      name: 'mr',
      component: () => import("./views/MaterialRes.vue")
    },
    {
      path: "/pipeline",
      name: 'pipeline',
      component: () => import("./views/PipelineMg.vue")
    }
  ]
});
