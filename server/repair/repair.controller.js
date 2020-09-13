const express = require('express');
const router = express.Router();
const repairService = require('./repair.service');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/history/:idRepair', getHistoryByRepairId);

module.exports = router;

function getById(req, res, next) {
    repairService
        .getById(req.params.id)
        .then((repair) => res.json(repair))
        .catch((err) => next(err));
}

function getAll(req, res, next) {
    repairService
        .getAll(req.query)
        .then((repairs) => res.json(repairs))
        .catch((err) => next(err));
}

function getHistoryByRepairId(req, res, next) {
    repairService
        .getHistoryByRepairId(req.params.idRepair)
        .then((repairStatusHistory) => res.json(repairStatusHistory))
        .catch((err) => next(err));
}
