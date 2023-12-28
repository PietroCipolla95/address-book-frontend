import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import { router } from './router.js'
import store from './state.js'

const app = createApp(App);

app.use(router)
app.use(store)
    .mount('#app')
