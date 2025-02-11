import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (!to.meta.requiresAuth && isAuthenticated && to.path !== "/home") {
    next("/home");
  } else {
    next();
  }
});

export default router;
