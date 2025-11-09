import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const InfluanswersPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#6348ed',
      700: '#5238d4',
      800: '#4530b8',
      900: '#3b2a9a',
      950: '#2e1f6e',
    },
  },
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: InfluanswersPreset,
  },
})

app.use(ToastService)
app.use(createPinia())
app.use(router)

app.mount('#app')
