import fx from 'money';

export const utilService = {
    getPriceDetails,
    getLocalizedPrice,
    convertPrice,
};

function getPriceDetails(cart, delivery = 0) {
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
}

function convertPrice(price, from, to) {
    console.log('from:', from);
    console.log('to:', to);
    fx.base = 'USD';
    fx.rates = {
        ILS: 0.311583,
        EUR: 0.745101,
        GBP: 0.64771,
        USD: 1,
    };
    return fx(price).from(from).to(to);
}

function getLocalizedPrice(num, locale, currency) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);
}
