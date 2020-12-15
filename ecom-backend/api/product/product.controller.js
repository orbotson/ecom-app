const productService = require('./product.service');

module.exports = {
    getProducts,
};

async function getProducts(req, res) {
    const products = await productService.query();
    res.send(products);
}
