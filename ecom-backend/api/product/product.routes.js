const { getProducts } = require('./product.controller');
const express = require('express');
const router = express.Router();

router.get('/', getProducts);

module.exports = router;
