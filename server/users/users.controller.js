const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticateByEmail', authenticateByEmail);
router.post('/register', register);
router.get('/', getAll);

module.exports = router;

// TODO: Should the authentication via email be in charge of registering a new user in the database?
function authenticateByEmail(req, res, next) {
    userService
        .authenticateByEmail(req.body)
        .then((user) => (user ? res.json(user) : res.status(400).json({ message: 'Email not found in database' })))
        .catch((err) => next(err));
}

function getAll(req, res, next) {
    userService
        .getAll()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function register(req, res, next) {
    userService
        .register(req.body)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}
