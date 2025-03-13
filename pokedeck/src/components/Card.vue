<script setup>    
import { useRoute } from 'vue-router';
import {getCardById} from '@/services/cards.services';
import {ref} from 'vue';

const card = ref({name: "",image: "", types: [] });


const route = useRoute();
    

getCardById(route.params.id).then( data => {
    
    card.value = {name: data.name,image: data.image, types:data.types};
    //console.log(data);
});

</script> 

<template>
    <h1>{{ card.name }}</h1>
    <h3>Types:</h3>
    <ul>
        <li v-for="type in card.types" :key="type">{{ type }}</li>
    </ul>
    
    <img :src="card.image ? `${card.image}/high.png` : 'https://placehold.co/600x820?text=X'"/>

</template>