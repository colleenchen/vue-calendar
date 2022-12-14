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
    path: "/refresh",
    name: "refresh",
    component: () => import("@/layout/refresh.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
