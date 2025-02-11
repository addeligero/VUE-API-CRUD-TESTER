import { createRouter, createWebHistory } from "vue-router";
import register from "../views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
