import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "calendar",
    component: () => import("@/components/calendar/index.vue"),
  },
  {
    path: "/curriculum",
    name: "curriculum",
    component: () => import("@/components/curriculum/index.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import("@/layout/TodoList/List.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () => import("@/layout/TodoList/form.vue"),
  },
  {
    path: "/refresh",
    name: "refresh",
    component: () => import("@/layout/refresh.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
