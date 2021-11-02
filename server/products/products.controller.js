const express = require('express');
const router = express.Router();
const productsService = require('./products.service');

module.exports = router;

router.get('/getAll', get);
router.get('/getFeatured', getFeatured);
router.get('/getById/:id', getById);
router.get('/getCategories', getCategories);
router.get('/getManufacturers', getManufacturers);

function get(req, res, next) {
    return productsService
        .get({ offset: req.query['offset'], manufacturer: req.query['manufacturer'], category: req.query['category'] })
        .then((products) => res.json(products))
        .catch((err) => next(err));
}

function getFeatured(req, res, next) {
    return productsService
        .getFeatured()
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
        .getManufacturers()
        .then((manufacturers) => res.json(manufacturers))
        .catch((err) => next(err));
}
