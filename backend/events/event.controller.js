const express = require('express');
const router = express.Router();
const eventService = require('./event.service');

// routes
router.get('/getAllByUser', getAllByUser);
router.get('/getAllPending', getAllPending);
router.post('/createEvent', createEvent);
router.get('/getEventById', getEventById);
router.get('/getAllFiltered', getAllFiltered);
router.get('/getEventCount', getEventCount);
router.post('/updateEvent', updateEvent);

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
        .then(event => event ? res.json(event) : res.status(400).json({ message: 'Failed to submit event' }))
        .catch(err => next(err));
}

function getAllByUser(req, res, next) {
    eventService.getAllByUser(req.query.userId)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllPending(req, res, next) {
    eventService.getAllPending()
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllFiltered(req, res, next) {
    console.log(req.query)
    eventService.getAllFiltered(req.query)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}

function getEventCount(req, res, next) {
    eventService.getEventCount(req.query)
        .then(event => event ? res.json(event) : res.status(400).json({ message: 'Error in fetching event' }))
        .catch(err => next(err));
}

function updateEvent(req, res, next) {
console.log("query start")
    console.log(req.body.params)
console.log("query end")
    eventService.updateEvent(req.body.params)
        .then(event => event ? res.json(event) : res.status(400).json({ message: 'Error in fetching event' }))
        .catch(err => next(err));
}
