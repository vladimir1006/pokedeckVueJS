import { API_URL_BOOSTER } from "../consts";
export async function getBoosters(){
  const response = await fetch(API_URL_BOOSTER);
  const json = await response.json();
  return json;
}