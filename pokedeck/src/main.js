import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Cards from './components/Cards.vue'
import Card from './components/Card.vue'
import Decks from './components/Decks.vue'
import Deck from './components/Deck.vue'
import Booster from './components/Booster.vue'
import Home from './components/Home.vue'
import Trade from './components/Trade.vue'

const routes = [
    {path: '/', component: Home },
    {path: '/cards/p/:page', component: Cards},
    {path: '/cards/:id', component: Card},
    {path: '/decks', component: Decks},
    {path: '/decks/:id', component: Deck},
    {path: '/booster', component: Booster},
    {path: "/trade", component: Trade}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
