export type CurrencyMapRecord = {
    [key: string]: string
}

export type RateRecord = {
    [key: string]: number
}

export type RatesData = {
    base: string,
    rates: RateRecord
}