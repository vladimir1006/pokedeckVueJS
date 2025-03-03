import { API_URL_CARDS } from "@/consts";
export async function getCards() {
  const response = await fetch(API_URL_CARDS);
  const json = await response.json();
  const cards = [];
  json.forEach((a) => {
      cards.push(a);
  })
  return cards;
}