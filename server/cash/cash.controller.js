const express = require('express');
const router = express.Router();
const cashService = require('./cash.service');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.put('/update', update);
router.delete('/remove/:id', remove);

router.post('/open', openCashRegister);
router.post('/close', closeCashRegister);

module.exports = router;

function openCashRegister() {
    cashService
        .openCashRegister()
        .then((transaction) => res.json(transaction))
        .catch((err) => next(err));
}

function closeCashRegister() {
    cashService
        .closeCashRegister()
        .then((transaction) => res.json(transaction))
        .catch((err) => next(err));
}

function getAll(req, res, next) {
    cashService
        .getAll(req.query)
        .then((transactions) => res.json(transactions))
        .catch((err) => next(err));
}

function getById(req, res, next) {
    cashService
        .getById(req.params.id)
        .then((transaction) => res.json(transaction))
        .catch((err) => next(err));
}

function create(req, res, next) {
    cashService
        .create(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
}

function update(req, res, next) {
    cashService
        .update(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
}

function remove(req, res, next) {
    cashService
        .remove(req.params.id)
        .then((response) => {
            if (response) {
                res.json({ response: `Deleted transaction with id ${req.params.id}` });
            } else {
                res.status(400).json({
                    message: 'Bad request. Could not delete transaction with id: ' + req.param('id'),
                });
            }
        })
        .catch((err) => next(res.status(400).json({ message: err })));
}
