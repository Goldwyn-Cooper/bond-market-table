import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
