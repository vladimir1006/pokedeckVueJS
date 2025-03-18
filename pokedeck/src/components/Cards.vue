<script setup>    
    import { getCardsWithPagination } from '@/services/cards.services';
    import { ref,watch } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import CardTemplate from './CardTemplate.vue';
    const cards = ref([]);
    const route = useRoute();
    const router = useRouter();

    const page = ref(route.params.page);

    const numberOfCards = ref(localStorage.getItem("nbCards") != null ? localStorage.getItem("nbCards") : 10);
    

    getCardsWithPagination(numberOfCards.value, route.params.page).then((data) => {
        cards.value = data;
        console.log(numberOfCards)
    });
    console.log(cards.value);

    function gotonextpage(){
        page.value = Number(page.value) + 1;
        router.push(`/cards/p/${page.value}`);
    }

    function gotobackpage(){
        if(page.value > 1 ){
            page.value = Number(page.value) - 1;
            router.push(`/cards/p/${page.value}`);
        }
    }

    watch(numberOfCards, async (newValue) => {
        const data = await getCardsWithPagination(newValue, route.params.page);
        localStorage.setItem("nbCards",newValue)
        cards.value = data;
    });

    
    watch(page, async (newValue) => {
        const data = await getCardsWithPagination(numberOfCards.value, newValue);
        cards.value = data;
    });

</script>


<template>
    <button @click="gotobackpage">&lt;</button>
    <select name="" id="" v-model="numberOfCards">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
    </select>
    <button @click="gotonextpage">&gt;</button>

    <div class="cards-container">
        <CardTemplate v-for="card in cards" :key="card.id" :card="card" />
    </div>
</template>



<style scoped>
    .cards-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 10px;
        border: 1px solid red;
        border-radius: 5px;
    }
    
    select {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin: 0 10px;
    }
    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
