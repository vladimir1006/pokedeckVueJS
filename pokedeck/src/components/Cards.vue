<script setup>    
    import { getCards } from '@/services/cards.services';
    
    import { ref } from 'vue';
    import CardTemplate from './CardTemplate.vue';
    const cards = ref([]);
    getCards(0,10).then((data) => {
        cards.value = data;
    });
    console.log(cards.value);
</script>


<template>
    <div class="cards-container">
        <CardTemplate v-for="card in cards" :key="card.id" :card="card" />
    </div>
    
</template>



<style scoped>
    .cards-container {
        display: flex;
        flex-wrap: wrap;
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 10px;
        border: 1px solid red;
        border-radius: 5px;
    }
</style>
