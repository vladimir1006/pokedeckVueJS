<script setup>    
import {defineProps} from 'vue';
import { RouterLink } from 'vue-router';
defineProps(['card']);
</script>


<template>
    <RouterLink :to="`/cards/${card.id}`">
        <h2>{{ card.name }}</h2>
        <img :src="`${card.image}/low.png`" :alt="card.name" />
    </RouterLink>
</template>