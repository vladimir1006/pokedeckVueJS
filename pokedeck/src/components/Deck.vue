<script setup>
    import { useRoute} from 'vue-router'
    import { getDeck } from '@/services/decks.services';
    import {getCardById} from '@/services/cards.services';
    import { ref } from 'vue';
    import CardTemplate from './CardTemplate.vue';
    const id = useRoute().params.id;
    console.log(id);
    const name = ref("");
    const cards = ref([])
    const cardDico = [];
    getDeck(id).then(response => {
        
        name.value = response.name;
        console.log(name)
        console.log(response)
        cards.value = response.cards;
        for(let i = 0; i < response.cards.length; i++){
            getCardById(response.cards[i]).then(ele =>{
                cardDico.push(ele)
            })
            //console.log(response.cards[i])
        }
        //console.log(cardDico)
        
        //console.log(cards)
        //cards.push(response.cards);
        //console.log(cards);
    });

    
</script>

<template>
    <div class="deck-view">
        <h1>{{name}}</h1>
        <ul>
            <CardTemplate v-for="card in cardDico" :key="card.id" :card="card" />
        </ul>
    </div>  
</template>

<style scoped>

</style>