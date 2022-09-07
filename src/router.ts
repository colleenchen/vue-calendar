import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/calendar",
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
    path: "/",
    name: "form",
    component: () => import("@/layout/TodoList/form.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
