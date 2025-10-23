import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'


import 'bootstrap-icons/font/bootstrap-icons.css'

import '@/assets/styles/bootstrap.scss'


createApp(App).use(createPinia()).use(router).mount('#app')
