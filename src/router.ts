import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/components',
    name: 'components',
    component: () => import('@/components/calendar/index.vue')
  },{
    path: '/',
    name: 'curriculum',
   component: () => import('@/components/curriculum/index.vue')
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
