import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WriteYourBrief from '../views/WriteYourBrief.vue'
import PaymentConfirmation from '../views/PaymentConfirmation.vue'
import Login from '../views/Login.vue'
import DemoReport from '../views/DemoReport.vue'
import DemoTranscripts from '../views/DemoTranscripts.vue'

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
    {
      path: '/demo-report',
      name: 'demo-report',
      component: DemoReport,
    },
    {
      path: '/demo-transcripts',
      name: 'demo-transcripts',
      component: DemoTranscripts,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (e.g., browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // Otherwise, scroll to top
    return { top: 0 }
  },
})

export default router
