import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyAlert from '@/components/MyAlert.vue'

createApp(App).component('my-alert', MyAlert).use(store).use(router).mount('#app')
