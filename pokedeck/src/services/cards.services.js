import { API_URL_CARDS } from "@/consts";
export function getCards() {
  return fetch(`${API_URL_CARDS}`)
    .then((response) => response.json())
}