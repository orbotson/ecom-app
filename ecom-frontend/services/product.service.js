import fx from 'money';

export const productService = {
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
    fx.base = 'USD';
    fx.rates = {
        ILS: 3.2084,
        USD: 1,
    };
    return fx(price).from(from).to(to);
}

function getLocalizedPrice(num, locale, currency) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);
}

// const localeInfos = [
//     { lang: 'English', flagUrl: '/images/us.svg', langLocale: 'en-US', currency: 'USD' },
//     { lang: 'Hebrew', flagUrl: '/images/il.svg', langLocale: 'he', currency: 'ILS' },
//     // { lang: 'Arabic', flagUrl: '/images/sa.svg' },
//     // { lang: 'Chinese', flagUrl: '/images/cn.svg' },
//     // { lang: 'German', flagUrl: '/images/de.svg' },
//     // { lang: 'Spanish', flagUrl: '/images/es.svg' },
// ];

// const { lang, flagUrl, langLocale, currency } = (locale === 'en-US' && localeInfos[0]) || localeInfos[1];
