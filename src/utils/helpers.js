export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(number / 100)
    return newNumber
}

export const getUniqueValues = (data, value) => {
    let uniqe = data.map((item) => item[value])
    if (value === 'colors') {
        uniqe = uniqe.flat()
    }
    return ['all', ...new Set(uniqe)]

}
