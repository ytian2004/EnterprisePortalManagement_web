import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Nprogress from 'nprogress'

createApp(App)
.use(Nprogress)
.use(store)
.use(router)
.use(ElementPlus)
.mount('#app')
