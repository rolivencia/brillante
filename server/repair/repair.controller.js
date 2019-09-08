const express = require('express');
const router = express.Router();
const repairService = require('./repair.service');

router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    repairService
        .getAll(req.query)
        .then(clients => res.json(clients))
        .catch(err => next(err));
}
