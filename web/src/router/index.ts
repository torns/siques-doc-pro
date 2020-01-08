import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostEdit from "../views/PostEdit.vue";
import store from "../store"
import Page from "../views/Page.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      { path: "/u/", name: "auth", component: Page, },
      { path: "/u/:id", name: "user", component: Page, props: true },
      { path: '', name: 'home', component: () => import('../views/Cover.vue') },
      { path: '/p/:id', name: 'posts', component: () => import('../views/Post.vue'), props: true },
      { path: '/notification', meta: { requireAuth: true }, name: 'notification', component: () => import('../views/Notification.vue') },
      {
        path: "/follow",
        name: "follow",
        component: () => import('../views/Follow.vue'),
        meta: { requireAuth: true },
      },
    ]
  },
  {
    path: "/post",
    name: "post",
    component: PostEdit,
    meta: { requireAuth: true },
  },

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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.token) {
      next()
    } else {

      store.state.loginFormVisible = true

    }
  } else {
    next()
  }

})

export default router;
