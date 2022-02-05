import Vue from "vue";
import Router from "vue-router";
import { removeToken } from "@/store/utils/auth.js";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

// const Page404 = () => import("@/views/pages/Page404");
// const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");
const Users = () => import("@/views/Users/listUsers");
const Tags = () => import("@/views/Tags/listTags");
const Create = () => import("@/views/Create/Create");
const Log = () => import ("@/views/Log/listLog")
const newKonten = () => import("@/views/Konten/listKonten");

Vue.use(Router);

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard
        },
        {
          path: "users",
          name: "Users",
          component: Users
        },
        {
          path: "tags",
          name: "Tags",
          component: Tags
        },
        {
          path: "create",
          name: "Create",
          component: Create
        },
        {
          path: "new",
          name: "New",
          component: newKonten
        },
        {
          path: "log",
          name: "Log",
          component: Log
        }
      ]
    },
    // {
    //   path: "/pages",
    //   redirect: "/pages/404",
    //   name: "Pages",
    //   component: {
    //     render(c) {
    //       return c("router-view");
    //     }
    //   },
    //   children: [
    //     {
    //       path: "404",
    //       name: "Page404",
    //       component: Page404
    //     },
    //     {
    //       path: "500",
    //       name: "Page500",
    //       component: Page500
    //     }
    //   ]
    // }
  ]
});

var token = localStorage.getItem("MosotoPassport");
router.beforeEach((to, from, next) => {
  // console.log(token, "<<");
  if (!token) {
    if (to.path != "/" && to.path != "/daftar" && to.path != "/login") {
      next({
        path: "/login"
      });
    } else{
      next();
    }
  } else if (token) {
    if (to.path == "/logout") {
      localStorage.clear();
      removeToken();
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
