<script setup>
import { ref,onMounted } from 'vue';
import { getBoosters } from '@/booster.services';
import { randomCard } from '@/utils';
const boosters = ref()
let card = []
getBoosters().then(ele => {
    boosters.value = ele
})


async function fetchBoosters() {
    const response = await getBoosters() 
    boosters.value = response 
}

function logCards() {
    boosters.value.forEach(booster => {
        console.log(`Booster: ${booster.name}`)
        booster.cards.forEach(card => {
            console.log(`- ${card}`)
        })
    })
}

onMounted(async () => {
    await fetchBoosters()
    logCards() 
})



</script>

<template>
  <ul>
    <li v-for="booster in boosters">{{ booster }}<button @click="getCardFromBooster">get random card</button></li>
  </ul>
</template>
