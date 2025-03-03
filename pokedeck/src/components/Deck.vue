<script setup>
    import { useRoute, useRouter} from 'vue-router'
    import { getDecks, getDeck } from '@/services/decks.services';
    import { ref } from 'vue';
    const id = useRoute().params.id;
    console.log(id);
    const deck = ref({});
    getDeck(id).then(response => {
        deck.value = response;
    });
    console.log(deck.value);
</script>

<template>
    <div class="deck-view">
        <h1>DeckView</h1>
    </div>  
</template>

<style scoped>

</style>