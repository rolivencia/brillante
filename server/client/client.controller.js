const express = require('express');
const router = express.Router();
const clientService = require('./client.service');

router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    clientService
        .getAll()
        .then(clients => res.json(clients))
        .catch(err => next(err));
}
