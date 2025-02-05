import { createRouter, createWebHistory } from "vue-router";
import register from "../views/Auth/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "register",
      component: register,
    },
  ],
});

export default router;
