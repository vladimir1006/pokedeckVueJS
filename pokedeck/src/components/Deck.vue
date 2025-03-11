<script setup>
    import { useRoute} from 'vue-router'
    import { getDeck } from '@/services/decks.services';
    import {getCardById} from '@/services/cards.services';
    import { ref } from 'vue';
    const id = useRoute().params.id;
    console.log(id);
    const name = ref("");
    const cards = [];
    getDeck(id).then(response => {
        
        name.value = response.name;
        response.cards.forEach(c => { 
            getCardById(c)
            cards.push(c)
        });
        cards.forEach()
        //cards.push(response.cards);
        //console.log(cards);
    });
    console.log(cards)

    
</script>

<template>
    <div class="deck-view">
        <h1>{{name}}</h1>
        <ul>
            
        </ul>
    </div>  
</template>

<style scoped>

</style>