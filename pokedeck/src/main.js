import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createWebHistory, createRouter} from 'vue-router'
import TheWelcome from './components/TheWelcome.vue'

const routes = [
    {path: '/', component: App},
    {path: '/cards', component: TheWelcome},
    {path: '/decks', component: TheWelcome},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
