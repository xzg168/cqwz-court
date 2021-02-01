import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/case/list",
    meta: {
      title: "案件管理"
    },
    children: [
      {
        path: "/case/list",
        name: "Case",
        meta: {
          title: "案件列表"
        },
        component: () =>
          import(/* webpackChunkName: "case" */ "../views/case/Case.vue")
      },
      {
        path: "/case/detail/:id",
        name: "Detail",
        meta: {
          title: "案件详情"
        },
        component: () =>
          import(/* webpackChunkName: "case" */ "../views/case/Detail.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    component: Home,
    meta: {
      title: "用户管理"
    },
    redirect: "/user/account",
    children: [
      {
        path: "role",
        name: "Role",
        meta: {
          title: "角色管理"
        },
        component: () =>
          import(/* webpackChunkName: "role" */ "../views/user/Role.vue")
      },
      {
        path: "account",
        name: "Account",
        meta: {
          title: "账号管理"
        },
        component: () =>
          import(/* webpackChunkName: "role" */ "../views/user/Account.vue")
      },
      {
        path: "log",
        name: "Log",
        meta: {
          title: "操作日志"
        },
        component: () =>
          import(/* webpackChunkName: "role" */ "../views/user/Log.vue")
      }
    ]
  },
  {
    path: "/system",
    name: "System",
    component: Home,
    meta: {
      title: "系统管理"
    },
    redirect: "/system/instrument",
    children: [
      {
        path: "instrument",
        name: "Instrument",
        meta: {
          title: "文书维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "role" */ "../views/system/Instrument.vue"
          )
      },
      {
        path: "product",
        name: "Product",
        meta: {
          title: "产品信息"
        },
        component: () =>
          import(/* webpackChunkName: "role" */ "../views/system/Product.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  //from 代表从哪个路径跳转而来
  // next是一个函数，next()表示方行  next('/login')表示强制跳转
  if (to.matched.length === 0) return next("/other");
  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  //console.log(tokenStr);
  if (!tokenStr) return next("/login");
  next();
});
export default router;
