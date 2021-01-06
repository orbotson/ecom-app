import fx from 'money';

export const productService = {
    getPriceDetails,
    convertPrice,
    getProductLocalizedPrice,
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
    fx.base = 'USD';
    fx.rates = {
        ILS: 3.2084,
        USD: 1,
    };
    return fx(price).from(from).to(to);
}

function getProductLocalizedPrice(price, currLocale, prevLocale) {
    const { locale, currency } = currLocale;
    let convertedPrice;
    if (currLocale.locale !== 'en-US') {
        convertedPrice = productService.convertPrice(price, prevLocale.currency, currency);
    }
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(convertedPrice || price);
}
