const express = require('express');
const router = express.Router();
const officeBranchService = require('./office-branch.service');

module.exports = router;

router.get('/getAll', get);

function get(req, res, next) {
    return officeBranchService
        .get()
        .then((products) => res.json(products))
        .catch((err) => next(err));
}
