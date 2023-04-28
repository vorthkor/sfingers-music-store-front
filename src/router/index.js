// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/transactions',
        name: 'Transactions',
        component: () => import('@/views/HomeTransactions.vue'),
      },
      {
        path: '/clients',
        name: 'Clients',
        component: () => import('@/views/HomeClients.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
