const express = require('express');
const router = express.Router();
const customerService = require('./customer.service');

router.get('/countAll', countAll);
router.get('/getAll/:offset/:limit', getAll);
router.get('/getByDni/:dni', getByDni);
router.get('/getById/:id', getById);
router.post('/create', create);
router.put('/update', update);

module.exports = router;

function getById(req, res, next) {
    customerService
        .getById(req.params.id)
        .then((customer) => res.json(customer))
        .catch((err) => next(err));
}

function getByDni(req, res, next) {
    const dni = parseInt(req.params.dni);
    customerService
        .getByDni(dni)
        .then((customer) => res.json(customer))
        .catch((err) => next(err));
}

function countAll(req, res, next) {
    customerService
        .countAll()
        .then((count) => res.json(count))
        .catch((err) => next(err));
}

function getAll(req, res, next) {
    const offset = req.params.offset ? parseInt(req.params.offset) : 0;
    const limit = req.params.limit ? parseInt(req.params.limit) : 20;

    customerService
        .getAll(offset, limit)
        .then((clients) => res.json(clients))
        .catch((err) => next(err));
}

function create(req, res, next) {
    customerService
        .create(req.body)
        .then((customer) => res.json(customer))
        .catch((err) => next(err));
}

function update(req, res, next) {
    customerService
        .update(req.body)
        .then((customer) => res.json(customer))
        .catch((err) => next(err));
}
