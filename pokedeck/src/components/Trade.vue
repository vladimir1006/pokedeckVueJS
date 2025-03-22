<script setup>
    import {ref } from "vue";
    import { getCardById } from "@/services/cards.services";
    import CardTemplate from "./CardTemplate.vue";
    import { getCards} from "@/services/cards.services";
    import { randomCard } from "@/utils";

    const cards = ref([]);
    const card = ref({id: "", name: "",image: "", types: [] });
    const gainedCard = ref({id: "", name: "",image: "", types: [] });
    const selectedCards = ref([])
    const errorMessage = ref("")

    if(JSON.parse(localStorage.getItem("cards")).cards.length == 0) {
        // éviter que l'affichage soit vide 
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

    async function tradeCards(){
        if(selectedCards.value.length != 4){
            errorMessage.value = "veuillez sélectionner 4 cartes"
            return;
        }
        selectedCards.value.forEach( c=>{
            const index = cards.value.findIndex(card => card.id === c);
            if (index !== -1) {
                cards.value.splice(index, 1);
                const cardsLSto = JSON.parse(localStorage.getItem("cards"));
                const cardIndex = cardsLSto.cards.indexOf(c);
                if (cardIndex !== -1) {
                    cardsLSto.cards.splice(cardIndex, 1);
                    localStorage.setItem("cards", JSON.stringify(cardsLSto));
                }
                
            }
        })

        errorMessage.value = ""
        selectedCards.value = []
        // pour éviter de charger toute la terre entière
        // et trouver des cartes du fond du paquet qu'on a pas 
        const random = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        getCards(random,Number(random)+100).then(c => { 
                let n = randomCard(c.length-1) 
                const c1 = c[n]
                console.log(c)
                gainedCard.value = {id: c1.id, name: c1.name, image : c1.image , types: c.types}
                console.log(c1)
                localStorageManager(c1)
        })
    }

    function localStorageManager(card){
    const cardsLSto = localStorage.getItem("cards")? JSON.parse(localStorage.getItem("cards")) : { cards: [] };
    if (!cardsLSto.cards.includes(card.id)) {
        cardsLSto.cards.push(card.id);
    }
    localStorage.setItem("cards", JSON.stringify(cardsLSto));
    }
    
</script>

<template>
    <h1>Trade section</h1>
    <h2>Selectionner 4 cartes pour en échanger contre une nouvelle (un peu de l'arnaque en vrai)</h2>
    <p style="color:red">{{ errorMessage }}</p>
    <form @submit.prevent="tradeCards">
        <button type="submit" class="submit-button">Trade</button>
        <div v-for="card in cards" :key="card" class="cards">
            <input type="checkbox" :value="card.id" v-model="selectedCards"> {{ card.name }}
            <img :src="card.image ? `${card.image}/low.png` : 'https://placehold.co/245x337?text=X'" :alt="card.name" />
        </div>
    </form>
    <div class="result-container">
        <h2>Card traded against your four :</h2>
        <CardTemplate :key="gainedCard" :card="gainedCard"/>
    </div>
</template>

<style scoped>
.main{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.cards{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
form{
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.submit-button{
    font-size: large;
    color:black;
    background-color: darksalmon;
    border-radius: 5px;
    border: none;
    width: 200px;
    height: 50px;
}
.result-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px ;
    border:1px solid red;
}
</style>