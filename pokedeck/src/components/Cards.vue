<script setup>    
    import { getCards } from '@/services/cards.services';
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';
    const cards = ref([]);
    getCards().then(response => {
        cards.value = response.slice(0, 10);
    });
    console.log(cards.value);
</script>


<template>
    <div class="cards-container">
        <!--
            PENSEZ COMPOSANTS
            faire un component pour une cartes 
        -->
        <div v-for="card in cards" :key="card.id" class="card">
            <RouterLink :to="`/card/${card.id}`">
                <h2>{{ card.name }}</h2>
                <img :src="`${card.image}/low.png`" :alt="card.name" />
            </RouterLink>
        </div>
    </div>
</template>



<style scoped>
    .cards-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
    }
</style>
