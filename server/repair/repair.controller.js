const express = require('express');
const router = express.Router();
const repairService = require('./repair.service');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/getByClientId/:id', getByClientId);
router.get('/remove/:id', remove);
router.get('/history/:idRepair', getHistoryByRepairId);

module.exports = router;

function getById(req, res, next) {
    repairService
        .getById(req.params.id)
        .then((repair) => res.json(repair))
        .catch((err) => next(err));
}

function getByClientId(req, res, next) {
    repairService
        .getByClientId(req.params.id)
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

function remove(req, res, next) {
    repairService
        .remove(req.params.id)
        .then((response) => {
            if (response) {
                res.json({ response: `Deleted repair with id ${req.params.id}` });
            } else {
                res.status(400).json({
                    message: 'Bad request. Could not delete repair with id: ' + req.param('id'),
                });
            }
        })
        .catch((err) => next(res.status(400).json({ message: err })));
}
