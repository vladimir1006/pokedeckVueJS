<script setup>    
import {defineProps} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {getCardById} from '@/services/cards.services';
import {ref} from 'vue';

const card = ref({name: "",image: "", types: [] });

const route = useRoute();
const router = useRouter();
//console.log(route.params.id);
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
    
    <img :src="`${card.image}/low.png`"/>

</template>