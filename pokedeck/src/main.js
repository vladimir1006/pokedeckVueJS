import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Cards from './components/Cards.vue'
import Card from './components/Card.vue'
import TheWelcome from './components/TheWelcome.vue'
import Decks from './components/Decks.vue'
import Deck from './components/Deck.vue'

const routes = [
    {path: '/', component: App},
    {path: '/cards', component: Cards},
    {path: '/cards/:id', component: Card},
    {path: '/decks', component: Decks},
    {path: '/decks/:id', component: Deck},
    {path: '/booster', component: TheWelcome},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
