import { API_URL_CARDS } from "@/consts";

export async function getCards(start= 0,end=10) {
  const response = await fetch(API_URL_CARDS);
  const json = await response.json();
  const cards = [];
  for(let i = start; i < end; i++){
    cards.push(json[i]);
  }
  return cards;
}

export async function getCardById(id) {
  const response = await fetch(`${API_URL_CARDS}/${id}`);
  const json = await response.json();
  return json;
}

export async function getCardsWithPagination(end){
  const response = await fetch("https://api.tcgdex.net/v2/fr/cards?pagination:page=1&pagination:itemsPerPage="+end);
  const json = await response.json();
  return json;
}
