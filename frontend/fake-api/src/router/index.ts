import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResponseView from '@/views/ResponseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [],
    },
    {
      path: '/:id/res',
      name: 'res',
      component: ResponseView,
    },
  ],
})

export default router
