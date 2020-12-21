const { info, error } = require('../../services/logger.service');
const productsData = require('../../product.json');

module.exports = {
    query,
};

async function query() {
    try {
        info('Feching products...');
        console.log('products:', productsData);
        return await Promise.resolve(productsData);
    } catch (err) {
        error('Error while fetching products.', err);
    }
}
