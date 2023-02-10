const express = require('express');
const router = express.Router();
const basicService = require('./basic.service');

// routes
router.post('/contactSubmit', contactSubmit);
router.post('/subscribe', subscribe);

module.exports = router;

function contactSubmit(req, res, next) {
console.log(req)
    basicService.contactSubmit(req.body)
        .then(contact => contact ? res.json(contact) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function subscribe(req, res, next) {
    console.log(req.body);
    basicService.subscribe(req.body)
        .then(mailList => mailList ? res.json(mailList) : res.status(400).json({ message: 'Error in completing process' }))
        .catch(err => next(err));
}
