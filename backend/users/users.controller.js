﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/current', getCurrent);
router.get('/getUserCount', getUserCount);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log(req.body);
    userService.create(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Error in completing process' }))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserCount(req, res, next) {
    userService.getUserCount(req.query)
        .then(console.log(res))
        .catch(err => next(err));
}
