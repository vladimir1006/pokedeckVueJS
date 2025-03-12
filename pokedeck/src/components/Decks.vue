<script setup>
    import { getDecks,addDeckAPI } from '@/services/decks.services';
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { randomId } from '@/utils';
    const decks = ref([]);
    getDecks().then(response => {
        decks.value = response;
    });
    console.log(decks.value);

    const name = defineModel('name');

    const errorMessage = ref("");

    function addDeck(){
        if(!name.value){
            errorMessage.value = "The name must not be empty"
            return;
        }
        const deck = {idUser:  randomId(), name: name.value, cards:[]};
        addDeckAPI(deck)
        name.value = ""
        errorMessage.value = ""
    }

</script>


<template>
    
    <div class="decks">
        <form @submit.prevent="addDeck">
        <input type="text" v-model="name" placeholder="name">
        <input type="text" placeholder="deck">
        <button type="submit">Add Deck</button>
        <p style="color:red;">{{ errorMessage }}</p>
    </form>
    <div v-for="deck in decks" :key="deck.id" class="deck">
        <RouterLink :to="`/decks/${deck.id}`">
            <h3>{{ deck.name }}</h3>
        </RouterLink>
    </div>
    </div>


</template>

<style scoped>

</style>