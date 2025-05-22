const express = require('express');
const router = express.Router();
const billingService = require('./billing.service');

router.post('/create', create);

module.exports = router;

function create(req, res, next) {
    billingService
        .create()
        .then((billing) => res.json(billing))
        .catch((err) => next(err));
}
