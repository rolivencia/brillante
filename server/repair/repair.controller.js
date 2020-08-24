const express = require('express');
const router = express.Router();
const repairService = require('./repair.service');

router.get('/', getAll);
router.get('/history/:idRepair', getHistoryByRepairId);

module.exports = router;

function getAll(req, res, next) {
    repairService
        .getAll(req.query)
        .then((customers) => res.json(customers))
        .catch((err) => next(err));
}

function getHistoryByRepairId(req, res, next) {
    repairService
        .getHistoryByRepairId(req.params.idRepair)
        .then((repairStatusHistory) => res.json(repairStatusHistory))
        .catch((err) => next(err));
}
