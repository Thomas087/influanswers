import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WriteYourBrief from '../views/WriteYourBrief.vue'
import PaymentConfirmation from '../views/PaymentConfirmation.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/brief',
      name: 'brief',
      component: WriteYourBrief,
    },
    {
      path: '/payment-confirmation',
      name: 'payment-confirmation',
      component: PaymentConfirmation,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

export default router
