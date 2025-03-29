<script setup>    
import {defineProps} from 'vue';
import { RouterLink } from 'vue-router';
defineProps(['card', 'disableLink']);
</script>


<template>
    <!-- pour éviter les redirections-->
    <div v-if="disableLink" class="card">
        <h2>{{ card.name ? card.name : 'no card yet' }}</h2>
        <img :src="card.image ? `${card.image}/low.png` : 'https://placehold.co/245x337?text=X'" :alt="card.name" />
    </div>
    <RouterLink :to=" card.id ? `/cards/${card.id}`: '/'" v-else>
        <!-- j'adore le ternary operator, je lui boufferais bien les pieds... miam -->
        <h2>{{ card.name ? card.name : 'no card yet' }}</h2>
        <img :src="card.image ? `${card.image}/low.png` : 'https://placehold.co/245x337?text=X'" :alt="card.name" />
    </RouterLink>
</template>

<style>
.disabled-link {
    pointer-events: none;
}
</style>