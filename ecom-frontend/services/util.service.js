//SWR fetch wrapper
// function fetcher(...args) {
//     return fetch(...args).then(res => res.json());
// }

//discount is not working well
const getPriceDetails = (cart, delivery = 0) => {
    let priceMap = { subPrice: 0, finalPrice: 0, delivery, discount: 0 };
    if (cart.length === 0) return priceMap;
    for (let product of cart) {
        const { price, sale, amount } = product;
        priceMap.subPrice += price;
        priceMap.finalPrice += (sale || price) * amount;
        sale > 0 && (priceMap.discount += price - sale);
    }
    for (let item in priceMap) {
        priceMap[item] = priceMap[item].toFixed(2);
    }
    return priceMap;
};

export const utilService = {
    getPriceDetails,
};
