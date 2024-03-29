const express = require('express');
const router = express.Router();
const transactionConceptsService = require('./transaction-concepts.service');

router.get('/get', get);
router.put('/update', update);
router.put('/enable', enable);
router.put('/disable', disable);
router.post('/create', create);

module.exports = router;

function get(req, res, next) {
    transactionConceptsService
        .get()
        .then((concepts) => res.json(concepts))
        .catch((err) => next(err));
}

function create(req, res, next) {
    transactionConceptsService
        .create(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
}

function update(req, res, next) {
    transactionConceptsService
        .update(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
}

function enable(req, res, next) {
    transactionConceptsService
        .enable(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
}

function disable(req, res, next) {
    transactionConceptsService
        .disable(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
}
