<script setup>    
    import { getCards, getCardsWithPagination } from '@/services/cards.services';
    import { ref,watch } from 'vue';
    import CardTemplate from './CardTemplate.vue';
    const cards = ref([]);
    const numberOfCards = ref("10");

    // https://api.tcgdex.net/v2/fr/cards?pagination:page=3&pagination:itemsPerPage=10
    
    getCardsWithPagination(numberOfCards.value).then((data) => {
        cards.value = data;
        console.log(numberOfCards.value)
    });
    console.log(cards.value);


    watch(numberOfCards, async (newValue) => {
        const data = await getCardsWithPagination(newValue);
        cards.value = data;
    });

</script>


<template>

    <div class="radio-group">
        <h2>numbers of cards display: </h2>
    <input type="radio" id="val10" name="value" value="10" checked v-model="numberOfCards">
    <label for="val10">10</label>
    <input type="radio" id="val25" name="value" value="25" v-model="numberOfCards">
    <label for="val25">25</label>
    <input type="radio" id="val50" name="value" value="50" v-model="numberOfCards">
    <label for="val50">50</label>
    </div>
    <div class="cards-container">
        <CardTemplate v-for="card in cards" :key="card.id" :card="card" />
    </div>


</template>



<style scoped>
    .cards-container {
        display: flex;
        flex-wrap: wrap;
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
    .radio-group {
            display: flex;
            justify-content: start;
            gap: 20px;
            margin-top: 10px;
            margin-bottom: 10%;
        }

        input[type="radio"] {
            display: none;
        }

        label {
            font-size: 18px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        input[type="radio"]:checked + label {
            background: #007bff;
            color: white;
        }
</style>
