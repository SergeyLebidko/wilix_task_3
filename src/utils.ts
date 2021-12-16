import {RATES_URL} from "./settings";
import {RatesData} from "./types";

export async function loadRates(): Promise<RatesData>{
    const response = await fetch(RATES_URL);
    const {base, rates} = await response.json();
    return {base, rates};
}