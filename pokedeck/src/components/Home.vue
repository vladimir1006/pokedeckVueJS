<script setup>
    import {ref } from "vue";
    import CardTemplate from "./CardTemplate.vue";
    import { getCardById } from "@/services/cards.services";

    const localStoCards = ref({});
    const cards = ref([]);
    const card = ref({id: "", name: "",image: "", types: [] });
    // mettre les id en indice 
    
    // éviter les undefined
    // vraiment le ternary je t'aime
    localStoCards.value =localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : {cards : []};

    // pour pas que l'affichage du home soit vide
    if(localStoCards.value.cards.length == 0) {
        cards.value.push(card.value)
    }
    else{
        localStoCards.value.cards.forEach(element => {
        getCardById(element).then( r => {
            card.value = {id: r.id, name: r.name,image: r.image, types:r.types};
            cards.value.push(card.value)
        }
        )    
    });
    }
    
    // A SUPPRIMER
    // QUESTIONS PROFS A DEMANDER PENDANT LE COUR:
    
    // reformuler la question 2 à propos des h1 et des liens libéllé



</script>

<template>
    <h2>Cards win in boosters : </h2>
    <div class="main"> 
        <CardTemplate v-for="card in cards" v-bind:key="card" :card="card"/>
    </div>
</template>

<style scoped>  
.main{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
