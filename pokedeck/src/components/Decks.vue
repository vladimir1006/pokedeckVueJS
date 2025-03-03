<script setup>
    import { getDecks } from '@/services/decks.services';
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    const decks = ref([]);
    getDecks().then(response => {
        decks.value = response;
    });
    console.log(decks.value);
</script>


<template>
    <div class="decks">
        <!--
            PENSEZ COMPOSANTS
            faire un component pour un deck  
        -->
    <div v-for="deck in decks" :key="deck.id" class="deck">
        <RouterLink :to="`/decks/${deck.id}`">
            <h3>{{ deck.name }}</h3>
        </RouterLink>
    </div>
    </div>
</template>

<style scoped>

</style>