<script setup>
import { ref,onMounted } from 'vue';
import { getBoosters } from '@/services/booster.services';
import { randomCard } from '@/utils';
import CardTemplate from './CardTemplate.vue';
import { getCardById } from '@/services/cards.services';


const boosters = ref()
const card2 = ref("")
const card = ref({id: "", name: "",image: "", types: [] });

// localstorage
if(!localStorage.getItem("cards"))
    localStorage.setItem("cards",'{"cards": []}');

getBoosters().then(ele => {
    boosters.value = ele
})


async function fetchBoosters() {
    const response = await getBoosters() 
    boosters.value = response 
}

function logCards() {
    const cardsDictionary = ref({});
    boosters.value.forEach(booster => {
        cardsDictionary[booster.name] = booster.cards;
    });
}

function getCardsBooster(id){
    //console.log(id);
    getBoosters().then(res => { 
        for(let i=0;i < res.length; i++){
            if(res[i]["id"] == id){
                console.log(res[i]["cards"])
                let n = randomCard(res[i]["cards"].length -1) 
                card2.value = res[i]["cards"][n]
                getCardById(card2.value).then( data => {
                    card.value = {id: card2.value, name: data.name,image: data.image, types:data.types};
                    localStorageManager(card.value)
                    //console.log(data);
                });
                // getCardById() dans une ref card pour le cardTemplate
                // <CardTemplate :card=card />
                
            }
        }
    })
}

onMounted(async () => {
    await fetchBoosters()
    logCards() 
})

// le mettre dans un service/class
function localStorageManager(card){
    const cardsLSto = localStorage.getItem("cards")? JSON.parse(localStorage.getItem("cards")) : { cards: [] };
    if (!cardsLSto.cards.includes(card.id)) {
        cardsLSto.cards.push(card.id);
    }
    localStorage.setItem("cards", JSON.stringify(cardsLSto));
}
</script>

<template>
    <h1>Boosters</h1>
  <ul>
    <!-- TODO: Create a template for the boosters -->
    <li v-for="booster in boosters" :key="booster" style="list-style-type: none;">
        <button @click="getCardsBooster(`${booster.id}`)"><img src="../assets/pack.jpeg" class="booster-canva"/></button>
        <strong>{{ booster.name }}</strong>
    </li>
  </ul>
  <div class="result-container">
    <h2>Result Card :</h2>
    <CardTemplate :key="card2" :card="card"/>
    </div>
</template>

<style lang="css" scoped>
ul{
    display: flex;
    justify-content: center;
    align-items: center;
}
.result-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px ;
    border:1px solid red;
}
.booster-canva{
    width: 200px;
}
</style>
