import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostEdit from "../views/PostEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      { path: "/u", name: "user", component: () => import("../views/MyPage.vue") },
      { path: '', name: 'home', component: () => import('../views/Cover.vue') },
      { path: '/p/:id', name: 'posts', component: () => import('../views/Post.vue'), props: true },
    ]
  },
  {
    path: "/post",
    name: "post",
    component: PostEdit
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  }
  // {
  //   path: "/post",
  //   name: "post",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/Post.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
