const express = require('express');
const router = express.Router();
const productsService = require('./products.service');

module.exports = router;

router.get('/getAll', getAll);
router.get('/getById/:id', getById);
router.get('/getCategories/:id', getById);
router.get('/getManufacturers/:id', getById);

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

function getCategories(req, res, next) {
    return productsService
        .getCategories(req.params.id)
        .then((categories) => res.json(categories))
        .catch((err) => next(err));
}
function getManufacturers(req, res, next) {
    return productsService
        .getManufacturers(req.params.id)
        .then((manufacturers) => res.json(manufacturers))
        .catch((err) => next(err));
}
