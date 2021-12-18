import {RATES_URL} from './settings';
import {RatesData} from './types';

export async function loadRates(): Promise<RatesData> {
    const response = await fetch(RATES_URL);

    const json = await response.json();
    if (!response.ok) throw new Error(json.error.message);

    const {base, rates} = json;
    return {base, rates};
}