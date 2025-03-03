import { API_URL_DECKS } from "@/consts";

export async function getDecks() {
    const response = await fetch(API_URL_DECKS);
    const json = await response.json();
    const decks = [];
    json.forEach( a => {
        decks.push(a);
    })
    return decks;
}

export async function getDeck(id) {
    const decks = await getDecks();   
    for (const deck of decks){
        if (deck.id === id) {
            return deck;
        }
    }
}   
