const express = require('express');
const router = express.Router();
const officeBranchService = require('./office-branch.service');

module.exports = router;

router.get('/getAll', get);
router.post('/create', create);

function get(req, res, next) {
    return officeBranchService
        .get()
        .then((officeBranches) => res.json(officeBranches))
        .catch((err) => next(err));
}

function create(req, res, next) {
    return officeBranchService
        .create(req.body)
        .then((officeBranch) => res.json(officeBranch))
        .catch((err) => next(err));
}
