export const calculateMF = (take_times_per_day, take_grams, take_days, formula_weight) => {
    return Math.ceil((+take_times_per_day * +take_grams * +take_days) / +formula_weight)
}

////////
export const multiplication_factor = (total_grams, formula_weight) => {

    return Math.ceil(total_grams / formula_weight)
}

export const herbs_cost = (formula_cost = 0, multiplication_factor = 0) => {

    return ((isNaN(formula_cost) ? 0 : formula_cost) * (isNaN(multiplication_factor) ? 0 : multiplication_factor)).toFixed(2)
}

export const total_price = (herbs_cost = 0, markup = 0, fulfillment_fee = 0, delivery_cost = 0) => {
    return (((isNaN(herbs_cost) ? 0 : herbs_cost) * markup) + fulfillment_fee + delivery_cost).toFixed(2)
}
