import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const Calendar = () => import('@/components/calendar/index.vue');
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'components',
    component: Calendar
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
