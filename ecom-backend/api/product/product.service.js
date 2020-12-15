const { info, error } = require('../../services/logger.service');
const productsData = require('../../product.json');

module.exports = {
    query,
};

function query() {
    try {
        info('Feching products...');
        return Promise.resolve(productsData);
    } catch (err) {
        error('Error while fetching products.', err);
    }
}
