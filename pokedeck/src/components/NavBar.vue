<script setup>
    import {RouterLink} from 'vue-router'
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cards/p/1">All Cards</RouterLink>
        <RouterLink to="/decks">My Decks</RouterLink>
        <RouterLink to="/booster">Open a booster</RouterLink>
        <RouterLink to="/trade">Trade Cards</RouterLink>
    </nav>  
</template>

<style scoped>
    nav {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100vh;
        width: 200px;
        top: 0;
        left: 0;
        background-color: black;
        position: fixed;
    }
</style>