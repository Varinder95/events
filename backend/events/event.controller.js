const express = require('express');
const router = express.Router();
const eventService = require('./event.service');

// routes
router.get('/getAllByUser', getAllByUser);
router.post('/createEvent', createEvent);
router.get('/getEventById', getEventById);

module.exports = router;

function getEventById(req, res, next) {
console.log(req.query.Id)
const eventId = String(req.query.Id)
    eventService.getEventById(eventId)
        .then(event => event ? res.json(event) : res.status(400).json({ message: 'Error in fetching event' }))
        .catch(err => next(err));
}

function createEvent(req, res, next) {
    console.log(req.body);
    eventService.createEvent(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByUser(req, res, next) {
    eventService.getAllByUser(req.query.userId)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}
