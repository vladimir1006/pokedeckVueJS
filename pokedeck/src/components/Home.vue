<script setup>
    import {ref } from "vue";
    import CardTemplate from "./CardTemplate.vue";
    import { getCardById } from "@/services/cards.services";

    const cards = ref([]);
    const card = ref({id: "", name: "",image: "", types: [] });

    const searchCard = ref("");

    
    if(localStorage.getItem("cards") == null){
        localStorage.setItem("cards", '{"cards":[]}')
    }

    if(JSON.parse(localStorage.getItem("cards")).cards.length == 0) {
        cards.value.push(card.value)
    }
    else{
        
        JSON.parse(localStorage.getItem("cards")).cards.forEach(element => {
        getCardById(element).then( r => {
            card.value = {id: r.id, name: r.name,image: r.image, types:r.types};
            cards.value.push(card.value)
        }
        )    
    });
    }

    function searchCards(){ 
        cards.value = []
        JSON.parse(localStorage.getItem("cards")).cards.forEach(element => {
        getCardById(element).then( r => {
            if(r.name.toLowerCase().includes(searchCard.value.toLowerCase()) || r.id.toLowerCase().includes(searchCard.value.toLowerCase())){
                card.value = {id: r.id, name: r.name,image: r.image, types:r.types};
                cards.value.push(card.value)
            }
        }
        )    
    });
    }
    
</script>

<template>
    <h1>Cards : </h1>
    <input type="text" class="search-box" placeholder="Rechercher des cartes..." v-model="searchCard">
    <button class="search-button" @click="searchCards">🔍</button>
    <h2>Cards win in boosters : </h2>
    <div class="main" v-if="cards.length != 0">
        <CardTemplate v-for="card in cards" v-bind:key="card" :card="card" />
    </div>
    <div class="main" v-else>
        <h3 style="color: red;">Il ne semble pas avoir de cartes correspondant à ce nom/id : <strong>{{ searchCard }}</strong></h3>
    </div>
</template>

<style scoped>  
.main{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}
.search-box {
    width: 300px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}
.search-button {
    padding: 10px 15px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
.search-button:hover {
    background-color: #0056b3;
}

</style>
