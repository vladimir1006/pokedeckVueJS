<script setup>
import { ref,onMounted } from 'vue';
import { getBoosters } from '@/services/booster.services';
import { randomCard } from '@/utils';
import CardTemplate from './CardTemplate.vue';
import { getCardById } from '@/services/cards.services';

const boosters = ref()
const card = ref("")

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
    console.log(id);
    getBoosters().then(res => { 
        for(let i=0;i < res.length; i++){
            if(res[i]["id"] == id){
                console.log(res[i]["cards"])
                let n = randomCard(res[i]["cards"].length -1) 
                card.value = res[i]["cards"][n]
                // getCardById() dans une ref card pour le cardTemplate
                // <CardTemplate :card=card />
                console.log(res[i]["cards"][n])
            }
        }
    })
}

onMounted(async () => {
    await fetchBoosters()
    logCards() 
})

// TODO : faire le localstorage


</script>

<template>
  <ul>
    <!-- TODO: Create a template for the boosters -->
    <li v-for="booster in boosters" :key="booster">{{ booster }}
        <button @click="getCardsBooster(`${booster.id}`)">get random card</button>
    </li>
  </ul>
  <div class="result-container">
    <h3>Result Booster :</h3>
    <p>{{ card }}</p>
    </div>
</template>

<style lang="css" scoped>
.result-container{
    border:1px solid red;
}
</style>
