<script setup>
    import { getDecks,addDeckAPI } from '@/services/decks.services';
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { randomId } from '@/utils';
import { getCardById } from '@/services/cards.services';
    const decks = ref([]);
    getDecks().then(response => {
        decks.value = response;
    });

    const name = defineModel('name');
    const selectedCards = defineModel('selectedCards', { default: [] });

    const cards = ref([]);
    const nameCards = ref([]);

    cards.value =JSON.parse(localStorage.getItem("cards"));

    cards.value.cards.forEach(c => {
        getCardById(c).then(card =>{
            nameCards.value.push({id: card.id, name: card.name})
        })
    })


    const errorMessage = ref("");

    function addDeck(){
        if(!name.value ){
            errorMessage.value = "The name must not be empty"
            return;
        }
        if(selectedCards.value.length == 0){
            errorMessage.value = "You must select atleast one card."
            return;
        }

        // TODO: FAIRE AVEC AJOUT DE CARDS DANS LE FORM 
        const deck = {idUser:  randomId(), name: name.value, cards:selectedCards.value};
        addDeckAPI(deck)
        name.value = ""
        errorMessage.value = ""
    }

</script>


<template>
    <div class="main">
    <div class="decks">
        <form @submit.prevent="addDeck">
        <input type="text" v-model="name" placeholder="name">
        <div v-for="card in nameCards" :key="card">
            <input type="checkbox" :value="card.id" v-model="selectedCards"> {{ card.name }}
        </div>
        <button type="submit">Add Deck</button>
        <p style="color:red;">{{ errorMessage }}</p>
    </form>
    <div v-for="deck in decks" :key="deck.id" class="deck">
        <RouterLink :to="`/decks/${deck.id}`">
            <h3>{{ deck.name }}</h3>
        </RouterLink>
    </div>
    </div>
    </div>


</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin: 0 auto;
}

input[type="text"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}
input[type="checkbox"] {
    margin-right: 10px;
    transform: scale(1.2);
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}

p {
    margin: 0;
}
</style>