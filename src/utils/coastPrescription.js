export const calculateMF = (take_times_per_day, take_grams, take_days, formula_weight) => {
    return Math.ceil((+take_times_per_day * +take_grams * +take_days) / +formula_weight)
}

export const calculateTotalPrice = (MF, formula_weight, formula_cost, markup, fullfillment_fee) => {
    return !isNaN((MF * +formula_weight * +formula_cost * +markup) + +fullfillment_fee) ? ((MF * +formula_weight * +formula_cost * +markup) + +fullfillment_fee).toFixed(2) : '-'
}

export const calculateHerbCoast = (MF, formula_cost) => {
    return !isNaN(MF * +formula_cost) ?
        (MF * +formula_cost).toFixed(2) :
        '-'
}
