<script setup>    
import {defineProps} from 'vue';
import { RouterLink } from 'vue-router';
defineProps(['card']);
</script>


<template>
    <RouterLink :to=" card.id ? `/cards/${card.id}`: '/'">
        <!-- j'adore le ternary operator, je lui boufferais bien les pieds... miam -->
        <h2>{{ card.name ? card.name : 'no card yet' }}</h2>
        <img :src="card.image ? `${card.image}/low.png` : 'https://placehold.co/245x337?text=X'" :alt="card.name" />
    </RouterLink>
</template>