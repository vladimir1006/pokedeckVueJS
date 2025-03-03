<script setup>
    import {RouterLink} from 'vue-router'
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cards">All Cards</RouterLink>
        <RouterLink to="/decks">My Decks</RouterLink>
        <RouterLink to="/booster">Open a booster</RouterLink>
    </nav>  
</template>
