const express = require('express');
const router = express.Router();
const transactionService = require('./transaction-concepts.service');

router.get('/get', get);

module.exports = router;

function get(req, res, next) {
    transactionService
        .get()
        .then((concepts) => res.json(concepts))
        .catch((err) => next(err));
}
