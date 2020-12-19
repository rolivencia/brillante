const express = require('express');
const router = express.Router();
const productsService = require('./products.service');

module.exports = router;

router.get('/getAll', getAll);
router.get('/getById/:id', getById);

function getAll(req, res, next) {
    return productsService
        .getAll()
        .then((products) => res.json(products))
        .catch((err) => next(err));
}
function getById(req, res, next) {
    return productsService
        .getById(req.params.id)
        .then((product) => res.json(product))
        .catch((err) => next(err));
}
